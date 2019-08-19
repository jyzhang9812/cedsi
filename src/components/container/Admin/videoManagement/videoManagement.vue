<template>
  <div class="body">
    <div class="course-nav">
      <button
        v-for="(course,index) in courseList"
        :key="index"
        :class="course.isActive==true?'course-active-btn course-btn':'course-inactive-btn course-btn'"
        @click="changeCourse(index)"
      >{{course.name,}}</button>
    </div>
    <div>
      <button class="btn btn-clear" @click="gotoUpload">上传视频</button>
    </div>
    <div class="outside">
      <table class="table table-hover">
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
import globalAxios from "axios";
import fs from "fs";
import AWS from "aws-sdk";

export default {
  name: "videos",
  components: { Pagination },
  data() {
    return {
      courseList: [],
      file: null,
      limit: 10,
      fileName: "",
      videoData: [],
      tableTitle: [
        "序号",
        "视频名称",
        "章节名称",
        "操作说明",
        "上传时间",
        "创建人",
        "操作"
      ],
      currentList: []
    };
  },
  methods: {
    changeTablePages(value) {
      this.currentList = this.videoData.slice(value, value + this.limit);
    },
    gotoUpload() {
      var flag = 0;
      for (var i = 0; i < this.courseList.length; i++) {
        if (this.courseList[i].isActive == true) {
          flag = i;
        }
      }
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
    },
    timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
    }
  },
  mounted() {
    this.changeTablePages(0);
  },
  created() {
    var token = window.localStorage.getItem("idToken");
    globalAxios
      .get(
        "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/admin/course",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
        }
      )
      .then(
        response => {
          //console.log(response.data);
          var courseArr = [];
          var courseList = [];
          courseArr = response.data;
          for (var i = 0; i < courseArr.length; i++) {
            var course = {};
            course.name = courseArr[i].NAME;
            course.id = courseArr[i].ID;
            if (i == 5) course.isActive = true;
            else course.isActive = false;
            courseList.push(course);
          }
          this.courseList = courseList;
          //console.log(this.courseList);
          globalAxios
            .get(
              "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/admin/course/" +
                this.courseList[5].id +
                "/video",
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
                var videoArr = [];
                var videoData = [];
                videoArr = response.data.data;
                for (var i = 0; i < videoArr.length; i++) {
                  var video = {};
                  video.chapterName = videoArr[i].CP_NAME;
                  video.videoName = videoArr[i].RS_NAME;
                  video.introduction = videoArr[i].RS_COMMENT;
                  video.date = this.timestampToTime(videoArr[i].RS_CREATE_TIME); 
                  video.uploadAdmin = videoArr[i].RS_FOUNDER;
                  video.chapterNum = videoArr[i].CP_NUMBER;
                  videoData.push(video);
                }
                this.videoData = videoData;
                console.log(videoData);
                this.changeTablePages(0)
              },
              error => {
                // this.$router.push({path:'/404'})
                console.log(error);
              }
            );
        },
        error => {
          // this.$router.push({path:'/404'})
          console.log(error);
        }
      );
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
.course-inactive-btn:hover{
  background-color: rgba(238, 238, 238, 0.575);
  border: 1px solid rgba(238, 238, 238, 0.575);
  color: #666;
}
.course-active-btn {
  background-color: #409eff;
  border: 1px solid #409eff;
}
.course-active-btn:hover{
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
</style>