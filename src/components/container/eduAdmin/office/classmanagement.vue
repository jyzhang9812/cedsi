<template>
  <div class="subContainer">
    <!-- 添加班级模态框（Modal） -->
    <div class="modal fade" id="addClass" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <!-- <div class="alert alert-success" role="alert">哈哈哈</div> -->
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
                <input :class="isName==false?'addcon':'addcon err'" placeholder="请输入班级名称" v-model="addClassName" />
                <span :class="isName==true?'inputtips':'inputerr'">不超过10个字符</span>
              </div>
              <div class="add">
                <span class="keypoint">*</span>
                <span class="addtitles">开课时间</span>
                <date-picker tips="选择开始时间" id="datePicker_start" :date="addClassData.startDate" @changeDate="changeDate"
                  v-model="addClassData.startDate"></date-picker>
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
                <select-input class="modal-select-input" id="teacher" tips="请选择教师" :option="addClassData.teacher.option"
                  @option="changeOption" :drop-down-list="addClassData.teacher.list"
                  v-model="addClassData.teacher.option"></select-input>
              </div>
              <span class="inputtips"></span>
              <div class="add">
                <span class="keypoint">*</span>
                <span class="addtitle">选择课程</span>
                <select-input class="modal-select-input" id="course" tips="请选择课程" :option="addClassData.course.option"
                  @option="changeOption" :drop-down-list="addClassData.course.list"
                  v-model="addClassData.course.option"></select-input>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submit()">确定</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
    <!-- 排课模态框（Modal） -->
    <div class="modal fade" id="courseScheduling" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
      aria-hidden="true">
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
                <div :class="index==0?'tab-pane fade in active':'tab-pane fade in'" v-for="(course,index) in courseList"
                  :key="index" :id="course.name">
                  <div class="course-content" v-for="(courseson,index) in course.courseContent" :key="index">
                    <span class="course-time">{{course.name+" |第"+(index+1)+"节课| "+courseson.sonConName}}</span>
                    <date-picker class="datepicker" tips="选择开始时间" :id="courseson.sonConName"
                      :date="courseson.sonConDate" @changeClassDate="changeClassDate(course.name,index)"></date-picker>
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
    <div class="modal fade" id="checkStudent" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
      aria-hidden="true" ref="checkStudent">
      <div v-html="message" :class="isShowAlter==true?'isshow':'notshow'">{{message}}</div>
      <div class="modal-dialog tablewidth">
        <div class="modal-content">
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
                <tr v-for="(student, seq) in studentData" :key="seq" class="content">
                  <td>{{seq+1}}</td>
                  <td>{{student.name}}</td>
                  <td>{{student.account}}</td>
                  <td>{{student.school}}</td>
                  <td>{{student.grade}}</td>
                  <td>{{student.className}}</td>
                  <td>{{student.addTime}}</td>
                  <td>{{student.tel}}</td>
                  <td style="width:150px">
                    <input class="tips" @focus="updateRemark(seq)" :value="student.remark" @blur="submitRemark()" />
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
    <div class="modal fade" id="addStudents" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
      aria-hidden="true">
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
    <div class="classroute">
      <ol class="breadcrumb">
        <li>教务管理</li>
        <li>班级管理</li>
      </ol>
    </div>
    <div class="first-floor">
      <label for="class-name"></label>
      <input type="text" placeholder="请输入班级名称" class="textBox" id="class-name" v-model="inputData.className" />
      <!-- <div class="select-input">
        <select-input
          id="school"
          tips="请选择学校"
          :option="inputData.school.option"
          @option="changeOption"
          :drop-down-list="inputData.school.list"
        ></select-input>
      </div>-->
      <button class="btn btn-search" @click="conditionSearch">搜索</button>
      <!-- <button class="btn btn-clear" @click="clearChoices">清空筛选</button> -->
      <button class="btn btn-clear" data-toggle="modal" data-target="#addClass" @click="addClass()">新增班级</button>
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
            <td>{{classes.school}}</td>
            <td>{{classes.className}}</td>
            <td>{{classes.addDate}}</td>
            <td>{{classes.teacher}}</td>
            <td>{{classes.perCourse}}</td>
            <td>{{classes.endCourse}}</td>
            <td style="width:150px">
              <span class="blue" data-toggle="modal" data-target="#courseScheduling">排课</span>&nbsp;&nbsp;
              <span class="blue" data-toggle="modal" data-target="#checkStudent">查看学生</span>&nbsp;&nbsp;
              <span class="blue" data-toggle="modal" data-target="#addClass"
                @click="updateClass(seq)">编辑</span>&nbsp;&nbsp;
              <span class="blue" data-toggle="modal" data-target="#addStudents">批量导入学生</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination :num="tableData.length" @getNew="changeTablePages" :limit="limit"></pagination>
  </div>
</template>

