<template>
  <div id="coursecard">
    <h4 v-if="!currentList.length" style="padding:20px 0 0 50px">还没有学习任何课程哦~</h4>
    <el-row v-else style="padding-top:15px;">
      <el-col
        v-for="(item,index) in currentList"
        :key="index"
        :span="6"
        :push="1"
        :offset="1"
        style="margin-bottom: 15px;"
      >
        <div class="inside" @mouseover="show(index)" @mouseleave="hidden(index)">
          <img class="img" :src="item.COVER" />
          <div class="details" v-show="index==i">
            <div class="detail_item">
              <i class="fa fa-desktop fa-lg" aria-hidden="true" style="color: #fcb3a5"></i>
              <span>开课进度: {{item.haveStarted}} / {{item.chaptersNum}}</span>
            </div>
            <div class="detail_item">
              <i class="fa fa-clock-o fa-lg" aria-hidden="true" style="color: #9447ec"></i>
              <span>学习进度: {{item.haveLearned}} / {{item.chaptersNum}}</span>
            </div>
            <div class="detail_item">
              <i class="fa fa-star fa-lg" aria-hidden="true" style="color: #ffbf35"></i>
              <span>总星数: {{item.homeworkStars}}</span>
            </div>
            <div class="detail_item">
              <i class="fa fa-paper-plane fa-lg" aria-hidden="true" style="color: #50b8ee"></i>
              <span>作业提交次数: {{item.homeworkNum}}</span>
            </div>
            <div class="detail_item">
              <i class="fa fa-pencil fa-lg" aria-hidden="true" style="color: #5ccfa6"></i>
              <span>自由创作次数: {{item.creationNum}}</span>
            </div>
          </div>
        </div>
        <div class="outside">
          <span>{{item.COURSE_NAME}}</span>
          <button class="btn">开始学习</button>
        </div>
      </el-col>
    </el-row>
    <el-pagination
      class="pagination"
      :page-size="limit"
      v-if="currentList.length"
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

export default {
  name: "courseCard",
  data() {
    return {
      txt: false,
      limit: 10,
      // tableData: [],
      // currentList: [
        // {
        //   id: "001",
        //   cover: "https://www.henrenx.cn/f92839.jpg",
        //   courseName: "线性代数",
        //   haveStarted: 5,
        //   chaptersNum: 10,
        //   haveLearned: 4,
        //   homeworkStars: 98,
        //   homeworkNum: 13,
        //   creationNum: 17
        // },
        // {
        //   id: "001",
        //   cover: "https://www.henrenx.cn/f92839.jpg",
        //   courseName: "线性代数",
        //   haveStarted: 5,
        //   chaptersNum: 10,
        //   haveLearned: 4,
        //   homeworkStars: 98,
        //   homeworkNum: 13,
        //   creationNum: 17
        // },
        // {
        //   id: "001",
        //   cover: "https://www.henrenx.cn/f92839.jpg",
        //   courseName: "线性代数",
        //   haveStarted: 5,
        //   chaptersNum: 10,
        //   haveLearned: 4,
        //   homeworkStars: 98,
        //   homeworkNum: 13,
        //   creationNum: 17
        // },
        // {
        //   id: "001",
        //   cover: "https://www.henrenx.cn/f92839.jpg",
        //   courseName: "线性代数",
        //   haveStarted: 5,
        //   chaptersNum: 10,
        //   haveLearned: 4,
        //   homeworkStars: 98,
        //   homeworkNum: 13,
        //   creationNum: 17
        // },
        // {
        //   id: "001",
        //   cover: "https://www.henrenx.cn/f92839.jpg",
        //   courseName: "线性代数",
        //   haveStarted: 5,
        //   chaptersNum: 10,
        //   haveLearned: 4,
        //   homeworkStars: 98,
        //   homeworkNum: 13,
        //   creationNum: 17
        // },
        // {
        //   id: "001",
        //   cover: "https://www.henrenx.cn/f92839.jpg",
        //   courseName: "线性代数",
        //   haveStarted: 5,
        //   chaptersNum: 10,
        //   haveLearned: 4,
        //   homeworkStars: 98,
        //   homeworkNum: 13,
        //   creationNum: 17
        // }
      // ],
      currentPage: 0,
      btn: "btn",
      btnh: "btnhover",
      isShow: false,
      inside_detail: [],
      calleft: 0,
      i: -1
    };
  },
  methods: {
    show(index) {
      this.i = index;
      this.isShow = true;
    },
    hidden(index) {
      this.i = -1;
      this.isShow = false;
    },
    handlePageChange(pageIndex) {
      let start = (pageIndex - 1) * this.limit;
      let end = start + this.limit;
      this.currentList = this.tableData.slice(start, end);
    }
  },
  created: function() {
    this.$store.commit("updateLoading", true);
    this.$store.dispatch("getCourse").then(() => {
      if (this.tableData.length == 0) {
        this.txt = true;
      }
    });
  },
  computed: {
    ...mapState({
      tableData: state => state.courseList,
      currentList: state => state.courseCurrentList,
    })
  },
};
</script>


<style scoped>
.img {
  border-radius: 20px;
  width: 100%;
  height: 100%;
}

.pagination {
  margin-left: 100px;
}

.inside {
  border-radius: 20px;
  color: #fff;
  text-decoration: none;
  height: 200px;
  width: 300px;
}

.inside:hover {
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  -ms-transform: scale(1.05);
  -o-transform: scale(1.05);
  transform: scale(1.05);
  box-shadow: 0px -10px 10px 2px #457e72 /*上边阴影*/ -2px 0px 10px 2px #457e72,
    /*左边阴影*/ 2px 0px 10px 2px #457e72,
    /*右边阴影*/ 0px 10px 10px 2px #457e72;
  /*下边阴影*/
}

.btn {
  color: #fff;
  background: #457e72;
  border: 1px solid #51c79f;
  height: 35px;
  width: 90px;
  font-size: 13px;
  text-align: center;
  margin-right: 10px;
  cursor: pointer;
  outline: none;
}

.btn:hover {
  color: #51c79f;
  background: #fff;
  font-size: 15px;
  font-weight: bold;
  border-radius: 8px;
  text-decoration: none;
}

.details {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  border-radius: 20px;
  padding-top: 20px;
  bottom: 205px;
  height: 180px;
}

.detail_item {
  margin-left: 40px;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  position: relative;
  border-radius: 20px;
}

.detail_item i {
  margin: 3px 15px 0 10px;
}

.outside {
  margin-top: 8px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  width: 300px;
}

.outside span {
  font-size: 16px;
  margin-top: 8px;
  margin-left: 30px;
  color: #25293a;
}
</style>