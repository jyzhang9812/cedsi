<template>
  <div id="classmanagement">
    <!-- 添加班级模态框（Modal） -->
    <div
      class="modal fade"
      id="addClass"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <!-- <div class="alert alert-success" role="alert">哈哈哈</div> -->
      <div class="modal-dialog addwidth">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">{{modalTitle}}班级</h4>
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
                  :disabled="isChange"
                />
                <span :class="isName==true?'inputtips':'inputerr'">不超过10个字符</span>
              </div>
              <div class="add">
                <span class="keypoint">*</span>
                <span class="addtitle">指定教师</span>
                <select-input
                  class="modal-select-input"
                  id="teacher"
                  tips="请选择教师"
                  :option="addClassData.teacher.option.name"
                  @option="changeOption"
                  :drop-down-list="addClassData.teacher.list"
                ></select-input>
              </div>
              <span class="inputtips"></span>
              <div class="add">
                <span class="keypoint">*</span>
                <span class="addtitle">选择课程</span>
                <select-input
                  class="modal-select-input"
                  id="course"
                  tips="请选择课程"
                  :option="addClassData.course.option.name"
                  @option="changeOption"
                  :drop-down-list="addClassData.course.list"
                ></select-input>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submit()">确定</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
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
      <!-- <div v-html="message" :class="isShowAlter==true?'isshow':'notshow'">{{message}}</div> -->
      <div class="modal-dialog tablewidth">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">查看学生({{studentNum}}人)</h4>
          </div>
          <div class="modal-body">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th v-for="(title,index) in studentTitle" class="title" :key="index">{{title}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(student, seq) in studentData" :key="seq" class="content">
                  <td>{{seq+1}}</td>
                  <td>{{student.name}}</td>
                  <td>{{student.studentId}}</td>
                  <td>{{student.gender}}</td>
                  <td>{{student.grade}}</td>
                  <td>{{student.age}}</td>
                  <td>{{student.mobilePhone}}</td>
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
          <div class="modal-body">
            <input type="file" @change="importExcel($event.target)" />
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
    <!-- 提示模态框（Modal） -->
    <div
      class="modal fade"
      id="alterModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog alterwidth">
        <div class="modal-content">
          <div class="modal-header alterheader">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">提示</h4>
          </div>
          <div class="modal-body">
            <div class="altercontent" aria-hidden="true">
              <img :src="alterimg" class="alterimg" />
              <span>{{alterMes}}</span>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="submitDelete()"
            >确定</button>
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
      <button
        class="btn btn-clear"
        data-toggle="modal"
        data-target="#addClass"
        @click="addClass()"
      >新增班级</button>
    </div>
    <div class="second-floor">
      <table class="table table-hover">
        <thead>
          <tr>
            <th v-for="(title,index) in tableTitle" class="title" :key="index">{{title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(classes, seq) in currentList" :key="seq" class="content">
            <td>{{seq+1}}</td>
            <td>{{classes.className}}</td>
            <td>{{classes.teacherName}}</td>
            <td>{{classes.courseName}}</td>
            <td style="width:150px">
              <span
                class="blue"
                data-toggle="modal"
                data-target="#checkStudent"
                @click="checkStudent(seq)"
              >查看学生</span>&nbsp;&nbsp;
              <span
                class="blue"
                data-toggle="modal"
                data-target="#addClass"
                @click="updateClass(seq)"
              >编辑</span>&nbsp;&nbsp;
              <br />
              <span class="blue" @click="addStudent(seq)">导入学生</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination :num="tableData.length" @getNew="changeTablePages" :limit="limit"></pagination>
  </div>
</template>

<script>
import globalAxios from "axios";
import XLSX from "xlsx";

export default {
  name: "classmanagement",
  data() {
    return {
      limit: 10,
      inputData: {
        className: ""
      },
      addClassData: {
        addClassName: "",
        teacher: {
          option: "",
          list: []
        },
        course: {
          option: "",
          list: []
        }
      },
      tableTitle: ["序号", "班级名称", "教师", "课程", "操作"],
      tableData: [],
      studentTitle: [
        "序号",
        "学生姓名",
        "学号",
        "性别",
        "年级",
        "年龄",
        "手机号"
      ],
      studentData: [],
      //添加新班级
      addClassName: "",
      isName: true,
      index: -1,
      currentList: [],
      isChange: false, //班级名称是否可修改
      modalTitle: "", //模态框名称
      //提示框
      alterimg: this.$store.state.url + "eduAdmin/alter.png",
      alterMes: "",
      studentNum: 0
    };
  },
  watch: {
    addClassName(val, oldVal) {
      if (val.length <= 10 && val.length > 0) {
        this.isName = false;
      } else {
        this.isName = true;
      }
    }
  },
  methods: {
    //查看学生
    checkStudent(seq) {
      this.index = this.currentPage * this.limit + seq;
      var token = window.localStorage.getItem("idToken");
      var classId = this.tableData[this.index].classId;
      globalAxios
        .get(
          "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/eduadmin/class/" +
            classId +
            "/students",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            }
          }
        )
        .then(
          response => {
            console.log(response);
            var studentData = [];
            if (response.data != null) {
              var studentList = response.data.Items;
              this.studentNum = response.data.Count;
              for (var i = 0; i < studentList.length; i++) {
                var student = {};
                student.name = studentList[i].STUDENT_NAME;
                student.age = studentList[i].AGE;
                student.gender = studentList[i].GENDER;
                student.studentId = studentList[i].STUDENT_ID;
                student.mobilePhone = studentList[i].MOBILE_PHONE;
                student.grade = studentList[i].GRADE;
                studentData.push(student);
              }
            }
            this.studentData = studentData;
          },
          error => {
            console.log(error);
          }
        );
    },
    //导入学生
    addStudent(seq) {
      this.index = this.currentPage * this.limit + seq;
      var classId = this.tableData[this.index].classId;
      this.$router.push({
        path: "/eduAdmin/classManagement/" + classId + "/addStudent"
      });
    },
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
        this.addClassData.startDate = value;
      }
    },
    //编辑班级
    updateClass(seq) {
      this.modalTitle = "编辑";
      this.isChange = true;
      this.index = this.currentPage * this.limit + seq;
      this.addClassName = this.tableData[this.index].className;
      var teacher = {};
      teacher.name = this.tableData[this.index].teacherName;
      teacher.id = this.tableData[this.index].teacherId;
      var course = {};
      course.name = this.tableData[this.index].courseName;
      course.id = this.tableData[this.index].courseId;
      this.addClassData.teacher.option = teacher;
      this.addClassData.course.option = course;
    },
    //添加班级
    addClass() {
      this.modalTitle = "添加";
      this.isChange = false;
      this.index = -1;
      this.addClassName = "";
      this.addClassData.teacher.option = "";
      this.addClassData.course.option = "";
    },
    //编辑或更改提交
    submit() {
      var that = this;
      var token = window.localStorage.getItem("idToken");
      var newClass = {};
      console.log(this.index);
      //编辑提交
      if (this.index >= 0) {
        var updateClass = {};
        updateClass.courseId = this.addClassData.course.option.id;
        updateClass.courseName = this.addClassData.course.option.name;
        updateClass.teacherId = this.addClassData.teacher.option.id;
        updateClass.classId = this.tableData[this.index].classId;
        console.log(updateClass);
        globalAxios
          .post(
            "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/eduadmin/class/" +
              updateClass.classId +
              "/course",
            updateClass,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: token
              }
            }
          )
          .then(
            response => {
              console.log(response);
              this.tableData[
                this.index
              ].teacherName = this.addClassData.teacher.option.name;
              this.tableData[
                this.index
              ].teacherId = this.addClassData.teacher.option.id;
              this.tableData[
                this.index
              ].courseName = this.addClassData.course.option.name;
              this.tableData[
                this.index
              ].courseId = this.addClassData.course.option.id;
            },
            error => {}
          );
      }
      //修改提交
      else {
        newClass.className = this.addClassName;
        newClass.teacherId = this.addClassData.teacher.option.id;
        newClass.courseId = this.addClassData.course.option.id;
        newClass.courseName = this.addClassData.course.option.name;
        console.log(newClass);
        globalAxios
          .post(
            "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/eduadmin/class",
            newClass,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: token
              }
            }
          )
          .then(
            response => {
              console.log(response);
              globalAxios
                .get(
                  "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/eduadmin/class",
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: token
                    }
                  }
                )
                .then(
                  response => {
                    console.log(response);
                    var classList = response.data;
                    var classArr = [];
                    for (var i = 0; i < classList.length; i++) {
                      var classes = {};
                      classes.classId = classList[i].CLASS_ID;
                      classes.className = classList[i].CLASS_NAME;
                      classes.teacherName = classList[i].TEACHER_NAME;
                      classes.courseId = classList[i].COURSE_ID;
                      classes.courseName = classList[i].COURSE_NAME;
                      classes.courseMemberCount =
                        classList[i].CLASS_MEMBER_COUNT;
                      classArr.push(classes);
                    }
                    this.tableData = classArr;
                    this.changeTablePages(0);
                  },
                  error => {
                    console.log(error);
                  }
                );
            },
            error => {
              console.log(error);
            }
          );
      }
    },
    changeTablePages(value) {
      var currentPage = value / this.limit;
      this.currentPage = currentPage;
      this.currentList = this.tableData.slice(value, value + this.limit);
    },
    //搜索
    conditionSearch() {
      let temp = this.telOrNameFilter(this.inputData.className, temp);
      this.tableData = temp;
      this.changeTablePages(0);
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
    deleteClass(seq) {
      this.index = seq;
      this.alterMes = "确认删除吗？";
    }
  },
  mounted() {
    //获取班级列表
    var token = window.localStorage.getItem("idToken");
    globalAxios
      .get(
        "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/eduadmin/class",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
        }
      )
      .then(
        response => {
          console.log(response);
          var classArr = [];
          if (response.data != null) {
            var classList = response.data;
            console.log(classList);
            for (var i = 0; i < classList.length; i++) {
              var classes = {};
              classes.classId = classList[i].CLASS_ID;
              classes.className = classList[i].CLASS_NAME;
              classes.teacherName = classList[i].TEACHER_NAME;
              classes.teacherId = classList[i].TEACHER_ID;
              classes.courseName = classList[i].COURSE_NAME;
              classes.courseId = classList[i].COURSE_ID;
              classes.courseMemberCount = classList[i].CLASS_MEMBER_COUNT;
              classArr.push(classes);
            }
          }
          this.tableData = classArr;
          this.changeTablePages(0);
        },
        error => {
          console.log(error);
        }
      );
    //获取教师列表以及课程列表
    globalAxios
      .get(
        "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/eduadmin/class/msg",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
        }
      )
      .then(
        response => {
          console.log(response);
          var teacherList = response.data.teacher;
          var teacherArr = [];
          for (var i = 0; i < teacherList.length; i++) {
            var teacher = {};
            teacher.name = teacherList[i].TEACHER_NAME;
            teacher.id = teacherList[i].TEACHER_ID;
            teacherArr.push(teacher);
          }
          this.addClassData.teacher.list = teacherArr;
          console.log(this.addClassData.teacher.list);
          var courseList = response.data.course;
          var courseArr = [];
          for (var i = 0; i < courseList.length; i++) {
            var course = {};
            course.name = courseList[i].COURSE_NAME;
            course.id = courseList[i].COURSE_ID;
            courseArr.push(course);
          }
          this.addClassData.course.list = courseArr;
          console.log(this.addClassData.course.list);
        },
        error => {
          console.log(error);
        }
      );
  }
};
</script>

