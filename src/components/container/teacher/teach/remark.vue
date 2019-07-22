<template>
  <div class="subContainer">
    <span>作业点评</span>
    <div class="first-floor">
      <label for="tel-name"></label>
      <input type="text" placeholder="请输入姓名、手机号"
             class="textBox" id="tel-name"
             v-model="inputData.telOrName">
      <date-picker tips="选择开始时间" id="datePicker_start"
                   :date="inputData.startDate"
                   @changeDate="changeDate">
      </date-picker>
      <date-picker tips="选择结束时间" id="datePicker_end"
                   :date="inputData.endDate"
                   @changeDate="changeDate">
      </date-picker>
    </div>
    <div class="second-floor">
      <div class="select-input">
        <select-input id="school"
                      tips="请选择学校"
                      :option="inputData.school.option"
                      @option="changeOption"
                      :drop-down-list="inputData.school.list">
        </select-input>
      </div>
      <div class="select-input">
        <select-input id="classes"
                      tips="请选择班级名称"
                      :option="inputData.classes.option"
                      @option="changeOption"
                      :drop-down-list="inputData.classes.list">
        </select-input>
      </div>
      <div class="select-input">
        <select-input id="course"
                      tips="请选择课程"
                      :option="inputData.course.option"
                      @option="changeOption"
                      :drop-down-list="inputData.course.list">
        </select-input>
      </div>
      <div class="select-input">
        <select-input id="grade"
                      tips="请选择课程等级"
                      :option="inputData.grade.option"
                      @option="changeOption"
                      :drop-down-list="inputData.grade.list">
        </select-input>
      </div>
      <div class="select-input">
        <select-input id="order"
                      tips="请选择课次"
                      :option="inputData.order.option"
                      @option="changeOption"
                      :drop-down-list="inputData.order.list">
        </select-input>
      </div>
      <div class="select-input">
       <span @click="changeChoices">
        <span :class="{'choose': chooseAll}" class="choose-icon"></span>
        <span>全选</span>
       </span>
      </div>
    </div>
    <div class="third-floor">
      <span>点评状态</span>
      <span class="comment has-comment"
            @click="changeComment('has')"
            :style="comment.hasComment">已点评</span>
      <span class="comment no-comment"
            @click="changeComment('no')"
            :style="comment.noComment">未点评</span>
      <button class="btn btn-search" @click="conditionSearch">搜索</button>
      <button class="btn btn-clear" @click="clearChoices">清空筛选</button>
    </div>
    <div class="forth-floor">
      <table class="table table-hover">
        <thead>
        <tr>
          <th v-for="title in tableTitle" class="title">{{title}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(line, seq) in currentList" :key="seq" class="content">
          <td>{{seq + 1}}</td>
          <td v-for="(item, index) in line" :key="index">{{item}}</td>
          <td><span class="blue">编辑</span>&nbsp;&nbsp;
            <span class="red">删除</span></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="fifth-floor">
      <pagination :num="tableData.length"
                  @getNew="changeTablePages"
                  :limit="limit">
      </pagination>
    </div>
  </div>
</template>

<script>
  import DatePicker from "../utils/datePicker"
  import SelectInput from "../utils/selectInput";
  import Pagination from "../utils/pagination";

  export default {
    name: "remark",
    data() {
      return {
        limit: 10,
        chooseAll: false,
        comment: {
          commentStatus: 0,
          hasComment: this.whiteCommentStyle,
          noComment: this.whiteCommentStyle
        },
        inputData: {
          telOrName: "",
          startDate: "",
          endDate: "",
          school: {
            option: "",
            list: ["邮电附小", "师大二中", "师大三中"]
          },
          classes: {
            option: "",
            list: ["1班", "2班", "3班", "4班", "5班"]
          },
          course: {
            option: "",
            list: ["课程一", "课程二", "课程三"]
          },
          grade: {
            option: "",
            list: ["1", "2", "3", "4"]
          },
          order: {
            option: "",
            list: ["开学第一课", "开学第二课", "开学第三课"]
          }
        },
        tableTitle: [
          "序号",
          "作者姓名",
          "手机号码",
          "提交时间",
          "作品",
          "所属学校",
          "班级",
          "课程名称",
          "课程等级",
          "课次",
          "状态",
          "操作"
        ],
        originalTableData: [
          {
            authorName: "赛大迪",
            tel: "15252081872",
            submitTime: "2019-3-21 19:03",
            workName: "坦克大战",
            school: "师大附小",
            classes: "9班",
            course: "计算机网络",
            grade: "3",
            order: "开学第一课",
            commentStat: "已点评"
          },
          {
            authorName: "李云龙",
            tel: "18896253728",
            submitTime: "2018-5-2 11:32",
            workName: "消灭病毒",
            school: "师大附小",
            classes: "10班",
            course: "计算机网络",
            grade: "2",
            order: "开学第二课",
            commentStat: "未点评"
          },
          {
            authorName: "楚云飞",
            tel: "15652081872",
            submitTime: "2019-5-20 16:30",
            workName: "宾果消消消",
            school: "邮电附小",
            classes: "2班",
            course: "计算机网络",
            grade: "1",
            order: "开学第三课",
            commentStat: "已点评"
          }
        ],
        currentList: [],
        tableData: []
      }
    },
    methods: {
      changeChoices() {
        this.chooseAll = !this.chooseAll;
      },
      changeComment(comment) {
        if (comment === 'has') {
          // 0: 均未选中  1:已点评  2: 未点评
          this.comment = {
            commentStatus: 1,
            hasComment: this.blueCommentStyle,
            noComment: this.whiteCommentStyle
          };
        } else if (comment === "no") {
          this.comment = {
            commentStatus: 2,
            hasComment: this.whiteCommentStyle,
            noComment: this.blueCommentStyle
          };
        }
      },
      changeDate(value, id) {
        if (id === "datePicker_start") {
          this.inputData.startDate = value;
        } else if (id === "datePicker_end") {
          this.inputData.endDate = value;
        }
      },
      clearChoices() {
        this.inputData.startDate = "";
        this.inputData.endDate = "";
        this.optionsClear();
      },
      optionsClear() {
        // 如果是字符串则清空, 如果是对象则清空 option
        Object.keys(this.inputData).forEach((res) => {
          if (this.inputData[res].hasOwnProperty("option")) {
            this.inputData[res].option = "";
          } else {
            this.inputData[res] = "";
          }
        });
        // 全选按钮
        this.chooseAll = false;
        // 是否
        this.comment = {
          commentStatus: 0,
          hasComment: this.whiteCommentStyle,
          noComment: this.whiteCommentStyle
        }
      },
      changeOption(item, id) {
        Object.keys(this.inputData).forEach((res) => {
          if (res === id) {
            this.inputData[res].option = item;
          }
        });
      },
      changeTablePages(value) {
        this.currentList = this.tableData.slice(value, value + this.limit);
      },
      // 以下为过滤器, 采用递进式过滤方法, 数据随着过滤越来越少, 减轻了浏览器负担
      timeFilter(startTime, endTime, tableList) {
        if (startTime === "" && endTime === "") return tableList;
        startTime = startTime === "" ? 0 : startTime;
        // 今天是 2019-7-21 此系统若能运行1000年算我输
        endTime = endTime === "" ? "3000-01-01 00:00" : endTime;
        let restTableList = tableList.slice(0);
        startTime = new Date(startTime);
        endTime = new Date(endTime);
        for (let i = 0, j = restTableList.length; i < j; i++) {
          let submitTime = new Date(restTableList[i].submitTime);
          if (startTime > submitTime || submitTime > endTime) {
            restTableList.splice(i, 1);
            i -= 1;
            j -= 1;
          }
        }
        return restTableList;
      },
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
      commentStatFilter(commentCode, tableList) {
        if (!commentCode) return tableList;
        let restTableList = tableList.slice(0);
        let status = "未点评";
        if (commentCode === 1) {
          status = "已点评"
        }
        for (let i = 0, j = restTableList.length; i < j; i++) {
          if (restTableList[i].commentStat !== status) {
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
      }
    },
    computed: {
      blueCommentStyle() {
        return "background-color: #409EFF; color: #FFF";
      },
      whiteCommentStyle() {
        return "background-color: #FFF; color: #000";
      }
    },
    mounted() {
      this.tableData = this.originalTableData;
      this.changeTablePages(0);
    },
    components: {
      Pagination, SelectInput, DatePicker
    }
  }
</script>

<style scoped>
  .subContainer {
    font-size: 12px;
    color: #606266;
  }

  .first-floor {
    margin-top: 20px;
  }

  .second-floor {
    display: flex;
    margin-left: 5px;
    margin-top: 10px;
  }

  .third-floor {
    margin-top: 20px;
    vertical-align: middle;
    font-size: 12px;
    margin-left: 5px;
  }

  .third-floor span {
    line-height: 30px;
  }

  .forth-floor {
    font-size: 12px;
    color: #606266;
    margin-top: 40px;
  }

  label {
    display: inline;
  }

  .content td {
    line-height: 30px;
  }

  .textBox {
    width: 180px;
    height: 32px;
    font-size: 12px;
    padding-left: 15px;
    border: 1px solid #409eff;
    border-radius: 5px;
    margin-left: 5px;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
  }

  .textBox:focus {
    outline: none;
  }

  .textBox:hover {
    border-color: #c0c4cc;
  }

  .choose-icon {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 1px solid #409eff;
    margin-left: 20px;
    margin-top: 10px;
  }

  /* .choose 此项真实有效， 可能编辑器不完全识别vue语法*/
  .choose {
    background-image: url("../../../../../static/images/teach/choose.png");
    background-repeat: no-repeat;
    background-position: -1px -2px;
  }

  .comment {
    width: 68px;
    height: 32px;
    display: inline-block;
    border: 1px solid #dcdfe6;
    text-align: center;
    cursor: pointer;
  }

  .has-comment {
    border-radius: 4px 0 0 4px;
  }

  .no-comment {
    margin-right: 20px;
    border-radius: 0 4px 4px 0;
  }

  .btn {
    background: #409eff;
    color: #FFF;
    height: 30px;
    border-radius: 5px;
    font-size: 12px;
    margin-bottom: 3px;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
  }

  .btn:focus {
    outline: none;
  }

  .btn:hover {
    background: #66b1FF;
  }

  .btn-search {
    width: 54px;
  }

  .btn-clear {
    width: 78px;
  }

  .blue {
    cursor: pointer;
    color: #409EFF;
  }

  .red {
    cursor: pointer;
    color: #FF6947;
  }

  table {
    border: #eeeeee;
  }

  table tr {
    text-align: center !important;
  }

  table td {
    vertical-align: middle !important;
  }

  .title {
    text-align: center;
  }

  .select-input {
    margin-right: 8px;
  }
</style>
