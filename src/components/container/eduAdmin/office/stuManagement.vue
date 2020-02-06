<template>
  <div id="stuManagement">
    <!-- 批量导入（Modal） -->
    <div
      class="modal fade"
      id="addStudents"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">批量导入学生</h4>
          </div>
          <div class="modal-body row">
            <div class="upload-cover-btn">
              选择文件
              <input type="file" class @change="importExcel($event.target)" style="opacity: 0" />
            </div>
            <button class="btn btn-primary btn-upload-file" @click="download()">下载模板</button>
            <div class="upload upload-height">
              <span class="upload-title">文件名称:</span>
              <input class="upload-input" :value="fileName" disabled />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submit()">确定</button>
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
    <div class="second-floor">
      <button class="btn btn-clear" data-toggle="modal" data-target="#addStudents">批量导入</button>
       <input class="searchtext" type="text" placeholder="请输入学生的姓名或学号" v-model="inputData.keywords" />
      <button type="button" class="btn btn-search" v-on:click="conditionSearch">搜索</button>
    </div>
    <div class="forth-floor">
      <table class="table table-hover">
        <thead>
          <tr>
            <th v-for="(title,index) in tableTitle" class="title" :key="index">{{title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, seq) in currentList" class="content" :key="seq">
            <td>{{seq + 1}}</td>
            <td>{{student.id}}</td>
            <td>
              <img :src="student.avatar" class="student-avatar" />
            </td>
            <td>{{student.name}}</td>
            <td>{{student.gender}}</td>
            <td>{{student.age}}</td>
            <td>{{student.phone}}</td>
            <td>{{student.grade}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination :num="tempTableData.length" @getNew="getNew" :limit="limit"></pagination>
  </div>
</template>

<script>
import globalAxios from "axios";
import XLSX from "xlsx";
import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";

export default {
  name: "stuManagement",
  data() {
    return {
      fileName:"",
      limit: 10,
      currentList: [],
       inputData: {
        keywords: "",
      },
      tableTitle: ["序号", "学号", "头像", "姓名", "性别", "年龄","手机号", "年级"],
      tableData: [],
      tempTableData:[],
    };
  },
  methods: {
    //搜索学生
    getNew(value) {
      let currentPage = value / this.limit;
      this.currentPage = currentPage;
      this.currentList = this.tempTableData.slice(value, value + this.limit);
    },
    conditionSearch() {
      let temp = this.nameOrStuIDFilter(
        this.inputData.keywords,
        this.tableData,
      );
      this.tempTableData= temp;
      // this.currentList=temp;
      this.getNew(0);
    },
    nameOrStuIDFilter(nameOrID, tableList) {
        if (nameOrID === "") return tableList;
        let restTableList = tableList.slice(0);
        for (let i = 0, j = restTableList.length; i < j; i++) {
          if ((!new RegExp(nameOrID).test(restTableList[i]["name"])) &&
            (!new RegExp(nameOrID).test(restTableList[i]["id"]))) {
            restTableList.splice(i, 1);
            j -= 1;
            i -= 1;
          }
        }
        return restTableList;
      },
      changeTablePages(value) {
      let currentPage = value / this.limit;
      this.currentPage = currentPage;
      this.currentList = this.tableData.slice(value, value + this.limit);
      },
    //下载模板
    download() {
      window.open(
        "https://cedsi.s3.cn-northwest-1.amazonaws.com.cn/%E5%AD%A6%E7%94%9F%E5%BD%95%E5%85%A5%E8%A1%A8.xlsx"
      );
    },
    //批量导入学生
    importExcel(file) {
      var file = file.files[0]; // 使用传统的input方法需要加上这一步
      this.file = file;
      this.fileName = file.name;
      const types = file.name.split(".")[1];
      const fileType = ["xlsx", "xlc", "xlm", "xls", "xlt", "xlw", "csv"].some(
        item => item === types
      );
      if (!fileType) {
        alert("格式错误！请重新选择");
        return;
      }
    },
    submit() {
      var file = this.file
      this.file2Xce(file).then(tabJson => {
        if (tabJson && tabJson.length > 0) {
          this.xlsxJson = tabJson[0].sheet;
          console.log(this.xlsxJson);
          var token = window.localStorage.getItem("idToken");
          globalAxios({
            url:
              "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/eduadmin/student",
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            },
            data: { sheet: this.xlsxJson }
          }).then(
            response => {
              console.log(response);
              this.$toast.success({ title: "学生管理", message: "操作成功" });
              this.getStudents();
            },
            error => {
              console.log(error);
            }
          );
        }
      });
    },
    file2Xce(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const data = e.target.result;
          this.wb = XLSX.read(data, {
            type: "binary"
          });
          const result = [];
          this.wb.SheetNames.forEach(sheetName => {
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
            });
          });
          resolve(result);
        };
        // reader.readAsBinaryString(file.raw)
        reader.readAsBinaryString(file); // 传统input方法
      });
    },
    // changeTablePages(value) {
    //   this.currentList = this.tempTableData.slice(value, value + this.limit);
    // },
    getStudents() {
      var token = window.localStorage.getItem("idToken");
      globalAxios
        .get(
          "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/eduadmin/student",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            }
          }
        )
        .then(
          response => {
            console.log(response);
            //所有学生
            var allStudent = response.data.data;
            var allStudentList = [];
            for (var i = 0; i < allStudent.length; i++) {
              var student = {};
              student.id = allStudent[i].STUDENT_ID;
              student.name = allStudent[i].STUDENT_NAME;
              student.avatar = allStudent[i].AVATAR;
              if (allStudent[i].GENDER == "0") student.gender = "女";
              else student.gender = "男";
              student.phone = allStudent[i].MOBILE_PHONE;
              student.grade = allStudent[i].GRADE;
              student.age = allStudent[i].AGE;
              allStudentList.push(student);
            }
            this.tableData = allStudentList;
            console.log(this.tableData);
            this.tempTableData=this.tableData;
            this.changeTablePages(0);
           
          },
          error => {}
        );
    }
  },
  mounted() {
     this.tempTableData=this.tableData;
    this.getNew(0);
  },
  mounted() {
    //this.tableData = this.originalTableData;
  },
  created() {
    this.getStudents();
  }
};
</script>

