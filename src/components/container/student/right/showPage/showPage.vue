<template>
  <el-col id="showPage">
    <!-- 精品活动 -->
    <el-row class="activity">
      <!-- 精品活动标题栏 -->
      <el-row class="title-create">
        <h3>精品活动</h3>
        <i class="fa fa-cog fa-2x" style="color:#FFF;"></i>
        <i class="fa fa-trophy fa-2x" style="color:rgb(255, 191, 53);"></i>
        <button @click="createProject" disabled>开始创作</button>
      </el-row>
      <!-- 精品活动卡片-->
      <el-row :gutter="10">
        <el-col :span="2" class="icon-control control-left">
          <i class="fa fa-chevron-left fa-2x"></i>
        </el-col>
        <el-col :span="2" class="icon-control control-right">
          <i class="fa fa-chevron-right fa-2x"></i>
        </el-col>
        <el-col v-for="item in activities" :key="item.id" :span="6" :offset="1" :push="1">
          <div
            @mouseenter="item.showInfo = true;"
            @mouseleave="item.showInfo = false;"
            class="activity-card"
          >
            <img :src="item.cover" alt />
            <div class="activity-info" :style="{'display': item.showInfo ? 'flex' : 'none'}">
              <h4>{{item.name}}</h4>
              <button>查看详情</button>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-row>
    <!-- 全部课程 -->
    <el-row class="course">
      <!-- 全部课程标题栏 -->
      <el-row class="title-course">
        <h3>全部课程</h3>
      </el-row>
      <!-- 全部课程卡片 -->
      <el-row :gutter="10">
        <el-col :span="2" class="icon-control control-left">
          <i class="fa fa-chevron-left fa-2x"></i>
        </el-col>
        <el-col :span="2" class="icon-control control-right">
          <i class="fa fa-chevron-right fa-2x"></i>
        </el-col>
        <el-col v-for="item in activities" :key="item.id" :span="6" :offset="1" :push="1">
          <div
            @mouseenter="item.showInfo = true;"
            @mouseleave="item.showInfo = false;"
            class="activity-card"
          >
            <img :src="item.cover" alt />
            <div class="activity-info" :style="{'display': item.showInfo ? 'flex' : 'none'}">
              <h4>{{item.name}}</h4>
              <button>查看详情</button>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-row>
    <el-row class="author">
      <el-row>
        <h3>优秀作者</h3>
      </el-row>
      <el-row>
        <div style="width:200px; height:300px"></div>
      </el-row>
    </el-row>
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
            "https://cedsi.s3.cn-northwest-1.amazonaws.com.cn/eduActivity/6cee65e2.jpeg",
          showInfo: false
        },
        {
          id: "002",
          name: "最新活动",
          desc: "这是最新的活动, 请大家注意了嗯嗯嗯嗯嗯",
          cover:
            "https://cedsi.s3.cn-northwest-1.amazonaws.com.cn/eduActivity/6cee65e2.jpeg",
          showInfo: false
        },
        {
          id: "003",
          name: "最新活动",
          desc: "这是最新的活动, 请大家注意了嗯嗯嗯嗯嗯",
          cover:
            "https://cedsi.s3.cn-northwest-1.amazonaws.com.cn/eduActivity/6cee65e2.jpeg",
          showInfo: false
        }
      ]
    };
  },
  methods: {
    createProject() {},
    changeCardShadow(index, type) {
      console.log(index, type);
      this.activities[index].showInfo = !this.activities[index].showInfo;
    },
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
  float: left;
}

h3 {
  margin-top: 15px;
  margin-left: 20px;
  font-size: 24px;
  font-weight: 500;
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
  cursor: pointer;
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
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(69, 72, 77, 0)),
    color-stop(50%, #232427),
    to(#000000)
  );
  background: linear-gradient(
    to bottom,
    rgba(69, 72, 77, 0) 0%,
    #232427 50%,
    #000000 100%
  );
  z-index: 999;
  justify-content: space-between;
  margin-top: -100px;
  position: relative;
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

.icon-control {
  opacity: 1;
  -webkit-box-shadow: 2px 2px 10px #23527c;
  box-shadow: 2px 2px 10px #23527c;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  position: absolute;
  align-items: center;
  width: 50px;
  height: 50px;
  top: 80px;
  z-index: 99999;
  border-radius: 50%;
  cursor: pointer;
  background-color: #7fabc4;
}

.icon-control:hover {
  background-color: #fff;
}

.control-left {
  left: 30px;
}

.control-right {
  right: 30px;
}

.course {
  height: 300px;
  background-color: #fff;
}
</style>