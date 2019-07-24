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
        <p>标题：</p><input type="text" class="form-control" placeholder="请输入标题">
      </div>
      <div class="item">
        <p>活动类型：</p>
        <selectInput :option="inputData.activityType.option" :dropDownList="inputData.activityType.list" tips="请选择活动类型"
          id="activityType" @option="changeOption">
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
      editor.customConfig.uploadImgShowBase64 = true
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
    margin-top: 10px;
    margin-left: 20px;
    font-size: 13px;
    min-width: 850px;
  }

  .form-control {
    width: 750px;
  }

  .item {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 20px;
    margin-left: 20px;
  }

  .item p {
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .file {
    height: 32px;
  }

  .checkbox {
    vertical-align: middle;
    margin: 0;
    height: 32px;
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
  .item1 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 20px;
    margin-left: 400px;
  }

</style>
