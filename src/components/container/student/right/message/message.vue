<template>
  <div id="msg" class="container">
    <searchBar></searchBar>
    <el-dialog :visible.sync="dialogVisible" width="40%" title="消息详情">
      <h4>{{currentList[curWork].DISPATCH_DATE | dateFormatter}}</h4>
      <el-row>
        <el-link :href="currentList[curWork].ATTACHED_FILE" target="_blank">点击下载附件</el-link>
      </el-row>
      <el-row style="height:250px;overflow-y:auto;">
        <el-image :src="currentList[curWork].MESSAGE_CONTENT"></el-image>
      </el-row>
    </el-dialog>
    <div class="menu">
      <button
        @click="tab(index)"
        v-for="(item,index) in buttons"
        class="tag"
        :key="index"
        :class="{'active':index===curTab}"
      >{{item.name}}</button>
    </div>
    <h4 v-if="!tableData.length" style="padding:20px 0 0 50px">该分类下暂无消息哦~</h4>
    <div class="main" v-else>
      <div
        class="cardbox"
        v-for="(item,index) in currentList"
        :key="index"
        @click="openDialog(index)"
      >
        <div class="card_content">{{item | mesFormatter(buttons[curTab])}}</div>
        <div class="card_footer">
          <span>
            <b style="line-height:30px">{{item.teacher_name}}</b>
            <br />
            {{item.DISPATCH_DATE | dateFormatter}}
          </span>
          <img class="avast" :src="item.avatar" />
        </div>
      </div>
    </div>
    <el-pagination
      class="pagination"
      :page-size="limit"
      :hide-on-single-page="true"
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
import searchBar from "../searchBar.vue";
import { mapState } from "vuex";

export default {
  name: "message",
  components: { searchBar },
  data() {
    return {
      baseURL: "https://cedsi.s3.cn-northwest-1.amazonaws.com.cn",
      curTab: 4,
      curWork: 0,
      limit: 4,
      tableData: [
        {
          DISPATCH_DATE: 1586053981,
          MESSAGE_CONTENT: "https://wiki.wannax.cn/weixin/images/test.png",
          HW_NAME: "我的作业1",
          COURSE_NAME: "我是练习生",
          CP_NAME: "章小节-1",
          DEADLINE: 1586053981,
          ATTACHED_FILE: "https://wiki.wannax.cn/learning/work.zip",
          avatar: "https://henrenx.cn/avatar.jpg",
          teacher_name: "张老师"
        },
        {
          DISPATCH_DATE: 1586053981,
          MESSAGE_CONTENT: "https://wiki.wannax.cn/weixin/images/test.png",
          HW_NAME: "我的作业1",
          COURSE_NAME: "我是练习生",
          CP_NAME: "章小节-1",
          DEADLINE: 1586053981,
          ATTACHED_FILE: "https://wiki.wannax.cn/learning/work.zip",
          avatar: "https://henrenx.cn/avatar.jpg",
          teacher_name: "张老师"
        },
        {
          DISPATCH_DATE: 1586053981,
          MESSAGE_CONTENT: "https://wiki.wannax.cn/weixin/images/test.png",
          HW_NAME: "我的作业1",
          COURSE_NAME: "我是练习生",
          CP_NAME: "章小节-1",
          DEADLINE: 1586053981,
          ATTACHED_FILE: "https://wiki.wannax.cn/learning/work.zip",
          avatar: "https://henrenx.cn/avatar.jpg",
          teacher_name: "张老师"
        },
        {
          DISPATCH_DATE: 1586053981,
          MESSAGE_CONTENT: "https://wiki.wannax.cn/weixin/images/cartoon.png",
          HW_NAME: "我的作业2",
          COURSE_NAME: "我是练习生",
          CP_NAME: "章小节-1",
          DEADLINE: 1586053981,
          ATTACHED_FILE: "https://wiki.wannax.cn/learning/work.zip",
          avatar: "https://henrenx.cn/avatar.jpg",
          teacher_name: "郝老师"
        },
        {
          DISPATCH_DATE: 1586053981,
          MESSAGE_CONTENT: "https://www.henrenx.cn/f92839.jpg",
          HW_NAME: "我的作业3",
          COURSE_NAME: "我是练习生",
          CP_NAME: "章小节-1",
          DEADLINE: 1586053981,
          ATTACHED_FILE: "https://wiki.wannax.cn/learning/work.zip",
          avatar: "https://henrenx.cn/avatar.jpg",
          teacher_name: "孙老师"
        }
      ],
      currentList: [],
      dialogVisible: false,
      buttons: [
        { name: "系统消息", template: item => "" },
        { name: "通知公告", template: item => "" },
        { name: "活动安排", template: item => "" },
        { name: "辅导答疑", template: item => "" },
        {
          name: "我的作业",
          template: item =>
            `${item.HW_NAME}:“${item.COURSE_NAME}”课程 ` +
            `${item.CP_NAME} 作业，截止日期 ${item.DEADLINE}`
        }
        // 上面为消息模板，可匹配不同字段类型的消息，达到通用效果
      ]
    };
  },
  methods: {
    openDialog(index) {
      this.curWork = index;
      this.dialogVisible = true;
    },
    tab(index) {
      this.curTab = index;
      // 拉取对应 TAB 下的数据
      // 修改 tableData
      // 调用 this.handlePageChange(1)

      // this.$store.dispatch("getMsg", this.curTab).then(() => {
      //   this.currentList = this.$store.state.msgCurrentList;
      // });
    },
    handlePageChange(pageIndex) {
      let start = (pageIndex - 1) * this.limit;
      let end = start + this.limit;
      this.currentList = this.tableData.slice(start, end);
    }
  },
  filters: {
    dateFormatter: value => Date.format(value),
    mesFormatter: (value, curTab) => {
      let DEADLINE = "";
      if (value.DEADLINE) {
        DEADLINE = Date.format(value.DEADLINE);
      }
      return curTab.template({ ...value, DEADLINE });
    }
  },
  created() {
    this.handlePageChange(1);
    // this.$store.dispatch("getMsg", this.curTab).then(() => {
    //   this.currentList = this.$store.state.msgCurrentList;
    //   if (this.currentList.length != 0) {
    //     this.txt = false;
    //     for (let i = 0; i <= this.currentList.length; i++) {
    //       currentList[i].DISPATCH_DATE = this.timestampToTime(
    //         currentList[i].DISPATCH_DATE
    //       );
    //     }
    //   }
    // });
    // this.$store.commit("updateLoading", true);
  },
  computed: {
    // ...mapState({
    //   tableData: state => state.msgList,
    //   // currentList: state => state.msgCurrentList,
    //   limit: state => state.limit
    // })
  }
};
</script>

