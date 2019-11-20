<template>
  <div class="row">
    <div class="asidebg">
      <div class="aside">
        <ul class="menu">
          <li v-for="(item,index) in aside" class="bg-hover" :key="index">
            <div class="item-name" @click="dropDownListListener(item)">
              <i class='fa fa-lg' style='color: #fff' :class="item.icon" aria-hidden="true"></i>
              <span>{{item.name}}</span>
              <span class="menuPosition" :class="{'glyphicon glyphicon-menu-down':item.close,
                'glyphicon glyphicon-menu-up':!item.close}" v-show="item.children.length !== 0">
              </span>
            </div>
            <div :class="{'collapse': item.close}">
              <ul class="menu nav">
                <router-link v-for="(child,index) in item.children" class="children" :to="child.route" :key="index"
                  tag="li" active-class="active-teaclass">
                  {{child.name}}
                </router-link>
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
          // {
          //   name: "课程管理",
          //   icon: 'fa-university',
          //   children: [{
          //     name: "课程规划",
          //     route: "/console/coursePlan"
          //   },
          //   {
          //     name: "视频管理",
          //     route: "/console/video"
          //   },
          //   {
          //     name: "辅导资料",
          //     route: "/console/material"
          //   }],
          //   close: true
          // },
          {
            name: "作业管理",
            icon: 'fa-book',
            children: [
              {
                name: "布置作业",
                route: "/console/postJob"
              },
              {
                name: "批改作业",
                route: "/console/homework"
              }
            ],
            close: true
          },
          // {
          //   name: "活动管理",
          //   icon: 'fa-flag',
          //   route: "/console/activity",
          //   children: [],
          //   close: true
          // },
          // {
          //   name: "学生提问",
          //   icon: 'fa-quora',
          //   route: "/console/question",
          //   children: [],
          //   close: true
          // },
          // {
          //   name: "统计分析",
          //   icon: 'fa-bar-chart',
          //   children: [{
          //     name: "学情分析",
          //     route: "/console/statistics"
          //   }],
          //   close: true
          // },
          {
            name: "个人中心",
            icon: 'fa-user',
            children: [
              {
                name: "个人资料",
                route: "/console/userCenter"
              },
              {
                name: "所带班级",
                route: "/console/teachingClass"
              }
            ],
            close: true,
          }],
        height: 0,
        style: ''
      }
    },
    methods: {
      dropDownListListener(item) {
        if (item.children.length === 0) {
          this.$router.push(item.route)
        } else {
          item.close = !item.close
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

  .bg-hover {
    cursor: pointer;
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
    cursor: pointer;
  }

  .children:hover {
    background-color: #2C5285;
  }

  .active-teaclass {
    background-color: #2C5285;
  }

  .sonContainer {
    margin-left: 20px;
    padding: 0;
    width: 100%;
  }
</style>