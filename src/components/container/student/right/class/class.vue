<template>
  <div id="setup">
    <div class="menu">
      <button
        @click="curId = index"
        v-for="(button,index) in buttons"
        :key="index"
        :class="[{'active':index===curId}, 'top-buttons']"
      >{{button}}</button>
    </div>
    <div style="margin-top: 10px;overflow-y:auto;">
      <course-card v-if="0===curId"></course-card>
      <new-class v-if="1===curId"></new-class>
      <update-user v-if="2===curId"></update-user>
      <payment v-if="3===curId"></payment>
    </div>
  </div>
</template>

<script>
import CourseCard from "../course/courseCard.vue";
import UpdateUser from "../userCenter/updateUser.vue";
import Payment from "../userCenter/payment.vue";
import NewClass from "./new.vue";

export default {
  name: "class",
  components: { NewClass, CourseCard, UpdateUser, Payment },
  data() {
    return {
      curId: 0,
      buttons: ["我的课程", "我的班级", "个人资料", "我的订单"]
    };
  }
};
</script>

<style scoped>
#setup {
  background: url("https://www.tynker.com/image/dashboard/student/public-profile/profile-hero-adventurer-01-08-2018.png"),
    linear-gradient(45deg, #2ad3b6 0%, #99f3b1 100%);
  height: 100%;
}

#setup .menu {
  padding-top: 10px;
  padding-right: 40px;
  display: flex;
  justify-content: left;
}

#setup .top-buttons {
  background-color: rgba(46, 51, 71, 0.5);
  display: inline-block;
  margin: 10px;
  padding: 7px 20px;
  color: #fff;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  outline: none;
}

#setup .top-buttons:hover,
#setup .active {
  background-color: #fff;
  color: #2e3347;
}
</style>