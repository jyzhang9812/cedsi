<!--
 * @Email: rumosky@163.com
 * @Author: rumosky
 * @Github: https://github.com/rumosky
 * @Date: 2019-07-19 13:44:06
 * @Description: teacher角色活动评论页面
 -->
<template>
  <div class="body">
    <p>作品评论</p>
    <div class="filter">
      <form class="form-inline">
        <div class="form-group">
          <label class="sr-only" for="exampleInputEmail3">type</label>
          <input type="text" class="form-control" id="typekey" placeholder="选择学校">
          <input type="text" class="form-control" id="typekey" placeholder="请输入一级评论关键词">
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
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, index) in commentList">
            <td>{{index+1}}</td>
            <td>{{list.content}}</td>
            <td>{{list.auther}}</td>
            <td>{{list.date}}</td>
            <td>{{list.school}}</td>
            <td>
              <span class="red">删除</span>
            </td>
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
            content: "不错",
            auther: "小赛",
            date: "2019-01-12 10:08",
            school: "赛迪思"
          },
          {
            content: "还不错",
            auther: "小王",
            date: "2019-02-12 10:08",
            school: "赛迪思"
          },
          {
            content: "凑合吧",
            auther: "小刘",
            date: "2019-03-12 10:08",
            school: "赛迪思"
          },
          {
            content: "一般一般",
            auther: "小李",
            date: "2019-04-12 10:08",
            school: "赛迪思"
          },
          {
            content: "非常好",
            auther: "小张",
            date: "2019-06-12 10:08",
            school: "赛迪思"
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
