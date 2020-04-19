<template>
  <div id="teacherClass">
    <!-- <div>
      <ol class="breadcrumb">
        <li>个人资料</li>
        <li>任课班级</li>
      </ol>
    </div> -->
    <div class="first-floor">
      <!-- <table class="table hover">
        <thead>
          <tr>
            <th v-for="(title,index) in tableTitle" class="title" :key="index">{{title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(classes,seq) in currentList" class="content" :key="seq">
            <td>{{seq+1}}</td>
            <td>{{classes.className}}</td>
            <td>{{classes.courseName}}</td>
            <td>{{classes.classMemberCount}}</td>
            <td>{{classes.chapterCount}}</td>
          </tr>
        </tbody>
      </table>-->
      <el-table :data="currentList" style="width: 100%">
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column align="center" prop="CLASS_NAME" label="班级名称"></el-table-column>
        <el-table-column align="center" prop="COURSE_NAME" label="课程"></el-table-column>
        <el-table-column align="center" prop="CLASS_MEMBER_COUNT" label="班级人数"></el-table-column>
        <el-table-column align="center" prop="CHAPTER_NUM" label="章节数目"></el-table-column>
      </el-table>
    </div>
    <div class="spaceLine"></div>
    <el-pagination
      :page-size="limit"
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
import XLSX from "xlsx";
import instance from "../../../../axios-auth.js";
import AWS from "aws-sdk";

export default {
  name: "teacherClass",
  data() {
    return {
      limit: 10,
      currentList: [],
      tableTitle: ["序号", "班级名称", "课程", "班级人数", "章节数目"],
      tableData: []
    };
  },
  methods: {
    handlePageChange(pageIndex) {
        let start = (pageIndex - 1) * this.limit;
        let end = start + this.limit;
        this.currentList = this.tableData.slice(start, end);
      },
    //获取班级列表
    getClasses() {
      let config = {
        headers: { Authorization: localStorage.getItem("idToken") }
      };
      instance.get("/teacher/class", config).then(
        response => {
          console.log(response);
          this.tableData = response.data;
          this.handlePageChange(1);
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  created() {
    this.getClasses();
  }
};
</script>

<style scoped>
#teacherClass .breadcrumb {
  background-color: #fff;
  color: #606266;
  margin-bottom: 0;
}

#teacherClass {
  font-size: 12px;
  color: #606266;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
}

#teacherClass .first-floor {
  font-size: 12px;
  color: #606266;
  margin-top: 20px;
}

#teacherClass .spaceLine {
  height: 20px;
}
</style>