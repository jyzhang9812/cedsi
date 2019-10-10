<template>
  <div id="eduSidebar">
    <div class="aside">
      <ul class="menu">
        <li v-for="item in aside" class="bg-hover" :key="item.name">
          <div class="item-name" @click="dropDownListListener(item)">
            <i class='fa fa-lg' style='color: #fff' :class="item.icon" aria-hidden="true"></i>
            <span>{{item.name}}</span>
            <span class="menuPosition" :class="{'glyphicon glyphicon-menu-down':item.close,
                'glyphicon glyphicon-menu-up':!item.close}" v-show="item.children.length !== 0">
            </span>
          </div>
          <div :class="{'collapse': item.close}">
            <ul class="menu nav">
              <router-link v-for="child in item.children" active-class="u-link--Active" tag="li" class="children"
                :to="child.route" :key="child.name">
                {{child.name}}
              </router-link>
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

  export default {
    name: "asider",
    data() {
      return {
        aside: [
          {
            name: "工作台",
            icon: 'fa-desktop',
            children: [],
            close: true,
            route: "/eduAdmin/"
          },
          {
            name: "教务管理",
            icon: 'fa-graduation-cap',
            children: [
              { name: "班级管理", route: "/eduAdmin/classManagement" },
              { name: "学生管理", route: "/eduAdmin/stuManagement" },
              { name: "教师管理", route: "/eduAdmin/teacherManagement" },
            ],
            close: true
          },
          {
            name: "活动管理",
            icon: 'fa-flag',
            children: [
              { name: "发布活动", route: "/eduAdmin/activity" },
            ],
            close: true
          },
          {
            name: "统计分析",
            icon: 'fa-bar-chart',
            children: [
              { name: "学情分析", route: "/eduAdmin/statistics" }
            ],
            close: true
          }
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
      }
    },
    created: function () {
      this.width = document.documentElement.clientWidth,
        this.screenWidth = 'min-width:' + (this.width - 320) + 'px;'
    }
  }
</script>

<style scoped>
  #eduSidebar {
    margin: 0 !important;
    width: 100%;
    display: flex;
  }

  #eduSidebar .menu {
    list-style: none;
    padding-inline-start: 0;
    margin-block-start: 0;
    margin-block-end: 0;
  }

  #eduSidebar .menuPosition {
    float: right;
    padding: 20px 20px 0 0;
  }

  #eduSidebar .aside {
    color: #FFF;
    background-color: #3766A6;
    width: 220px;
    min-width: 170px;
    min-height: 620px;
  }

  .aside-icon {
    width: 18px;
    height: 18px;
  }
  .bg-hover {
    cursor: pointer;
  }

  #eduSidebar .item-name {
    height: 50px;
    line-height: 50px;
    padding-left: 28px;
  }

  #eduSidebar .item-name:hover {
    background-color: #2C5285;
  }

  #eduSidebar .children {
    height: 50px;
    line-height: 50px;
    padding-left: 49px;
    cursor: pointer;
  }

  #eduSidebar .children:hover {
    background-color: #2C5285;
  }

  .u-link--Active {
    background-color: #2C5285;
  }

  #eduSidebar .sonContainer {
    right: 0;
    bottom: 0;
    top: 56px;
    flex-grow: 1;
    min-width: 800px;
  }
</style>