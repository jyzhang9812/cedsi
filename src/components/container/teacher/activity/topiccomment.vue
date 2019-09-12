<!--
 * @Email: rumosky@163.com
 * @Author: rumosky
 * @Github: https://github.com/rumosky
 * @Date: 2019-07-19 13:44:06
 * @Description: teacher角色作品评论页面
 -->
<template>
  <div id="topiccomment">
    <p>作品评论</p>
    <div class="option">
      <input type="text" class="form-control" id="keywords" placeholder="请输入评论关键词或作者" v-model="inputData.keywords">
      <selectInput :option="inputData.school.option" :dropDownList="inputData.school.list" tips="请选择学校" id="school"
        @option="changeOption">
      </selectInput>
      <button type="button" class="btn-my" @click="conditionSearch">搜索</button>
      <button type="button" class="btn-my" @click="clearChoices">清空筛选</button>
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
          <tr v-for="(list, index) in currentList" :key="index">
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
          school: {
            option: "",
            list: ["赛迪思","雁塔路小学","翠华路小学","回民街小学"]
          }
        },
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
            school: "雁塔路小学"
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
            school: "翠华路小学"
          },
          {
            content: "非常好",
            auther: "小张",
            date: "2019-06-12 10:08",
            school: "回民街小学"
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
  #topiccomment  {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    font-size: 12px;
    color: #606266;
  }

  #topiccomment .option {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  #topiccomment .option input {
    width: 220px;
    height: 32px;
  }

  #topiccomment .blue {
    color: #409EFF;
  }

  #topiccomment .red {

    color: #FF6947;

  }

  #topiccomment .filter {
    margin-bottom: 30px;
  }

  #topiccomment .form-control {
    padding: 0px 30px 0 15px;
    font-size: 12px;
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04) */
    margin-right: 5px;
  }

  #topiccomment .panels {
    text-align: center;
  }

  #topiccomment .panels tr {
    height: 40px;
    text-align: center;
  }

  #topiccomment .panels th {
    text-align: center;
  }

  #topiccomment table {
    border: #eeeeee;
  }

  #topiccomment .btn-my {
    margin-right: 8px;
    height: 32px;
    border-radius: 4px;
    font-size: 13px;
    color: #ffffff;
    background-color: #409eff;
    border: 1px solid #409eff;
  }

</style>
