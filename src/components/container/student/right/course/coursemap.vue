<template>
  <div class="coursemap">
    <!-- 模态框（Modal） -->
    <div
      class="modal fade"
      id="goStudy"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content bckimg">
          <div class="modal-header header-height">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          </div>
          <div class="modal-body modal-box">
            <div class="left-box">
              <div class="box-title">
                <p>Scratch Level 1| 第{{courseNum}}节课 | {{courseName}}</p>
              </div>
              <button class="study-btn" data-toggle="modal" data-target="#myVideo">开始学习</button>
            </div>
            <div class="right-box">
              <p class="course-intro">课程介绍</p>
              <p class="intro-detials">{{courseIntro}}</p>
              <p class="course-warn">
                不要忘记交作业呀！
                <br />1.点击视频右下方【我要做作业】
                <br />2.点击去发布，填写作品名称，选择封面后即可提交
              </p>
              <button class="work-btn">我要做作业</button>
              <p class="preview">预览讲义</p>
            </div>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
    <div
      class="modal fade"
      id="myvideo"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-content">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
              @click="deletevideo()"
            >&times;</button>
            <div class="modal-body">
              <Media
                :autoplay="false"
                :kind="'video'"
                :controls="true"
                :src="videosrc"
                style="height: 400px;width: 600px;"
                @pause="handle()"
              ></Media>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal -->
      </div>
    </div>
    <div class="introduction" :style="screenHeight">
      <div class="introductionContent">
        <img :src="mapUrl" />
        <div class="introductionList">
          <div
            class="course-btn"
            v-for="(point,index) in pointList"
            :key="index"
            :style="{width:point.width,height:point.height,bottom:point.bottom,right:point.right}"
            @click="gotoStudy(index)"
            :data-toggle="point.flag==true?'modal':''"
            data-target="#goStudy"
          >
            <div>
              <img :src="point.bgImg" class="btn-img" />
            </div>
            <div class="chapter-intro">
              <p class="intro">Scratch Level 1| 第{{point.number}}课 | {{point.name}}</p>
              <p class="intro">{{point.status}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Media from "@dongido/vue-viaudio";
import globalAxios from "axios";
export default {
  data() {
    return {
      mapUrl: this.$store.state.url + "scratch/bg.f0d850a.jpg",
      pointList: [
        {
          width: "8%",
          height: "15%",
          bottom: "15%",
          right: "9%",
          bgImg: "",
          status: "",
          description: "",
          number: "",
          name: "",
          flag: false
        },
        {
          width: "8%",
          height: "15%",
          bottom: "22%",
          right: "20%",
          bgImg: "",
          status: "",
          description: "",
          number: "",
          name: "",
          flag: false
        },
        {
          width: "7%",
          height: "12%",
          bottom: "18%",
          right: "35%",
          bgImg: "",
          status: "",
          description: "",
          number: "",
          name: "",
          flag: false
        },
        {
          width: "8%",
          height: "15%",
          bottom: "15%",
          right: "50%",
          bgImg: "",
          status: "",
          description: "",
          number: "",
          name: "",
          flag: false
        },
        {
          width: "7%",
          height: "12%",
          bottom: "15%",
          right: "60%",
          bgImg: "",
          status: "",
          description: "",
          number: "",
          name: "",
          flag: false
        },
        {
          width: "7%",
          height: "12%",
          bottom: "15%",
          right: "70%",
          bgImg: "",
          status: "",
          description: "",
          number: "",
          name: "",
          flag: false
        },
        {
          width: "8%",
          height: "15%",
          bottom: "20%",
          right: "80%",
          bgImg: "",
          status: "",
          description: "",
          number: "",
          name: "",
          flag: false
        },
        {
          width: "7%",
          height: "12%",
          bottom: "45%",
          right: "88%",
          bgImg: "",
          status: "",
          description: "",
          number: "",
          name: "",
          flag: false
        },
        {
          width: "8%",
          height: "15%",
          bottom: "60%",
          right: "80%",
          bgImg: "",
          status: "",
          description: "",
          number: "",
          name: "",
          flag: false
        },
        {
          width: "7%",
          height: "12%",
          bottom: "50%",
          right: "67%",
          bgImg: "",
          status: "",
          description: "",
          number: "",
          name: "",
          flag: false
        },
        {
          width: "7%",
          height: "12%",
          bottom: "35%",
          right: "50%",
          bgImg: "",
          status: "",
          description: "",
          number: "",
          name: "",
          flag: false
        },
        {
          width: "8%",
          height: "15%",
          bottom: "40%",
          right: "20%",
          bgImg: "",
          status: "",
          description: "",
          number: "",
          name: "",
          flag: false
        },
        {
          width: "7%",
          height: "12%",
          bottom: "60%",
          right: "21%",
          bgImg: "",
          status: "",
          description: "",
          number: "",
          name: "",
          flag: false
        },
        {
          width: "8%",
          height: "15%",
          bottom: "60%",
          right: "35%",
          bgImg: "",
          status: "",
          description: "",
          number: "",
          name: "",
          flag: false
        },
        {
          width: "7%",
          height: "12%",
          bottom: "60%",
          right: "50%",
          bgImg: "",
          status: "",
          description: "",
          number: "",
          name: "",
          flag: false
        },
        {
          width: "7%",
          height: "12%",
          bottom: "72%",
          right: "57%",
          bgImg: "",
          status: "",
          description: "",
          number: "",
          name: "",
          flag: false
        },
        {
          width: "8%",
          height: "15%",
          bottom: "80%",
          right: "40%",
          bgImg: "",
          status: "",
          description: "",
          number: "",
          name: "",
          flag: false
        },
        {
          width: "8%",
          height: "15%",
          bottom: "80%",
          right: "20%",
          bgImg: "",
          status: "",
          description: "",
          number: "",
          name: "",
          flag: false
        }
      ],
      courseName: "",
      courseIntro: "",
      courseNum: "",
      videosrc: ""
    };
  },
  methods: {
    gotoStudy(index) {
      this.courseName = this.pointList[index].name;
      this.courseIntro = this.pointList[index].description;
      this.courseNum = this.pointList[index].number;
    },
    handle() {
      console.log("Video paused!, playing in 2 sec...");
      setTimeout(() => {
        this.$refs.coursevideo.play();
      }, 2000);
    },
    deletevideo() {
      this.videosrc = "";
    }
  },
  created: function() {
    this.screenHeight = "min-height:" + (this.height - 56) + "px;";
    var token = window.localStorage.getItem("idToken");
    var arr =
      "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/student/courses/111/chapters";
    globalAxios
      .get(arr, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      })
      .then(
        response => {
          var chaptersArr = response.data.chapters;
          var finishChaptersArr = response.data.finish_chapters;
          for (var i = 0; i < chaptersArr.length; i++) {
            if (i < finishChaptersArr.length) {
              this.pointList[i].bgImg =
                "../../../../../../static/images/scratch/coordinateed.6a1e9a5.png";
              this.pointList[i].status = "已完成";
              this.pointList[i].flag = true;
            } else {
              this.pointList[i].bgImg =
                "../../../../../../static/images/scratch/coordinate.a15fa38.png";
              this.pointList[i].status = "未解锁";
            }
            this.pointList[i].description = chaptersArr[i].CP_DESCRIPTION;
            this.pointList[i].number = chaptersArr[i].CP_NUMBER;
            this.pointList[i].name = chaptersArr[i].CP_NAME;
          }
        },
        error => {
          console.log(error);
        }
      );
  }
};
</script>
<style>
.coursemap {
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
/*开始学习模态框*/
.btn:active{
  outline: none;
}
.bckimg {
  background: url("../../../../../../static/images/scratch/background.png")
    no-repeat;
  background-size: cover;
  height: 400px;
  width: 660px;
}
.header-height {
  height: 20px;
  border: none;
}
.modal-box {
  width: 100%;
  height: 320px;
  padding: 0;
}
.left-box {
  float: left;
  width: 47%;
  height: 100%;
  text-align: center;
}
.box-title {
  width: 80%;
  height: 100px;
  text-align: center;
  font-size: 18px;
  margin: 0 auto;
  padding-bottom: 290px;
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
.right-box {
  float: left;
  width: 53%;
  height: 100%;
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
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
  height: 165px;
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
  width: 120px;
  height: 30px;
  line-height: 25px;
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
/*视频*/
.video-js {
  height: 400px;
  width: 600px;
}
.vjs-tech {
  height: auto;
  width: 100%;
}
</style>