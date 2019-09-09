<template>
  <div id="remark">
    <span>作业点评</span>
    <!-- <div class="first-floor">
      <label for="tel-name"></label>
      <input type="text" placeholder="请输入姓名" class="textBox" id="tel-name" v-model="inputData.telOrName">
      <date-picker tips="选择开始时间" id="datePicker_start" :date="inputData.startDate" @changeDate="changeDate">
      </date-picker>
      <date-picker tips="选择结束时间" id="datePicker_end" :date="inputData.endDate" @changeDate="changeDate">
      </date-picker>
    </div> -->
    <div class="second-floor">
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
        <select-input id="order" tips="请选择课次" :option="inputData.order.option" @option="changeOption"
          :drop-down-list="inputData.order.list">
        </select-input>
      </div>
    </div>
    <div class="third-floor">
      <span>点评状态</span>
      <span class="comment has-comment" @click="changeComment('has')" :style="comment.hasComment">已点评</span>
      <span class="comment no-comment" @click="changeComment('no')" :style="comment.noComment">未点评</span>
      <button class="btn btn-search" @click="conditionSearch">搜索</button>
      <button class="btn btn-clear" @click="clearChoices">清空筛选</button>
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
            <td v-for="(value, key, index) in line" :key="index" v-if="key !== 'id' && key !== 'commentStat'">
              {{value}}
            </td>
            <td>
              <span class="blue" @click="viewWork(line)">查看作品</span>&nbsp;&nbsp;
              <span class="blue" @click="remarkWork(line)">点评</span>&nbsp;&nbsp;
              <span class="red" @click="popModal('delete', line.id)">删除</span>
            </td>
          </tr>
        </tbody>
      </table>
      <delete-prompt :id="deletePromptId" @deleteWork="deleteWork" :work-id="currentWorkId">
      </delete-prompt>
    </div>
    <div class="fifth-floor">
      <pagination :num="tableData.length" @getNew="changeTablePages" :limit="limit">
      </pagination>
    </div>
  </div>
</template>

