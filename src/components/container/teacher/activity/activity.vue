<!--
 * @Email: rumosky@163.com
 * @Author: rumosky
 * @Github: https://github.com/rumosky
 * @Date: 2019-07-19 13:44:06
 * @Description: teacher角色发布活动页面
 -->
<template>
  <div class="body">
    <p>活动管理</p>
    <div class="filter">
      <div class="option">
        <input type="text" class="form-control" id="keywords" placeholder="请输入标题关键词或作者" v-model="inputData.keywords">
        <selectInput :option="inputData.activityType.option" :dropDownList="inputData.activityType.list" tips="请选择活动类型"
          id="activityType" @option="changeOption">
        </selectInput>
        <selectInput :option="inputData.school.option" :dropDownList="inputData.school.list" tips="请选择学校" id="school"
          @option="changeOption">
        </selectInput>
        <selectInput :option="inputData.classOnline.option" :dropDownList="inputData.classOnline.list" tips="请选择线上班级"
          id="classOnline" @option="changeOption"></selectInput>
        <button type="button" class="btn-my">搜索</button>
        <button type="button" class="btn-my" @click="clearChoices">清空筛选</button>
        <button type="button" class="btn-my">新增活动</button>
      </div>
    </div>
    <div class="panels">
      <table class="table table-hover" rules=rows frame=below>
        <thead>
          <tr>
            <th>序号</th>
            <th>活动标题</th>
            <th>发布时间</th>
            <th>作者</th>
            <th>活动类型</th>
            <th>所属学校</th>
            <th>回复/查看</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, index) in currentList">
            <td>{{index + 1}}</td>
            <td class="blue">{{list.title}}</td>
            <td>{{list.date}}</td>
            <td>{{list.auther}}</td>
            <td>{{list.type}}</td>
            <td>{{list.school}}</td>
            <td>{{list.reply}}/{{list.view}}</td>
            <td>{{list.status}}</td>
            <td><span class="blue">编辑</span>&nbsp;&nbsp;<span class="red">删除</span></td>
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
    name: 'activity',
    data() {
      return {
        num: 0,
        limit: 10,
        currentList: [],
        inputData: {
          keywords: "",
          activityType: {
            option: "",
            list: ["全部", "通知公告", "班级活动", "辅导答疑", "布置作业"]
          },
          school: {
            option: "",
            list: ["全部", "赛迪思"]
          },
          classOnline: {
            option: "",
            list: ["全部", "赛迪思"]
          }
        },
        activityList: [{
            title: "test1",
            date: "2019-01-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "1",
            view: "6",
            status: "正常"
          },
          {
            title: "test2",
            date: "2019-01-06 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "2",
            view: "6",
            status: "正常"
          },
          {
            title: "test3",
            date: "2019-03-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "0",
            view: "6",
            status: "正常"
          },
          {
            title: "test4",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test5",
            date: "2019-05-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "5",
            view: "6",
            status: "正常"
          },
          {
            title: "test6",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test7",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test8",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test9",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test10",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test11",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test12",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test13",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test14",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test15",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test16",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test17",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test18",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test19",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test20",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test21",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test22",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test23",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test24",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test25",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test26",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test27",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test28",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test29",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test30",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test31",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test32",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test33",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test34",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test35",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test36",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test37",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test38",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test39",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test40",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test41",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test42",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test43",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test44",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test45",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test46",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test47",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test48",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test49",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test50",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test51",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test52",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test53",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test54",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test55",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test56",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test57",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test58",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test59",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test60",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test61",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test62",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test63",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test64",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test65",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test66",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test67",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test68",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test69",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test70",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test71",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test72",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test73",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test74",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test75",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test76",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test77",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test78",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test79",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test80",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test81",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test82",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test83",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test84",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test85",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test86",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test87",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test88",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test89",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test90",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test91",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test92",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test93",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test94",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test95",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test96",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test97",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test98",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test99",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test100",
            date: "2019-04-01 12:00",
            auther: "编程测试",
            type: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
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
        this.currentList = this.activityList.slice(value, value + this.limit);
      },
      changeOption(item, id) {
        Object.keys(this.inputData).forEach((res) => {
          if (res === id) {
            this.inputData[res].option = item;
          }
        });
      },
      clearChoices() {
        this.optionsClear();
      },
      optionsClear() {
        // 如果是字符串则清空, 如果是对象则清空 option
        Object.keys(this.inputData).forEach((res) => {
          if (this.inputData[res].hasOwnProperty("option")) {
            this.inputData[res].option = "";
          } else {
            this.inputData[res] = "";
          }
        });
      }
    },
    mounted() {
      this.getNew(1);
      this.num = this.activityList.length;
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
