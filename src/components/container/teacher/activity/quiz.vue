<!--
 * @Email: rumosky@163.com
 * @Author: rumosky
 * @Github: https://github.com/rumosky
 * @Date: 2019-07-18 09:32:13
 * @LastEditors: rumosky
 * @LastEditTime: 2019-07-19 00:01:08
 -->
<template>
  <div class="body">
    <p>学生提问</p>
    <div class="filter">

      <form class="form-inline">
        <div class="form-group">
          <label class="sr-only" for="exampleInputEmail3">type</label>
          <input type="text" class="form-control" id="typekey" placeholder="请输入标题关键词或作者">
          <input type="text" class="form-control" id="typekey" placeholder="请选择学校">
          <input type="text" class="form-control" id="typekey" placeholder="请选择在线班级">
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
            <th>问题标题</th>
            <th>发布时间</th>
            <th>学生姓名</th>
            <th>所属学校</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, index) in quizList">
            <td>{{index+1}}</td>
            <td class="blue">{{list.title}}</td>
            <td>{{list.date}}</td>
            <td>{{list.s_name}}</td>
            <td>{{list.school}}</td>
            <td>{{list.status}}</td>
            <td><span class="blue">解答</span>&nbsp;&nbsp;<span class="red">删除</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pag">

      <ul class="pagination modal-2">
        <li><a href="#" class="prev">&laquo </a></li>
        <li><a href="#" class="active">1</a></li>
        <li> <a href="#">2</a></li>
        <li> <a href="#">3</a></li>
        <li> <a href="#">4</a></li>
        <li> <a href="#">5</a></li>
        <li> <a href="#">6</a></li>
        <li> <a href="#">7</a></li>
        <li> <a href="#">8</a></li>
        <li> <a href="#">9</a></li>
        <li><a href="#" class="next"> &raquo;</a></li>
      </ul>


    </div>
  </div>
</template>

<script>
  export default {
    name: 'quizList',
    data() {
      return {
        quizList: [{
            title: "函数如何书写",
            date: "2019-01-02 17:00",
            s_name: "小赛",
            school: "赛迪思",
            status: "已解答"
          },
          {
            title: "类是干什么的",
            date: "2019-02-02 17:00",
            s_name: "小迪",
            school: "赛迪思",
            status: "已解答"
          },
          {
            title: "不会啊",
            date: "2019-03-02 17:00",
            s_name: "小李",
            school: "赛迪思",
            status: "未解答"
          },
          {
            title: "好难",
            date: "2019-04-02 17:00",
            s_name: "小王",
            school: "赛迪思",
            status: "已解答"
          },
          {
            title: "辛苦",
            date: "2019-05-02 17:00",
            s_name: "小刘",
            school: "赛迪思",
            status: "未解答"
          }
        ]
      }
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

  .pag {
    font-size: 13px;
  }

  .pagination {
    list-style: none;
    display: inline-block;
    padding: 0;
    margin-top: 10px;
  }

  .pagination li {
    display: inline;
    text-align: center;
  }

  .pagination a {
    float: left;
    display: block;
    font-size: 13px;
    text-decoration: none;
    padding: 5px 12px;
    color: #c2c4cc;
    margin-left: -1px;
    border: 1px solid transparent;
    line-height: 1.5;
  }

  .pagination a.active {
    cursor: default;
  }

  .pagination a:active {
    outline: none;
  }

  .modal-2 li:first-child a {
    -moz-border-radius: 50px 0 0 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px 0 0 50px;
  }

  .modal-2 li:last-child a {
    -moz-border-radius: 0 50px 50px 0;
    -webkit-border-radius: 0;
    border-radius: 0 50px 50px 0;
  }

  .modal-2 a {
    border-color: #f4f4f5;
    color: #c2c4cc;
    background: #f4f4f5;
  }

  .modal-2 a:hover {
    color: #FFF;
    background-color: #409EFF;
  }

  .modal-2 a.active,
  .modal-2 a:active {
    border-color: #409EFF;
    background: #409EFF;
    color: #fff;
  }

</style>
