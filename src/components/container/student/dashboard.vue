<template>
  <div id="student">
    <!-- 模态框（Modal） -->
    <div
      class="modal fade"
      id="update-info"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">修改个人信息</h4>
          </div>
          <div class="modal-body">
            <div class="modal-head">
              <img class="modal-headimg" :src="user.avatar">
            </div>
            <div class="modal-update">
              <div class="modal-update-text">姓名:</div>
              <input type='text' class="modal-update-info" v-model="user.student_name">
            </div>
            <div class="modal-update">
              <div class="modal-update-text">性别:</div>
              <div class="modal-update-radiogroup">
                <input class="modal-update-radio" type="radio" name="sex" value="man" id="man" @click="getupdatesex()">男
                <input class="modal-update-radio" type="radio" name="sex" value="woman" id="woman"  @click="getupdatesex()">女
              </div>
            </div>
            <div class="modal-update">
              <div class="modal-update-text">年龄:</div>
              <input class="modal-update-info" v-model="user.age">
            </div>
            <div class="modal-update">
              <div class="modal-update-text">年级:</div>
              <input class="modal-update-info" :value="user.grade" disabled="disabled">
            </div>
            <div class="modal-update">
              <div class="modal-update-text">班级:</div>
              <input class="modal-update-info" :value="user.clazz" disabled="disabled">
            </div>
            <div class="modal-update">
              <div class="modal-update-text">家长手机号:</div>
              <input class="modal-update-info" v-model="user.parentTel">
            </div>
            <div class="modal-update">
              <div class="modal-update-text">家庭住址:</div>
              <input class="modal-update-info" v-model="user.address">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submit">提交更改</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2" :style="style">
          <div class="user-info">
            <div class="message-img"></div>
            <div class="header-img">
              <img class="header" :src="user.avatar">
              <img
                class="update-info"
                src="../../../../static/images/sidebar/update-info.png"
                data-toggle="modal"
                data-target="#update-info"
              >
            </div>
            <div class="user">
              <h5 class="user-name">{{user.student_name}}</h5>
            </div>
          </div>
          <ul class="nav nav-sidebar" id="uid">
            <li
              class="title"
              v-for="(title,index) in lists"
              :key="index"
              @mouseleave="hide(index)"
              @mouseenter="show(index)"
            >
              <router-link :to="title.path" tag="div" class="block">
                <div v-show="index==i" class="shutiao"></div>
                <img class="nav-img" :src="title.img">
                {{title.name}}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-md-10 col-md-offset-2 main">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { error } from 'util';
import globalAxios from 'axios'

