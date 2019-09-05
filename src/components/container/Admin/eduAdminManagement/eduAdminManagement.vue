<template>
  <div id="eduAdminManagement">
    <!-- 添加教务模态框（Modal） -->
    <div
      class="modal fade"
      id="addEduAdmin"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">新增教务</h4>
          </div>
          <div class="modal-body">
            <div class="content">
              <div class="add">
                <span class="keypoint">*</span>
                <span class="addtitle">账号</span>
                <input
                  :class="isUserName==false?'addcon':'addcon err'"
                  placeholder="请输入教务账号"
                  v-model="eduAdminUserName"
                />
              </div>
              <span :class="isUserName==true?'inputtips':'inputerr'">不超过15个字符</span>
              <div class="add">
                <span class="keypoint">*</span>
                <span class="addtitle">密码</span>
                <input
                  :class="isPassword==false?'addcon':'addcon err'"
                  placeholder="请输入密码"
                  v-model="eduAdminPassword"
                />
              </div>
              <span :class="isPassword==true?'inputtips':'inputerr'">不超过20个字符</span>
              <div class="add">
                <span class="keypoint">*</span>
                <span class="addtitle">所属学校</span>
                <select-input
                  class="modal-select-input"
                  id="school"
                  tips="请选择学校"
                  :option="inputData.school.option" 
                  :dropDownList="inputData.school.list"
                  @option="changeOption"
                ></select-input>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submit()">确定</button>
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
      </ol>
    </div>
    <div class="first-floor">
      <label for="class-name"></label>
      <input
        type="text"
        placeholder="请输入教务账号"
        class="textBox"
        id="class-name"
        v-model="inputData.adminUserName"
      />
      <button class="btn btn-search">搜索</button>
      <button
        class="btn btn-clear"
        data-toggle="modal"
        data-target="#addEduAdmin"
        @click="addEduAdmin()"
      >新增教务</button>
    </div>
    <div class="second-floor">
      <table class="table table-hover">
        <thead>
          <tr>
            <th v-for="(title,index) in tableTitle" class="title" :key="index">{{title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(eduadmin, seq) in currentList" :key="seq" class="content">
            <td>{{seq+1}}</td>
            <td>{{eduadmin.username}}</td>
            <td>{{eduadmin.character}}</td>
            <td>
              <button
                :class="eduadmin.status==='启用'?'btnactive btn-success':'btnactive btn-warning'"
                @click="changeEduAdminStatus(seq)"
              >{{eduadmin.status}}</button>
            </td>
            <td>
              <span
                class="red"
                data-toggle="modal"
                data-target="#alterModal"
                @click="deleteAdmin(seq)"
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
import globalAxios from "axios";
import SelectInput from "../../teacher/utils/selectInput";
export default {
  name: "adminManagement",
  components: { pagination,SelectInput },
  data() {
    return {
      limit: 20,
      currentList: [],
      inputData: {
        eduAdminUserName: ""
      },
      tableTitle: ["序号", "账号", "所属学校", "状态", "操作"],
      tableData: [
        {
        account:"xxx",
        character:"lll",
        status:"启用"
      },
              {
        account:"xxx",
        character:"lll",
        status:"启用"
      },
              {
        account:"xxx",
        character:"lll",
        status:"启用"
      },
              {
        account:"xxx",
        character:"lll",
        status:"启用"
      },
              {
        account:"xxx",
        character:"lll",
        status:"启用"
      },

              {
        account:"xxx",
        character:"lll",
        status:"启用"
      },
              {
        account:"xxx",
        character:"lll",
        status:"启用"
      },
              {
        account:"xxx",
        character:"lll",
        status:"启用"
      },
              {
        account:"xxx",
        character:"lll",
        status:"启用"
      },
              {
        account:"xxx",
        character:"lll",
        status:"启用"
      },
              {
        account:"xxx",
        character:"lll",
        status:"启用"
      },
              {
        account:"xxx",
        character:"lll",
        status:"启用"
      },
              {
        account:"xxx",
        character:"lll",
        status:"启用"
      },
              {
        account:"xxx",
        character:"lll",
        status:"启用"
      },
              {
        account:"xxx",
        character:"lll",
        status:"启用"
      },
              {
        account:"xxx",
        character:"lll",
        status:"启用"
      },

      ], //页面表格内容
      //新增管理员
      eduAdminUserName: "",
      isUserName: true,
      eduAdminPassword: "",
      isPassword: true,
      //提示框
      alterimg: this.$store.state.url + "eduAdmin/alter.png",
      alterMes: "",
      //当前页码
      currentPage: 0,
      index: 0,
        inputData: {
          school: {
            option: "赛迪思",
            list: ["赛迪思", "雁塔路小学", "翠华路小学", "回民街小学"]
          }
        },
    };
  },
  watch: {
    eduAdminUserName(val, oldVal) {
      if (val.length <= 15 && val.length > 0) {
        this.isUserName = false;
      } else {
        this.isUserName = true;
      }
    },
    eduAdminPassword(val, oldVal) {
      if (val.length <= 20 && val.length > 0) {
        this.isPassword = false;
      } else {
        this.isPassword = true;
      }
    }
  },
  methods: {
      changeOption(item, id) {
        Object.keys(this.inputData).forEach((res) => {
          if (res === id) {
            this.inputData[res].option = item;
          }
        });
      },
    changeEduAdminStatus(seq) {
      this.index = this.currentPage * this.limit + seq;
      //console.log(this.index,this.currentPage)
      if (this.tableData[this.index].status == "启用") {
        this.tableData[this.index].status = "禁用";
      } else {
        this.tableData[this.index].status = "启用";
      }
      var updateEduAdmin = this.tableData[this.index];
      console.log(updateEduAdmin);
      var token = window.localStorage.getItem("idToken");
      console.log(token);
      globalAxios
        .put(
          "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/superadmin/admin",
          { userId: updateEduAdmin.id },
          {
            "Content-Type": "application/json",
            Authorization: token
          }
        )
        .then(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
    },
    deleteEduAdmin(seq) {
      this.index = this.currentPage * this.limit + seq;
      console.log(this.index);
      this.alterMes = "确认删除吗？";
    },
    submitDelete() {
      var deleteEduAdmin = this.tableData[this.index];
      console.log(deleteEduAdmin);
      var token = window.localStorage.getItem("idToken");
      console.log(token);
      this.$http
        .delete(
          "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/superadmin/admin",
          { userId: deleteEduAdmin.id },
          {
            "Content-Type": "application/json",
            Authorization: token
          }
        )
        .then(
          response => {
            console.log(response);
            this.tableData.splice(this.index, 1);
          },
          error => {
            console.log(error);
          }
        );
      this.getNew(this.currentPage * this.limit);
    },
    addEduAdmin() {
      this.eduAdminUserName = "";
      this.eduAdminPassword = "";
    },
    //提交
    submit() {
      var newEduAdmin = {};
      newEduAdmin.username = this.eduAdminUserName;
      newEduAdmin.character = "管理员";
      newEduAdmin.status = "启用";
      //console.log(newAdmin);
      var data = { username: this.eduAdminUserName, password: this.eduAdminPassword };
      //console.log(data);
      var token = window.localStorage.getItem("idToken");
      console.log(token);
      this.$http
        .post(
          "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/superadmin/admin",
          { username: this.eduAdminUserName, password: this.eduAdminPassword },
          {
            "Content-Type": "application/json",
            Authorization: token
          }
        )
        .then(
          response => {
            //console.log(response);
            this.tableData.splice(0, 0, newEduAdmin);
            this.getNew(this.currentPage * this.limit);
          },
          error => {
            console.log(error);
          }
        );
      //console.log(this.currentPage*this.limit)
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
    }
  },
  // created() {
  //   var token = window.localStorage.getItem("idToken");
  //   globalAxios
  //     .get(
  //       "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/superadmin/admin",
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: token
  //         }
  //       }
  //     )
  //     .then(
  //       response => {
  //         //console.log(response.data.data);
  //         var eduadmin_arr = response.data.data;
  //         var eduadmin_table = [];
  //         for (var i = 0; i < eduadmin_arr.length; i++) {
  //           var eduadmin = {};
  //           eduadmin.username = eduadmin_arr[i].USER_NAME;
  //           eduadmin.id = eduadmin_arr[i].USER_ID;
  //           if (eduadmin_arr[i].USER_STATUS == "active") eduadmin.status = "启用";
  //           else eduadmin.status = "禁用";
  //           eduadmin.character = "管理员";
  //           //console.log(admin)
  //           eduadmin_table.push(eduadmin);
  //         }
  //         //console.log(admin_table)
  //         // return response.json();
  //         this.tableData = eduadmin_table;
  //         this.getNew(0);
  //         //console.log(this.tableData)
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // },
  mounted() {
    //this.tableData = this.originalTableData;
    this.changeTablePages(0);
  }
};
</script>

<style scoped>
#eduAdminManagement .breadcrumb {
  background-color: #fff;
  color: #606266;
  margin-bottom: 0;
}
#eduAdminManagement {
  font-size: 12px;
  color: #606266;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
}

#eduAdminManagement .first-floor {
  margin-top: 20px;
}
#eduAdminManagement .second-floor {
  font-size: 12px;
  color: #606266;
  margin-top: 20px;
}
#eduAdminManagement .select-input {
  display: inline-block;
}
#eduAdminManagement label {
  display: inline;
}

