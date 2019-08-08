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
                  :class="isAccount==false?'addcon':'addcon err'"
                  placeholder="请输入管理员账号"
                  v-model="adminAccount"
                />
              </div>
              <span :class="isAccount==true?'inputtips':'inputerr'">不超过15个字符</span>
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
        v-model="inputData.adminAccount"
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
            <td>{{admin.account}}</td>
            <td>{{admin.password}}</td>
            <td>{{admin.character}}</td>
            <td>
              <button
                :class="admin.status==='启用'?'btnactive btn-success':'btnactive btn-warning'"
                @click="changeAdminStatus(seq)"
              >{{admin.status}}</button>
            </td>
            <td>
              <span
                class="blue"
                data-toggle="modal"
                data-target="#addAdmin"
                @click="updateAdmin(seq)"
              >编辑</span>&nbsp;&nbsp;
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
export default {
  name: "classmanagement",
  components: { pagination },
  data() {
    return {
      limit: 3,
      currentList: [],
      inputData: {
        adminAccount: ""
      },
      tableTitle: ["序号", "账号", "密码", "角色", "状态", "操作"],
      tableData: [
        {
          account: "root1",
          password: "123456",
          character: "管理员",
          status: "启用"
        },
        {
          account: "root2",
          password: "1234567",
          character: "管理员",
          status: "禁用"
        },
        {
          account: "root3",
          password: "12345678",
          character: "管理员",
          status: "启用"
        },
        {
          account: "root1",
          password: "123456",
          character: "管理员",
          status: "启用"
        },
        {
          account: "root2",
          password: "1234567",
          character: "管理员",
          status: "禁用"
        },
        {
          account: "root1",
          password: "123456",
          character: "管理员",
          status: "启用"
        },
        {
          account: "root2",
          password: "1234567",
          character: "管理员",
          status: "禁用"
        },
        {
          account: "root3",
          password: "12345678",
          character: "管理员",
          status: "启用"
        }
      ],
      //新增管理员
      adminAccount: "",
      isAccount: true,
      adminPassword: "",
      isPassword: true,
      //提示框
      alterimg: this.$store.state.url + "eduAdmin/alter.png",
      alterMes: "",
      index: -1,
      //当前页码
      currentPage: 0
    };
  },
  watch: {
    adminAccount(val, oldVal) {
      if (val.length <= 15 && val.length > 0) {
        this.isAccount = false;
      } else {
        this.isAccount = true;
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
      if (this.tableData[seq].status == "启用") {
        this.tableData[seq].status = "禁用";
      } else {
        this.tableData[seq].status = "启用";
      }
    },
    deleteAdmin(seq) {
      this.index = seq;
      this.alterMes = "确认删除吗？";
    },
    submitDelete() {
      this.tableData.splice(this.index, 1);
    },
    //编辑教师
    updateAdmin(seq) {
      this.index = seq + this.currentPage * this.limit;
      //console.log(this.index);
      this.adminAccount = this.tableData[this.index].account;
      this.adminPassword = this.tableData[this.index].password;
    },
    addAdmin() {
      this.index = -1;
      this.adminAccount = "";
      this.adminPassword = "";
    },
    //编辑或更改提交
    submit() {
      console.log(this.index);
      if (this.index >= 0) {
        this.tableData[this.index].account = this.adminAccount;
        this.tableData[this.index].password = this.adminPassword;
      } else {
        var newAdmin = {};
        newAdmin.account = this.adminAccount;
        newAdmin.password = this.adminPassword;
        newAdmin.character = "管理员";
        newAdmin.status = "启用";
        this.tableData.push(newAdmin);
      }
      console.log(newAdmin);
    },
    //换页
    changeTablePages(value) {
      //console.log(value)
      var currentPage = value / this.limit;
      this.currentPage = currentPage;
      //console.log(currentPage)
      this.currentList = this.tableData.slice(value, value + this.limit);
    }
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
