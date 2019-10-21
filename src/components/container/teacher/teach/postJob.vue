<template>
  <div id="teacher-postJob">
    <div class="body" v-show="!addShown">
      <p>发布作业</p>
      <div class="filter">
        <div class="option">
          <div class="select-input">
            <select-input id="classes1" tips="请选择班级" :option="inputData.classes1.option" @option="changeOption1"
              :drop-down-list="inputData.classes1.list">
            </select-input>
          </div>
          <div class="select-input">
            <select-input id="chapter1" tips="请选择章节" :option="inputData.chapter1.option" @option="changeOption1"
              :drop-down-list="inputData.chapter1.list">
            </select-input>
          </div>
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
                <!-- <span class="red" @click="popModal('delete')">删除</span> -->
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
          <input type="text" class="title" placeholder="请输入作业名称" v-model="inputData.homework.HW_NAME">
        </div>
        <div class="item">
          <p>选择班级：</p>
          <select-input :option="inputData.classes2.option" :dropDownList="inputData.classes2.list" tips="选择班级"
            id="classes2" @option="changeOption2">
          </select-input>
          <p>章节名称：</p>
          <select-input :option="inputData.chapter2.option" :dropDownList="inputData.chapter2.list" tips="选择章节"
            id="chapter2" @option="changeOption2">
          </select-input>
          <p>截止时间：</p>
          <date-picker tips="选择截止时间" class="datePicker" id="postJob_deadline" :date="inputData.homework.DEADLINE"
            @changeDate="changeDate">
          </date-picker>
        </div>
        <div class="item">
          <p>作业内容：</p>
          <textarea class="form-control" rows="10" v-model="inputData.homework.CONTENT"></textarea>
        </div>
        <div class="item1">
          <button type="button" class="btn-my" @click="saveAsDraft">保存草稿</button>
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
  import instance from "../../../../axios-auth.js";

  export default {
    name: 'postJob',
    data() {
      return {
        limit: 10,
        operation: "post",
        addShown: false,
        currentWorkId: '',
        tableTitle: [
          "序号", '作业名称', '截止时间', '班级',
          '课程名称', '章节名称', '操作'
        ],
        currentList: [],
        inputData: {
          homework: { CONTENT: "", DEADLINE: "", HW_NAME: "" },
          classes1: { option: "", list: [], id: [] },
          chapter1: { option: "", list: [], id: [] },
          classes2: { option: "", list: [], id: [] },
          chapter2: { option: "", list: [], id: [] },
        },
        originalInputData: [],
        tableData: [],
        originalTableData: []
      }
    },
    methods: {
      /**
       * 获取此教师的所有作业 (仅仅是自己布置的, 其他老师的看不到)
      */
      pullHomeworkData() {
        let config = { headers: { Authorization: localStorage.getItem('idToken') } };
        return new Promise((resolve, reject) => {
          instance.get("teacher/homework", config)
            .then(res => { resolve(res) })
            .catch(err => { reject(err) });
        });
      },
      /**
       * 列表界面做筛选功能的 Select-Input 输入选择框绑定函数
      */
      changeOption1(item, id) {
        this.inputData[id].option = item;
        if (id === "classes1") {
          this.tableData = this.selectInputFilter(item, "CLASS_NAME");
          this.changeChapters(item);
        } else {
          this.tableData = this.selectInputFilter(item, "CP_NAME");
        }
        this.changeTablePages(0);
      },
      /**
       * 新增界面做选择功能的 Select-Input 输入选择框绑定函数
       * 
       * @param {String} item
       * @param {String} id
      */
      changeOption2(item, id) {
        this.inputData[id].option = item;
        if (id === "classes2") {
          this.getChaptersOfClass(this.searchForCourseId(item))
            .then(chapters => {
              this.inputData.chapter2.option = "";
              console.log(chapters);
              this.inputData.chapter2.list = chapters.map(item => {
                return item.CP_NAME;
              });
              this.inputData.chapter2.id = chapters.map(item => {
                return item.CP_ID;
              });
            })
            .catch(err => { console.log(err) });
        }
      },
      /**
       * 改变页码的 pagination 翻页绑定函数
       * 
       * @param {Number} value
      */
      changeTablePages(value) {
        this.currentList = this.tableData.slice(value, value + this.limit)
          .map(item => {
            return {
              hwName: item.HW_NAME, deadline: item.DEADLINE,
              classes: item.CLASS_NAME, course: item.COURSE_NAME,
              chapter: item.CP_NAME
            };
          });
      },
      /**
       * 编辑作业, 需要把相应的数据进行填充
       * 
       * @param {Object} item
      */
      editWork(item) {
        let work = this.searchForWorkId(item);
        this.newHomeWork();
        this.changeOption2(work.CLASS_NAME, "classes2");
        this.inputData.homework = {
          CONTENT: work.CONTENT,
          DEADLINE: work.DEADLINE,
          HW_NAME: work.HW_NAME
        };
        this.inputData.classes2.option = work.CLASS_NAME;
        this.inputData.chapter2.option = work.CP_NAME;
        console.log(work);
        this.operation = "put";
        this.currentWorkId = work.HOMEWORK_ID;
      },
      /**
       * 删除作业的绑定函数
      */
      deleteWork() { },
      /**
       * 新建作业与取消编辑的绑定函数
       */
      newHomeWork() {
        this.addShown = !this.addShown
        this.operation = "post";
      },
      /**
       * 更改日期, 是 datePicker 组件绑定的事件处理函数
       * 
       * @param {String} value
       * @param {String} id
       */
      changeDate(value, id) {
        this.inputData.homework.DEADLINE = value;
      },
      /**
       * 保存草稿 是新增页面的保存草稿按钮
      */
      saveAsDraft() {
        let config = { headers: { Authorization: localStorage.getItem('idToken') } };
        let chapter2 = this.inputData.chapter2;
        let homework = this.inputData.homework;
        let postData = {
          CLASS_ID: this.searchForClassId(this.inputData.classes2.option),
          COURSE_ID: this.searchForCourseId(this.inputData.classes2.option),
          CONTENT: homework.CONTENT,
          CP_ID: chapter2.id[chapter2.list.findIndex(item => item === chapter2.option)],
          DEADLINE: homework.DEADLINE,
          HW_NAME: homework.HW_NAME
        };
        if (this.operation === "PUT") { postData.HW_ID = this.currentWorkId }
        console.log(postData);
        instance[this.operation]("teacher/homework", postData, config)
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              alert("保存成功!");
              this.newHomeWork();
            } else { console.log("保存失败!") }
          })
          .catch(err => { console.log(err) });
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
      /**
       * 拉取选择框的选项数据
       */
      pullClassAndCourseData() {
        let config = { headers: { Authorization: localStorage.getItem('idToken') } };
        instance.get('/teacher/class', config)
          .then((res) => {
            console.log(res.data);
            this.originalInputData = res.data;
            this.inputData.classes2.list = res.data.map(item => {
              return item.CLASS_NAME;
            });
          })
          .catch((err) => { console.log(err) });
      },
      /**
       * 班级选择输入框的过滤器
       * 
       * @param {String} tagName
       * @param {String} attributeName
       * @return {Array<Object>}
      */
      selectInputFilter(tagName, attributeName) {
        return (tagName === "") ? this.originalTableData :
          this.originalTableData.filter(item => {
            return item[attributeName] === tagName;
          });
      },
      /**
       * 章节选择输入框的过滤器
       * 
       * @param {String} className
      */
      changeChapters(className) {
        let result = this.tableData
          .filter(item => { return item.CLASS_NAME === className })
          .map(item => { return item.CP_NAME });
        this.inputData.chapter1.list = Array.from(new Set(result));
        this.inputData.chapter1.option = "";
      },
      /**
       * 获取某个课程(班级) 的所有章节
       * 
       * @param {String} classId
      */
      getChaptersOfClass(classId) {
        console.log(classId);
        let config = { headers: { Authorization: localStorage.getItem('idToken') } };
        return new Promise((resolve, reject) => {
          instance.get(`teacher/course/${classId}/chapters`, config)
            .then(res => { resolve(res.data) })
            .catch(err => { reject(err) });
        });
      },
      /**
       * 通过班级名称寻找课程 ID 
       * 
       * @param {String} className
       * @return {String}
      */
      searchForCourseId(className) {
        return this.originalInputData.find(item => {
          return item.CLASS_NAME === className;
        }).COURSE_ID;
      },
      /**
       * 通过班级名称寻找班级 ID
       *
       * @param {String} className
       * @return {String}
      */
      searchForClassId(className) {
        return this.originalInputData.find(item => {
          return item.CLASS_NAME === className;
        }).CLASS_ID;
      },
      /**
       * 发布作业(给学生发送通知)
      */
      postJob(line) {
        let config = { headers: { Authorization: localStorage.getItem('idToken') } };
        let workId = this.searchForWorkId(line).HOMEWORK_ID;
        instance.post(`teacher/homework/${workId}`, { homework_id: workId }, config)
          .then(res => {
            console.log(res);
            alert(res.status === 200 ? "发布成功!" : "发布失败!");
          })
          .catch(err => { console.log(err) });
      },
      /**
       * 寻找某条作业的 ID
       * 
       * @param {Object} line
       * @return {String}
      */
      searchForWorkId(line) {
        return this.originalTableData.find(item => {
          return (item.CLASS_NAME + item.HW_NAME) === (line.classes + line.hwName);
        });
      }
    },
    computed: { deletePromptId() { return "postJob_deletePrompt" } },
    created() {
      this.pullClassAndCourseData();
      this.pullHomeworkData()
        .then(res => {
          console.log(res);
          this.originalTableData = res.data || [];
          this.tableData = res.data || [];
          this.changeTablePages(0);
          this.inputData.classes1.list = Array.from(new Set(res.data.map(item => item.CLASS_NAME)));
        })
        .catch(err => { console.log(err) });
    },
    mounted() { },
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