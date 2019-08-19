<template>
  <div id="student">
    <!-- 模态框（Modal） -->
    <div class="modal fade" id="update-info" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
      aria-hidden="true">
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
              <div class="modal-update-text">昵称:</div>
              <input type='text' class="modal-update-info" v-model="user.username">
            </div>
            <div class="modal-update">
              <div class="modal-update-text">性别:</div>
              <div class="modal-update-radiogroup">
                <input class="modal-update-radio" type="radio" :checked="user.gender == '1' ? 'true':'' " id="man" 
                @click="getupdatesex()">男
                <input class="modal-update-radio" type="radio" :checked="user.gender == '1' ? '':'true' " id="woman"
                  @click="getupdatesex()">女
              </div>
            </div>
            <div class="modal-update">
              <div class="modal-update-text">加入时间:</div>
              <input class="modal-update-info" v-model="user.time">
            </div>
            <div class="modal-update">
              <div class="modal-update-text">邮箱:</div>
              <input class="modal-update-info" v-model="user.email">
            </div>
            <div class="modal-update">
              <div class="modal-update-text">移动电话:</div>
              <input class="modal-update-info" v-model="user.mobile">
            </div>
            <div class="modal-update">
              <div class="modal-update-text">固定电话:</div>
              <input class="modal-update-info" v-model="user.phone">
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
          <ul class="nav nav-sidebar" id="uid">
            <li class="title" v-for="(title,index) in lists" :key="index" @mouseleave="hide(index)"
              @mouseenter="show(index)">
              <router-link :to="title.path" tag="div" class='block'>
                <div v-show="index==i" :class="index==0?'shutiao_long':'shutiao'"></div>
                <div class="user-info" v-show="index==0">
                  <div class="message-img"></div>
                  <div class="header-img">
                    <img class="header" :src="user.avatar">
                    <img class="update-info" src="../../../../static/images/sidebar/update-info.png" data-toggle="modal"
                      data-target="#update-info">
                  </div>
                  <div class="user">
                    <h5 class="user-name">{{user.username}}</h5>
                  </div>
                </div>
                <img v-show="index!=0" class="nav-img" :src="title.img">
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
            name: "",
            img: "",
            path: "/dashboard/class"
          },
          {
            name: "我的首页",
            img: this.$store.state.url + "sidebar/un-course.png",
            path: "/dashboard/showPage"
          },
          {
            name: "全部课程",
            img: this.$store.state.url + "sidebar/un-course.png",
            path: "/dashboard/"
          },
          {
            name: "我的作品",
            img: this.$store.state.url + "sidebar/un-mywork.png",
            path: "/dashboard/homework"
          },
          {
            name: "社区",
            img: this.$store.state.url + "sidebar/un-mywork.png",
            path: "/dashboard/community"
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
        ],
        i: -1,
        seen: false,
        imgpath: this.$store.state.url,
        height: 0,
        style: ''
      };
    },
    methods: {
      show(index) {
        this.i = index;
        this.seen = true;
        var length = this.lists[index].img.length;
        var img1 = this.lists[index].img.substring(0, 34);
        var img2 = this.lists[index].img.substring(37, length);
        this.lists[index].img = img1 + img2;
      },
      hide(index) {
        this.i = index;
        this.seen = false;
        var length = this.lists[index].img.length;
        var img1 = this.lists[index].img.substring(0, 34);
        var img2 = this.lists[index].img.substring(34, length);
        this.lists[index].img = img1 + "un-" + img2;
      },

      //更新暂时还有点问题
      getupdatesex() {
        if (document.getElementById("man").checked == true) {
          this.user.gender = '男';
          console.log(this.user.gender);
        } else if (document.getElementById("woman").checked == true) {
          this.user.gender = '女';
          console.log(this.user.gender);
        } else {
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
    created: function () {
      this.height = document.documentElement.clientHeight
      this.style = 'min-height:' + (this.height - 56) + 'px;'
      console.log(this.height)
      this.$store.dispatch('getUser')
    },
    computed: {
      user:function(state) {
        return this.$store.state.userInfo
      },
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

  .block {
    padding-left: 30px;
    cursor: pointer;
  }

  .block_lg {
    padding-left: 0px;
  }

  .router-link-exact-active {
    /* background-color: #7580b3; */
    color: #fff;
  }

  .nav>li:hover {
    background-color: #7580b3;
    color: #fff;
  }

  .nav>li:active {
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

  .shutiao_long {
    position: relative;
    width: 5px;
    height: 150px;
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
    overflow-y: auto;
    /* Scrollable contents if viewport is shorter than content. */
    background-color: #252937;
  }

  /* Sidebar navigation */
  .nav-sidebar {
    margin-left: -20px;
  }

  .nav-sidebar>li>a {
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