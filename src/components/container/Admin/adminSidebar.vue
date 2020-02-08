<template>
  <allsidebar :allside="aside"></allsidebar>
</template>

<script>
  import allsidebar from '../../sidebar/allSidebar.vue';
  import { fail } from 'assert';
  export default {
    name: "asider",
    components: { allsidebar },
    data() {
      return {
        aside: [
          {
            name: "课程管理",
            icon: 'el-icon-notebook-2',
            children: [],
            close: true,
            route: "/Admin/"
          },
          {
            name: "视频管理",
            icon: 'el-icon-film',
            children: [],
            close: true,
            route: "/Admin/videoManagement"
          },
          {
            name: "机构管理",
            icon: 'el-icon-office-building',
            children: [],
            close: true,
            route: "/Admin/organizationManagement"
          },
          // {
          //   name: "活动管理",
          //   icon: 'el-icon-s-flag',
          //   children: [],
          //   close: true,
          //   route: "/Admin/activityManagement"
          // },
          {
            name: "个人资料",
            icon: 'el-icon-s-custom',
            children: [],
            close: true,
            route: "/Admin/userCenter"
          },
        ]
      }
    }
  }
</script>

<style scoped>
</style>