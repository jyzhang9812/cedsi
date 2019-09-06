<template>
  <div id="upload-video">
    <div class="upload">
      <span class="upload-title">视频名称:</span>
      <input class="upload-input" placeholder="请输入视频名称" v-model="videoName" />
    </div>
    <div class="upload upload-height">
      <span class="upload-title">视频描述:</span>
      <textarea class="upload-textarea" rows="8" cols="70" placeholder="请输入视频描述" v-model="videoIntro" />
      </div>
    <div class="upload">
      <span class="upload-title" style="margin-right:10px">请选择章节:</span>
      <select-input
        class="upload-select"
        id="chapter"
        tips="请选章节"
        :option="inputData.chapter.option.name"
        @option="changeOption"
        :drop-down-list="inputData.chapter.list"
        autocomplete="off"
        style="margin-left:90px;"
      ></select-input>
    </div>
    <div class="upload">
      <span class="upload-title">请选择视频:</span>
      <div class="upload-cover-btn">
        选择文件
        <input type="file" class @change="getFile($event)" style="opacity: 0" />
      </div>
      <button class="btn btn-primary btn-upload-file" @click="submit($event)">上传文件</button>
    </div>
        <div class="upload">
      <span class="upload-title">上传进度:</span>
      <div class="progress upload-process">
  <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" :style="{width:progressWidth}">
    {{progressWidth}}
  </div>
</div>
    </div>
    <div class="upload upload-height">
      <span class="upload-title">文件名称:</span>
      <input class="upload-input" :value="fileName" disabled />
    </div>
    <div class="upload-footer">
      <button class="btn upload-btn" :disabled="isComplete" @click="gotoVideo">提交</button>
      <button class="btn upload-btn" @click="goback()">取消</button>
    </div>
  </div>
</template>

<script>
  import SelectInput from "../utils/selectInput";
  import AWS from "aws-sdk";
  import globalAxios from "axios";

  export default {
    name: "uploadVideo",
    data() {
      return {
        file: null,
        fileName: "",
        videoName: "",
        videoIntro: "",
        type: "",
        fileName: "暂未上传",
        progressWidth: "0%",
        isComplete: true
      };
    },
    methods: {
      changeOption(item, id) {
        Object.keys(this.inputData).forEach(res => {
          if (res === id) {
            this.inputData[res].option = item;
          }
        });
      },
      getFile(event) {
        this.file = event.target.files[0];
        console.log(this.file);
        this.fileName = this.file.name;
        this.type = this.file.type.split("/")[1];
        this.size = this.file.size;
      },
      submit(event) {
        var token = window.localStorage.getItem("idToken");
        globalAxios
          .post(
            "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/admin/course/" +
            this.courseId +
            "/video",
            {
              name: this.videoName,
              comment: this.videoIntro,
              chapterId: this.inputData.chapter.option.id,
              type: this.type,
              size: this.size + ""
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: token
              }
            }
          )
          .then(
            response => {
              var that = this
              console.log(response);
              //this.$router.push({path:"/Admin/"})
              //console.log(this.inputData.chapter.list);
              AWS.config = new AWS.Config({
                accessKeyId: response.data.AccessKeyId,
                secretAccessKey: response.data.SecretAccessKey,
                sessionToken: response.data.SessionToken,
                region: "cn-northwest-1"
              });
              var s3 = new AWS.S3();
              let formData = new FormData();

              formData.append("caption", this.caption);
              formData.append("hour", this.hour);
              formData.append("particulars", this.particulars);
              formData.append("content", this.file);
              var config = {
                onUploadProgress: progressEvent => {
                  var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
                  this.progress = complete
                }
              }
              console.log(window.localStorage.getItem("user"));
              const reader = new FileReader();
              var content = reader.readAsArrayBuffer(this.file);
              var params = {
                ACL: "public-read",
                Bucket: "cedsi",
                Body: formData.get("content"),
                Key: "course/video/" + response.data.id + "." + this.type,
                ContentType: this.type,
                Metadata: {
                  uploader: window.localStorage.getItem("user")
                }
                //Key: "course/" + config.id + "." + file.type.split('/')[1],
              };
              s3.putObject(params, function (err, data) {
                if (err) {
                  console.log(err, err.stack);
                } else {
                  console.log(data);
                }
              }).on('httpUploadProgress', function (e) {
                var process = Number(e.loaded * 100 / e.total)
                that.progressWidth = parseInt(process) + "%"
                if (process == 100) {
                  that.isComplete = false
                }
              });
            },
            error => {
              // this.$router.push({path:'/404'})
              console.log(error);
            }
          );
      },
      goback() {
        this.$router.push({ path: "/Admin/" })
      },
      gotoVideo() {
        this.$router.push({ path: "/Admin/" })
      }
    },
    created() {
      var courseId = this.$route.params.courseId;
      this.courseId=courseId
      console.log(this.courseId)
      this.$store.dispatch('getCourseChapter', courseId)
    },
    computed: {
      inputData() {
        return this.$store.state.inputData
      }
    },
    components: { SelectInput }
  };
</script>

<style scoped>
#upload-video {
  width: 98%;
  margin: 0 auto;
  padding-top: 30px;
}
#upload-video .upload {
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
}
#upload-video .upload-title {
  color: #606266;
  display: block;
  text-align: right;
  width: 80px;
  height: 40px;
  float: left;
  line-height: 40px;
}
#upload-video .upload-input {
  width: 300px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #409eff;
  margin-left: 10px;
  padding-left: 10px;
}
#upload-video .upload-input:hover {
  border: 1px solid #66b1ff;
}
#upload-video .upload-input:focus {
  outline: none;
}
#upload-video .upload-textarea {
  border: 1px solid #409eff;
  border-radius: 5px;
  margin-left: 10px;
  padding: 10px;
}
#upload-video .upload-height {
  height: 190px;
}
#upload-video .upload-textarea:hover {
  border: 1px solid #66b1ff;
}
#upload-video .upload-textarea:focus {
  outline: none;
}
#upload-video .outside[data-v-d899aefc] {
  width: 300px !important;
  height: 40px !important;
  margin-left: 10px !important;
}
#upload-video .inputBox[data-v-d899aefc] {
  height: 35px !important;
  font-size: 14px !important;
  width: 230px !important;
}
#upload-video .dropdown-menu {
  left: 100px !important;
  overflow: auto !important;
  max-height: 300px !important;
}
#upload-video .upload-footer {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}
#upload-video .upload-btn {
  background-color: #409eff;
  color: #fff;
  margin-left: 10px;
}
#upload-video .upload-btn:hover {
  color: #fff;
}
#upload-video .upload-btn:focus {
  outline: none;
  color: #fff;
}
#upload-video .upload-cover-btn {
  margin-left: 10px;
  width: 80px;
  height: 35px;
  display: inline-block;
  background-color: #409eff;
  color: #fff;
  border-radius: 5px;
  line-height: 35px;
  text-align: center;
}
#upload-video input[type="file"] {
  width: 80px;
  height: 35px;
  position: relative;
  top: -35px;
  display: inline-block;
}
#upload-video .upload-process{
  width: 30%;
  margin-left: 10px;
  display: inline-block;
  position: relative;
  top:10px;
}
#upload-video .btn-upload-file{
  position: relative;
  top:-35px;
  margin-left: 10px;
  background-color: #2fc27e;
  border: none;
  width: 80px;
  height: 35px;
  font-size: 14px;
}
#upload-video .btn-upload-file:hover{
  background-color: #2fc27ddc;
}
</style>