<template>
  <div id="classmanagement">
    <el-form :model="form" label-width="80px">
      <el-form-item label="班级名称">
        <el-input v-model="addClassName" maxlength="10" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="选择教师">
        <el-select v-model="form.currentTeacher" placeholder="请选择教师">
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item,index) in form.teacherList"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择课程">
        <el-select v-model="form.currentCourse" placeholder="请选择课程">
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item,index) in form.courseList"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>教务管理</el-breadcrumb-item>
      <el-breadcrumb-item>班级管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="first-floor">
      <el-button
        type="primary"
        size="small"
        data-toggle="modal"
        data-target="#addClass"
        @click="addClass()"
      >新增班级</el-button>
    </div>
    <div class="second-floor">
      <el-table :data="currentList" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="180"></el-table-column>
        <el-table-column
          :prop="title.prop"
          :label="title.label"
          width="230"
          v-for="(title,index) in tableTitle"
          :key="index"
        ></el-table-column>
        <el-table-column prop label="操作">
          <el-button
            type="text"
            size="mini"
            data-toggle="modal"
            data-target="#checkStudent"
            @click="checkStudent(seq)"
          >查看学生</el-button>
          <el-button type="text" size="mini" data-target="#addClass" @click="updateClass(seq)">编辑</el-button>
          <el-button type="text" size="mini" @click="addStudent(seq)">导入学生</el-button>
        </el-table-column>
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
      limit: 10,
      className: "",
      form: {
        currentCourse: "",
        courseList: [],
        currentTeacher: "",
        teacherList: []
      },
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
      ],
      tableData: [],
      studentData: [],
      addClassName: "",
      isName: true,
      index: -1,
      currentList: [],
      isChange: false, //班级名称是否可修改
      modalTitle: "", //模态框名称
      studentNum: 0
    };
  },
  methods: {
    checkStudent(seq) {
      this.index = this.currentPage * this.limit + seq;
      let token = window.localStorage.getItem("idToken");
      let classId = this.tableData[this.index].classId;
      const url = `/eduadmin/class/${classId}/students`;
      const config = { headers: { Authorization: token } };
      instance
        .get(url, config)
        .then(response => {
          console.log(response);
          let studentData = [];
          if (response.data != null) {
            let studentList = response.data.Items;
            this.studentNum = response.data.Count;
            for (let i = 0; i < studentList.length; i++) {
              let student = {};
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
        })
        .catch(err => {
          console.error(err);
        });
    },
    addStudent(seq) {
      this.index = this.currentPage * this.limit + seq;
      let classId = this.tableData[this.index].classId;
      this.$router.push({
        path: "/eduAdmin/classManagement/" + classId + "/addStudent"
      });
    },
    updateClass(seq) {
      this.modalTitle = "编辑";
      this.isChange = true;
      this.index = this.currentPage * this.limit + seq;
      this.addClassName = this.tableData[this.index].className;
      let teacher = {};
      teacher.name = this.tableData[this.index].teacherName;
      teacher.id = this.tableData[this.index].teacherId;
      let course = {};
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
      let that = this;
      let token = window.localStorage.getItem("idToken");
      let newClass = {};
      console.log(this.index);
      //编辑提交
      if (this.index >= 0) {
        let updateClass = {};
        updateClass.courseId = this.addClassData.course.option.id;
        updateClass.courseName = this.addClassData.course.option.name;
        updateClass.teacherId = this.addClassData.teacher.option.id;
        updateClass.classId = this.tableData[this.index].classId;
        console.log(updateClass);
        const url = `/eduadmin/class/${updateClass.classId}/course`;
        const config = { headers: { Authorization: token } };
        instance
          .post(url, config)
          .then(response => {
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
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        newClass.className = this.addClassName;
        newClass.teacherId = this.addClassData.teacher.option.id;
        newClass.courseId = this.addClassData.course.option.id;
        newClass.courseName = this.addClassData.course.option.name;
        console.log(newClass);
        const config = { headers: { Authorization: token } };
        instance
          .post("eduadmin/class", newClass)
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
    }
  },
  mounted() {
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
};
</script>

<style scoped>
</style>