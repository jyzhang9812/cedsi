<template>
  <div id="coursemap">
    <!-- 模态框（Modal） -->
    <div class="modal fade" id="goStudy" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content bckimg">
          <div class="modal-header header-height">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          </div>
          <div class="modal-body modal-box">
            <div class="left-box">
              <div class="box-title">
                <p>{{courseName}}| 第{{courseNum}}节课 | {{chapterName}}</p>
              </div>
              <button class="study-btn" data-toggle="modal" data-target="#myVideo" @click="gotoStudy(i)">开始学习</button>
            </div>
            <div class="right-box">
              <p class="course-intro">课程介绍</p>
              <p class="intro-detials">{{courseIntro}}</p>
              <p class="course-warn">
                不要忘记交作业呀！
                <br />1.点击视频右下方【我要做作业】
                <br />2.点击去发布，填写作品名称，选择封面后即可提交
              </p>
              <a class="work-btn" href="http://52.83.135.166:8601/">我要做作业</a>
              <p class="preview">预览讲义</p>
            </div>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
    <div class="modal fade" id="myVideo" ref='myVideo' tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content video-bck">
          <div class="modal-header header-height">
            <span class="video-name">{{courseName}}| 第{{courseNum}}节课 | {{chapterName}}</span>
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"
              @click="deletevideo">&times;</button>
          </div>
          <div class="modal-body modal-box">
            <Media :autoplay="false" :kind="'video'" :controls="true" :src="videosrc"
              style="height: 400px;width: 700px;" @pause="handle()"></Media>
          </div>
        </div>
      </div>
    </div>
    <div class="introduction" :style="screenHeight">
      <div class="introductionContent">
        <img :src="mapUrl" />
        <div class="introductionList">
          <div class="course-btn" v-for="(point,index) in pointList" :key="index"
            :style="{width:point.width,height:point.height,bottom:point.bottom,right:point.right}"
            @click="gotoStudy(index)" :data-toggle="point.flag==true?'modal':''" data-target="#goStudy">
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
    <button class="btn goback-btn" @click="gotoCourseList">返回课程列表</button>
  </div>
</template>

<script>
  import Media from "@dongido/vue-viaudio";
  import globalAxios from "axios";
  export default {
    data() {
      return {
        mapUrl: this.$store.state.url + "scratch/bg.f0d850a.jpg",
        courseIntro: "",
        courseNum: "",
        videosrc: "",
        chapterName: "",
        i:0,
      };
    },
    methods: {
      gotoStudy(index) {
        this.i = index
        this.chapterName = this.pointList[index].name;
        this.courseIntro = this.pointList[index].description;
        this.courseNum = this.pointList[index].number;
        this.videosrc = this.pointList[index].videoSrc;
        console.log(this.videosrc)
      },
      handle() {
        console.log("Video paused!, playing in 2 sec...");
        setTimeout(() => {
          this.$refs.coursevideo.play();
        }, 2000);
      },
      deletevideo() {
        this.videosrc = "";
      },
      gotoCourseList() {
        this.$router.push({ path: "/dashboard/class" });
      },
    },
    created: function () {
      this.screenHeight = "min-height:" + (this.height - 56) + "px;";
      this.$store.commit('updateLoading', true)
      this.$store.dispatch('getCourseDetail', this.$route.query.id)
    },
    computed: {
      courseName: function (state) {
        return this.$store.state.courseName
      },
      pointList: function (state) {
        return this.$store.state.pointList
      },
    },
  };
</script>

<style scoped>
  #coursemap {
    background: #2fd0ff;
  }

  #coursemap .introduction {
    width: 100%;
    margin: 0 auto;
  }

  #coursemap img {
    border: 0 !important;
    display: block;
  }

  #coursemap .introductionContent {
    max-width: 1200px;
    min-width: 700px;
    margin: 0 auto;
    position: relative;
  }

  #coursemap .introductionContent img {
    margin: 0 auto;
    width: 100%;
  }

  #coursemap .introductionList {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  #coursemap .course-btn {
    position: absolute;
  }

  #coursemap .btn-img {
    position: relative;
    width: 100%;
    height: 100%;
  }

  #coursemap .chapter-intro {
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

  #coursemap .course-btn:hover .chapter-intro {
    visibility: visible;
  }

  #coursemap .intro {
    text-align: center;
    width: 95%;
    margin: 10px auto;
    color: #fff;
  }

  #coursemap .goback-btn {
    position: absolute;
    top: 100px;
    left: 50px;
    width: 120px;
    text-align: center;
    line-height: 15px;
    height: 30px;
    color: #fff;
    background: #22A0FF;
    border-radius: 6px;
  }

  #coursemap .goback-btn:hover {
    color: #fff;
  }

  #coursemap .goback-btn:active {
    color: #fff;
    outline: none;
  }

  /*开始学习模态框*/
  #coursemap .btn:active {
    outline: none;
  }

  #coursemap .bckimg {
    background: url("../../../../../../static/images/scratch/background.png") no-repeat;
    background-size: cover;
    height: 400px;
    width: 660px;
  }

  #coursemap .video-bck {
    height: 400px;
    width: 700px;
  }

  #coursemap .video-name {
    margin-bottom: 10px;
    display: inline-block;
  }

  #coursemap .header-height {
    height: 20px;
    border: none;
  }

  #coursemap .modal-box {
    width: 100%;
    height: 320px;
    padding: 0;
  }

  #coursemap .left-box {
    float: left;
    width: 47%;
    height: 100%;
    text-align: center;
  }

  #coursemap .box-title {
    width: 80%;
    height: 100px;
    text-align: center;
    font-size: 18px;
    margin: 0 auto;
    padding-bottom: 290px;
    color: #fff;
  }

  #coursemap .study-btn {
    width: 120px;
    height: 30px;
    line-height: 25px;
    text-align: center;
    background: #fff;
    color: #22a0ff;
    border-radius: 6px;
  }

  #coursemap .right-box {
    float: left;
    width: 53%;
    height: 100%;
    text-align: center;
    padding-left: 20px;
    padding-right: 20px;
  }

  #coursemap .course-intro {
    width: 100%;
    font-size: 14px;
    color: #22a0ff;
    text-align: left;
  }

  #coursemap .intro-detials {
    width: 100%;
    text-align: left;
    background: #e3f3ff;
    font-size: 12px;
    margin-top: 10px;
    border-radius: 6px;
    height: 165px;
    line-height: 25px;
    padding: 10px;
    color: #22a0ff;
    overflow-y: auto;
  }

  #coursemap .course-warn {
    font-size: 12px;
    width: 100%;
    text-align: left;
    line-height: 25px;
    color: red;
  }

  #coursemap .work-btn {
    padding: 5px;
    font-size: 12px;
    line-height: 25px;
    text-align: center;
    background: #22a0ff;
    color: #fff;
    border-radius: 6px;
    border: none;
  }

  #coursemap .preview {
    width: 100%;
    font-size: 12px;
    color: #22a0ff;
    cursor: pointer;
  }

  /*视频*/
  #coursemap .video-js {
    height: 600px;
    width: 800px;
  }

  #coursemap .vjs-tech {
    height: auto;
    width: 100%;
  }
</style>