<style scoped>
#msg {
  background: #f4f9fa;
  height: 100%;
}

.menu {
  padding-top: 10px;
  padding-left: 40px;
  padding-right: 40px;
  display: flex;
  justify-content: center;
}

.tag {
  background-color: inherit;
  outline: none;
  color: #575757;
  padding: 15px 32px;
  margin: 10px 4px 0px;
  text-align: center;
  text-decoration: none;
  padding: 4px 10px;
  font-size: 18px;
  border: none;
  font-weight: 550;
}

.tag:hover,
.active {
  color: #00bcd4;
}
.main {
  padding: 20px 0 0 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.cardbox {
  width: 45%;
  margin: 20px 0 0 3%;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #e7e7e7;
}

.cardbox:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  transform: scale(1.03);
  -ms-transform: scale(1.03);
  /* IE 9 */
  -webkit-transform: scale(1.03);
  /* Safari and Chrome */
  -o-transform: scale(1.03);
  /* Opera */
  -moz-transform: scale(1.03);
  /* Firefox */
}

.card_header {
  text-align: left;
}

.card_header img {
  width: 16px;
  height: 16px;
  padding-right: 5px;
}

.card_content {
  padding: 20px 20px 0 20px;
  color: #2f2f2f;
  text-align: justify;
  font-size: 110%;
  font-style: initial;
}

.card_content::before {
  content: "\201C";
  font-family: MS PGothic;
  font-size: 30px;
  font-weight: bold;
  color: #06afa6;
  box-sizing: inherit;
}

.card_footer {
  padding: 0px 40px 10px 40px;
  text-align: end;
}

.avast {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}

.card_footer span {
  color: black;
  vertical-align: middle;
  display: inline-block;
}
.pagination {
  padding-left: 30px;
  padding-top: 30px;
}
</style>
