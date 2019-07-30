<template>
  <div id="map">

    <div class="mustRead modal fade" id="myvideo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click='deletevideo()'>
              &times;
            </button>
          <div class="modal-body">
            <Media 
              :autoplay="false"
              :kind="'video'"
              :controls="true"
              :src = 'videosrc'
              style="height: 400px;width: 600px;"
              @pause='handle()'
            >
            </Media>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>
    <div
      class="mustRead modal fade"
      id="myModal"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      :style="mustRead"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <div class="leftBox">
            <p>Scratch Level 1|第{{coursedetail.chapter_num}}节课|{{coursedetail.chapter_name}}</p>
            <!-- <a href="#" data-toggle="modal" data-target="#myvideo"> -->
            <span data-toggle="modal" data-target="#myvideo" data-dismiss="modal">开始学习</span>
            <!-- </a> -->
          </div>
          <div class="rightBox">
            <p class="pro">课程介绍</p>
            <p class="pro-1">{{coursedetail.chapter_desc}}</p>
            <p class="pro-2" :style="warn">
              &nbsp;&nbsp;&nbsp;&nbsp;不要忘记交作业呀！!
              <br>&nbsp;&nbsp;&nbsp;&nbsp;1.点击视频右下方【我要做作业】
              <br>&nbsp;&nbsp;&nbsp;&nbsp;2.点击去发布，填写作品名称，选择封面后即可提交
            </p>
            <span @click="setCookie()">我要做作业</span>
            <p class="rightBoxp">
              <a :href="proready" target="_blank">预览讲义</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="introduction">
      <div class="introductionContent">
        <img :src="bgwhole">
        <div class="introductionList">
          <div
            :class="msg.flag==true?'active btn btn-primary btn-lg':''"
            :data-toggle="msg.flag==true?'modal':''"
            @click="transferdata(index)"
            data-target="#myModal"
            :style="msg.flag==true?active:inactive"
            v-for="(msg,index) in msgs"
            :key="index"
          >
            <p :class="msg.flag==true?'child':'nochild'">
              Scratch Level 1|第{{msg.chapter_num}}节课|{{msg.chapter_name}}
              <br>
              时间：{{msg.finish_time}}
              <br>
              <span>{{msg.state}}</span>
            </p>
          </div>
        </div>
        <div class="originContent">
          <div class="div">
            <img :src="person" alt class="renwu">
            <img :src="popwindow" alt class="tanchaung ani">
          </div>
        </div>
        <router-link to="/dashboard/" class="a1">返回课程表</router-link>
        <a href="javascript:void(0);" class="a2">进入列表模式</a>
      </div>
    </div>
    <div class="footerContent" :style="footer">
      <div class="footer">
        <ul>
          <li class="rightLi">
            <p class="p1">
              <img :src="banner" alt class="banner1">
              <span
                class="span1"
                style="color: rgb(255, 255, 255);"
              >Copyright@2018 备案号：京ICP备18041221号-1</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
</div>
</template>

<script>
import Media from '@dongido/vue-viaudio'

