<template>
  <div class="course-management">
    <!-- 课程详情模态框-->
    <div
      class="modal fade"
      id="detials"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
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
              <span
                class="modal-list-course"
              >{{courseIntro}}</span>
            </div>
            <div class="modal-list">
              <h5 class="modal-list-title">上课人数:</h5>
              <span class="modal-list-course">{{courseNum}}人</span>
            </div>
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
      <label for="class-name"></label>
      <input type="text" placeholder="请输入课程账号" class="textBox" id="class-name" />
      <button class="btn btn-search">搜索</button>
      <button class="btn btn-clear" @click="addCourse">新增课程</button>
    </div>
    <div class="second-floor row">
      <div class="course col-md-4" v-for="(course,index) in courseList" :key="index" @click="gotoChapter(index)">
        <div class="course-card">
          <img src="../../../../../static/images/index/amoeba-blue.png" class="course-image" />
        </div>
        <div class="course-title">
          <h3 class="course-name">{{course.name}}</h3>
          <button class="course-detials btn" data-toggle="modal" data-target="#detials" @click="courseDetials(index)">详情</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      courseList: [
        {
          name: "专为程序员统计课",
          introduction:
            "这是一门市面上很难找到的统计学课程，特别之处在于：课程不止是将统计学的内容讲的清晰完整，而且在各个章节中，加入了编程的部分，更有助于程序员理解统计学。课程将深入浅出地讲解统计学的重要概念和知识点，让同学们彻底学会统计分析。是一门机器学习工程师、数据挖掘工程师、数据分析师等前沿职位必须掌握的统计学课程。",
          num: 100
        },
        {
          name: "专为程序员设计计课",
          introduction:
            "这是一门市面上很难找到的统计学课程，特别之处在于：课程不止是将统计学的内容讲的清晰完整，而且在各个章节中，加入了编程的部分，更有助于程序员理解统计学。课程将深入浅出地讲解统计学的重要概念和知识点，让同学们彻底学会统计分析。是一门机器学习工程师、数据挖掘工程师、数据分析师等前沿职位必须掌握的统计学课程。",
          num: 99
        },
        {
          name: "专为员设计的统计课",
          introduction:
            "这是一门市面上很难找到的统计学课程，特别之处在于：课程不止是将统计学的内容讲的清晰完整，而且在各个章节中，加入了编程的部分，更有助于程序员理解统计学。课程将深入浅出地讲解统计学的重要概念和知识点，让同学们彻底学会统计分析。是一门机器学习工程师、数据挖掘工程师、数据分析师等前沿职位必须掌握的统计学课程。",
          num: 1000
        },
      ],
      courseName:"",
      courseIntro:"",
      courseNum:0,
    };
  },
  methods:{
      courseDetials(index){
          this.courseName=this.courseList[index].name;
          this.courseIntro=this.courseList[index].introduction;
          this.courseNum=this.courseList[index].num;
      },
      addCourse(){
        this.$router.push({ path: '/Admin/courseManagement/addCourse' })
      },
      gotoChapter(index){
        this.$router.push({ path: '/Admin/chapterManagement/'+ this.courseList[index].name})
      }
  }
};
</script>

<style>
.course-management {
  min-width: 1400px;
  width: 98%;
  margin: 0 auto;
}
.breadcrumb {
  background-color: #fff;
  color: #606266;
  margin-bottom: 0;
}
.first-floor {
  margin-top: 20px;
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
  color: #fff;
}

.btn:hover {
  background: #66b1ff;
  color: #fff;
}

.btn-search {
  width: 54px;
}

.btn-clear {
  width: 88px;
}
.second-floor {
  width: 95%;
  margin: 20px auto;
}
.course {
  margin-right: 40px;
  width: 30%;
  height: 300px;
}
.course-card {
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
.course-card:hover {
  transform: scale(1.1);
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
}
.course-image {
  width: 100%;
  height: 100%;
}
.course-title {
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.course-name {
  display: inline-block;
  width: 85%;
  line-height: 20px;
}
.course-detials {
  background-color: #2fc27e;
  margin-bottom: 5px;
}
.course-detials:hover {
  background-color: #2fc27dc7;
}
/*课程详情模态框*/
.modal-list {
  width: 100%;
  height: 40px;
  line-height: 40px;
  clear: both;
}
.modal-list-title {
  margin: 0;
  width: 20%;
  text-align: right;
  display: block;
  float: left;
  line-height: 40px;
}
.modal-list-course {
  width: 70%;
  display: block;
  margin-left: 10px;
  float: left;
  line-height: 40px;
}
</style>

