<template>
  <div class="upload-video">
    <div class="upload">
      <span class="upload-title">章节名称:</span>
      <input class="upload-input" placeholder="请输入章节名称" v-model="chapterName" />
    </div>
    <div class="upload">
      <span class="upload-title">章节序号:</span>
      <input class="upload-input" placeholder="请输入章节序号" v-model="chapterNum" />
    </div>
    <div class="upload upload-height">
      <span class="upload-title">章节描述:</span>
      <textarea
        class="upload-textarea"
        rows="8"
        cols="70"
        placeholder="请输入章节描述"
        v-model="chapterDesc"
      />
    </div>
    <div class="upload-footer">
      <button class="btn upload-btn" @click="submit">确定</button>
      <button class="btn upload-btn">取消</button>
    </div>
  </div>
</template>

<script>
import globalAxios from "axios";
export default {
  name: "addChapter",
  data() {
    return {
      chapterName: "",
      chapterDesc: "",
      chapterNum:"",
      courseId: ""
    };
  },
  methods: {
    submit() {
      var token = window.localStorage.getItem("idToken");
      var newChapter = {};
      newChapter.chapterName = this.chapterName;
      newChapter.chapterDesc = this.chapterDesc;
      newChapter.chapterNum=this.chapterNum;
      //console.log(this.chapterName,this.chapterDesc,this.courseId)
      globalAxios
        .post(
          "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/admin/course/" +
            this.courseId +
            "/chapters",
          newChapter,
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
            this.$router.push({ path: "/Admin/chapterManagement/"+this.courseId });
          },
          error => {
            // this.$router.push({path:'/404'})
            console.log(error);
          }
        );
    }
  },
  created() {
    this.courseId = this.$route.params.courseId;
  }
};
</script>

<style>
.upload-video {
  width: 98%;
  margin: 0 auto;
  padding-top: 30px;
}
.upload {
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
}
.upload-title {
  color: #606266;
  display: block;
  text-align: right;
  width: 80px;
  height: 40px;
  float: left;
  line-height: 40px;
}
.upload-input {
  width: 300px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #409eff;
  margin-left: 10px;
  padding-left: 10px;
}
.upload-input:hover {
  border: 1px solid #66b1ff;
}
.upload-input:focus {
  outline: none;
}
.upload-textarea {
  border: 1px solid #409eff;
  border-radius: 5px;
  margin-left: 10px;
  padding: 10px;
}
.upload-height {
  height: 190px;
}
.upload-textarea:hover {
  border: 1px solid #66b1ff;
}
.upload-textarea:focus {
  outline: none;
}
.outside[data-v-5567b275] {
  width: 300px !important;
  height: 40px !important;
  margin-left: 10px !important;
}
.inputBox[data-v-5567b275] {
  height: 35px !important;
  font-size: 14px !important;
  width: 230px !important;
}
.dropdown-menu {
  left: 100px !important;
}
.upload-footer {
  width: 100%;
  text-align: center;
}
.upload-btn {
  background-color: #409eff;
  color: #fff;
  margin-left: 10px;
}
.upload-btn:hover {
  color: #fff;
}
.upload-btn:focus {
  outline: none;
  color: #fff;
}
</style>


