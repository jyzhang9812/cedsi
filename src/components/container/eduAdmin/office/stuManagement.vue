<template>
  <div class="subContainer">
    <!-- 添加学生模态框（Modal） -->
    <div
      class="modal fade"
      id="addStudent"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">新增学生</h4>
          </div>
          <div class="modal-body">
            <div class="addinfo">
              <div class="addinforson">
                <div class="addcon">
                  <span class="keypoint">*</span>
                  <label class="addtitle">学生姓名</label>
                  <input placeholder="请输入学生姓名" class="addinput" />
                </div>
                <div class="addcon">
                  <span class="keypoint">*</span>
                  <label class="addtitle">性别</label>
                  <div class="sexradio">
                    <input type="radio" name="sex" value="man" checked="checked" class="sexradio1" />
                    <span class="sexname">男</span>
                    <input type="radio" name="sex" value="woman" class="sexradio1" />
                    <span class="sexname">女</span>
                  </div>
                </div>
                <div class="addcon">
                  <span class="keypoint-white">*</span>
                  <label class="addtitle">家长姓名</label>
                  <input placeholder="请输入家长姓名" class="addinput" />
                </div>
                <div class="addcon">
                  <span class="keypoint-white">*</span>
                  <label class="addtitle">所属学校</label>
                  <select-input
                    class="addStudentInput"
                    id="school"
                    tips="请选择学校"
                    :option="inputData.school.option"
                    @option="changeOption"
                    :drop-down-list="inputData.school.list"
                  ></select-input>
                </div>
                <div class="addcon">
                  <span class="keypoint-white">*</span>
                  <label class="addtitle">班级</label>
                  <input placeholder="请输入班级" class="addinput" />
                </div>
                <div class="addcon">
                  <span class="keypoint">*</span>
                  <label class="addtitle">账号</label>
                  <input class="addinput" />
                </div>
                <div class="addcon">
                  <span class="keypoint">*</span>
                  <label class="addtitle">密码</label>
                  <input class="addinput" />
                </div>
              </div>
              <div class="addinforson">
                <div class="addcon">
                  <span class="keypoint">*</span>
                  <label class="addtitle">手机号码</label>
                  <input class="addinput" />
                </div>
                <div class="addcon">
                  <span class="keypoint-white">*</span>
                  <label class="addtitle">年龄</label>
                  <input class="addinput" />
                </div>
                <div class="addcon">
                  <span class="keypoint-white">*</span>
                  <label class="addtitle">家长微信号</label>
                  <input class="addinput" />
                </div>
                <div class="addcon">
                  <span class="keypoint-white">*</span>
                  <label class="addtitle">年级</label>
                  <input class="addinput" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">保存</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
    <!-- 添加学生模态框（Modal） -->
    <div
      class="modal fade"
      id="detials"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">学生详情</h4>
          </div>
          <div class="modal-body">
            <h4>基本信息</h4>
            <div class="row">
              <div class="col-md-4">学生姓名：{{studentInfo.name}}</div>
              <div class="col-md-4">手机号码：{{studentInfo.telephone}}</div>
              <div class="col-md-4">性别：{{studentInfo.sex}}</div>
              <div class="col-md-4">年龄：{{studentInfo.age}}</div>
              <div class="col-md-4">家长姓名：{{studentInfo.parentName}}</div>
              <div class="col-md-4">家长微信号：{{studentInfo.parentWechat}}</div>
              <div class="col-md-4">所属学校：{{studentInfo.school}}</div>
              <div class="col-md-4">年级：{{studentInfo.grade}}</div>
              <div class="col-md-4">班级：{{studentInfo.className}}</div>
              <div class="col-md-4">金币数量：{{studentInfo.money}}</div>
            </div>
            <div class="row">
              <div class="col-md-6">备注：{{studentInfo.tips}}</div>
            </div>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
    <!-- 排班模态框（Modal） -->
    <div
      class="modal fade"
      id="arrangeClass"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">排班</h4>
          </div>
          <div class="modal-body">
            <!-- 选项卡菜单-->
            <ul id="myTab" class="nav nav-pills" role="tablist">
              <li v-for="(classes,index) in classList" :key="index" :class="index==0?'active':''">
                <a :href="'#'+classes.name" role="tab" data-toggle="pill">{{classes.name}}</a>
              </li>
            </ul>
            <!-- 选项卡面板 -->
            <div id="myTabContent" class="tab-content">
              <div
                :class="index==0?'tab-pane fade in active':'tab-pane fade in'"
                v-for="(classes,index) in classList"
                :key="index"
                :id="classes.name"
              >
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th
                        v-for="(title,index) in classTableTitle"
                        class="title"
                        :key="index"
                      >{{title}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(line, seq) in classes.classCon" class="content" :key="seq">
                      <td v-for="(item,index) in line" :key="index">{{item}}</td>
                      <td>
                        <span class="arrangeblue">排班</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
    <div class="classroute">
      <ol class="breadcrumb">
        <li>教务管理</li>
        <li>学生管理</li>
      </ol>
    </div>
    <div class="first-floor">
      <label for="tel-name"></label>
      <input
        type="text"
        placeholder="请输入姓名、手机号"
        class="textBox"
        id="tel-name"
        v-model="inputData.telOrName"
      />
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
    </div>
    <div class="second-floor">
      <label for="tel-name"></label>
      <input
        type="text"
        placeholder="请输入年级"
        class="textBox"
        id="tel-name"
        v-model="inputData.telOrName"
      />
      <label for="tel-name"></label>
      <input
        type="text"
        placeholder="请输入班级"
        class="textBox"
        id="tel-name"
        v-model="inputData.telOrName"
      />
      <button class="btn btn-search">搜索</button>
      <button class="btn btn-clear" @click="clearChoices">清空筛选</button>
      <button class="btn btn-clear" data-toggle="modal" data-target="#addStudent">新增学生</button>
    </div>
    <div class="forth-floor">
      <table class="table table-hover">
        <thead>
          <tr>
            <th v-for="(title,index) in tableTitle" class="title" :key="index">{{title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(line, seq) in tableData" class="content" :key="seq">
            <td>{{seq + 1}}</td>
            <td v-for="(item,index) in line" :key="index">{{item}}</td>
            <td>
              <input class="tips" />
            </td>
            <td style="width:100px">
              <span class="blue" data-toggle="modal" data-target="#detials">详情</span>
              <span class="blue" data-toggle="modal" data-target="#addStudent">编辑</span>
              <span class="blue" data-toggle="modal" data-target="#arrangeClass">排班</span>
              <span class="blue">停课</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import DatePicker from "../utils/datePicker";
import SelectInput from "../utils/selectInput";

export default {
  name: "stuManagement",
  data() {
    return {
      inputData: {
        telOrName: "",
        school: {
          option: "",
          list: ["师大一中", "师大二中", "师大三中"]
        },
        classes: {
          option: "",
          list: ["1班", "2班", "3班", "4班", "5班"]
        }
      },
      tableTitle: [
        "序号",
        "学生/账号",
        "学生",
        "手机号",
        "学校",
        "班级名称",
        "年级",
        "班级",
        "老师",
        "录入时间",
        "备注",
        "操作"
      ],
      tableData: [
        [
          "赛大迪",
          "小迪",
          "12342411111",
          "赛迪斯",
          "赛迪斯",
          "初一",
          "九班",
          "程老师",
          "2018-5-2 11:32"
        ],
        [
          "赛大迪",
          "小迪",
          "12342411111",
          "赛迪斯",
          "赛迪斯",
          "初一",
          "九班",
          "程老师",
          "2018-5-2 11:32"
        ],
        [
          "赛大迪",
          "小迪",
          "12342411111",
          "赛迪斯",
          "赛迪斯",
          "初一",
          "九班",
          "程老师",
          "2018-5-2 11:32"
        ]
      ],
      studentInfo: {
        name: "赛大迪",
        telephone: "12342411111",
        sex: "男",
        age: "0岁",
        parentName: "小迪",
        parentWechat: "1111",
        school: "赛迪斯",
        grade: "初一",
        className: "九班",
        money: "0",
        tips: "是个好孩子"
      },
      classList: [
        {
          name: "Scratch1",
          classCon: [["赛迪思1", "2019-02-27 00:00"]]
        },
        {
          name: "Scratch2",
          classCon: [
            ["赛迪思2", "2019-02-27 00:00"],
            ["赛迪思3", "2019-02-27 00:00"]
          ]
        }
      ],
      classTableTitle: ["班级名称", "开课时间", "操作"]
    };
  },
  methods: {
    clearChoices() {
      this.optionsInit();
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
        }
      };
    },
    changeOption(item, id) {
      Object.keys(this.inputData).forEach(res => {
        if (res === id) {
          this.inputData[res].option = item;
        }
      });
    }
  },
  components: { SelectInput, DatePicker }
};
</script>

<style scoped>
.breadcrumb {
  background-color: #fff;
  color: #606266;
  margin-bottom: 0;
}
.subContainer {
  font-size: 12px;
  color: #606266;
  width: 100%;
  margin: 0 auto;
  padding: 0 10px;
}

.first-floor {
  margin-top: 20px;
}

.second-floor {
  display: flex;
  margin-top: 10px;
}

.third-floor {
  margin-top: 20px;
  vertical-align: middle;
  font-size: 12px;
  margin-left: 5px;
}

.third-floor span {
  line-height: 30px;
}

.forth-floor {
  font-size: 12px;
  color: #606266;
  margin-top: 10px;
}

label {
  display: inline;
}

.content td {
  line-height: 30px;
}

.textBox {
  width: 180px;
  height: 32px;
  font-size: 12px;
  padding-left: 15px;
  border: 1px solid #409eff;
  border-radius: 5px;
  margin-left: 5px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.textBox:focus {
  outline: none;
}

.textBox:hover {
  border-color: #c0c4cc;
}

.choose-icon {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 1px solid #409eff;
  margin-left: 20px;
  margin-top: 10px;
}

/* .choose 此项真实有效， 可能编辑器不完全识别vue语法*/
.choose {
  background-image: url("../../../../../static/images/teach/choose.png");
  background-repeat: no-repeat;
  background-position: -1px -2px;
}

.comment {
  width: 68px;
  height: 32px;
  display: inline-block;
  border: 1px solid #dcdfe6;
  text-align: center;
  cursor: pointer;
}
.btn {
  background: #409eff;
  color: #fff;
  height: 32px;
  border-radius: 5px;
  font-size: 12px;
  margin-left: 10px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.btn:focus {
  outline: none;
}

.btn:hover {
  background: #66b1ff;
}

.btn-search {
  width: 54px;
}

.btn-clear {
  width: 78px;
}

.blue {
  cursor: pointer;
  color: #409eff;
  display: block;
  float: left;
  height: 20px;
  width: 50%;
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

.title {
  text-align: center;
}

.select-input {
  margin-right: 8px;
  display: inline-block;
}
.tips {
  border-radius: 5px;
  border: 1px solid #409eff;
  padding-left: 10px;
}
.tips:focus {
  outline: none;
}
.tips:hover {
  border: 1px solid #dcdfe6;
}
/*模态框*/
.modal-dialog {
  top: 100px;
  position: relative;
}
.modal-header {
  background-color: #409eff;
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.modal-footer {
  border: none;
  text-align: center;
}
.addinfo {
  margin: 0 auto;
  width: 100%;
  height: 280px;
}
.addinforson {
  width: 50%;
  height: 100%;
  float: left;
}
.addcon {
  width: 100%;
  height: 33px;
  margin-bottom: 10px;
}
.keypoint {
  color: red;
}
.keypoint-white {
  color: white;
}
.addtitle {
  color: #606266;
  width: 60px;
  height: 33px;
  text-align: right;
  display: inline-block;
}
.addinput {
  border: 1px solid #409eff;
  border-radius: 5px;
  width: 180px;
  height: 33px;
  margin-left: 10px;
  padding-left: 20px;
}
.addinput:focus {
  outline: none;
}
.sexradio {
  width: 180px;
  margin-left: 10px;
  display: inline-block;
  height: 33px;
  padding-left: 30px;
}
.sexradio1 {
  margin-right: 10px;
}
.sexname {
  display: inline-block;
  margin-right: 10px;
}
.addStudentInput {
  display: inline-block;
  margin-left: 10px;
  width: 180px;
}
.outside {
  width: 200px;
}
.inputBox {
  width: 170px;
}
/* 详情模态框*/
.col-md-4 {
  margin-bottom: 10px;
}
/*排班模态框*/
.nav-pills > li.active > a,
.nav-pills > li.active > a:focus,
.nav-pills > li.active > a:hover {
  background-color: #409eff;
  border-radius: 5px;
}
.arrangeblue {
  cursor: pointer;
  color: #409eff;
}
</style>
