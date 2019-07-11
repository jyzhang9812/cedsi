<template>

  <div class="course">

    <router-link to="/dashboard/scratch"
      class="course_card"
      v-for="(item,index) in inside_detail"
      :key="index"
    >
      <div class="inside" @mouseover="show(index)" @mouseleave="hidden(index)">
        <img class="img" :src="item.img_url">
        <div class="details" v-show="index==i">
          <div class="detail_item">
            <img class="icon" src='../../../../static/images/dashboard/class.png'>
            <span>开课进度: {{item.status.haveStarted}} / {{item.status.chaptersNum}}</span>
          </div>
          <div class="detail_item">
            <img class="icon" src='../../../../static/images/dashboard/learn.png'>
            <span>学习进度: {{item.status.haveLearned}} / {{item.status.chaptersNum}}</span>
          </div>
          <div class="detail_item">
            <img class="icon" src='../../../../static/images/dashboard/star_active.png'>
            <span>总星数: {{item.status.homeworkStars}}</span>
          </div>
          <div class="detail_item">
            <img class="icon" src='../../../../static/images/dashboard/homework.png'>
            <span>作业提交次数: {{item.status.homeworkNum}}</span>
          </div>
          <div class="detail_item">
            <img class="icon" src='../../../../static/images/dashboard/create.png'>
            <span>自由创作次数: {{item.status.creationNums}}</span>
          </div>
        </div>
      </div>
      <div class="outside">
        <h4>{{item.course_name}}</h4>
        <button :class="(index==i)?btnh:btn">开始学习</button>
      </div>
    </router-link>

  </div>

</template>


<script>
export default {
  name: "lunbo",
  data() {
    return {
      btn: "btn",
      btnh: "btnhover",
      isShow: false,
      inside_detail: [],
      calleft: 0,
      i: -1,
    };
  },
  methods: {
    show(index) {
      this.i = index;
      this.isShow = true;
    },
    hidden(index) {
      this.i = -1;
      this.isShow = false;
    }
  },
  created: function() {
    //let that = this.$router;
    this.$http
      .get("https://jt6s63r7of.execute-api.us-east-2.amazonaws.com/prod/courses").then(response => {
          var arr=[];
          console.log(response.body);
          for(var i = 0;i<response.body.length;i++){
            arr.push(response.body[i])
          }
          this.inside_detail = arr;
          return response.json();
        },
        error => {
  
          console.log(error);
        }
      );
    }
}
</script>


<style scoped>
.course {
  /* background: linear-gradient(to right, #134a68, #006c9b); */
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  /* min-height: 620px; */
}
.course_card {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 20px;
  text-decoration:none
}
.img {
  width: 300px;
  height: 200px;
  border-radius: 20px;
}
.inside {
  border-radius: 20px;
  color: #fff;
}
.inside:hover {
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  -ms-transform: scale(1.05);
  -o-transform: scale(1.05);
  transform: scale(1.05);
  box-shadow: 0px -10px 10px 2px #ccc, /*上边阴影*/ -2px 0px 10px 2px #ccc,
    /*左边阴影*/ 2px 0px 10px 2px #ccc,
    /*右边阴影*/ 0px 10px 10px 2px #ccc; /*下边阴影*/
}
.btn {
  background: #51c79f;
  color: #fff;
  height: 30px;
  width: 70px;
  font-size: 12px;
  text-align: center;
  margin-right: 10px;
  margin-top: 10px;
  font-weight: bold;
}
.btnhover {
  background: #51c79f;
  color: #fff;
  height: 35px;
  width: 75px;
  font-size: 12px;
  text-align: center;
  margin-right: 10px;
  margin-top: 10px;
  font-weight: bold;
  border-radius: 8px;
}
.details {
  width: 300px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: -200px;
  position: relative;
  border-radius: 20px;
  padding-top: 20px;
}
.detail_item {
  margin-left: 40px;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  position: relative;
  border-radius: 20px;
}
.outside {
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 300px;
  font-size: 12px;
  justify-content: space-between;
}
h4 {
  margin-top: 15px;
  margin-left: 10px;
  color: #25293a;
}
.icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>