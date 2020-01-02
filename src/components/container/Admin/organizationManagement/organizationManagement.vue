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
            <el-button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</el-button>
            <h4 class="modal-title" id="myModalLabel">提示</h4>
          </div>
          <div class="modal-body">
            <div class="altercontent" aria-hidden="true">
              <img :src="alterimg" class="alterimg" />
              <span>{{alterMes}}</span>
            </div>
          </div>
          <div class="modal-footer">
            <el-button type="button" class="btn btn-default" data-dismiss="modal">取消</el-button>
            <el-button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="submitDelete()"
            >确定</el-button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
    <!-- 分配课程模态框（Modal） -->
    <div
      class="modal fade"
      id="courseModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
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
            <el-button type="primary"  size="small" data-dismiss="modal">取消</el-button>
            <el-button type="primary"  size="small" data-dismiss="modal" @click="submit()">确定</el-button>
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
      <el-button type="primary"  size="medium" @click="addOrganization()" round>新增机构</el-button>
    </div>
    <div class="second-floor">
      <el-table
      :data="tableData"
      stripe
      style="width: 100%"
     >
      <el-table-column
        prop="num"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="id"
        label="企业账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="机构名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="headmaster"
        label="机构负责人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="intro"
        label="介绍"
        width="200">
      </el-table-column>
      <el-table-column
        prop="location"
        label="所属地区"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
        width="180"
        >
        <template slot-scope="scope">
        <el-link type="primary" @click="See(scope.$index)">查看营业执照</el-link>
              <br />
              <el-link type="primary"
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
    :total=10>
  </el-pagination>
  </div>
</template>

<script>
import globalAxios from "axios";
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
      allCourseList: []   //全部课程
    };
  },
  watch: {
    checkedId(val, oldVal) {
      this.authCourseList=val
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
      var currentPage = value / this.limit;
      this.currentPage = currentPage;
      //console.log(currentPage)
      this.currentList = this.tableData.slice(value, value + this.limit);
    },
    getNew(value) {
      this.currentList = this.tableData.slice(value, value + this.limit);
      //console.log(this.currentList)
    },
    getCourseList(seq) {
      this.index = this.currentPage * this.limit + seq;
      var orgId = this.tableData[this.index].id;
      console.log(orgId)
      var token = window.localStorage.getItem("idToken");
      globalAxios
        .get(
          "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/admin/org/" +
            orgId +
            "/course",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            }
          }
        )
        .then(
          response => {
            console.log(response.data);
            //所有课程
            var allCourseList=[]
            var allCourseData=response.data.data.all
            for(var i=0;i<allCourseData.length;i++){
              var allcourse={}
              allcourse.id=allCourseData[i].ID
              allcourse.name=allCourseData[i].COURSE_NAME
              allCourseList.push(allcourse)
            }
            this.allCourseList=allCourseList
            //已选中的课程
            var authCourseList=[]
            var authCourseData=response.data.data.authorization
            for(var i=0;i<authCourseData.length;i++){
              var authcourse={}
              authcourse.id=authCourseData[i].COURSE_ID
              authcourse.name=authCourseData[i].COURSE_NAME
              authCourseList.push(authcourse)
            }
            this.authCourseList=authCourseList
            console.log(this.allCourseList)
            console.log(this.authCourseList)
          },
          error => {}
        );
    },
    //确认提交
    submit(){
      console.log(this.authCourseList)
      var postCourse={}
      postCourse.courseList=this.authCourseList
      var orgId = this.tableData[this.index].id;
      var token = window.localStorage.getItem("idToken");
      globalAxios
        .post(
          "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/admin/org/" +
            orgId +
            "/course",postCourse,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            }
          }
        )
        .then(
          response => {
            this.$toast.success({ title: "机构管理", message: "操作成功" });
          },
          error => {}
        );
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
            org.num = orgList[i].ORG_NUMBER;
            org.license = orgList[i].BUSINESS_LICENSE;
            orgArr.push(org);
          }
          this.tableData = orgArr;
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
#organizationManagement .course-group {
  margin-left: 30px;
  font-size: 15px;
}
#organizationManagement .course {
  margin-right: 10px;
}
</style>
