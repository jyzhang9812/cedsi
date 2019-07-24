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
      <div class="option">
        <input type="text" class="form-control" id="keywords" placeholder="请输入上传者名称" v-model="inputData.keywords">
        <selectInput :option="inputData.school.option" :dropDownList="inputData.school.list" tips="请选择学校" id="school"
          @option="changeOption">
        </selectInput>
        <button type="button" class="btn-my" @click="conditionSearch">搜索</button>
        <button type="button" class="btn-my" @click="clearChoices">清空筛选</button>
        <!-- <button type="button" class="btn-my">新增</button> -->
      </div>
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
          <tr v-for="(list, index) in currentList">
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
    <pagination :num="tableData.length" :limit="limit" @getNew="getNew"></pagination>
  </div>
</template>

<script>
  import pagination from "../utils/pagination.vue";
  import selectInput from "../utils/selectInput";
  export default {
    name: 'materialList',
    data() {
      return {
        limit: 10,
        currentList: [],
        tableData: [],
        inputData: {
          keywords: "",
          school: {
            option: "",
            list: ["赛迪思", "雁塔路小学", "翠华路小学", "回民街小学"]
          }
        },
        materialList: [{
            school: "回民街小学",
            author: "超级管理员",
            title: "第一节课作业",
            date: "2019-03-02 18:00"
          },
          {
            school: "雁塔路小学",
            author: "小李",
            title: "第一节课作业",
            date: "2019-03-02 18:00"
          },
          {
            school: "赛迪思",
            author: "小王",
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
            school: "赛迪思",
            author: "超级管理员",
            title: "第一节课作业",
            date: "2019-03-02 18:00"
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
          if (!new RegExp(titleOrAuthor).test(restTableList[i]["author"])) {
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
        let temp = this.titleOrAuthorFilter(this.inputData.keywords, this.materialList);
        temp = this.selectInputFilter(this.inputData, temp);
        this.tableData = temp;
        this.getNew(0);
      }
    },
    mounted() {
      this.tableData = this.materialList;
      this.getNew(0);
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
