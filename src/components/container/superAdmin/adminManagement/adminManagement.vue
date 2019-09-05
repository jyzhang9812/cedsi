<template>
  <div id="adminManagement">
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
                  type="password"
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
      index: 0
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
      var data={}
      data.userId=updateAdmin.id
      data.status=updateAdmin.status
      this.$store.dispatch("updateAdminStatus",data)
    },
    deleteAdmin(seq) {
      this.index = this.currentPage * this.limit + seq;
      console.log(this.index);
      this.alterMes = "确认删除吗？";
    },
    submitDelete() {
      var deleteAdmin = this.tableData[this.index];
      var data={}
      data.id=deleteAdmin.id
      data.index=this.index
      data.page=this.currentPage
      this.$store.dispatch("deleteAdmin",data)
    },
    addAdmin() {
      this.adminUserName = "";
      this.adminPassword = "";
    },
    //提交
    submit() {
      var data = { username: this.adminUserName, password: this.adminPassword ,page:this.currentPage};
      this.$store.dispatch("addAdmin",data)
    },
    //换页
    changeTablePages(value) {
      var currentPage = value / this.limit;
      this.currentPage = currentPage;
      this.$store.commit("changeAdminCurrentList",this.currentPage*this.limit)
    },
  },
  created() {
    this.$store.dispatch('getAdmin')
  },
  computed:{
    currentList(){
      return this.$store.state.adminCurrentList
    },
    tableData(){
      return this.$store.state.adminList
    },
    limit(){
      return this.$store.state.limit
    }
  },
};
</script>

<style scoped>
#adminManagement .breadcrumb {
  background-color: #fff;
  color: #606266;
  margin-bottom: 0;
}
#adminManagement {
  font-size: 12px;
  color: #606266;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
}

#adminManagement .first-floor {
  margin-top: 20px;
}
#adminManagement .second-floor {
  font-size: 12px;
  color: #606266;
  margin-top: 20px;
}
#adminManagement .select-input {
  display: inline-block;
}
#adminManagement label {
  display: inline;
}

#adminManagement .content td {
  line-height: 30px;
}

#adminManagement .textBox {
  width: 180px;
  height: 32px;
  font-size: 12px;
  padding-left: 15px;
  border: 1px solid #409eff;
  border-radius: 5px;
  margin-left: 5px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#adminManagement .textBox:focus {
  outline: none;
}

#adminManagement .textBox:hover {
  border-color: #409eff;
}

/* #adminManagement .choose 此项真实有效， 可能编辑器不完全识别vue语法*/
#adminManagement .choose {
  background-image: url("../../../../../static/images/teach/choose.png");
  background-repeat: no-repeat;
  background-position: -1px -2px;
}

#adminManagement .btn {
  background: #409eff;
  color: #fff;
  height: 30px;
  border-radius: 5px;
  font-size: 12px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#adminManagement .btn:focus {
  outline: none;
}

#adminManagement .btn:hover {
  background: #66b1ff;
}

#adminManagement .btn-search {
  width: 54px;
}

#adminManagement .btn-clear {
  width: 88px;
}

#adminManagement .blue {
  cursor: pointer;
  color: #409eff;
}

#adminManagement .red {
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

#adminManagement .title {
  text-align: center;
}

#adminManagement #adminManagement .select-input {
  margin-right: 8px;
}

#adminManagement .btnactive {
  border-radius: 5px;
  line-height: 20px;
  height: 22px;
}
#adminManagement .btnactive:focus {
  outline: none;
}

/*添加教师模态框*/

#adminManagement .modal-dialog {
  top: 100px;
  position: relative;
}

#adminManagement .modal-header {
  background-color: #409eff;
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
#adminManagement .add {
  width: 100%;
}

#adminManagement .keypoint {
  color: red;
}
#adminManagement .keypointwhite {
  color: #fff;
}
#adminManagement .addtitle {
  color: #606266;
}

#adminManagement .addcon {
  width: 75%;
  border: 1px solid #409eff;
  border-radius: 5px;
  height: 32px;
  line-height: 32px;
  margin-left: 20px;
  padding: 0 20px;
}
#adminManagement .addcon:hover {
  border: 1px solid #dcdfe6;
}
#adminManagement .addcon:focus {
  outline: none;
}

#adminManagement .content {
  margin: 0 auto;
  width: 60%;
  height: 100%;
}
#adminManagement .modal-footer {
  border: none;
  text-align: center;
}
#adminManagement .modal-select-input {
  display: inline-block;
  margin-left: 5px;
}
#adminManagement .inputBox {
  padding: 0;
}
/*正则表达式*/
#adminManagement .err {
  border: 1px solid red;
}
#adminManagement .inputtips {
  display: block;
  font-size: 10px;
  color: red;
  margin-left: 60px;
  margin-bottom: 10px;
}
#adminManagement .inputerr {
  display: block;
  font-size: 10px;
  color: red;
  margin-left: 60px;
  visibility: hidden;
  height: 20px;
  margin-bottom: 10px;
}
#adminManagement .alterwidth {
  width: 30%;
}
#adminManagement .altercontent {
  width: 300px;
  margin: 0 auto;
}
#adminManagement .alterimg {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
</style>
