<template>
  <div id="eduActivity">
    <div class="body">
      <p>活动管理</p>
      <div class="filter">
        <div class="option">
          <input type="text" class="form-control" id="keywords" placeholder="请输入标题关键词或作者" v-model="inputData.keywords">
          <selectInput :option="inputData.activityType.option" :dropDownList="inputData.activityType.list"
            tips="请选择活动类型" id="activityType" @option="changeOption">
          </selectInput>
          <!-- <selectInput :option="inputData.school.option" :dropDownList="inputData.school.list" tips="请选择学校" id="school"
            @option="changeOption"> -->
          </selectInput>
          <button type="button" class="btn-my" @click="conditionSearch">搜索</button>
          <button type="button" class="btn-my" @click="clearChoices">清空筛选</button>
          <button type="button" class="btn-my" @click="addActivity">新增活动</button>
        </div>
      </div>
      <div class="panels">
        <table class="table table-hover" rules=rows frame=below>
          <thead>
            <tr>
              <th>序号</th>
              <th>活动标题</th>
              <th>发布时间</th>
              <th>活动类型</th>
              <th>活动地点</th>
              <th>价格</th>
            
            </tr>
          </thead>
          <tbody>
            <tr v-for="(list, index) in currentList" :key="index" >
              <td>{{index + 1}}</td>
              <td width='380px' class="blue">{{list.title}}</td>
              <td>{{list.releaseTime}}</td>
              <td>{{list.activityType}}</td>
              <td>{{list.place}}</td>
              <td>{{list.price}}</td>
              
          
    
            </tr>
          </tbody>
        </table>
      </div>
      <pagination :num="tableData.length" :limit="limit" @getNew="getNew"></pagination>
    </div>
  </div>
</template>

<script>
  import pagination from "../../teacher/utils/pagination.vue";
  import selectInput from "../../teacher/utils/selectInput";
  import deletePrompt from "../../teacher/utils/deletePrompt";
  import E from 'wangeditor';
  import AWS from 'aws-sdk';
  import instance from '../../../../axios-auth.js';
  export default {
    name: 'activity',
    data() {
      return {
        content: '',
        limit: 10,
        currentList: [],
        tableData: [],
        editorContent: '',
        inputData: {
          keywords: "",
          activityType: {
            option: "",
            list: ["通知公告", "班级活动", "辅导答疑", "布置作业"]
          },
          school: {
            option: "",
            list: ["赛迪思", "雁塔路小学", "翠华路小学", "回民街小学"]
          }
        },
        activityList: [{
            title: "玩转算法系列--图论精讲 面试升职必备（Java版）",
            releaseTime: "2019-03-04",
            activityType: "课程",
            place: "陕西师范大学新勇活动中心",
           price: "0.01",
           
          },
        
        ]
      }
    },
    components: {
      pagination,
      selectInput,
      deletePrompt
    },
    methods: {
      addActivity(){
        this.$router.push({
        path: "/Admin/activityManagement/addActivity"
      });
      },

      getNew(value) {
        this.currentList = this.tableData.slice(value, value + this.limit);
      },
      changeOption(item, id) {
        Object.keys(this.inputData).forEach((res) => {
          if (res === id) {
            this.inputData[res].option = item;
          }
        });
      },
      clearChoices() {
        this.optionsClear();
      },
      optionsClear() {
        Object.keys(this.inputData).forEach((res) => {
          if (this.inputData[res].hasOwnProperty("option")) {
            this.inputData[res].option = "";
          } else {
            this.inputData[res] = "";
          }
        });
      },
      titleOrAuthorFilter(titleOrAuthor, tableList) {
        if (titleOrAuthor === "") return tableList;
        let restTableList = tableList.slice(0);
        for (let i = 0, j = restTableList.length; i < j; i++) {
          if ((!new RegExp(titleOrAuthor).test(restTableList[i]["title"])) &&
            (!new RegExp(titleOrAuthor).test(restTableList[i]["author"]))) {
            restTableList.splice(i, 1);
            j -= 1;
            i -= 1;
          }
        }
        return restTableList;
      },
      selectInputFilter(inputData, tableList) {
        let restTableList = tableList.slice(0);
        for (let i = 0, j = restTableList.length; i < j; i++) {
          for (let res of Object.keys(inputData)) {
            let condition1 = inputData[res].hasOwnProperty("option") &&
              inputData[res].option !== "";
            let condition2 = restTableList[i].hasOwnProperty(res) &&
              restTableList[i][res] !== inputData[res].option;
            if (condition1 && condition2) {
              restTableList.splice(i, 1);
              i -= 1;
              j -= 1;
              break;
            }
          }
        }
        return restTableList;
      },
      conditionSearch() {
        let temp = this.titleOrAuthorFilter(this.inputData.keywords, this.activityList);
        temp = this.selectInputFilter(this.inputData, temp);
        this.tableData = temp;
        this.getNew(0);
      },
    },
    mounted() {
      this.tableData = this.activityList;
      this.getNew(0);
      // let editor = new E(this.$refs.editor);
      // editor.customConfig.uploadImgShowBase64 = true;
      // editor.customConfig.onchange = (html) => {
      //   this.editorContent = html
      // };
      // editor.customConfig.menus = [
      //     'head', // 标题
      //     'bold', // 粗体
      //     'fontSize', // 字号
      //     'fontName', // 字体
      //     'italic', // 斜体
      //     'underline', // 下划线
      //     'strikeThrough', // 删除线
      //     'foreColor', // 文字颜色
      //     'backColor', // 背景颜色
      //     'link', // 插入链接
      //     'list', // 列表
      //     'justify', // 对齐方式
      //     'quote', // 引用
      //     'emoticon', // 表情
      //     'image', // 插入图片
      //     'table', // 表格
      //     'video', // 插入视频
      //     'code', // 插入代码
      //     'undo', // 撤销
      //     'redo' // 重复
      //   ],
      //   editor.create();
      // editor.txt.html('<p>请输入内容</p>');
    }
  }

