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
  </div>
</template>

<script>
// <summary> 总体逻辑是进入项目后打开 id 为 1 的图片，渲染图片的按钮，点击按钮后跳转到按钮绑定的图片或者执行相应的其他操作。
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
      stats: "", // 性能监控器
      mygroup: "", // 模型组

      action: "", // 控制动画的值
      clock: "", // 时钟
      mixer: "", // 混合实例
      rotateAnimate: "", // 旋转动画
      // isRotate: 1, // 是否开启旋转

      showDialog: false,
      title: "Data",
      // 厂区树形结构
      map: [
        {
          id: 1,
          label: "Village",
          children: [
            {
              id: 2,
              label: "Village frontend",
              children: [
                {
                  id: 4,
                  label: "66#",
                  children: [
                    {
                      id: 5,
                      label: "66#1",
                      children: [
                        {
                          id: 6,
                          label: "home3",
                        },
                        {
                          id: 21,
                          label: "home2",
                        },
                      ],
                    },
                  ],
                },

                {
                  id: 13,
                  label: "Parking Lot",
                },
              ],
            },
            {
              id: 3,
              label: "Village Backend",
            },
          ],
        },
      ],
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
              buttonLocation: [-40, -5, 60], // 按钮的坐标
              buttonType: "jump", // 按钮的类型：jump（跳转到另外一个场景），report，data等，暂时没想好
              paras: "precheck", // 传给按钮动作的参数，因为考虑到可能要非 IT 人员配置，这里直接用 “,” 分隔的字符串
            },
            {
              buttonName: "走廊",
              buttonLocation: [-10, -20, -90],
              buttonType: "jump",
              paras: "passageway",
            },
            {
              buttonName: "办公区",
              buttonLocation: [40, -5, -80],
              buttonType: "jump",
              paras: "office",
            },
            {
              buttonName: "病房",
              buttonLocation: [-5, 0, 100],
              buttonType: "jump",
              paras: "prepare",
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
              buttonLocation: [34, -5, -50],
              buttonType: "jump",
              paras: "reception",
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
              buttonLocation: [2, 0, -120],
              buttonType: "jump",
              paras: "reception",
            },
            {
              buttonName: "手术准备室",
              buttonLocation: [-30, -5, -100],
              buttonType: "jump",
              paras: "prepare",
            },
            {
              buttonName: "手术室",
              buttonLocation: [55, -5, -60],
              buttonType: "jump",
              paras: "surgery",
            },
            {
              buttonName: "影像室",
              buttonLocation: [-25, 0, 70],
              buttonType: "jump",
              paras: "prepare",
            },
          ],
        },
        {
          sortId: 4,
          name: "prepare",
          location: "/img/precheck.jpg",
          buttons: [
            {
              buttonName: "走廊",
              buttonLocation: [23, -5, -30],
              buttonType: "jump",
              paras: "passageway",
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
              buttonLocation: [30, 0, -80],
              buttonType: "jump",
              paras: "reception",
            },
            {
              buttonName: "档案室",
              buttonLocation: [-40, 10, -80],
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
              buttonLocation: [40, 0, -70],
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
              buttonLocation: [40, 0, -70],
              buttonType: "jump",
              paras: "reception",
            },
          ],
        },
        {
          sortId: 8,
          name: "surgery",
          location: "/img/surgery.jpg",
          buttons: [
            {
              buttonName: "走廊",
              buttonLocation: [40, 0, -70],
              buttonType: "jump",
              paras: "passageway",
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
      this.stats.update();
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
      this.stats.update(); // 更新性能监控的值
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
              case "jump":
                {
                  this.$confirm("是否切换场景?", "提示", {
                    confirmButtonText: "切换",
                    cancelButtonText: "取消",
                    type: "warning",
                  }).then(() => {
                    this.action.paused = true;
                    this.changeScene(button.paras);
                  });
                }
                break;
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
