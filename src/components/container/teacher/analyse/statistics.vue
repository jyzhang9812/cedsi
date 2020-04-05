<template>
  <div id="statistics">
    <span>学情分析</span>
    <div class="first-floor">
      <div class="select-input1">
        <input
          type="text"
          placeholder="请输入姓名、手机号"
          class="textBox"
          id="tel-name"
          v-model="formData.telOrName"
        />
      </div>
      <div class="select-input">
        <select-input
          id="school"
          tips="请选择学校"
          :option="inputData.school.option"
          @option="changeOption"
          :drop-down-list="inputData.school.list"
        ></select-input>
      </div>
      <div class="select-input">
        <select-input
          id="classes"
          tips="请选择班级名称"
          :option="inputData.classes.option"
          @option="changeOption"
          :drop-down-list="inputData.classes.list"
        ></select-input>
      </div>
      <div class="select-input">
        <select-input
          id="course"
          tips="请选择课程"
          :option="inputData.course.option"
          @option="changeOption"
          :drop-down-list="inputData.course.list"
        ></select-input>
      </div>
      <div class="select-input">
        <select-input
          id="grade"
          tips="请选择课程等级"
          :option="inputData.grade.option"
          @option="changeOption"
          :drop-down-list="inputData.grade.list"
        ></select-input>
      </div>
      <div class="select-input">
        <select-input
          id="order"
          tips="请选择课次"
          :option="inputData.order.option"
          @option="changeOption"
          :drop-down-list="inputData.order.list"
        ></select-input>
      </div>
    </div>
    <div class="second-floor"></div>

    <div class="third-floor">
      <date-picker
        tips="选择开始时间"
        id="datePicker_start"
        :date="inputData.startDate"
        @changeDate="changeDate"
      ></date-picker>
      <date-picker
        tips="选择结束时间"
        id="datePicker_end"
        :date="inputData.endDate"
        @changeDate="changeDate"
      ></date-picker>

      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;是否学习:</span>
      <div class="btn-group btn-group-sm" role="group">
        <button
          id="bt1"
          type="button"
          class="btn btn-default"
          @click="studyOrNot(1),changeButtonStyle(1)"
        >是</button>
        <button
          id="bt2"
          type="button"
          class="btn btn-default"
          @click="studyOrNot(0),changeButtonStyle(2)"
        >否</button>
      </div>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;是否做作业:</span>
      <div class="btn-group btn-group-sm" role="group" aria-label="...">
        <button
          id="bt3"
          type="button"
          class="btn btn-default"
          @click="homeWorkOrNot(1),changeButtonStyle(3)"
        >是</button>
        <button
          id="bt4"
          type="button"
          class="btn btn-default"
          @click="homeWorkOrNot(0),changeButtonStyle(4)"
        >否</button>
      </div>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <button class="btn btn-search" @click="search(formData),afterSearch()">搜索</button>
      <button class="btn btn-clear" @click="clearChoices(),afterSearch()">清空筛选</button>
    </div>
    <div class="forth-floor">
      <table class="table table-hover">
        <thead>
          <tr>
            <th v-for="title in tableTitle" :key="title" class="title">{{title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list,index) in currentList " :key="index" class="content">
            <td>{{index+1}}</td>
            <td>{{list.organName}}</td>
            <td>{{list.className}}</td>
            <td>{{list.studentName}}</td>
            <td>{{list.objName}}</td>
            <td>{{list.levelName}}</td>
            <td width="200px">{{list.videoName}}</td>
            <td>{{list.isStart}}</td>
            <td width="90px">{{list.startTime}}</td>
            <td width="90px">{{list.learnTime}}</td>
            <td width="60px">{{list.learnNmm}}</td>
            <td width="60px">{{list.learnNoteNmm}}</td>
            <td>{{list.commitTime}}</td>
            <td>{{list.homeworkStar}}</td>
            <td>{{list.commitNmm}}</td>
          </tr>
        </tbody>
      </table>
      <pagination :num="num" :limit="limit" @getNew="getNew"></pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "remark",
  data() {
    return {
      num: 0,
      limit: 10,
      currentList: [],
      chooseAll: true,
      comment: {
        commentStatus: 0,
        hasComment: "background-color: #FFF; color: #000",
        noComment: "background-color: #FFF; color: #000"
      },
      //搜索条件
      formData: {
        telOrName: "",
        organName: "",
        className: "",
        objName: "",
        levelName: "",
        studyOrNot: "",
        videoName: "",
        workOrNot: ""
      },
      realList: [], //真正的数组，经过filter后的
      temporaryList: [],
      inputData: {
        telOrName: "",
        startDate: "",
        endDate: "",
        school: {
          option: "",
          list: ["师大一中", "师大二中", "师大三中"]
        },
        classes: {
          option: "",
          list: ["1班", "2班", "3班", "4班", "5班"]
        },
        course: {
          option: "",
          list: ["课程一", "课程二", "课程三"]
        },
        grade: {
          option: "",
          list: ["1", "2", "3", "4"]
        },
        order: {
          option: "",
          list: ["开学第一课", "开学第二课", "开学第三课"]
        }
      },
      tableTitle: [
        "序号",
        "学校",
        "线上班级",
        "学生",
        "课程",
        "等级",
        "课次",
        "是否开课",
        "开课时间",
        "学习时间",
        "学习视频次数",
        "观看讲义次数",
        "首次作业提交时间",
        "最新作业得星",
        "提交作业次数"
      ],
      tableData: [
        {
          organName: "师大一中",
          className: "赛迪思",
          studentName: "小赛",
          objName: "课程一",
          levelName: "Level 1",
          videoName: "Scratch Level 1| 第1节课 | 初遇地球--机器人解体",
          isStart: "是",
          startTime: "2019-03-01 00:00:00 ",
          learnTime: "2019-04-03 20:00:06 ",
          learnNmm: "17",
          learnNoteNmm: "11",
          commitTime: "2019-5-20 16:30",
          homeworkStar: "0",
          commitNmm: "2"
        },
        {
          organName: "师大一中",
          className: "赛迪思",
          studentName: "小王",
          objName: "课程一",
          levelName: "Level 1",
          videoName: "Scratch Level 1| 第2节课 | 初遇地球--重组机器人",
          isStart: "是",
          startTime: "2019-05-01 00:00:00",
          learnTime: "2019-05-27 17:53:33",
          learnNmm: "1",
          learnNoteNmm: "1",
          commitTime: "2019-05-27 16:57:55",
          homeworkStar: "3",
          commitNmm: "1"
        }
      ]
    };
  },
  created() {
    this.search({});
  },
  methods: {
    //真正的搜索
    search({
      telOrName,
      organName,
      className,
      objName,
      levelName,
      videoName,
      studyOrNot,
      workOrNot
    }) {
      //temporary list 保存的是满足除时间以外所有搜索条件产生的数组
      this.temporaryList = this.tableData.filter(item => {
        let matchName = true;
        let matchOrganName = true;
        let matchClassName = true;
        let matchObjName = true;
        let matchLevelName = true;
        let matchVideo = true;
        let matchStudy = true;
        let matchWork = true;

        if (telOrName) {
          // 姓名搜索;
          matchName = item.studentName.match(telOrName);
        }
        if (organName) {
          // 学校搜索;
          matchOrganName = item.organName.match(organName);
        }
        if (className) {
          // 班级搜索;
          matchClassName = item.className.match(className);
        }
        if (objName) {
          // 课程搜索;
          matchObjName = item.objName.match(objName);
        }
        if (levelName) {
          // 课程等级搜索;
          matchLevelName = item.levelName.match(levelName);
        }
        if (videoName) {
          // 课程等级搜索;
          matchVideo = item.videoName.match(videoName);
        }
        //是否学习(！！！当前是通过观看视频次数进行判断的)
        if (studyOrNot) {
          if (studyOrNot === "yes") {
            matchStudy = item.learnNmm;
          } else matchStudy = !item.learnNmm;
        }
        //是否做作业（！！！当前通过提交作业次数进行判断）
        if (workOrNot) {
          if (workOrNot === "yes") {
            matchWork = item.commitNmm;
          } else matchWork = !item.commitNmm;
        }
        return (
          matchName &&
          matchOrganName &&
          matchClassName &&
          matchObjName &&
          matchLevelName &&
          matchVideo &&
          matchStudy &&
          matchWork
        );
      }); //对temporaryList使用时间过滤器进行过滤，realList为全条件搜索结果
      this.realList = this.timeFilter(
        this.inputData.startDate,
        this.inputData.endDate,
        this.temporaryList
      );
    },

    changeChoices() {
      this.chooseAll = !this.chooseAll;
    },
    changeComment(comment) {
      if (comment === "has") {
        // 0: 均为选中  1:已评论   2: 未评论
        this.comment = {
          commentStatus: 1,
          hasComment: "background-color: #409EFF; color: #FFF",
          noComment: "background-color: #FFF; color: #000"
        };
      } else {
        this.comment = {
          commentStatus: 2,
          hasComment: "background-color: #FFF; color: #000",
          noComment: "background-color: #409EFF; color: #FFF"
        };
      }
    },
    changeDate(value, id) {
      if (id === "datePicker_start") {
        this.inputData.startDate = value;
      } else if (id === "datePicker_end") {
        this.inputData.endDate = value;
      }
    },
    clearChoices() {
      this.inputData.startDate = "";
      this.inputData.endDate = "";
      this.optionsInit();
      this.cleanFormdata();
      this.cleanButtonStyle();
      this.search({});
    },
    optionsInit() {
      this.inputData = {
        telOrName: "",
        startDate: "",
        endDate: "",
        school: {
          option: "",
          list: ["师大一中", "师大二中", "师大三中"]
        },
        classes: {
          option: "",
          list: ["1班", "2班", "3班", "4班", "5班"]
        },
        course: {
          option: "",
          list: ["课程一", "课程二", "课程三"]
        },
        grade: {
          option: "",
          list: ["1", "2", "3", "4"]
        },
        order: {
          option: "",
          list: ["开学第一课", "开学第二课", "开学第三课"]
        }
      };
      this.chooseAll = true;
      this.comment = {
        commentStatus: 0,
        hasComment: "background-color: #FFF; color: #000",
        noComment: "background-color: #FFF; color: #000"
      };
    },
    //操作是否单选按钮组
    changeButtonStyle(id) {
      var bt1 = document.getElementById("bt1");
      var bt2 = document.getElementById("bt2");
      var bt3 = document.getElementById("bt3");
      var bt4 = document.getElementById("bt4");
      if (id == 1) {
        bt1.className = "btn btn-default active"; //选中它，给它添加active否则样式
        bt2.className = "btn btn-default "; //  清除同一个按钮组
      } else if (id == 2) {
        bt2.className = "btn btn-default active";
        bt1.className = "btn btn-default ";
      } else if (id == 3) {
        bt3.className = "btn btn-default active";
        bt4.className = "btn btn-default ";
      } else if (id == 4) {
        bt4.className = "btn btn-default active";
        bt3.className = "btn btn-default ";
      }
    },
    //清空搜索列表
    cleanFormdata() {
      Object.keys(this.formData).forEach(res => {
        this.formData[res] = "";
      });
    },
    cleanButtonStyle() {
      //清楚是否选择按钮状态
      var bt1 = document.getElementById("bt1");
      var bt2 = document.getElementById("bt2");
      var bt3 = document.getElementById("bt3");
      var bt4 = document.getElementById("bt4");
      bt1.className = "btn btn-default ";
      bt2.className = "btn btn-default ";
      bt3.className = "btn btn-default ";
      bt4.className = "btn btn-default ";
    },
    changeOption(item, id) {
      Object.keys(this.inputData).forEach(res => {
        if (res === id) {
          this.inputData[res].option = item;
          if (id === "school") {
            //将下拉选项加入到搜索列表
            this.formData.organName = item;
          } else if (id === "classes") {
            this.formData.className = item;
          } else if (id === "course") {
            this.formData.objName = item;
          } else if (id === "grade") {
            this.formData.levelName = item;
          } else if (id === "order") {
            this.formData.videoName = item;
          }
        }
      });
    },
    getNew(value) {
      this.currentList = this.realList.slice(value, value + this.limit);
    },
    //在每次搜索后要重新生成分页
    afterSearch() {
      this.getNew(0);
      this.num = this.realList.length;
    },

    studyOrNot(value) {
      if (value) {
        this.formData.studyOrNot = "yes";
      } else {
        this.formData.studyOrNot = "no";
      }
    },
    homeWorkOrNot(value) {
      if (value) {
        this.formData.workOrNot = "yes";
      } else {
        this.formData.workOrNot = "no";
      }
    },
    timeFilter(startTime, endTime, tableList) {
      if (startTime === "" && endTime === "") return tableList;
      startTime = startTime === "" ? 0 : startTime;
      // 今天是 2019-7-21 此系统若能运行1000年算我输
      endTime = endTime === "" ? "3000-01-01 00:00" : endTime;
      let restTableList = tableList.slice(0);
      startTime = new Date(startTime);
      endTime = new Date(endTime);
      for (let i = 0, j = restTableList.length; i < j; i++) {
        let flag = restTableList[i].commitTime; //用flag过滤掉没有数据的
        let submitTime = new Date(restTableList[i].commitTime);
        if (!flag || startTime > submitTime || submitTime > endTime) {
          restTableList.splice(i, 1);
          i -= 1;
          j -= 1;
        }
      }
      return restTableList;
    }
  },
  mounted() {
    this.getNew(0);
    this.num = this.realList.length;
  }
};
</script>

