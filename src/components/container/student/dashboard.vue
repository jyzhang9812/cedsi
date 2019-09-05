<template>
  <div id="student">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2 nav-width" :style="style">
          <ul class="nav nav-sidebar" id="uid">
            <li class="title" v-for="(title,index) in lists" :key="index" @mouseleave="hide(index)"
              @mouseenter="show(index)">
              <router-link :to="title.path" tag="div" class='block'>
                <div class="user-info" v-show="index==0">
                  <div class="message-img"></div>
                  <div class="header-img">
                    <img class="header" :src="user.avatar">
                    <i class="fa fa-bolt fa-lg bolt" aria-hidden="true"></i>
                  </div>
                  <div class="user">
                    <h5 class="user-name">{{user.username}}</h5>
                  </div>
                </div>
                <i class="fa fa-lg" :class='title.img' v-show="index!=0" :style="index==i?'color:#fff':'color:#7580b3'"
                  aria-hidden="true"></i>
                <span v-show="index!=0" style="padding-left: 10px">{{title.name}}</span>
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
  import VueElementLoading from'vue-element-loading'

  export default {
    name: "dashboard",
    components:{
      VueElementLoading
    },
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
            img: 'fa-bandcamp',
            path: "/dashboard/showPage"
          },
          {
            name: "全部课程",
            img: 'fa-2x fa-lightbulb-o',
            path: "/dashboard/course"
          },
          {
            name: "我的作品",
            img: 'fa-cube',
            path: "/dashboard/homework"
          },
          {
            name: "社区",
            img: 'fa-users',
            path: "/dashboard/community"
          },
          {
            name: "我的问题",
            img: 'fa-quora',
            path: "/dashboard/question"
          },
          {
            name: "辅导资料",
            img: 'fa-book',
            path: "/dashboard/presentation"
          },
          {
            name: "个人中心",
            img: 'fa-user-circle-o',
            path: "/dashboard/userCenter"
          },
        ],
        i: 0,
        height: 0,
        style: ''
      };
    },
    methods: {
      show(index) {
        this.i = index;
      },
      hide(index) {
        this.i = index;
      },
    },
    created: function () {
      this.height = document.documentElement.clientHeight
      this.style = 'min-height:' + (this.height - 56) + 'px;'
      console.log(this.height)
      this.$store.commit('updateLoading', true)
      this.$store.dispatch('getUser')
    },
    computed: {
      user: function (state) {
        return this.$store.state.userInfo
      },
    },
  };
</script>

<style scoped>
  #student .container-fluid {
    height: 100%;
  }

  #student .row {
    display: flex;
  }

  #student .title {
    width: 100%;
    line-height: 60px;
    color: #7580b3;
  }

  #student .block {
    padding-left: 30px;
    cursor: pointer;
    transition: all .25s;
  }

  #student .nav>li {
    cursor: pointer;
    min-height: 50px;
    padding-left: 5px;
  }

  #student .nav-width {
    padding-right: 0px; 
  }

  #student .block:hover,
  #student .router-link-exact-active {
    background-color: #2e3347;
    color: #fff;
    border-left: 5px solid #fff;
    padding-left: 30px;
  }

  /* Hide for mobile, show later */
  #student .col-md-2 {
    width: 16.7%;
    position: relative;
    top: 0px;
    /* z-index: 999; */
    display: block;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #252937;
  }

  /* Sidebar navigation */
  #student .nav-sidebar {
    margin-left: -20px;
  }

  #student .nav-sidebar>li>a {
    padding-right: 20px;
    color: #7580b3;
  }

  #student .col-md-10 {
    z-index: 1;
    position: relative;
    width: 83.3%;
    padding: 0;
    overflow-y: auto;
    display: block;
  }

  #student .col-md-offset-2 {
    margin-left: 0%;
  }

  /*个人信息栏*/
  .user-info {
    width: 150px;
    position: relative;
    height: 150px;
    padding-top: 20px;
    padding-right: 30px;
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

  .bolt {
    position: relative;
    color: #ffbf35;
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
    padding-right: 30px;
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
  #student .modal-title {
    text-align: center;
  }

  #student .modal-head {
    width: 70px;
    height: 70px;
    margin: 0 auto;
  }

  #student .modal-headimg {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  #student .modal-update {
    margin: 20px auto;
    height: 40px;
    width: 400px;
  }

  #student .modal-update-radiogroup {
    width: 70%;
    line-height: 40px;
    float: left;
  }

  #student .modal-update-info {
    width: 70%;
    height: 40px;
    border-radius: 5px;
    padding-left: 10px;
    border-width: 1px;
    margin-inline-start: 20px;
  }

  #student .modal-update-radio {
    width: 20%;
  }

  #student .modal-update-text {
    width: 20%;
    height: 100%;
    float: left;
    line-height: 40px;
    text-align: center;
  }
</style>