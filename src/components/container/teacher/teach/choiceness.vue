<template>
  <div class="outside">
    <span>精选作品</span>
    <div class="tab-bar">
      <span v-for="(title, index) in tabBarTitle"
            :key="index"
            @click="tabBarChange(title)">{{title}}
      </span>
    </div>
    <div class="divider">
      <div class="blue-bar" :style="tabBarStyle"></div>
    </div>
    <div class="panels" v-if="currentTabBarTitle === tabBarTitle[0]">
      <table class="table table-hover">
        <thead>
        <tr>
          <th v-for="(title,index) in tableTitle_0"
              :key="index" class="title">{{title}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(line, index) in currentFirstList"
            :key="index"
            class="content">
          <td>{{index + 1}}</td>
          <td v-for="(item, index) in line" :key="index">{{item}}</td>
          <td>
            <span class="blue">查看作品</span> &nbsp;&nbsp;
            <span class="blue">审核</span> &nbsp;&nbsp;
            <span class="red">删除</span>
          </td>
        </tr>
        </tbody>
      </table>
      <pagination :num="tableData_0.length"
                  @getNew="changeFirstTablePages"
                  :limit="limit">
      </pagination>
    </div>
    <div class="uploadWorks" v-if="currentTabBarTitle === tabBarTitle[1]">
      <button>上传精选作品</button>
      <table class="table table-hover">
        <thead>
        <tr>
          <th v-for="(title, index) in tableTitle_1" class="title" :key="index">{{title}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(line, seq) in currentSecondList" :key="seq" class="content">
          <td>{{seq + 1}}</td>
          <td v-for="(item, index) in line" :key="index">{{item}}</td>
          <td><span class="blue">编辑</span>&nbsp;&nbsp;<span class="red">删除</span></td>
        </tr>
        </tbody>
      </table>
      <pagination :num="tableData_1.length"
                  @getNew="changeSecondTablePages"
                  :limit="limit">
      </pagination>
    </div>
  </div>
</template>

<script>
  import Pagination from "../utils/pagination";

  export default {
    name: "choiceness",
    components: {Pagination},
    data() {
      return {
        limit: 10,
        tabBarTitle: ["学生作品审核", "上传精选作品"],
        currentTabBarTitle: "学生作品审核",
        tableTitle_0: ["序号", "作者姓名", "手机号码", "提交时间", "作品", "所属学校", "状态", "操作"],
        tableData_0: [
          [
            "赛小迪",
            "13152081872",
            "2019-5-2 19:30",
            "超级玛丽",
            "师大附小",
            "已拒绝"
          ],
          [
            "赛大迪",
            "16516661682",
            "2017-5-2 15:03",
            "超级玛丽",
            "师大附小",
            "已拒绝"
          ]
        ],
        tableTitle_1: ["序号", "作者姓名", "提交时间", "作品", "所属学校", "操作"],
        tableData_1: [
          [
            "赛小迪",
            "2019-5-2 19:30",
            "超级玛丽",
            "师大附小"
          ],
          [
            "赛大迪",
            "2017-5-2 15:03",
            "超级玛丽",
            "师大附小"
          ]
        ],
        tabBarStyle: {
          'width': "",
          'margin-left': ""
        },
        currentFirstList: [],
        currentSecondList: []
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
      changeFirstTablePages(value) {
        this.currentFirstList = this.tableData_0.slice(value, value + this.limit);
      },
      changeSecondTablePages(value) {
        this.currentSecondList = this.tableData_1.slice(value, value + this.limit)
      }
    },
    mounted() {
      this.tabBarStyle.width = this.currentTabBarTitle.length * 14 + 'px';
      this.tabBarStyle["margin-left"] = "0";
      this.changeFirstTablePages(0);
      this.changeSecondTablePages(0);
    }
  }
</script>

<style scoped>
  .outside {
    color: #606266;
    font-size: 12px;
  }

  .blue {
    color: #409EFF;
    cursor: pointer;
  }

  .red {
    color: #FF6947;
    cursor: pointer;
  }

  .title {
    text-align: center;
  }

  .content td {
    line-height: 30px;
  }

  .panels {
    margin-top: 20px;
    font-size: 12px;
    color: #606266;
  }

  .panels tr {
    height: 40px;
  }

  table tr {
    text-align: center !important;
  }

  table td {
    vertical-align: middle !important;
  }

  .tab-bar {
    margin-top: 20px;
    font-size: 14px;
    color: #303133;
    display: flex;
  }

  .tab-bar span {
    margin-right: 30px;
  }

  .tab-bar span:hover {
    color: #409eff;
    cursor: pointer;
  }

  .divider {
    margin-top: 15px;
    display: block;
    height: 2px;
    width: 100%;
    background: #e4e7ed;
  }

  .blue-bar {
    background: #409eff;
    height: 100%;
    transition: all .2s;
  }

  .uploadWorks {
    margin-top: 15px;
  }

  .uploadWorks button {
    width: 105px;
    border: none;
    background: #409eff;
    color: #FFF;
    height: 30px;
    border-radius: 5px;
    font-size: 12px;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    margin-bottom: 10px;
  }

  .uploadWorks button:focus {
    outline: none;
  }

  .uploadWorks button:hover {
    background: #66b1FF;
  }

</style>
