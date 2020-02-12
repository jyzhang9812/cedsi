<template>
  <div id="classmanagement">
    <!-- 导入学生 -->
    <el-dialog :visible.sync="addStudent" width="70%" top="10vh" title="导入学生">
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
      <el-table
        :data="currentList"
        stripe
        row-key="id"
        tooltip-effect="dark"
        height="350"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          :prop="title.prop"
          :type="title.prop == 'userId'?'selection':''"
          :label="title.label"
          align="center"
          width="130px;"
          v-for="(title,index) in studentTitle"
          :key="index"
          :selectable="selectable"
        ></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addStudent = false">取 消</el-button>
        <el-button type="primary" @click="submitStudent">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看学生 -->
    <el-dialog :visible.sync="checkStudent" stripe width="70%" top="10vh" title="查看学生">
      <el-table :data="classStudentList" stripe height="350">
        <el-table-column
          :prop="title.prop"
          :type="title.prop == 'userId'?'index':''"
          :label="title.label"
          width="130px;"
          align="center"
          v-for="(title,index) in studentTitle"
          :key="index"
        ></el-table-column>
      </el-table>
    </el-dialog>
    <div class="first-floor">
      <el-button type="primary" size="small" @click="addClass = true">新增班级</el-button>
      <el-dialog :title="title" :visible.sync="addClass">
        <el-form :model="form" label-width="80px">
          <el-form-item label="班级名称">
            <el-input v-model="form.addClassName" maxlength="10" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="选择教师">
            <el-select @change="selevtGetTeacher" v-model="form.currentTeacher" placeholder="请选择教师">
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="(item,index) in form.teacherList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择课程">
            <el-select @change="selevtGetCourse" v-model="form.currentCourse" placeholder="请选择课程">
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="(item,index) in form.courseList"
                :key="index"
              ></el-option>
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
      <el-table :data="classList" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="180" align="center"></el-table-column>
        <el-table-column
          :prop="title.prop"
          :label="title.label"
          width="230"
          align="center"
          v-for="(title,index) in tableTitle"
          :key="index"
        ></el-table-column>
        <el-table-column prop label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="updateClass(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="checkStudents(scope.$index)">查看学生</el-button>
            <el-button type="text" size="small" @click="addStudents(scope.$index)">导入学生</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        :page-size="limit"
        background
        layout="prev, pager, next"
        :total="tableData.length"
        @current-change="handlePageChange"
        @prev-click="handlePageChange"
        @next-click="handlePageChange"
      ></el-pagination>
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
      limit: 5,
      title: "新增班级", //模态框标题
      addClass: false, //新增班级模态框
      addStudent: false, //导入学生模态框
      checkStudent: false, //查看学生模态框
      form: {
        addClassName: "",
        currentCourse: "",
        courseList: [],
        currentTeacher: "",
        teacherList: [],
        classId: "",
        teacherValue: {},
        courseValue: {}
      }, //新增班级表单
      tableTitle: [
        { label: "班级名称", prop: "className" },
        { label: "教师", prop: "teacherName" },
        { label: "课程", prop: "courseName" }
      ], //班级列表标题
      studentTitle: [
        { prop: "userId" },
        { label: "学号", prop: "id" },
        { label: "姓名", prop: "name" },
        { label: "性别", prop: "gender" },
        { label: "年龄", prop: "age" },
        { label: "手机号", prop: "phone" },
        { label: "年级", prop: "grade" }
      ], //学生列表标题
      tableData: [], //班级总列表数据
      classList: [], //班级列表
      inputData: {
        keywords: ""
      }, //导入学生搜索框
      currentList: [], //导入学生列表
      classStudentList: [], //班级学生列表
      allStudentList: [] //获取到的整个学生列表
    };
  },
  methods: {
    handlePageChange(pageIndex) {
      let start = (pageIndex - 1) * this.limit;
      let end = start + this.limit;
      this.classList = this.tableData.slice(start, end);
    },
    selevtGetCourse(val) {
      this.courseValue = this.form.courseList.find(item => {
        return (item.id = val);
      });
      console.log(this.courseValue);
    },
    selevtGetTeacher(val) {
      this.teacherValue = this.form.teacher.find(item => {
        return (item.id = val);
      });
      console.log(this.teacherValue);
    },
    updateClass(index) {
      console.log(index);
      this.title = "编辑班级";
      this.addClass = true;
      this.form = {
        addClassName: this.tableData[index].className,
        currentCourse: this.tableData[index].courseName,
        currentTeacher: this.tableData[index].teacherName,
        classId: this.tableData[index].classId
      };
    },
    //编辑或更改提交班级
    submit() {
      this.addClass = false;
      let token = window.localStorage.getItem("idToken");
      let newClass = {};
      console.log("提交");
      console.log(this.form);
      // console.log(this.index);
      //编辑提交
      if (this.title == "添加班级") {
        let updateClass = {
          courseId: this.form.courseValue.id,
          courseName: this.form.courseValue.name,
          teacherId: this.form.teacherValue.id,
          classId: this.form.classId
        };
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
        };
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
    //查看学生
    checkStudents(index) {
      this.checkStudent = true;
      this.getclassStudent(this.tableData[index].classId);
    },
    //导入学生
    addStudents(index) {
      this.addStudent = true;
      this.currentList = this.allStudentList;
      this.form.classId = this.tableData[index].classId;
      this.getclassStudent(this.form.classId);
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
      this.selectStudents = val.map(item => {
        return item.userId;
      });
      console.log(this.selectStudents);
    },
    selectable(row, index) {
      let func = item => item.userId === row.userId;
      return !this.classStudentList.some(func);
    },
    //提交班级学生
    submitStudent() {
      console.log(this.selectStudents);
      console.log(this.form.classId);
      let classStudent = {
        studentData: this.selectStudents,
        class_id: this.form.classId
      };
      let token = window.localStorage.getItem("idToken");
      const url = `/eduadmin/class/${classStudent.class_id}/students`;
      const config = { headers: { Authorization: token } };
      instance
        .post(url, classStudent, config)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.error(err);
        });
      this.studentList = this.selectStudents;
      this.addStudent = false;
    },
    getclassStudent(classId) {
      let token = localStorage.getItem("idToken");
      let url = `/eduadmin/class/${classId}/students`;
      const config = { headers: { Authorization: token } };
      instance
        .get(url, config, { class_id: classId })
        .then(response => {
          console.log(response);
          let classStudent = response.data.students;
          console.log({ 班级学生数据: classStudent });
          this.classStudentList = classStudent.map(item => {
            let info = item.STUDENT_INFO;
            return {
              userId: item.USER_ID,
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
              userId: item.USER_ID,
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
            this.handlePageChange(1);
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
  margin: 0 20px 20px 20px;
}

.second-floor {
  margin-top: 20px;
}

el-dialog {
  width: 1000px;
}

.pagination {
  margin-top: 20px;
}
</style>