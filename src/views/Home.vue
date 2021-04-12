<template>
    <div id="home">
        <userList class="userList" @getLocus="getLocus"></userList>
        <div id="container" class="map" style="width: 100vw;height: 100vh"></div>
    </div>
</template>
<script>
    import userList from "../components/userList";
  export default {
    name: "Home",
    data: () => ({
      map: ""
    }),
    components: {
      userList
    },
    created() {
    },
    mounted() {
      setTimeout(() => {
        this.getmap();
      }, 1000);
      // 初始化地图
    },
    methods: {
      /**
       * 生成一条轨迹线
       * @param data：人员轨迹数据 1、label：人员名称；2、path：轨迹数据
       */
      getLocus(data) {
        console.log(data)
        new AMap.Polyline({             //  画一条轨迹线
          map: this.map,                //  所在地图
          path: data.path,
          showDir: true,                //  是否显示轨迹方向
          strokeColor: ["#000000"],     //  线颜色
          strokeWeight: 6,              //  线宽
          strokeStyle: 'solid',         //  线样式
        });
        this.map.setFitView();  // 根据覆盖物自动适应地图范围
      },
      getmap() {
        this.map = new AMap.Map("container", {  // 生成地图
          resizeEnable: true,                   // 监控地图变化
          center: [118.588043, 24.860335],      //  中心点
          zoom: 12                              //  初始地图大小
        });
        this.map.setFitView();  // 根据覆盖物自动适应地图范围
      }
    }
  };
</script>
<style scoped>
    .userList{
        z-index: 999
    }
</style>
