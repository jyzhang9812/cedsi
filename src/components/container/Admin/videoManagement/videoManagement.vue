<template>
  <div class="body">
    <div
      class="modal fade"
      id="myVideo"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content modal-width">
          <div class="modal-header video-header">
            <span class="video-name">{{videoName}}</span>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
              @click="deletevideo"
            >&times;</button>
          </div>
          <div class="modal-body modal-padding">
            <Media
              :autoplay="false"
              :kind="'video'"
              :controls="true"
              :src="videosrc"
              style="height: 400px;width: 698px;"
              @pause="handle()"
            ></Media>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="updateVideo"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header border-none">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">编辑视频</h4>
          </div>
          <div class="modal-body video-content">
            <div class="row text-video">
              <div class="col-md-3 text-padding">视频名称:</div>
              <input class="col-md-9 video-input" v-model="videoName" />
            </div>
            <div class="row">
              <div class="col-md-3 text-padding">视频简介:</div>
              <textarea class="col-md-9 text-box" v-model="videoDesc"></textarea>
            </div>
          </div>
          <div class="modal-footer border-none">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submit()">确定</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
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
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">提示</h4>
          </div>
          <div class="modal-body">
            <div class="altercontent" aria-hidden="true">
              <img :src="alterimg" class="alterimg" />
              <span>{{alterMes}}</span>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="submitDelete()"
            >确定</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
    <div class="course-nav">
      <button
        v-for="(course,index) in courseList"
        :key="index"
        :class="course.isActive==true?'course-active-btn course-btn':'course-inactive-btn course-btn'"
        @click="changeCourse(index)"
      >{{course.name}}</button>
    </div>
    <div>
      <button class="btn btn-clear" @click="gotoUpload">上传视频</button>
    </div>
    <div class="outside">
      <span v-if="error"></span>
      <table class="table table-hover" v-if="error">
        <thead>
          <tr>
            <th v-for="(th, index) in tableTitle" :key="index" class="title">{{th}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(video, seq) in currentList" :key="seq" class="content">
            <td>{{seq + 1}}</td>
            <td>{{video.videoName}}</td>
            <td>第{{video.chapterNum}}章&nbsp;{{video.chapterName}}</td>
            <td style="width:400px">{{video.introduction}}</td>
            <td>{{video.date}}</td>
            <td>{{video.uploadAdmin}}</td>
            <td>
              <span
                class="blue"
                @click="previewVideo(seq)"
                data-toggle="modal"
                data-target="#myVideo"
              >预览</span>&nbsp;&nbsp;
              <span
                class="blue"
                data-toggle="modal"
                data-target="#updateVideo"
                @click="updateVideo(seq)"
              >编辑</span>&nbsp;&nbsp;
              <span class="red" data-toggle="modal" data-target="#alterModal" @click="deleteVideoMes(seq)">删除</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <pagination :num="videoData.length" @getNew="changeTablePages" :limit="limit"></pagination>
    </div>
  </div>
</template>

<script>
import Media from "@dongido/vue-viaudio";
import { mapState } from "vuex";
import globalAxios from "axios";

export default {
  name: "videos",
  data() {
    return {
      tableTitle: [
        "序号",
        "视频名称",
        "章节名称",
        "操作说明",
        "上传时间",
        "创建人",
        "操作"
      ],
      error: true,
      index: -1,
      videosrc: "",
      videoName: "",
      currentPage: 0,
      videoData: [],
      videoDesc: "",
      //提示框
      alterimg: "../../../../static/images/organization/alter.png",
      alterMes: "",
    };
  },

  methods: {
    deleteVideoMes(seq) {
      this.index = this.currentPage * this.limit + seq;
      this.videoId= this.videoData[this.index].videoId;
      this.alterMes = "确认删除吗？";
    },
    submitDelete(){
      var courseId="";
      var chapterId=this.videoData[this.index].chapterId;
      var token = window.localStorage.getItem("idToken");
      //console.log(this.courseList);
      for(var i=0;i<this.courseList.length;i++){
        if(this.courseList[i].isActive==true){
          courseId=this.courseList[i].id;
          break;
        }          
      }
      //console.log(courseId)
      globalAxios
        .delete(
          "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/admin/course/"+courseId+"/video?videoId="+this.videoId+"&chapterId="+chapterId,
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
            this.videoData.splice(this.index, 1);
            this.changeTablePages(this.currentPage * this.limit);
          },
          error => {}
        );
    },
    previewVideo(seq) {
      this.index = this.currentPage * this.limit + seq;
      this.videosrc = this.videoData[this.index].videoUrl;
      this.videoName = this.videoData[this.index].videoName;
      //window.location.href = this.videosrc;
    },
    updateVideo(seq) {
      this.index = this.currentPage * this.limit + seq;
      this.videoDesc = this.videoData[this.index].introduction;
      this.videoName = this.videoData[this.index].videoName;
      this.videoId= this.videoData[this.index].videoId;
      //window.location.href = this.videosrc;
    },
    //编辑视频确认提交
    submit() {
      var courseId="";
      var postVideo={};
      postVideo.videoName=this.videoName;
      postVideo.videoDesc=this.videoDesc;
      var token = window.localStorage.getItem("idToken");
      //console.log(this.courseList);
      for(var i=0;i<this.courseList.length;i++){
        if(this.courseList[i].isActive==true){
          courseId=this.courseList[i].id;
          break;
        }          
      }
      //console.log(courseId)
      globalAxios
        .put(
          "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/admin/course/"+courseId+"/video?videoId="+this.videoId,
          postVideo,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            }
          }
        )
        .then(
          response => {
            //console.log(response);
            this.videoData[this.index].introduction=postVideo.videoDesc
            this.videoData[this.index].videoName=postVideo.videoName
          },
          error => {}
        );
    },
    handle() {
      console.log("Video paused!, playing in 2 sec...");
      setTimeout(() => {
        this.$refs.coursevideo.play();
      }, 2000);
    },
    //删除视频
    deletevideo() {
      this.videosrc = "";
    },
    //换页
    changeTablePages(value) {
      var currentPage = value / this.limit;
      this.currentPage = currentPage;
      this.$store.commit(
        "changeVideoCurrentList",
        this.currentPage * this.limit
      );
    },
    gotoUpload() {
      var flag = 0;
      for (var i = 0; i < this.courseList.length; i++) {
        if (this.courseList[i].isActive == true) {
          flag = i;
        }
      }
      console.log(this.courseList[flag].id);
      this.$router.push({
        path:
          "/Admin/videoManagement/" + this.courseList[flag].id + "/uploadVideo"
      });
    },
    changeCourse(index) {
      console.log(index);
      for (var i = 0; i < this.courseList.length; i++) {
        this.courseList[i].isActive = false;
      }
      this.courseList[index].isActive = true;
      this.$store
        .dispatch("changeCourse", this.courseList[index].id)
        .then(() => {
          this.videoData = this.$store.state.videoData;
          console.log("444444444444444");
          if (this.videoData) {
            for (let i = 0; i <= this.videoData.length; i++) {
              this.videoData[i].date = this.timestampToTime(
                this.$store.state.videoData[i].date
              );
            }
          }
        });
      if (this.videoData == null) {
        this.error = true;
        this.errorMsg = "暂时没有数据";
      }
    },
    timestampToTime(timestamp) {
      timestamp = String(timestamp);
      timestamp = timestamp.length == 10 ? timestamp * 1000 : timestamp * 1;
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
  },

  created() {
    this.$store.dispatch("getCourseList").then(() => {
      this.videoData = this.$store.state.videoData;
      console.log("333333333333333");
      if (this.videoData) {
        for (let i = 0; i <= this.videoData.length; i++) {
          this.videoData[i].date = this.timestampToTime(this.videoData[i].date);
        }
      }
    });
  },

  computed: {
    ...mapState({
      courseList: state => state.adminCourseList,
      // videoData: state => state.videoData,
      currentList: state => state.videoCurrentList,
      limit: state => state.limit
    })
  }
};
</script>

