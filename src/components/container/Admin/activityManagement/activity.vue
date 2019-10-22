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
      <p>活动管理</p>
      <div class="filter">
        <div class="option">
          <button type="button" class="btn-my" @click="addActivity">新增活动</button>
        </div>
      </div>
      <div class="panels">
        <table class="table table-hover" rules=rows frame=below>
          <thead>
            <tr>
              <th>序号</th>
              <th>活动标题</th>
              <th>发布时间</th>
              <th>活动地点</th>
              <th>价格</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(list, index) in currentList" :key="index">
              <td>{{index + 1}}</td>
              <td width='380px' class="blue">{{list.ACTIVITY_TITLE}}</td>
              <td>{{list.ACTIVITY_TIME}}</td>
              <td>{{list.ACTIVITY_PLACE}}</td>
              <td>{{list.ACTIVITY_PRICE}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <pagination :num="tableData.length" :limit="limit" @getNew="getNew"></pagination>
    </div>
  </div>
</template>

<script>
  import pagination from "../../teacher/utils/pagination.vue";
  import selectInput from "../../teacher/utils/selectInput";
  import deletePrompt from "../../teacher/utils/deletePrompt";
  import AWS from 'aws-sdk';
  import instance from '../../../../axios-auth.js';
  import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";

  export default {
    name: 'activity',
    data() {
      return {
        content: '',
        limit: 10,
        currentList: [],
        tableData: [],
        activityList: [{
            title: "",
            releaseTime: "",
            activityType: "",
            place: "",
            price: "",
          }
        ]
      }
    },
    components: {
      pagination,
      selectInput,
      deletePrompt
    },
    methods: {
      addActivity() {
        this.$router.push({
          path: "/Admin/activityManagement/addActivity"
        });
      },
      getNew(value) {
        this.currentList = this.tableData.slice(value, value + this.limit);
      },
      pullOriginalTableData() {
        let config = { headers: { Authorization: localStorage.getItem('idToken') } };
        instance.get('/activity', config)
          .then(res => {
            this.tableData = res.data || [];
            this.getNew(0);
            this.$toast.success({ title: "活动管理", message: "刷新成功" });
          }).catch(err => { console.log(err) });
      }
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

  #eduActivity table {
    border: #eeeeee;
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
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    font-size: 13px;
    min-width: 850px;
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

</style>
