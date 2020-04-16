<template>
  <div id="rollPic" class="container-fluid">
    <el-dialog v-if='dialogVisible' :visible.sync="dialogVisible" width="58%" @open="handleDialogOpen">
      <el-row :gutter="20">
        <el-col :span="16">
          <p class="loading-tips" v-show="!iFrameShow">正在努力加载。。。</p>
          <iframe v-show="iFrameShow" id="scratch" frameborder="no" border="0"
            :src="`${scratchUrl}${currentList[curWork].url}`"></iframe>
        </el-col>
        <el-col :span="8" style="height:450px">
          <h3>作品名</h3>
          <p>{{currentList[curWork].name}}</p>
          <h3>操作说明</h3>
          <p>{{currentList[curWork].guide}}</p>
          <h3>老师点评</h3>
          <p>{{currentList[curWork].teacher_remark}}</p>
        </el-col>
      </el-row>
    </el-dialog>
    <div class="menu">
      <button  v-for='(item,index) in items' :class="{'active' :curCourse===index}" @click="changeCourse(index)">{{item.COURSE_NAME}}</button>
    </div>
    <!-- <div class="menu">
      <button :class="{'active' :curTab===0}" @click="tab(0)">未提交</button>
      <button :class="{'active' :curTab===1}" @click="tab(1)">已提交</button>
    </div> -->
    <h4 v-if="!currentList.length" style="padding:20px 0 0 50px">还没有做作业哦~</h4>
    <el-row v-else :gutter="30">
      <el-col v-for="(item,index) in currentList" :key="index" :span="6" :offset="1" :push="1">
        <div class="inside" @mouseover="controlCardShow(index, true)" @mouseleave="controlCardShow(index,false)">
          <img class="img" :src="item.img_url" alt />
          <div class="details" v-show="index===curId">
            <div class="detail_item">
              <i v-for="star in 5" :key="star" :class="['fa','fa-lg',item.rank < star ? 'fa-star-o': 'fa-star']"
                style="color: #ffbf35"></i>
              <span>{{item.teacher_remark}}</span>
            </div>
          </div>
        </div>
        <div class="outside">
          <div class="left">
            <div class="up">
              <img class="work_type" :src="`${baseUrl}dashboard/zuopin.png`" />
              <span>{{item.name}}</span>
            </div>
            <div class="down">
              <i class="fa fa-clock-o fa-lg" style="color: #50b8ee;line-height:1em"></i>
              <span>{{item.time}}</span>
            </div>
          </div>
          <div class="right">
            <button class="edit view" @click="viewWork(index)">查看</button>
            <button class="delete view" @click="del(index)">删除</button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-pagination class="pagination" :page-size="limit" v-if="tableData.length" background layout="prev, pager, next"
      :total="tableData.length" @current-change="handlePageChange" @prev-click="handlePageChange"
      @next-click="handlePageChange"></el-pagination>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "rollPic",
    data() {
      return {
        curId: -1,
        curTab: 0,
        curWork: 0,
        curCourse:0,
        iFrameShow: false,
        currentList: [],
        // tableData: [
        //   {
        //     img_url: "https://www.henrenx.cn/f92839.jpg",
        //     rank: "3",
        //     teacher_remark: "做的真棒！",
        //     name: "植物大战僵尸",
        //     url: "https://henrenx.cn",
        //     flag: 0,
        //     guide: "This is the homework guide from me.",
        //     time: "2018年7月3日"
        //   },
        //   {
        //     img_url: "https://www.henrenx.cn/f92839.jpg",
        //     rank: "3",
        //     teacher_remark: "做的真棒！",
        //     name: "植物大战僵尸",
        //     url: "https://henrenx.cn",
        //     flag: 0,
        //     guide: "This is the homework guide from me.",
        //     time: "2018年7月3日"
        //   }
        // ],
        limit: 6,
        dialogVisible: false,
        scratchUrl:
          "https://cedsi.s3.cn-northwest-1.amazonaws.com.cn"
      };
    },
    methods: {
      changeCourse(index) {
        this.curCourse = index;
        this.$store
          .dispatch("getWork", this.items[index].ID)
          .then(() => {
            if (this.tableData.length != 0) {
              for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i].time = this.timestampToTime(
                  this.tableData[i].time
                );
              }
              this.handlePageChange(1);
            }else{
              this.currentList=[];
            }
          })
      },
      handlePageChange(pageIndex) {
        let start = (pageIndex - 1) * this.limit;
        let end = start + this.limit;
        this.currentList = this.tableData.slice(start, end);
      },
      controlCardShow(index, isShow) {
        this.curId = isShow ? index : -1;
      },
      viewWork(index) {
        let item = this.currentList[index];
        if (item.flag) {
          window.open("https://" + this.currentList[index].url);
        } else {
          this.dialogVisible = true;
        }
      },
      tab(index) {
        this.curTab = index;
      },
      del(index) { },
      timestampToTime(timestamp) {
        timestamp = String(timestamp);
        timestamp = timestamp.length == 10 ? timestamp * 1000 : timestamp * 1;
        var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + "-";
        var M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        var D =
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
        var h =
          (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
        var m =
          (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
          ":";
        var s =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
      },
      handleDialogOpen() {
        const that = this;
        const event = () => (that.iFrameShow = true);
        setTimeout(() => {
          let scratch = document.getElementById("scratch");
          if (scratch.requestFullScreen) {
            scratch.requestFullScreen();
          }
          if (scratch.attachEvent) {
            scratch.attachEvent("onload", event);
          } else {
            scratch.onload = event;
          }
        }, 200);
      }
    },
    created: function () {
      this.$store.commit("updateLoading", true);
      this.$store.dispatch("getCourse").then(() => {
        this.$store
          .dispatch("getWork", this.$store.state.courseList[0].ID)
          .then(() => {
            if (this.tableData.length != 0) {
              for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i].time = this.timestampToTime(
                  this.tableData[i].time
                );
              }
              console.log(this.tableData)
              this.handlePageChange(1);
            }
          });
      });
    },
    computed: {
      ...mapState({
        items: state => state.courseList,
        tableData: state => state.workList,
        // currentList: state => state.workCurrentList,
        // limit: state => state.limit
        baseUrl: state => state.url
      })
    }
  };