<style scoped>
.body {
  font-size: 12px;
  color: #606266;
  width: 98%;
  margin: 0 auto;
}

.course-nav {
  width: 100%;
  text-align: center;
}

.course-btn {
  font-size: 14px;
  margin-right: 10px;
  height: 40px;
  line-height: 35px;
  border-radius: 30px;
  color: #fff;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

.course-btn:focus {
  outline: none;
}

.course-inactive-btn {
  background-color: #eee;
  border: 1px solid #eee;
  color: #666;
}

.course-inactive-btn:hover {
  background-color: rgba(238, 238, 238, 0.575);
  border: 1px solid rgba(238, 238, 238, 0.575);
  color: #666;
}

.course-active-btn {
  background-color: #409eff;
  border: 1px solid #409eff;
}

.course-active-btn:hover {
  background-color: #40a0ffcc;
  border: 1px solid #40a0ffcc;
}

.title {
  text-align: center;
}

.content td {
  line-height: 23px;
}

table tr {
  text-align: center !important;
}

table td {
  vertical-align: middle !important;
}

.outside {
  margin-top: 20px;
}

.operation {
  color: #409eff;
  margin: 0 3px;
  cursor: pointer;
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
}

.btn:hover {
  background: #66b1ff;
}

.btn-search {
  width: 54px;
}

.btn-clear {
  width: 88px;
}

.blue {
  cursor: pointer;
  color: #409eff;
}

.red {
  cursor: pointer;
  color: #ff6947;
}

/*视频模态框*/
.modal-width {
  width: 700px;
  height: 400px;
}

.modal-padding {
  padding: 0;
}
video:focus {
  outline: none;
}
.video-header {
  border: none;
  font-size: 14px;
}
.border-none {
  border: none;
}
.text-padding {
  line-height: 35px;
}
.text-video {
  margin-bottom: 10px;
  height: 35px;
}
.text-box {
  height: 200px;
  border: 1px solid #409eff;
  border-radius: 5px;
  padding: 10px;
}
.text-box:hover {
  border: 1px solid #40a0ffcc;
}
.text-box:focus {
  outline: none;
}
.video-content {
  width: 400px;
  margin: 0 auto;
}
.video-input {
  height: 100%;
  border-radius: 5px;
  border: 1px solid #409eff;
}
.video-input:hover {
  border: 1px solid #40a0ffcc;
}
.video-input:focus {
  outline: none;
}
.alterwidth {
  width: 30%;
}
.altercontent {
  width: 300px;
  margin: 0 auto;
}
.alterimg {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
</style>