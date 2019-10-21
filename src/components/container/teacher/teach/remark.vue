<template>
  <div id="remark">
    <span>作业点评</span>
    <div class="second-floor">
      <div class="select-input">
        <select-input id="classes" tips="请选择班级" :option="inputData.classes.option" @option="changeOption"
          :drop-down-list="inputData.classes.list">
        </select-input>
      </div>
      <div class="select-input">
        <select-input id="chapter" tips="请选择章节" :option="inputData.chapter.option" @option="changeOption"
          :drop-down-list="inputData.chapter.list">
        </select-input>
      </div>
    </div>
    <div class="third-floor">
      <span>点评状态</span>
      <span class="comment has-comment" @click="changeComment('has')" :style="comment.hasComment">已点评</span>
      <span class="comment no-comment" @click="changeComment('no')" :style="comment.noComment">未点评</span>
    </div>
    <div class="forth-floor">
      <table class="table table-hover">
        <thead>
          <tr>
            <th v-for="(title,index) in tableTitle" class="title" :key="index">{{title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(line, seq) in currentList" :key="seq" class="content">
            <td>{{seq + 1}}</td>
            <td>{{line.STUDENT_NAME}}</td>
            <td>{{line.SUBMIT_TIME}}</td>
            <td>{{line.HW_NAME}}</td>
            <td>{{line.CLASS_NAME}}</td>
            <td>{{line.COURSE_NAME}}</td>
            <td>{{line.CP_NAME}}</td>
            <td>
              <button class="edit" data-toggle="modal" data-target="#remarkHomework" data-index="index"
                @click="viewWork(line)">查看作品</button>&nbsp;&nbsp;
              <!-- <span class="blue" @click="popModal('remark', line)">点评</span>&nbsp;&nbsp; -->
              <!-- <span class="blue" @click="popModal('turndown', line)">驳回</span>&nbsp;&nbsp; -->
              <!-- <span class="red" @click="popModal('delete', line)">删除</span> -->
            </td>
          </tr>
        </tbody>
      </table>
      <div class="modal fade" id="remarkHomework" data-backdrop='false' tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body head">
              <div class="left">
                <iframe :src="currentWork.HW_URL"></iframe>
              </div>
              <div class="right">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h3>作品名</h3>
                <p>{{currentWork.HW_NAME === "null" ? "" : currentWork.HW_NAME}}</p>
                <h3>操作说明</h3>
                <p>{{currentWork.HW_GUIDE === "null" ? "" : currentWork.HW_GUIDE}}</p>
              </div>
            </div>
            <div class="modal-footer">
              <p>老师点评</p>
              <p>{{currentWork.TEACHER_REMARK === "null" ? "" : currentWork.TEACHER_REMARK}}</p>
            </div>
          </div>
        </div>
      </div>
      <delete-prompt :id="bindingIds.delete" @deleteWork="deleteWork"></delete-prompt>
      <turn-down-work :id="bindingIds.turndown" @turnDownWorkResult="turnDownWork"></turn-down-work>
      <input-modal :id="bindingIds.remark" @remarkResult="remarkWork"></input-modal>
    </div>
    <div class="fifth-floor">
      <pagination :num="tableData.length" @getNew="changeTablePages" :limit="limit">
      </pagination>
    </div>
  </div>
</template>

<script>
  import DatePicker from "../utils/datePicker";
  import SelectInput from "../utils/selectInput";
  import Pagination from "../utils/pagination";
  import DeletePrompt from "../utils/deletePrompt";
  import instance from "../../../../axios-auth.js";
  import InputModal from "../utils/inputModal";
  import TurnDownWork from "../utils/turnDownWork";

  export default {
    name: "remark",
    data() {
      return {
        limit: 10,
        currentWork: {
          HW_GUIDE: "",
          HW_NAME: "",
          HW_URL: "",
          HW_ID: ""
        },
        comment: { commentStatus: 0, hasComment: "", noComment: "" },
        originalInputData: [],
        inputData: {
          classes: { option: "", list: [], id: [] },
          course: { option: "", list: [], id: [] },
          chapter: { option: "", list: [], id: [] }
        },
        tableTitle: [
          "序号", "作者姓名", "提交时间", "作品",
          "班级", "课程名称", "章节", "操作"
        ],
        originalTableData: [],
        tableData: [],
        currentList: [],
        bindingIds: {
          delete: "remarkDeletePrompt",
          turndown: "remarkTurnDownPrompt",
          remark: "remarkPrompt"
        }
      }
    },
    methods: {
      /**
       * 改变点评的状态, 并立即刷新数据的显示, 其中的 commentStatus 映射关系为
       * 0: 均未选中   
       * 1: 已点评
       * 2: 未点评
       * 
       * @param {String} comment
       * @param {Array<Object>} tableData
       */
      changeComment(comment, tableData) {
        let condition1 = comment === 'has',
          condition2 = comment === 'no';
        tableData = tableData || this.originalTableData;
        this.comment.commentStatus = condition1 ? 1 : (condition2 ? 2 : 0);
        this.comment.hasComment = condition1 ? this.blueCommentStyle : this.whiteCommentStyle;
        this.comment.noComment = condition2 ? this.blueCommentStyle : this.whiteCommentStyle;
        this.tableData = this.commentStatFilter(this.comment.commentStatus, tableData);
        this.changeTablePages(0);
      },
      /**
       * 修改当前选中项, 是 selectInput 组件绑定的事件处理函数
       * 
       * @param {String} item
       * @param {String} id
       */
      changeOption(item, id) {
        this.inputData[id].option = item;
        if (id === 'classes') {
          let classId = this.searchClassId(item);
          this.pullHomeworkWithId(classId);
        } else if (id === 'chapter') {
          let result = this.selectInputFilter(this.inputData, this.originalTableData);
          this.tableData = result;
          this.changeTablePages(0);
        }
      },
      /**
       * 分页跳转, 是 pagination 分页组件绑定的事件处理函数
       * 
       * @param {Number} value
       */
      changeTablePages(value) {
        this.currentList = this.tableData
          .slice(value, value + this.limit)
          .map(item => {
            item.SUBMIT_TIME = this.timestampToTime(item.SUBMIT_TIME);
            item.HW_URL = 'https://s3.cn-northwest-1.amazonaws.com.cn/ced.cedsie.com/cedScratch/player.html?projectUrl=' + item.HW_URL;
            return item;
          });
      },
      /**
       * 点评过滤器
       * 
       * @param {Number} commentCode
       * @param {Array<Object>} tableList
       */
      commentStatFilter(commentCode, tableList) {
        if (!commentCode) return tableList;
        let restTableList = tableList.slice(0),
          status = commentCode === 1;
        for (let i = 0, j = restTableList.length; i < j; i++) {
          if ((restTableList[i].TEACHER_REMARK === "null") === status) {
            restTableList.splice(i, 1);
            j -= 1;
            i -= 1;
          }
        }
        return restTableList;
      },
      /**
       * selectInput 组件的过滤器
       * 
       * @param {Array<Object>} inputData
       * @param {Array<Object>} tableList
       * @return {Array<Object>}
       */
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
      /**
       * 删除作品, 是表格里每行数据中 删除 操作绑定的事件处理函数
       * 
       * @param {String} workId
       */
      deleteWork() {
        setTimeout(() => { alert("删除成功!") }, 1000);
      },
      /**
       * 驳回作品, 是表格里每行数据中 驳回 操作绑定的事件处理函数
       * 
       * @param {String} workId
       */
      turnDownWork(data) {
        console.log(data);
        setTimeout(() => { alert("驳回成功!") }, 1000);
      },
      /**
       * 查看作品, 参数为当前行数据
       * 
       * @param {Object} item
       */
      viewWork(item) {
        console.log(item);
        this.currentWork = item;
      },
      /**
       * 通过班级名称和课程名称寻找 CLASS_ID
       *
       * @param {String} className
       * @return {String}
       */
      searchClassId(className) {
        let result = '';
        return this.originalInputData
          .filter(item => item.CLASS_NAME === className)
          .map(item => result = item.CLASS_ID);
        return result;
      },
      /**
       * 作品点评, 参数为当前行数据
       * 
       * @param {Object} remarkResult
       */
      remarkWork(remarkResult) {
        console.log(remarkResult);
        let config = { headers: { Authorization: localStorage.getItem('idToken') } };
        let putData = {
          teacherRemark: remarkResult.comment,
          homeworkRank: remarkResult.stars,
          selectedWork: remarkResult.selectedWork,
          homeworkId: this.currentWork.HW_ID
        };
        instance.put(`teacher/stuhomework/${putData.homeworkId}`, putData, config)
          .then(res => { console.log(res) })
          .catch(err => { console.log(err) });
      },
      /**
       * 弹出模态框, 提示用户是否进一步删除作品
       * 
       * @param {String} type
       */
      popModal(type, line) {
        $('#' + this.bindingIds[type]).modal('show');
        console.log(line);
        this.currentWork = line;
      },
      /**
       * 拉取选择框的选项数据
       */
      pullClassAndCourseData() {
        let config = { headers: { Authorization: localStorage.getItem('idToken') } };
        instance.get('/teacher/class', config)
          .then((res) => {
            console.log(res.data);
            let className = res.data[0].CLASS_NAME;
            let classId = res.data[0].CLASS_ID;
            this.originalInputData = res.data;
            this.inputData.classes.list = res.data.map(item => {
              return item.CLASS_NAME;
            });
            this.changeOption(className, 'classes');
          })
          .catch((err) => { console.log(err) });
      },
      /**
       * 通过 CLASS_ID 来拉取表格内的数据
       * 
       * @param {String} classId
      */
      pullHomeworkWithId(classId) {
        let config = { headers: { Authorization: localStorage.getItem('idToken') } };
        instance.get('/teacher/class/' + classId + '/homework', config)
          .then(res => {
            console.log(res);
            let CP_NAMECache = [];
            this.originalTableData = this.tableData = res.data.data;
            this.tableData.forEach(item => { CP_NAMECache.push(item.CP_NAME) });
            this.inputData.chapter.list = Array.from(new Set(CP_NAMECache));
            this.inputData.chapter.option = this.inputData.chapter.list[0] || '';
            this.changeComment('no');
          })
          .catch(err => { console.log(err) });
      },
      //时间戳转换
      timestampToTime(timestamp) {
        timestamp = String(timestamp);
        timestamp = timestamp.length == 10 ? timestamp * 1000 : timestamp * 1;
        var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + "-";
        var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
        var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
        var h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
        var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
      },
    },
    computed: {
      blueCommentStyle() { return "background-color: #409EFF; color: #FFF;" },
      whiteCommentStyle() { return "background-color: #FFF; color: #000;" },
      promptWords() { return "确定驳回该学生的作业吗?" },
    },
    created() { this.pullClassAndCourseData() },
    components: { DeletePrompt, Pagination, SelectInput, DatePicker, InputModal, TurnDownWork }
  }
</script>

<style scoped>
  #remark {
    font-size: 12px;
    color: #606266;
  }

  #remark .first-floor {
    margin-top: 20px;
  }

  #remark .second-floor {
    display: flex;
    margin-left: 5px;
    margin-top: 10px;
  }

  #remark .third-floor {
    margin-top: 20px;
    vertical-align: middle;
    font-size: 12px;
    margin-left: 5px;
  }

  #remark .third-floor span {
    line-height: 30px;
  }

  #remark .forth-floor {
    font-size: 12px;
    color: #606266;
    margin-top: 40px;
  }

  #remark label {
    display: inline;
  }

  #remark .content td {
    line-height: 30px;
  }

  #remark .textBox {
    width: 180px;
    height: 32px;
    font-size: 12px;
    padding-left: 15px;
    border: 1px solid #409eff;
    border-radius: 5px;
    margin-left: 5px;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
  }

  #remark .textBox:focus {
    outline: none;
  }

  #remark .textBox:hover {
    border-color: #c0c4cc;
  }

  #remark .comment {
    width: 68px;
    height: 32px;
    display: inline-block;
    border: 1px solid #dcdfe6;
    text-align: center;
    cursor: pointer;
  }

  #remark .has-comment {
    border-radius: 4px 0 0 4px;
  }

  #remark .no-comment {
    margin-right: 20px;
    border-radius: 0 4px 4px 0;
  }

  #remark .btn {
    background: #409eff;
    color: #FFF;
    height: 30px;
    border-radius: 5px;
    font-size: 12px;
    margin-bottom: 3px;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
  }

  #remark .btn:focus {
    outline: none;
  }

  #remark .btn:hover {
    background: #66b1FF;
  }

  #remark .btn-search {
    width: 54px;
  }

  #remark .btn-clear {
    width: 78px;
  }

  #remark .blue {
    cursor: pointer;
    color: #409EFF;
  }

  #remark .red {
    cursor: pointer;
    color: #FF6947;
  }

  table {
    border: #eeeeee;
  }

  #remark table tr {
    text-align: center !important;
  }

  #remark table td {
    vertical-align: middle !important;
  }

  #remark .title {
    text-align: center;
  }

  #remark .select-input {
    margin-right: 0;
  }

  #remark .modal-dialog {
    width: 60%;
    height: auto;
    background: (255, 255, 255, .5)
  }

  #remark iframe {
    width: 100%;
    height: 441px;
    margin: -25px 0 0 0;
    background-color: #fff;
    border: none;
    border-radius: inherit;
  }

  #remark .head {
    display: flex;
    flex-direction: row;
  }

  #remark .left {
    width: 65%;
    height: auto;
    margin: 20px auto;
    border-radius: 20px;
    overflow: hidden;
    border: 2px solid #ccc;
  }

  #remark .right {
    width: 30%;
    height: 441px;
    overflow-x: scroll;
    margin-left: 5%;
  }

  #remark .right .close {
    position: relative;
    top: 0;
    right: 0;
  }

  #remark .right p {
    color: #777;
    font-size: 16px;
  }

  #remark .right h3 {
    color: #50b8ee;
  }
</style>