</script>


<style scoped>
  iframe {
    width: 100%;
    height: 450px;
  }

  .menu {
    background-color: #f4f9fa;
    padding-top: 10px;
    padding-left: 40px;
    padding-right: 40px;
    display: flex;
    justify-content: center;
  }

  .menu button {
    background-color: inherit;
    color: #575757;
    padding: 10px 32px;
    margin: 0 4px 15px;
    text-decoration: none;
    padding: 4px 10px;
    font-size: 18px;
    border: none;
    font-weight: 550;
    outline: none;
  }

  .menu button:hover,
  .menu .active {
    color: #00bcd4;
  }

  .img {
    border-radius: 20px;
    width: 100%;
    height: 100%;
  }

  .inside {
    border-radius: 20px;
    height: 170px;
  }

  .inside:hover {
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -ms-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
    box-shadow: 0px -10px 10px 0px #ccc,
      /*上边阴影*/
      -2px 0px 10px 0px #ccc,
      /*左边阴影*/
      2px 0px 10px 0px #ccc,
      /*右边阴影*/
      0px 10px 10px 0px #ccc;
    /*下边阴影*/
  }

  .view {
    background: #f4f9fa;
    height: 30px;
    width: 60px;
    font-size: 12px;
    text-align: center;
    margin-right: 10px;
    margin-top: 10px;
    font-weight: bold;
    border-radius: 8px;
    outline: none;
  }

  .edit {
    color: #50b8ee;
    border: 1px solid #50b8ee;
  }

  .edit:hover,
  .edit:focus {
    background: #50b8ee;
    color: #f4f9fa;
  }

  .delete {
    color: red;
    border: 1px solid red;
  }

  .delete:hover,
  .delete:focus {
    background: red;
    color: #f4f9fa;
  }

  .details {
    background-color: rgba(0, 0, 0, 0.35);
    z-index: 999;
    bottom: 65px;
    position: relative;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 20px 0;
  }

  .detail_item {
    margin-left: 40px;
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    position: relative;
    border-radius: 20px;
    color: #fff;
  }

  .outside {
    margin-bottom: 15px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    font-size: 12px;
    justify-content: space-between;
  }

  .up {
    margin: 10px 0 5px 0;
    display: flex;
    justify-content: flex-start;
    width: 150px;
    color: #777;
  }

  span {
    margin-left: 10px;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .down {
    display: flex;
    color: #777;
  }

  .work_type {
    width: 25px;
    height: 15px;
  }

  .pagination {
    padding-left: 90px;
  }

  .loading-tips {
    font-size: 35px;
    text-align: center;
    margin-top: 30%;
    background: -webkit-linear-gradient(left,
        #147b96,
        #e6d205 25%,
        #147b96 50%,
        #e6d205 75%,
        #147b96);
    color: transparent;
    -webkit-background-clip: text;
    background-size: 200% 100%;
    animation: masked-animation 1s infinite linear;
  }

  @-webkit-keyframes masked-animation {
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: -100% 0;
    }
  }
</style>