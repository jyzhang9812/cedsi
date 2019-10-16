<template>
  <div class="row" id="admin-sidebar">
    <div class="aside">
      <ul class="menu nav">
        <li v-for="item in aside" :class="item.close==false?'bg-hover active':'bg-hover'" :key="item.name">
          <div class="item-name" @click="dropDownListListener(item)">
            <i class='fa fa-lg' style='color: #fff' :class="item.icon" aria-hidden="true"></i>
            <span>{{item.name}}</span>
            <span class="menuPosition" :class="{'glyphicon glyphicon-menu-down':item.close,
                'glyphicon glyphicon-menu-up':!item.close}" v-show="item.children.length !== 0">
            </span>
          </div>
          <div :class="{'collapse': item.close}">
            <ul class="menu nav">
              <li v-for="child in item.children" class="children" @click="$router.push(child.route)" :key="child.name">
                {{child.name}}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="sonContainer">
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
import { fail } from 'assert';
  export default {
    name: "asider",
    data() {
      return {
        aside: [
          {
            name: "课程管理",
            icon:'fa-book',
            children: [],
            close: true,
            route: "/Admin/"
          },
          {
            name: "视频管理",
            icon: 'fa-film',
            children: [],
            close: true,
            route: "/Admin/videoManagement"
          },
          {
            name: "机构管理",
            icon: 'fa-institution',
            children: [],
            close: true,
            route: "/Admin/organizationManagement"
          },
          {
            name: "活动管理",
            icon: 'fa-flag',
            children: [],
            close: true,
            route: "/Admin/activityManagement"
          },
        ],
        height: 0,
        style: '',
        width: 0
      }
    },
    methods: {
      dropDownListListener(item) {
        if (item.children.length === 0) {
          this.$router.push(item.route);
        } else {
          item.close = !item.close;
        }
      },
      //导航active样式
      // nav(){
      //   var currentRoute=this.$route.fullPath
      //   for(var i=0;i<this.aside.length;i++){
      //     if(this.aside[i].route==currentRoute){
      //       this.aside[i].close=false;
      //     }
      //     else
      //       this.aside[i].close=true;
      //   }
      // }
    },
    created: function () {
      var currentRoute=this.$route.fullPath
      this.width = document.documentElement.clientWidth
      this.screenWidth = 'min-width:' + (this.width - 320) + 'px;'
      //this.nav(currentRoute)
    }
  }
</script>

<style scoped>
  .row {
    margin: 0 !important;
    width: 100%;
    display: flex;
  }

  #admin-sidebar .menu {
    list-style: none;
    padding-inline-start: 0;
    margin-block-start: 0;
    margin-block-end: 0;
  }

  #admin-sidebar .menuPosition {
    float: right;
    padding: 20px 20px 0 0;
  }

  #admin-sidebar .aside {
    color: #FFF;
    background-color: #3766A6;
    width: 220px;
    min-width: 220px;
  }

  #admin-sidebar .item-name {
    height: 50px;
    line-height: 50px;
    padding-left: 28px;
  }

  #admin-sidebar .bg-hover{
    cursor: pointer;
  }
  #admin-sidebar .active{
    background-color: #2C5285;
  }

  #admin-sidebar .item-name:hover {
    background-color: #2C5285;
  }

  #admin-sidebar .children {
    height: 50px;
    line-height: 50px;
    padding-left: 49px;
  }

  #admin-sidebar .children:hover {
    background-color: #2C5285;
  }

  #admin-sidebar .sonContainer {
    right: 0;
    bottom: 0;
    top: 56px;
    flex-grow: 1;
    min-width: 800px;
  }

  .aside-icon {
    width: 18px;
    height: 18px;
  }
</style>