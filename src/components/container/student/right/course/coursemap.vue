<template>
  <div id="course-map">
    <div class="introduction" :style="screenHeight">
      <div class="introductionContent">
        <img :src="mapUrl" />
        <div class="introductionList">
          <div class="course-btn" v-for="(point,index) in pointList" :key="index"
            :style="{width:point.width,height:point.height,bottom:point.bottom,right:point.right}"
            @click="gotoStudy(index)">
            <div>
              <img :src="point.bgImg" class="btn-img" />
            </div>
            <div class="chapter-intro">
              <p class="intro">{{courseName}}| 第{{point.number}}课 | {{point.name}}</p>
              <p class="intro">{{point.status}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="goback-btn" @click="gotoCourseList">返回课程列表</button>
    <!-- 开始学习对话框 -->
    <el-dialog :visible.sync="studyDialogVisible" width="50%" @close="studyDialogClosed">
      <div class="study-back">
        <div class="left-box">
          <div class="box-title">
            <p>{{courseName}}| 第{{courseNum}}节课 | {{chapterName}}</p>
          </div>
          <button class="study-btn">开始学习</button>
        </div>
        <div class="right-box" v-if='role!=0'>
          <p class="course-intro">课程介绍</p>
          <p class="intro-detials">{{courseIntro}}</p>
          <p class="course-warn">
            不要忘记交作业呀！
            <br />1.点击下方【我要做作业】，填写名称和描述，上传作业文件、封面，即可提交
            <br />2.点击我的首页【开始创作】，进入scratch页面
          </p>
          <router-link class="work-btn"
            :to="{name:'addHomework',query:{chapterId:chapterId,courseId:this.courseId,chapterName:chapterName}}">
            我要做作业
          </router-link>
          <p class="preview">预览讲义</p>
        </div>
        <div class="right-box" v-if='role==0'>
          <p class="course-intro">课程介绍</p>
          <p class="intro-detials">{{courseIntro}}</p>
          <button class="work-btn">预览讲义</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        mapUrl: this.$store.state.url + "scratch/bg.f0d850a.jpg",
        studyDialogVisible: false,
        chapterName: "",
        courseIntro: "",
        courseNum: "",
        videosrc: "",
        template: '',
        chapterId: "",
        scratch: '',
        role: 0,
        i: 0
      }
    },
    created() {
      this.courseId = this.$route.query.id;
      this.screenHeight = "min-height:" + (this.height - 56) + "px;";
      this.$store.commit("updateLoading", true);
      this.$store.dispatch("getCourseDetail", this.$route.query.id);
    },
    methods: {
      gotoStudy(index) {
        this.i = index;
        this.chapterName = this.pointList[index].name;
        this.courseIntro = this.pointList[index].description;
        this.courseNum = this.pointList[index].number;
        this.videosrc = this.pointList[index].videoSrc;
        this.template = this.pointList[index].templateSrc;
        this.chapterId = this.pointList[index].chapterId;
        if (this.pointList[index].flag !== true) {
          return
        }
        this.studyDialogVisible = true
        let token = window.localStorage.getItem("idToken")
        this.scratch = this.baseScratch + '?chapterId=' + this.chapterId + '&&courseId=' + this.courseId +
          '&&chapterName=' + this.chapterName + '&&token=' + token + '&&userName=' + this.userName;
      },
      studyDialogClosed() {
        this.chapterName = ''
        this.courseIntro = ''
        this.courseNum = ''
        this.videosrc = ''
        this.template = ''
        this.chapterId = ''
        this.i = 0
        this.scratch = ''
        this.studyDialogVisible = false
      },
      gotoCourseList() {
        this.$router.push({ path: "/dashboard/class" });
      }
    },
    computed: {
      ...mapState({
        pointList: state => state.pointList,
        courseName: state => state.courseName,
        baseScratch: state => state.scratch
      }),
    }
  }
</script>

<style scoped>
  #course-map {
    background: #2fd0ff;
  }

  .introduction {
    width: 100%;
    margin: 0 auto;
  }

  img {
    border: 0 !important;
    display: block;
  }

  .introductionContent {
    max-width: 1200px;
    min-width: 700px;
    margin: 0 auto;
    position: relative;
  }

  .introductionContent img {
    margin: 0 auto;
    width: 100%;
  }

  .introductionList {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  .course-btn {
    position: absolute;
  }

  .btn-img {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .chapter-intro {
    position: absolute;
    width: 280px;
    height: 68px;
    background-color: #82551d;
    box-shadow: 0 0 10px #ec491d;
    bottom: 54%;
    right: 0%;
    border: 1px solid red;
    font-size: 8px;
    z-index: 10;
    visibility: hidden;
  }

  .course-btn:hover .chapter-intro {
    visibility: visible;
  }

  .intro {
    text-align: center;
    width: 95%;
    margin: 10px auto;
    color: #fff;
  }

  .goback-btn {
    border: 0;
    position: absolute;
    top: 100px;
    left: 50px;
    width: 120px;
    text-align: center;
    line-height: 15px;
    height: 30px;
    color: #fff;
    background: #22a0ff;
    border-radius: 6px;
  }

  /* 开始学习对话框 */
  .study-back {
    background: url("../../../../../../static/images/scratch/background.png") no-repeat;
    background-size: cover;
    height: 400px;
    width: 100%;
    margin: -20px -20px -30px -20px;
  }

  .left-box {
    float: left;
    width: 47%;
    height: 100%;
    text-align: center;
  }

  .right-box {
    float: right;
    width: 50%;
    height: 100%;
    text-align: center;
  }

  .box-title {
    width: 80%;
    height: 100px;
    text-align: center;
    font-size: 18px;
    margin: 0 auto;
    padding-bottom: 240px;
    color: #fff;
  }

  .study-btn {
    width: 120px;
    height: 30px;
    line-height: 25px;
    text-align: center;
    background: #fff;
    color: #22a0ff;
    border-radius: 6px;
  }

  .course-intro {
    width: 100%;
    font-size: 14px;
    color: #22a0ff;
    text-align: left;
  }

  .intro-detials {
    width: 100%;
    text-align: left;
    background: #e3f3ff;
    font-size: 12px;
    margin-top: 10px;
    border-radius: 6px;
    min-height: 100px;
    line-height: 25px;
    padding: 10px;
    color: #22a0ff;
    overflow-y: auto;
  }

  .course-warn {
    font-size: 12px;
    width: 100%;
    text-align: left;
    line-height: 25px;
    color: red;
  }

  .work-btn {
    padding: 5px;
    font-size: 12px;
    line-height: 35px;
    text-align: center;
    background: #22a0ff;
    color: #fff;
    border-radius: 6px;
    border: none;
  }

  .preview {
    width: 100%;
    font-size: 12px;
    color: #22a0ff;
    cursor: pointer;
  }
</style>