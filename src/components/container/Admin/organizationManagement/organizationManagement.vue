<template>
  <div id="organizationManagement" v-loading="screenLoading" element-loading-text="正在处理, 请耐心等待">
    <el-button type="primary" size="small" @click="addOrganization()">新增机构</el-button>
    <div class="spaceLine"></div>
    <el-table :data="currentList" style="width: 100%">
      <el-table-column align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="id" label="企业账号"></el-table-column>
      <el-table-column align="center" prop="name" label="机构名称"></el-table-column>
      <el-table-column align="center" prop="headmaster" label="机构负责人"></el-table-column>
      <el-table-column align="center" prop="intro" label="介绍"></el-table-column>
      <el-table-column align="center" prop="location" label="所属地区"></el-table-column>
      <el-table-column align="center" prop="address" label="操作">
        <template slot-scope="scope">
          <el-link type="primary" :href="scope.row.license" target="_blank">查看营业执照</el-link>
          <br />
          <el-link type="primary" @click="getCourseList(scope.row)">分配课程</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="分配课程" :visible.sync="dialogVisible" width="25%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="选择课程">
          <el-select size="small" v-model="form.course" multiple placeholder="请选择课程">
            <el-option
              v-for="item in allCourseList"
              :key="item.COURSE_ID"
              :label="item.COURSE_NAME"
              :value="item.COURSE_ID"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="saveAllocation">保存</el-button>
          <el-button size="small" type="primary" @click="dialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
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

export default {
  name: "adminManagement",
  data() {
    return {
      limit: 6,
      currentList: [],
      tableData: [],
      screenLoading: false,
      authCourseList: [],
      allCourseList: [],
      dialogVisible: false,
      form: { course: [] },
      preAllocateOrg: ""
    };
  },
  methods: {
    handlePageChange(pageIndex) {
      let start = (pageIndex - 1) * this.limit;
      let end = start + this.limit;
      this.currentList = this.tableData.slice(start, end);
    },
    deleteOrganization(seq) {
      // To do
    },
    addOrganization() {
      const path = "/Admin/organizationManagement/addOrganization";
      this.$router.push({ path: path });
    },
    getCourseList(row) {
      this.preAllocateOrg = row.id;
      this.screenLoading = true;
      let token = localStorage.getItem("idToken");
      const config = { headers: { Authorization: token } };
      instance
        .get(`/admin/org/${row.id}/course`, config)
        .then(({ data }) => {
          console.log({ 课程信息: data });
          this.authCourseList = data.authList;
          this.allCourseList = data.allList;
          this.form.course = data.authList.map(item => item.COURSE_ID);
          this.screenLoading = false;
          this.dialogVisible = true;
        })
        .catch(err => {
          this.$message({ type: "error", message: "获取课程失败" });
          this.dialogVisible = false;
          this.screenLoading = false;
          console.error(err);
        });
    },
    saveAllocation() {
      this.dialogVisible = false;
      this.screenLoading = true;
      const token = localStorage.getItem("idToken");
      const config = { headers: { Authorization: token } };
      const courseList = this.form.course.map(item => {
        return this.allCourseList.find(course => {
          return course.COURSE_ID === item;
        });
      });
      const url = `admin/org/${this.preAllocateOrg}/course`;
      instance
        .post(url, { courseList }, config)
        .then(({ data }) => {
          console.log(data);
          this.screenLoading = false;
          if (data.status === "ok") {
            this.$message({ type: "success", message: "分配课程成功" });
          } else {
            throw new Error("allocate course fail");
          }
        })
        .catch(err => {
          this.screenLoading = false;
          this.$message({ type: "error", message: "分配课程失败" });
          console.error(err);
        });
    }
  },
  mounted() {
    let token = localStorage.getItem("idToken");
    const config = { headers: { Authorization: token } };
    this.screenLoading = true;
    instance
      .get("/admin/org", config)
      .then(response => {
        let orgList = [];
        let orgArr = [];
        orgList = response.data.data;
        for (let i = 0; i < orgList.length; i++) {
          let org = {};
          org.name = orgList[i].ORG_NAME;
          org.headmaster = orgList[i].HEADMASTER;
          org.intro = orgList[i].INTRODUCTION;
          org.location = orgList[i].ORG_LOCATION;
          org.id = orgList[i].ORG_ID;
          org.num = orgList[i].ORG_NUMBER;
          org.license = orgList[i].BUSINESS_LICENSE;
          orgArr.push(org);
        }
        this.tableData = orgArr;
        this.screenLoading = false;
        this.handlePageChange(1);
      })
      .catch(err => {
        this.screenLoading = false;
        console.error(err);
        this.$message({ type: "error", message: "获取机构列表失败" });
      });
  }
};
</script>

<style scoped>
#organizationManagement {
  padding: 0 20px 20px 20px;
}
#organizationManagement .spaceLine {
  display: block;
  height: 15px;
}
</style>
