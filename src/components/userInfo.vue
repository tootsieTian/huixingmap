<template>
    <div id="userInfo">
        <div style="width: 100%; text-align: center"><h3>业务员：蔡城城</h3></div>
        <div v-for="item in userInfo">
            <div  class="userInfo">
                <div>{{item.title}}</div>
                <div>{{item.detail}}</div>
            </div>
            <div style="text-align: center">↓</div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "userInfo",
    data: () => ({
      userInfo: [

        {
          title: "福建省泉州市鲤城区辉映江山",
          detail: '停留时间：11:00-12:30，总时长：1.5h'
        },
        {
          title: "福建省泉州市丰泽区宝洲路宝洲花园",
          detail: '停留时间13:00-14:00，总时长1h'
        },
        {
          title: "厦门市翔安区黄跃清家庭农场",
          detail: '停留时间16:00-19:00,总时长3h'
        },
        {
          title: "厦门市湖里区仙岳路1739号",
          detail: '停留时间20:00-22:00,总时长2h'
        },
      ]
    }),
    methods: {}
  }
</script>

<style lang="scss" scoped>
    #userInfo {
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: 12rem;
        background: white;
    }

    .userInfo {
        font-size: 15px;
        margin: 20px 10px;
        background: #d9f5ff;
        color: #0d408d;
        padding: 5px;
        border-radius: 5px;
    }
</style>