<script>
  import DatePicker from "../utils/datePicker"
  import SelectInput from "../utils/selectInput";
  import Pagination from "../utils/pagination";
  import DeletePrompt from "../utils/deletePrompt";
  import instance from "../../../../axios-auth.js"

  export default {
    name: "remark",
    data() {
      return {
        limit: 10,
        currentWorkId: "hello",
        comment: {
          commentStatus: 0,
          hasComment: "",
          noComment: ""
        },
        inputData: {
          telOrName: "",
          startDate: "",
          endDate: "",
          classes: {
            option: "",
            list: ["1班", "2班", "3班", "4班", "5班"]
          },
          course: {
            option: "",
            list: ["课程一", "课程二", "课程三"]
          },
          order: {
            option: "",
            list: ["开学第一课", "开学第二课", "开学第三课"]
          }
        },
        tableTitle: [
          "序号",
          "作者姓名",
          "提交时间",
          "作品",
          "班级",
          "课程名称",
          "章节",
          "操作"
        ],
        originalTableData: [],
        currentList: [],
        tableData: []
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
        tableData = tableData || this.tableData;
        this.comment.commentStatus = condition1 ? 1 : (condition2 ? 2 : 0);
        this.comment.hasComment = condition1 ? this.blueCommentStyle : this.whiteCommentStyle;
        this.comment.noComment = condition2 ? this.blueCommentStyle : this.whiteCommentStyle;
        this.tableData = this.commentStatFilter(this.comment.commentStatus, tableData);
        this.changeTablePages(0);
      },
      /**
       * 更改日期, 是 datePicker 组件绑定的事件处理函数
       * 
       * @param {String} value
       * @param {String} id
      */
      changeDate(value, id) {
        if (id === "datePicker_start") {
          this.inputData.startDate = value;
        } else if (id === "datePicker_end") {
          this.inputData.endDate = value;
        }
      },
      /**
       * 清空筛选, 是 清空筛选 按钮绑定的事件处理函数
       */
      clearChoices() {
        this.inputData.startDate = "";
        this.inputData.endDate = "";
        this.changeComment('init', this.originalTableData);
        Object.keys(this.inputData).forEach((res) => {
          if (this.inputData[res].hasOwnProperty("option")) {
            this.inputData[res].option = "";
          } else {
            this.inputData[res] = "";
          }
        });
      },
      /**
       * 修改当前选中项, 是 selectInput 组件绑定的事件处理函数
       * 
       * @param {String} item
       * @param {String} id
      */
      changeOption(item, id) {
        Object.keys(this.inputData).forEach((res) => {
          if (res === id) {
            this.inputData[res].option = item;
          }
        });
      },
      /**
       * 分页跳转, 是 pagination 分页组件绑定的事件处理函数
       * 
       * @param {Number} value
      */
      changeTablePages(value) {
        this.currentList = this.tableData.slice(value, value + this.limit);
      },
      /**
       * 时间过滤器
       * 
       * @param {String} startTime
       * @param {String} endTime
       * @param {Array<Object>} tableList
       * @return {Array<object>}
      */
      timeFilter(startTime, endTime, tableList) {
        if (startTime === "" && endTime === "") return tableList;
        startTime = startTime === "" ? 0 : startTime;
        endTime = endTime === "" ? "9999-01-01 00:00" : endTime;
        let restTableList = tableList.slice(0);
        startTime = new Date(startTime);
        endTime = new Date(endTime);
        for (let i = 0, j = restTableList.length; i < j; i++) {
          let submitTime = new Date(restTableList[i].submitTime);
          if (startTime >= submitTime || submitTime >= endTime) {
            restTableList.splice(i, 1);
            i -= 1;
            j -= 1;
          }
        }
        return restTableList;
      },
      /**
       * 名称或手机号码过滤器 (因开发需求, 当前页面裁剪掉了手机号码, 但过滤器仍保留其过滤功能)
       * 
       * @param {String} telOrName
       * @param {Array<Object>} tableList
       * @return {Array<Object>}
      */
      telOrNameFilter(telOrName, tableList) {
        if (telOrName === "") return tableList;
        let testArg = "tel";
        if (Number.isNaN(Number.parseInt(telOrName))) {
          testArg = "authorName";
        }
        let restTableList = tableList.slice(0);
        for (let i = 0, j = restTableList.length; i < j; i++) {
          if (!new RegExp(telOrName).test(restTableList[i][testArg])) {
            restTableList.splice(i, 1);
            j -= 1;
            i -= 1;
          }
        }
        return restTableList;
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
          status = commentCode === 1 ? "已点评" : "未点评";
        for (let i = 0, j = restTableList.length; i < j; i++) {
          if (restTableList[i].commentStat !== status) {
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
            let condition1 = inputData[res].hasOwnProperty("option")
              && inputData[res].option !== "";
            let condition2 = restTableList[i].hasOwnProperty(res)
              && restTableList[i][res] !== inputData[res].option;
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
       * 搜索, 是 搜索 按钮绑定的事件处理函数, 用到了上面定义的过滤器函数
      */
      conditionSearch() {
        let temp = this.timeFilter(
          this.inputData.startDate,
          this.inputData.endDate,
          this.originalTableData);
        temp = this.telOrNameFilter(this.inputData.telOrName, temp);
        temp = this.commentStatFilter(this.comment.commentStatus, temp);
        temp = this.selectInputFilter(this.inputData, temp);
        this.tableData = temp;
        this.changeTablePages(0);
      },
      /**
       * 删除作品, 是表格里每行数据中 删除 操作绑定的事件处理函数
       * 
       * @param {String} workId
      */
      deleteWork(workId) {
        setTimeout(() => {
          alert("删除成功!" + workId)
        }, 1000);
        // 调用删除接口时, 考虑是否再拉取!
        // this.axios.delete("url")
        //   .then((res) => {
        //     if (!condition) {
        //       // 显示删除成功
        //     } else {
        //       // 显示删除失败原因
        //     }
        //   })
        //   .catch((err) => {
        //     // 显示异常原因
        //   });
      },
      /**
       * 查看作品, 参数为当前行数据, 是表格里每行数据中 查看作品 操作绑定的事件处理函数
       * 
       * @param {Object} item
      */
      viewWork(item) {
        let id = this.searchWorkId(item);
        // 打开新窗口, 可能会传递sb3文件之类的参数
      },
      /**
       * 作品点评, 参数为当前行数据, 是表格里每行数据中 点评 操作绑定的事件处理函数
       * 
       * @param {Object} item
      */
      remarkWork(item) {
        let id = this.searchWorkId(item);
        // 弹框, 给个点评输入框即可
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
      * 拉取作业点评的数据
      *
      * @return {Object}
      */
      pullOriginalData() {
        this.originalTableData.splice(0);
        instance
          .get('/teacher/works', { headers: { Authorization: localStorage.getItem('idToken') } })
          .then((res) => {
            res.data.forEach((item) => {
              this.originalTableData.push({
                id: item.HW_ID,
                authorName: item.STUDENT_NAME,
                submitTime: item.SUBMIT_TIME,
                workName: item.HW_NAME,
                classes: item.CLASS_NAME,
                course: item.COURSE_NAME,
                order: item.CP_NAME,
                commentStat: item.TEACHER_REMARK ? "已点评" : "未点评"
              });
            });
            this.changeComment('has', this.originalTableData);
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });

      }
    },
    computed: {
      /**
       * 已点评与未点评按钮的状态样式
      */
      blueCommentStyle() {
        return "background-color: #409EFF; color: #FFF;";
      },
      /**
       * 已点评与未点评按钮的状态样式
      */
      whiteCommentStyle() {
        return "background-color: #FFF; color: #000;";
      },
      /**
       * 删除提示框组件需要绑定的 id 属性, 纯字符串, 无任何特殊含义
      */
      deletePromptId() {
        return "remarkDeletePrompt";
      }
    },
    mounted() {
      this.pullOriginalData();
    },
    components: { DeletePrompt, Pagination, SelectInput, DatePicker }
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
</style>