<style scoped>
#stuManagement .breadcrumb {
  background-color: #fff;
  color: #606266;
  margin-bottom: 0;
}
#stuManagement {
  font-size: 12px;
  color: #606266;
  width: 100%;
  margin: 0 auto;
  padding: 0 10px;
}

#stuManagement .first-floor {
  margin-top: 20px;
}

#stuManagement .second-floor {
  display: flex;
  margin-top: 10px;
}

#stuManagement .forth-floor {
  font-size: 12px;
  color: #606266;
  margin-top: 10px;
}

#stuManagement label {
  display: inline;
}

#stuManagement .content td {
  line-height: 30px;
}

#stuManagement .textBox {
  width: 180px;
  height: 32px;
  font-size: 12px;
  padding-left: 15px;
  border: 1px solid #409eff;
  border-radius: 5px;
  margin-left: 5px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#stuManagement .textBox:focus {
  outline: none;
}

#stuManagement .textBox:hover {
  border-color: #c0c4cc;
}

#stuManagement .btn {
  background: #409eff;
  color: #fff;
  height: 32px;
  border-radius: 5px;
  font-size: 12px;
  margin-left: 10px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#stuManagement .btn:focus {
  outline: none;
}

#stuManagement .btn:hover {
  background: #66b1ff;
}

#stuManagement .btn-search {
  width: 54px;
}

#stuManagement .btn-clear {
  width: 78px;
   margin-right: 70%;
}
#stuManagement .btn-search {
  width: 78px;
}
#stuManagement .searchtext{
  width:20%;
}
#stuManagement .blue {
  cursor: pointer;
  color: #409eff;
  display: block;
  float: left;
  height: 20px;
  width: 50%;
}

#stuManagement table {
  border: #eeeeee;
}

#stuManagement table tr {
  text-align: center !important;
}

#stuManagement table td {
  vertical-align: middle !important;
}
.student-avatar {
  width: 40px;
  height: 40px;
}

