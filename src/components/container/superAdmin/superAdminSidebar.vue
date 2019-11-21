<template>
<allsidebar :allside="aside"></allsidebar>
</template>

<script>
import allsidebar from '../../sidebar/allSidebar.vue'
  export default {
    name: "asider",
    components:{allsidebar},
    data() {
      return {
        aside: [
          {
            name: "管理员管理",
            icon:'fa-pencil-square-o' ,//this.$store.state.url+"eduAdmin/icon-02.png",
            children: [],
            close: true,
            route: "/superAdmin/"
          },
        ],
      }
    }
  }
</script>