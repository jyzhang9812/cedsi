<template>
  <div id="videoManagement">
    <el-row>
      <el-button
        :disabled="uploadAvailable"
        type="primary"
        size="small"
        @click="uploadNewVideo"
      >上传视频</el-button>
      <div class="course-choose">
        <span>当前课程&nbsp;&nbsp;</span>
        <el-select
          size="small"
          v-model="currentCourse"
          @change="changeCurrentCourse"
          placeholder="选择当前课程"
        >
          <el-option
            v-for="(item,index) in courseList"
            :key="index"
            :label="item.name"
            :value="item.id"
            :disabled="!item.isActive"
          ></el-option>
        </el-select>
      </div>
    </el-row>
    <div class="spaceLine"></div>
    <el-row>
      <el-table :data="videoData" style="width: 100%">
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column align="center" prop="name" label="视频名称"></el-table-column>
        <el-table-column align="center" prop="address" label="章节名称"></el-table-column>
        <el-table-column align="center" prop="address" label="操作说明"></el-table-column>
        <el-table-column align="center" prop="address" label="上传时间"></el-table-column>
        <el-table-column align="center" prop="address" label="创建人"></el-table-column>
        <el-table-column align="center" prop="address" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" slot="reference" type="danger" @click="dialogVisible=true">删除</el-button>
            <el-dialog title :visible.sync="dialogVisible" width="20%">
              <i class="el-icon-info"></i>
              <span>确定要删除此视频吗</span>
              <span slot="footer" class="dialog-footer">
                <el-button type="success" size="mini" @click="dialogVisible=false">取 消</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.row)">确 定</el-button>
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <div class="spaceLine"></div>
    <el-row>
      <el-pagination
        :page-size="limit"
        background
        layout="prev, pager, next"
        :total="videoData.length"
        @current-change="handlePageChange"
        @prev-click="handlePageChange"
        @next-click="handlePageChange"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import Media from "@dongido/vue-viaudio";
import { mapState } from "vuex";
import instance from "../../../../axios-auth";

export default {
  name: "videos",
  data() {
    return {
      currentCourse: null,
      dialogVisible: false,
      limit: 8,
      videoData: [],
      videoList: []
    };
  },
  methods: {
    uploadNewVideo(courseId) {
      this.$router.push({
        path: `/Admin/videoManagement/${this.currentCourse}/uploadVideo`
      });
    },
    handleEdit() {},
    handleDelete() {
      const config = {
        headers: { Authorization: token },
        params: {
          videoId: this.videoId,
          chapterId: this.chapterId
        }
      };
      instance
        .delete(`/admin/course/${courseId}/video`, config)
        .then(response => {
          console.log({ 删除结果: response });
          this.dialogVisible = false;
          if (response.data && response.data.status === "ok") {
            this.$message({ type: "success", message: "删除成功" });
            this.initVideoData();
          } else {
            throw new Error(JSON.stringify(response));
          }
        })
        .catch(err => {
          console.error(err);
          this.$message({ type: "error", message: "删除失败" });
        });
    },
    handlePageChange(pageIndex) {
      let start = (pageIndex - 1) * this.limit;
      let end = start + this.limit;
      this.videoList = this.videoData.slice(start, end);
    },
    changeCurrentCourse(item) {
      this.currentCourse = item;
      console.log(item);
    },
    previewVideo(seq) {
      this.index = this.currentPage * this.limit + seq;
      this.videosrc = this.videoData[this.index].videoUrl;
      this.videoName = this.videoData[this.index].videoName;
    },
    updateVideo(seq) {
      this.index = this.currentPage * this.limit + seq;
      this.videoDesc = this.videoData[this.index].introduction;
      this.videoName = this.videoData[this.index].videoName;
      this.videoId = this.videoData[this.index].videoId;
    },
    submit() {
      let courseId = "";
      let postVideo = {};
      postVideo.videoName = this.videoName;
      postVideo.videoDesc = this.videoDesc;
      for (let i = 0; i < this.courseList.length; i++) {
        if (this.courseList[i].isActive == true) {
          courseId = this.courseList[i].id;
          break;
        }
      }
      const url = `/admin/course/${courseId}/video`;
      const config = {
        headers: {
          Authorization: localStorage.getItem("idToken")
        },
        params: { videoId: this.videoId }
      };
      instance
        .put(url, postVideo, config)
        .then(response => {
          console.log(response);
          this.videoData[this.index].introduction = postVideo.videoDesc;
          this.videoData[this.index].videoName = postVideo.videoName;
        })
        .catch(err => {
          console.error(err);
          this.$message({ type: "error", message: "上传失败" });
        });
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
    timestampToTime(timestamp) {
      let date = new Date(Number.parseInt(timestamp));
      let Y = date.getFullYear();
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return `${Y}-${M}-${D} ${h}:${m}:${s}`;
    }
  },
  created() {
    this.$store.dispatch("getCourseList").then(() => {
      this.videoData = this.$store.state.videoData;
      console.log({ videoData: this.videoData });
      console.log({ courseList: this.courseList });
      console.log({ currentList: this.currentList });
      this.videoData = this.videoData.map(video => {
        item.date = this.timestampToTime(item.date);
        return item;
      });
    });
  },
  computed: {
    ...mapState({
      courseList: state => state.adminCourseList,
      currentList: state => state.videoCurrentList
    }),
    uploadAvailable() {
      return !this.courseList.find(item => {
        return item.id === this.currentCourse && item.isActive;
      });
    }
  }
};
</script>

<style scoped>
#videoManagement {
  padding: 0 20px 20px 20px;
}
#videoManagement .spaceLine {
  display: block;
  height: 15px;
}
#videoManagement .course-choose {
  float: right;
  margin-right: 20px;
}
#videoManagement .course-choose > span {
  font-weight: 800;
  line-height: 30px;
  color: #909399;
}
</style>