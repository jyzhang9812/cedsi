<template>
  <div class="subContainer">
    <!-- 添加班级模态框（Modal） -->
    <div
      class="modal fade"
      id="addClass"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog addwidth">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">新增班级</h4>
          </div>
          <div class="modal-body">
            <div class="content">
              <div class="add">
                <span class="keypoint">*</span>
                <span class="addtitle">班级名称</span>
                <input
                  :class="isName==false?'addcon':'addcon err'"
                  placeholder="请输入班级名称"
                  v-model="addClassName"
                />
                <span :class="isName==true?'inputtips':'inputerr'">不超过10个字符</span>
              </div>
              <div class="add">
                <span class="keypoint">*</span>
                <span class="addtitles">开课时间</span>
                <date-picker
                  tips="选择开始时间"
                  id="datePicker_start"
                  :date="addClassData.startDate"
                  @changeDate="changeDate"
                ></date-picker>
              </div>
              <span class="inputtips"></span>
              <!-- <div class="add">
                <span class="keypoint">*</span>
                <span class="addtitle">指定学校</span>
                <select-input
                  class="modal-select-input"
                  id="school"
                  tips="请选择学校"
                  :option="addClassData.school.option"
                  @option="changeOption"
                  :drop-down-list="addClassData.school.list"
                ></select-input>
              </div>-->
              <div class="add">
                <span class="keypoint">*</span>
                <span class="addtitle">指定教师</span>
                <select-input
                  class="modal-select-input"
                  id="teacher"
                  tips="请选择教师"
                  :option="addClassData.teacher.option"
                  @option="changeOption"
                  :drop-down-list="addClassData.teacher.list"
                ></select-input>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary">确定</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
    <!-- 排课模态框（Modal） -->
    <div
      class="modal fade"
      id="courseScheduling"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">排课</h4>
          </div>
          <div class="modal-body">
            <div class="course">
              <!-- 选项卡菜单-->
              <ul id="myTab" class="nav nav-pills" role="tablist">
                <li v-for="(course,index) in courseList" :key="index" :class="index==0?'active':''">
                  <a :href="'#'+course.name" role="tab" data-toggle="pill">{{course.name}}</a>
                </li>
              </ul>
              <!-- 选项卡面板 -->
              <div id="myTabContent" class="tab-content">
                <div
                  :class="index==0?'tab-pane fade in active':'tab-pane fade in'"
                  v-for="(course,index) in courseList"
                  :key="index"
                  :id="course.name"
                >
                  <div
                    class="course-content"
                    v-for="(courseson,index) in course.courseContent"
                    :key="index"
                  >
                    <span
                      class="course-time"
                    >{{course.name+" |第"+(index+1)+"节课| "+courseson.sonConName}}</span>
                    <date-picker
                      class="datepicker"
                      tips="选择开始时间"
                      :id="courseson.sonConName"
                      :date="courseson.sonConDate"
                      @changeClassDate="changeClassDate(course.name,index)"
                    ></date-picker>
                    <span class="blue">保存</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
    <!-- 查看学生模态框（Modal） -->
    <div
      class="modal fade"
      id="checkStudent"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      ref="checkStudent"
    >
      <div class="modal-dialog tablewidth">
        <div class="modal-content tablewidth">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">查看学生</h4>
          </div>
          <div class="modal-body">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th v-for="(title,index) in studentTitle" class="title" :key="index">{{title}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(line, seq) in studentData" :key="seq" class="content">
                  <td>{{seq}}</td>
                  <td v-for="(item,index) in line" :key="index">{{item}}</td>
                  <td style="width:150px">
                    <input class="tips" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
    <!-- 批量导入（Modal） -->
    <div
      class="modal fade"
      id="addStudents"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">批量导入学生</h4>
          </div>
          <div class="modal-body"></div>

          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary">确定</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
    <div class="classroute">
      <ol class="breadcrumb">
        <li>教务管理</li>
        <li>班级管理</li>
      </ol>
    </div>
    <div class="first-floor">
      <label for="class-name"></label>
      <input
        type="text"
        placeholder="请输入班级名称"
        class="textBox"
        id="class-name"
        v-model="inputData.className"
      />
      <!-- <div class="select-input">
        <select-input
          id="school"
          tips="请选择学校"
          :option="inputData.school.option"
          @option="changeOption"
          :drop-down-list="inputData.school.list"
        ></select-input>
      </div>-->
      <button class="btn btn-search">搜索</button>
      <button class="btn btn-clear" @click="clearChoices">清空筛选</button>
      <button class="btn btn-clear" data-toggle="modal" data-target="#addClass">新增班级</button>
    </div>
    <div class="second-floor">
      <table class="table table-hover">
        <thead>
          <tr>
            <th v-for="(title,index) in tableTitle" class="title" :key="index">{{title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(line, seq) in tableData" :key="seq" class="content">
            <td>{{seq}}</td>
            <td v-for="(item,index) in line" :key="index">{{item}}</td>
            <td style="width:150px">
              <span class="blue" data-toggle="modal" data-target="#courseScheduling">排课</span>&nbsp;&nbsp;
              <span class="blue" data-toggle="modal" data-target="#checkStudent">查看学生</span>&nbsp;&nbsp;
              <span class="blue" data-toggle="modal" data-target="#updateClass">编辑</span>&nbsp;&nbsp;
              <span class="blue" data-toggle="modal" data-target="#addStudents">批量导入学生</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import SelectInput from "../utils/selectInput";
import DatePicker from "../utils/datePicker";
export default {
  name: "classmanagement",
  components: { SelectInput, DatePicker },
  data() {
    return {
      inputData: {
        className: ""
        // school: {
        //   option: "",
        //   list: ["师大一中", "师大二中", "师大三中"]
        // }
      },
      addClassData: {
        addClassName: "",
        startDate: "",
        teacher: {
          option: "",
          list: ["祁老师", "程老师"]
        }
      },
      tableTitle: [
        "序号",
        "所属学校",
        "班级名称",
        "开课时间",
        "老师",
        "待上课程",
        "已结课程",
        "操作"
      ],
      tableData: [
        ["赛小迪", "JAVA", "2019-07-20", "祁老师", "操作系统", "计算机网络"],
        ["赛小迪", "JAVA", "2019-07-20", "祁老师", "操作系统", "计算机网络"],
        ["赛小迪", "JAVA", "2019-07-20", "祁老师", "操作系统", "计算机网络"],
        ["赛小迪", "JAVA", "2019-07-20", "祁老师", "操作系统", "计算机网络"]
      ],
      studentTitle: [
        "序号",
        "学生姓名",
        "账号",
        "学校",
        "年级",
        "班级",
        "录入时间",
        "手机号",
        "备注"
      ],
      studentData: [
        [
          "小赛",
          "赛迪思",
          "赛迪思",
          "初一",
          "6班",
          "2019-02-27 16:25:03",
          "111111111"
        ],
        [
          "小赛",
          "赛迪思",
          "赛迪思",
          "初一",
          "6班",
          "2019-02-27 16:25:03",
          "111111111"
        ],
        [
          "小赛",
          "赛迪思",
          "赛迪思",
          "初一",
          "6班",
          "2019-02-27 16:25:03",
          "111111111"
        ],
        [
          "小赛",
          "赛迪思",
          "赛迪思",
          "初一",
          "6班",
          "2019-02-27 16:25:03",
          "111111111"
        ]
      ],
      courseList: [
        {
          name: "Scratch1",
          courseContent: [
            {
              sonConName: "初遇地球--机器人解体1",
              sonConDate: "2019-07-23 00:00"
            },
            {
              sonConName: "初遇地球--机器人解体2",
              sonConDate: "2019-03-01 00:00"
            }
          ]
        },
        {
          name: "Scratch2",
          courseContent: [
            {
              sonConName: "初遇地球--机器人解体3",
              sonConDate: "2019-03-01 00:00"
            },
            {
              sonConName: "初遇地球--机器人解体4",
              sonConDate: "2019-03-01 00:00"
            }
          ]
        }
      ],
      //添加新班级
      addClassName: "",
      isName: true
    };
  },
  watch: {
    addClassName(val, oldVal) {
      if (val.length <= 10 && val.length > 0) {
        this.isName = false;
        console.log(this.isName);
      } else {
        this.isName = true;
        console.log(this.isName);
      }
    }
  },
  methods: {
    optionsInit() {
      this.inputData = {
        className: "",
        startDate: "",
        school: {
          option: "",
          list: ["师大一中", "师大二中", "师大三中"]
        }
      };
    },
    changeOption(item, id) {
      Object.keys(this.addClassData).forEach(res => {
        if (res === id) {
          this.addClassData[res].option = item;
        }
      });
    },
    clearChoices() {
      this.optionsInit();
    },
    changeDate(value, id) {
      if (id === "datePicker_start") {
        this.inputData.startDate = value;
      } else if (id === "datePicker_end") {
        this.inputData.endDate = value;
      }
    }
  }
};
</script>

<style scoped>
.breadcrumb {
  background-color: #fff;
  color: #606266;
  margin-bottom: 0;
}
.subContainer {
  font-size: 12px;
  color: #606266;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
}

.first-floor {
  margin-top: 20px;
}
.second-floor {
  font-size: 12px;
  color: #606266;
  margin-top: 20px;
}
.select-input {
  display: inline-block;
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
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.textBox:focus {
  outline: none;
}

.textBox:hover {
  border-color: #409eff;
}

/* .choose 此项真实有效， 可能编辑器不完全识别vue语法*/
.choose {
  background-image: url("../../../../../static/images/teach/choose.png");
  background-repeat: no-repeat;
  background-position: -1px -2px;
}

.btn {
  background: #409eff;
  color: #fff;
  height: 30px;
  border-radius: 5px;
  font-size: 12px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.btn:focus {
  outline: none;
}

.btn:hover {
  background: #66b1ff;
}

.btn-search {
  width: 54px;
}

.btn-clear {
  width: 78px;
}

.blue {
  cursor: pointer;
  color: #409eff;
}

.red {
  cursor: pointer;
  color: #ff6947;
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
/*添加班级模态框*/
.addwidth{
  width: 35%
}
.modal-dialog {
  top: 100px;
  position: relative;
}
.modal-header {
  background-color: #409eff;
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.add {
  width: 100%;
}
.keypoint {
  color: red;
}
.addtitle {
  color: #606266;
}
.addcon {
  width: 72%;
  border: 1px solid #409eff;
  border-radius: 5px;
  height: 32px;
  line-height: 32px;
  margin-left: 5px;
  padding: 0 20px;
}
.addcon:hover {
  border: 1px solid #dcdfe6;
}
.addcon:focus {
  outline: none;
}

.content {
  margin: 0 auto;
  width: 55%;
  height: 100%;
}
.modal-footer {
  border: none;
  text-align: center;
}
.modal-select-input {
  display: inline-block;
  margin-left: 5px;
}
.inputBox {
  padding: 0;
}
/*排课模态框*/
.nav-pills > li.active > a,
.nav-pills > li.active > a:focus,
.nav-pills > li.active > a:hover {
  background-color: #409eff;
  margin-bottom: 10px;
}
.tab-content {
  margin: 0 auto;
}
.course-content {
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
}
.course-time {
  display: inline-block;
  width: 250px;
  text-align: left;
}
.datepicker {
  margin-right: 20px;
}
/*查看学生模态框*/
.tablewidth {
  width: 90%;
  margin: 0 auto;
}
.tips {
  border-radius: 5px;
  border: 1px solid #409eff;
  padding-left: 10px;
}
.tips:focus {
  outline: none;
}
.tips:hover {
  border: 1px solid #dcdfe6;
}
/*正则判断*/
.inputtips {
  display: inline-block;
  color: red;
  margin-left: 80px;
  height: 10px;
  width: 100%;
}
.err {
  border: 1px solid red;
}
.inputerr{
  visibility: hidden;
  height: 10px;
  width: 100%;
}
</style>
