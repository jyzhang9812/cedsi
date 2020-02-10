<template>
  <allsidebar :allside="aside"></allsidebar>
</template>

<script>
import allsidebar from "../../sidebar/allSidebar.vue";

export default {
  name: "asider",
  components: { allsidebar },
  data() {
    return {
      aside: [
        {
          name: "教务管理",
          icon: "el-icon-school",
          children: [
            { name: "班级管理", route: "/eduAdmin/classManagement" },
            { name: "学生管理", route: "/eduAdmin/stuManagement" },
            { name: "教师管理", route: "/eduAdmin/teacherManagement" }
          ],
          close: true
        },
        {
          name: "活动管理",
          icon: "el-icon-s-flag",
          children: [{ name: "发布活动", route: "/eduAdmin/activity" }],
          close: true
        },
        // {
        //   name: "统计分析",
        //   icon: 'fa-bar-chart',
        //   children: [
        //     { name: "学情分析", route: "/eduAdmin/statistics" }
        //   ],
        //   close: true
        // },
        {
          name: "个人资料",
          icon: "el-icon-s-custom",
          children: [],
          close: true,
          route: "/eduAdmin/userCenter"
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>