#eduAdminManagement .content td {
  line-height: 30px;
}

#eduAdminManagement .textBox {
  width: 180px;
  height: 32px;
  font-size: 12px;
  padding-left: 15px;
  border: 1px solid #409eff;
  border-radius: 5px;
  margin-left: 5px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#eduAdminManagement .textBox:focus {
  outline: none;
}

#eduAdminManagement .textBox:hover {
  border-color: #409eff;
}

/* .choose 此项真实有效， 可能编辑器不完全识别vue语法*/
#eduAdminManagement .choose {
  background-image: url("../../../../../static/images/teach/choose.png");
  background-repeat: no-repeat;
  background-position: -1px -2px;
}

#eduAdminManagement .btn {
  background: #409eff;
  color: #fff;
  height: 30px;
  border-radius: 5px;
  font-size: 12px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#eduAdminManagement .btn:focus {
  outline: none;
}

#eduAdminManagement .btn:hover {
  background: #66b1ff;
}

#eduAdminManagement .btn-search {
  width: 54px;
}

#eduAdminManagement .btn-clear {
  width: 88px;
}

#eduAdminManagement .blue {
  cursor: pointer;
  color: #409eff;
}

#eduAdminManagement .red {
  cursor: pointer;
  color: red;
}

table {
  border: #eeeeee;
}

