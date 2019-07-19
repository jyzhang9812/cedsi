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
          <select-input id="order"
                        tips="请选择课次"
                        :option="inputData.order.option"
                        @option="changeOption"
                        :drop-down-list="inputData.order.list">
          </select-input>
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
      <button class="btn btn-search">搜索</button>
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
        <tr v-for="(line, seq) in tableData" class="content">
          <td>{{seq}}</td>
          <td v-for="item in line">{{item}}</td>
          <td><span class="blue">编辑</span>&nbsp;&nbsp;<span class="red">删除</span></td>
        </tr>
        </tbody>
      </table>
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
          "作者姓名",
          "手机号码",
          "提交时间",
          "作品",
          "学校",
          "班级",
          "课程名称",
          "课程等级",
          "状态",
          "操作"
        ],
        tableData: [
          [
            "赛小迪",
            "13152081872",
            "2019-5-2 19:30",
            "超级玛丽",
            "师大附小",
            "9班",
            "计算机网络",
            "1",
            "已点评"
          ],
          [
            "赛大迪",
            "15252081872",
            "2019-3-21 19:03",
            "坦克大战",
            "师大附小",
            "9班",
            "计算机网络",
            "3",
            "未点评"
          ],
          [
            "李云龙",
            "18896253728",
            "2018-5-2 11:32",
            "消灭病毒",
            "师大附小",
            "10班",
            "计算机网络",
            "2",
            "已点评"
          ],
          [
            "楚云飞",
            "15652081872",
            "2019-5-20 16:30",
            "宾果消消消",
            "邮电附小",
            "2班",
            "计算机网络",
            "1",
            "未点评"
          ]
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