export default {
  name: "map",
  components: {
    Media
  },
  data() {
    return {
      //文字
      //鼠标悬停在灯上面显示的内容
      msgs: [],
      //点击灯弹出的模态框
      finish: 0,
      total: 0,
      isclick:false,
      // 图片
      bgwhole: this.$store.state.url + "scratch/bg.f0d850a.jpg",
      person: this.$store.state.url + "scratch/renwu.df78e0d.png",
      popwindow: this.$store.state.url + "scratch/2.png",
      banner: this.$store.state.url + "scratch/3.png",
      active: {
        backgroundImage:
          "url(" +
          require("../../../../../../static/images/scratch/coordinateed.6a1e9a5.png") +
          ")",
        backgroundRepeat: "no-repeat"
      },
      inactive: {
        backgroundImage:
          "url(" +
          require("../../../../../../static/images/scratch/coordinate.a15fa38.png") +
          ")",
        backgroundRepeat: "no-repeat"
      },
      footer: {
        backgroundImage:
          "url(" +
          require("../../../../../../static/images/scratch/background.92a3cde.png") +
          ")",
        backgroundRepeat: "no-repeat"
      },
      proready:
        "url(" +
        require("../../../../../../static/images/scratch/proready.jpg") +
        ") ",
      mustRead: {
        backgroundImage:
          "url(" +
          require("../../../../../../static/images/scratch/background.png") +
          ") ",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50%"
      },
      warn: {
        background:
          "url(" + require("../../../../../../static/images/scratch/warn.png") + ") ",
        backgroundRepeat: "no-repeat",
        backgroundSize: "12px"
      },
      returns: {
        background:
          "url(" +
          require("../../../../../../static/images/scratch/return.png") +
          ") ",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50%",
        backgroundSize: "cover"
      },
      coursedetail: {},
      videosrc:''
    };
  },
  methods: {
    getchapters(msg) {
      for (var i = 0; i < this.finish; i++) {
        msg.chapters[i].flag = true;
      }
      console.log(msg.chapters);
    },
    handle() {
      console.log('Video paused!, playing in 2 sec...')
      setTimeout( () => {
        this.$refs.coursevideo.play() 
      }, 2000)
    },
    transferdata(index) {
      console.log(index);
      this.coursedetail = this.msgs[index];
      this.videosrc=this.coursedetail.video_url;
      console.log(this.videosrc)
    },
    deletevideo(){
      this.videosrc=''
    },
    setCookie() {
      var data = {
          projectUrl: this.coursedetail.default_template,
          chapterId: "123",
          studentId: "0001"
      }
      document.cookie = "data=" + JSON.stringify(data);
      window.open("https://web-dev-onlineprograme.s3.us-east-2.amazonaws.com/build/index.html","_blank");
    }
  },
  
  created: function() {
    this.$http
      .get(
        "https://aogtavn4ul.execute-api.cn-northwest-1.amazonaws.com.cn/prod/student/courses/{id}/chapters"
      )
      .then(
        response => {
          console.log(response);
          this.messages = JSON.parse(response.bodyText);
          //this.msgs=response.bodyText.chapters;
          //this.msgs = this.messages.chapters
          this.finish = this.messages.finish_chapters.length;
          this.toal = this.messages.chapters.length;
          console.log(this.messages);
          this.getchapters(this.messages);
          this.msgs = this.messages.chapters;
          return response.json();
        },
        error => {
          console.log(error);
        }
      );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #e9e9e9;
}

div,
p,
span {
  word-wrap: break-word;
  word-break: break-all;
}

body,
div,
p,
span {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
  border: 0;
  outline: 0;
  font-family: Helvetica, Arial, sans-serif;
}

div {
  display: block;
}

body {
  background: #fff;
  color: #3c4145;
  border: 0;
  outline: 0;
  font-size: 14px;
}

em,
i {
  font-style: normal;
  font-weight: 400;
}

img {
  border: 0 !important;
  display: block;
}

.introduction {
  background: #2fd0ff;
  padding-top: 10px;
  padding-bottom: 40px;
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

.introductionList > div:first-child {
  right: 11%;
  bottom: 17%;
  z-index: 9;
}

.introductionList > div.active {
  /* background: url(../assets/scratch/coordinateed.6a1e9a5.png) no-repeat 50%;  */
  background-size: cover;
}

.introductionList > div {
  /* background: url(../assets/scratch/coordinate.a15fa38.png) no-repeat 50%; */
  background-size: cover;
  width: 8%;
  height: 15%;
  position: absolute;
}

.introductionList > div p {
  position: absolute;
  bottom: 54%;
  right: 10%;
  white-space: nowrap;
  font-size: 8px;
  background: #739cec;
  color: #fff;
  text-align: justify;
  padding: 6px 10px;
  box-shadow: 0 0 10px #1ed6f7;
  border: 1px solid #1756ca;
  display: none;
  z-index: 2;
  text-align: center;
  line-height: 16px;
}

.introductionList > div p span {
  font-size: 12px;
  width: 100%;
  text-align: center;
  display: inline-block;
  margin-top: 6px;
}

.introductionList > div:nth-child(2) {
  right: 21.8%;
  bottom: 24%;
  width: 5%;
  height: 11.6%;
}

.introductionList > div:nth-child(3) {
  right: 34.7%;
  bottom: 22%;
  width: 5%;
  height: 11.6%;
}

.introductionList div:hover .child {
  display: block;
}

.introductionList div:hover .nochild {
  display: block;
}

.btn-primary.active,
.btn-primary:active,
.open > .dropdown-toggle.btn-primary {
  color: transparent;
  background-color: transparent;
  border-color: transparent;
}

.btn.active,
.btn:active {
  background-image: none;
  outline: 0;
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0);
}

.introductionList > div:nth-child(4) {
  right: 47%;
  bottom: 18%;
}

.introductionList > div:nth-child(5) {
  left: 32.4%;
  bottom: 15%;
}

.introductionList > div p span {
  font-size: 12px;
  width: 100%;
  text-align: center;
  display: inline-block;
  margin-top: 6px;
}

.introductionList > div:nth-child(6) {
  left: 21.6%;
  bottom: 16%;
  width: 5%;
  height: 11.6%;
}

.introductionList > div:nth-child(7) {
  left: 10%;
  bottom: 23%;
  width: 5%;
  height: 11.6%;
}

.introductionList > div:nth-child(8) {
  left: 3.6%;
  bottom: 43%;
}

.introductionList > div:nth-child(9) {
  left: 13.6%;
  bottom: 60%;
  width: 5%;
  height: 11.6%;
}

.introductionList > div:nth-child(10) {
  left: 24.6%;
  bottom: 51%;
}

.introductionList > div:nth-child(11) {
  left: 52.8%;
  top: 54%;
  width: 5%;
  height: 11.6%;
}

.introductionList > div:nth-child(12) {
  left: 71.5%;
  top: 48%;
  width: 5%;
  height: 11.6%;
}

.introductionList > div:nth-child(13) {
  left: 70.5%;
  top: 25%;
}

.introductionList > div:nth-child(14) {
  left: 58.7%;
  top: 29%;
  width: 5%;
  height: 11.6%;
}

.introductionList > div:nth-child(15) {
  left: 43.7%;
  top: 29%;
  width: 5%;
  height: 11.6%;
}

.introductionList > div:nth-child(16) {
  left: 35.7%;
  top: 12%;
}

.introductionList > div:nth-child(17) {
  left: 59.7%;
  top: 6%;
  width: 5%;
  height: 11.6%;
}

.introductionList > div:nth-child(18) {
  left: 70.3%;
  top: 6%;
}

.introductionContent .originContent {
  width: 60px;
  height: 120px;
  position: absolute;
  right: 0;
  bottom: 0;
}

.introductionContent .originContent .div {
  position: relative;
}

div,
p,
span {
  word-wrap: break-word;
  word-break: break-all;
}

.introductionContent img {
  margin: 0 auto;
  width: 100%;
}

.introductionContent .originContent .div .tanchaung {
  width: 120px;
  position: absolute;
  right: 55px;

  animation: ani 3s infinite;
  animation-duration: 3s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-name: ani;

  top: 10px;
}

.introductionContent img {
  margin: 0 auto;
  width: 100%;
}

.introductionContent > .a1,
.introductionContent > .a2 {
  position: absolute;
  top: 10px;
  width: 120px;
  text-align: center;
  line-height: 30px;
  height: 30px;
  color: #fff;
  background: #22a0ff;
  border-radius: 6px;
}

.introductionContent > .a1 {
  left: 10px;
}

.introductionContent > .a2 {
  right: 10px;
}

.footerContent {
  width: 100%;
  /* background-image: url(../assets/scratch/background.92a3cde.png); */
  background-size: 100% 100%;
}

.footerContent .footer {
  padding: 60px 0;
  max-width: 1200px;
  min-width: 700px;
  margin: 0 auto;
}

li,
ol,
ul {
  list-style: none;
  list-style-type: none;
}

.footerContent .footer .rightLi {
  margin: 0 auto;
}

.footerContent .footer .rightLi .p1 {
  display: table;
  width: 100%;
  position: relative;
}

.footerContent .footer .rightLi p {
  text-align: center;
}

.footerContent .footer .rightLi .p1 .banner1 {
  max-height: 32px;
  width: auto;
  float: left;
  max-width: 40%;
  display: block;
  margin: 0 auto;
}

.footerContent .footer .rightLi .p1 .span1 {
  position: absolute;
  right: 0;
  bottom: 0;
  margin-top: 16px;
}

.close {
  float: right;
  font-size: 25px;
  font-weight: 1000;
  line-height: 2;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  margin-right: -30px;
  filter: alpha(opacity=20);
  opacity: 0.5;
}

.mustRead {
  width: 660px;
  position: fixed;
  height: 400px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-size: cover;
  padding: 0;
}

div,
p,
span {
  word-wrap: break-word;
  word-break: break-all;
}

* {
  box-sizing: border-box;
  border: 0;
  outline: 0;
  font-family: Helvetica, Arial, sans-serif;
}

.leftBox {
  width: 290px;
  float: left;
  position: relative;
  height: 100%;
  margin: 0;
  padding: 0;
}

.leftBox p {
  color: #fff;
  text-align: center;
  font-size: 18px;
  padding: 33px 10px 0;
  margin: 0;
}

.leftBox span {
  cursor: pointer;
  display: block;
  width: 120px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: #fff;
  color: #22a0ff;
  border-radius: 6px;
  position: absolute;
  bottom: -280px;
  left: 27%;
  margin-left: -60px;
  margin: 0;
  padding: 0;
}

.rightBox {
  width: 330px;
  float: right;
  padding-left: 26px;
  position: relative;
  height: 100%;
  margin: 0;
  padding: 0;
}

.rightBox p.pro {
  padding-top: 37px;
  font-size: 14px;
  color: #22a0ff;
  margin-top: -45px;
  margin-left: 60px;
  padding: 0;
}

.rightBox p.pro-1 {
  padding: 8px 16px;
  text-align: justify;
  background: #e3f3ff;
  font-size: 13px;
  margin-left: 52px;
  margin-top: 10px;
  border-radius: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  overflow: auto;
  height: 160px;
  line-height: 20px;
  color: #22a0ff;
  margin-top: 5px;
}

.rightBox p.pro-2 {
  color: red;
  padding-left: 16px;
  font-size: 12px;
  background: left 5px;
  line-height: 24px;
  margin-left: 50px;
  margin-top: 2px;
  padding: 0;
}

div.rightBox span {
  background: #22a0ff;
  color: #fff;
  cursor: pointer;
  display: block;
  width: 120px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 6px;
  position: absolute;
  bottom: -30px;
  left: 35%;
  margin-left: -60px;
  margin: 0;
  padding: 0;
}

.rightBox p.rightBoxp {
  display: block;
  width: 120px;
  position: absolute;
  bottom: -60px;
  font-size: 12px;
  left: 35%;
  margin-left: -60px;
  color: #22a0ff;
  margin: 0;
  padding: 0;
}

.rightBox .rightBoxp a {
  color: #22a0ff;
  display: block;
  text-align: center;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
}

.mustRead span.span {
  width: 14px;
  height: 14px;
  display: block;
  position: absolute;
  right: -40px;
  top: 14px;
  cursor: pointer;
  padding: 0;
}
/*视频*/
.video-js{
  height: 400px;
  width: 600px;
}
.vjs-tech{
  height: auto;
  width: 100%;
}
</style>