<script>
  import pagination from "../../teacher/utils/pagination.vue";
  import SelectInput from "../utils/selectInput";
  import DatePicker from "../utils/datePicker";
  import globalAxios from 'axios';
  import XLSX from 'xlsx'

  export default {
    name: "classmanagement",
    components: { SelectInput, DatePicker, pagination },
    data() {
      return {
        limit: 10,
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
          },
          course: {
            option: "",
            list: ["JAVA", "操作系统"]
          }
        },
        tableTitle: [
          "序号",
          "班级名称",
          "开课时间",
          "老师",
          "课程",
          "学生人数",
          "操作"
        ],
        tableData: [
          {
            school: "哈哈哈",
            className: "JAVA",
            addDate: "2019-07-20 00:00",
            teacher: "祁老师",
            perCourse: "操作系统",
            endCourse: "计算机网络"
          },
          {
            school: "赛小迪",
            className: "JAVA1",
            addDate: "2019-07-20 00:00",
            teacher: "祁老师",
            perCourse: "操作系统",
            endCourse: "计算机网络"
          },
          {
            school: "赛小迪",
            className: "JAVA",
            addDate: "2019-07-20 00:00",
            teacher: "祁老师",
            perCourse: "操作系统",
            endCourse: "计算机网络"
          },
          {
            school: "赛小迪",
            className: "JAVA",
            addDate: "2019-07-20 00:00",
            teacher: "祁老师",
            perCourse: "操作系统",
            endCourse: "计算机网络"
          }
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
          {
            name: "小赛",
            account: "赛迪思",
            school: "赛迪思",
            grade: "初一",
            className: "6班",
            addTime: "2019-02-27 16:25:03",
            tel: "111111111",
            remark: "是个好孩子"
          },
          {
            name: "小赛",
            account: "赛迪思",
            school: "赛迪思",
            grade: "初一",
            className: "6班",
            addTime: "2019-02-27 16:25:03",
            tel: "111111111",
            remark: ""
          },
          {
            name: "小赛",
            account: "赛迪思",
            school: "赛迪思",
            grade: "初一",
            className: "6班",
            addTime: "2019-02-27 16:25:03",
            tel: "111111111",
            remark: ""
          },
          {
            name: "小赛",
            account: "赛迪思",
            school: "赛迪思",
            grade: "初一",
            className: "6班",
            addTime: "2019-02-27 16:25:03",
            tel: "111111111",
            remark: "好"
          }
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
        isName: true,
        updateIndex: -1,
        remark: "",
        //修改备注成功弹出标签
        message:
          "<div v-show='isShowAlter' class='alert alert-success alter-width' role='alert'>修改成功!</div>",
        isShowAlter: false,
        currentList: []
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
      importExcel(file) {
        var file = file.files[0] // 使用传统的input方法需要加上这一步
        const types = file.name.split('.')[1]
        const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(item => item === types)
        if (!fileType) {
          alert('格式错误！请重新选择')
          return
        }
        this.file2Xce(file).then(tabJson => {
          if (tabJson && tabJson.length > 0) {
            this.xlsxJson = tabJson
            console.log(this.xlsxJson)
            var token = window.localStorage.getItem('idToken')
            globalAxios({
              url: 'https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/eduadmin/students',
              method:'post',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              },
              data: this.xlsxJson
            }
            ).then(response => {
              console.log(response);
            },
              error => {
                console.log(error);
              })
          }
        })
      },
      file2Xce(file) {
        return new Promise(function (resolve, reject) {
          const reader = new FileReader()
          reader.onload = function (e) {
            const data = e.target.result
            this.wb = XLSX.read(data, {
              type: 'binary'
            })
            const result = []
            this.wb.SheetNames.forEach((sheetName) => {
              result.push({
                sheetName: sheetName,
                sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
              })
            })
            resolve(result)
          }
          // reader.readAsBinaryString(file.raw)
          reader.readAsBinaryString(file) // 传统input方法
        })
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
        this.updateIndex = seq;
        this.addClassName = this.tableData[seq].className;
        this.addClassData.startDate = this.tableData[seq].addDate;
        this.addClassData.teacher.option = this.tableData[seq].teacher;
      },
      //添加班级
      addClass() {
        this.updateIndex = -1;
        this.addClassName = "";
        this.addClassData.startDate = "";
        this.addClassData.teacher.option = "";
      },
      //编辑或更改提交
      submit() {
        var newClass = {};
        console.log(this.updateIndex);
        if (this.updateIndex > 0) {
          this.tableData[this.updateIndex].className = this.addClassName;
          this.tableData[this.updateIndex].addDate = this.addClassData.startDate;
          this.tableData[
            this.updateIndex
          ].teacher = this.addClassData.teacher.option;
        } else {
          (newClass.school = "赛迪斯"),
            (newClass.className = this.addClassName),
            (newClass.addDate = this.addClassData.startDate),
            (newClass.teacher = this.addClassData.teacher.option);
          newClass.perCourse = "";
          newClass.endCourse = "";
          this.tableData.push(newClass);
        }
      },
      //更改学生备注
      updateRemark(seq) {
        this.studentData[seq].remark = this.remark;
      },
      submitRemark() {
        this.isShowAlter = true;
        //console.log("修改成功")
        setTimeout(function () {
          this.isShowAlter = false;
          console.log("我改了" + this.isShowAlter);
        }, 2000);
      },
      changeTablePages(value) {
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
    },
    mounted() {
      //this.tableData = this.originalTableData;
      this.changeTablePages(0);
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
  .addwidth {
    width: 500px;
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
    width: 180px;
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
  .nav-pills>li.active>a,
  .nav-pills>li.active>a:focus,
  .nav-pills>li.active>a:hover {
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

  .inputerr {
    visibility: hidden;
    height: 10px;
    width: 100%;
  }

  /*修改成功弹出框*/
  .isshow {
    width: 30%;
    position: relative;
    margin: 20px auto;
  }

  .notshow {
    width: 40%;
    position: relative;
    margin: 20px auto;
    visibility: hidden;
  }
</style>