<!--
 * @Email: rumosky@163.com
 * @Author: rumosky
 * @Github: https://github.com/rumosky
 * @Date: 2019-07-19 13:44:06
 * @Description: teacher角色学生提问页面
 -->
<template>
  <div class="body">
    <p>学生提问</p>
    <div class="filter">
      <div class="option">
        <input type="text" class="form-control" id="typekey" placeholder="请输入标题关键词或作者">
        <selectInput :option="inputData.school.option" :dropDownList="inputData.school.list" tips="请选择学校" id="school"
          @option="changeOption">
        </selectInput>
        <selectInput :option="inputData.classOnline.option" :dropDownList="inputData.classOnline.list" tips="请选择线上班级"
          id="classOnline" @option="changeOption"></selectInput>
        <button type="button" class="btn-my">搜索</button>
        <button type="button" class="btn-my">清空筛选</button>
      </div>
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
    <pagination :num="num" :limit="limit" @getNew="getNew"></pagination>
  </div>
</template>

<script>
  import pagination from "../utils/pagination.vue";
  import selectInput from "../utils/selectInput";
  export default {
    name: 'quizList',
    data() {
      return {
        num: 0,
        limit: 10,
        currentList: [],
        inputData: {
          school: {
            option: "",
            list: ["全部", "赛迪思"]
          },
          classOnline: {
            option: "",
            list: ["全部", "赛迪思"]
          }
        },
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
    },
    components: {
      pagination,
      selectInput
    },
    methods: {
      getNew(value) {
        this.currentList = this.quizList.slice(value, value + this.limit);
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
      this.num = this.quizList.length;
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
