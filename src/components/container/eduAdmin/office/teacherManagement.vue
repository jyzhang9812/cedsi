<template>
  <div id="teacherManagement" v-loading="screenLoading" element-loading-text="正在保存，请耐心等待！">
    <el-button type="primary" size="small" @click="createVisible=true">新增教师</el-button>
    <div class="spaceLine"></div>
    <el-table :data="teacherList" style="width: 100%">
      <el-table-column align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="account" label="账号"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名"></el-table-column>
      <el-table-column align="center" prop="sex" label="性别"></el-table-column>
      <el-table-column align="center" prop="desc" label="简介"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" slot="reference" type="danger" @click="dialogVisible=true">删除</el-button>
          <el-dialog title :visible.sync="dialogVisible" width="20%">
            <i class="el-icon-info"></i>
            <span>确定要删除此章节吗</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="success" size="mini" @click="dialogVisible=false">取 消</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row)">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增教师" :visible.sync="createVisible" width="50%">
      <el-row>
        <el-col :span="12">
          <el-form ref="form1" :model="form1" label-width="80px">
            <el-form-item label="教师姓名">
              <el-input v-model="form1.name" clearable placeholder="请输入教师姓名"></el-input>
            </el-form-item>
            <el-form-item label="教师工号">
              <el-input v-model="form1.account" clearable placeholder="请输入教师工号"></el-input>
            </el-form-item>
            <el-form-item label="教师简介">
              <el-input
                v-model="form1.desc"
                :autosize="{ minRows: 4, maxRows: 4}"
                type="textarea"
                placeholder="请输入教师简介"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form ref="form2" :model="form2" label-width="80px">
            <el-form-item label="教师性别">
              <el-radio v-model="form2.sex" label="1">男</el-radio>
              <el-radio v-model="form2.sex" label="0">女</el-radio>
            </el-form-item>
            <el-form-item label="登录密码">
              <el-input v-model="form2.pass" type="password" show-password placeholder="请输入登录密码"></el-input>
            </el-form-item>
            <el-form-item label="密码确认">
              <el-input v-model="form2._pass" show-password placeholder="请再次输入相同密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="submitCreate">保存信息</el-button>
              <el-button size="small" type="primary" @click="createVisible=false">取消编辑</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
    <div class="spaceLine"></div>
    <el-pagination
      :page-size="limit"
      background
      layout="prev, pager, next"
      :total="tableData.length"
      @current-change="handlePageChange"
      @prev-click="handlePageChange"
      @next-click="handlePageChange"
    ></el-pagination>
  </div>
</template>

<script>
import instance from "../../../../axios-auth";
import { uploadFile } from "../../../../uploadFile";
import crypto from "crypto";

export default {
  name: "classmanagement",
  data() {
    return {
      limit: 8,
      teacherList: [],
      screenLoading: false,
      dialogVisible: false,
      createVisible: false,
      form1: { name: "", account: "", desc: "" },
      form2: { sex: "0", pass: "", _pass: "" },
      tableData: []
    };
  },
  methods: {
    handleEdit(row) {},
    clearCreateForm() {
      this.form1 = { name: "", account: "", desc: "" };
      this.form2 = { sex: "0", pass: "", _pass: "" };
    },
    handlePageChange(pageIndex) {
      let start = (pageIndex - 1) * this.limit;
      let end = start + this.limit;
      this.teacherList = this.tableData.slice(start, end);
    },
    handleDelete(row) {
      // to do
    },
    submitDelete() {
      let token = localStorage.getItem("idToken");
      this.screenLoading = true;
      this.dialogVisible = false;
      let config = {
        headers: { Authorization: token },
        params: { teacherId: teacherId }
      };
      instance
        .delete("/eduadmin/teacher", config)
        .then(({ data }) => {
          if (data.status === "ok") {
            this.screenLoading = false;
            this.$message({ type: "success", message: "删除教师成功" });
          } else {
            throw new Error("delete teacher fail");
          }
        })
        .catch(err => {
          console.error(err);
          this.screenLoading = false;
          this.$message({ type: "error", message: "删除教师失败" });
        });
    },
    changeTablePages(value) {
      let currentPage = value / this.limit;
      this.currentPage = currentPage;
      this.currentList = this.tableData.slice(value, value + this.limit);
    },
    submitCreate() {
      this.createVisible = false;
      this.screenLoading = true;
      let SHA256 = crypto.createHash("SHA256");
      const teacher = {
        teacherId: this.form1.account,
        teacherName: this.form1.name,
        password: SHA256.update(this.form2.pass).digest("hex"),
        introduction: this.form1.desc,
        gender: this.form2.sex
      };
      let token = localStorage.getItem("idToken");
      let config = { headers: { Authorization: token } };
      this.clearCreateForm();
      instance
        .post("/eduadmin/teacher", teacher, config)
        .then(({ data }) => {
          console.log({ 新增结果: data });
          if (data.status === "ok") {
            this.screenLoading = false;
            this.getTeacherList();
            this.$message({ type: "success", message: "新增教师成功" });
          } else {
            throw new Error("create teacher fail");
          }
        })
        .catch(err => {
          this.screenLoading = false;
          console.error(err);
          this.$message({ type: "error", message: "新增教师失败" });
        });
    },
    getTeacherList() {
      let token = localStorage.getItem("idToken");
      let config = { headers: { Authorization: token } };
      instance
        .get("/eduadmin/teacher", config)
        .then(({ data }) => {
          console.log({ 教师数据: data });
          this.tableData = data.map(item => {
            return {
              sex: item.GENDER === "0" ? "女" : "男",
              account: item.JOB_NUMBER,
              status: item.TEACHER_STATUS,
              name: item.TEACHER_NAME,
              desc: item.INTRO,
              id: item.TEACHER_ID
            };
          });
          this.handlePageChange(1);
        })
        .catch(err => {
          console.error(err);
          this.$message({ type: "error", message: "获取教师列表失败" });
        });
    }
  },
  mounted() {
    this.getTeacherList();
  }
};
</script>

<style scoped>
#teacherManagement .spaceLine {
  display: block;
  height: 15px;
}
#teacherManagement {
  padding: 0 20px 20px 20px;
}
</style>
