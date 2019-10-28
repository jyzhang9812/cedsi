<template>
  <div id="chapterManagement">
    <!-- 提示模态框（Modal） -->
    <div
      class="modal fade"
      id="alterModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog alterwidth">
        <div class="modal-content">
          <div class="modal-header alterheader">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">提示</h4>
          </div>
          <div class="modal-body">
            <div class="altercontent" aria-hidden="true">
              <img :src="alterimg" class="alterimg" />
              <span>{{alterMes}}</span>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="submitDelete()"
            >确定</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
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
              <span class="blue" @click="updateChapter(seq)">编辑</span>&nbsp;&nbsp;
              <span
                class="red"
                @click="deleteChapter(seq)"
                data-toggle="modal"
                data-target="#alterModal"
              >删除</span>
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
import { mapState } from "vuex";
import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";

export default {
  name: "chapters",
  components: { Pagination },
  data() {
    return {
      file: null,
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
      chapterData: [],
      currentPage: 0,
      //提示框
      alterimg: this.$store.state.url + "eduAdmin/alter.png",
      alterMes: ""
    };
  },
  methods: {
    //换页
    changeTablePages(value) {
      var currentPage = value / this.limit;
      this.currentPage = currentPage;
      this.$store.commit(
        "changeChapterCurrentList",
        this.currentPage * this.limit
      );
    },
    gotoAdd() {
      this.$router.push({
        path: "/Admin/chapterManagement/" + this.courseId + "/addChapter",
        // name:"addChapter",
        query: {
          //     courseId:this.courseId,
          chapterNum: this.chapterLength + 1
        }
      });
    },
    updateChapter(seq) {
      this.chapterIndex = this.currentPage * this.limit + seq;
      this.chapterId = this.chapterData[this.chapterIndex].chapterId;
      this.$router.push({
        path: "/Admin/chapterManagement/" + this.courseId + "/addChapter",
        query: {
          chapterId: this.chapterId,
          chapterNum: this.chapterIndex + 1
        }
      });
    },
    deleteChapter(seq) {
      this.alterMes = "确认删除吗？";
      // this.alterMes = this.$toast.warning({ title: "章节管理", message: "确认删除吗" });
      this.chapterIndex = this.currentPage * this.limit + seq;
    },
    submitDelete() {
      var token = window.localStorage.getItem("idToken");
      this.chapterId = this.chapterData[this.chapterIndex].chapterId;
      globalAxios
        .delete(
          "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/admin/course/" +
            this.courseId +
            "/chapters/" +
            this.chapterId,
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
            this.chapterList.splice(this.chapterIndex, 1);
            this.changeTablePages(this.currentPage * this.limit);
          },
          error => {
            // this.$router.push({path:'/404'})
            console.log(error);
          }
        );
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
    }
  },
  created() {
    this.courseId = this.$route.params.courseId;
    this.$store.dispatch("getChapterDetial", this.courseId).then(() => {
      this.chapterData = this.$store.state.chapterData;
      console.log(this.$store.state.chapterData);
      //console.log('333333333333333')
      if (this.chapterData) {
        for (let i = 0; i <= this.chapterData.length; i++) {
          this.chapterData[i].date = this.timestampToTime(
            this.$store.state.chapterData[i].date
          );
        }
      }
    });
  },
  computed: {
    ...mapState({
      chapterList: state => state.chapterData,
      // videoData: state => state.videoData,
      currentList: state => state.chapterCurrentList,
      limit: state => state.limit,
      chapterLength: state => state.chapterLength
    })
  }
};
</script>

<style scoped>
#chapterManagement {
  font-size: 12px;
  color: #606266;
  width: 98%;
  margin: 0 auto;
}
#chapterManagement .chapter-nav {
  width: 100%;
  height: 50px;
  text-align: center;
}
#chapterManagement .chapter-btn {
  font-size: 14px;
  margin-right: 10px;
  width: 100px;
  height: 40px;
  line-height: 35px;
  border-radius: 30px;
  color: #fff;
}

#chapterManagement .chapter-btn:focus {
  outline: none;
}
#chapterManagement .chapter-inactive-btn {
  background-color: #eee;
  border: 1px solid #eee;
  color: #666;
}
#chapterManagement .chapter-inactive-btn:hover {
  background-color: rgba(238, 238, 238, 0.575);
  border: 1px solid rgba(238, 238, 238, 0.575);
  color: #666;
}
#chapterManagement .chapter-active-btn {
  background-color: #409eff;
  border: 1px solid #409eff;
}
#chapterManagement .chapter-active-btn:hover {
  background-color: #40a0ffcc;
  border: 1px solid #40a0ffcc;
}

#chapterManagement .title {
  text-align: center;
}

#chapterManagement .content td {
  line-height: 23px;
}

#chapterManagement table tr {
  text-align: center !important;
}

#chapterManagement table td {
  vertical-align: middle !important;
}

#chapterManagement .outside {
  margin-top: 20px;
}

#chapterManagement .operation {
  color: #409eff;
  margin: 0 3px;
  cursor: pointer;
}

#chapterManagement .btn {
  background: #409eff;
  color: #fff;
  height: 30px;
  border-radius: 5px;
  font-size: 12px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#chapterManagement .btn:focus {
  outline: none;
}

#chapterManagement .btn:hover {
  background: #66b1ff;
}

#chapterManagement .btn-search {
  width: 54px;
}

#chapterManagement .btn-clear {
  width: 88px;
}

#chapterManagement .blue {
  cursor: pointer;
  color: #409eff;
}

#chapterManagement .red {
  cursor: pointer;
  color: #ff6947;
}
#chapterManagement .alterwidth {
  width: 30%;
}
#chapterManagement .altercontent {
  width: 300px;
  margin: 0 auto;
}
#chapterManagement .alterimg {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
#chapterManagement .modal-footer {
  border: none;
  text-align: center;
}
#chapterManagement .alterheader{
  border: none;
}
</style>