<style scoped>
#statistics {
  font-size: 12px;
  color: #606266;
}

#statistics .second-floor {
  margin-top: 20px;
}

#statistics .first-floor {
  display: flex;
  margin-left: 5px;
  margin-top: 10px;
}

#statistics .third-floor {
  margin-top: 20px;
  vertical-align: middle;
  font-size: 12px;
  margin-left: 5px;
}

#statistics .third-floor span {
  line-height: 30px;
}

#statistics .forth-floor {
  font-size: 12px;
  color: #606266;
  margin-top: 40px;
}

#statistics label {
  display: inline;
}

#statistics .content td {
  line-height: 30px;
}

#statistics .textBox {
  width: 180px;
  height: 32px;
  font-size: 12px;
  padding-left: 15px;
  border: 1px solid #409eff;
  border-radius: 5px;
  margin-left: 5px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#statistics .textBox:focus {
  outline: none;
}

#statistics .textBox:hover {
  border-color: #c0c4cc;
}

#statistics .comment {
  width: 68px;
  height: 32px;
  display: inline-block;
  border: 1px solid #dcdfe6;
  text-align: center;
  cursor: pointer;
}

#statistics .has-comment {
  border-radius: 4px 0 0 4px;
}

#statistics .no-comment {
  margin-right: 20px;
  border-radius: 0 4px 4px 0;
}

#statistics .btn {
  height: 30px;
  border-radius: 5px;
  font-size: 12px;
  margin-bottom: 3px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#statistics .btn:focus {
  outline: none;
}

#statistics .btn:hover {
  background: #66b1ff;
}

#statistics .btn-search {
  background: #409eff;
  color: #fff;
  width: 54px;
}

#statistics .btn-clear {
  background: #409eff;
  color: #fff;
  width: 78px;
}

#statistics .blue {
  cursor: pointer;
  color: #409eff;
}

#statistics .red {
  cursor: pointer;
  color: #ff6947;
}

table {
  border: #eeeeee;
}

table tr {
  text-align: center !important;
}

table td {
  vertical-align: middle !important;
}

#statistics .title {
  text-align: center;
}

#statistics .select-input {
  margin-right: 0;
}
#statistics .select-input1 {
  margin-right: 8px;
}
</style>
