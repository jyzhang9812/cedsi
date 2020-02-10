<template>
  <div id="videoManagement" v-loading="screenLoading" element-loading-text="正在处理, 请耐心等待">
    <el-row>
      <el-button
        :disabled="!courseList.length"
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
          ></el-option>
        </el-select>
      </div>
    </el-row>
    <div class="spaceLine"></div>
    <el-row>
      <el-table :data="videoList" style="width: 100%">
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column align="center" prop="rs_name" label="视频名称"></el-table-column>
        <el-table-column align="center" prop="cp_name" label="章节名称"></el-table-column>
        <el-table-column align="center" prop="rs_desc" label="视频简介"></el-table-column>
        <el-table-column align="center" prop="rs_time" :formatter="formatDate" label="上传时间"></el-table-column>
        <el-table-column align="center" prop="rs_type" label="视频格式"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="popDeleteDialog(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog title="视频编辑" :visible.sync="editVisible" @close="player.pause()" width="40%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="视频名称">
          <el-input v-model="form.name" placeholder="请输入视频名称"></el-input>
        </el-form-item>
        <el-form-item label="视频介绍">
          <el-input v-model="form.desc" placeholder="请输入视频介绍"></el-input>
        </el-form-item>
        <el-form-item label="视频资源">
          <video id="myVideo" class="video-js">
            <source :src="form.url" type="video/mp4" />
          </video>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="updateVideoInfo">保存信息</el-button>
          <el-button size="small" type="primary" @click="editVisible=false">取消编辑</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title :visible.sync="dialogVisible" width="20%">
      <i class="el-icon-info"></i>
      <span>确定要删除此视频吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" size="mini" @click="dialogVisible=false">取 消</el-button>
        <el-button type="danger" size="mini" @click="handleDelete()">确 定</el-button>
      </span>
    </el-dialog>
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
import { mapState } from "vuex";
import instance from "../../../../axios-auth";

export default {
  name: "videos",
  data() {
    return {
      currentCourse: null,
      dialogVisible: false,
      editVisible: false,
      limit: 6,
      videoData: [],
      videoList: [],
      form: { name: "", desc: "", url: "" },
      preDeleteVideo: {},
      player: null,
      screenLoading: false
    };
  },
  methods: {
    getVideoList(courseId) {
      const url = `admin/course/${courseId}/video`;
      const token = localStorage.getItem("idToken");
      const config = { headers: { Authorization: token } };
      this.screenLoading = true;
      instance
        .get(url, config)
        .then(({ data }) => {
          this.screenLoading = false;
          if (data.status === "ok") {
            this.videoData = this.handleVideoList(data.chapters);
            console.log(this.videoData);
            this.handlePageChange(1);
          } else {
            throw new Error("get video list fail");
          }
        })
        .catch(err => {
          this.screenLoading = false;
          this.$message({ type: "error", message: "视频列表获取失败" });
          console.error({ 视频列表获取错误: err });
        });
    },
    uploadNewVideo(courseId) {
      let baseUrl = `/Admin/videoManagement/${this.currentCourse}/uploadVideo`;
      this.$router.push({ path: baseUrl });
    },
    popDeleteDialog(row) {
      console.log(row);
      this.dialogVisible = true;
      this.preDeleteVideo = {
        chapterId: row.cp_id,
        videoId: row.rs_id
      };
    },
    handleEdit(row) {
      console.log(row);
      this.form = {
        name: row.rs_name,
        desc: row.rs_desc,
        url: row.rs_url,
        rs_id: row.rs_id,
        cp_id: row.cp_id
      };
      this.editVisible = true;
      setTimeout(() => {
        if (this.player) return;
        let config = { controls: true, preload: "none" };
        this.player = this.$video("myVideo", config);
      }, 1000);
    },
    handleDelete() {
      this.dialogVisible = false;
      this.screenLoading = true;
      let { videoId, chapterId } = this.preDeleteVideo;
      let token = localStorage.getItem("idToken");
      const config = {
        headers: { Authorization: token },
        params: { videoId, chapterId }
      };
      instance
        .delete(`/admin/course/${this.currentCourse}/video`, config)
        .then(response => {
          this.screenLoading = false;
          console.log({ 删除结果: response });
          this.dialogVisible = false;
          if (response.data && response.data.status === "ok") {
            this.$message({ type: "success", message: "删除成功" });
            this.getVideoList(this.currentCourse);
          } else {
            throw new Error(JSON.stringify(response));
          }
        })
        .catch(err => {
          this.screenLoading = false;
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
      this.getVideoList(item);
    },
    updateVideoInfo() {
      this.editVisible = false;
      this.screenLoading = true;
      const url = `/admin/course/${this.currentCourse}/video`;
      const token = localStorage.getItem("idToken");
      const config = { headers: { Authorization: token } };
      let updateInfo = {
        videoName: this.form.name,
        videoDesc: this.form.desc,
        chapterId: this.form.cp_id,
        videoId: this.form.rs_id
      };
      instance
        .put(url, updateInfo, config)
        .then(({ data }) => {
          this.screenLoading = false;
          console.log(data);
          if (data.status === "ok") {
            this.$message({ type: "success", message: "保存成功" });
            this.getVideoList(this.currentCourse);
          } else {
            throw new Error("save video info fail");
          }
        })
        .catch(err => {
          this.screenLoading = false;
          console.error(err);
          this.$message({ type: "error", message: "上传失败" });
        });
    },
    formatDate({ rs_time }) {
      let date = new Date(Number.parseInt(rs_time));
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
    },
    handleVideoList(videoData) {
      let callback = (result, chapter) => {
        let list = chapter.CP_RESOURCE || [];
        let parts = list.map(video => {
          return {
            cp_name: chapter.CP_NAME,
            cp_id: chapter.CP_ID,
            rs_name: video.RS_NAME,
            rs_id: video.RS_ID,
            rs_type: video.RS_TYPE,
            rs_url: video.RS_URL,
            rs_time: video.RS_CREATE_TIME,
            rs_desc: video.RS_COMMENT
          };
        });
        return result.concat(parts);
      };
      return videoData.reduce(callback, []);
    }
  },
  created() {
    this.$store
      .dispatch("getCourseList")
      .then(() => {
        if (this.courseList.length) {
          this.currentCourse = this.courseList[0].id;
          this.getVideoList(this.currentCourse);
        }
      })
      .catch(err => {
        console.error(err);
      });
  },
  computed: {
    ...mapState({
      courseList: state => state.adminCourseList
    })
  }
};
</script>

<style scoped>
#videoManagement {
  padding: 0 20px 20px 20px;
}
#videoManagement .el-form-item {
  width: 92%;
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
#videoManagement .video-js {
  width: 450px;
  height: 250px;
  border-radius: 4px;
}
</style>