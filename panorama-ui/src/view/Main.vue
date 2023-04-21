<template>
  <div class="homePage">
    <el-card class="card">
      <div class="card-content">
        <div ref="threeDom" class="model"></div>
      </div>
    </el-card>
    <el-dialog :visible.sync="showDialog" :title="title">
      <BarChart></BarChart>
    </el-dialog>
    <el-dialog
      :visible.sync="centerDialogVisible"
      :title="dialogTitle"
      width="40%"
      align-center
    >
      <div class="dialog-content">
        {{ dialogIntroduction }}<br />
        <span v-for="(item, index) in dialogItems" :key="index"
          >&lpar;{{ index + 1 }}&rpar;&nbsp;{{ item }}<br
        /></span>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible = false">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
// 总体逻辑：进入项目后打开 id 为 1 的图片，渲染图片按钮；
// 点击按钮后，跳转到按钮绑定的图片或者执行相应的其他操作。
import * as THREE from "three";
import BarChart from "./components/BarChart";
const OrbitControls = require("three-orbit-controls")(THREE);

export default {
  props: {
    msg: String,
  },
  components: {
    BarChart,
  },
  data() {
    return {
      renderer: "", // 渲染器
      scene: "", // 场景
      light: "", // 光源
      camera: "", // 相机
      controls: "", // 控制器
      mygroup: "", // 模型组

      action: "", // 控制动画的值
      clock: "", // 时钟
      mixer: "", // 混合实例
      rotateAnimate: "", // 旋转动画

      showDialog: false,
      title: "Data",

      centerDialogVisible: false,
      dialogTitle: "",
      dialogIntroduction: "",
      dialogItems: [],
      // 全景图源的结构，由于这是个纯前端的 demo，因此直接把数据写这里
      // 厂区结构 label 要与全景图地址对应
      pictureMap: [
        {
          sortId: 1, // id 为 1 时为打开整个项目第一个显示的场景
          name: "reception", //地址标识，当创建 map 的时候自动创建 map 的对应图片对象，name 属性与 map 对象的 label 命名一致，地点的详细项命名规则为地点 + “_” + 地点详细项，如 home1_printer
          location: "/img/reception.png", // 文件地址可以从，如果选择从服务器获取可能需要更改创建场景的图片获取方式
          buttons: [
            {
              // 全景图上的按钮组，每个按钮有名称，坐标，类型（跳转，看报表等），参数（点击按钮时传入的参数）属性
              buttonName: "预检室", // 按钮上现实的名字，这玩意应该要唯一，不然没法通过名称查找到底是哪个按钮
              buttonLocation: [-50, -5, 70, 2.8], // 按钮的坐标
              buttonType: "jump", // 按钮的类型：jump（跳转到另外一个场景），report，data等，暂时没想好
              paras: "precheck", // 传给按钮动作的参数，因为考虑到可能要非 IT 人员配置，这里直接用 “,” 分隔的字符串
            },
            {
              buttonName: "走廊",
              buttonLocation: [-10, -20, -90, 0],
              buttonType: "jump",
              paras: "passageway",
            },
            {
              buttonName: "办公区",
              buttonLocation: [45, -5, -80, -0.3],
              buttonType: "jump",
              paras: "office",
            },
            {
              buttonName: "病房",
              buttonLocation: [-5, -10, 90, 3],
              buttonType: "jump",
              paras: "sickroom",
            },
          ],
        },
        {
          sortId: 2,
          name: "precheck",
          location: "/img/precheck.jpg",
          buttons: [
            {
              buttonName: "大厅",
              buttonLocation: [30, -5, -40, 0],
              buttonType: "jump",
              paras: "reception",
            },
            {
              buttonName: "操作台",
              buttonLocation: [-65, -20, -35, 0.3],
              buttonType: "open",
              introduction:
                "操作台是医疗设备中非常重要的一部分，主要功能是为医生提供一个可控制的工作区域，以支持各种医疗活动。操作台具有以下特点：",
              detailItems: [
                "高度可调：操作台可以根据实际需要进行高度调节，以便医生能够进行舒适的工作姿势。",
                "多功能：操作台可以用于多种医疗用途，例如手术、检查、治疗等。",
                "易于清洁：操作台通常使用不锈钢或其他易于清洁和消毒的材料制成。",
                "具有辅助设备：操作台通常还配备了各种辅助设备，如灯具、升降系统、电源插座等，以方便医生进行工作。",
              ],
            },
            {
              buttonName: "无影灯",
              buttonLocation: [0, 25, 30, 3.2],
              buttonType: "open",
              introduction:
                "无影灯是医院手术室必备的设备之一，主要用于为医生在手术期间提供清晰、准确的照明和照射。无影灯具有以下特点：",
              detailItems: [
                "高亮度：无影灯的灯头通常由多个灯泡组成，能够提供高亮度的照明和照射，让手术区域非常清晰、明亮。这对于医生在手术期间进行精确的操作非常重要。",
                "均匀照射：无影灯的每个灯头都可以自由调整角度和方向，使光线均匀地覆盖整个手术区域，避免阴影和反光等问题。这样医生就可以更加清楚地看到手术区域，减少手术中的误差。",
                "调节功能：无影灯通常具备调节亮度和颜色温度的功能，以满足不同手术类型和手术过程中的不同需求。例如，在一些需要使用显微镜进行手术的情况下，医生可以将灯光调暗，以避免反光干扰视线。",
                "卫生安全：无影灯的设计非常注重卫生安全，可以避免灰尘和细菌的聚集。其中，一些型号还具备防水、防火等特点，进一步提高了无影灯的安全性。",
                "灵活性：无影灯的每个灯头可以自由旋转和移动，因此医生可以根据需要轻松地调整角度和方向，甚至可以将灯头调整到手术区域的最佳位置。这样一来，医生就可以更加舒适和方便地进行手术操作。",
              ],
            },
            {
              buttonName: "诊疗床",
              buttonLocation: [-50, -25, 45, 3],
              buttonType: "open",
              introduction:
                "诊疗床用于让患者躺下接受检查、治疗或手术，具备一定的稳定性和安全性。诊疗床具有以下特点：",
              detailItems: [
                "多功能性：诊疗床可根据不同的医疗需求进行调整，如上下、前后、左右等方向的移动和调节，以满足医生和患者的需要。",
                "舒适性：诊疗床表面通常采用柔软舒适的材料，如海绵、皮革等，以提供患者舒适的体验。",
                "安全性：诊疗床通常具有可靠的安全保护装置，如防倾覆装置、紧急制动器等，以确保患者在使用过程中的安全。",
                "卫生性：诊疗床的表面易于清洁，以保证医疗环境的卫生。",
                "可调性：诊疗床通常具有多种高度和角度的调节功能，以适应不同治疗和检查的需要。",
                "移动性：诊疗床通常配有轮子，可以方便地在医院内移动，以便于患者的转移和治疗。",
              ],
            },
          ],
        },
        {
          sortId: 3,
          name: "passageway",
          location: "/img/passageway.jpg",
          buttons: [
            {
              buttonName: "大厅",
              buttonLocation: [2, 0, -120, 0],
              buttonType: "jump",
              paras: "reception",
            },
            {
              buttonName: "注射室",
              buttonLocation: [-30, -5, -100, 0.5],
              buttonType: "jump",
              paras: "injection",
            },
            {
              buttonName: "手术室",
              buttonLocation: [55, -5, -60, -1.2],
              buttonType: "jump",
              paras: "surgery",
            },
            {
              buttonName: "影像室",
              buttonLocation: [-30, 0, 75, 2.3],
              buttonType: "jump",
              paras: "picture",
            },
          ],
        },
        {
          sortId: 4,
          name: "prepare",
          location: "/img/precheck.jpg",
          buttons: [
            {
              buttonName: "大厅",
              buttonLocation: [30, -5, -40, 0],
              buttonType: "jump",
              paras: "reception",
            },
            {
              buttonName: "操作台",
              buttonLocation: [-65, -20, -35, 0.3],
              buttonType: "open",
              introduction:
                "操作台是医疗设备中非常重要的一部分，主要功能是为医生提供一个可控制的工作区域，以支持各种医疗活动。操作台具有以下特点：",
              detailItems: [
                "高度可调：操作台可以根据实际需要进行高度调节，以便医生能够进行舒适的工作姿势。",
                "多功能：操作台可以用于多种医疗用途，例如手术、检查、治疗等。",
                "易于清洁：操作台通常使用不锈钢或其他易于清洁和消毒的材料制成。",
                "具有辅助设备：操作台通常还配备了各种辅助设备，如灯具、升降系统、电源插座等，以方便医生进行工作。",
              ],
            },
            {
              buttonName: "无影灯",
              buttonLocation: [0, 25, 30, 3.2],
              buttonType: "open",
              introduction:
                "无影灯是医院手术室必备的设备之一，主要用于为医生在手术期间提供清晰、准确的照明和照射。无影灯具有以下特点：",
              detailItems: [
                "高亮度：无影灯的灯头通常由多个灯泡组成，能够提供高亮度的照明和照射，让手术区域非常清晰、明亮。这对于医生在手术期间进行精确的操作非常重要。",
                "均匀照射：无影灯的每个灯头都可以自由调整角度和方向，使光线均匀地覆盖整个手术区域，避免阴影和反光等问题。这样医生就可以更加清楚地看到手术区域，减少手术中的误差。",
                "调节功能：无影灯通常具备调节亮度和颜色温度的功能，以满足不同手术类型和手术过程中的不同需求。例如，在一些需要使用显微镜进行手术的情况下，医生可以将灯光调暗，以避免反光干扰视线。",
                "卫生安全：无影灯的设计非常注重卫生安全，可以避免灰尘和细菌的聚集。其中，一些型号还具备防水、防火等特点，进一步提高了无影灯的安全性。",
                "灵活性：无影灯的每个灯头可以自由旋转和移动，因此医生可以根据需要轻松地调整角度和方向，甚至可以将灯头调整到手术区域的最佳位置。这样一来，医生就可以更加舒适和方便地进行手术操作。",
              ],
            },
            {
              buttonName: "诊疗床",
              buttonLocation: [-50, -25, 45, 3],
              buttonType: "open",
              introduction:
                "诊疗床用于让患者躺下接受检查、治疗或手术，具备一定的稳定性和安全性。诊疗床具有以下特点：",
              detailItems: [
                "多功能性：诊疗床可根据不同的医疗需求进行调整，如上下、前后、左右等方向的移动和调节，以满足医生和患者的需要。",
                "舒适性：诊疗床表面通常采用柔软舒适的材料，如海绵、皮革等，以提供患者舒适的体验。",
                "安全性：诊疗床通常具有可靠的安全保护装置，如防倾覆装置、紧急制动器等，以确保患者在使用过程中的安全。",
                "卫生性：诊疗床的表面易于清洁，以保证医疗环境的卫生。",
                "可调性：诊疗床通常具有多种高度和角度的调节功能，以适应不同治疗和检查的需要。",
                "移动性：诊疗床通常配有轮子，可以方便地在医院内移动，以便于患者的转移和治疗。",
              ],
            },
          ],
        },
        {
          sortId: 5,
          name: "office",
          location: "/img/office.jpg",
          buttons: [
            {
              buttonName: "大厅",
              buttonLocation: [30, 0, -80, 0],
              buttonType: "jump",
              paras: "reception",
            },
            {
              buttonName: "档案室",
              buttonLocation: [-35, 10, -70, 0],
              buttonType: "jump",
              paras: "archives",
            },
          ],
        },
        {
          sortId: 6,
          name: "archives",
          location: "/img/archives.jpg",
          buttons: [
            {
              buttonName: "办公区",
              buttonLocation: [50, -10, -70, -0.3],
              buttonType: "jump",
              paras: "office",
            },
          ],
        },
        {
          sortId: 7,
          name: "sickroom",
          location: "/img/sickroom.jpg",
          buttons: [
            {
              buttonName: "大厅",
              buttonLocation: [30, -10, 40, -2.55],
              buttonType: "jump",
              paras: "reception",
            },
            {
              buttonName: "病床",
              buttonLocation: [40, -15, -55, -0.8],
              buttonType: "open",
              introduction:
                "医院的病床是专门为病人提供舒适和安全的休息空间而设计的。病床具有以下特点：",
              detailItems: [
                "舒适性：病人需要在病床上舒适地休息和恢复，因此医院的病床通常采用柔软且支撑力度适当的床垫材料，如泡沫、弹簧或气垫等。",
                "可调节性：为了适应不同病情和医疗需求，医院的病床通常可以随意调节高度和角度。例如，一些病人可能需要半坐姿或抬高脚部来缓解疼痛或呼吸困难，而一些手术可能需要将病床调整到特定位置。",
                "安全性：医院的病床通常配有护栏以防止病人从床上滑落，同时还可以作为扶手帮助病人起床活动。此外，一些现代化的病床还配备了紧急停止按钮和保护机制，以确保病人的安全。",
                "移动性：医院的病床通常配有转轮，使得床可以方便地移动到需要的位置。这对于需要移动的病人（如手术后）或需要紧急转移的病人非常重要。",
                "功能性：一些现代化的病床还配备了各种电子设备，如心率、呼吸和体温监测器，以及液晶显示屏和遥控器等功能，以帮助医护人员监测病人的病情并提供更好的护理服务。",
              ],
            },
          ],
        },
        {
          sortId: 8,
          name: "surgery",
          location: "/img/surgery.jpg",
          buttons: [
            {
              buttonName: "手术准备室",
              buttonLocation: [5, -20, -60, 0.1],
              buttonType: "jump",
              paras: "prepare",
            },
            {
              buttonName: "走廊",
              buttonLocation: [85, -15, -60, -0.6],
              buttonType: "jump",
              paras: "passageway",
            },
            {
              buttonName: "无影灯",
              buttonLocation: [5, 15, 45, 3.2],
              buttonType: "open",
              introduction:
                "无影灯是医院手术室必备的设备之一，主要用于为医生在手术期间提供清晰、准确的照明和照射。无影灯具有以下特点：",
              detailItems: [
                "高亮度：无影灯的灯头通常由多个灯泡组成，能够提供高亮度的照明和照射，让手术区域非常清晰、明亮。这对于医生在手术期间进行精确的操作非常重要。",
                "均匀照射：无影灯的每个灯头都可以自由调整角度和方向，使光线均匀地覆盖整个手术区域，避免阴影和反光等问题。这样医生就可以更加清楚地看到手术区域，减少手术中的误差。",
                "调节功能：无影灯通常具备调节亮度和颜色温度的功能，以满足不同手术类型和手术过程中的不同需求。例如，在一些需要使用显微镜进行手术的情况下，医生可以将灯光调暗，以避免反光干扰视线。",
                "卫生安全：无影灯的设计非常注重卫生安全，可以避免灰尘和细菌的聚集。其中，一些型号还具备防水、防火等特点，进一步提高了无影灯的安全性。",
                "灵活性：无影灯的每个灯头可以自由旋转和移动，因此医生可以根据需要轻松地调整角度和方向，甚至可以将灯头调整到手术区域的最佳位置。这样一来，医生就可以更加舒适和方便地进行手术操作。",
              ],
            },
            {
              buttonName: "手术床",
              buttonLocation: [10, -30, 55, 3.1],
              buttonType: "open",
              introduction:
                "手术台通常是一种可以调节高度和倾斜角度的平面床面，用于在手术时将患者放置在上面，支撑和调整患者体位，方便医生进行手术操作。手术台具有以下特点：",
              detailItems: [
                "多功能性：手术台可以调节高度、倾斜角度等多个方面，以满足不同手术操作的需要。例如，手术台可以实现头低脚高、头高脚低、横滚等各种姿态的调整。",
                "安全可靠：手术台的结构稳定，承载能力强，床身材料通常采用不锈钢，易于清洁和消毒，从而保障手术安全。",
                "操作方便：手术台上的控制器件布局合理、易于操作，并且可以通过电动或液压系统来实现自动化调节，提高医生和护士的工作效率。",
                "人性化设计：手术台附件的设计考虑到患者舒适度和手术操作的需要，例如配备了头枕、臂板、腿板等附件，可以使患者处于舒适的位置，同时也方便手术操作。",
                "高精度：由于手术过程中需要高精度的操作，手术台可以实现微小的姿态调整，以保证手术的准确性和成功率。",
                "多样性：随着手术技术的不断发展，不同类型的手术需要不同类型的手术台。因此，手术台具有多样化的种类和型号，以适应不同的手术需求。",
              ],
            },
            {
              buttonName: "心电图机",
              buttonLocation: [90, -25, 45, -2.5],
              buttonType: "open",
              introduction:
                "心电图机（Electrocardiograph，简称ECG或EKG）是一种用于检测心脏电活动的设备。它可以将心脏的电信号放大并记录下来，以便医生分析。在手术室使用的心电图机相较于其他类型的心电图机，具有以下特点：",
              detailItems: [
                "增加了防护措施：手术室内存在高强度电磁干扰和静电干扰等问题，容易对心电图检测产生影响。因此，手术室内使用的心电图机通常增加了相关的电磁防护和静电保护措施，以确保心电图信号的准确性和稳定性。",
                "具有更高的精度和灵敏度：手术室内进行的手术通常比较复杂、危险，需要对患者的心脏情况进行更为准确和及时的监测。因此，在手术室内使用的心电图机通常具有更高的精度和灵敏度，可以在最短时间内捕捉到患者心脏的异常信号，以便医生及时采取必要的措施。",
                "配备了多个监测通道：手术室内的心电图机通常配备了多个监测通道，可以同时记录不同部位的心电信号，更全面地反映出患者的心脏电活动情况，提高诊断的准确性。",
                "具有数据存储和传输功能：手术室内的心电图机通常具有数据存储和传输功能，可以将患者的心电图记录下来，并发送到医生的工作站或其他设备上进行分析和保存，方便医生随时查看和评估患者的心脏情况。",
              ],
            },
            {
              buttonName: "手术清洗盆",
              buttonLocation: [-55, -50, 60, 2.75],
              buttonType: "open",
              introduction:
                "手术清洗盆是一种用于手术室内进行手术器械清洗和消毒的设备。通常由不锈钢制成，具有一定的深度和容积，可以承载大量的器械并保证其完全浸泡在清洁剂或消毒液中。手术清洗盆具有以下特点：",
              detailItems: [
                "材质坚固：手术清洗盆通常采用不锈钢制作，具有耐腐蚀、防锈、易于清洗等优点，可以抵御清洁剂和消毒液的侵蚀，并且在长期使用过程中不会产生污渍或氧化。",
                "分隔设计：手术清洗盆通常分为两个相连的部分，一个用于清洗器械的水槽和一个用于消毒的消毒槽，使器械的清洗和消毒过程相互独立，避免交叉感染的发生。",
                "易于操作：手术清洗盆的设计简单，操作容易，医护人员只需要将器械放入对应的槽中，加入清洁剂或消毒液即可进行清洗和消毒处理。",
                "卫生可靠：手术清洗盆使用清洁剂和消毒液对器械进行彻底的清洁和消毒，可以有效地去除污渍、细菌和病毒等有害物质，确保手术器械的卫生洁净，降低手术感染的风险。",
              ],
            },
          ],
        },
        {
          sortId: 9,
          name: "picture",
          location: "/img/precheck.jpg",
          buttons: [
            {
              buttonName: "走廊",
              buttonLocation: [30, -5, -40, 0],
              buttonType: "jump",
              paras: "passageway",
            },
            {
              buttonName: "B 超",
              buttonLocation: [-65, -20, -35, 0.3],
              buttonType: "open",
              introduction:
                "B超是一种医学影像检查技术，全称为“超声波断层成像”，利用超声波探头向人体部位发射高频声波，通过不同组织、器官的反射和传导，产生回声信号，再经过计算机处理后形成图像，以达到诊断疾病的目的。B 超具有以下特点：",
              detailItems: [
                "无创性：与其他医学检查方法相比，如X光、CT等，B超检查不使用放射线或其他有害物质，因此对身体没有任何损伤。",
                "明确：B超图像清晰明确，可以直观地观察到人体内部组织和器官的结构、形态、大小、位置等信息。",
                "实时性：B超检查是实时进行的，医生可以通过监控屏幕上的图像，在检查过程中及时调整探头位置，并观察到组织和器官的运动情况。",
                "便捷性：B超检查操作简单、快速，不需要患者进行任何特殊准备，不需要住院，可以在门诊或诊所等场所进行。",
                "安全性：B超检查没有辐射，适用于各个年龄段的患者，包括孕妇和婴儿。",
              ],
            },
            {
              buttonName: "X 射线",
              buttonLocation: [0, 25, 30, 3.2],
              buttonType: "open",
              introduction:
                "X射线是一种常见的医疗影像检查方式，通过使用高能量的X射线穿过人体，然后在另一侧被接收器捕捉图像，以产生内部身体结构的影像。无影灯具有以下特点：",
              detailItems: [
                "高能量：X射线是电磁波的一种，其波长很短且频率很高，因此具有很高的能量，可以穿透人体组织并在背后形成影像。",
                "电离辐射：X射线是一种电离辐射，即能够使物质中的原子或分子失去电荷而变为带电粒子的辐射。这种辐射对人体有一定危害，因此在使用X射线时需要注意保护。",
                "可调节性：医院影像室的X射线机器通常具有可调节性，可以根据不同部位和不同病情调整X射线的能量、时间等参数，以获得更清晰的影像。",
                "易于操作：X射线机器通常采用数字化技术，操作简便，同时也提高了影像的质量和可靠性。",
                "能显示不同组织结构：由于不同组织结构对X射线的吸收程度不同，因此X射线影像能够显示不同的组织结构，如骨骼、肺部等，从而用于诊断和治疗。",
              ],
            },
            {
              buttonName: "CT",
              buttonLocation: [-50, -25, 45, 3],
              buttonType: "open",
              introduction:
                "CT（Computed Tomography）是一种医学影像技术，它使用X射线通过人体进行扫描，生成具有高分辨率和准确性的三维图像。诊疗床具有以下特点：",
              detailItems: [
                "高分辨率：相比于X射线，CT可以提供更高的分辨率。它使用旋转式X射线，通过计算机处理，产生横向“切片”图像，从而能够更清晰地显示人体内部的结构。",
                "三维成像：通过多个切片图像的拼接，可以生成三维图像，使医生能够更全面、立体地了解病变部位的情况。",
                "精确定位：在进行手术或其他治疗时，CT可以提供非常精确的定位和图像引导，大大降低手术风险和提高手术成功率。",
                "可调节性：CT机器可以根据需要对放射线的强度和时间进行调整，以获得更清晰的图像，并且能够针对不同的组织类型、病变程度等，进行不同的扫描方案。",
                "多功能性：除了用于诊断，CT还可以用于治疗，如在放射治疗中，CT可以帮助制定更精准的治疗计划；同时还可以在肿瘤学、神经科学等领域得到广泛应用。",
              ],
            },
          ],
        },
        {
          sortId: 10,
          name: "injection",
          location: "/img/surgery.jpg",
          buttons: [
            {
              buttonName: "走廊",
              buttonLocation: [85, -15, -60, -0.6],
              buttonType: "jump",
              paras: "passageway",
            },
            {
              buttonName: "无影灯",
              buttonLocation: [5, 15, 45, 3.2],
              buttonType: "open",
              introduction:
                "无影灯是医院手术室必备的设备之一，主要用于为医生在手术期间提供清晰、准确的照明和照射。无影灯具有以下特点：",
              detailItems: [
                "高亮度：无影灯的灯头通常由多个灯泡组成，能够提供高亮度的照明和照射，让手术区域非常清晰、明亮。这对于医生在手术期间进行精确的操作非常重要。",
                "均匀照射：无影灯的每个灯头都可以自由调整角度和方向，使光线均匀地覆盖整个手术区域，避免阴影和反光等问题。这样医生就可以更加清楚地看到手术区域，减少手术中的误差。",
                "调节功能：无影灯通常具备调节亮度和颜色温度的功能，以满足不同手术类型和手术过程中的不同需求。例如，在一些需要使用显微镜进行手术的情况下，医生可以将灯光调暗，以避免反光干扰视线。",
                "卫生安全：无影灯的设计非常注重卫生安全，可以避免灰尘和细菌的聚集。其中，一些型号还具备防水、防火等特点，进一步提高了无影灯的安全性。",
                "灵活性：无影灯的每个灯头可以自由旋转和移动，因此医生可以根据需要轻松地调整角度和方向，甚至可以将灯头调整到手术区域的最佳位置。这样一来，医生就可以更加舒适和方便地进行手术操作。",
              ],
            },
            {
              buttonName: "注射床",
              buttonLocation: [10, -30, 55, 3.1],
              buttonType: "open",
              introduction:
                "注射床通常是一种可以调节高度和倾斜角度的平面床面，用于在注射时将患者放置在上面，支撑和调整患者体位，方便医生进行注射操作。注射床具有以下特点：",
              detailItems: [
                "多功能性：注射床可以调节高度、倾斜角度等多个方面，以满足不同注射操作的需要。",
                "安全可靠：注射床的结构稳定，承载能力强，床身材料通常采用不锈钢，易于清洁和消毒，从而保障注射安全。",
                "操作方便：注射床上的控制器件布局合理、易于操作，并且可以通过电动或液压系统来实现自动化调节，提高医生和护士的工作效率。",
                "人性化设计：注射床附件的设计考虑到患者舒适度和注射操作的需要，例如配备了头枕、臂板、腿板等附件，可以使患者处于舒适的位置，同时也方便注射操作。",
                "高精度：由于注射过程中需要高精度的操作，注射床可以实现微小的姿态调整，以保证注射的准确性和成功率。",
                "多样性：随着注射技术的不断发展，不同类型的注射需要不同类型的注射床。因此，注射床具有多样化的种类和型号，以适应不同的注射需求。",
              ],
            },
            {
              buttonName: "操作台",
              buttonLocation: [90, -25, 45, -2.5],
              buttonType: "open",
              introduction:
                "操作台是医疗设备中非常重要的一部分，主要功能是为医生提供一个可控制的工作区域，以支持各种医疗活动。操作台具有以下特点：",
              detailItems: [
                "高度可调：操作台可以根据实际需要进行高度调节，以便医生能够进行舒适的工作姿势。",
                "多功能：操作台可以用于多种医疗用途，例如手术、检查、治疗等。",
                "易于清洁：操作台通常使用不锈钢或其他易于清洁和消毒的材料制成。",
                "具有辅助设备：操作台通常还配备了各种辅助设备，如灯具、升降系统、电源插座等，以方便医生进行工作。",
              ],
            },
            {
              buttonName: "清洗盆",
              buttonLocation: [-55, -50, 60, 2.75],
              buttonType: "open",
              introduction:
                "清洗盆是一种用于注射室内相关器械清洗和消毒的设备。通常由不锈钢制成，具有一定的深度和容积，可以承载大量的器械并保证其完全浸泡在清洁剂或消毒液中。清洗盆具有以下特点：",
              detailItems: [
                "材质坚固：清洗盆通常采用不锈钢制作，具有耐腐蚀、防锈、易于清洗等优点，可以抵御清洁剂和消毒液的侵蚀，并且在长期使用过程中不会产生污渍或氧化。",
                "分隔设计：清洗盆通常分为两个相连的部分，一个用于清洗器械的水槽和一个用于消毒的消毒槽，使器械的清洗和消毒过程相互独立，避免交叉感染的发生。",
                "易于操作：清洗盆的设计简单，操作容易，医护人员只需要将器械放入对应的槽中，加入清洁剂或消毒液即可进行清洗和消毒处理。",
                "卫生可靠：清洗盆使用清洁剂和消毒液对器械进行彻底的清洁和消毒，可以有效地去除污渍、细菌和病毒等有害物质，确保相关器械的卫生洁净，降低手术感染的风险。",
              ],
            },
          ],
        },
      ],
    };
  },

  mounted() {
    this.init(); // 初始化
  },
  methods: {
    // 遍历查找数组按钮
    findButtonInPictureMap(arr, key) {
      for (var sence of arr) {
        for (var button of sence.buttons) {
          if (button.buttonName === key) {
            return button;
          }
        }
      }
    },
    // 初始化项目
    init() {
      this.$refs.threeDom.addEventListener("dblclick", this.onMouseDblclick); // 监听双击事件
      this.rendererInit(); // 创建渲染器
      this.sceneInit(); // 创建场景，包含光源和辅助坐标系
      this.cameraInit(); // 创建相机
      this.controlInit(); // 初始化控制器
      // this.propertyInit(); // 性能监控
      this.modelling(); // 建立模型
    },
    // 获取排序第一的全景图
    findFirst(element) {
      return element.sortId === 1;
    },
    modelling() {
      // 开始建立模型
      this.mygroup = new THREE.Group();
      var textureLoader = new THREE.TextureLoader(); // 创建纹理贴图
      // 从服务器上取得图片
      // vue 加载图表需要用 require 形式从本地取，直接取本地是无法应用上的因为 load 只支持 http 协议 打包后变为 file 协议是无法使用的
      // 所以必须取服务上的图片 然后在 vue.config 中配置跨域
      // 重点，进入项目后的第一张图片

      var first = this.pictureMap.find(this.findFirst); // 拿到了项目的第一张图片
      //var img = textureLoader.load(require('../../public/img/depository.jpg'));
      var img = textureLoader.load("/api" + first.location); // 从后端获取图片，需要通过代理跨域，打包后通过 nginx 进行跨域，本地通过 vue.config.js
      //var img = textureLoader.load(link); // vue 加载图表需要用 require 形式
      var geometry = new THREE.SphereGeometry(130, 256, 256); // 球体网格模型
      var material = new THREE.MeshLambertMaterial({
        map: img, // 设置颜色贴图属性值
        side: THREE.DoubleSide, // 双面渲染
      });
      var meshSphere = new THREE.Mesh(geometry, material); // 网格模型对象 Mesh
      meshSphere.name = "球体容器";
      this.mygroup.add(meshSphere);
      // 开始生成场景中的按钮
      first.buttons.forEach((element) => {
        var button = element;
        var canvasText = this.getcanvas(
          button.buttonName,
          button.buttonLocation
        ); // 生成一个 canvas 文字图案对象
      });

      this.scene.add(this.mygroup);
      this.addAnimation(); // 添加并开启动画
      this.action.paused = true;
      this.refresh();
    },

    addAnimation() {
      // 添加并开启动画
      this.clock = new THREE.Clock(); // three.js 时钟对象
      var times = [0, 3600]; //	创建帧动画序列
      var position_x = [0, 360]; // 离散属性值
      var keyframe = new THREE.KeyframeTrack(
        "meshSphere.rotation[y]",
        times,
        position_x
      );
      var duration = 100; // 持续时间
      var cilp = new THREE.AnimationClip("sphereRotate", duration, [keyframe]); // 剪辑 keyframe 对象
      this.mixer = new THREE.AnimationMixer(this.mygroup); // 动画混合实例
      this.action = this.mixer.clipAction(cilp);
      this.action.timeScale = 1; // 播放速度
      this.action.setLoop(THREE.LoopPingPong).play(); // 开始播放，像乒乓球一样在起始点与结束点之间来回循环
      this.animate(); // 开启动画
    },

    animate() {
      // 循环渲染
      this.rotateAnimate = requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
      this.update();
    },

    update() {
      // 数据更新
      this.mixer.update(this.clock.getDelta());
    },

    rendererInit() {
      // 初始化渲染器
      var width = 1360; // 窗口宽度
      var height = 800; // 窗口高度
      this.renderer = new THREE.WebGLRenderer(); // 创建渲染器
      this.renderer.setClearColor(0xffffff); // 添加背景颜色
      this.renderer.setSize(width, height); // 设定渲染器尺寸
      this.$refs.threeDom.appendChild(this.renderer.domElement);
    },

    sceneInit() {
      // 初始化场景 并向场景添加光源和辅助坐标系
      this.scene = new THREE.Scene();
      var ambient = new THREE.AmbientLight(0x444444, 3); // 添加光源、颜色和光照强度
      // var axisHelper = new THREE.AxesHelper(600); // 添加辅助坐标系
      // this.scene.add(ambient,axisHelper); // 当往场景中添加辅助线时记得这会改变场景数组的子项
      this.scene.add(ambient); // 当往场景中添加辅助线时记得这会改变场景数组的子项
    },

    cameraInit() {
      // 初始化相机
      var width = 1360; // 窗口宽度
      var height = 800; // 窗口高度
      this.camera = new THREE.PerspectiveCamera(90, width / height, 1, 1000); // 使用透视相机
      this.camera.position.set(0, 0, 10); // 设置相机位置
      this.camera.lookAt(new THREE.Vector3(0, 0, 0)); // 相机看向
    },

    controlInit() {
      // 初始化控制器
      this.controls = new OrbitControls(this.camera, this.$refs.threeDom); // 初始化控制器
      this.controls.target.set(0, 0, 0); // 设置控制器的焦点，使控制器围绕这个焦点进行旋转
      this.controls.minDistance = 10; // 设置移动的最短距离（默认为零）
      this.controls.maxPolarAngle = Math.PI; // 绕垂直轨道的距离（范围是 0-Math.PI，默认为 Math.PI）
      this.controls.maxDistance = 30; // 设置移动的最长距离（默认为无穷）
      this.controls.enablePan = false; //禁用右键功能
      this.controls.addEventListener("change", this.refresh); // 监听鼠标、键盘事件 让整个控件可以拖动
    },

    getcanvas(text, buttonLocation) {
      // 生成一个 canvas 图案
      var canvasText = document.createElement("canvas");
      var c = canvasText.getContext("2d");
      // 矩形区域填充背景
      c.fillStyle = "#FFFFFF"; // canvas 背景
      c.fillRect(0, 0, 400, 200); // 生成一个矩形
      c.translate(160, 80);
      c.fillStyle = "#000000"; // 文本填充颜色
      c.font = "bold 53px 宋体"; // 字体样式设置
      c.textBaseline = "middle"; // 文本与
      c.textAlign = "center"; // 文本居中
      c.fillText(text, 0, 0);

      var texture = new THREE.CanvasTexture(canvasText); // Canvas 纹理
      var geometryText = new THREE.PlaneGeometry(18, 12, 60, 60); // 生成一个矩形平面
      geometryText.rotateY(buttonLocation[3]); // 绕 y 轴旋转
      var materialText = new THREE.MeshPhongMaterial({
        map: texture, // 设置纹理贴图
        side: THREE.DoubleSide, // 双面渲染
      });
      var meshText = new THREE.Mesh(geometryText, materialText);
      meshText.name = text;
      // meshText.position.set(40, 20, -90);
      meshText.position.set(
        buttonLocation[0],
        buttonLocation[1],
        buttonLocation[2]
      );
      this.mygroup.add(meshText);
      return canvasText;
    },

    refresh() {
      // 刷新页面
      this.renderer.render(this.scene, this.camera); // 执行渲染操作
    },

    onMouseDblclick(event) {
      // 触发双击事件
      // 获取 raycaster 和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
      var intersects = this.getIntersects(event);
      if (intersects.length != 0) {
        for (var item of intersects) {
          if (item.object.name != "" && item.object.name != "球体容器") {
            // 找到第一个不等于空的模型 就是自定义最近的模型
            this.action.paused = true; // 停止旋转
            // 这个正式进行时从后端获取
            // 目前 demo 先遍历找了
            var button = this.findButtonInPictureMap(
              this.pictureMap,
              item.object.name
            );
            switch (button.buttonType) {
              case "jump": {
                this.$confirm("是否切换场景?", "提示", {
                  confirmButtonText: "切换",
                  cancelButtonText: "取消",
                  type: "warning",
                }).then(() => {
                  this.action.paused = true;
                  this.changeScene(button.paras);
                });
                break;
              }
              case "open": {
                this.dialogTitle = button.buttonName;
                this.dialogIntroduction = button.introduction;
                this.dialogItems = button.detailItems;
                this.centerDialogVisible = true;
                break;
              }
            }
            break;
          }
        }
      } else {
        // 这里是未选中状态
      }
    },

    changeScene(type) {
      var targetSence = this.pictureMap.find((item) => item.name === type);
      var img = "";
      var names = "";
      var canvasText = "";
      var textureLoader = new THREE.TextureLoader(); // 创建纹理贴图
      if (targetSence !== undefined) {
        this.removeButtons(); // 删除所有按钮
        img = textureLoader.load("/api" + targetSence.location);
        targetSence.buttons.forEach((element) => {
          var button = element;
          var canvasText = this.getcanvas(
            button.buttonName,
            button.buttonLocation
          ); // 生成一个 canvas 文字图案对象
        });
      }
      for (var item of this.scene.children[1].children) {
        if (item.name === "球体容器") {
          // 切换贴图，进入下一张贴图
          var material = new THREE.MeshLambertMaterial({
            map: img, // 设置颜色贴图属性值
            side: THREE.DoubleSide, // 双面渲染
          });
          item.material = material;
        }
      }

      setTimeout(() => {
        // 延迟刷新
        this.refresh();
      }, 100);
    },
    // 清空场景中所有的按钮
    removeButtons() {
      var ball = [];
      ball.push(
        this.scene.children[1].children.find((item) => item.name === "球体容器")
      );
      this.scene.children[1].children = ball;
    },
    getIntersects(event) {
      // 获取与射线相交的对象数组
      event.preventDefault();
      // 声明 raycaster 和 mouse 变量
      var raycaster = new THREE.Raycaster(); // 生成射线
      var mouse = new THREE.Vector2();
      var container = this.$refs.threeDom;
      let getBoundingClientRect = container.getBoundingClientRect();
      // 通过鼠标点击位置，计算出 raycaster 所需点的位置分量，以屏幕为中心点，范围 -1 到 1
      mouse.x =
        ((event.clientX - getBoundingClientRect.left) / container.offsetWidth) *
          2 -
        1;
      mouse.y =
        -(
          (event.clientY - getBoundingClientRect.top) /
          container.offsetHeight
        ) *
          2 +
        1;
      // 通过鼠标点击的位置（二维坐标）和当前相机的矩阵计算出射线位置
      raycaster.setFromCamera(mouse, this.camera);
      // 获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
      var intersects = raycaster.intersectObjects(
        this.scene.children[1].children
      );
      // 返回选中的对象
      return intersects;
    },
  },
};
</script>

<style>
.homePage {
  position: absolute;
  height: 100%;
  width: 100%;
  font-size: 14px;
  color: #303133;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  width: 1600px;
  height: 900px;
}

.card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-title span {
  font-weight: 600;
  font-size: 18px;
}

.model {
  border: 1px solid #dcdfe6;
}

/* 自定义 element 样式 */
.el-card__header {
  padding: 5px 10px;
}
.el-card__body {
  padding: 0;
}
</style>