<style scoped>
#classmanagement .breadcrumb {
  background-color: #fff;
  color: #606266;
  margin-bottom: 0;
}

#classmanagement {
  font-size: 12px;
  color: #606266;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
}

#classmanagement .first-floor {
  margin-top: 20px;
}

#classmanagement .second-floor {
  font-size: 12px;
  color: #606266;
  margin-top: 20px;
}

#classmanagement .select-input {
  display: inline-block;
}

#classmanagement label {
  display: inline;
}

#classmanagement .content td {
  line-height: 30px;
}

#classmanagement .textBox {
  width: 180px;
  height: 32px;
  font-size: 12px;
  padding-left: 15px;
  border: 1px solid #409eff;
  border-radius: 5px;
  margin-left: 5px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#classmanagement .textBox:focus {
  outline: none;
}

#classmanagement .textBox:hover {
  border-color: #409eff;
}

#classmanagement .btn {
  background: #409eff;
  color: #fff;
  height: 30px;
  border-radius: 5px;
  font-size: 12px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#classmanagement .btn:focus {
  outline: none;
}

#classmanagement .btn:hover {
  background: #66b1ff;
}

#classmanagement .btn-search {
  width: 54px;
}

#classmanagement .btn-clear {
  width: 78px;
}

#classmanagement .blue {
  cursor: pointer;
  color: #409eff;
}
#classmanagement .red {
  cursor: pointer;
  color: red;
}

