<template>
  <div id="addChapter">
    <div class="upload">
      <span class="upload-title">章节名称:</span>
      <input class="upload-input" placeholder="请输入章节名称" v-model="chapterName" />
    </div>
    <div class="upload">
      <span class="upload-title">章节序号:</span>
      <input class="upload-input" :value="chapterNum" disabled />
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
      <button class="btn upload-btn" @click="goback()">取消</button>
    </div>
  </div>
</template>

<script>
import globalAxios from "axios";
import { mapState } from "vuex";
import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";
export default {
  name: "addChapter",
  data() {
    return {
      chapterName: "",
      chapterDesc: "",
      chapterNum: "",
      courseId: "",
      chapterId: ""
    };
  },
  methods: {
    goback() {
      this.$router.push({
        path: "/Admin/chapterManagement/" + this.courseId
      });
    },
    timestampToTime(timestamp) {
      timestamp = String(timestamp);
      timestamp = timestamp.length == 10 ? timestamp * 1000 : timestamp * 1;
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    submit() {
      var that = this;
      var token = window.localStorage.getItem("idToken");
      var newChapter = {};
      newChapter.chapterName = this.chapterName;
      newChapter.chapterDesc = this.chapterDesc;
      newChapter.chapterNum = this.chapterNum;
      console.log(this.chapterId);
      //console.log(this.chapterName,this.chapterDesc,this.courseId)
      if (this.chapterId != -1) {
        //如果是编辑
        globalAxios
          .put(
            "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/admin/course/" +
              this.courseId +
              "/chapters/" +
              this.chapterId,
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
              //console.log(response);
              this.$toast.success({ title: "章节管理", message: "操作成功" });
              setTimeout(function() {
                that.$router.push({
                  path: "/Admin/chapterManagement/" + that.courseId
                });
              }, 1000);
            },
            error => {
              // this.$router.push({path:'/404'})
              console.log(error);
            }
          );
      } else {
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
              this.$toast.success({ title: "章节管理", message: "操作成功" });
              setTimeout(function() {
                that.$router.push({
                  path: "/Admin/chapterManagement/" + that.courseId
                });
              }, 1000);
            },
            error => {
              // this.$router.push({path:'/404'})
              console.log(error);
            }
          );
      }
    }
  },
  mounted() {
    this.courseId = this.$route.params.courseId;
    this.chapterNum = this.$route.query.chapterNum;
    if (this.$route.query.chapterId == null)
      //增加
      this.chapterId = -1;
    else {
      //如果是修改避免刷新章节内容为空
      this.$store.dispatch("getChapterDetial", this.courseId).then(() => {
        this.chapterData = this.$store.state.chapterData;
        console.log(this.$store.state.chapterData);
        //console.log('333333333333333')
        if (this.chapterData) {
          console.log(this.$route.query.chapterNum);
          this.chapterId = this.$route.query.chapterId;
          (this.chapterName = this.chapterList[
            this.chapterNum - 1
          ].chapterName),
            (this.chapterDesc = this.chapterList[
              this.chapterNum - 1
            ].introduction);
        }
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
#addChapter {
  width: 98%;
  margin: 0 auto;
  padding-top: 30px;
}
#addChapter .upload {
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
}
#addChapter .upload-title {
  color: #606266;
  display: block;
  text-align: right;
  width: 80px;
  height: 40px;
  float: left;
  line-height: 40px;
}
#addChapter .upload-input {
  width: 300px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #409eff;
  margin-left: 10px;
  padding-left: 10px;
}
#addChapter .upload-input:hover {
  border: 1px solid #66b1ff;
}
#addChapter .upload-input:focus {
  outline: none;
}
#addChapter .upload-textarea {
  border: 1px solid #409eff;
  border-radius: 5px;
  margin-left: 10px;
  padding: 10px;
}
#addChapter .upload-height {
  height: 190px;
}
#addChapter .upload-textarea:hover {
  border: 1px solid #66b1ff;
}
#addChapter .upload-textarea:focus {
  outline: none;
}
#addChapter .outside[data-v-5567b275] {
  width: 300px !important;
  height: 40px !important;
  margin-left: 10px !important;
}
#addChapter .inputBox[data-v-5567b275] {
  height: 35px !important;
  font-size: 14px !important;
  width: 230px !important;
}
#addChapter .dropdown-menu {
  left: 100px !important;
}
#addChapter .upload-footer {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}
#addChapter .upload-btn {
  background-color: #409eff;
  color: #fff;
  margin-left: 10px;
}
#addChapter .upload-btn:hover {
  color: #fff;
}
#addChapter .upload-btn:focus {
  outline: none;
  color: #fff;
}
.toast-icon img {
  width: 90px !important;
}
</style>


