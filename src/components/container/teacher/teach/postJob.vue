<template>
  <div id="teacher-postJob">
    <div class="body" v-show="!addShown">
      <p>发布作业</p>
      <div class="filter">
        <div class="option">
          <div class="select-input">
            <select-input id="classes" tips="请选择班级" :option="inputData.classes.option" @option="changeOption"
              :drop-down-list="inputData.classes.list">
            </select-input>
          </div>
          <div class="select-input">
            <select-input id="course" tips="请选择课程" :option="inputData.course.option" @option="changeOption"
              :drop-down-list="inputData.course.list">
            </select-input>
          </div>
          <div class="select-input">
            <select-input id="chapter" tips="请选择章节" :option="inputData.chapter.option" @option="changeOption"
              :drop-down-list="inputData.chapter.list">
            </select-input>
          </div>
          <button type="button" class="btn-my" @click="conditionSearch">搜索</button>
          <button type="button" class="btn-my" @click="clearChoices">清空筛选</button>
          <button type="button" class="btn-my" @click="newHomeWork">新增作业</button>
        </div>
      </div>
      <div class="panels">
        <table class="table table-hover" rules=rows frame=below>
          <thead>
            <tr>
              <th v-for="(title, index) in tableTitle" :key="index">{{title}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(line, seq) in currentList" :key="seq">
              <td>{{seq + 1}}</td>
              <td v-for="(value, key, index) in line" :key="index"> {{value}} </td>
              <td>
                <span class="blue" @click="editWork(line)">编辑</span>&nbsp;&nbsp;
                <span class="blue" @click="postJob(line)">发布</span>&nbsp;&nbsp;
                <span class="red" @click="popModal('delete')">删除</span>
              </td>
            </tr>
          </tbody>
        </table>
        <delete-prompt :id="deletePromptId" @deleteWork="deleteWork" :work-id="currentWorkId">
        </delete-prompt>
      </div>
      <pagination :num="tableData.length" :limit="limit" @getNew="changeTablePages"></pagination>
    </div>
    <div class="add" v-show="addShown">
      <form action="">
        <div class="item">
          <p>作业名称：</p>
          <input type="text" class="title" placeholder="请输入作业名称">
        </div>
        <div class="item">
          <p>选择班级：</p>
          <select-input :option="inputData.classes.option" :dropDownList="inputData.classes.list" tips="选择班级"
            id="classes" @option="changeOption">
          </select-input>
          <p>课程名称：</p>
          <select-input :option="inputData.course.option" :dropDownList="inputData.course.list" tips="选择课程" id="course"
            @option="changeOption">
          </select-input>
          <p>章节名称：</p>
          <select-input :option="inputData.chapter.option" :dropDownList="inputData.chapter.list" tips="选择章节"
            id="chapter" @option="changeOption">
          </select-input>
        </div>
        <div class="item">
          <p>截止时间：</p>
          <date-picker tips="选择截止时间" class="datePicker" id="postJob_deadline" :date="inputData.deadline"
            @changeDate="changeDate">
          </date-picker>
        </div>
        <div class="item">
          <!-- <div ref="editor_postJob" class="editor"></div> -->
          <p>作业内容：</p>
          <textarea class="form-control" rows="10"></textarea>
        </div>
        <div class="item1">
          <button type="button" class="btn-my">保存草稿</button>
          <button type="button" class="btn-my">直接发布</button>
          <button type="button" class="btn-my" @click="newHomeWork">取消编辑</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import DeletePrompt from "../utils/deletePrompt";
  import Pagination from "../utils/pagination";
  import DatePicker from "../utils/datePicker";
  import selectInput from "../utils/selectInput";
  import instance from "../../../../axios-auth.js"
  // import E from 'wangeditor';

  export default {
    name: 'postJob',
    data() {
      return {
        limit: 10,
        addShown: false,
        currentWorkId: '',
        tableTitle: [
          "序号", '作业名称', '截止时间', '班级',
          '课程名称', '章节名称', '操作'
        ],
        inputData: {
          classes: { option: "", list: [], id: [] },
          course: { option: "", list: [], id: [] },
          chapter: { option: "", list: [], id: [] }
        },
        currentList: [
          {
            hwName: '小猫钓鱼',
            deadline: '2019-09-26',
            classes: '赛迪思6班',
            course: '操作系统',
            chapter: '处理器的设置'
          },
          {
            hwName: '小猫钓鱼',
            deadline: '2019-09-26',
            classes: '赛迪思6班',
            course: '操作系统',
            chapter: '处理器的设置'
          },
          {
            hwName: '小猫钓鱼',
            deadline: '2019-09-26',
            classes: '赛迪思6班',
            course: '操作系统',
            chapter: '处理器的设置'
          },
          {
            hwName: '小猫钓鱼',
            deadline: '2019-09-26',
            classes: '赛迪思6班',
            course: '操作系统',
            chapter: '处理器的设置'
          }
        ],
        tableData: [],
        originalTableData: []
      }
    },
    methods: {
      pullHomeworkData() {
        let config = { headers: { Authorization: localStorage.getItem('idToken') } };
        return new Promise((resolve, reject) => {
          instance.get("teacher/homework", config)
            .then(res => { resolve(res) })
            .catch(err => { reject(err) });
        });
      },
      changeOption(item, id) {

      },
      changeTablePages(value) {
        let result = [];
        this.tableData.forEach(item => {
          result.push({
            hwName: item.HW_NAME,
            deadline: item.DEADLINE,
            classes: item.CLASS_ID,
            course: item.COURSE_ID,
            chapter: item.CP_ID
          });
        });
        this.currentList = result;
      },
      conditionSearch() {

      },
      clearChoices() {

      },
      /**
       * 编辑作业, 需要把相应的数据进行填充
       * 
       * @param {Object} item
       * 
      */
      editWork(item) {
        console.log(item);
      },
      deleteWork() {

      },
      /**
       * 新建作业与取消编辑的绑定函数
       */
      newHomeWork() { this.addShown = !this.addShown },
      /**
       * 更改日期, 是 datePicker 组件绑定的事件处理函数
       * 
       * @param {String} value
       * @param {String} id
       */
      changeDate(value, id) {
        this.inputData.deadline = value;
      },
      /**
       * 弹出模态框, 提示用户是否进一步删除作品
       * 
       * @param {String} type
       * @param {String} workId
       */
      popModal(type, workId) {
        this.currentWorkId = workId;
        if (type === "delete") {
          $('#' + this.deletePromptId).modal('show');
        }
      },
    },
    computed: {
      deletePromptId() { return "postJob_deletePrompt" }
    },
    created() {
      this.pullHomeworkData()
        .then(res => {
          console.log(res);
          this.originalTableData = res.data || [];
          this.tableData = res.data || [];
          this.changeTablePages(0);
        })
        .catch(err => {
          console.log(err);
        });
    },
    mounted() {
      // let editor = new E(this.$refs.editor_postJob);
      // editor.customConfig.uploadImgShowBase64 = true;
      // editor.customConfig.onchange = (html) => {
      //   this.editorContent = html
      // };
      // editor.customConfig.menus = [
      //   'head', 'bold', 'fontSize', 'fontName',
      //   'italic', 'underline', 'strikeThrough', 'foreColor',
      //   'backColor', 'link', 'list', 'justify',
      //   'quote', 'emoticon', 'image', 'table',
      //   'video', 'code', 'undo', 'redo'
      // ],
      //   editor.create();
      // editor.txt.html('<p>请输入内容</p>');
    },
    components: { DeletePrompt, Pagination, DatePicker, selectInput }
  }
</script>

<style scoped>
  #teacher-postJob .body {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    font-size: 12px;
    color: #606266;
    min-width: 850px;
  }

  #teacher-postJob .option {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  #teacher-postJob .option input {
    width: 220px;
    height: 32px;
  }

  #teacher-postJob .blue {
    cursor: pointer;
    color: #409EFF;
  }

  #teacher-postJob .red {
    cursor: pointer;
    color: #FF6947;
  }

  #teacher-postJob .filter {
    margin-bottom: 30px;
  }

  #teacher-postJob .form-control {
    padding: 0px 30px 0 15px;
    font-size: 12px;
    margin-right: 5px;
  }

  #teacher-postJob .panels {
    text-align: center;
  }

  #teacher-postJob .panels tr {
    height: 40px;
    text-align: center;
  }

  #teacher-postJob .panels th {
    text-align: center;
  }

  #teacher-postJob table {
    border: #eeeeee;
  }

  #teacher-postJob .btn-my {
    cursor: pointer;
    margin-right: 8px;
    height: 32px;
    border-radius: 4px;
    font-size: 13px;
    color: #ffffff;
    background-color: #409eff;
    border: 1px solid #409eff;
  }

  #teacher-postJob .add {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    font-size: 13px;
    min-width: 850px;
  }

  #teacher-postJob .title {
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

  #teacher-postJob .item {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-bottom: 20px;
  }

  #teacher-postJob .item p {
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
    margin-right: 5px;
  }

  #teacher-postJob .item .dropdown {
    margin-right: 35px;
  }

  #teacher-postJob .editor {
    width: 800px;
  }

  #teacher-postJob .item1 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 20px;
    margin-left: 356px;
  }

  #teacher-postJob .datePicker {
    margin-left: 0;
  }

  #teacher-postJob .form-control {
    width: 750px;
    padding: 10px;
    font-size: 14px;
  }
</style>