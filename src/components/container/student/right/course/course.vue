<template>
  <div id="allCourse">
    <el-dialog :visible.sync="myVideo" controls>
      <video width="600" height="400" controls>
        <source :src="videosrc" type="video/mp4" />
      </video>
    </el-dialog>
    <div class="searchBar">
      <el-row type="flex" justify="space-between">
        <!-- 搜索框 -->
        <el-col :span="10">
          <el-input
            class="searchBox"
            placeholder="课程名..."
            v-model="input"
            @keyup.enter.native="searchEnterFun"
          >
            <i slot="suffix" class="el-input__icon el-icon-search" @click="searchData"></i>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="warning">
            <a :href="scratch">开始创作</a>
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="courseCard">
      <el-row :gutter="30">
        <el-col :span="8" v-for="(item,index) in currentList" :key="index">
          <div class="inside">
            <img :src="item.COVER" alt />
            <div class="hide">
              <h3>课程简介</h3>
              <p>{{item.INTRO}}</p>
            </div>
          </div>
          <el-row type="flex" justify="space-between" style="margin-top: 5px;">
            <el-col :offset="1">
              <span class="title">{{item.COURSE_NAME}}</span>
            </el-col>
            <el-col>
              <el-row>
                <el-col :span="10">
                  <el-button type="success" plain size="small" @click="changeCourseNum(index)">试听</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button
                    type="primary"
                    plain
                    size="small"
                    @click="jmpPay(index)"
                  >{{item.PRICE!=0?'购买':'学习'}}课程</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <el-pagination
      class="pagination"
      :page-size="limit"
      background
      layout="prev, pager, next"
      :total="tableData.length"
      @current-change="handlePageChange"
      @prev-click="handlePageChange"
      @next-click="handlePageChange"
    ></el-pagination>
  </div>
</template>
<script>
import { mapState } from "vuex";
import instance from "../../../../../axios-auth";
export default {
  name: "courseCard",
  data() {
    return {
      scratch:
        "https://s3.cn-northwest-1.amazonaws.com.cn/ced.cedsie.com/build/index.html",
      input: "",
      tableData: [],
      currentList: [],
      limit: 6,
      courseNum: 0,
      myVideo: false,
      videosrc: "",
      activeName: ""
    };
  },
  methods: {
    searchEnterFun: function(e) {
      var keyCode = window.event ? e.keyCode : e.which;
      if (keyCode == 13) {
        this.searchData();
      }
    },
    searchData() {
      let value = this.input;
      let tableList = this.tableData;
      if (value === "") return tableList;
      let restTableList = tableList.slice(0);
      for (let i = 0, j = restTableList.length; i < j; i++) {
        if (!new RegExp(value).test(restTableList[i]["COURSE_NAME"])) {
          restTableList.splice(i, 1);
          j -= 1;
          i -= 1;
        }
      }
      this.currentList = restTableList;
    },
    handlePageChange(pageIndex) {
      let start = (pageIndex - 1) * this.limit;
      let end = start + this.limit;
      this.currentList = this.tableData.slice(start, end);
    },
    changeCourseNum(index) {
      this.myVideo = true;
      let token = localStorage.getItem("idToken");
      let courseId = this.currentList[index].ID;
      let url = `/student/courses/${courseId}/chapters`;
      const config = { headers: { Authorization: token } };
      instance
        .get(url, config, { course_id: courseId })
        .then(({ data }) => {
          console.log({ 章节数据: data });
          this.videosrc = data.allChapters[0].CP_RESOURCE[0].RS_URL;
          console.log(this.videosrc);
        })
        .catch(err => console.error(err));
    },
    jmpPay(index) {
      if (this.currentList[index].PRICE != 0) {
        this.$router.push({
          path: "/payment",
          query: { id: this.currentList[index].ID, type: 2 }
        });
      } else {
        let allid = {
          id: this.currentList[index].ID
          // orderId: '000',
          // cover: this.currentList[index].COVER
        };
        this.$store.dispatch("postCourseId", allid).then(() => {
          this.$router.push({
            path: "/dashboard/coursemap",
            query: { id: this.currentList[index].ID }
          });
        });
      }
    }
  },
  mounted() {
    let token = localStorage.getItem("idToken");
    let url = `/student/courses`;
    const config = { headers: { Authorization: token } };
    instance
      .get(url, config)
      .then(({ data }) => {
        console.log({ 课程数据: data });
        this.tableData = data.courses;
        console.log(this.tableData);
      })
      .catch(err => console.error(err));
    this.handlePageChange(1);
  }
};
</script>
<style>
.searchBar {
  background-color: #00bcd4;
  color: #fff;
  width: 100%;
  padding: 30px;
}

.searchBox input.el-input__inner {
  background: #17788e;
  border: none;
  color: #fff;
}

a {
  text-decoration: none;
  color: #fff;
}

.courseCard {
  padding-left: 20px;
}

img {
  width: 100%;
  border-radius: 8%;
  height: 100%;
}

.title {
  line-height: 2;
  color: #000000;
}

.inside {
  width: 100%;
  height: 220px;
  position: relative;
  border-radius: 8%;
  box-shadow: 1px 1px 6px #5c5c5c;
  margin-top: 30px;
  margin-bottom: 10px;
}

.hide {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(46, 45, 45, 0.6);
  top: 0;
  left: 0;
  border-radius: 8%;
  opacity: 0;
  text-align: center;
  font-size: 13px;
  overflow: auto;
}

.hide::-webkit-scrollbar {
  width: 0px;
}

.hide p {
  display: inline-block;
  padding: 0 25px 0 25px;
  line-height: 1.5;
}

.inside:hover {
  transform: scale(1.02);
}

.inside:hover .hide {
  opacity: 1;
  transform: scale(1.02);
}
</style>