</script>

<style scoped>
  #eduActivity {
    padding: 10px;
  }

  #eduActivity .body {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    font-size: 12px;
    color: #606266;
    min-width: 850px;
  }

  #eduActivity .option {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  #eduActivity .option input {
    width: 220px;
    height: 32px;
  }

  #eduActivity .blue {
    color: #409EFF;
    cursor: pointer;
  }

  #eduActivity .red {
    color: #FF6947;
  }

  #eduActivity .filter {
    margin-bottom: 30px;
  }

  #eduActivity .form-control {
    padding: 0px 30px 0 15px;
    font-size: 12px;
    margin-right: 5px;
  }

  #eduActivity .panels {
    text-align: center;
  }

  #eduActivity .panels tr {
    height: 40px;
    text-align: center;
  }

  #eduActivity .panels th {
    text-align: center;
  }

  #eduActivity table {
    border: #eeeeee;
  }

  #eduActivity .btn-my {
    margin-right: 8px;
    height: 32px;
    border-radius: 4px;
    font-size: 13px;
    color: #ffffff;
    background-color: #409eff;
    border: 1px solid #409eff;
  }

  #eduActivity .add {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    font-size: 13px;
    min-width: 850px;
  }

  #eduActivity .title {
    width: 750px;
    display: block;
    height: 34px;
    padding: 6px 12px;
    font-size: 13px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }

  #eduActivity .item {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 20px;
  }

  #eduActivity .item p {
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
    margin-right: 5px;
  }

  #eduActivity .file {
    height: 32px;
  }

  #eduActivity .checkbox {
    vertical-align: middle;
    margin: 0;
    height: 32px;
  }

  #eduActivity .editor {
    width: 800px;
  }

  #eduActivity .item1 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 20px;
    margin-left: 356px;
  }
</style>
