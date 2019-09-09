<template>
  <div id="activity-detial">
    <div
      class="activity-section1"
      :style="{backgroundImage:'url('+require('../../'+$store.state.url+'activity/activitybg.png')+')'}"
    >
      <h1 class="activity-title">玩转算法系列--图论精讲 面试升职必备（Java版）</h1>
      <h2 class="activity-brief">难得一见的系统性讲解，涵盖图论领域经典算法底层实现，深入理解图论算法思想</h2>
      <div
        class="fixed-box"
        :style="{backgroundImage:'url('+require('../../'+$store.state.url+'activity/fixedbg.png')+')'}"
      >
        <div class="activity-price">￥348.00</div>
        <button class="join-btn" @click="payment">我要报名</button>
      </div>
    </div>
    <div class="activity-section2">
      <div class="time-place">
        <div
          class="title-bg"
          :style="{backgroundImage:'url('+require('../../'+$store.state.url+'activity/time.png')+')'}"
        >活动时间</div>
        <div class="content">{{activityTime}}</div>
      </div>
      <div class="time-place">
        <div
          class="title-bg"
          :style="{backgroundImage:'url('+require('../../'+$store.state.url+'activity/time.png')+')'}"
        >活动地点</div>
        <div class="content">{{activityPlace}}</div>
      </div>
    </div>
    <div
      class="activity-section3"
      :style="{backgroundImage:'url('+require('../../'+$store.state.url+'activity/activitydetial.png')+')'}"
    >
      <div class="activity-left">
        <div class="info-name">{{activityName}}</div>
        <div class="info-desc">{{activityDesc}}</div>
      </div>
      <div class="activity-right">
        <div class="teacher">
          <img :src="activityTeacherImg" class="teacher-img" />
        </div>
        <p>{{activityTeacherName}}</p>
      </div>
    </div>
    <div
      class="activity-section4"
      :style="{backgroundImage:'url('+require('../../'+$store.state.url+'activity/activityfooter.jpg')+')'}"
    >
      <div class="row activity-row">
        <div
          class="col-md-4 activity-images"
          v-for="(activityImg,index) in activityImgList"
          :key="index"
        >
          <img :src="activityImg.image" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activityName: "玩转算法系列--图论精讲 面试升职必备（Java版）",
      activityDesc:
        "图论算法是所有计算机专业的同学必学的基础知识；也是在算法，数据结构，离散数学等领域的重要内容；是面试，升职，计算机专业考研，考博的必考内容；更是计算机网络，编译原理，社交网络算法等领域的基础。但是，由于图论算法本身的复杂性和抽象性，让大多数同学头疼不已。在这个课程中，bobo老师将用其独到的问题讲解方式，庖丁解牛，深入浅出，让大家在这个课程中，真正地玩转图论算法。",
      activityTeacherImg:
        "../../"+this.$store.state.url+"activity/teacher.jpg",
      activityTeacherName: "老师名字",
      activityImgList: [
        {
          image: "../../"+this.$store.state.url+"activity/teacher.jpg"
        },
        {
          image: "../../"+this.$store.state.url+"activity/teacher.jpg"
        },
        {
          image: "../../"+this.$store.state.url+"activity/teacher.jpg"
        }
      ],
      activityTime: "2019年6月2日",
      activityPlace: "陕西师范大学新勇活动中心"
    };
  },
  methods:{
    payment(){
      this.$router.push({ path: '/payment' })
    }
  }
};
</script>
<style scoped>
#activity-detial {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  min-width: 1000px;
  overflow-y: hidden;
}
#activity-detial .activity-section1 {
  width: 100%;
  margin: 0 auto;
  height: 280px;
  background-color: #000;
  position: relative;
}
#activity-detial .activity-title {
  text-align: center;
  margin-top: 50px;
  font-size: 40px;
  color: #fff;
  line-height: 48px;
  text-shadow: 0 2px 4px rgba(28, 31, 33, 0.6);
}
#activity-detial .activity-brief {
  text-align: center;
  font-size: 16px;
  color: #fff;
  line-height: 24px;
  text-shadow: 0 2px 4px rgba(28, 31, 33, 0.6);
  margin-top: 8px;
}
#activity-detial .fixed-box {
  position: relative;
  height: 128px;
  width: 80%;
  margin: 0 auto;
  bottom: -64px;
  box-shadow: 0 8px 16px 0 rgba(28, 31, 33, 0.1);
  border-radius: 18px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
#activity-detial .activity-price {
  font-size: 32px;
  color: #f01414;
  line-height: 32px;
  font-weight: 700;
  display: inline-block;
  margin: 40px 0 0 40px;
}
#activity-detial .join-btn {
  width: 160px;
  height: 48px;
  float: right;
  background-color: #f01414;
  color: #fff;
  font-size: 16px;
  line-height: 24px;
  border-radius: 24px;
  border: 1px solid #f01414;
  margin: 35px 40px 0 0;
}
#activity-detial .activity-section3 {
  position: relative;
  width: 80%;
  margin: 0 auto;
  height: 448px;
  top: 50px;
  border-radius: 16px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding: 80px;
}
#activity-detial .activity-left {
  float: left;
  width: 70%;
  height: 100%;
  border-right: 2px solid rgba(255, 255, 255, 0.4);
  padding-right: 30px;
}
#activity-detial .info-name {
  font-weight: 700px;
  font-size: 24px;
  color: #fff;
  line-height: 36px;
}
#activity-detial .info-desc {
  margin-top: 20px;
  font-size: 14px;
  color: #fff;
  line-height: 28px;
}
#activity-detial .activity-right {
  float: left;
  width: 25%;
  height: 100%;
  margin-left: 20px;
  text-align: center;
}
#activity-detial .teacher {
  text-align: center;
  width: 132px;
  height: 132px;
  margin: 20px auto;
}
#activity-detial .teacher-img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}
#activity-detial .activity-right p {
  font-size: 15px;
  color: #fff;
}
#activity-detial .activity-section2 {
  position: relative;
  width: 60%;
  margin: 40px auto;
  top: 50px;
}
#activity-detial .time-place {
  position: relative;
  width: 50%;
  height: 100%;
  float: left;
  text-align: center;
}
#activity-detial .title-bg {
  display: inline-block;
  height: 40px;
  width: 184px;
  font-size: 16px;
  line-height: 40px;
  font-weight: 700;
  background-size: cover;
  color: #fff;
  padding-left: 20px;
}
#activity-detial .content {
  font-size: 14px;
  line-height: 20px;
  margin: 10px;
}
#activity-detial .activity-section4 {
  top: 50px;
  width: 100%;
  position: relative;
  height: 400px;
  margin: 50px 0;
}
#activity-detial .activity-row {
  margin: 0 auto;
  width: 100%;
  padding: 70px;
  height: 100%;
}
#activity-detial .activity-images {
  height: 100%;

  transition: All 0.4s ease-in-out;
  -webkit-transition: All 0.4s ease-in-out;
  -moz-transition: All 0.4s ease-in-out;
  -o-transition: All 0.4s ease-in-out;
}
#activity-detial .activity-images:hover {
  transform: scale(1.1);
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
}
#activity-detial .activity-images img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
</style>