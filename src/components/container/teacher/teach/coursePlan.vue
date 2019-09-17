<template>
  <div id="coursePlan">
    <span>精选作品</span>
    <div class="tab-bar">
      <span v-for="(title, index) in tabBarTitle" :key="index" @click="tabBarChange(title)">{{title}} </span>
    </div>
    <div class="divider">
      <div class="blue-bar" :style="tabBarStyle"></div>
    </div>
    <div class="class-info" v-show="currentTabBarTitle===tabBarTitle[0]">
      <table class="table table-hover">
        <thead>
          <tr>
            <th v-for="(title, index) in tableTitle.class" class="title" :key="index">{{title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(line, seq) of currentList.class" :key="seq" class="content">
            <td>{{seq + 1}}</td>
            <td v-for="(value, index) of line" :key="index"> {{value}} </td>
            <td>
              <span class="blue">查看班级</span>&nbsp;&nbsp;
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="course-info" v-show="currentTabBarTitle===tabBarTitle[1]">
      <table class="table table-hover">
        <thead>
          <tr>
            <th v-for="(title, index) in tableTitle.course" class="title" :key="index">{{title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(line, seq) of currentList.course" :key="seq" class="content">
            <td>{{seq + 1}}</td>
            <td v-for="(value, index) of line" :key="index"> {{value}} </td>
            <td>
              <span class="blue">查看课程</span>&nbsp;&nbsp;
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="course-plan">
      <p>  </p>
      <div>还没有课程规划</div>
      <p>  </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'coursePlan',
    data() {
      return {
        tabBarTitle: ["班级信息", "课程信息", "课程规划"],
        tabBarStyle: { 'width': "", 'margin-left': "" },
        currentTabBarTitle: "班级信息",
        tableTitle: {
          class: ["序号", "班级名称", "上课教师", "课程名称", "历史课程", "创建时间", "操作"],
          course: ["序号", "课程名称", "课程介绍", "上课教师", "操作"]
        },
        currentList: {
          class: [
            ["赛迪思1班", "马云", "英语", "无机化学", "2017-08-08"],
            ["赛迪思2班", "刘强东", "历史", "超威数学, 政治, 语文", "2018-09-01"],
            ["赛迪思3班", "马化腾", "语文", "概率论", "2017-09-02"],
            ["赛迪思4班", "王思聪", "JAVA", "操作系统, web程序设计", "2012-03-08"],
            ["赛迪思5班", "王晓瀑", "计算机", "离散数学", "2017-10-20"]
          ],
          course: [
            ["英语", "为了响应国家建设双一流大学的号召, 马云同志率先在我校以身作则建立起这样的创新型班级.", "马云"],
            ["历史", "为了响应国家建设双一流大学的号召, 刘强东同志率先在我校以身作则建立起这样的创新型班级.", "刘强东"],
            ["语文", "为了响应国家建设双一流大学的号召, 马化腾同志率先在我校以身作则建立起这样的创新型班级.", "马华腾"],
            ["JAVA", "为了响应国家建设双一流大学的号召, 王思聪同志率先在我校以身作则建立起这样的创新型班级.", "王思聪"],
            ["计算机", "为了响应国家建设双一流大学的号召, 王晓瀑同志率先在我校以身作则建立起这样的创新型班级.", "王晓瀑"]
          ]
        }
      }
    },
    methods: {
      tabBarChange(titleName) {
        this.currentTabBarTitle = titleName;
        this.tabBarStyle.width = this.currentTabBarTitle.length * 14 + 'px';
        let index = this.tabBarTitle.indexOf(titleName);
        let subTabBarTitle = this.tabBarTitle.slice(0, index);
        let titlesLength = subTabBarTitle.join("").length;
        this.tabBarStyle["margin-left"] = (titlesLength * 14 + index * 30) + 'px';
      },
    },
    mounted() {
      this.tabBarStyle.width = this.currentTabBarTitle.length * 14 + 'px';
      this.tabBarStyle["margin-left"] = "0";
    }
  }
</script>

<style scoped>
  #coursePlan {
    color: #606266;
    font-size: 12px;
  }

  #coursePlan .tab-bar {
    margin-top: 20px;
    font-size: 14px;
    color: #303133;
    display: flex;
  }

  #coursePlan .tab-bar span {
    margin-right: 30px;
  }

  #coursePlan .tab-bar span:hover {
    color: #409eff;
    cursor: pointer;
  }

  #coursePlan .divider {
    margin-top: 15px;
    display: block;
    height: 2px;
    width: 100%;
    background: #e4e7ed;
  }

  #coursePlan .blue-bar {
    background: #409eff;
    height: 100%;
    transition: all .2s;
  }

  #coursePlan table {
    border: #eeeeee;
  }

  #coursePlan table tr {
    text-align: center !important;
  }

  #coursePlan table td {
    vertical-align: middle !important;
  }

  #coursePlan .class-info,
  .course-plan,
  .course-info {
    font-size: 12px;
    color: #606266;
    margin-top: 10px;
  }

  #coursePlan .title {
    text-align: center;
  }

  #coursePlan .content td {
    line-height: 30px;
  }

  #coursePlan .blue {
    cursor: pointer;
    color: #409EFF;
  }

  #coursePlan .red {
    cursor: pointer;
    color: #FF6947;
  }
</style>