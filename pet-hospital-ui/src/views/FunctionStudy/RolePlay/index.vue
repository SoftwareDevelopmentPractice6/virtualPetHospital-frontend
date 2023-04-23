<!-- 角色扮演：选择角色 -->

<template>
  <div class="roleplay-wrapper">
    <div class="container">
      <!-- 角色卡片 -->
      <div class="card-container">
        <div class="card" v-for="(item1, index1) in cardArr" :key="index1">
          <div class="content">
            <h3>{{ item1.title }}</h3>
            <p>
              <span v-for="(item2, index2) in item1.content" :key="index2"
                >（{{ index2 + 1 }}）<b>{{ item2.place }}</b
                >：{{ item2.description }}<br
              /></span>
              <span style="letter-spacing: 3px">......</span>
            </p>
            <div class="btn" @click="handleClick(index1)">Play</div>
          </div>
        </div>
      </div>
      <!-- 角色名称 -->
      <div class="title-container">
        <div class="title" v-for="(item3, index3) in cardArr" :key="index3">
          <span>{{ item3.role }}</span>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogTableVisible" title="请选择要模拟的操作：">
      <el-table
        ref="singleTableRef"
        :data="tableData[curIndex]"
        highlight-current-row
        style="width: 100%"
        :span-method="objectSpanMethod"
        @current-change="handleCurrentChange"
      >
        <el-table-column property="room" label="科室" width="120" />
        <el-table-column property="name" label="操作名称" width="150" />
        <el-table-column property="discription" label="描述" width="800" />
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取消</el-button>
          <el-button type="primary" @click="handleNavigate"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getFeature } from "@/api/system";
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

// 角色数组
const cardArr = reactive([
  {
    title: "Receptionist",
    role: "前台",
    content: [
      {
        place: "前台",
        description: "接待挂号、导医咨询、病历档案发出与回收、以及收费等；",
      },
      {
        place: "档案室",
        description: "对病例档案的合理保存与数据统计等；",
      },
    ],
  },
  {
    title: "Assistant",
    role: "医助",
    content: [
      {
        place: "注射室",
        description: "静脉注射、皮下注射、肌肉注射、局部封闭注射等；",
      },
      {
        place: "手术准备室",
        description:
          "麻前给药、注射麻醉、吸入麻醉，保定、剃毛、消毒，准备手术器械包，手术人员的消毒、穿戴手术衣等；",
      },
    ],
  },
  {
    title: "Doctor",
    role: "医生",
    content: [
      {
        place: "诊室",
        description: "临床检查、疾病诊断等；",
      },
      {
        place: "免疫室",
        description: "为宠物接种疫苗等；",
      },
      {
        place: "化验室",
        description: "预处理送检样本等；",
      },
      {
        place: "影像室",
        description: "X射线、B超、CT等；",
      },
      {
        place: "手术室",
        description: "常规和特殊手术等；",
      },
      {
        place: "专科检查室",
        description: "眼科、骨科、神经科、心脏科等专科疾病的检查；",
      },
    ],
  },
]);

const curIndex = ref();
const dialogTableVisible = ref(false);

const currentRow = ref();
const singleTableRef = ref();

const tableData = reactive([]);

let spanArr = reactive([]);
let pos = ref();

const router = useRouter();

const routerPush = (role) => {
  router.push({
    path: "rolePlay/detail",
    query: { role: role, name: currentRow._rawValue.name },
  });
};

const getSpanArr = (data) => {
  console.log("data", data);
  for (var i = 0; i < data.length; i++) {
    if (i === 0) {
      spanArr.push(1);
      pos.value = 0;
    } else {
      // 判断当前元素与上一个元素是否相同
      if (data[i].room === data[i - 1].room) {
        spanArr[pos.value] += 1;
        spanArr.push(0);
      } else {
        spanArr.push(1);
        pos.value = i;
      }
    }
  }
};

// 选中 table 某一行
const handleCurrentChange = (val) => {
  currentRow.value = val;
};

const objectSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
  if (columnIndex === 0) {
    const _row = spanArr[rowIndex];
    const _col = _row > 0 ? 1 : 0;
    return {
      rowspan: _row,
      colspan: _col,
    };
  }
};

// 处理点击事件
const handleClick = (index) => {
  spanArr = [];
  getSpanArr(tableData[index]);
  dialogTableVisible.value = true;
  curIndex.value = index;
};

// 处理跳转事件
const handleNavigate = () => {
  if (!currentRow.value) {
    ElMessage.warning("请选择一个操作！");
  } else {
    dialogTableVisible.value = false;
    if (curIndex.value === 0) {
      routerPush("receptionist");
    } else if (curIndex.value === 1) {
      routerPush("assistant");
    } else {
      routerPush("doctor");
    }
  }
};

// 排序函数（按照房间名）
const compareRoomName = (a, b) => {
  let roomNameA = a.room,
    roomNameB = b.room;
  if (roomNameA < roomNameB) {
    return -1;
  }
  if (roomNameA > roomNameB) {
    return 1;
  }
  return 0;
};

// 获取功能列表数据
const getTableData = () => {
  getFeature()
    .then((res) => {
      const featureList = res.data.featureList;
      console.log("获取功能列表成功", featureList);
      // 三个角色数组
      let receptionArr = [],
        assistantArr = [],
        doctorArr = [];
      for (let item of featureList) {
        const role = item.funcRole;
        let curItem = {
          name: item.funcName,
          room: item.featureRoom.roomName,
          discription: item.funcDescription,
        };
        if (role === "前台") {
          receptionArr.push(curItem);
        } else if (role === "医助") {
          assistantArr.push(curItem);
        } else {
          doctorArr.push(curItem);
        }
      }
      // 三个角色数组按照房间名排序
      receptionArr.sort(compareRoomName);
      assistantArr.sort(compareRoomName);
      doctorArr.sort(compareRoomName);
      tableData.push(receptionArr);
      tableData.push(assistantArr);
      tableData.push(doctorArr);
    })
    .catch((err) => {
      console.log("获取功能列表发生错误", err);
    });
};

onMounted(() => {
  getTableData();
});
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.roleplay-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px);
  background: #f4faff;

  .card-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    z-index: 1;
    .card {
      position: relative;
      width: 280px;
      height: 400px;
      margin: 30px;
      box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
      border-radius: 15px;
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.5);
      border-left: 1px solid rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(5px);
      .content {
        position: relative;
        z-index: 1;
        padding: 20px;
        text-align: center;
        transform: translateY(100px);
        opacity: 0;
        transition: 0.5s;
        h3 {
          font-size: 1.8em;
          color: #fff;
          z-index: 1;
          margin-bottom: 12px;
        }
        p {
          font-size: 0.9em;
          color: #fff;
          font-weight: 300;
          line-height: 26px;
        }
        .btn {
          position: relative;
          display: inline-block;
          padding: 8px 25px;
          margin-top: 10px;
          background: #fff;
          color: #000;
          border-radius: 20px;
          text-decoration: none;
          font-weight: 500;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          letter-spacing: 1.5px;
        }
        .btn:hover {
          cursor: pointer;
        }
      }
    }
    .card:nth-of-type(1) {
      background-image: url(../../../assets/images/receptionist.jpg);
    }
    .card:nth-of-type(2) {
      background-image: url(../../../assets/images/assistant.jpg);
    }
    .card:nth-of-type(3) {
      background-image: url(../../../assets/images/doctor.png);
      background-color: rgb(249, 239, 252);
    }
    .card::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.25);
      border-radius: 15px;
      z-index: -1;
    }
    .card:hover .content {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  .title-container {
    display: flex;
    justify-content: center;
    .title {
      width: 280px;
      margin: 0 30px 60px;
      text-align: center;
      font-size: 29px;
      word-spacing: 10px;
      letter-spacing: 5px;
      color: #333;
    }
  }
}
</style>
