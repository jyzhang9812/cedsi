<template>
  <div id="remark">
    <p>作业点评</p>
    <div class="second-floor">
      <!-- <div class="select-input">
        <select-input id="classes" tips="请选择班级" :option="inputData.classes.option" @option="changeOption"
          :drop-down-list="inputData.classes.list">
        </select-input>
      </div>
      <div class="select-input">
        <select-input id="chapter" tips="请选择章节" :option="inputData.chapter.option" @option="changeOption"
          :drop-down-list="inputData.chapter.list">
        </select-input>
      </div>-->
      <el-select v-model="className" clearable placeholder="请选择班级" class="select-class">
        <el-option
          v-for="className in classNameList"
          :key="className.value"
          :label="className.label"
          :value="className.value"
        ></el-option>
      </el-select>
      <el-select v-model="chapterName" clearable placeholder="请选择章节" class="select-class">
        <el-option
          v-for="chapterName in chapterNameList"
          :key="chapterName.value"
          :label="chapterName.label"
          :value="chapterName.value"
        ></el-option>
      </el-select>
      <div></div>
    </div>
    <div class="third-floor">
      <span>点评状态</span>
      <el-radio-group v-model="radio1">
        <el-radio-button label="已点评"></el-radio-button>
        <el-radio-button label="未点评"></el-radio-button>
      </el-radio-group>
      <!-- <span class="comment has-comment" @click="changeComment('has')" :style="comment.hasComment">已点评</span>
      <span class="comment no-comment" @click="changeComment('no')" :style="comment.noComment">未点评</span>-->
    </div>
    <div class="forth-floor">
      <!-- <table class="table table-hover">
        <thead>
          <tr>
            <th v-for="(title,index) in tableTitle" class="title" :key="index">{{title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(line, seq) in currentList" :key="seq" class="content">
            <td>{{seq + 1}}</td>
            <td>{{line.STUDENT_NAME}}</td>
            <td>{{line.SUBMIT_TIME}}</td>
            <td>{{line.HW_NAME}}</td>
            <td>{{line.CLASS_NAME}}</td>
            <td>{{line.COURSE_NAME}}</td>
            <td>{{line.CP_NAME}}</td>
            <td>
              <button class="edit" data-toggle="modal" data-target="#remarkHomework" data-index="index"
                @click="viewWork(line)">查看作品</button>&nbsp;&nbsp;
      <span class="blue" @click="popModal('remark', line)">点评</span>&nbsp;&nbsp;-->
      <!-- <span class="blue" @click="popModal('turndown', line)">驳回</span>&nbsp;&nbsp; -->
      <!-- <span class="red" @click="popModal('delete', line)">删除</span> -->
      <!-- </td>
          </tr>
        </tbody>
      </table>-->
      <el-table :data="homeworkList" style="width: 100%">
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column align="center" prop="chapterName" label="作者名称"></el-table-column>
        <el-table-column align="center" prop="date" label="提交时间"></el-table-column>
        <el-table-column align="center" prop="work" label="作品"></el-table-column>
        <el-table-column align="center" prop="className" label="班级"></el-table-column>
        <el-table-column align="center" prop="courseName" label="课程名称"></el-table-column>
        <el-table-column align="center" prop="chapterName" label="章节名称"></el-table-column>
        <el-table-column align="center" label="操作" width="280">
          <template slot-scope="scope">
            <el-button size="mini" type="primary">点评</el-button>
            <el-button size="mini" type="success">驳回</el-button>
            <el-button size="mini" slot="reference" type="danger" @click="dialogVisible=true">删除</el-button>
            <el-dialog title :visible.sync="dialogVisible" width="20%">
              <i class="el-icon-info"></i>
              <span>确定要删除此作业吗?</span>
              <span slot="footer" class="dialog-footer">
                <el-button type="success" size="mini" @click="dialogVisible=false">取 消</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.row)">确 定</el-button>
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <div
        class="modal fade"
        id="remarkHomework"
        data-backdrop="false"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body head">
              <div class="left">
                <iframe :src="currentWork.HW_URL"></iframe>
              </div>
              <div class="right">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h3>作品名</h3>
                <p>{{currentWork.HW_NAME === "null" ? "" : currentWork.HW_NAME}}</p>
                <h3>操作说明</h3>
                <p>{{currentWork.HW_GUIDE === "null" ? "" : currentWork.HW_GUIDE}}</p>
              </div>
            </div>
            <div class="modal-footer">
              <p>老师点评</p>
              <p>{{currentWork.TEACHER_REMARK === "null" ? "" : currentWork.TEACHER_REMARK}}</p>
            </div>
          </div>
        </div>
      </div>
      <delete-prompt :id="bindingIds.delete" @deleteWork="deleteWork"></delete-prompt>
      <turn-down-work :id="bindingIds.turndown" @turnDownWorkResult="turnDownWork"></turn-down-work>
      <input-modal :id="bindingIds.remark" @remarkResult="remarkWork"></input-modal>
    </div>
    <div class="fifth-floor">
      <pagination :num="tableData.length" @getNew="changeTablePages" :limit="limit"></pagination>
    </div>
  </div>
</template>

<script>
import instance from "../../../../axios-auth.js";
export default {
  name: "remark",
  data() {
    return {
      //elment改的
      classNameList: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      chapterNameList: [
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      className: "",
      chapterName: "",
      radio1: "", //已点评未点评
      homeworkList: [
        {
          chapterName: "第一章",
          date: "2020-2-10",
          className: "一班",
          courseName: "数据库",
          chapterName: "第一章"
        },
        {
          chapterName: "第一章",
          date: "2020-2-10",
          className: "一班",
          courseName: "数据库",
          chapterName: "第一章"
        }
      ],
      dialogVisible: false,
      //
      limit: 10,
      currentWork: {
        HW_GUIDE: "",
        HW_NAME: "",
        HW_URL: "",
        HW_ID: ""
      },
      comment: { commentStatus: 0, hasComment: "", noComment: "" },
      originalInputData: [],
      inputData: {
        classes: { option: "", list: [], id: [] },
        course: { option: "", list: [], id: [] },
        chapter: { option: "", list: [], id: [] }
      },
      tableTitle: [
        "序号",
        "作者姓名",
        "提交时间",
        "作品",
        "班级",
        "课程名称",
        "章节",
        "操作"
      ],
      originalTableData: [],
      tableData: [],
      currentList: [],
      bindingIds: {
        delete: "remarkDeletePrompt",
        turndown: "remarkTurnDownPrompt",
        remark: "remarkPrompt"
      }
    };
  },
  methods: {
    /**
     * 改变点评的状态, 并立即刷新数据的显示, 其中的 commentStatus 映射关系为
     * 0: 均未选中
     * 1: 已点评
     * 2: 未点评
     *
     * @param {String} comment
     * @param {Array<Object>} tableData
     */
    changeComment(comment, tableData) {
      let condition1 = comment === "has",
        condition2 = comment === "no";
      tableData = tableData || this.originalTableData;
      this.comment.commentStatus = condition1 ? 1 : condition2 ? 2 : 0;
      this.comment.hasComment = condition1
        ? this.blueCommentStyle
        : this.whiteCommentStyle;
      this.comment.noComment = condition2
        ? this.blueCommentStyle
        : this.whiteCommentStyle;
      this.tableData = this.commentStatFilter(
        this.comment.commentStatus,
        tableData
      );
      this.changeTablePages(0);
    },
    /**
     * 修改当前选中项, 是 selectInput 组件绑定的事件处理函数
     *
     * @param {String} item
     * @param {String} id
     */
    changeOption(item, id) {
      this.inputData[id].option = item;
      if (id === "classes") {
        let classId = this.searchClassId(item);
        this.pullHomeworkWithId(classId);
      } else if (id === "chapter") {
        let result = this.selectInputFilter(
          this.inputData,
          this.originalTableData
        );
        this.tableData = result;
        this.changeTablePages(0);
      }
    },
    /**
     * 分页跳转, 是 pagination 分页组件绑定的事件处理函数
     *
     * @param {Number} value
     */
    changeTablePages(value) {
      this.currentList = this.tableData
        .slice(value, value + this.limit)
        .map(item => {
          item.SUBMIT_TIME = this.timestampToTime(item.SUBMIT_TIME);
          item.HW_URL =
            "https://s3.cn-northwest-1.amazonaws.com.cn/ced.cedsie.com/cedScratch/player.html?projectUrl=" +
            item.HW_URL;
          return item;
        });
    },
    /**
     * 点评过滤器
     *
     * @param {Number} commentCode
     * @param {Array<Object>} tableList
     */
    commentStatFilter(commentCode, tableList) {
      if (!commentCode) return tableList;
      let restTableList = tableList.slice(0),
        status = commentCode === 1;
      for (let i = 0, j = restTableList.length; i < j; i++) {
        if ((restTableList[i].TEACHER_REMARK === "null") === status) {
          restTableList.splice(i, 1);
          j -= 1;
          i -= 1;
        }
      }
      return restTableList;
    },
    /**
     * selectInput 组件的过滤器
     *
     * @param {Array<Object>} inputData
     * @param {Array<Object>} tableList
     * @return {Array<Object>}
     */
    selectInputFilter(inputData, tableList) {
      let restTableList = tableList.slice(0);
      for (let i = 0, j = restTableList.length; i < j; i++) {
        for (let res of Object.keys(inputData)) {
          let condition1 =
            inputData[res].hasOwnProperty("option") &&
            inputData[res].option !== "";
          let condition2 =
            restTableList[i].hasOwnProperty(res) &&
            restTableList[i][res] !== inputData[res].option;
          if (condition1 && condition2) {
            restTableList.splice(i, 1);
            i -= 1;
            j -= 1;
            break;
          }
        }
      }
      return restTableList;
    },
    /**
     * 删除作品, 是表格里每行数据中 删除 操作绑定的事件处理函数
     *
     * @param {String} workId
     */
    deleteWork() {
      setTimeout(() => {
        alert("删除成功!");
      }, 1000);
    },
    /**
     * 驳回作品, 是表格里每行数据中 驳回 操作绑定的事件处理函数
     *
     * @param {String} workId
     */
    turnDownWork(data) {
      console.log(data);
      setTimeout(() => {
        alert("驳回成功!");
      }, 1000);
    },
    /**
     * 查看作品, 参数为当前行数据
     *
     * @param {Object} item
     */
    viewWork(item) {
      console.log(item);
      this.currentWork = item;
    },
    /**
     * 通过班级名称和课程名称寻找 CLASS_ID
     *
     * @param {String} className
     * @return {String}
     */
    searchClassId(className) {
      let result = "";
      return this.originalInputData
        .filter(item => item.CLASS_NAME === className)
        .map(item => (result = item.CLASS_ID));
      return result;
    },
    /**
     * 作品点评, 参数为当前行数据
     *
     * @param {Object} remarkResult
     */
    remarkWork(remarkResult) {
      console.log(remarkResult);
      let config = {
        headers: { Authorization: localStorage.getItem("idToken") }
      };
      let putData = {
        teacherRemark: remarkResult.comment,
        homeworkRank: remarkResult.stars,
        selectedWork: remarkResult.selectedWork,
        homeworkId: this.currentWork.HW_ID
      };
      instance
        .put(`teacher/stuhomework/${putData.homeworkId}`, putData, config)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 弹出模态框, 提示用户是否进一步删除作品
     *
     * @param {String} type
     */
    popModal(type, line) {
      $("#" + this.bindingIds[type]).modal("show");
      console.log(line);
      this.currentWork = line;
    },
    /**
     * 拉取选择框的选项数据
     */
    pullClassAndCourseData() {
      let config = {
        headers: { Authorization: localStorage.getItem("idToken") }
      };
      instance
        .get("/teacher/class", config)
        .then(res => {
          console.log(res.data);
          let className = res.data[0].CLASS_NAME;
          let classId = res.data[0].CLASS_ID;
          this.originalInputData = res.data;
          this.inputData.classes.list = res.data.map(item => {
            return item.CLASS_NAME;
          });
          this.changeOption(className, "classes");
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 通过 CLASS_ID 来拉取表格内的数据
     *
     * @param {String} classId
     */
    pullHomeworkWithId(classId) {
      let config = {
        headers: { Authorization: localStorage.getItem("idToken") }
      };
      instance
        .get("/teacher/class/" + classId + "/homework", config)
        .then(res => {
          console.log(res);
          let CP_NAMECache = [];
          this.originalTableData = this.tableData = res.data.data;
          this.tableData.forEach(item => {
            CP_NAMECache.push(item.CP_NAME);
          });
          this.inputData.chapter.list = Array.from(new Set(CP_NAMECache));
          this.inputData.chapter.option = this.inputData.chapter.list[0] || "";
          this.changeComment("no");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //时间戳转换
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
    }
  },
  computed: {
    blueCommentStyle() {
      return "background-color: #409EFF; color: #FFF;";
    },
    whiteCommentStyle() {
      return "background-color: #FFF; color: #000;";
    },
    promptWords() {
      return "确定驳回该学生的作业吗?";
    }
  },
  created() {
    this.pullClassAndCourseData();
  }
};
</script>

<style scoped>
#remark {
  width: 95%;
  margin: 0 auto;
}
p,
span {
  font-size: 14px;
}
.select-class {
  margin-right: 10px;
}
.second-floor {
  margin-bottom: 10px;
}
</style>