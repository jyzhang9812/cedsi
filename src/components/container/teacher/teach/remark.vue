<template>
  <div id="remark">
    <p>作业点评</p>
    <div class="second-floor">
      <select v-model="select" name='class' clearable placeholder="请选择班级"
        @change='changeOption' class="select-class">
        <option
          :data-index="index"
          v-for="(className,index) in classNameList"
          :key="className.id"
          :label='className.name'
          :value="className.name"
        >{{className.name}}</option>
      </select>
      <select v-model="selectedChapter" name='chapter' clearable placeholder="请选择章节" 
        @change='changeOption' class="select-class">
        <option
          data-index="index"
          v-for="(chapterName,index) in classNameList[classIndex].chapterNameList"
          :key="chapterName.CP_ID"
          :value="chapterName.CP_NAME"
        >{{chapterName.CP_NAME}}</option>
      </select>
      <div></div>
    </div>
    <div class="third-floor">
      <el-radio-group v-model="radio1" @change='changeComment'>
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="comment">已点评</el-radio-button>
        <el-radio-button label="not_comment">未点评</el-radio-button>
      </el-radio-group>
    </div>
    <div class="forth-floor">
      <el-table :data="currentList" style="width: 100%">
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column align="center" prop="STUDENT_NAME" label="作者名称"></el-table-column>
        <el-table-column align="center" prop="SUBMIT_TIME" label="提交时间"></el-table-column>
        <el-table-column align="center" prop="HW_NAME" label="作品"></el-table-column>
        <el-table-column align="center" prop="COURSE_NAME" label="课程名称"></el-table-column>
        <el-table-column align="center" prop="CP_NAME" label="章节名称"></el-table-column>
        <el-table-column align="center" label="操作" width="280">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click='viewWork(scope.$index)'>查看</el-button>
            <el-button size="mini" type="primary" :disabled='scope.row.commentStatus' @click="openCommentDialog(scope.$index)">点评</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog v-if='dialogHomeworkVisible' :visible.sync="dialogHomeworkVisible" width="58%"
        @open="handleDialogOpen">
        <el-row :gutter="20">
          <el-col :span="16">
            <p class="loading-tips" v-show="!iFrameShow">正在努力加载。。。</p>
            <iframe v-show="iFrameShow" id="scratch" frameborder="no" border="0"
              :src="`${scratchUrl}${currentList[curWork].HW_URL}`"></iframe>
          </el-col>
          <el-col :span="8" style="height:450px">
            <h3>作品名</h3>
            <p>{{currentList[curWork].HW_NAME}}</p>
            <h3>操作说明</h3>
            <p>{{currentList[curWork].HW_GUIDE}}</p>
            <h3>老师点评</h3>
            <p>{{currentList[curWork].TEACHER_REMARK}}</p>
          </el-col>
        </el-row>
      </el-dialog>
      <el-dialog v-if='dialogVisible' :visible.sync="dialogVisible" width="58%">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="教师评语：">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 6}" v-model="form.comment"></el-input>
          </el-form-item>
          <el-form-item label="评分">
            <i v-for='(item,index) in star_list' :class="item?'el-icon-star-on':'el-icon-star-off'" @click='changeStarNum(index)'></i>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click='remarkWork(curWork)'>确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <el-pagination class="pagination" :page-size="limit" v-if="tableData.length" background layout="prev, pager, next"
      :total="tableData.length" @current-change="handlePageChange" @prev-click="handlePageChange"
      @next-click="handlePageChange"></el-pagination>
  </div>
</template>

