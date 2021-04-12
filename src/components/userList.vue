<template>
    <div id="userList">
        <el-tree class="userListTree" :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
</template>

<script>
  export default {
    name: "userList",
    data: () => ({
      data: [{
        label: 'IT部门',
        children: [{
          label: '蔡城城',
          path: [                       //  坐标
            [118.588043, 24.860335],
            [118.587043, 24.870335],
            [118.588543, 24.868335],
          ]
        },{
          label: '黄金财',
          path: [                       //  坐标
            [118.578043, 24.892335],
            [118.573043, 24.854335],
            [118.575543, 24.835335],
          ]
        }
        ]
      }, {
        label: '财务部门',
        children: [{
          label: '陈景辉'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
    }),
    methods: {
      handleNodeClick(data) {
        if (data.hasOwnProperty('path')){
            this.$emit('getLocus', data)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    #userList{
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 12rem;
    }
    .userListTree{
        height: 100vh;
    }
</style>
