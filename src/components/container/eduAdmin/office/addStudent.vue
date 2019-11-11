<template>
  <div id="addStudent">
    <div class="classroute">
      <ol class="breadcrumb">
        <li>学生名单</li>
      </ol>
    </div>
    <div class="second-floor">
      <table class="table table-hover">
        <thead>
          <tr>
            <th v-for="(title,index) in tableTitle" class="title" :key="index">{{title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, seq) in tableData" :key="seq" class="content">
            <td>
              <input type="checkbox" v-model="checkedId" :value="student" />
            </td>
            <td>{{student.studentId}}</td>
            <td>{{student.studentName}}</td>
            <td>{{student.gender}}</td>
            <td>{{student.age}}</td>
            <td>{{student.grade}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination :num="tableData.length" @getNew="changeTablePages" :limit="limit"></pagination>
    <div class="upload-footer">
      <button class="btn upload-btn" :disabled="isChecked" @click="submit()">确定</button>
      <button class="btn upload-btn" @click="cancel">取消</button>
    </div>
  </div>
</template>

<script>
import pagination from "../../teacher/utils/pagination.vue";
import SelectInput from "../../Admin/utils/selectInput.vue";
import globalAxios from "axios";
import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";

export default {
  name: "adminManagement",
  components: { pagination, SelectInput },
  data() {
    return {
      addClassName: "",
      isName: true,
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
      limit: 20,
      currentList: [],
      inputData: {
        studentanizationUserName: ""
      },
      tableTitle: ["选择", "学号", "姓名", "性别", "年龄", "年级"],
      tableData: [], //页面表格内容
      //当前页码
      currentPage: 0,
      index: 0,
      checkedId: [],
      checkedStudent: [],
      isChecked: true
    };
  },
  watch: {
    checkedId(val, oldVal) {
      this.checkedStudent = val;
      if (val.length == 0) this.isChecked = true;
      else this.isChecked = false;
    }
  },
  methods: {
    cancel() {
      this.$router.push({
        path: "/eduAdmin/classManagement"
      });
    },
    //换页
    changeTablePages(value) {
      //console.log(value)
      var currentPage = value / this.limit;
      this.currentPage = currentPage;
      //console.log(currentPage)
      this.currentList = this.tableData.slice(value, value + this.limit);
    },
    getNew(value) {
      this.currentList = this.tableData.slice(value, value + this.limit);
      //console.log(this.currentList)
    },
    submit() {
      var that = this
      var postStudent = {};
      postStudent.studentData = this.checkedId;
      console.log(postStudent);
      var token = window.localStorage.getItem("idToken");
      globalAxios
        .post(
          "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/eduadmin/class/" +
            this.classId +
            "/students",
          postStudent,
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
            this.$toast.success({ title: "学生管理", message: "操作成功" });
            setTimeout(function() {
              that.$router.push({ path: "/eduAdmin/classManagement/" });
            }, 1000);
          },
          error => {
            console.log(error);
          }
        );
    }
  },
  mounted() {
    this.changeTablePages(0);
  },
  created() {
    this.classId = this.$route.params.classId;
    console.log(this.classId);
    var token = window.localStorage.getItem("idToken");
    globalAxios
      .get(
        "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/eduadmin/class/" +
          this.classId,
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
          var studentList = [];
          var studentArr = [];
          studentList = response.data.data;
          for (var i = 0; i < studentList.length; i++) {
            var student = {};
            student.studentName = studentList[i].STUDENT_NAME;
            student.studentId = studentList[i].STUDENT_ID;
            student.grade = studentList[i].GRADE;
            student.age = studentList[i].AGE;
            student.avatar = studentList[i].AVATAR;
            student.mobile = studentList[i].MOBILE_PHONE;
            student.orgId = studentList[i].ORG_ID;
            student.userId = studentList[i].USER_ID;
            if (studentList[i].GENDER == "0") student.gender = "女";
            else student.gender = "男";
            studentArr.push(student);
          }
          this.tableData = studentArr;
          this.changeTablePages(0);
        },
        error => {
          console.log(error);
        }
      );
  }
};
</script>

<style scoped>
#addStudent .breadcrumb {
  background-color: #fff;
  color: #606266;
  margin-bottom: 0;
}
#addStudent {
  font-size: 12px;
  color: #606266;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
}

