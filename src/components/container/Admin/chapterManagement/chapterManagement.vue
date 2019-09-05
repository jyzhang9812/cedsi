<template>
    <div class="body">
      <div>
        <button class="btn btn-clear" @click="gotoAdd">添加章节</button>
      </div>
      <div class="outside">
        <table class="table table-hover">
          <thead>
            <tr>
              <th v-for="(th, index) in tableTitle" :key="index" class="title">{{th}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(chapter, seq) in currentList" :key="seq" class="content">
              <td>{{seq + 1}}</td>
              <td>{{chapter.chapterName}}</td>
              <td style="width:400px">{{chapter.introduction}}</td>
              <td>{{chapter.date}}</td>
              <td>{{chapter.uploadAdmin}}</td>
              <td>
                <span class="blue">编辑</span>&nbsp;&nbsp;
                <span class="red">删除</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <pagination :num="chapterData.length" @getNew="changeTablePages" :limit="limit"></pagination>
      </div>
    </div>
  </template>
  
  <script>
  import Pagination from "../utils/pagination";
  import globalAxios from "axios";
  import fs from "fs";
  import AWS from "aws-sdk";
  export default {
    name: "chapters",
    components: { Pagination },
    data() {
      return {
        chapterList: [],
        file: null,
        limit: 10,
        fileName: "",
        chapterData: [],
        tableTitle: [
          "序号",
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
        this.currentList = this.chapterData.slice(value, value + this.limit);
      },
      gotoAdd() {
        this.$router.push({
          path:
            "/Admin/chapterManagement/" +
            this.courseId +
            "/addChapter"
        });
      },
      changechapter(index) {
        console.log(index);
        for (var i = 0; i < this.chapterList.length; i++) {
          this.chapterList[i].isActive = false;
        }
        this.chapterList[index].isActive = true;
      },
      timestampToTime(timestamp) {
        timestamp = String(timestamp);
        timestamp = timestamp.length == 10 ? timestamp*1000 : timestamp * 1
        var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + "-";
        var M =(date.getMonth() + 1 < 10? "0" + (date.getMonth() + 1): date.getMonth() + 1) + "-";
        var D = date.getDate() + " ";
        var h = date.getHours() + ":";
        var m = date.getMinutes() + ":";
        var s = date.getSeconds();
        return Y + M + D + h + m + s;
      }
    },
    mounted() {
      this.changeTablePages(0);
      this.courseId = this.$route.params.courseId;
      var token = window.localStorage.getItem("idToken");
      globalAxios
        .get(
          "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/admin/course/" +
          this.courseId +
          "/chapters",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            }
          }
        )
        .then(
          response => {
            console.log(response.data);
            var chapterArr = [];
            var chapterData = [];
            chapterArr = response.data.data;
            for (var i = 0; i < chapterArr.length; i++) {
              var chapter = {};
              chapter.chapterName = chapterArr[i].CP_NAME;
              chapter.introduction = chapterArr[i].CP_DESCRIPTION;
              chapter.date = this.timestampToTime(chapterArr[i].CP_UPLOAD_TIME);
              chapter.uploadAdmin = chapterArr[i].CP_FOUNDER;
              chapter.chapterNum = chapterArr[i].CP_NUMBER;
              chapter.id=chapterArr[i].CP_ID;
              chapterData.push(chapter);
            }
            this.chapterData = chapterData;
            console.log(chapterData);
            this.changeTablePages(0);
          },
          error => {
            // this.$router.push({path:'/404'})
            console.log(error);
          }
        );
    },
    created() {
      console.log("created被调用了")
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
  .chapter-nav {
    width: 100%;
    height: 50px;
    text-align: center;
  }
  .chapter-btn {
    font-size: 14px;
    margin-right: 10px;
    width: 100px;
    height: 40px;
    line-height: 35px;
    border-radius: 30px;
    color: #fff;
  }
  .chapter-btn:focus {
    outline: none;
  }
  .chapter-inactive-btn {
    background-color: #eee;
    border: 1px solid #eee;
    color: #666;
  }
  .chapter-inactive-btn:hover {
    background-color: rgba(238, 238, 238, 0.575);
    border: 1px solid rgba(238, 238, 238, 0.575);
    color: #666;
  }
  .chapter-active-btn {
    background-color: #409eff;
    border: 1px solid #409eff;
  }
  .chapter-active-btn:hover {
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
  