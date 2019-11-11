<template>
  <div id="teacherManagement">
    <!-- 添加教师模态框（Modal） -->
    <div
      class="modal fade"
      id="addTeacher"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">新增教师</h4>
          </div>
          <div class="modal-body">
            <div class="content">
              <div class="add">
                <span class="keypoint">*</span>
                <span class="addtitle">姓名</span>
                <input
                  :class="isName==false?'addcon':'addcon err'"
                  placeholder="请输入教师姓名"
                  v-model="teacherName"
                />
              </div>
              <span :class="isName==true?'inputtips':'inputerr'">不超过10个字符</span>
              <div class="add">
                <span class="keypoint">*</span>
                <span class="addtitle">账号</span>
                <input
                  :class="isAccount==false?'addcon':'addcon err'"
                  placeholder="请输入教师工号"
                  v-model="teacherJobNum"
                />
              </div>
              <span :class="isAccount==true?'inputtips':'inputerr'">不超过15个字符</span>
              <div class="add">
                <span class="keypoint">*</span>
                <span class="addtitle">密码</span>
                <input
                  type="password"
                  :class="isPassword==false?'addcon':'addcon err'"
                  placeholder="请输入密码"
                  v-model="teacherPassword"
                />
              </div>
              <span :class="isPassword==true?'inputtips':'inputerr'">不超过20个字符</span>
              <div class="add">
                <span class="keypoint">*</span>
                <label class="addtitle">性别</label>
                <div class="sexradio">
                  <input
                    type="radio"
                    name="sex"
                    value="1"
                    checked="checked"
                    class="sexradio1"
                    v-model="teacherSex"
                  />
                  <span class="sexname">男</span>
                  <input type="radio" name="sex" value="0" class="sexradio1" v-model="teacherSex" />
                  <span class="sexname">女</span>
                </div>
              </div>
              <span class="inputerr"></span>
              <div class="add">
                <span class="keypointwhite">*</span>
                <span class="addtitle">简介</span>
                <textarea
                  class="teacher-textarea"
                  rows="8"
                  cols="70"
                  placeholder="请输入简介"
                  v-model="teacherIntro"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="submit()" data-dismiss="modal">确定</button>
          </div>
        </div>
      </div>
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
        <li>教师管理</li>
      </ol>
    </div>
    <div class="first-floor">
      <button
        class="btn btn-clear"
        data-toggle="modal"
        data-target="#addTeacher"
        @click="addTeacher()"
      >新增教师</button>
    </div>
    <div class="second-floor">
      <table class="table table-hover">
        <thead>
          <tr>
            <th v-for="(title,index) in tableTitle" class="title" :key="index">{{title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(teacher, seq) in currentList" :key="seq" class="content">
            <td>{{seq+1}}</td>
            <td>{{teacher.teacherJobNum}}</td>
            <td>{{teacher.teacherName}}</td>
            <td>{{teacher.gender}}</td>
            <td style="width:250px;">{{teacher.introduction}}</td>
            <td>
              <span
                class="red"
                data-toggle="modal"
                data-target="#alterModal"
                @click="deleteTeacher(seq)"
              >删除</span>
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
import globalAxios from "axios";
import crypto from "crypto";
export default {
  name: "classmanagement",
  components: { SelectInput, pagination },
  data() {
    return {
      limit: 10,
      currentList: [],
      inputData: {
        teacherName: ""
      },
      tableTitle: ["序号", "账号", "姓名", "性别", "简介", "操作"],
      tableData: [],
      //新增教师
      teacherName: "",
      isName: true,
      teacherJobNum: "",
      isAccount: true,
      teacherPassword: "",
      isPassword: true,
      teacherIntro: "",
      //提示框
      alterimg: this.$store.state.url + "eduAdmin/alter.png",
      alterMes: "",
      index: -1,
      teacherSex: [],
      currentPage: 0
    };
  },
  watch: {
    teacherName(val, oldVal) {
      if (val.length <= 10 && val.length > 0) {
        this.isName = false;
      } else {
        this.isName = true;
      }
    },
    teacherJobNum(val, oldVal) {
      if (val.length <= 15 && val.length > 0) {
        this.isAccount = false;
      } else {
        this.isAccount = true;
      }
    },
    teacherPassword(val, oldVal) {
      if (val.length <= 20 && val.length > 0) {
        this.isPassword = false;
      } else {
        this.isPassword = true;
      }
    }
  },
  methods: {
    deleteTeacher(seq) {
      this.index = this.currentPage * this.limit + seq;
      this.alterMes = "确认删除吗？";
    },
    submitDelete() {
      console.log(this.tableData[this.index].teacherId);
      var teacherId = this.tableData[this.index].teacherId;
      var token = window.localStorage.getItem("idToken");
      globalAxios
        .delete(
          "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/eduadmin/teacher?teacherId=" +
            teacherId,
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
            this.tableData.splice(this.index, 1);
            this.changeTablePages(this.currentPage * this.limit);
          },
          error => {
            // this.$router.push({path:'/404'})
            console.log(error);
          }
        );
    },
    addTeacher() {
      this.teacherName = "";
      this.teacherJobNum = "";
      this.teacherPassword = "";
    },
    changeTablePages(value) {
      var currentPage = value / this.limit;
      this.currentPage = currentPage;
      this.currentList = this.tableData.slice(value, value + this.limit);
    },
    //确定增加教师
    submit() {
      var that = this;
      var teacher = {};
      teacher.teacherName = this.teacherName;
      teacher.teacherId = this.teacherJobNum;
      teacher.password = crypto
        .createHash("SHA256")
        .update(this.teacherPassword)
        .digest("hex");
      teacher.gender = this.teacherSex;
      teacher.introduction = this.teacherIntro;
      console.log(teacher);
      var token = window.localStorage.getItem("idToken");
      globalAxios
        .post(
          "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/eduadmin/teacher",
          teacher,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            }
          }
        )
        .then(
          response => {
            that.getTeacherList();
          },
          error => {
            // this.$router.push({path:'/404'})
            console.log(error);
          }
        );
    },
    getTeacherList() {
      //获取教师列表
      var token = window.localStorage.getItem("idToken");
      globalAxios
        .get(
          "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/eduadmin/teacher",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            }
          }
        )
        .then(
          response => {
            //console.log(response);
            var teacherArr = [];
            if (response.data != null) {
              var teacherList = response.data;
              console.log(teacherList);
              for (var i = 0; i < teacherList.length; i++) {
                var teacher = {};
                teacher.teacherId = teacherList[i].TEACHER_ID;
                teacher.teacherName = teacherList[i].TEACHER_NAME;
                if (teacherList[i].GENDER == "1") teacher.gender = "男";
                else teacher.gender = "女";
                teacher.teacherJobNum = teacherList[i].JOB_NUMBER;
                teacher.introduction = teacherList[i].INTRO;
                teacherArr.push(teacher);
              }
            }
            this.tableData = teacherArr;
            this.changeTablePages(0);
          },
          error => {
            // this.$router.push({path:'/404'})
            console.log(error);
          }
        );
    }
  },
  mounted() {
    this.getTeacherList();
  }
};
</script>

