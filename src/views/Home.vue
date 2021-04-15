<template>
    <div class="trackquery">
        <user-list style="z-index: 100"></user-list>
        <user-info style="z-index: 200"></user-info>
        <div id="container" class="map" style="width: 100vw;height: 100vh"></div>
        <div class="contbtn" v-if="lineArr.length > 0">
            <div class="flex-demo">
                <el-button v-if="starshow" class="btncol" type="primary" @click="starmove">开始动画</el-button>
            </div>
            <div class="flex-demo">
                <el-button :disabled="btndisabled" v-if="endshow ==true" class="btncol" type="danger" @click="endmove">
                    暂停播放
                </el-button>
                <el-button :disabled="btndisabled" v-if="endshow ==false" class="btncol" type="success"
                           @click="resumeAnimation">继续播放
                </el-button>
            </div>
        </div>
    </div>
</template>
<script>
  import UserList from "../components/userList";
  import UserInfo from "../components/userInfo";
  export default {
    name: "Home",
    components: {UserInfo, UserList},
    data: () => ({
      btndisabled: true,
      starshow: true,
      endshow: true,
      map: "",
      lineArr: [],
      lineArrlast: [],
      lineArrPre: [],
      marker: "",
      k: 0
    }),
    created() {
    },
    mounted() {
      setTimeout(() => {
        this.getmap();
      }, 1000);
      // 初始化地图
    },
    methods: {

      getmap() {
        //  测试数据
        this.lineArr = ["24.8793249449,118.65152166927|24.8733349449,118.64982166927|24.8632877604,118.65876600477|24.8733064779,118.6587516276|24.8732354058,118.65877929688|24.8731488715,118.65866102431|24.8730938043,118.65865604384|24.8729125977,118.65849093967|24.872827691,118.65824158203|24.8727848307,118.65822238498|24.8727718099,118.65802517361|24.8728314887,118.65778184679|24.8729032446,118.65748616536|24.8728721788,118.6572781033|24.8728428819,118.65718641493|24.8728192817,118.65690456814|24.872827691,118.65672688802|24.8728881836,118.65657172309|24.8728849284,118.65644504123|24.8727517361,118.65618109809|24.8724210612,118.65612792969|24.8722357856,118.65611328125|24.8721343316,118.65603135851"];
        let self = this;
        let polylineX, nColorLength,
          currentLen,
          latlonarr,
          pointList;
        let colors = [
          "#3366cc",
          "#dc3912",
          "#109618",
          "#990099",
          "#0099c6",
          "#dd4477",
          "#66aa00",
          "#316395",
          "#994499",
          "#22aa99",
          "#6633cc",
          "#329262",
          "#6574a6",
          "#3b3eac"
        ];
        this.map = new AMap.Map("container", {
          resizeEnable: true,
          center: [118.588043, 24.860335],
          zoom: 12
        });
        if (this.lineArr.length > 0) {
          for (let j = 0; j < this.lineArr.length; j++) {
            polylineX = "polyline" + j;          //计算取颜色的函数
            nColorLength = colors.length;
            currentLen = 0;
            if (j > nColorLength) {
              currentLen = j % 14;
            } else {
              currentLen = j;
            }
            latlonarr = this.lineArr[j].split("|");
            if (latlonarr.length > 0) {
              if (j < this.lineArr.length - 1) {
                this.lineArrPre = [];
                for (let i = 0; i < latlonarr.length; i++) {
                  pointList = latlonarr[i].split(",");
                  if (pointList.length > 0) {
                    this.lineArrPre.push(
                      new AMap.LngLat(pointList[1], pointList[0])
                    );
                  }
                }
                polylineX = new AMap.Polyline({
                  map: this.map,
                  path: this.lineArrPre,
                  showDir: true,
                  strokeColor: colors[currentLen], //线颜色
                  strokeWeight: 6 //线宽
                });
              } else {
                //最后一条轨迹绘制移动轨迹
                for (let i = 0; i < latlonarr.length; i++) {
                  pointList = latlonarr[i].split(",");
                  if (pointList.length > 0) {
                    this.lineArrlast.push(
                      new AMap.LngLat(pointList[1], pointList[0])
                    );
                  }
                }
                polylineX = new AMap.Polyline({
                  map: this.map,
                  path: this.lineArrlast,
                  showDir: true,
                  strokeColor: colors[currentLen], //线颜色
                  strokeWeight: 6 //线宽
                });
                if (this.lineArrlast.length > 0) {
                  this.marker = new AMap.Marker({
                    map: this.map,
                    position: [this.lineArrlast[0].lng, this.lineArrlast[0].lat],
                    icon: "https://webapi.amap.com/images/car.png",
                    offset: new AMap.Pixel(-26, -13),
                    autoRotation: true,
                    angle: -90
                  });
                }
                var passedPolyline = new AMap.Polyline({
                  map: this.map,
                  // path: lineArr,
                  strokeColor: "#AF5", //线颜色
                  strokeOpacity: 1, //线透明度
                  strokeWeight: 6 //线宽
                  // strokeStyle: "solid"  //线样式
                });
                this.marker.on("moving", function (e) {
                  passedPolyline.setPath(e.passedPath);
                });
              }
            }
          }
        }
        this.map.setFitView();
      },
      //开始播放
      starmove() {
        this.endshow = true;
        this.starshow = true;
        this.btndisabled = false;
        this.marker.moveAlong(this.lineArrlast, 500);
      },
      //暂停播放
      endmove() {
        this.endshow = false;
        this.marker.pauseMove();
      },
      //继续播放
      resumeAnimation() {
        this.endshow = true;
        this.marker.resumeMove();
      },
      //停止播放
      stopAnimation() {
        this.marker.stopMove();
      }
    }
  };
</script>
<style scoped>
    .contbtn {
        position: fixed;
        top: 15%;
        left: 12%;
        min-height: 130px;
        min-width: 200px;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .btncol {
        margin: 10px 0;
    }
</style>
