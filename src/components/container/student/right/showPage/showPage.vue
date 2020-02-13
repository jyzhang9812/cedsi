<template>
  <el-col id="showPage">
    <el-row class="activity">
      <el-row class="title-create">
        <h3>精品活动</h3>
        <i class="fa fa-cog fa-2x" style="color:#FFF;"></i>
        <i class="fa fa-trophy fa-2x" style="color:rgb(255, 191, 53);"></i>
        <button @click="createProject" disabled>开始创作</button>
      </el-row>
      <el-row>
        <el-col class="activity-card" v-for="item in activities" :key="item.id" :span="6">
          <img :src="item.cover" alt />
          <div class="activity-info">
            <h4>{{item.name}}</h4>
            <button>查看详情</button>
          </div>
        </el-col>
      </el-row>
    </el-row>
    <el-row class="course"></el-row>
    <el-row class="author"></el-row>
  </el-col>
</template>

<script>
import userCard from "./userCard.vue";
import communityCard from "./communityCard.vue";
import allCourseCard from "./allCourseCard.vue";
import { mapState } from "vuex";

export default {
  name: "presentation",
  components: {
    userCard,
    communityCard,
    allCourseCard
  },
  data() {
    return {
      arrComponent: [
        {
          componentName: "allCourseCard",
          title: "全部课程"
        },
        {
          componentName: "userCard",
          title: "优秀作者"
        }
      ],
      calleft: [0, 0, 0, 0],
      i: -1,
      curId: 0,
      limit: 12,
      currentList: [],
      tableData: [],
      activities: [
        {
          id: "001",
          name: "最新活动",
          desc: "这是最新的活动, 请大家注意了嗯嗯嗯嗯嗯",
          cover:
            "https://cedsi.s3.cn-northwest-1.amazonaws.com.cn/eduActivity/6cee65e2.jpeg"
        }
      ]
    };
  },
  methods: {
    createProject() {},
    gotoActivity(index) {
      this.$router.push({
        path: "/activitydetailCard",
        query: { id: this.slidePic[index].id, type: this.slidePic[index].type }
      });
    },
    tab(index) {
      this.curId = index;
    },
    show(index) {
      this.i = index;
      this.isShow = true;
    },
    hidden(index) {
      this.i = -1;
      this.isShow = false;
    },
    //点击按钮左移
    zuohua(index) {
      this.calleft[index] += 1020;
    },
    //点击按钮右移
    youhua(index) {
      this.calleft[index] -= 1020;
    }
  },
  created: function() {
    this.$store.dispatch("getActivity");
    this.$store.dispatch("getEduActivity");
  },
  computed: {
    ...mapState({
      slidePic: state => state.slidePic,
      scratch: state => state.scratch
    })
  }
};
</script>

<style scoped>
.activity {
  background: url("https://www.tynker.com/image/dashboard/student/launchpad/bg-space.jpg");
  height: 300px;
}

.title-create h3 {
  color: #fff;
  font-size: 24px;
  font-weight: 500;
  float: left;
  margin-top: 15px;
  margin-left: 20px;
}

.title-create button {
  float: right;
  margin: 15px 50px 0 0;
  font-family: inherit;
  padding: 0.8em 1em;
  -webkit-appearance: none;
  border: 1px solid transparent;
  border-radius: 5px;
  font-size: 15px;
  line-height: 1;
  text-align: center;
  cursor: pointer;
  background: #ff8d1a;
  color: #fff;
}

.title-create i {
  width: 50px;
  height: 45px;
  margin: 0 10px 2px 0;
  padding-top: 10px;
  background: #333;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  text-align: center;
  float: right;
}

.activity-card {
  width: 300px;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
}

.activity-card img {
  width: 100%;
  height: 100%;
}

.activity-card:hover {
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  -ms-transform: scale(1.05);
  -o-transform: scale(1.05);
  transform: scale(1.05);
  -moz-box-shadow: 5px 10px 10px #25293a;
  -webkit-box-shadow: 5px 10px 10px #25293a;
  box-shadow: 5px 10px 10px #25293a;
}

