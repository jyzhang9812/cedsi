<template>
  <div>
    <el-breadcrumb style="margin: 5px 30px">
      <el-breadcrumb-item :to="{ path: '/' }">课程管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-button size='medium' type="primary" @click="addCourse" style="margin: 10px 10px">新增课程</el-button>
    </el-row>
    <el-row class="mycard">
      <el-col :span="6.5" v-for="(course, index) in courseList" :key="course.name + index" :offset="1">
        <el-card shadow='hover'>
          <img :src="course.img" @click="manageChapter(index)" class="image" />
          <div style="padding: 5px;">
            <div class="bottom clearfix">
              <span style="display: inline; line-height: 30px"><strong>{{course.name}}</strong></span>
              <span style="float: right; display: inline">
                <span style="color: rgb(255,0,0); margin: 0 8px">￥{{course.price}}</span>
                <el-button type="success" size='small' @click="courseDetials(index)">详情</el-button>
                <el-button type="danger" size='small' :disabled="!course.status" @click="coursePublish(index)">发布
                </el-button>
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="课程详情" :visible.sync="centerDialogVisible" width="30%">
      <span><strong>课程名称:</strong></span>
      <span>{{courseName}}</span>
      <br>
      <br>
      <span><strong>课程简介:</strong></span>
      <span style="line-height:30px">{{courseIntro}}</span>
    </el-dialog>

  </div>
</template>
<script>
  import instance from "../../../../axios-auth.js";

  export default {
    data() {
      return {
        courseList: [],
        courseName: "",
        courseIntro: "",
        courseNum: 0,
        centerDialogVisible: false
      };
    },
    methods: {
      courseDetials(index) {
        this.courseName = this.courseList[index].name;
        this.courseIntro = this.courseList[index].introduction;
        this.courseNum = this.courseList[index].num;
        this.centerDialogVisible = true;
      },
      addCourse() {
        this.$router.push({ path: "/Admin/courseManagement/addCourse" });
      },
      manageChapter(index) {
        this.$router.push({
          path: "/Admin/chapterManagement/" + this.courseList[index].id
        });
      },
      coursePublish(index) {
        let token = localStorage.getItem("idToken");
        let config = { headers: { Authorization: token } };
        this.courseId = this.courseList[index].id;
        instance.put("/admin/course/" + this.courseId, {}, config)
          .then(response => {
            console.log(response);
            this.courseList[index].status = false;
            this.$message({ type: 'success', message: '课程发布成功!' });
          })
          .catch(error => console.log(error));
      }
    },
    mounted() {
      const config = { headers: { Authorization: localStorage.getItem("idToken") } };
      instance.get("/admin/course", config)
        .then(res => {
          console.log(res);
          res.data.forEach(item => {
            this.courseList.push({
              name: item.COURSE_NAME,
              introduction: item.INTRO,
              img: item.COVER,
              num: 100,
              id: item.ID,
              price: item.PRICE / 100,
              status: item.COURSE_STATUS == "NOT_PUBLISH"
            });
          });
        })
        .catch(err => { console.log(err) });
    }
  };
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 300px;
    height: 200px;
    border-radius: 8px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .el-card {
    margin: 5px 0 10px 5px;
    width: 350px;
    height: 300px;
  }

  .mycard {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: space-around;
  }
</style>