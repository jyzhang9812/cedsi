<!--
 * @Email: rumosky@163.com
 * @Author: rumosky
 * @Github: https://github.com/rumosky
 * @Date: 2019-07-19 13:44:06
 * @Description: teacher角色发布活动页面
 -->
<template>
  <div id="teacher-activity">
    <div class="body" v-show="!addShown">
      <p>活动管理</p>
      <div class="filter">
        <div class="option">
          <input type="text" class="form-control" id="keywords" placeholder="请输入标题关键词或作者" v-model="inputData.keywords">
          <selectInput :option="inputData.activityType.option" :dropDownList="inputData.activityType.list"
            tips="请选择活动类型" id="activityType" @option="changeOption">
          </selectInput>
          <selectInput :option="inputData.school.option" :dropDownList="inputData.school.list" tips="请选择学校" id="school"
            @option="changeOption">
          </selectInput>
          <button type="button" class="btn-my" @click="conditionSearch">搜索</button>
          <button type="button" class="btn-my" @click="clearChoices">清空筛选</button>
          <button type="button" class="btn-my" @click="addActivityShow">新增活动</button>
        </div>
      </div>
      <div class="panels">
        <table class="table table-hover" rules=rows frame=below>
          <thead>
            <tr>
              <th>序号</th>
              <th>活动标题</th>
              <th>发布时间</th>
              <th>负责人</th>
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
              <td>{{list.author}}</td>
              <td>{{list.activityType}}</td>
              <td>{{list.school}}</td>
              <td>{{list.reply}}/{{list.view}}</td>
              <td>{{list.status}}</td>
              <td><span class="blue">编辑</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <pagination :num="tableData.length" :limit="limit" @getNew="getNew"></pagination>
    </div>


    <div class="add" v-show="addShown">
      <form action="">
        <div class="item">
          <p>标题：</p><input type="text" class="title" placeholder="请输入标题">
        </div>
        <div class="item">
          <p>活动类型：</p>
          <selectInput :option="inputData.activityType.option" :dropDownList="inputData.activityType.list"
            tips="请选择活动类型" id="activityType" @option="changeOption">
          </selectInput>
          <p>发送学校：</p>
          <selectInput :option="inputData.school.option" :dropDownList="inputData.school.list" tips="请选择学校" id="school"
            @option="changeOption">
          </selectInput>
          <p>状态：</p><input type="checkbox" name="normal" value="正常" class="checkbox">
          <p>正常</p>
          <input type="checkbox" name="draft" value="草稿" class="checkbox">
          <p>草稿</p>
        </div>
        <div class="item">
          <p>缩略图：</p><input type="file" class="file">
        </div>
        <div class="item">
          建议分辨率1024x720
        </div>
        <div class="item">
          <div ref="editor" class="editor"></div>
        </div>
        <div class="item1">
          <button type="button" class="btn-my" @click="addActivitySave">保存</button>
          <button type="button" class="btn-my" @click="addActivityShow">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import pagination from "../utils/pagination.vue";
  import selectInput from "../utils/selectInput";
  import deletePrompt from "../utils/deletePrompt";
  import E from 'wangeditor';
  export default {
    name: 'activity',
    data() {
      return {
        limit: 10,
        addShown: false,
        currentList: [],
        tableData: [],
        editorContent: '',
        inputData: {
          keywords: "",
          activityType: {
            option: "",
            list: ["通知公告", "班级活动", "辅导答疑", "布置作业"]
          },
          school: {
            option: "",
            list: ["赛迪思", "雁塔路小学", "翠华路小学", "回民街小学"]
          }
        },
        activityList: [{
            title: "test1",
            date: "2019-01-01 12:00",
            author: "编程测试",
            activityType: "通知公告",
            school: "赛迪思",
            reply: "1",
            view: "6",
            status: "正常"
          },
          {
            title: "test2",
            date: "2019-01-06 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "雁塔路小学",
            reply: "2",
            view: "6",
            status: "正常"
          },
          {
            title: "test3",
            date: "2019-03-01 12:00",
            author: "编程测试",
            activityType: "通知公告",
            school: "赛迪思",
            reply: "0",
            view: "6",
            status: "正常"
          },
          {
            title: "test4",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test5",
            date: "2019-05-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "5",
            view: "6",
            status: "正常"
          },
          {
            title: "test6",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "班级活动",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test7",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "翠华路小学",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test8",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "班级活动",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test9",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test10",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "翠华路小学",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test11",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test12",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "翠华路小学",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test13",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test14",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "雁塔路小学",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test15",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test16",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test17",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test18",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test19",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test20",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test21",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test22",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "雁塔路小学",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test23",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test24",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test25",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test26",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test27",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "翠华路小学",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test28",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test29",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test30",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test31",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test32",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test33",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test34",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test35",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test36",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test37",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test38",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test39",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test40",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test41",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test42",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test43",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test44",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test45",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test46",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test47",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test48",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test49",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test50",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test51",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test52",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test53",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test54",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test55",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "翠华路小学",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test56",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "翠华路小学",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test57",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test58",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test59",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "翠华路小学",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test60",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test61",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test62",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test63",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test64",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test65",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test66",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test67",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test68",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test69",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test70",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test71",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test72",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test73",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test74",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test75",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test76",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test77",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test78",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test79",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test80",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test81",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test82",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test83",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test84",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test85",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test86",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test87",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test88",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test89",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "回民街小学",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test90",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test91",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test92",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "回民街小学",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test93",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test94",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test95",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test96",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "回民街小学",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test97",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test98",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test99",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
            school: "赛迪思",
            reply: "3",
            view: "6",
            status: "正常"
          },
          {
            title: "test100",
            date: "2019-04-01 12:00",
            author: "编程测试",
            activityType: "布置作业",
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
      selectInput,
      deletePrompt
    },
    methods: {
      getNew(value) {
        this.currentList = this.tableData.slice(value, value + this.limit);
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
        Object.keys(this.inputData).forEach((res) => {
          if (this.inputData[res].hasOwnProperty("option")) {
            this.inputData[res].option = "";
          } else {
            this.inputData[res] = "";
          }
        });
      },
      titleOrAuthorFilter(titleOrAuthor, tableList) {
        if (titleOrAuthor === "") return tableList;
        let restTableList = tableList.slice(0);
        for (let i = 0, j = restTableList.length; i < j; i++) {
          if ((!new RegExp(titleOrAuthor).test(restTableList[i]["title"])) &&
            (!new RegExp(titleOrAuthor).test(restTableList[i]["author"]))) {
            restTableList.splice(i, 1);
            j -= 1;
            i -= 1;
          }
        }
        return restTableList;
      },
      selectInputFilter(inputData, tableList) {
        let restTableList = tableList.slice(0);
        for (let i = 0, j = restTableList.length; i < j; i++) {
          for (let res of Object.keys(inputData)) {
            let condition1 = inputData[res].hasOwnProperty("option") &&
              inputData[res].option !== "";
            let condition2 = restTableList[i].hasOwnProperty(res) &&
              restTableList[i][res] !== inputData[res].option;
            if (condition1 && condition2) {
              restTableList.splice(i, 1);
              i -= 1;
              j -= 1;
              break;
            }
          }
        }
        return restTableList;
      },
      conditionSearch() {
        let temp = this.titleOrAuthorFilter(this.inputData.keywords, this.activityList);
        temp = this.selectInputFilter(this.inputData, temp);
        this.tableData = temp;
        this.getNew(0);
      },
      addActivityShow() {
        this.addShown = !this.addShown;
      },
      addActivitySave() {
        this.addActivityShow();
      }
    },
    mounted() {
      this.tableData = this.activityList;
      this.getNew(0);
      let editor = new E(this.$refs.editor);
      editor.customConfig.uploadImgShowBase64 = true;
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      };
      editor.customConfig.menus = [
          'head', // 标题
          'bold', // 粗体
          'fontSize', // 字号
          'fontName', // 字体
          'italic', // 斜体
          'underline', // 下划线
          'strikeThrough', // 删除线
          'foreColor', // 文字颜色
          'backColor', // 背景颜色
          'link', // 插入链接
          'list', // 列表
          'justify', // 对齐方式
          'quote', // 引用
          'emoticon', // 表情
          'image', // 插入图片
          'table', // 表格
          'video', // 插入视频
          'code', // 插入代码
          'undo', // 撤销
          'redo' // 重复
        ],
        editor.create();
      editor.txt.html('<p>请输入内容</p>');
    }
  }

</script>

<style scoped>
#teacher-activity .body {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    font-size: 12px;
    color: #606266;
    min-width: 850px;
  }

  #teacher-activity .option {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  #teacher-activity .option input {
    width: 220px;
    height: 32px;
  }

  #teacher-activity .blue {
    color: #409EFF;
  }

  #teacher-activity .red {
    color: #FF6947;
  }

  #teacher-activity .filter {
    margin-bottom: 30px;
  }

  #teacher-activity .form-control {
    padding: 0px 30px 0 15px;
    font-size: 12px;
    margin-right: 5px;
  }

  #teacher-activity .panels {
    text-align: center;
  }

  #teacher-activity .panels tr {
    height: 40px;
    text-align: center;
  }

  #teacher-activity .panels th {
    text-align: center;
  }

  #teacher-activity table {
    border: #eeeeee;
  }

  #teacher-activity .btn-my {
    margin-right: 8px;
    height: 32px;
    border-radius: 4px;
    font-size: 13px;
    color: #ffffff;
    background-color: #409eff;
    border: 1px solid #409eff;
  }

  #teacher-activity .add {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    font-size: 13px;
    min-width: 850px;
  }

  #teacher-activity .title {
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

  #teacher-activity .item {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 20px;
  }

  #teacher-activity .item p {
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
    margin-right: 5px;
  }

  #teacher-activity .file {
    height: 32px;
  }

  #teacher-activity .checkbox {
    vertical-align: middle;
    margin: 0;
    height: 32px;
  }

  #teacher-activity .editor {
    width: 800px;
  }

  #teacher-activity .item1 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 20px;
    margin-left: 356px;
  }

</style>
