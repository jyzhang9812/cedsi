<template>
  <el-form ref="form" :model="form" label-width="80px" v-loading="screenLoading" element-loading-text="正在保存，请耐心等待！">
    <el-form-item label="章节名称">
      <el-input type="text" v-model="form.chapterName" placeholder="请输入章节名称"></el-input>
    </el-form-item>
    <el-form-item label="章节序号">
      <el-input type="text" v-model="form.chapterNum" disabled></el-input>
    </el-form-item>
    <el-form-item label="章节描述">
      <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 6}" placeholder="请输入章节描述" v-model="form.chapterDesc">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">保存信息</el-button>
      <el-button type="primary" @click="backToChapterList">取消编辑</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import instance from "../../../../axios-auth";
import { mapState } from "vuex";

export default {
  name: "addChapter",
  data() {
    return {
      courseId: "",
      chapterId: "",
      form: {
        chapterName: "",
        chapterDesc: "",
        chapterNum: ""
      },
      screenLoading: false
    };
  },
  methods: {
    backToChapterList() {
      this.$router.push({
        path: "/Admin/chapterManagement/" + this.courseId
      });
    },
    submit() {
      this.screenLoading = true;
      const config = {
        headers: { Authorization: localStorage.getItem("idToken") }
      };
      // 新增一个章节
      if (this.chapterId === -1) {
        const url = `/admin/course/${this.courseId}/chapters`;
        instance
          .post(url, this.form, config)
          .then(res => {
            this.screenLoading = false;
            if (res.data.status === "ok") {
              this.$message({ message: "章节保存成功", type: "success" });
            } else {
              return Promise.reject(res.data);
            }
          })
          .catch(err => {
            this.screenLoading = false;
            console.error(err);
            this.$message({ message: "章节保存失败", type: "error" });
          });
      } else {
        const url = `/admin/course/${this.courseId}/chapters/${this.chapterId}`;
        const chapterData = this.form;
        delete chapterData.chapterNum;
        instance
          .put(url, chapterData, config)
          .then(res => {
            this.screenLoading = false;
            if (res.data.status === "ok") {
              this.$message({ message: "章节保存成功", type: "success" });
              setTimeout(() => {
                this.backToChapterList();
              }, 2000);
            } else {
              return Promise.reject(res.data);
            }
          })
          .catch(err => {
            this.screenLoading = false;
            console.error(err);
            this.$message({ message: "章节保存失败", type: "error" });
          });
      }
    }
  },
  mounted() {
    this.courseId = this.$route.params.courseId;
    this.form.chapterNum = this.$route.query.chapterNum;
    if (!this.$route.query.chapterId) {
      this.chapterId = -1;
    } else {
      //如果是修改避免刷新章节内容为空
      this.$store
        .dispatch("getChapterDetial", this.courseId)
        .then(() => {
          this.chapterData = this.$store.state.chapterData;
          if (this.chapterData) {
            console.log(this.$route.query.chapterNum);
            this.chapterId = this.$route.query.chapterId;
            this.form.chapterName = this.chapterList[
              this.form.chapterNum - 1
            ].chapterName;
            this.form.chapterDesc = this.chapterList[
              this.form.chapterNum - 1
            ].introduction;
          }
        })
        .catch(err => {
          console.error(err);
          this.$message({ message: "获取章节内容失败", type: "error" });
        });
    }
  },
  computed: {
    ...mapState({
      chapterList: state => state.chapterData
    })
  }
};
</script>

<style scoped>
.el-form-item {
  width: 400px;
}
</style>