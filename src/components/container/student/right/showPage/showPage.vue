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
        <el-col :span="2" class="icon-control control1-left" @click.native="changeGroup('prev','activity')">
          <i class="fa fa-chevron-left fa-2x"></i>
        </el-col>
        <el-col :span="2" class="icon-control control1-right" @click.native="changeGroup('next','activity')">
          <i class="fa fa-chevron-right fa-2x"></i>
        </el-col>
        <el-col v-for="item in activities" :key="item.id" :span="6" :offset="1" :push="1">
          <div @mouseenter="item.showInfo = true;" @mouseleave="item.showInfo = false;" class="activity-card">
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
        <el-col :span="2" class="icon-control control2-left" @click.native="changeGroup('prev','course')">
          <i class="fa fa-chevron-left fa-2x"></i>
        </el-col>
        <el-col :span="2" class="icon-control control2-right" @click.native="changeGroup('next','course')">
          <i class="fa fa-chevron-right fa-2x"></i>
        </el-col>
        <el-col v-for="item in courses" :key="item.ID" :span="6" :offset="1" :push="1">
          <div @mouseenter="item.showInfo = true;" @mouseleave="item.showInfo = false;" @click="learnCourse(item)"
            class="course-card">
            <img :src="item.COVER" alt />
            <div class="course-info">
              <h5>{{item.COURSE_NAME}}</h5>
              <p>{{item.INTRO}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-row>
    <el-row class="author">
      <el-row>
        <h3>优秀作者</h3>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col class="author-card" v-for="item in authors" :key="item.id" :span="22" :push="0.5">
          <el-row class="author-info">
            <img :src="item.avatar" alt />
            <h5>
              <strong>作者姓名</strong>
            </h5>
          </el-row>
          <el-row class="project-info">
            <el-col :offset="4">
              <i class="fa fa-gamepad fa-lg" style="color:#ffbf35;"></i>
              <p>作品</p>
              <p>99</p>
            </el-col>
            <el-col>
              <i class="fa fa-heart fa-lg" style="color:#FF808B;"></i>
              <p>点赞</p>
              <p>99</p>
            </el-col>
            <el-col>
              <i class="fa fa-eye fa-lg" style="color:#50B8EE;"></i>
              <p>浏览</p>
              <p>99</p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="more-project">
          <el-link type="primary" :underline="false">更多作品</el-link>
        </el-col>
      </el-row>
    </el-row>
    <el-row class="spaceLine"></el-row>
  </el-col>
</template>

<script>
  import instance from "../../../../../axios-auth";

  export default {
    name: "presentation",
    data() {
      let tynkerBase = "https://www.tynker.com/image/course-card/vertical/";
      return {
        activities: [],
        courses: [],
        activityList: [],
        courseList: [],
        authors: [
          {
            avatar: `${tynkerBase}minecraft-starter.png`,
            project: 99,
            like: 99,
            view: 99,
            id: "001"
          },
          {
            avatar: `${tynkerBase}turings-tower.png`,
            project: 99,
            like: 99,
            view: 99,
            id: "002"
          },
          {
            avatar: `${tynkerBase}cannon-crasher-physics-game.png`,
            project: 99,
            like: 99,
            view: 99,
            id: "003"
          },
          {
            avatar: `${tynkerBase}the-drone-menace-arcade-game.png`,
            project: 99,
            like: 99,
            view: 99,
            id: "004"
          },
          {
            avatar: `${tynkerBase}gravity-sling-advanced-projectile-physics.png`,
            project: 99,
            like: 99,
            view: 99,
            id: "005"
          }
        ]
      };
    },
    methods: {
      createProject() { },
      changeGroup(aspect, type) {
        if (type === "activity") {
          if (this.activityList.length <= 3) return;
          let first = this.activities[0];
          let start = this.activityList.findIndex(item => item.id === first.id);
          start += aspect === "prev" ? -1 : 1;
          let end = start + 3;
          if (start >= 0 && end <= this.activityList.length) {
            this.activities = this.activityList.slice(start, end);
          }
        }
        if (type === "course") {
          if (this.courseList.length <= 3) return;
          let first = this.courses[0];
          let start = this.courseList.findIndex(item => item.id === first.id);
          start += aspect === "prev" ? -1 : 1;
          let end = start + 3;
          if (start >= 0 && end <= this.courseList.length) {
            this.courses = this.courseList.slice(start, end);
          }
        }
      },
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
      learnCourse(item) {
        let path = "/dashboard/coursemap";
        let params = { id: item.id };
        this.$router.push({ path, query: params });
      },
      getCourses() {
        let token = localStorage.getItem("idToken");
        let config = { headers: { Authorization: token } };
        instance
          .get("/courses", config)
          .then(({ data }) => {
            console.log(data);

            this.courseList = data;

            console.log(this.courseList)
            this.courses = this.courseList.slice(0, 3);

          })
          .catch(err => {
            console.error(err);
            this.$message({ type: "error", message: "获取课程列表失败" });
          });
      },
      getActivities() {
        let token = localStorage.getItem("idToken");
        let config = { headers: { Authorization: token } };
        instance
          .get("student/activity", config)
          .then(({ data }) => {
            console.log(data);
            if (data.status === "ok") {
              this.activityList = data.ced.concat(data.org).map(item => {
                return {
                  content: item.ACTIVITY_CONTENT_IMG,
                  cover: item.ACTIVITY_COVER,
                  id: item.ACTIVITY_ID,
                  place: item.PLACE,
                  deadline: item.ACTIVITY_TIME,
                  name: item.ACTIVITY_TITLE,
                  time: item.RELEASE_TIME,
                  showInfo: false
                };
              });
              this.activities = this.activityList.slice(0, 3);
            } else {
              throw new Error("get activities fail");
            }
          })
          .catch(err => {
            console.error(err);
            this.$message({ type: "error", message: "获取活动列表失败" });
          });
      }
    },
    mounted() {
      this.getActivities();
      this.getCourses();
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

  .spaceLine {
    height: 70px;
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

  .course-card {
    cursor: pointer;
    width: 350px;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
    transition: all .3s;
  }

  .activity-card img,
  .course-card img {
    width: 100%;
    height: 100%;
  }

  .activity-card:hover,
  .course-card:hover,
  .author-card:hover {
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -ms-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
  }

  .activity-card:hover,
  .author-card:hover {
    -moz-box-shadow: 5px 10px 10px #25293a;
    -webkit-box-shadow: 5px 10px 10px #25293a;
    box-shadow: 5px 10px 10px #25293a;
  }

  .activity-info,
  .course-info {
    width: 300px;
    height: 100px;
    background: linear-gradient(to bottom,
        rgba(69, 72, 77, 0) 0%,
        #232427 50%,
        #000000 100%);
    
    z-index: 999;
    justify-content: space-between;
    margin-top: -100px;
    position: relative;
  }

  .course-info {
    margin-top: -130px;
  }

  .course-info {
    width: 350px;
    padding-left: 10px;
  }

  .course-info h5 {
    font-weight: 800;
    font-size: 15px;
    color: #fff;
    padding-top: 25px;
  }

  .course-info p {
    margin-right: 10px;
    color: #fff;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
  }

  .control1-left:hover,
  .control1-right:hover {
    background-color: #fff;
  }

  .control2-left:hover,
  .control2-right:hover {
    -webkit-box-shadow: 2px 2px 10px #23527c;
    box-shadow: 2px 2px 10px #23527c;
  }

  .control1-left {
    -webkit-box-shadow: 2px 2px 10px #23527c;
    box-shadow: 2px 2px 10px #23527c;
    background-color: #7fabc4;
    left: 30px;
  }

  .control1-right {
    -webkit-box-shadow: 2px 2px 10px #23527c;
    box-shadow: 2px 2px 10px #23527c;
    background-color: #7fabc4;
    right: 30px;
  }

  .control2-left {
    background-color: #ccc;
    left: 30px;
  }

  .control2-right {
    background-color: #ccc;
    right: 30px;
  }

  .course,
  .author {
    height: 300px;
    background-color: #f4f9fa;
  }

  .author-card {
    width: 180px;
    height: 180px;
    border-radius: 10px;
    background: #fff;
    -webkit-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  }

  .author-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .author-info img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-top: 10px;
  }

  .author-info h5 {
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
  }

  .project-info {
    font-size: 12px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .project-info p {
    margin-block-start: 5px;
    margin-block-end: 5px;
  }

  .more-project .el-link {
    margin-top: 60px;
    font-size: 18px;
    color: #337ab7;
  }
</style>