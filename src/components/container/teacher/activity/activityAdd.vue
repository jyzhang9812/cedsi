<!--
 * @Email: rumosky@163.com
 * @Author: rumosky
 * @Github: https://github.com/rumosky
 * @Date: 2019-07-20 17:33:30
 * @Description: teacher角色增加活动/编辑活动页面
 -->
<template>
  <div class="body">
    <form action="">
      <div class="item">
        标题：<input type="text" placeholder="请输入标题">
        状态：<input type="checkbox" name="normal" value="正常">正常
        <input type="checkbox" name="draft" value="草稿">草稿
        活动类型：<selectInput :option="inputData.activityType.option" :dropDownList="inputData.activityType.list"
          tips="请选择活动类型" id="activityType" @option="changeOption">
        </selectInput>
        发送学校：<selectInput :option="inputData.school.option" :dropDownList="inputData.school.list" tips="请选择学校"
          id="school" @option="changeOption">
        </selectInput>
      </div>
      <div class="item">
        <div ref="editor" class="editor"></div>
      </div>
      <div class="item">
        <button type="button" class="btn-my">保存</button>
        <button type="button" class="btn-my">取消</button>
      </div>
    </form>
  </div>
</template>

<script>
  import E from 'wangeditor';
  import selectInput from "../utils/selectInput";
  export default {
    name: "activityAdd",
    data() {
      return {
        editorContent: '',
        inputData: {
          activityType: {
            option: "",
            list: ["通知公告", "班级活动", "辅导答疑", "布置作业"]
          },
          school: {
            option: "",
            list: ["赛迪思", "雁塔路小学", "翠华路小学", "回民街小学"]
          }
        }
      }
    },
    components: {
      selectInput
    },
    methods: {
      getContent: function () {
        alert(this.editorContent)
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
      var editor = new E(this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.create()
    }
  }

</script>

<style scoped>
  .body {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 20px;
    margin-left: 30px;
    font-size: 13px;
    min-width: 850px;
    /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border: 1px solid #ebeef5;
    border-radius: 4px; */
  }

  .item {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 20px;
    margin-left: 20px;
  vertical-align: middle;
  }
.editor {
  width: 800px;
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
