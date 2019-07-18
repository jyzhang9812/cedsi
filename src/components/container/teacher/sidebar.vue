<template>
  <div class="row">
    <div class="aside">
      <ul class="menu">
        <li v-for="item in aside" class="bg-hover">
          <div class="item-name" @click="dropDownListListener(item)">
            <i><img :alt="item.name" :src="item.iconSrc"></i>
            <span>{{item.name}}</span>
            <span
              class="menuPosition"
              :class="{'glyphicon glyphicon-menu-down':item.close,
                'glyphicon glyphicon-menu-up':!item.close}"
              v-show="item.children.length !== 0">
              </span>
          </div>
          <div :class="{'collapse': item.close}">
            <ul class="menu nav">
              <li v-for="child in item.children"
                  class="children"
                  @click="$router.push(child.route)">
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

  export default {
    name: "asider",
    data() {
      return {
        aside: [
          {
            name: "工作台",
            iconSrc: "../../../../static/images/aside/staging.png",
            children: [],
            close: true,
            route: "/console/staging"
          },
          {
            name: "教学管理",
            iconSrc: "../../../../static/images/aside/teachingManagement.png",
            children: [
              {name: "作业点评", route: "/console/homework"},
              {name: "精选作品", route: "/console/choiceness"},
              {name: "视频管理", route: "/console/video"}
            ],
            close: true
          },
          {
            name: "活动管理",
            iconSrc: "../../../../static/images/aside/activityManagement.png",
            children: [
              {name: "发布活动", route: "/console/activity"},
              {name: "学生提问", route: "/console/question"},
              {name: "活动评论", route: "/console/opuscomment"},
              {name: "作品评论", route: "/console/topiccomment"},
              {name: "辅导资料", route: "/console/material"}
            ],
            close: true
          },
          {
            name: "统计分析",
            iconSrc: "../../../../static/images/aside/statisticalAnalyses.png",
            children: [
              {name: "学情分析", route: "/console/statistics"}
            ],
            close: true
          },
          {
            name: "个人中心",
            iconSrc: "../../../../static/images/aside/statisticalAnalyses.png",
            children: [],
            close: true,
            route: "/console/space"
          },
          {
            name: "修改密码",
            iconSrc: "../../../../static/images/aside/statisticalAnalyses.png",
            children: [],
            close: true,
            route: "/console/password"
          }
        ],
        height: 0,
        style: ''
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
    }
  }
</script>

<style scoped>

  .row {
    height: 100%;
    margin: 0 !important;
  }

  .menu {
    list-style: none;
    padding-inline-start: 0;
    margin-block-start: 0;
    margin-block-end: 0;
  }

  .menuPosition {
    float: right;
    padding: 20px 20px 0 0;
  }

  .aside {
    color: #FFF;
    background-color: #3766A6;
    width: 220px;
    min-width: 170px;
    height: 100%;
  }

  .item-name {
    height: 50px;
    line-height: 50px;
    padding-left: 28px;
  }

  .item-name:hover {
    background-color: #2C5285;
  }

  .children {
    height: 50px;
    line-height: 50px;
    padding-left: 49px;
  }

  .children:hover {
    background-color: #2C5285;
  }

  .sonContainer {
    position: fixed;
    right: 0;
    left: 250px;
    bottom: 0;
    top: 56px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

</style>
