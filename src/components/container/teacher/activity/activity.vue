<!--
 * @Email: rumosky@163.com
 * @Author: rumosky
 * @Github: https://github.com/rumosky
 * @Date: 2019-07-18 09:32:13
 * @LastEditors: rumosky
 * @LastEditTime: 2019-07-18 10:24:19
 -->
<template>
  <div class="body">
    <p>活动管理</p>
    <div class="filter">


      <form class="form-inline">
        <div class="form-group">
          <label class="sr-only" for="exampleInputEmail3">type</label>
          <input type="text" class="form-control" id="typekey" placeholder="请输入标题关键词或作者">
          <input type="text" class="form-control" id="typekey" placeholder="请选择活动类型">
          <input type="text" class="form-control" id="typekey" placeholder="请选择学校">
          <input type="text" class="form-control" id="typekey" placeholder="请选择线上班级">
          <button type="button" class="btn btn-primary">搜索</button>
          <button type="button" class="btn btn-primary">清空筛选</button>
          <button type="button" class="btn btn-primary">新增活动</button>
        </div>
      </form>
    </div>
    <div class="panels">
      <table class="table talbe-hover" rules=rows frame=below>
        <tr>
          <th>序号</th>
          <th>活动标题</th>
          <th>发布时间</th>
          <th>作者</th>
          <th>活动类型</th>
          <th>所属学校</th>
          <th>回复/查看</th>
          <th>是否置顶</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
        <tr>
          <td>1</td>
          <td class="blue">test1</td>
          <td>2019-5-2 19:30</td>
          <td>编程测试</td>
          <td>布置作业</td>
          <td>赛迪思</td>
          <td>1/6</td>
          <td>
            <div class="switch-box is-info">
              <input id="info" class="switch-box-input" type="checkbox" checked />
              <label for="info" class="switch-box-slider"></label>
              <label for="info" class="switch-box-label"></label>
            </div>
          </td>
          <td>正常</td>
          <td><span class="blue">编辑</span>&nbsp;&nbsp;<span class="red">删除</span></td>
        </tr>
      </table>
    </div>
    <div class="pag">

      <ul class="pagination modal-2">
        <li><a href="#" class="prev">&laquo;</a></li>
        <li><a href="#">1</a></li>
        <li> <a href="#">2</a></li>
        <li> <a href="#" class="active">3</a></li>
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
    name: 'ActivityList',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
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
    margin-left: 10px;
  }

  .panels tr {
    height: 40px;
  }

  table {
    border: #eeeeee;
  }

  .switch-box {
    display: block;
    padding-top: 8px;
    padding-left: 8px;
  }

  .switch-box .switch-box-slider {
    position: relative;
    display: inline-block;
    height: 8px;
    width: 32px;
    background: #d5d5d5;
    border-radius: 8px;
    cursor: pointer;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  .switch-box .switch-box-slider:after {
    position: absolute;
    left: -8px;
    top: -8px;
    display: block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #eeeeee;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
    content: '';
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  .switch-box .switch-box-input {
    display: none;
  }

  .switch-box .switch-box-input~.switch-box-label {
    margin-left: 8px;
  }

  .switch-box .switch-box-input:checked~.switch-box-slider:after {
    left: 16px;
  }

  .switch-box.is-info .switch-box-input:checked:not(:disabled)~.switch-box-slider {
    background: #5faee3;
  }

  .switch-box.is-info .switch-box-input:checked:not(:disabled)~.switch-box-slider:after {
    background: #3498db;
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
