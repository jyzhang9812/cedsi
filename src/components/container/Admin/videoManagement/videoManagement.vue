<template>
  <div class="body">
    <div class="modal fade" id="myVideo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content modal-width">
          <div class="modal-header">
            <span class="video-name">{{videoName}}</span>
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"
              @click="deletevideo">&times;</button>
          </div>
          <div class="modal-body modal-padding">
            <Media :autoplay="false" :kind="'video'" :controls="true" :src="videosrc"
              style="height: 400px;width: 700px;" @pause="handle()"></Media>
          </div>
        </div>
      </div>
    </div>
    <div class="course-nav">
      <button v-for="(course,index) in courseList" :key="index"
        :class="course.isActive==true?'course-active-btn course-btn':'course-inactive-btn course-btn'"
        @click="changeCourse(index)">{{course.name}}</button>
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
              <span class="blue" @click="previewVideo(seq)" data-toggle="modal"
                data-target="#myVideo">预览</span>&nbsp;&nbsp;
              <span class="blue">编辑</span>&nbsp;&nbsp;
              <span class="red">删除</span>
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
  import Pagination from "../utils/pagination";
  import Media from "@dongido/vue-viaudio";
  import { mapState } from 'vuex'

  export default {
    name: "videos",
    components: { Pagination },

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
      };
    },

    methods: {
      previewVideo(seq) {
        this.index = this.currentPage * this.limit + seq;
        this.videosrc = this.videoData[this.index].videoUrl;
        this.videoName = this.videoData[this.index].videoName;
        //window.location.href = this.videosrc;
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
        this.$store.commit("changeVideoCurrentList", this.currentPage * this.limit)
      },
      gotoUpload() {
        var flag = 0;
        for (var i = 0; i < this.courseList.length; i++) {
          if (this.courseList[i].isActive == true) {
            flag = i;
          }
        }
        console.log(this.courseList[flag].id)
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
        this.$store.dispatch('changeCourse', this.courseList[index].id).then(() => {
          this.videoData = this.$store.state.videoData
          console.log('444444444444444')
          if (this.videoData) {
            for (let i = 0; i <= this.videoData.length; i++) {
              this.videoData[i].date = this.timestampToTime(this.$store.state.videoData[i].date)
            }
          }
        })
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
      },
    },

    created() {
      this.$store.dispatch('getCourseList').then(() => {
        this.videoData = this.$store.state.videoData
        console.log('333333333333333')
        if (this.videoData) {
          for (let i = 0; i <= this.videoData.length; i++) {
            this.videoData[i].date = this.timestampToTime(this.videoData[i].date)
          }
        }
      })
    },

    computed: {
      ...mapState({
        courseList: state => state.adminCourseList,
        // videoData: state => state.videoData,
        currentList: state => state.videoCurrentList,
        limit: state => state.limit,
      }),
    }
  }
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
</style>