#eduAdminManagement table tr {
  text-align: center !important;
}

#eduAdminManagement table td {
  vertical-align: middle !important;
}

#eduAdminManagement .title {
  text-align: center;
}

#eduAdminManagement .select-input {
  margin-right: 8px;
}

#eduAdminManagement .btnactive {
  border-radius: 5px;
  line-height: 20px;
  height: 22px;
}
#eduAdminManagement .btnactive:focus {
  outline: none;
}

/*添加教师模态框*/

#eduAdminManagement .modal-dialog {
  top: 100px;
  position: relative;
}

#eduAdminManagement .modal-header {
  background-color: #409eff;
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
#eduAdminManagement .add {
  width: 100%;
}

#eduAdminManagement .keypoint {
  color: red;
}
#eduAdminManagement .keypointwhite {
  color: #fff;
}
#eduAdminManagement .addtitle {
  color: #606266;
  display: inline-block;
  width: 50px;
}

#eduAdminManagement .addcon {
  width: 75%;
  border: 1px solid #409eff;
  border-radius: 5px;
  height: 32px;
  line-height: 32px;
  margin-left: 20px;
  padding: 0 20px;
}
#eduAdminManagement .addcon:hover {
  border: 1px solid #dcdfe6;
}
#eduAdminManagement .addcon:focus {
  outline: none;
}

#eduAdminManagement .content {
  margin: 0 auto;
  width: 60%;
  height: 100%;
}
#eduAdminManagement .modal-footer {
  border: none;
  text-align: center;
}
#eduAdminManagement .modal-select-input {
  display: inline-block;
  margin-left: 5px;
}
#eduAdminManagement .inputBox {
  padding: 0;
}
#eduAdminManagement .dropdown{
  margin-left: 20px; 
}
#eduAdminManagement #school .outside{
  width: 300px !important;
  height: 40px !important;
  margin-left: 10px !important;
}
/*正则表达式*/
#eduAdminManagement .err {
  border: 1px solid red;
}
#eduAdminManagement .inputtips {
  display: block;
  font-size: 10px;
  color: red;
  margin-left: 110px;
  margin-bottom: 5px;
  margin-top: 5px;
}
#eduAdminManagement .inputerr {
  display: block;
  font-size: 10px;
  color: red;
  margin-left: 60px;
  visibility: hidden;
  height: 20px;
  margin-bottom: 10px;
}
#eduAdminManagement .alterwidth {
  width: 30%;
}
#eduAdminManagement .altercontent {
  width: 300px;
  margin: 0 auto;
}
#eduAdminManagement .alterimg {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}

</style>
