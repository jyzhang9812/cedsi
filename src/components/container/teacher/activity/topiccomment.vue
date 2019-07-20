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
      <form class="form-inline">
        <div class="form-group">
          <label class="sr-only" for="exampleInputEmail3">type</label>
          <input type="text" class="form-control" id="typekey" placeholder="请选择学校">
          <input type="text" class="form-control" id="typekey" placeholder="请选择活动类型">
          <input type="text" class="form-control" id="typekey" placeholder="请输入标题关键词或作者">
          <button type="button" class="btn btn-primary">搜索</button>
          <button type="button" class="btn btn-primary">清空筛选</button>
        </div>
      </form>
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
  import pagination from "../../teacher/utils/pagination.vue"
  export default {
    name: 'commentList',
    data() {
      return {
        num: 0,
        limit: 10,
        currentList: [],
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
      pagination
    },
    methods: {
      getNew(value) {
        this.currentList = this.commentList.slice(value, value + this.limit);
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
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04) */
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

</style>