export default {
  name: "dashboard",
  data() {
    return {
      lists: [
        {
          name: "我的课程",
          img: this.$store.state.url + "sidebar/un-course.png",
          path: "/dashboard/"
        },
        {
          name: "我的班级",
          img: this.$store.state.url + "sidebar/un-class.png",
          path: "/dashboard/class"
        },
        {
          name: "我的作品",
          img: this.$store.state.url + "sidebar/un-mywork.png",
          path: "/dashboard/homework"
        },
        {
          name: "消息中心",
          img: this.$store.state.url + "sidebar/un-message.png",
          path: "/dashboard/message"
        },
        {
          name: "我的问题",
          img: this.$store.state.url + "sidebar/un-question.png",
          path: "/dashboard/question"
        },
        {
          name: "辅导资料",
          img: this.$store.state.url + "sidebar/un-info.png",
          path: "/dashboard/presentation"
        },
        {
          name: "退出登录",
          img: this.$store.state.url + "sidebar/un-exit.png",
          path: "/dashboard/hhh"
        }
      ],
      i: -1,
      seen: false,
      imgpath: this.$store.state.url,
      user: {},
      height:0,
      style:''
    };
  },
  methods: {
    show(index) {
      this.i = index;
      this.seen = true;
      var length = this.lists[index].img.length;
      var img1 = this.lists[index].img.substring(0, 31);
      var img2 = this.lists[index].img.substring(34, length);
      this.lists[index].img = img1 + img2;
    },
    hide(index) {
      this.i = index;
      this.seen = false;
      var length = this.lists[index].img.length;
      var img1 = this.lists[index].img.substring(0, 31);
      var img2 = this.lists[index].img.substring(31, length);
      this.lists[index].img = img1 + "un-" + img2;
    },
    getsex() {
      if (this.user.gender == "男") {
        document.getElementById("man").checked = true;
      } else {
        document.getElementById("woman").checked = true;
      }
    },
    getupdatesex(){
      if(document.getElementById("man").checked == true){
        this.user.gender='男';
        console.log(this.user.gender);
      }else if(document.getElementById("woman").checked == true){
        this.user.gender='女';
        console.log(this.user.gender);
      }else{
        console.log(error)
      }
    },
    submit() {
    console.log(this.user);
    this.$http.patch("", this.user).then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
  },
  created: function() {
    this.height=document.documentElement.clientHeight
    this.style='min-height:'+(this.height-56)+'px;'
    console.log(this.height)

    var token = window.localStorage.getItem('idToken')
    globalAxios.get('https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/student/studentinfo',
        {headers: {
            'Content-Type':'application/json',
            'Authorization': token
          }}
      ).then(response => {
        console.log(response);
        this.user=response.data;
        console.log(this.user);
        this.getsex();
        // return response.json();
      },
      error => {
        console.log(error);
      })
  },

};
</script>

<style>
.container-fluid {
  height: 100%;
}
.row {
  display: flex;
}
.title {
  width: 250px;
  line-height: 60px;
  color: #7580b3;
}
.block{
  padding-left: 30px;
}
.router-link-exact-active{
  /* background-color: #7580b3; */
  color: #fff;
}
.nav > li:hover {
  background-color: #7580b3;
  color: #fff;
}
.active {
  background-color: #7580b3;
  color: #fff;
}
a {
  color: #7580b3;
}
.shutiao {
  position: relative;
  width: 5px;
  height: 60px;
  background-color: #fff;
  float: left;
  left: -25px;
}
/* Hide for mobile, show later */
.col-md-2 {
  width: 16.7%;
  position: relative;
  top: 0px;
  z-index: 999;
  display: block;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
  background-color: #252937;
}
/* Sidebar navigation */
.nav-sidebar {
  margin-left: -20px;
}
.nav-sidebar > li > a {
  padding-right: 20px;
}
.col-md-10 {
  z-index: 1;
  position: relative;
  width: 83.3%;
  padding: 0;
  overflow-y: auto;
  display: block;
}
.col-md-offset-2 {
  margin-left: 0%;
}
/*个人信息栏*/
.user-info {
  width: 150px;
  position: relative;
  height: 150px;
  padding-top: 20px;
  text-align: center;
  margin: 0 auto;
}
.header-img {
  margin: 15px auto;
  width: 70px;
  height: 70px;
  position: relative;
}
.header {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.update-info {
  position: relative;
  width: 20px;
  height: 20px;
  top: -20px;
  left: 40px;
}
.user {
  position: relative;
  margin: 10px auto;
  text-align: center;
  width: 150px;
  height: 150px;
  font-size: 14px;
}
.user-name {
  position: relative;
  color: #fff;
  margin: 0 auto;
  width: 100px;
  line-height: 20px;
}
.user-level {
  color: #7580b3;
  font-size: 13px;
}
.level {
  width: 20px;
  height: 20px;
  display: inline-block;
}
.nav-img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
/*修改个人信息*/
.modal-title {
  text-align: center;
}
.modal-head {
  width: 70px;
  height: 70px;
  margin: 0 auto;
}
.modal-headimg {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.modal-update {
  margin: 20px auto;
  height: 40px;
  width: 400px;
}
.modal-update-radiogroup {
  width: 70%;
  line-height: 40px;
  float: left;
}
.modal-update-info {
  width: 70%;
  height: 40px;
  border-radius: 5px;
  padding-left: 10px;
  border-width: 1px;
  margin-inline-start: 20px;
}
.modal-update-radio {
  width: 20%;
}
.modal-update-text {
  width: 20%;
  height: 100%;
  float: left;
  line-height: 40px;
  text-align: center;
}
</style>
    