<template>
  <div id="chapterManagement">
    <el-button type="primary" size="small" @click="handleAddChapter">添加章节</el-button>
    <div class="spaceLine"></div>
    <el-table :data="chapterList" style="width: 100%">
      <el-table-column align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="chapterName" label="章节名称"></el-table-column>
      <el-table-column align="center" prop="introduction" label="章节描述"></el-table-column>
      <el-table-column align="center" prop="date" label="上传时间"></el-table-column>
      <el-table-column align="center" prop="uploadAdmin" label="创建人"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" slot="reference" type="danger" @click="dialogVisible=true">删除</el-button>
          <el-dialog title :visible.sync="dialogVisible" width="20%">
            <i class="el-icon-info"></i>
            <span>确定要删除此章节吗</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="success" size="mini" @click="dialogVisible=false">取 消</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row)">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <div class="spaceLine"></div>
    <el-pagination
      :page-size="limit"
      background
      layout="prev, pager, next"
      :total="chapterData.length"
      @current-change="handlePageChange"
      @prev-click="handlePageChange"
      @next-click="handlePageChange"
    ></el-pagination>
  </div>
</template>

<script>
import instance from "../../../../axios-auth";
import { mapState } from "vuex";

export default {
  name: "chapters",
  data() {
    return {
      file: null,
      fileName: "",
      chapterData: [],
      chapterList: [],
      limit: 8,
      dialogVisible: false
    };
  },
  methods: {
    handleAddChapter() {
      this.$router.push({
        path: "/Admin/chapterManagement/" + this.courseId + "/addChapter",
        query: { chapterNum: this.chapterData.length + 1 }
      });
    },
    handlePageChange(pageIndex) {
      let start = (pageIndex - 1) * this.limit;
      let end = start + this.limit;
      this.chapterList = this.chapterData.slice(start, end);
    },
    handleEdit(chapter) {
      console.log(chapter);
      this.$router.push({
        path: "/Admin/chapterManagement/" + this.courseId + "/addChapter",
        query: {
          chapterId: chapter.chapterId,
          chapterNum: Number.parseInt(chapter.chapterNum)
        }
      });
    },
    handleDelete({ chapterId, chapterNum }) {
      let token = window.localStorage.getItem("idToken");
      const url = `/admin/course/${this.courseId}/chapters/${chapterId}`;
      const headers = { Authorization: localStorage.getItem("idToken") };
      instance
        .delete(url, { headers: headers })
        .then(response => {
          console.log(response);
          this.dialogVisible = false;
          if (response.data && response.data.status === "ok") {
            this.$message({ type: "success", message: "删除成功" });
            this.initChapterData();
          } else {
            throw new Error(JSON.stringify(response));
          }
        })
        .catch(err => {
          console.error(err);
          this.$message({ type: "error", message: "删除失败" });
        });
    },
    initChapterData() {
      this.$store.dispatch("getChapterDetial", this.courseId).then(() => {
        this.chapterData = this.$store.state.chapterData;
        console.log({ 章节数据: this.chapterData });
        if (this.chapterData) {
          this.chapterData = this.chapterData.map(item => {
            item.date = this.timestampToTime(item.date);
            return item;
          });
        }
        this.handlePageChange(1);
      });
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
    this.courseId = this.$route.params.courseId;
    this.initChapterData();
  }
};
</script>

<style scoped>
#chapterManagement {
  padding: 0 20px 20px 20px;
}
#chapterManagement .spaceLine {
  display: block;
  height: 15px;
}
</style>
