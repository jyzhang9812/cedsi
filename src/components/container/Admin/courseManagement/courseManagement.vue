<template>
  <div id="courseManagement">
    <!-- 课程详情模态框-->
    <div class="modal fade" id="detials" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">课程详情</h4>
          </div>
          <div class="modal-body">
            <div class="modal-list">
              <h5 class="modal-list-title">课程名称:</h5>
              <span class="modal-list-course">{{courseName}}</span>
            </div>
            <div class="modal-list">
              <h5 class="modal-list-title">课程详情:</h5>
              <span class="modal-list-course">{{courseIntro}}</span>
            </div>
            <!-- <div class="modal-list">
              <h5 class="modal-list-title">上课人数:</h5>
              <span class="modal-list-course">{{courseNum}}人</span>
            </div> -->
          </div>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal -->
    <div class="classroute">
      <ol class="breadcrumb">
        <li>课程管理</li>
      </ol>
    </div>
    <div class="first-floor">
      <button class="btn btn-clear" @click="addCourse">新增课程</button>
    </div>
    <div class="second-floor row">
      <div class="col-md-4 floor-height" v-for="(course,index) in courseList" :key="course.name">
        <div class="course-card" @click="gotoChapter(index)">
          <img :src="course.img" class="course-image" />
        </div>
        <div class="course-title row">
          <h3 class="course-name col-md-5">{{course.name}}</h3>
          <h5 class="course-price col-md-2">￥{{course.price}}</h5>
          <button class="course-detials btn col-md-2" data-toggle="modal" data-target="#detials"
            @click="courseDetials(index)">详情</button>
          <button class="course-detials btn btn-red col-md-2" :disabled="!course.status" @click="coursePublish(index)">发布</button>
        </div>
      </div>
    </div>
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
      };
    },
    methods: {
      courseDetials(index) {
        this.courseName = this.courseList[index].name;
        this.courseIntro = this.courseList[index].introduction;
        this.courseNum = this.courseList[index].num;
      },
      addCourse() {
        this.$router.push({ path: '/Admin/courseManagement/addCourse' })
      },
      gotoChapter(index) {
        this.$router.push({ path: '/Admin/chapterManagement/' + this.courseList[index].id })
      },
      coursePublish(index){
        var token = window.localStorage.getItem("idToken");
      this.courseId = this.courseList[index].id;
      instance
        .put(
          "/admin/course/" +
            this.courseId ,{},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            }
          }
        )
        .then(
          response => {
            console.log(response);
            this.courseList[index].status=false;
            // alert("发布成功")
            this.$toast.success({ title: "课程管理", message: "发布成功" });
          },
          error => {
            console.log(error);
          }
        );
      }
    },
    mounted() {
      let config = { headers: { Authorization: localStorage.getItem('idToken') } };
      instance.get('/admin/course', config)
        .then((res) => {
          console.log(res)
          res.data.forEach(item => {
            this.courseList.push({
              name: item.COURSE_NAME,
              introduction: item.INTRO,
              img:item.COVER,
              num: 100,
              id:item.ID,
              price:item.PRICE/100,
              status:item.COURSE_STATUS=="NOT_PUBLISH"
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
</script>

<style scoped>
  #courseManagement{
    width: 98%;
    margin: 0 auto;
  }
  #courseManagement .breadcrumb {
    background-color: #fff;
    color: #606266;
    margin-bottom: 0;
  }

  #courseManagement .first-floor {
    margin-top: 20px;
  }
  .floor-height{
    height: 350px;
  }

  #courseManagement .textBox {
    width: 180px;
    height: 32px;
    font-size: 12px;
    padding-left: 15px;
    border: 1px solid #409eff;
    border-radius: 5px;
    margin-left: 5px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  #courseManagement .textBox:focus {
    outline: none;
  }

  #courseManagement .textBox:hover {
    border-color: #409eff;
  }
  .btn-red{
    background-color: red !important;
  }

  #courseManagement .btn {
    background: #409eff;
    color: #fff;
    height: 30px;
    border-radius: 5px;
    font-size: 12px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  #courseManagement .btn:focus {
    outline: none;
    color: #fff;
  }

  #courseManagement .btn:hover {
    background: #66b1ff;
    color: #fff;
  }

  #courseManagement .btn-search {
    width: 54px;
  }

  #courseManagement .btn-clear {
    width: 88px;
  }
  #courseManagement .row{
    margin: 0;
  }
  #courseManagement .second-floor {
    width: 95%;
    margin: 0px auto;
  }
  #courseManagement .course {
    height: 300px;
  }
  #courseManagement .course-card {
    height: 250px;
    background-color: rgb(80, 118, 255);
    border-radius: 8px;
    margin-top: 20px;
    box-shadow: 0 10px 1rem rgba(0, 0, 0, 0.16);
    transition: All 0.4s ease-in-out;
    -webkit-transition: All 0.4s ease-in-out;
    -moz-transition: All 0.4s ease-in-out;
    -o-transition: All 0.4s ease-in-out;
  }

  #courseManagement .course-card:hover {
    transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -o-transform: scale(1.1);
    -ms-transform: scale(1.1);
  }

  #courseManagement .course-image {
    width: 100%;
    height: 100%;
    border-radius:8px; 
  }

  #courseManagement .course-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
  }

  #courseManagement .course-name {
    line-height: 20px;
  }
  .course-price{
    margin-top: 20px;
    display: inline-block;
    color: red;
    margin-right: 10px;
  }

  #courseManagement .course-detials {
    margin: 15px 5px 5px 0;
    background-color: #2fc27e;
  }

  #courseManagement .course-detials:hover {
    background-color: #2fc27dc7;
  }

  /*课程详情模态框*/
  #courseManagement .modal-list {
    width: 100%;
    min-height: 40px;
    line-height: 40px;
    clear: both;
    overflow:hidden;
  }

  #courseManagement .modal-list-title {
    margin: 0;
    width: 20%;
    text-align: right;
    display: block;
    float: left;
    line-height: 40px;
  }

  #courseManagement .modal-list-course {
    width: 70%;
    display: block;
    margin-left: 10px;
    float: left;
    line-height: 40px;
  }
</style>