<script>
  import instance from "../../../../axios-auth.js";
  export default {
    name: "remark",
    data() {
      return {
        classIndex:0,
        classNameList: [{
          name:'',
          chapterNameList:[],
        }],
        select:'',
        selectedChapter:'',
        radio1: "all", //已点评未点评
        dialogVisible: false,
        dialogHomeworkVisible: false,
        iFrameShow: false,
        scratchUrl:
          "https://cedsi.s3.cn-northwest-1.amazonaws.com.cn",
        limit: 10,
        curWork: 0,
        form:{
          star_num:0,
          comment:'',
        },//点评内容
        starNum:0,
        // comment: { commentStatus: 0, hasComment: "", noComment: "" },
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
       * @param {String} comment
       * @param {Array<Object>} tableData
       */
      changeComment(event) {
          let arr1=[]
          let arr2=[]
          //每次切换都由前台处理，切换都是从该章节全部数据来筛选点评、未点评
          this.tableData = this.originalTableData
          if(event!=='all'){
          let status = (event==='comment')?true:false
          for(let i=0;i<this.tableData.length;i++){
            let obj={}
            obj.COURSE_ID=this.tableData[i].COURSE_ID
            obj.TEACHER_REMARK=this.tableData[i].TEACHER_REMARK
            obj.HW_RANK=this.tableData[i].HW_RANK
            obj.HW_URL=this.tableData[i].HW_URL
            obj.CLASS_ID=this.tableData[i].CLASS_ID
            obj.HW_NAME=this.tableData[i].HW_NAME
            obj.COURSE_NAME=this.tableData[i].COURSE_NAME
            obj.HW_DESCRIPTION=this.tableData[i].HW_DESCRIPTION
            obj.DEADLINE=this.tableData[i].DEADLINE
            obj.HW_GUIDE=this.tableData[i].HW_GUIDE
            obj.SUBMIT_TIME=this.tableData[i].SUBMIT_TIME
            obj.HW_ID=this.tableData[i].HW_ID
            obj.SELECTED_WORKS=this.tableData[i].SELECTED_WORKS
            obj.CP_ID=this.tableData[i].CP_ID
            obj.CP_NAME=this.tableData[i].CP_NAME
            obj.STUDENT_ID=this.tableData[i].STUDENT_ID
            obj.STUDENT_NAME=this.tableData[i].STUDENT_NAME
            obj.commentStatus=this.tableData[i].commentStatus
            console.log(obj)
            obj.commentStatus?arr1.push(obj):arr2.push(obj)
          }
          this.tableData = status?arr1:arr2
        }
        this.handlePageChange(1);
      },
      /**
       * 修改当前选中项, 是 selectInput 组件绑定的事件处理函数
       */
      changeOption:function(e) {
        let type = e.target.name
        let index = e.target.options.selectedIndex 
        console.log(e)
        if (type === "class") {
          console.log('切换班级')
          this.classIndex = index;
        } else if (type === "chapter") {
          console.log('章节切换')
          this.pullHomeworkWithId(this.classNameList[this.classIndex].id,
          this.classNameList[this.classIndex].chapterNameList[index].CP_ID);
        }
        this.handlePageChange(1);
      },
      //分页跳转, 是 pagination 分页组件绑定的事件处理函数
      handlePageChange(value) {
        let start = (value - 1) * this.limit;
        let end = start + this.limit;
        this.currentList = this.tableData.slice(start, end);
      },
      //查看作业内容,sb3打开,其他类型下载
      viewWork(index) {
        let item = this.currentList[index];
        this.curWork = index;
        let url = this.getCaption(item.HW_URL.match('[^/]+(?!.*/)')[0]);
        if (url!=='sb3') {
          window.open(this.currentList[index].url);
        } else {
          this.dialogHomeworkVisible = true;
        }
      },
      //获取作业文件类型
      getCaption(obj) {
        var index = obj.lastIndexOf("\.");
        obj = obj.substring(index + 1, obj.length);
        return obj;
      },
      //点评模态框
      openCommentDialog(index){
        this.curWork = index;
        this.dialogVisible=!this.dialogVisible;
      },
      //评分计算星星
      changeStarNum(index){
        this.starNum = index;
      },
      //查看作业模态框
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
      remarkWork() {
        this.form.star_num=this.starNum;
        let config = {
          headers: { Authorization: localStorage.getItem("idToken") }
        };
        let putData = {
          teacherRemark: this.form.comment==''?'暂无评价':this.form.comment,
          homeworkRank: this.form.star_num+1,
          selectedWork:false,
          stuId: this.currentList[this.curWork].STUDENT_ID,
          homeworkId: this.currentList[this.curWork].HW_ID
        };
        console.log(putData)
        instance
          .put(`teacher/stuhomework/${putData.homeworkId}`, putData, config)
          .then(res => {
            console.log(res);
            this.dialogVisible=!this.dialogVisible
            // if(res.data)
            this.pullHomeworkWithId(this.currentList[this.curWork].CLASS_ID,this.currentList[this.curWork].HW_ID)
          })
          .catch(err => {
            console.log(err);
          });
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
            this.pullHomeworkWithId(classId,res.data[0].CHAPTERS[0].CP_ID)
            this.originalInputData = res.data;
            for(let i=0;i<res.data.length;i++){
              this.classNameList[i].name=res.data[i].CLASS_NAME
              this.classNameList[i].id = res.data[i].CLASS_ID
              for(let j=0;j<res.data[i].CHAPTERS.length;j++){
                this.classNameList[i].chapterNameList.push(res.data[i].CHAPTERS[j])
              } 
            }
            this.inputData.classes.list = res.data.map(item => {
              return item.CLASS_NAME;
            });
            this.select = this.classNameList[0].name
            this.selectedChapter = this.classNameList[0].chapterNameList[0].CP_NAME
          })
          .catch(err => {
            console.log(err);
          });
      },
      /**
       * 通过 CLASS_ID 来拉取表格内的数据
       *
       * @param {String} chapterId
       */
      pullHomeworkWithId(classId,chapterId) {
        let config = {
          headers: { Authorization: localStorage.getItem("idToken") }
        };
        instance
          .get("/teacher/class/" + classId + "/homework?cpId=" + chapterId, config)
          .then(res => {
            console.log(res);
            let CP_NAMECache = [];
            this.originalTableData = res.data.data;
            for (let i = 0; i < this.originalTableData.length; i++) {
              CP_NAMECache.push(this.originalTableData[i].CP_NAME);
            };
            this.inputData.chapter.list = Array.from(new Set(CP_NAMECache));
            this.inputData.chapter.option = this.inputData.chapter.list[0] || "";
            if (this.originalTableData.length != 0) {
              for (let i = 0; i < this.originalTableData.length; i++) {
                this.originalTableData[i].SUBMIT_TIME = this.timestampToTime(
                  this.originalTableData[i].SUBMIT_TIME
                );
                if(this.originalTableData[i].TEACHER_REMARK==='null'){
                  this.originalTableData[i].commentStatus = false;
                }else{
                  this.originalTableData[i].commentStatus = true;
                }
              };
            }
          //originalData是全部数据，tabledata作为页面渲染数据，主要作用在筛选点评、未点评
          this.tableData = this.originalTableData
          this.handlePageChange(1)
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
      star_list(){
        let index = this.starNum;
        console.log(index)
        let arr=[false,false,false,false,false]
        if(index==0){
          for(let i=0;i<5;i++){ arr[i]=false }
        }else if(index==4){for(let i=0;i<5;i++){arr[i]=true}}
        else{
          for(let i=0;i<=index;i++){arr[i]=true}
          for(let i=index+1;i<5;i++){arr[i]=false}
        }
        console.log(arr)
        return arr;
      },
      blueCommentStyle() {
        return "background-color: #409EFF; color: #FFF;";
      },
      whiteCommentStyle() {
        return "background-color: #FFF; color: #000;";
      },
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