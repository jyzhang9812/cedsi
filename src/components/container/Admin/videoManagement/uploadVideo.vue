<template>
  <div id="upload-video">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      v-loading="screenLoading"
      :element-loading-text="loadingTips"
    >
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
            v-for="(chapter,index) in inputData.chapter.list"
            :key="index"
            :label="chapter.name"
            :value="chapter.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择视频">
        <el-upload drag action="#" :http-request="loadUserVideo" :limit="1" accept="video/mp4">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">请上传MP4视频格式的文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="submitUpload">提交</el-button>
        <el-button type="primary" size="small" @click="cancelUpload">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import instance from "../../../../axios-auth";
import { uploadFile } from "../../../../uploadFile";

export default {
  name: "uploadVideo",
  data() {
    return {
      chapters: [],
      form: {
        name: "",
        desc: "",
        chapterId: "",
        file: null
      },
      screenLoading: false,
      loadingTips: "正在连接，请耐心等待。"
    };
  },
  methods: {
    loadUserVideo(event) {
      this.form.file = event.file;
    },
    submitUpload() {
      let uploadCheck = Object.values(this.form).reduce((result, item) => {
        return result && item;
      }, true);
      if (uploadCheck) {
        this.screenLoading = true;
        let token = localStorage.getItem("idToken");
        const url = `/admin/course/${this.courseId}/video`;
        const config = { headers: { Authorization: token } };
        const data = {
          comment: this.form.desc,
          type: this.form.file.name.split(".").pop(),
          video_name: this.form.name,
          size: this.form.file.size,
          chapter_id: this.form.chapterId
        };
        this.submitAttributes(url, data, config);
      } else {
        this.$message({ type: "error", message: "表单填写完整才能上传哦" });
      }
    },
    submitAttributes(url, data, config) {
      instance
        .post(url, data, config)
        .then(({ data }) => {
          console.log(data);
          if (data.status !== "ok") {
            throw new Error("upload attributes error");
          }
          const that = this;
          let AWSConfig = { ...data, path: "course/video" };
          const upload = (err, data) => {
            that.screenLoading = false;
            if (err || !data.ETag) {
              console.error(err, data);
              that.$message({ type: "error", message: "上传失败" });
            } else {
              that.$message({ type: "success", message: "上传成功" });
              that.cancelUpload();
            }
          };
          const progress = event => {
            let process = Number((event.loaded * 100) / event.total);
            that.loadingTips = `连接成功，上传进度为 ${parseInt(process)}%`;
          };
          uploadFile(this.form.file, AWSConfig, upload, progress);
        })
        .catch(err => {
          console.error(err);
          this.$message({ type: "error", message: "上传失败" });
        });
    },
    cancelUpload() {
      this.$router.replace({ path: "/Admin/videoManagement" });
    }
  },
  created() {
    let courseId = this.$route.params.courseId;
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