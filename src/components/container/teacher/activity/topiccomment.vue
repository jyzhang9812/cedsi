<!--
 * @Email: rumosky@163.com
 * @Author: rumosky
 * @Github: https://github.com/rumosky
 * @Date: 2019-07-19 13:44:06
 * @Description: teacher角色作品评论页面
 -->
<template>
  <div class="body">
    <p>活动评论管理</p>
    <div class="filter">
      <div class="option">
        <input type="text" class="form-control" id="typekey" placeholder="请输入标题关键词或作者">

        <selectInput :option="inputData.activityType.option" :dropDownList="inputData.activityType.list" tips="请选择活动类型"
          id="activityType" @option="changeOption">
        </selectInput>

        <selectInput :option="inputData.school.option" :dropDownList="inputData.school.list" tips="请选择学校" id="school"
          @option="changeOption">
        </selectInput>

        <button type="button" class="btn-my">搜索</button>
        <button type="button" class="btn-my">清空筛选</button>
      </div>
    </div>
    <div class="panels">
      <table class="table table-hover" rules=rows frame=below>
        <thead>
          <tr>
            <th>序号</th>
            <th>评论内容</th>
            <th>评论人</th>
            <th>评论时间</th>
            <th>所属学校</th>
            <th>所属分类</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, index) in commentList">
            <td>{{index+1}}</td>
            <td>{{list.content}}</td>
            <td>{{list.author}}</td>
            <td>{{list.date}}</td>
            <td>{{list.school}}</td>
            <td>{{list.type}}</td>
            <td><span class="red">删除</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination :num="num" :limit="limit" @getNew="getNew"></pagination>
  </div>
</template>

<script>
  import pagination from "../utils/pagination.vue";
  import selectInput from "../utils/selectInput";
  export default {
    name: 'commentList',
    data() {
      return {
        num: 0,
        limit: 10,
        currentList: [],
        inputData: {
          activityType: {
            option: "",
            list: ["全部", "通知公告", "班级活动", "辅导答疑", "布置作业"]
          },
          school: {
            option: "",
            list: ["全部", "赛迪思"]
          }
        },
        commentList: [{
            content: "这次活动不错",
            author: "小赛",
            date: "2019-05-02 19:30",
            school: "赛迪思",
            type: "班级活动"
          },
          {
            content: "一般一般",
            author: "小孙",
            date: "2019-01-02 19:30",
            school: "赛迪思",
            type: "班级活动"
          },
          {
            content: "不错",
            author: "小张",
            date: "2019-02-22 19:30",
            school: "赛迪思",
            type: "班级活动"
          },
          {
            content: "凑合",
            author: "小刘",
            date: "2019-04-22 19:30",
            school: "赛迪思",
            type: "班级活动"
          },
          {
            content: "good",
            author: "小王",
            date: "2019-09-24 19:30",
            school: "赛迪思",
            type: "班级活动"
          }
        ]
      }
    },
    components: {
      pagination,
      selectInput
    },
    methods: {
      getNew(value) {
        this.currentList = this.commentList.slice(value, value + this.limit);
      },
      changeOption(item, id) {
        Object.keys(this.inputData).forEach((res) => {
          if (res === id) {
            this.inputData[res].option = item;
          }
        });
      }
    },
    mounted() {
      this.getNew(1);
      this.num = this.commentList.length;
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .body {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    font-size: 12px;
    color: #606266;
  }

  .option {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .option input {
    width: 220px;
    height: 32px;
  }

  .blue {
    color: #409EFF;
  }

  .red {

    color: #FF6947;

  }

  .filter {
    margin-bottom: 30px;
  }

  .form-control {
    padding: 0px 30px 0 15px;
    font-size: 12px;
    margin-right: 5px;
  }

  .panels {
    text-align: center;
  }

  .panels tr {
    height: 40px;
    text-align: center;
  }

  .panels th {
    text-align: center;
  }

  table {
    border: #eeeeee;
  }

  .btn-my {
    margin-right: 8px;
    height: 32px;
    border-radius: 4px;
    font-size: 13px;
    color: #ffffff;
    background-color: #409eff;
    border: 1px solid #409eff;
  }

</style>