#classmanagement table {
  border: #eeeeee;
}

#classmanagement table tr {
  text-align: center !important;
}

#classmanagement table td {
  vertical-align: middle !important;
}

#classmanagement .title {
  text-align: center;
}

#classmanagement .select-input {
  margin-right: 8px;
}

/*添加班级模态框*/
#classmanagement .addwidth {
  width: 500px;
}

#classmanagement .modal-dialog {
  top: 100px;
  position: relative;
}

#classmanagement .modal-header {
  background-color: #409eff;
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

#classmanagement .add {
  width: 100%;
}

#classmanagement .keypoint {
  color: red;
}

#classmanagement .addtitle {
  color: #606266;
}

#classmanagement .addcon {
  width: 180px;
  border: 1px solid #409eff;
  border-radius: 5px;
  height: 32px;
  line-height: 32px;
  margin-left: 5px;
  padding: 0 20px;
}

#classmanagement .addcon:hover {
  border: 1px solid #dcdfe6;
}

#classmanagement .addcon:focus {
  outline: none;
}

#classmanagement .content {
  margin: 0 auto;
  width: 55%;
  height: 100%;
}

#classmanagement .modal-footer {
  border: none;
  text-align: center;
}

#classmanagement .modal-select-input {
  display: inline-block;
  margin-left: 5px;
}

