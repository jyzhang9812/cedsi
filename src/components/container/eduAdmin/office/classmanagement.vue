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
        <el-table-column type="index" label="序号" width="180"></el-table-column>
        <el-table-column :prop="title.prop" :label="title.label" width="230" v-for="(title,index) in tableTitle"
          :key="index"></el-table-column>
        <el-table-column prop label="操作">
          <el-button type="text" size="mini" data-toggle="modal" data-target="#checkStudent" @click="checkStudent(seq)">
            查看学生</el-button>
          <template slot-scope="scope">
            <el-button type="text" size="mini" data-target="#addClass" @click="updateClass(scope.$index)">编辑</el-button>
            <el-button type="text" size="mini" @click="addStudent = true">导入学生</el-button>
            
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
        title: "新增班级",
        addClass: false,
        form: {
          addClassName: "",
          currentCourse: "",
          courseList: [],
          currentTeacher: "",
          teacherList: [],
          classId: '',
          teacherValue: {},
          courseValue: {},
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
      //编辑或更改提交
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