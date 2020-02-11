<template>
  <div id="stu-management">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>教务管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex">
      <!-- 批量导入 -->
      <el-col :span="16" style="margin-left:15px;">
        <el-button @click="dialogVisible=true" type="primary" size="small">批量导入</el-button>
      </el-col>
      <!-- 搜索框 -->
      <el-col :span="5">
        <el-input v-model="inputData.keywords" placeholder="请输入学生的姓名或学号" size="small"></el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" size="small" @click="conditionSearch">搜索</el-button>
      </el-col>
    </el-row>
    <!-- 表格区域 -->
    <el-table :data="currentList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
      <el-table-column prop="id" label="学号" align="center"></el-table-column>
      <el-table-column prop="avatar" label="头像" align="center">
        <template slot-scope="scope">
          <el-avatar :size="50" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="gender" label="性别" align="center"></el-table-column>
      <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
      <el-table-column prop="grade" label="年级" align="center"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" @current-change="handlePageChange"
      @prev-click="handlePageChange" @next-click="handlePageChange" :page-size="limit" :total="tempStudentList.length">
    </el-pagination>
    <!-- 批量导入模态框 -->
    <el-dialog title="批量导入学生" :visible.sync="dialogVisible" width="40%">
      <div class="upload-cover-btn">
        选择文件
        <input type="file" @change="importExcel($event.target)" style="opacity: 0" />
      </div>
      <el-button class="btn-upload-file" type="success" @click="download">下载模板</el-button>
      <el-row>
        <el-col :span="4" style="margin-left: 15px;">文件名称：</el-col>
        <el-col :span="14">
          <el-input placeholder v-model="fileName" :disabled="true" width="150px"></el-input>
        </el-col>
      </el-row>
      <div class="btn-box">
        <el-button type="primary" size="small" @click="dialogVisible=false">关闭</el-button>
        <el-button type="primary" size="small" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import instance from "../../../../axios-auth.js";
  import XLSX from "xlsx";

  export default {
    data() {
      return {
        inputData: {
          keywords: ""
        },
        currentList: [], //当前绑定的学生列表
        limit: 4,
        allStudentList: [], //获取到的整个学生列表
        tempStudentList: [], //临时的学生列表
        dialogVisible: false,
        fileName: ""
      };
    },
    created() {
      this.getStudents();
    },
    methods: {
      handlePageChange(pageIndex) {
        let start = (pageIndex - 1) * this.limit;
        let end = start + this.limit;
        this.currentList = this.tempStudentList.slice(start, end);
        // console.log({学生列表:this.allStudentList})
      },
      nameOrStuIDFilter(nameOrID, tableList) {
        if (nameOrID === "") return tableList;
        let restTableList = tableList.slice(0);
        for (let i = 0, j = restTableList.length; i < j; i++) {
          if (
            !new RegExp(nameOrID).test(restTableList[i]["name"]) &&
            !new RegExp(nameOrID).test(restTableList[i]["id"])
          ) {
            restTableList.splice(i, 1);
            j -= 1;
            i -= 1;
          }
        }
        return restTableList;
      },
      conditionSearch() {
        let temp = this.nameOrStuIDFilter(
          this.inputData.keywords,
          this.allStudentList
        );
        this.tempStudentList = temp;
        console.log({ 过滤的: this.tempStudentList });
        this.handlePageChange(1);
      },
      download() {
        const url1 = "https://cedsi.s3.cn-northwest-1.amazonaws.com.cn/";
        const url2 = "%E5%AD%A6%E7%94%9F%E5%BD%95%E5%85%A5%E8%A1%A8.xlsx";
        window.open(url1 + url2);
      },
      importExcel({ files }) {
        let file = files[0]; // 使用传统的input方法需要加上这一步
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
      file2Xce(file) {
        return new Promise(function (resolve, reject) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const data = e.target.result;
            this.wb = XLSX.read(data, { type: "binary" });
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
      submit() {
        let file = this.file;
        this.file2Xce(file).then(tabJson => {
          if (tabJson && tabJson.length > 0) {
            this.xlsxJson = tabJson[0].sheet;
            console.log(this.xlsxJson);
            let token = localStorage.getItem("idToken");
            const config = { headers: { Authorization: token } };
            instance
              .post("/eduadmin/student", { sheet: this.xlsxJson }, config)
              .then(response => {
                console.log(response);
                this.$message.success({ title: "学生管理", message: "操作成功" });
                this.dialogVisible = false;
                this.getStudents();
              })
              .catch(err => {
                console.error(err);
              });
          }
        });
      },
      getStudents() {
        let token = localStorage.getItem("idToken");
        const config = { headers: { Authorization: token } };
        instance
          .get("/eduadmin/student", config)
          .then(response => {
            let allStudent = response.data.data;
            console.log({ 学生数据: allStudent });
            this.allStudentList = allStudent.map(item => {
              let info = item.STUDENT_INFO;
              return {
                age: info.AGE,
                id: info.STUDENT_ID,
                avatar: info.AVATAR,
                phone: info.PHONE,
                grade: info.GRADE,
                name: info.STUDENT_NAME,
                gender: info.GENDER === "0" ? "女" : "男"
              };
            });
            this.tempStudentList = this.allStudentList;
            this.handlePageChange(1);
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  };
</script>

<style scoped>
  .el-breadcrumb {
    margin: 20px;
    font-size: 12px;
  }

  .btn-box {
    margin: 30px 0 30px 100px;
  }

  .upload-cover-btn {
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

  input[type="file"] {
    width: 80px;
    height: 35px;
    position: relative;
    top: -35px;
    display: inline-block;
  }

  .btn-upload-file {
    position: relative;
    top: -34px;
    padding: 0;
    margin-left: 10px;
    width: 80px;
    height: 35px;
  }
</style>