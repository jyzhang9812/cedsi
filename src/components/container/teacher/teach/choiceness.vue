<template>
  <div id="choiceness">
    <span>精选作品</span>
    <div class="tab-bar">
      <span v-for="(title, index) in tabBarTitle" :key="index" @click="tabBarChange(title)">{{title}}
      </span>
    </div>
    <div class="divider">
      <div class="blue-bar" :style="tabBarStyle"></div>
    </div>
    <div class="panels" v-if="currentTabBarTitle === tabBarTitle[0]">
      <table class="table table-hover">
        <thead>
          <tr>
            <th v-for="(title,index) in tableTitle_0" :key="index" class="title">{{title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(line, index) in currentFirstList" :key="index" class="content">
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
      <pagination :num="tableData_0.length" @getNew="changeFirstTablePages" :limit="limit">
      </pagination>
    </div>
    <div class="uploadWorks" v-if="currentTabBarTitle === tabBarTitle[1]">
      <div v-show="!isUploadWorks">
        <button @click="isUploadWorks = !isUploadWorks">上传精选作品</button>
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
        <pagination :num="tableData_1.length" @getNew="changeSecondTablePages" :limit="limit">
        </pagination>
      </div>
      <div v-show="isUploadWorks" class="uploadWorks-page">
        <div>
          <span>选择文件</span>
          <button>选择作品</button>
          <label>
            liuxingyu.sb3
          </label>
        </div>
        <div>
          <span>作者</span>
          <input type="text" placeholder="请填写作者" v-model="uploadWorks.author">
        </div>
        <div>
          <span>所属学校</span>
          <div style="display: inline">
            <select-input id="uploadWorks_school" :tips="uploadWorks.tips" :dropDownList="uploadWorks.school"
              :option="uploadWorks.option">
            </select-input>
          </div>
        </div>
        <div>
          <span>作品名称</span>
          <input type="text" placeholder="请填写作品名称" v-model="uploadWorks.workName">
        </div>
        <div>
          <span>作品介绍</span>
          <textarea placeholder="介绍一下你的作品吧!" v-model="uploadWorks.workIntroduction"></textarea>
        </div>
        <div>
          <span>操作说明</span>
          <textarea placeholder="如果你的作品需要操作互动,请不要忘记告诉大家操作方法哦!" v-model="uploadWorks.operatingInstruction"></textarea>
        </div>
        <div>
          <span>上传封面</span>
          <button>选择封面</button>
          <label>
            <img src="https://cedsi.s3.cn-northwest-1.amazonaws.com.cn/static/bg-02.jpg" alt="">
            henrenx.png
          </label>
        </div>
        <div class="btn-uploadWorks">
          <button>确认上传</button>
          <button @click="cancelUploadWorks">取消上传</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Pagination from "../utils/pagination";
  import selectInput from "../utils/selectInput";

  export default {
    name: "choiceness",
    components: { Pagination, selectInput },
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
        currentSecondList: [],
        isUploadWorks: false,
        uploadWorks: {
          school: ['师大一中', '师大二中', '师大三中'],
          option: '师大一中',
          tips: '请选择',
          workFile: "",
          author: "",
          workName: "",
          workIntroduction: "",
          operatingInstruction: "",
          coverFile: ""
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
      changeFirstTablePages(value) {
        this.currentFirstList = this.tableData_0.slice(value, value + this.limit);
      },
      changeSecondTablePages(value) {
        this.currentSecondList = this.tableData_1.slice(value, value + this.limit)
      },
      cancelUploadWorks() {
        this.isUploadWorks = !this.isUploadWorks;
        // 清空文件
        // 清空输入
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
  #choiceness {
    color: #606266;
    font-size: 12px;
  }

  #choiceness .blue {
    color: #409EFF;
    cursor: pointer;
  }

  #choiceness .red {
    color: #FF6947;
    cursor: pointer;
  }

  #choiceness .title {
    text-align: center;
  }

  #choiceness .content td {
    line-height: 30px;
  }

  #choiceness .panels {
    margin-top: 20px;
    font-size: 12px;
    color: #606266;
  }

  #choiceness .panels tr {
    height: 40px;
  }

  #choicenesstable tr {
    text-align: center !important;
  }

  #choicenesstable td {
    vertical-align: middle !important;
  }

  #choiceness .tab-bar {
    margin-top: 20px;
    font-size: 14px;
    color: #303133;
    display: flex;
  }

  #choiceness .tab-bar span {
    margin-right: 30px;
  }

  #choiceness .tab-bar span:hover {
    color: #409eff;
    cursor: pointer;
  }

  #choiceness .divider {
    margin-top: 15px;
    display: block;
    height: 2px;
    width: 100%;
    background: #e4e7ed;
  }

  #choiceness .blue-bar {
    background: #409eff;
    height: 100%;
    transition: all .2s;
  }

  #choiceness .uploadWorks {
    margin-top: 15px;
  }

  #choiceness .uploadWorks button {
    padding: 0 15px;
    border: none;
    background: #409eff;
    color: #FFF;
    height: 30px;
    border-radius: 5px;
    font-size: 12px;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
  }

  #choiceness .uploadWorks button:focus {
    outline: none;
  }

  #choiceness .uploadWorks button:hover {
    background: #66b1FF;
  }

  #choiceness .btn-uploadWorks {
    display: flex;
    justify-content: center;
    width: 720px;
  }

  #choiceness .btn-uploadWorks>button {
    margin: 0 15px;
  }

  #choiceness .uploadWorks-page {
    display: flex;
    flex-direction: column;
  }

  #choiceness .uploadWorks-page>div {
    display: flex;
    align-items: center;
    width: 720px;
    margin-top: 20px;
  }

  #choiceness .uploadWorks-page>div>span {
    width: 100px;
    display: inline-block;
  }

  #choiceness .uploadWorks-page>div>span::before {
    content: "*";
    color: #FF6947;
    margin-right: 4px;
  }

  #choiceness .uploadWorks-page>div>input,
  textarea {
    width: 620px;
    border: 1px solid #409EFF;
    border-radius: 4px;
    padding-left: 15px;
    outline: none;
  }

  #choiceness .uploadWorks-page>div>input {
    height: 32px;
  }

  #choiceness .uploadWorks-page>div>textarea {
    padding-top: 5px;
    height: 64px;
  }

  #choiceness .uploadWorks-page>div>label {
    margin-left: 20px;
  }

  #choiceness .uploadWorks-page>div>label>img {
    width: 150px;
    height: 150px;
    margin: 0 20px;
  }
</style>