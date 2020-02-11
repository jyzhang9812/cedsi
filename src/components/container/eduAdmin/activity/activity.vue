<template>
  <div id="eduActivity">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>发布活动</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="addActivity" style="margin-top: 20px;">新增活动</el-button>
    <el-table :data="activityList" style="width: 100%;margin-top: 20px;">
      <el-table-column type="index" label="序号" width="180" align="center">
      </el-table-column>
      <el-table-column prop="activityName" label="活动名称" width="180" align="center">
      </el-table-column>
      <el-table-column prop="activityPlace" label="活动地点" width="180" align="center">
      </el-table-column>
      <el-table-column prop="activityTime" label="活动时间" width="180" align="center">
      </el-table-column>
      <el-table-column prop="activityPrice" label="价格" width="180" align="center">
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="editActivity(scope.$index)">编辑</el-button>
          <el-button type="text">查看学生</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
《
<script>
  export default {
    data() {
      return {
        activityList: []
      }
    },
    methods: {
      addActivity() {
        this.$router.push({ path: "/eduAdmin/activity/addActivity", });
      },
      // editActivity(index) {
      //   let data = {
      //     activityId: this.activityList[index].activityId,
      //     activityName: this.activityList[index].activityName,
      //     activityPlace: this.activityList[index].activityPlace,
      //     activityTime: this.activityList[index].activityTime,
      //     activityPrice: this.activityList[index].activityPrice
      //   }
      //   this.$router.push({ path: "/eduAdmin/activity/addActivity", query: { data: encodeURIComponent(JSON.stringify(data))}});

      // }
    },
    mounted() {
      let token = localStorage.getItem("idToken");
      const config = { headers: { Authorization: token } };
      instance
        .get("/eduadmin/activity", config)
        .then(({ data }) => {
          console.log({ 活动数据: data });
          if (data.length) {
            this.activityList = data.map(item => {
              return {
                activityId: ACTIVITY_ID,
                activityName: ACTIVITY_NAME,
                activityPlace: ACTIVITY_PLACE,
                activityTime: ACTIVITY_TIME,
                activityPrice: ACTIVITY_PRICE
              };
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
</script>