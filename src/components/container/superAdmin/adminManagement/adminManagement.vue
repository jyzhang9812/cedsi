<template>
  <div class="subContainer">
    <!-- 添加管理员模态框（Modal） -->
    <div
      class="modal fade"
      id="addAdmin"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">新增管理员</h4>
          </div>
          <div class="modal-body">
            <div class="content">
              <div class="add">
                <span class="keypoint">*</span>
                <span class="addtitle">账号</span>
                <input
                  :class="isUserName==false?'addcon':'addcon err'"
                  placeholder="请输入管理员账号"
                  v-model="adminUserName"
                />
              </div>
              <span :class="isUserName==true?'inputtips':'inputerr'">不超过15个字符</span>
              <div class="add">
                <span class="keypoint">*</span>
                <span class="addtitle">密码</span>
                <input
                  :class="isPassword==false?'addcon':'addcon err'"
                  placeholder="请输入密码"
                  v-model="adminPassword"
                />
              </div>
              <span :class="isPassword==true?'inputtips':'inputerr'">不超过20个字符</span>
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
        <li>管理员管理</li>
      </ol>
    </div>
    <div class="first-floor">
      <label for="class-name"></label>
      <input
        type="text"
        placeholder="请输入管理员账号"
        class="textBox"
        id="class-name"
        v-model="inputData.adminUserName"
      />
      <button class="btn btn-search">搜索</button>
      <button
        class="btn btn-clear"
        data-toggle="modal"
        data-target="#addAdmin"
        @click="addAdmin()"
      >新增管理员</button>
    </div>
    <div class="second-floor">
      <table class="table table-hover">
        <thead>
          <tr>
            <th v-for="(title,index) in tableTitle" class="title" :key="index">{{title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(admin, seq) in currentList" :key="seq" class="content">
            <td>{{seq+1}}</td>
            <td>{{admin.username}}</td>
            <td>{{admin.character}}</td>
            <td>
              <button
                :class="admin.status==='启用'?'btnactive btn-success':'btnactive btn-warning'"
                @click="changeAdminStatus(seq)"
              >{{admin.status}}</button>
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
export default {
  name: "adminManagement",
  components: { pagination },
  data() {
    return {
      inputData: {
        adminUserName: ""
      },
      tableTitle: ["序号", "账号", "角色", "状态", "操作"],
      //新增管理员
      adminUserName: "",
      isUserName: true,
      adminPassword: "",
      isPassword: true,
      //提示框
      alterimg: this.$store.state.url + "eduAdmin/alter.png",
      alterMes: "",
      //当前页码
      currentPage: 0,
      index: 0,
      currentList:[]
    };
  },
  watch: {
    adminUserName(val, oldVal) {
      if (val.length <= 15 && val.length > 0) {
        this.isUserName = false;
      } else {
        this.isUserName = true;
      }
    },
    adminPassword(val, oldVal) {
      if (val.length <= 20 && val.length > 0) {
        this.isPassword = false;
      } else {
        this.isPassword = true;
      }
    }
  },
  methods: {
    changeOption(item, id) {
      Object.keys(this.inputData).forEach(res => {
        if (res === id) {
          this.inputData[res].option = item;
        }
      });
    },
    changeAdminStatus(seq) {
      this.index = this.currentPage * this.limit + seq;
      //console.log(this.index,this.currentPage)
      console.log(this.tableData[this.index].status)
      if (this.tableData[this.index].status == "启用") {
        this.tableData[this.index].status = "禁用";
      } else {
        this.tableData[this.index].status = "启用";
      }
      var updateAdmin = JSON.parse(JSON.stringify(this.tableData[this.index]));
      if(this.tableData[this.index].status=="禁用")
        updateAdmin.status="disable"
      else
        updateAdmin.status="active"
      console.log(this.tableData[this.index].status)
      console.log(updateAdmin);
      var token = window.localStorage.getItem("idToken");
      console.log(token);
      globalAxios
        .put(
          "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/superadmin/admin",
          { userId: updateAdmin.id ,status:updateAdmin.status },
          {headers:{
            "Content-Type": "application/json",
            Authorization: token}
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
    deleteAdmin(seq) {
      this.index = this.currentPage * this.limit + seq;
      console.log(this.index);
      this.alterMes = "确认删除吗？";
    },
    submitDelete() {
      var deleteAdmin = this.tableData[this.index];
      console.log(deleteAdmin);
      var token = window.localStorage.getItem("idToken");
      console.log(token);
      this.$http
        .delete(
          "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/superadmin/admin?userId="+deleteAdmin.id,
          {headers:{
            "Content-Type": "application/json",
            Authorization: token}
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
    addAdmin() {
      this.adminUserName = "";
      this.adminPassword = "";
    },
    //提交
    submit() {
      var newAdmin = {};
      newAdmin.username = this.adminUserName;
      newAdmin.character = "管理员";
      newAdmin.status = "启用";
      //console.log(newAdmin);
      var data = { username: this.adminUserName, password: this.adminPassword };
      //console.log(data);
      var token = window.localStorage.getItem("idToken");
      console.log(token);
      this.$http
        .post(
          "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/superadmin/admin",
          { username: this.adminUserName, password: this.adminPassword },
          {
            "Content-Type": "application/json",
            Authorization: token
          }
        )
        .then(
          response => {
            //console.log(response);
            this.tableData.splice(0, 0, newAdmin);
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
  created() {
    this.$store.dispatch('getAdmin')
    // var token = window.localStorage.getItem("idToken");
    // globalAxios
    //   .get(
    //     "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/superadmin/admin",
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: token
    //       }
    //     }
    //   )
    //   .then(
    //     response => {
    //       //console.log(response.data.data);
    //       var admin_arr = response.data.data;
    //       var admin_table = [];
    //       for (var i = 0; i < admin_arr.length; i++) {
    //         var admin = {};
    //         admin.username = admin_arr[i].USER_NAME;
    //         admin.id = admin_arr[i].USER_ID;
    //         if (admin_arr[i].USER_STATUS == "active") admin.status = "启用";
    //         else admin.status = "禁用";
    //         admin.character = "管理员";
    //         //console.log(admin)
    //         admin_table.push(admin);
    //       }
    //       //console.log(admin_table)
    //       // return response.json();
    //       this.tableData = admin_table;
           this.getNew(0);
    //       //console.log(this.tableData)
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
  },
  computed:{
    // currentList(){
    //   return this.$store.state.adminCurrentList
    // },
    tableData(){
      return this.$store.state.adminList
    },
    limit(){
      return this.$store.state.limit
    }
  },
  mounted() {
    //this.tableData = this.originalTableData;
    //this.changeTablePages(0);
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
  width: 88px;
}

.blue {
  cursor: pointer;
  color: #409eff;
}

.red {
  cursor: pointer;
  color: red;
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

.btnactive {
  border-radius: 5px;
  line-height: 20px;
  height: 22px;
}
.btnactive:focus {
  outline: none;
}

/*添加教师模态框*/

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
.keypointwhite {
  color: #fff;
}
.addtitle {
  color: #606266;
}

.addcon {
  width: 75%;
  border: 1px solid #409eff;
  border-radius: 5px;
  height: 32px;
  line-height: 32px;
  margin-left: 20px;
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
  width: 60%;
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
/*正则表达式*/
.err {
  border: 1px solid red;
}
.inputtips {
  display: block;
  font-size: 10px;
  color: red;
  margin-left: 60px;
  margin-bottom: 10px;
}
.inputerr {
  display: block;
  font-size: 10px;
  color: red;
  margin-left: 60px;
  visibility: hidden;
  height: 20px;
  margin-bottom: 10px;
}
.alterwidth {
  width: 30%;
}
.altercontent {
  width: 300px;
  margin: 0 auto;
}
.alterimg {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
</style>