#stuManagement .title {
  text-align: center;
}

#stuManagement .select-input {
  margin-right: 8px;
  display: inline-block;
}
#stuManagement .tips {
  border-radius: 5px;
  border: 1px solid #409eff;
  padding-left: 10px;
}
#stuManagement .tips:focus {
  outline: none;
}
#stuManagement .tips:hover {
  border: 1px solid #dcdfe6;
}
/*添加学生模态框*/
#stuManagement .modal-dialog {
  top: 100px;
  position: relative;
  min-width: 700px;
}
#stuManagement .modal-header {
  background-color: #409eff;
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
#stuManagement .modal-footer {
  border: none;
  text-align: center;
}
#stuManagement .addinfo {
  margin: 0 auto;
  width: 100%;
  height: 220px;
}
#stuManagement .addinforson {
  width: 50%;
  height: 100%;
  float: left;
}
#stuManagement .addcon {
  width: 100%;
  height: 33px;
}
#stuManagement .keypoint {
  color: red;
}
#stuManagement .keypoint-white {
  color: white;
}
#stuManagement .addtitle {
  color: #606266;
  width: 60px;
  height: 33px;
  text-align: right;
  display: inline-block;
}
#stuManagement .addinput {
  border: 1px solid #409eff;
  border-radius: 5px;
  width: 180px;
  height: 33px;
  margin-left: 10px;
  padding-left: 10px;
}
#stuManagement .inputerr {
  border: 1px solid #409eff;
  border-radius: 5px;
  width: 180px;
  height: 33px;
  margin-left: 10px;
  padding-left: 10px;
  visibility: hidden;
}
#stuManagement .addinput:focus {
  outline: none;
}
#stuManagement .sexradio {
  width: 180px;
  margin-left: 10px;
  display: inline-block;
  height: 33px;
  padding-left: 30px;
  line-height: 33px;
}
#stuManagement .sexradio1 {
  margin-right: 10px;
}
#stuManagement .sexname {
  display: inline-block;
  margin-right: 10px;
}
#stuManagement .addStudentInput {
  display: inline-block;
  margin-left: 10px;
  width: 180px;
}
#stuManagement .outside {
  width: 200px;
}
#stuManagement .inputBox {
  width: 170px;
}
/* 详情模态框*/
#stuManagement .col-md-4 {
  margin-bottom: 10px;
}
/*排班模态框*/
#stuManagement .nav-pills > li.active > a,
#stuManagement .nav-pills > li.active > a:focus,
#stuManagement .nav-pills > li.active > a:hover {
  background-color: #409eff;
  border-radius: 5px;
}
#stuManagement .arrangeblue {
  cursor: pointer;
  color: #409eff;
}
/*正则表达式*/
#stuManagement .inputtips {
  display: block;
  font-size: 10px;
  color: red;
  margin-left: 90px;
}
#stuManagement .err {
  border: 1px solid red;
}
/*提示模态框*/
#stuManagement .alterwidth {
  width: 30%;
}
#stuManagement .altercontent {
  width: 300px;
  margin: 0 auto;
}
#stuManagement .alterimg {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
/*批量到入学生*/
#stuManagement .upload-cover-btn {
  margin-left: 10px;
  width: 80px;
  height: 35px;
  display: inline-block;
  background-color: #409eff;
  color: #fff;
  border-radius: 5px;
  line-height: 35px;
  text-align: center;
}
#stuManagement input[type="file"] {
  width: 80px;
  height: 35px;
  position: relative;
  top: -35px;
  display: inline-block;
}
#stuManagement .btn-upload-file {
  position: relative;
  top: -35px;
  margin-left: 10px;
  background-color: #2fc27e;
  border: none;
  width: 80px;
  height: 35px;
}
#stuManagement .btn-upload-file:hover {
  background-color: #2fc27ddc;
}
.upload {
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
}
.upload-title {
  color: #606266;
  display: block;
  text-align: right;
  width: 80px;
  height: 40px;
  float: left;
  line-height: 40px;
}
.upload-input {
  width: 300px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #409eff;
  margin-left: 10px;
  padding-left: 10px;
}
</style>