.activity-info {
  width: 300px;
  height: 100px;
  background: linear-gradient(180deg, rgba(69, 72, 77, 0) 0, #232427 50%, #000);
  z-index: 999;
  display: flex;
  justify-content: space-between;
  margin-top: -100px;
}

.activity-info button {
  background: #51c79f;
  color: #fff;
  height: 35px;
  width: 75px;
  font-size: 12px;
  text-align: center;
  margin: 35px 10px 0 0;
  font-weight: 700;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
}

.activity-info h4 {
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  margin: 40px 0 0 10px;
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f4f9fa;
  min-height: 620px;
  padding: 0;
}

.threeImg {
  min-width: 1000px;
  height: 100%;
  color: black;
}

.threeImg .Containt ul {
  margin: 0 auto;
  /* width: 2400px; */
  position: absolute;
  left: 0px;
  cursor: pointer;
  min-height: 100%;
}

.threeImg .Containt ul li {
  margin-right: 20px;
  margin-top: 10px;
  float: left;
}

.Containt {
  position: relative;
  min-height: 300px;
  height: 100%;
  overflow: hidden;
  margin: 0 auto;
}

.recommend_title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.iconleft {
  position: absolute;
  text-align: center;
  width: 50px;
  height: 50px;
  top: 120px;
  z-index: 99999;
  background-color: #fff;
  vertical-align: middle;
  border-radius: 50%;
  opacity: 0.5;
}

.iconright {
  display: inline-block;
  position: absolute;
  text-align: center;
  right: 0;
  top: 120px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  z-index: 99999;
  background-color: #fff;
  vertical-align: middle;
  opacity: 0.5;
  justify-content: center;
}
.iconleft i,
.iconright i {
  margin: 10px auto;
}
.recommend_title i {
  width: 50px;
  height: 55px;
  margin: 0 10px 2px 0;
  padding-top: 10px;
  background: #333;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  text-align: center;
}

.recommend_title i:hover {
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  -ms-transform: scale(1.05);
  -o-transform: scale(1.05);
  transform: scale(1.05);
  cursor: pointer;
}

#showPage p {
  margin-right: 10px;
  color: #fff;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

/* 推荐课程 */
ul {
  min-height: 250px;
  list-style-type: none;
  padding-bottom: 20px;
}

.course {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.course_card {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 20px;
}

.img {
  width: 300px;
  height: 200px;
  border-radius: 8px;
}

.inside {
  border-radius: 8px;
}

.el-icon-arrow {
  margin-top: 12px;
  margin-left: 12px;
  width: 25px;
  height: 25px;
  opacity: 0.5;
}

.el-icon-arrow:hover {
  opacity: 1;
}

.iconright:hover {
  opacity: 1;
  box-shadow: 2px 2px 10px #23527c;
}

.iconleft:hover {
  opacity: 1;
  box-shadow: 5px 10px 10px #25293a;
}

.details {
  width: 300px;
  height: 100px;
  /* background-color: rgba(0, 0, 0, 0.35); */
  background: linear-gradient(
    to bottom,
    rgba(69, 72, 77, 0) 0%,
    #232427 50%,
    #000000 100%
  );
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: -100px;
  position: relative;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.detail_item {
  margin: 30px 10px 0 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  color: #fff;
}

.icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}

.work_type {
  width: 34.7px;
  height: 20px;
}

.btn {
  background: #51c79f;
  color: #fff;
  height: 35px;
  width: 75px;
  font-size: 12px;
  text-align: center;
  margin-right: 20px;
  font-weight: bold;
  border-radius: 8px;
}

.button {
  display: inline-block;
  vertical-align: middle;
  margin: 2px 30px 0 0;
  font-family: inherit;
  padding: 0.8em 1em;
  -webkit-appearance: none;
  border: 1px solid transparent;
  border-radius: 5px;
  transition: background-color 0.25s ease-out, color 0.25s ease-out;
  font-size: 1.5rem;
  line-height: 1;
  text-align: center;
  cursor: pointer;
  background: #ff8d1a;
  color: #fff;
}
</style>