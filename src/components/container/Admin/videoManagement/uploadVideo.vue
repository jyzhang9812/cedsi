<template>
  <div id="upload-video">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="视频名称">
        <el-input v-model="form.name" placeholder="请输入视频名称"></el-input>
      </el-form-item>
      <el-form-item label="视频描述">
        <el-input
          v-model="form.desc"
          :autosize="{minRows:4,maxRows:4}"
          type="textarea"
          placeholder="请输入视频描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="选择章节">
        <el-select v-model="form.chapterId" placeholder="请选择章节">
          <el-option
            v-for="(chapter,index) in chapters"
            :key="index"
            :label="chapter.name"
            :value="chapter.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择视频">
        <el-upload drag action="#" :http-request="uploadVideo" :limit="1" accept="video/mp4">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">请上传MP4视频格式的文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传进度">
        <el-progress :text-inside="true" :stroke-width="24" :percentage="progress" status="success"></el-progress>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="submitUpload">提交</el-button>
        <el-button type="primary" size="small" @click="cancelUpload">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AWS from "aws-sdk";
import instance from "../../../../axios-auth";

export default {
  name: "uploadVideo",
  data() {
    return {
      chapters: [],
      form: {
        name: "",
        desc: "",
        chapterId: ""
      },
      progress: 0,
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
    uploadVideo() {},
    submitUpload() {},
    cancelUpload() {},
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
            var that = this;
            console.log(response);
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
                var complete =
                  (((progressEvent.loaded / progressEvent.total) * 100) | 0) +
                  "%";
                this.progress = complete;
              }
            };
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
            };
            s3.putObject(params, function(err, data) {
              if (err) {
                console.log(err, err.stack);
              } else {
                console.log(data);
              }
            }).on("httpUploadProgress", function(e) {
              var process = Number((e.loaded * 100) / e.total);
              that.progressWidth = parseInt(process) + "%";
              if (process == 100) {
                that.isComplete = false;
              }
            });
          },
          error => {
            console.log(error);
          }
        );
    },
    goback() {
      this.$router.push({ path: "/Admin/videoManagement" });
    },
    gotoVideo() {
      var that = this;
      this.$toast.success({ title: "视频管理", message: "操作成功" });
      setTimeout(function() {
        that.$router.push({
          path: "/Admin/videoManagement"
        });
      }, 1000);
    }
  },
  created() {
    var courseId = this.$route.params.courseId;
    this.courseId = courseId;
    this.$store.dispatch("getCourseChapter", courseId);
  },
  computed: {
    inputData() {
      return this.$store.state.inputData;
    }
  }
};
</script>

<style scoped>
#upload-video .el-form-item {
  width: 400px;
}
#upload-video .el-upload__text > .el-upload-dragger {
  height: 150px;
  width: 320px;
}
</style>