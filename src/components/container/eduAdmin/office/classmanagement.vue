<template>
  <div class="subContainer">
    <div class="classroute">
      <ol class="breadcrumb">
        <li>教务管理</li>
        <li>班级管理</li>
      </ol>
    </div>
    <div class="first-floor">
      <label for="class-name"></label>
      <input
        type="text"
        placeholder="请输入班级名称"
        class="textBox"
        id="class-name"
        v-model="inputData.className"
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
      <button class="btn btn-search">搜索</button>
      <button class="btn btn-clear" @click="clearChoices">清空筛选</button>
    </div>
    <div class="second-floor">
      <table class="table table-hover">
        <thead>
          <tr>
            <th v-for="(title,index) in tableTitle" class="title" :key="index">{{title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(line, seq) in tableData" :key="seq" class="content">
            <td>{{seq}}</td>
            <td v-for="(item,index) in line" :key="index">{{item}}</td>
            <td>
              <span class="blue">编辑</span>&nbsp;&nbsp;
              <span class="red">删除</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import SelectInput from "../utils/selectInput";

export default {
  name: "classmanagement",
  data() {
    return {
      inputData: {
        className: "",
        school: {
          option: "",
          list: ["师大一中", "师大二中", "师大三中"]
        },
      },
      tableTitle: [
        "序号",
        "所属学校",
        "班级名称",
        "开课时间",
        "老师",
        "待上课程",
        "已结课程",
        "操作"
      ],
      tableData: [
        [
          "赛小迪",
          "JAVA",
          "2019-07-20",
          "祁老师",
          "操作系统",
          "计算机网络",
        ],
        [
          "赛小迪",
          "JAVA",
          "2019-07-20",
          "祁老师",
          "操作系统",
          "计算机网络",
        ],
        [
          "赛小迪",
          "JAVA",
          "2019-07-20",
          "祁老师",
          "操作系统",
          "计算机网络",
        ],
        [
          "赛小迪",
          "JAVA",
          "2019-07-20",
          "祁老师",
          "操作系统",
          "计算机网络",
        ]
      ]
    };
  },
  methods: {
    optionsInit() {
      this.inputData = {
        className: "",
        school: {
          option: "",
          list: ["师大一中", "师大二中", "师大三中"]
        },
      };
    },
    changeOption(item, id) {
      Object.keys(this.inputData).forEach(res => {
        if (res === id) {
          this.inputData[res].option = item;
        }
      });
    },
    clearChoices() {
        this.optionsInit();
      },
  },
  components: { SelectInput }
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
  margin-left: 10px;
}

.first-floor {
  margin-top: 20px;
}
.second-floor {
  font-size: 12px;
  color: #606266;
  margin-top: 20px;
}
.select-input{
    display: inline-block;
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
  border-color: #409eff;
}

/* .choose 此项真实有效， 可能编辑器不完全识别vue语法*/
.choose {
  background-image: url("../../../../../static/images/teach/choose.png");
  background-repeat: no-repeat;
  background-position: -1px -2px;
}

.btn {
  background: #409eff;
  color: #fff;
  height: 30px;
  border-radius: 5px;
  font-size: 12px;
  margin-bottom: 3px;
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
}

.red {
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

.title {
  text-align: center;
}

.select-input {
  margin-right: 8px;
}
</style>
