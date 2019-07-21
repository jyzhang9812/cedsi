<!--
 * @Email: rumosky@163.com
 * @Author: rumosky
 * @Github: https://github.com/rumosky
 * @Date: 2019-07-19 13:44:06
 * @Description: teacher角色辅导资料页面
 -->
<template>
  <div class="body">
    <p>辅导资料</p>
    <div class="filter">
      <form class="form-inline">
        <div class="form-group">
          <label class="sr-only" for="exampleInputEmail3">type</label>
          <input type="text" class="form-control" id="typekey" placeholder="请输入上传者名称">
          <input type="text" class="form-control" id="typekey" placeholder="请选择学校">
          <button type="button" class="btn btn-primary">搜索</button>
          <button type="button" class="btn btn-primary">清空筛选</button>
          <button type="button" class="btn btn-primary">新增</button>
        </div>
      </form>
    </div>
    <div class="panels">
      <table class="table table-hover" rules=rows frame=below>
        <thead>
          <tr>
            <th>序号</th>
            <th>所属学校</th>
            <th>上传者</th>
            <th>标题</th>
            <th>发布时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, index) in materialList">
            <td>{{index+1}}</td>
            <td>{{list.school}}</td>
            <td>{{list.author}}</td>
            <td>{{list.title}}</td>
            <td>{{list.date}}</td>
            <td><span class="blue">编辑</span>&nbsp;&nbsp;<span class="red">删除</span></td>
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
    name: 'materialList',
    data() {
      return {
        num: 0,
        limit: 10,
        currentList: [],
        materialList: [{
            school: "回民街小学",
            author: "超级管理员",
            title: "第一节课作业",
            date: "2019-03-02 18:00"
          },
          {
            school: "雁塔路小学",
            author: "超级管理员",
            title: "第一节课作业",
            date: "2019-03-02 18:00"
          },
          {
            school: "北大街小学",
            author: "超级管理员",
            title: "第一节课作业",
            date: "2019-03-02 18:00"
          },
          {
            school: "翠华路小学",
            author: "超级管理员",
            title: "第一节课作业",
            date: "2019-03-02 18:00"
          },
          {
            school: "长安路小学",
            author: "超级管理员",
            title: "第一节课作业",
            date: "2019-03-02 18:00"
          }
        ]
      }
    },
    components: {
      pagination
    },
    methods: {
      getNew(value) {
        this.currentList = this.materialList.slice(value, value + this.limit);
      }
    },
    mounted() {
      this.getNew(1);
      this.num = this.materialList.length;
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