#addStudent .first-floor {
  margin-top: 20px;
}
#addStudent .second-floor {
  font-size: 12px;
  color: #606266;
  margin-top: 20px;
}
#addStudent .select-input {
  display: inline-block;
}
#addStudent label {
  display: inline;
}

#addStudent .content td {
  line-height: 30px;
}

#addStudent .textBox {
  width: 180px;
  height: 32px;
  font-size: 12px;
  padding-left: 15px;
  border: 1px solid #409eff;
  border-radius: 5px;
  margin-left: 5px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#addStudent .textBox:focus {
  outline: none;
}

#addStudent .textBox:hover {
  border-color: #409eff;
}

/* .choose 此项真实有效， 可能编辑器不完全识别vue语法*/

#addStudent .btn {
  background: #409eff;
  color: #fff;
  height: 30px;
  border-radius: 5px;
  font-size: 12px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#addStudent .btn:focus {
  outline: none;
}

#addStudent .btn:hover {
  background: #66b1ff;
}

#addStudent .btn-search {
  width: 54px;
}

#addStudent .btn-clear {
  width: 88px;
}

#addStudent .blue {
  cursor: pointer;
  color: #409eff;
}

#addStudent .red {
  cursor: pointer;
  color: red;
}

#addStudent table {
  border: #eeeeee;
}

#addStudent table tr {
  text-align: center !important;
}

#addStudent table td {
  vertical-align: middle !important;
}

#addStudent .title {
  text-align: center;
}

#addStudent .select-input {
  margin-right: 8px;
}

#addStudent .btnactive {
  border-radius: 5px;
  line-height: 20px;
  height: 22px;
}
#addStudent .btnactive:focus {
  outline: none;
}

/*添加教师模态框*/

#addStudent .modal-dialog {
  top: 100px;
  position: relative;
}

#addStudent .modal-header {
  background-color: #409eff;
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
#addStudent .add {
  width: 100%;
}

#addStudent .keypoint {
  color: red;
}
#addStudent .keypointwhite {
  color: #fff;
}
#addStudent .addtitle {
  color: #606266;
  display: inline-block;
  width: 50px;
}

#addStudent .addcon {
  width: 180px;
  border: 1px solid #409eff;
  border-radius: 5px;
  height: 32px;
  line-height: 32px;
  margin-left: 5px;
  padding: 0 20px;
}

#addStudent .addcon:hover {
  border: 1px solid #dcdfe6;
}

#addStudent .addcon:focus {
  outline: none;
}

#addStudent .content {
  margin: 0 auto;
  width: 60%;
  height: 100%;
}
#addStudent .modal-footer {
  border: none;
  text-align: center;
}
#addStudent .modal-select-input {
  display: inline-block;
  margin-left: 5px;
}
#addStudent .inputBox {
  padding: 0;
}
#addStudent .dropdown {
  margin-left: 20px;
}
#addStudent #school .outside {
  width: 300px !important;
  height: 40px !important;
  margin-left: 10px !important;
}
/*正则表达式*/
#addStudent .err {
  border: 1px solid red;
}
#addStudent .inputtips {
  display: block;
  font-size: 10px;
  color: red;
  margin-left: 110px;
  margin-bottom: 5px;
  margin-top: 5px;
}
#addStudent .inputerr {
  display: block;
  font-size: 10px;
  color: red;
  margin-left: 60px;
  visibility: hidden;
  height: 20px;
  margin-bottom: 10px;
}
#addStudent .alterwidth {
  width: 30%;
}
#addStudent .altercontent {
  width: 300px;
  margin: 0 auto;
}
#addStudent .alterimg {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
#addStudent .upload-footer {
  width: 100%;
  text-align: center;
}
#addStudent .upload-btn {
  background-color: #409eff;
  color: #fff;
  margin-left: 10px;
}
#addStudent .modal-select-input {
  display: inline-block;
  margin-left: 5px;
}
#addStudent .modal-dialog {
  top: 100px;
  position: relative;
}
#addStudent .modal-header {
  background-color: #409eff;
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
#addStudent .addwidth {
  width: 500px;
}
</style>
