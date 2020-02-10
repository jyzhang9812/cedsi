<template>
  <div id="classmanagement">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>教务管理</el-breadcrumb-item>
      <el-breadcrumb-item>班级管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="first-floor">
      <el-button type="primary" size="mini" @click="addClass = true">新增班级</el-button>
      <el-dialog :title="title" :visible.sync="addClass">
        <el-form :model="form" label-width="80px">
          <el-form-item label="班级名称">
            <el-input v-model="form.addClassName" maxlength="10" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="选择教师">
            <el-select @change="selevtGetTeacher" v-model="form.currentTeacher" placeholder="请选择教师">
              <el-option :label="item.name" :value="item.id" v-for="(item,index) in form.teacherList" :key="index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择课程">
            <el-select @change="selevtGetCourse" v-model="form.currentCourse" placeholder="请选择课程">
              <el-option :label="item.name" :value="item.id" v-for="(item,index) in form.courseList" :key="index">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addClass = false">取 消</el-button>
          <el-button type="primary" @click="submit()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="second-floor">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="180" align="center"></el-table-column>
        <el-table-column :prop="title.prop" :label="title.label" width="230" align="center"
          v-for="(title,index) in tableTitle" :key="index"></el-table-column>
        <el-table-column prop label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="updateClass(scope.$index)">编辑</el-button>
            <el-button type="text">
              查看学生</el-button>
            <el-button type="text" @click="addStudents(scope.$index)">导入学生</el-button>
            <el-dialog :visible.sync="addStudent">
              <el-row type="flex" :gutter="20">
                <!-- 搜索框 -->
                <el-col :span="10" style="margin-top: -5px;">
                  <el-input v-model="inputData.keywords" placeholder="请输入学生的姓名或学号或年级" size="small"></el-input>
                </el-col>
                <el-col :span="3" style="margin-top: -5px;">
                  <el-button type="primary" size="small" @click="conditionSearch">搜索</el-button>
                </el-col>
              </el-row>
              <!-- 表格区域 -->
              <el-table :data="currentList" ref="multipleTable" tooltip-effect="dark" height="350"  @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label="学号" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="gender" label="性别" align="center"></el-table-column>
                <el-table-column prop="age" label="年龄" align="center"></el-table-column>
                <el-table-column prop="phone" label="手机号" align="center" width="130px;"></el-table-column>
                <el-table-column prop="grade" label="年级" align="center"></el-table-column>
              </el-table>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addClass = false">取 消</el-button>
                <el-button type="primary" @click="submitStudent">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      </el-table>
    </div>
  </div>
</template>