<style scoped>
#teacherManagement .breadcrumb {
  background-color: #fff;
  color: #606266;
  margin-bottom: 0;
}
#teacherManagement {
  font-size: 12px;
  color: #606266;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
}

#teacherManagement .first-floor {
  margin-top: 20px;
}
#teacherManagement .second-floor {
  font-size: 12px;
  color: #606266;
  margin-top: 20px;
}
#teacherManagement .select-input {
  display: inline-block;
}
#teacherManagement label {
  display: inline;
}

#teacherManagement .content td {
  line-height: 30px;
}

#teacherManagement .textBox {
  width: 180px;
  height: 32px;
  font-size: 12px;
  padding-left: 15px;
  border: 1px solid #409eff;
  border-radius: 5px;
  margin-left: 5px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#teacherManagement .textBox:focus {
  outline: none;
}

#teacherManagement .textBox:hover {
  border-color: #409eff;
}

#teacherManagement .btn {
  background: #409eff;
  color: #fff;
  height: 30px;
  border-radius: 5px;
  font-size: 12px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#teacherManagement .btn:focus {
  outline: none;
}

#teacherManagement .btn:hover {
  background: #66b1ff;
}

#teacherManagement .btn-search {
  width: 54px;
}

#teacherManagement .btn-clear {
  width: 78px;
}

#teacherManagement .blue {
  cursor: pointer;
  color: #409eff;
}

#teacherManagement .red {
  cursor: pointer;
  color: red;
}

#teacherManagement table {
  border: #eeeeee;
}

#teacherManagement table tr {
  text-align: center !important;
}

#teacherManagement table td {
  vertical-align: middle !important;
}

#teacherManagement .title {
  text-align: center;
}

#teacherManagement .select-input {
  margin-right: 8px;
}

#teacherManagement .btnactive {
  border-radius: 5px;
  line-height: 20px;
  height: 22px;
}
#teacherManagement .btnactive:focus {
  outline: none;
}

/*添加教师模态框*/

#teacherManagement .modal-dialog {
  top: 100px;
  position: relative;
}

#teacherManagement .modal-header {
  background-color: #409eff;
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
#teacherManagement .add {
  width: 100%;
}

#teacherManagement .keypoint {
  color: red;
}
#teacherManagement .keypointwhite {
  color: #fff;
}
#teacherManagement .addtitle {
  color: #606266;
  display: block;
  float: left;
  line-height: 35px;
  margin-right: 5px;
}

#teacherManagement .addcon {
  width: 75%;
  border: 1px solid #409eff;
  border-radius: 5px;
  height: 32px;
  line-height: 32px;
  margin-left: 20px;
  padding: 0 20px;
}
#teacherManagement .addcon:hover {
  border: 1px solid #dcdfe6;
}
#teacherManagement .addcon:focus {
  outline: none;
}

#teacherManagement .content {
  margin: 0 auto;
  width: 60%;
  height: 100%;
}
#teacherManagement .modal-footer {
  border: none;
  text-align: center;
}
#teacherManagement .modal-select-input {
  display: inline-block;
  margin-left: 5px;
}
#teacherManagement .inputBox {
  padding: 0;
}
/*正则表达式*/
#teacherManagement .err {
  border: 1px solid red;
}
#teacherManagement .inputtips {
  display: block;
  font-size: 10px;
  color: red;
  margin-left: 60px;
  margin-bottom: 10px;
}
#teacherManagement .inputerr {
  display: block;
  font-size: 10px;
  color: red;
  margin-left: 60px;
  visibility: hidden;
  height: 20px;
  margin-bottom: 10px;
}
#teacherManagement .alterwidth {
  width: 30%;
}
#teacherManagement .altercontent {
  width: 300px;
  margin: 0 auto;
}
#teacherManagement .alterimg {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
#teacherManagement .sexradio {
  width: 180px;
  margin-left: 10px;
  display: inline-block;
  height: 33px;
  padding-left: 30px;
  line-height: 33px;
}
#teacherManagement .sexradio1 {
  margin-right: 10px;
}
#teacherManagement .sexname {
  display: inline-block;
  margin-right: 10px;
}
#teacherManagement .teacher-textarea {
  width: 260px;
  height: 100px;
  margin-left: 20px;
  border: 1px solid #409eff;
  border-radius: 5px;
  padding-left: 20px;
}
</style>
