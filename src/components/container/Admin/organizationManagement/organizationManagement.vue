<template>
  <div id="organizationManagement">
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
        <li>机构管理</li>
      </ol>
    </div>
    <div class="first-floor">
      <label for="class-name"></label>
      <input
        type="text"
        placeholder="请输入机构账号"
        class="textBox"
        id="class-name"
        v-model="inputData.organizationName"
      />
      <button class="btn btn-search">搜索</button>
      <button class="btn btn-clear" @click="addOrganization()">新增机构</button>
    </div>
    <div class="second-floor">
      <table class="table table-hover">
        <thead>
          <tr>
            <th v-for="(title,index) in tableTitle" class="title" :key="index">{{title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(organization, seq) in currentList" :key="seq" class="content">
            <td>{{seq+1}}</td>
            <td>{{organization.id}}</td>
            <td>{{organization.name}}</td>
            <td>{{organization.headmaster}}</td>
            <td>{{organization.intro}}</td>
            <td>{{organization.location}}</td>
            <td>
              <span class="blue" @click="See(seq)">查看营业执照</span>
              <!-- <span class="blue">下载相关文件</span> -->
              <br />
              <span class="blue">编辑</span>
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
      limit: 20,
      currentList: [],
      inputData: {
        organizationUserName: ""
      },
      tableTitle: [
        "序号",
        "企业账号",
        "机构名称",
        "机构负责人",
        "介绍",
        "所属地区",
        "操作"
      ],
      tableData: [], //页面表格内容
      //提示框
      alterimg: this.$store.state.url + "organization/alter.png",
      alterMes: "",
      //当前页码
      currentPage: 0,
      index: 0
    };
  },
  methods: {
    deleteOrganization(seq) {
      this.index = this.currentPage * this.limit + seq;
      console.log(this.index);
      this.alterMes = "确认删除吗？";
    },
    // submitDelete() {
    //   var deleteorganization = this.tableData[this.index];
    //   console.log(deleteorganization);
    //   var token = window.localStorage.getItem("idToken");
    //   console.log(token);
    //   this.$http
    //     .delete(
    //       "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/superadmin/admin",
    //       { userId: deleteorganization.id },
    //       {
    //         "Content-Type": "application/json",
    //         Authorization: token
    //       }
    //     )
    //     .then(
    //       response => {
    //         console.log(response);
    //         this.tableData.splice(this.index, 1);
    //       },
    //       error => {
    //         console.log(error);
    //       }
    //     );
    //   this.getNew(this.currentPage * this.limit);
    // },
    See(index){
      window.location.href=this.tableData[index].license
    },
    addOrganization() {
      this.$router.push({
        path: "/Admin/organizationManagement/addOrganization"
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
    }
  },
  mounted() {
    this.changeTablePages(0);
  },
  created() {
    var token = window.localStorage.getItem("idToken");
    globalAxios
      .get(
        "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/admin/org",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
        }
      )
      .then(
        response => {
          var orgList = [];
          var orgArr = [];
          orgList = response.data.data;
          for (var i = 0; i < orgList.length; i++) {
            var org = {};
            org.name = orgList[i].ORG_NAME;
            org.headmaster = orgList[i].HEADMASTER;
            org.intro = orgList[i].INTRODUCTION;
            org.location = orgList[i].ORG_LOCATION;
            org.id = orgList[i].ORG_ID;
            org.license=orgList[i].BUSINESS_LICENSE;
            orgArr.push(org);
          }
          this.tableData=orgArr
          this.changeTablePages(0);
        },
        error => {
          console.log(error);
        }
      );
  },

};
</script>

<style scoped>
#organizationManagement .breadcrumb {
  background-color: #fff;
  color: #606266;
  margin-bottom: 0;
}
#organizationManagement{
  font-size: 12px;
  color: #606266;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
}

#organizationManagement .first-floor {
  margin-top: 20px;
}
#organizationManagement .second-floor {
  font-size: 12px;
  color: #606266;
  margin-top: 20px;
}
#organizationManagement .select-input {
  display: inline-block;
}
label {
  display: inline;
}

#organizationManagement .content td {
  line-height: 30px;
}

#organizationManagement .textBox {
  width: 180px;
  height: 32px;
  font-size: 12px;
  padding-left: 15px;
  border: 1px solid #409eff;
  border-radius: 5px;
  margin-left: 5px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#organizationManagement .textBox:focus {
  outline: none;
}

#organizationManagement .textBox:hover {
  border-color: #409eff;
}

/* .choose 此项真实有效， 可能编辑器不完全识别vue语法*/
#organizationManagement .choose {
  background-image: url("../../../../../static/images/teach/choose.png");
  background-repeat: no-repeat;
  background-position: -1px -2px;
}

#organizationManagement .btn {
  background: #409eff;
  color: #fff;
  height: 30px;
  border-radius: 5px;
  font-size: 12px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#organizationManagement .btn:focus {
  outline: none;
}

#organizationManagement .btn:hover {
  background: #66b1ff;
}

#organizationManagement .btn-search {
  width: 54px;
}

#organizationManagement .btn-clear {
  width: 88px;
}

#organizationManagement .blue {
  cursor: pointer;
  color: #409eff;
}

#organizationManagement .red {
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

#organizationManagement .title {
  text-align: center;
}

#organizationManagement .select-input {
  margin-right: 8px;
}

#organizationManagement .btnactive {
  border-radius: 5px;
  line-height: 20px;
  height: 22px;
}
#organizationManagement .btnactive:focus {
  outline: none;
}

/*添加教师模态框*/

#organizationManagement .modal-dialog {
  top: 100px;
  position: relative;
}

#organizationManagement .modal-header {
  background-color: #409eff;
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
#organizationManagement .add {
  width: 100%;
}

#organizationManagement .keypoint {
  color: red;
}
#organizationManagement .keypointwhite {
  color: #fff;
}
#organizationManagement .addtitle {
  color: #606266;
  display: inline-block;
  width: 50px;
}

#organizationManagement .addcon {
  width: 75%;
  border: 1px solid #409eff;
  border-radius: 5px;
  height: 32px;
  line-height: 32px;
  margin-left: 20px;
  padding: 0 20px;
}
#organizationManagement .addcon:hover {
  border: 1px solid #dcdfe6;
}
#organizationManagement .addcon:focus {
  outline: none;
}

#organizationManagement .content {
  margin: 0 auto;
  width: 60%;
  height: 100%;
}
#organizationManagement .modal-footer {
  border: none;
  text-align: center;
}
#organizationManagement .modal-select-input {
  display: inline-block;
  margin-left: 5px;
}
#organizationManagement .inputBox {
  padding: 0;
}
#organizationManagement .dropdown {
  margin-left: 20px;
}
#organizationManagement #school .outside {
  width: 300px !important;
  height: 40px !important;
  margin-left: 10px !important;
}
/*正则表达式*/
#organizationManagement .err {
  border: 1px solid red;
}
#organizationManagement .inputtips {
  display: block;
  font-size: 10px;
  color: red;
  margin-left: 110px;
  margin-bottom: 5px;
  margin-top: 5px;
}
#organizationManagement .inputerr {
  display: block;
  font-size: 10px;
  color: red;
  margin-left: 60px;
  visibility: hidden;
  height: 20px;
  margin-bottom: 10px;
}
#organizationManagement .alterwidth {
  width: 30%;
}
#organizationManagement .altercontent {
  width: 300px;
  margin: 0 auto;
}
#organizationManagement .alterimg {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
</style>