<script>
  import instance from "../../../../axios-auth";
  import XLSX from "xlsx";

  export default {
    name: "classmanagement",
    data() {
      return {
        title: "新增班级",  //模态框标题
        addClass: false,   //新增班级模态框
        addStudent: false,  //导入学生模态框
        form: {
          addClassName: "",
          currentCourse: "",
          courseList: [],
          currentTeacher: "",
          teacherList: [],
          classId: '',
          teacherValue: {},
          courseValue: {},
        },        //新增班级表单
        tableTitle: [
          {
            label: "班级名称",
            prop: "className"
          },
          {
            label: "教师",
            prop: "teacherName"
          },
          {
            label: "课程",
            prop: "courseName"
          }
        ],        //班级列表标题
        tableData: [],  //班级列表数据
        inputData: {
          keywords: ""
        },  //导入学生搜索框
        limit: 5,         //分页页数
        currentList:[], //学生列表
        allStudentList: [], //获取到的整个学生列表
        selectStudents:[],
      };
    },
    methods: {
      selevtGetCourse(val) {
        this.courseValue = this.form.courseList.find((item) => { return item.id = val; })
        console.log(this.courseValue);
      },
      selevtGetTeacher(val) {
        this.teacherValue = this.form.teacher.find((item) => { return item.id = val; })
        console.log(this.teacherValue);
      },
      updateClass(index) {
        this.title = "编辑班级";
        this.addClass = true;
        this.form = {
          addClassName: this.tableData[index].className,
          currentCourse: this.tableData[index].courseName,
          currentTeacher: this.tableData[index].teacherName,
          classId: this.tableData[index].classId
        }
      },
      //编辑或更改提交班级
      submit() {
        this.addClass = false;
        let token = window.localStorage.getItem("idToken");
        let newClass = {};
        console.log("提交")
        console.log(this.form);
        // console.log(this.index);
        //编辑提交
        if (this.title == "添加班级") {
          let updateClass = {
            courseId: this.form.courseValue.id,
            courseName: this.form.courseValue.name,
            teacherId: this.form.teacherValue.id,
            classId: this.form.classId
          }
          console.log(updateClass);
          const url = `/eduadmin/class/${updateClass.classId}/course`;
          const config = { headers: { Authorization: token } };
          instance
            .post(url, config)
            .then(response => {
              console.log(response);
            })
            .catch(err => {
              console.error(err);
            });
        } else {
          newClass = {
            courseId: this.form.courseValue.id,
            courseName: this.form.courseValue.name,
            teacherId: this.form.teacherValue.id,
            className: this.form.addClassName
          }
          console.log(newClass);
          const url = `/eduadmin/class`;
          const config = { headers: { Authorization: token } };
          instance
            .post(url, newClass)
            .then(response => {
              console.log(response);
              return instance.get("eduadmin/class", config);
            })
            .then(({ data }) => {
              console.log(data);
              this.tableData = data.map(item => {
                return {
                  classId: item.CLASS_ID,
                  className: item.CLASS_NAME,
                  teacherName: item.TEACHER_NAME,
                  courseId: item.COURSE_ID,
                  courseName: item.COURSE_NAME,
                  courseMemberCount: item.CLASS_MEMBER_COUNT
                };
              });
            })
            .catch(err => {
              console.error(err);
            });
        }
      },
      addStudents(index) {
        this.addStudent = true;
        this.currentList = this.allStudentList;
        this.form.classId = this.tableData[index].classId
      },
      //搜索学生
      conditionSearch() {
        let value = this.inputData.keywords;
        let tableList = this.allStudentList;
        if (value === "") return tableList;
        let restTableList = tableList.slice(0);
        for (let i = 0, j = restTableList.length; i < j; i++) {
          if (
            !new RegExp(value).test(restTableList[i]["name"]) &&
            !new RegExp(value).test(restTableList[i]["id"]) &&
            !new RegExp(value).test(restTableList[i]["grade"])
          ) {
            restTableList.splice(i, 1);
            j -= 1;
            i -= 1;
          }
        }
        this.currentList = restTableList;
      },
      //选择学生
      handleSelectionChange(val) {
        this.selectStudents = val;
        console.log(this.selectStudents)
      },
      submitStudent(){
        console.log(this.selectStudents)
        console.log(this.form.classId)
        this.addStudent = false;
      },
      getStudents() {
        let token = localStorage.getItem("idToken");
        const config = { headers: { Authorization: token } };
        instance
          .get("/eduadmin/student", config)
          .then(response => {
            let allStudent = response.data.data;
            console.log({ 学生数据: allStudent });
            this.allStudentList = allStudent.map(item => {
              let info = item.STUDENT_INFO;
              return {
                age: info.AGE,
                id: info.STUDENT_ID,
                phone: info.PHONE,
                grade: info.GRADE,
                name: info.STUDENT_NAME,
                gender: info.GENDER === "0" ? "女" : "男"
              };
            });
          })
          .catch(err => {
            console.error(err);
          });
      },
      getClasses() {
        let token = localStorage.getItem("idToken");
        const config = { headers: { Authorization: token } };
        instance
          .get("/eduadmin/class", config)
          .then(({ data }) => {
            console.log({ 班级数据: data });
            if (data.length) {
              this.tableData = data.map(item => {
                return {
                  classId: item.CLASS_ID,
                  className: item.CLASS_NAME,
                  teacherName: item.TEACHER_NAME,
                  teacherId: item.TEACHER_ID,
                  courseName: item.COURSE_NAME,
                  courseId: item.COURSE_ID,
                  courseMemberCount: item.CLASS_MEMBER_COUNT
                };
              });
            }
            return instance.get("/eduadmin/class/msg", config);
          })
          .then(({ data }) => {
            console.log({ 教师和课程: data });
            let teacherList = data.teacher;
            let courseList = data.course;
            this.form.teacherList = teacherList.map(item => {
              return {
                name: item.TEACHER_NAME,
                id: item.TEACHER_ID
              };
            });
            this.form.courseList = courseList.map(item => {
              return {
                name: item.COURSE_NAME,
                id: item.COURSE_ID
              };
            });
          })
          .catch(err => console.error(err));
      }
    },
    mounted() {
      this.getClasses();
      this.getStudents();
    }
  };

</script>
<style>
  #classmanagement {
    padding: 10px;
  }

  .first-floor {
    margin-top: 20px;
  }

  .second-floor {
    margin-top: 20px;
  }
</style>