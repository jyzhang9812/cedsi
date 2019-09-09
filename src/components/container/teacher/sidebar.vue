<template>
  <div class="row">
    <div class="asidebg">
      <div class="aside">
        <ul class="menu">
          <li v-for="item in aside" class="bg-hover">
            <div class="item-name" @click="dropDownListListener(item)">
              <i><img :alt="item.name" :src="item.iconSrc" class="aside-icon"></i>
              <span>{{item.name}}</span>
              <span class="menuPosition" :class="{'glyphicon glyphicon-menu-down':item.close,
                'glyphicon glyphicon-menu-up':!item.close}" v-show="item.children.length !== 0">
              </span>
            </div>
            <div :class="{'collapse': item.close}">
              <ul class="menu nav">
                <li v-for="child in item.children" class="children" @click="$router.push(child.route)">
                  {{child.name}}
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
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
            name: "教学管理",
            iconSrc: this.$store.state.url+"aside/teachingManagement.png",
            children: [
              {
                name: "作业点评",
                route: "/console/homework"
              },
              {
                name: "精选作品",
                route: "/console/choiceness"
              },
              {
                name: "视频管理",
                route: "/console/video"
              }
            ],
            close: true
          },
          {
            name: "活动管理",
            iconSrc:this.$store.state.url+"aside/activityManagement.png",
            children: [{
              name: "发布活动",
              route: "/console/activity"
            },
              {
                name: "学生提问",
                route: "/console/question"
              },
              // 2019-07-22
              // 由于业务逻辑不清楚, 暂时关掉这两个页面
              // {
              //   name: "活动评论",
              //   route: "/console/opuscomment"
              // },
              // {
              //   name: "作品评论",
              //   route: "/console/topiccomment"
              // },
              {
                name: "辅导资料",
                route: "/console/material"
              }
            ],
            close: true
          },
          {
            name: "统计分析",
            iconSrc: this.$store.state.url+"aside/statisticalAnalyses.png",
            children: [{
              name: "学情分析",
              route: "/console/statistics"
            }],
            close: true
          },
          {
            name: "个人中心",
            iconSrc: this.$store.state.url+"aside/personalCenter.png",
            children: [],
            close: true,
            route: "/console/space"
          },
          {
            name: "修改密码",
            iconSrc: this.$store.state.url+"aside/modifyPwd.png",
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
//课程规划（教学计划=>名称课时作业布置，考核方式，活动）
//布置作业，收作业，改作业，发通知
//选择作业进行布置
//驳回作业，一次，确认提交之后，重新设置时间
</script>

<style scoped>
  .row {
    /* height: 100%; */
    margin: 0 !important;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
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
    top: 0;
    bottom: 0;
    min-height: 620px;
    float: left;
    display: table;
    height: auto;
  }

  .asidebg {
    background-color: #3766A6;
    width: 220px;
  }

  .aside-icon {
    width: 18px;
    height: 18px;
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
    margin-left: 20px;
    padding: 0;
    width: 100%;
  }

</style>
