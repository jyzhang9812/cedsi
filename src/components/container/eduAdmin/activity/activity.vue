<template>
  <div id="eduActivity">
    <div class="body" v-show="!createClassShown">
      <p>活动管理</p>
      <div class="filter">
        <div class="option">
          <button type="button" class="btn-my" @click="addActivity">新增活动</button>
        </div>
      </div>
      <div class="modal fade" id="checkStudent" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true" ref="checkStudent">
        <div class="modal-dialog tablewidth">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 class="modal-title" id="myModalLabel">查看学生({{studentNum}}人)</h4>
            </div>
            <div class="modal-body">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th v-for="(title,index) in studentTitle" class="titles" :key="index">{{title}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(student, seq) in studentData" :key="seq" class="content">
                    <td>{{seq+1}}</td>
                    <td>{{student.name}}</td>
                    <td>{{student.id}}</td>
                    <td>{{student.gender}}</td>
                    <td>{{student.grade}}</td>
                    <td>{{student.age}}</td>
                    <td>{{student.mobile}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="panels">
        <table class="table table-hover" rules=rows frame=below>
          <thead>
            <tr>
              <th>序号</th>
              <th>活动名称</th>
              <th>活动地点</th>
              <th>活动时间</th>
              <th>价格</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(list, index) in currentList" :key="index">
              <td>{{index + 1}}</td>
              <td class="blue">{{list.name}}</td>
              <td>{{list.place}}</td>
              <td>{{list.time}}</td>
              <td>{{list.price}}</td>
              <td>
                <!-- <span class="blue">编辑</span> -->
                <span class="blue" data-toggle="modal" data-target="#checkStudent" @click="checkStu(list)">查看学生</span>
                &nbsp;&nbsp;
                <span class="blue" @click="createClassFromActivity(list)">创建班级</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <pagination :num="tableData.length" :limit="limit" @getNew="getNew"></pagination>
    </div>
    <div class="body" v-show="createClassShown">
      <p>创建班级</p>
      <div class="create-class">
        <div class="add">
          <span class="keypoint">*</span>
          <span class="addtitle">班级名称</span>
          <input :class="isName==false?'addcon':'addcon err'" placeholder="请输入班级名称" v-model="createClass.className"
            :disabled="isChange" />
          <span :class="isName==true?'inputtips':'inputerr'">不超过10个字符</span>
        </div>
        <div class="add">
          <span class="keypoint">*</span>
          <span class="addtitle">指定教师</span>
          <select-input id="classTeacher" tips="请选择教师" :option="createClass.classTeacher.option" @option="changeOption"
            :drop-down-list="createClass.classTeacher.options"></select-input>
        </div>
        <div class="add">
          <span class="keypoint">*</span>
          <span class="addtitle">选择课程</span>
          <select-input id="classCourse" tips="请选择课程" :option="createClass.classCourse.option" @option="changeOption"
            :drop-down-list="createClass.classCourse.options"></select-input>
        </div>
      </div>
      <div class="student-list">
        <table class="table table-hover">
          <thead>
            <tr>
              <th @click="chooseAllStudents" style="text-align: center; width: 60px;">{{chooseAll ? "全不选" : "全选"}}</th>
              <th v-for="(title,index) in studentTitle" class="titles" :key="index">{{title}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, seq) in studentData" :key="seq" class="content">
              <td> <input type="checkbox" v-model="student.checked"></td>
              <td>{{seq+1}}</td>
              <td>{{student.studentName}}</td>
              <td>{{student.studentId}}</td>
              <td>{{student.gender}}</td>
              <td>{{student.grade}}</td>
              <td>{{student.age}}</td>
              <td>{{student.mobile}}</td>
            </tr>
          </tbody>
        </table>
        <div class="item1">
          <button type="button" class="btn-my" @click="createClassWithStudents">创建班级</button>
          <button type="button" class="btn-my" @click="cancelEdit">取消操作</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import pagination from "../../teacher/utils/pagination.vue";
  import selectInput from "../../teacher/utils/selectInput";
  import deletePrompt from "../../teacher/utils/deletePrompt";
  import instance from '../../../../axios-auth.js';

  export default {
    name: 'activity',
    data() {
      return {
        content: '',
        limit: 10,
        currentList: [],
        tableData: [],
        activityList: [],
        studentTitle: [
          "序号", "学生姓名", "学号", "性别",
          "年级", "年龄", "手机号"
        ],
        studentData: [],
        createClass: {
          className: "",
          classTeacher: { option: "", options: [], id: [] },
          classCourse: { option: "", options: [], id: [] }
        },
        isChange: false,
        isName: true,
        createClassShown: false,
        chooseAll: false
      }
    },
    components: { pagination, selectInput, deletePrompt },
    methods: {
      addActivity() {
        this.$router.push({ path: "/eduAdmin/activity/addActivity" });
      },
      checkStu(item) {
        this.pullParticipatingStudents(item.id)
          .then(res => {
            console.log(res);
            this.studentData = res.data.map(item => {
              return {
                studentName: item.STUDENT_NAME,
                studentId: item.STUDENT_ID,
                gender: item.GENDER,
                grade: item.GRADE,
                age: item.AGE,
                mobile: item.MOBILE_PHONE,
                avatar: item.AVATAR,
                orgId: item.ORG_ID,
                userId: item.USER_ID,
                checked: true
              }
            });
          }).catch(err => { console.log(err) });
      },
      getNew(value) {
        this.currentList = this.tableData
          .map(item => {
            return {
              name: item.ACTIVITY_TITLE,
              place: item.ACTIVITY_PLACE,
              time: item.ACTIVITY_TIME,
              price: item.ACTIVITY_PRICE,
              id: item.ACTIVITY_ID
            };
          }).slice(value, value + this.limit);
      },
      pullOriginalTableData() {
        let config = { headers: { Authorization: localStorage.getItem('idToken') } };
        instance.get('/eduadmin/activity', config)
          .then(res => {
            console.log(res);
            this.tableData = res.data || [];
            this.getNew(0);
          })
          .catch(err => { console.log(err) });
      },
      pullParticipatingStudents(id) {
        let config = { headers: { Authorization: localStorage.getItem('idToken') } };
        return instance.get(`/eduadmin/activity/${id}/student`, config);
      },
      changeOption(item, id) {
        this.createClass[id].option = item;
      },
      createClassFromActivity(list) {
        this.createClassShown = !this.createClassShown;
        this.checkStu(list);
        let config = { headers: { Authorization: localStorage.getItem('idToken') } };
        instance.get("eduadmin/class/msg", config)
          .then(res => {
            this.createClass.classTeacher.options = res.data.teacher.map(item => item.TEACHER_NAME);
            this.createClass.classTeacher.id = res.data.teacher.map(item => item.TEACHER_ID);
            this.createClass.classCourse.options = res.data.course.map(item => item.COURSE_NAME);
            this.createClass.classCourse.id = res.data.course.map(item => item.COURSE_ID);
          })
          .catch(err => { console.log(err) });
      },
      createClassWithStudents() {
        let classTeacher = this.createClass.classTeacher;
        let classCourse = this.createClass.classCourse;
        let config = { headers: { Authorization: localStorage.getItem('idToken') } };
        let data = {
          className: this.createClass.className,
          courseId: classCourse.id[classCourse.options.indexOf(classCourse.option)],
          teacherId: classTeacher.id[classTeacher.options.indexOf(classTeacher.option)],
          courseName: classCourse.option
        };
        console.log(data);
        instance.post("eduadmin/class", data, config)
          .then(res => {
            console.log(res);
            if (res.data.status === "ok") {
              let studentData = this.studentData
                .filter(student => student.checked)
                .map(student => {
                  delete student.checked;
                  return student;
                });
              console.log(studentData);
              let url = `eduadmin/class/${res.data.classId}/students`;
              return instance.post(url, { studentData }, config);
            }
            return Promise.reject("创建班级时发生错误!");
          })
          .then(res => {
            console.log(res);
            this.$toast.success({ title: "创建班级", message: "操作成功" });
            this.createClassShown = !this.createClassShown;
          })
          .catch(err => console.log(err));
      },
      cancelEdit() {
        this.createClassShown = !this.createClassShown;
      },
      chooseAllStudents() {

      }
    },
    computed: {
      studentNum() { return this.studentData.length }
    },
    mounted() {
      this.pullOriginalTableData();
      this.tableData = this.activityList;
      this.getNew(0);
    }
  }
</script>

<style scoped>
  #eduActivity {
    padding: 10px;
  }

  #eduActivity .body {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    font-size: 12px;
    color: #606266;
    min-width: 850px;
  }

  #eduActivity .option {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  #eduActivity .option input {
    width: 220px;
    height: 32px;
  }

  #eduActivity .blue {
    color: #409EFF;
    cursor: pointer;
  }

  #eduActivity .red {
    color: #FF6947;
  }

  #eduActivity .filter {
    margin-bottom: 30px;
  }

  #eduActivity .form-control {
    padding: 0px 30px 0 15px;
    font-size: 12px;
    margin-right: 5px;
  }

  #eduActivity .panels {
    text-align: center;
  }

  #eduActivity .panels tr {
    height: 40px;
    text-align: center;
  }

  #eduActivity .panels th {
    text-align: center;
  }

  #eduActivity .tablewidth {
    width: 90%;
    margin: 0 auto;
  }

  #eduActivity .btn-my {
    margin-right: 8px;
    height: 32px;
    border-radius: 4px;
    font-size: 13px;
    color: #ffffff;
    background-color: #409eff;
    border: 1px solid #409eff;
  }

  #eduActivity .add {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    font-size: 13px;
    width: 100%;
  }

  #eduActivity .title {
    width: 750px;
    display: block;
    height: 34px;
    padding: 6px 12px;
    font-size: 13px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }

  #eduActivity .item {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 20px;
  }

  #eduActivity .item p {
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
    margin-right: 5px;
  }

  #eduActivity .file {
    height: 32px;
  }

  #eduActivity .checkbox {
    vertical-align: middle;
    margin: 0;
    height: 32px;
  }

  #eduActivity .editor {
    width: 800px;
  }

  #eduActivity .item1 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 20px;
    margin-left: 356px;
  }

  #eduActivity .modal-dialog {
    top: 100px;
    position: relative;
  }

  #eduActivity .modal-header {
    background-color: #409eff;
    color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  #eduActivity .tablewidth {
    width: 90%;
    margin: 0 auto;
  }

  #eduActivity .content td {
    line-height: 30px;
  }

  #eduActivity table {
    border: #eeeeee;
  }

  #eduActivity table tr {
    text-align: center !important;
  }

  #eduActivity table td {
    vertical-align: middle !important;
  }

  #eduActivity table td input {
    width: 15px;
    height: 15px;
  }

  #eduActivity .titles {
    text-align: center;
  }

  #eduActivity .keypoint {
    line-height: 30px;
    color: red;
  }

  #eduActivity .addtitle {
    color: #606266;
  }

  #eduActivity .addcon {
    width: 180px;
    border: 1px solid #409eff;
    border-radius: 5px;
    height: 32px;
    line-height: 32px;
    margin-left: 5px;
    padding: 0 20px;
  }

  #eduActivity .addcon:hover {
    border: 1px solid #dcdfe6;
  }

  #eduActivity .addcon:focus {
    outline: none;
  }

  #eduActivity .content {
    margin: 0 auto;
    width: 55%;
    height: 100%;
  }

  #eduActivity .err {
    border: 1px solid red;
  }

  #eduActivity .inputtips {
    display: inline-block;
    color: red;
    margin-left: 20%;
    height: 10px;
    width: 100%;
  }

  #eduActivity .inputerr {
    visibility: hidden;
    height: 10px;
    width: 100%;
  }

  #eduActivity .create-class {
    display: flex;
    justify-content: flex-start;
    width: 55%;
    height: 100%;
    margin: 20px 0 50px 0;
  }
</style>