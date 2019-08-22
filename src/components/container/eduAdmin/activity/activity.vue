<!--
 * @Email: rumosky@163.com
 * @Author: rumosky
 * @Github: https://github.com/rumosky
 * @Date: 2019-08-14 16:09:22
 * @Description: 教务角色发布活动页面
 -->
<template>
  <div class="content">
    <div class="body" v-show="!addShown">
      <p>活动管理</p>
      <div class="filter">
        <div class="option">
          <input type="text" class="form-control" id="keywords" placeholder="请输入标题关键词或作者" v-model="inputData.keywords">
          <selectInput :option="inputData.activityType.option" :dropDownList="inputData.activityType.list"
            tips="请选择活动类型" id="activityType" @option="changeOption">
          </selectInput>
          <selectInput :option="inputData.school.option" :dropDownList="inputData.school.list" tips="请选择学校" id="school"
            @option="changeOption">
          </selectInput>
          <button type="button" class="btn-my" @click="conditionSearch">搜索</button>
          <button type="button" class="btn-my" @click="clearChoices">清空筛选</button>
          <button type="button" class="btn-my" @click="addActivityShow">新增活动</button>
        </div>
      </div>
      <div class="panels">
        <table class="table table-hover" rules=rows frame=below>
          <thead>
            <tr>
              <th>序号</th>
              <th>活动标题</th>
              <th>发布时间</th>
              <th>负责人</th>
              <th>活动类型</th>
              <th>所属学校</th>
              <th>回复/查看</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(list, index) in currentList">
              <td>{{index + 1}}</td>
              <td class="blue">{{list.title}}</td>
              <td>{{list.date}}</td>
              <td>{{list.author}}</td>
              <td>{{list.activityType}}</td>
              <td>{{list.school}}</td>
              <td>{{list.reply}}/{{list.view}}</td>
              <td>{{list.status}}</td>
              <td><span class="blue">编辑</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <pagination :num="tableData.length" :limit="limit" @getNew="getNew"></pagination>
    </div>


    <div class="add" v-show="addShown">
      <form action="">
        <div class="item">
          <p>标题：</p><input type="text" class="title" placeholder="请输入标题">
        </div>
        <div class="item">
          <div ref="editor" class="editor"></div>
        </div>
        <div class="item1">
          <button type="button" class="btn-my" @click="addActivitySave">保存</button>
          <button type="button" class="btn-my" @click="addActivityShow">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import pagination from "../../teacher/utils/pagination.vue";
  import selectInput from "../../teacher/utils/selectInput";
  import deletePrompt from "../../teacher/utils/deletePrompt";
  import E from 'wangeditor';
  export default {
    name: 'activity',
    data() {
      return {
        limit: 10,
        addShown: false,
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
            title: "test1",
            date: "2019-01-01 12:00",
            author: "编程测试",
            activityType: "通知公告",
            school: "赛迪思",
            reply: "1",
            view: "6",
            status: "正常"
          },
          {
            title: "test2",
            date: "2019-01-06 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "雁塔路小学",
            reply: "2",
            view: "6",
            status: "正常"
          }
        ]
      }
    },
    components: {
      pagination,
      selectInput,
      deletePrompt
    },
    methods: {
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
      addActivityShow() {
        this.addShown = !this.addShown;
      },
      addActivitySave() {
        this.addActivityShow();
      }
    },
    mounted() {
      this.tableData = this.activityList;
      this.getNew(0);
      let editor = new E(this.$refs.editor);
      editor.customConfig.uploadImgShowBase64 = true;
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      };
      editor.customConfig.menus = [
          'head', // 标题
          'bold', // 粗体
          'fontSize', // 字号
          'fontName', // 字体
          'italic', // 斜体
          'underline', // 下划线
          'strikeThrough', // 删除线
          'foreColor', // 文字颜色
          'backColor', // 背景颜色
          'link', // 插入链接
          'list', // 列表
          'justify', // 对齐方式
          'quote', // 引用
          'emoticon', // 表情
          'image', // 插入图片
          'table', // 表格
          'video', // 插入视频
          'code', // 插入代码
          'undo', // 撤销
          'redo' // 重复
        ],
        editor.create();
      editor.txt.html('<p>请输入内容</p>');
    }
  }

</script>

<style scoped>
  .content {
    padding: 10px;
  }

  .body {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    font-size: 12px;
    color: #606266;
    min-width: 850px;
  }

  .option {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .option input {
    width: 220px;
    height: 32px;
  }

  .blue {
    color: #409EFF;
  }

  .red {
    color: #FF6947;
  }

  .filter {
    margin-bottom: 30px;
  }

  .form-control {
    padding: 0px 30px 0 15px;
    font-size: 12px;
    margin-right: 5px;
  }

  .panels {
    text-align: center;
  }

  .panels tr {
    height: 40px;
    text-align: center;
  }

  .panels th {
    text-align: center;
  }

  table {
    border: #eeeeee;
  }

  .btn-my {
    margin-right: 8px;
    height: 32px;
    border-radius: 4px;
    font-size: 13px;
    color: #ffffff;
    background-color: #409eff;
    border: 1px solid #409eff;
  }

  .add {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    font-size: 13px;
    min-width: 850px;
  }

  .title {
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

  .item {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 20px;
  }

  .item p {
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .file {
    height: 32px;
  }

  .checkbox {
    vertical-align: middle;
    margin: 0;
    height: 32px;
  }

  .editor {
    width: 800px;
  }

  .item1 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 20px;
    margin-left: 356px;
  }

</style>
