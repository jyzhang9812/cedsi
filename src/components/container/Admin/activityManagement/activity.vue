<!--
 * @Email: rumosky@163.com
 * @Author: rumosky
 * @Gitee: https://gitee.com/rumosky_admin
 * @Date: 2019-10-22 19:27:43
 * @Description: 管理员角色活动管理页面
 -->
<template>
  <div id="eduActivity">
    <div class="body">
      <div class="filter">
        <div class="option">
          <el-button class="upload-btn" type="primary" @click="addActivity">
            新增活动
          </el-button>
        </div>
      </div>
      <div>
        <el-table :data="currentList" style="width: 100%">
          <el-table-column type="index" label="序号" width="120">
          </el-table-column>
          <el-table-column prop="ACTIVITY_TITLE" label="活动标题">
          </el-table-column>
          <el-table-column prop="ACTIVITY_TIME" label="发布时间" width="150">
          </el-table-column>
          <el-table-column prop="ACTIVITY_PLACE" label="活动地点">
          </el-table-column>
          <el-table-column prop="ACTIVITY_PRICE" label="价格" width="120">
          </el-table-column>
          <el-table-column label="报名信息" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="checkMessage(list)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editActivity(index)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      
      </div>
      <el-pagination background layout="prev, pager, next" :total="tableData.length" @getNew="getNew">
      </el-pagination>
    </div>

    <el-dialog title="报名信息" :visible.sync="dialogTableVisible">
      <el-table :data="messList" style="width: 100%">
        <el-table-column type="index" label="序号" width="120"></el-table-column>
        <el-table-column property="STUDENT_NAME" label="学生姓名" width="120"></el-table-column>
        <el-table-column property="SCHOOL" label="学校"></el-table-column>
        <el-table-column property="GRADE" label="年级" width="120"></el-table-column>
        <el-table-column property="MAJOR" label="专业" width="120"></el-table-column>
        <el-table-column property="PHONE" label="联系方式"></el-table-column>
        <el-table-column property="REMARK" label="备注" width="150"></el-table-column>
        <el-table-column property="SIGH_STATUS === "NOT_SIGH" ? "未验票" : "已验票"" label="验票" width="120"></el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="messageData.length" @getNew="getMessNew"></el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import AWS from "aws-sdk";
import instance from "../../../../axios-auth.js";
import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";

export default {
  name: "activity",
  data() {
    return {
      isShow: "",
      alert: "",
      content: "",
      limit: 10,
      currentList: [],
      tableData: [],
      messList: [],
      messageData: [],
      dialogTableVisible: false
    };
  },
  components: {
  },
  methods: {
    addActivity() {
      this.$router.push({
        path: "/Admin/activityManagement/addActivity"
      });
    },
    editActivity(index) {
      this.$router.push({
        path: "/Admin/activityManagement/editActivity",
        query: {
          id: this.currentList[index].ID,
          title: this.currentList[index].ACTIVITY_TITLE,
          place: this.currentList[index].ACTIVITY_PLACE,
          price: this.currentList[index].ACTIVITY_PRICE,
          time: this.currentList[index].ACTIVITY_TIME,
          cover: this.currentList[index].ACTIVITY_COVER,
          contentImg: this.currentList[index].ACTIVITY_CONTENT_IMG
        }
      });
    },
    getNew(value) {
      this.currentList = this.tableData.slice(value, value + this.limit);
    },
    getMessNew(value) {
      this.messList = this.messageData.slice(value, value + this.limit);
    },
    pullOriginalTableData() {
      let config = {
        headers: { Authorization: localStorage.getItem("idToken") }
      };
      instance
        .get("/activity", config)
        .then(res => {
          this.tableData = res.data || [];
          this.getNew(0);
          console.log(this.tableData);
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkMessage(list) {
      this.dialogTableVisible = true;
      let config = {
        headers: { Authorization: localStorage.getItem("idToken") }
      };
      instance
        .get(`/admin/activity/${list.ID}/student`, config)
        .then(res => {
          console.log(res.data);
          this.messageData = res.data || [];
          this.getMessNew(0);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  created() {
    if (this.$route.query.alert) {
      this.alert = this.$route.query.alert;
    }
  },
  mounted() {
    this.pullOriginalTableData();
  }
};
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

#eduActivity .filter {
  margin-bottom: 30px;
}

#eduActivity .form-control {
  padding: 0px 30px 0 15px;
  font-size: 12px;
  margin-right: 5px;
}

</style>
