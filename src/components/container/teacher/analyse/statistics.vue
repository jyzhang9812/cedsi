<template>
  <div class="subContainer">
    <span>作业点评</span>
      <div class="first-floor">
        <div class="select-input">
        <input type="text" placeholder="请输入姓名、手机号"
             class="textBox" id="tel-name"
             v-model="inputData.telOrName">
        </div>
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
          <select-input id="order"
                        tips="请选择课次"
                        :option="inputData.order.option"
                        @option="changeOption"
                        :drop-down-list="inputData.order.list">
          </select-input>
        </select-input>
      </div>
    </div>
    <div class="second-floor">
      
      
    </div>
  
    <div class="third-floor">
       <date-picker tips="选择开始时间" id="datePicker_start"
                   :date="inputData.startDate"
                   @changeDate="changeDate">
      </date-picker>
      <date-picker tips="选择结束时间" id="datePicker_end"
                   :date="inputData.endDate"
                   @changeDate="changeDate">
      </date-picker>
      <button class="btn btn-search">搜索</button>
      <button class="btn btn-clear" @click="clearChoices">清空筛选</button>
    </div>
    <div class="forth-floor">
      <table class="table table-hover">
        <thead>
        <tr>
          <th v-for="title in tableTitle" :key="title" class="title">{{title}}</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(list,index) in tableData" :key="index" class="content">
            <td>{{index+1}}</td>
            <td>{{list.organName}}</td>
            <td>{{list.className}}</td>
            <td>{{list.studentName}}</td>
            <td>{{list.objName}}</td>
            <td>{{list.levelName}}</td>
            <td>{{list.videoName}}</td>
            <td>{{list.isStart}}</td>
            <td>{{list.startTime}}</td>
            <td>{{list.learnTime}}</td>
            <td>{{list.learnNmm}}</td>
            <td>{{list.learnNoteNmm}}</td>
            <td>{{list.commitTime}}</td>
            <td>{{list.homeworkStar}}</td>
            <td>{{list.commitNmm}}</td>
        </tr>
        </tbody>
      </table>
       <div class="pag">

      <ul class="pagination modal-2">
        <li><a href="#" class="prev">&laquo </a></li>
        <li><a href="#" class="active">1</a></li>
        <li> <a href="#">2</a></li>
        <li> <a href="#">3</a></li>
        <li> <a href="#">4</a></li>
        <li> <a href="#">5</a></li>
        <li> <a href="#">6</a></li>
        <li> <a href="#">7</a></li>
        <li> <a href="#">8</a></li>
        <li> <a href="#">9</a></li>
        <li><a href="#" class="next"> &raquo;</a></li>
      </ul>


    </div>
    </div>
  </div>
</template>

<script>
  import DatePicker from "../utils/datePicker"
  import SelectInput from "../utils/selectInput";

  export default {
    name: "remark",
    data() {
      return {
        chooseAll: true,
        comment: {
          commentStatus: 0,
          hasComment: "background-color: #FFF; color: #000",
          noComment: "background-color: #FFF; color: #000"
        },
        inputData: {
          telOrName: "",
          startDate: "",
          endDate: "",
          school: {
            option: "",
            list: ["师大一中", "师大二中", "师大三中"]
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
          "学校",
          "线上班级",
          "学生",
          "课程",
          "等级",
          "课次",
          "是否开课",
          "开课时间",
          "学习时间",
          "学习视频次数",
          "观看讲义次数",
          "首次作业提交时间",
          "最新作业得星",
          "提交作业次数"
        ],
        tableData: [
         {
            organName:"snnu",
            className:"1702",
            studentName: "王晓瀑",
            objName: "入门到放弃",
            levelName: "赛迪思",
            videoName: "java",
            isStart: "是",
            startTime:"2019-01-01 ",
            learnTime:"2019-01-01 ",
            learnNmm:"5",
            learnNoteNmm:"3",
            commitTime:"2019-05-17 15:31:55",
            homeworkStar:"5",
            commitNmm:"4"
          },
          {
             organName:"snnu",
            className:"1703",
            studentName: "李斌斌",
            objName: "入门到放弃",
            levelName: "赛迪思",
            videoName: "java",
            isStart: "是",
            startTime:"2019-01-01 ",
            learnTime:"2019-01-01 ",
            learnNmm:"5",
            learnNoteNmm:"3",
            commitTime:"2019-05-17 15:31:55",
            homeworkStar:"5",
            commitNmm:"4"
          }
        ]
      }
    },
    methods: {
      changeChoices() {
        this.chooseAll = !this.chooseAll;
      },
      changeComment(comment) {
        if (comment === 'has') {
          // 0: 均为选中  1:已评论   2: 未评论
          this.comment = {
            commentStatus: 1,
            hasComment: "background-color: #409EFF; color: #FFF",
            noComment: "background-color: #FFF; color: #000"
          };
        } else {
          this.comment = {
            commentStatus: 2,
            hasComment: "background-color: #FFF; color: #000",
            noComment: "background-color: #409EFF; color: #FFF"
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
        this.optionsInit();
      },
      optionsInit() {
        this.inputData = {
          telOrName: "",
          startDate: "",
          endDate: "",
          school: {
            option: "",
            list: ["师大一中", "师大二中", "师大三中"]
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
        };
        this.chooseAll = true;
        this.comment = {
          commentStatus: 0,
          hasComment: "background-color: #FFF; color: #000",
          noComment: "background-color: #FFF; color: #000"
        }
      },
      changeOption(item, id) {
        Object.keys(this.inputData).forEach((res) => {
          if (res === id) {
            this.inputData[res].option = item;
          }
        });
      }
    },
    components: {SelectInput, DatePicker}
  }
</script>

<style scoped>
  .subContainer {
    font-size: 12px;
    color: #606266;
  }

  .second-floor {
    margin-top: 20px;
  }

  .first-floor {
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
   .pag {
    font-size: 13px;
  }

  .pagination {
    list-style: none;
    display: inline-block;
    padding: 0;
    margin-top: 10px;
  }

  .pagination li {
    display: inline;
    text-align: center;
  }

  .pagination a {
    float: left;
    display: block;
    font-size: 13px;
    text-decoration: none;
    padding: 5px 12px;
    color: #c2c4cc;
    margin-left: -1px;
    border: 1px solid transparent;
    line-height: 1.5;
  }

  .pagination a.active {
    cursor: default;
  }

  .pagination a:active {
    outline: none;
  }

  .modal-2 li:first-child a {
    -moz-border-radius: 50px 0 0 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px 0 0 50px;
  }

  .modal-2 li:last-child a {
    -moz-border-radius: 0 50px 50px 0;
    -webkit-border-radius: 0;
    border-radius: 0 50px 50px 0;
  }

  .modal-2 a {
    border-color: #f4f4f5;
    color: #c2c4cc;
    background: #f4f4f5;
  }

  .modal-2 a:hover {
    color: #FFF;
    background-color: #409EFF;
  }

  .modal-2 a.active,
  .modal-2 a:active {
    border-color: #409EFF;
    background: #409EFF;
    color: #fff;
  }

</style>
