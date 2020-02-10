<template>
  <div id="organizationManagement">
    <el-button type="button" class="btn btn-default" data-dismiss="modal">取消</el-button>
    <el-button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitDelete()">确定</el-button>
    <div class="modal-dialog alterwidth">
      <div class="modal-content">
        <div class="modal-header">
          <el-button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</el-button>
          <h4 class="modal-title" id="myModalLabel">分配课程</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4 course-group" v-for="(course,index) in allCourseList" :key="index">
              <input type="checkbox" class="course" v-model="authCourseList" :value="course" />
              {{course.name}}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <el-button type="primary" size="small" data-dismiss="modal">取消</el-button>
          <el-button type="primary" size="small" data-dismiss="modal" @click="submit()">确定</el-button>
        </div>
      </div>
    </div>
    <div class="classroute">
      <ol class="breadcrumb">
        <li>机构管理</li>
      </ol>
    </div>
    <div class="first-floor">
      <el-button type="primary" size="medium" @click="addOrganization()" round>新增机构</el-button>
    </div>
    <div class="second-floor">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="num" label="序号" width="180"></el-table-column>
        <el-table-column prop="id" label="企业账号" width="180"></el-table-column>
        <el-table-column prop="name" label="机构名称" width="180"></el-table-column>
        <el-table-column prop="headmaster" label="机构负责人" width="180"></el-table-column>
        <el-table-column prop="intro" label="介绍" width="200"></el-table-column>
        <el-table-column prop="location" label="所属地区" width="180"></el-table-column>
        <el-table-column prop="address" label="操作" width="180">
          <template slot-scope="scope">
            <el-link type="primary" @click="See(scope.$index)">查看营业执照</el-link>
            <br />
            <el-link
              type="primary"
              data-toggle="modal"
              data-target="#courseModal"
              @click="getCourseList(scope.$index)"
            >分配课程</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      :num="tableData.length"
      @getNew="changeTablePages"
      layout="prev, pager, next"
      :total="10"
    ></el-pagination>
  </div>
</template>

<script>
import instance from "../../../../axios-auth";
import { error } from "util";
export default {
  name: "adminManagement",
  data() {
    return {
      limit: 20,
      currentList: [],
      inputData: {
        organizationUserName: ""
      },
      tableData: [], //页面表格内容
      //提示框
      alterimg: this.$store.state.url + "organization/alter.png",
      alterMes: "",
      //当前页码
      currentPage: 0,
      index: 0,
      authCourseList: [], //已授权课程
      allCourseList: [] //全部课程
    };
  },
  watch: {
    checkedId(val, oldVal) {
      this.authCourseList = val;
    }
  },
  methods: {
    deleteOrganization(seq) {
      this.index = this.currentPage * this.limit + seq;
      console.log(this.index);
      this.alterMes = "确认删除吗？";
    },
    See(index) {
      window.location.href = this.tableData[index].license;
    },
    addOrganization() {
      this.$router.push({
        path: "/Admin/organizationManagement/addOrganization"
      });
    },
    //换页
    changeTablePages(value) {
      //console.log(value)
      let currentPage = value / this.limit;
      this.currentPage = currentPage;
      //console.log(currentPage)
      this.currentList = this.tableData.slice(value, value + this.limit);
    },
    getNew(value) {
      this.currentList = this.tableData.slice(value, value + this.limit);
    },
    getCourseList(seq) {
      this.index = this.currentPage * this.limit + seq;
      let orgId = this.tableData[this.index].id;
      console.log(orgId);
      let token = localStorage.getItem("idToken");
      const config = { headers: { Authorization: token } };
      instance
        .get(`/admin/org/${orgId}/course`, config)
        .then(response => {
          console.log(response.data);
          let allCourseList = [];
          let allCourseData = response.data.data.all;
          for (let i = 0; i < allCourseData.length; i++) {
            let allcourse = {};
            allcourse.id = allCourseData[i].ID;
            allcourse.name = allCourseData[i].COURSE_NAME;
            allCourseList.push(allcourse);
          }
          this.allCourseList = allCourseList;
          let authCourseList = [];
          let authCourseData = response.data.data.authorization;
          for (let i = 0; i < authCourseData.length; i++) {
            let authcourse = {};
            authcourse.id = authCourseData[i].COURSE_ID;
            authcourse.name = authCourseData[i].COURSE_NAME;
            authCourseList.push(authcourse);
          }
          this.authCourseList = authCourseList;
          console.log(this.allCourseList);
          console.log(this.authCourseList);
        })
        .catch(err => {
          console.error(err);
        });
    },
    //确认提交
    submit() {
      console.log(this.authCourseList);
      let postCourse = {};
      postCourse.courseList = this.authCourseList;
      let orgId = this.tableData[this.index].id;
      let token = localStorage.getItem("idToken");
      const config = { headers: { Authorization: token } };
      instance
        .post(`admin/org/${orgId}/course`, postCourse)
        .then(response => {
          this.$toast.success({ title: "机构管理", message: "操作成功" });
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  mounted() {
    this.changeTablePages(0);
  },
  created() {
    let token = localStorage.getItem("idToken");
    const config = { headers: { Authorization: token } };
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
        this.changeTablePages(0);
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>

<style scoped>
#organizationManagement .breadcrumb {
  background-color: #fff;
  color: #606266;
  margin-bottom: 0;
}
#organizationManagement {
  font-size: 12px;
  color: #606266;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
}
</style>