#classmanagement .inputBox {
  padding: 0;
}

/*排课模态框*/
#classmanagement .nav-pills > li.active > a,
#classmanagement .nav-pills > li.active > a:focus,
#classmanagement .nav-pills > li.active > a:hover {
  background-color: #409eff;
  margin-bottom: 10px;
}

#classmanagement .tab-content {
  margin: 0 auto;
}

#classmanagement .course-content {
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
}

#classmanagement .course-time {
  display: inline-block;
  width: 250px;
  text-align: left;
}

#classmanagement .datepicker {
  margin-right: 20px;
}

/*查看学生模态框*/
#classmanagement .tablewidth {
  width: 90%;
  margin: 0 auto;
}

#classmanagement .tips {
  border-radius: 5px;
  border: 1px solid #409eff;
  padding-left: 10px;
}

#classmanagement .tips:focus {
  outline: none;
}

#classmanagement .tips:hover {
  border: 1px solid #dcdfe6;
}

/*正则判断*/
#classmanagement .inputtips {
  display: inline-block;
  color: red;
  margin-left: 80px;
  height: 10px;
  width: 100%;
}

#classmanagement .err {
  border: 1px solid red;
}

#classmanagement .inputerr {
  visibility: hidden;
  height: 10px;
  width: 100%;
}

/*修改成功弹出框*/
#classmanagement .isshow {
  width: 30%;
  position: relative;
  margin: 20px auto;
}

#classmanagement .notshow {
  width: 40%;
  position: relative;
  margin: 20px auto;
  visibility: hidden;
}
#classmanagement .alterwidth {
  width: 30%;
}
#classmanagement .altercontent {
  width: 300px;
  margin: 0 auto;
}
#classmanagement .alterimg {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
</style>