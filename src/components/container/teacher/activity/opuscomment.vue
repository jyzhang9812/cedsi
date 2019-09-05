<!--
 * @Email: rumosky@163.com
 * @Author: rumosky
 * @Github: https://github.com/rumosky
 * @Date: 2019-07-19 13:44:06
 * @Description: teacher角色活动评论页面
 -->
<template>
  <div id="opuscomment">
    <p>活动评论管理</p>
    <div class="filter">
      <div class="option">
        <input type="text" class="form-control" id="keywords" placeholder="请输入标题关键词或作者" v-model="inputData.keywords">
        <selectInput :option="inputData.activityType.option" :dropDownList="inputData.activityType.list" tips="请选择活动类型"
          id="activityType" @option="changeOption">
        </selectInput>
        <selectInput :option="inputData.school.option" :dropDownList="inputData.school.list" tips="请选择学校" id="school"
          @option="changeOption">
        </selectInput>
        <button type="button" class="btn-my" @click="conditionSearch">搜索</button>
        <button type="button" class="btn-my" @click="clearChoices">清空筛选</button>
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
          <tr v-for="(list, index) in currentList">
            <td>{{index+1}}</td>
            <td>{{list.content}}</td>
            <td>{{list.author}}</td>
            <td>{{list.date}}</td>
            <td>{{list.school}}</td>
            <td>{{list.activityType}}</td>
            <td><span class="red">删除</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination :num="tableData.length" :limit="limit" @getNew="getNew"></pagination>
  </div>
</template>

<script>
  import pagination from "../utils/pagination.vue";
  import selectInput from "../utils/selectInput";
  export default {
    name: 'commentList',
    data() {
      return {
        limit: 10,
        currentList: [],
        tableData: [],
        inputData: {
          keywords: "",
          activityType: {
            option: "",
            list: ["通知公告", "班级活动", "辅导答疑", "布置作业"]
          },
          school: {
            option: "",
            list: ["赛迪思","雁塔路小学","翠华路小学","回民街小学"]
          }
        },
        commentList: [{
            content: "这次活动不错",
            author: "小赛",
            date: "2019-05-02 19:30",
            school: "雁塔路小学",
            activityType: "通知公告"
          },
          {
            content: "一般一般",
            author: "小孙",
            date: "2019-01-02 19:30",
            school: "赛迪思",
            activityType: "班级活动"
          },
          {
            content: "不错",
            author: "小张",
            date: "2019-02-22 19:30",
            school: "赛迪思",
            activityType: "班级活动"
          },
          {
            content: "凑合",
            author: "小刘",
            date: "2019-04-22 19:30",
            school: "翠华路小学",
            activityType: "班级活动"
          },
          {
            content: "一般一般",
            author: "小孙",
            date: "2019-01-02 19:30",
            school: "赛迪思",
            activityType: "辅导答疑"
          },
          {
            content: "一般一般",
            author: "小孙",
            date: "2019-01-02 19:30",
            school: "回民街小学",
            activityType: "布置作业"
          },
          {
            content: "一般一般",
            author: "小孙",
            date: "2019-01-02 19:30",
            school: "赛迪思",
            activityType: "布置作业"
          },
          {
            content: "good",
            author: "小王",
            date: "2019-09-24 19:30",
            school: "赛迪思",
            activityType: "班级活动"
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
        let temp = this.titleOrAuthorFilter(this.inputData.keywords, this.commentList);
        temp = this.selectInputFilter(this.inputData, temp);
        this.tableData = temp;
        this.getNew(0);
      }
    },
    mounted() {
      this.tableData = this.commentList;
      this.getNew(0);
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #opuscomment {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    font-size: 12px;
    color: #606266;
  }

  #opuscomment .option {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  #opuscomment .option input {
    width: 220px;
    height: 32px;
  }

  #opuscomment .blue {
    color: #409EFF;
  }

  #opuscomment .red {

    color: #FF6947;

  }

  #opuscomment .filter {
    margin-bottom: 30px;
  }

  #opuscomment .form-control {
    padding: 0px 30px 0 15px;
    font-size: 12px;
    margin-right: 5px;
  }

  #opuscomment .panels {
    text-align: center;
  }

  #opuscomment .panels tr {
    height: 40px;
    text-align: center;
  }

  #opuscomment .panels th {
    text-align: center;
  }

  table {
    border: #eeeeee;
  }

  #opuscomment .btn-my {
    margin-right: 8px;
    height: 32px;
    border-radius: 4px;
    font-size: 13px;
    color: #ffffff;
    background-color: #409eff;
    border: 1px solid #409eff;
  }

</style>
