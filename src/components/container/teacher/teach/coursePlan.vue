<template>
  <div id="coursePlan">
    <span>精选作品</span>
    <div class="tab-bar">
      <span v-for="(title, index) in tabBarTitle" :key="index" @click="tabBarChange(title)">{{title}}
      </span>
    </div>
    <div class="divider">
      <div class="blue-bar" :style="tabBarStyle"></div>
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
</style>