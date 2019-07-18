<template>
  <div class="subContainer">
    <div>
      <label>
        <input type="text" placeholder="请输入姓名、手机号" class="textBox">
        <date-picker tips="选择开始时间" id="datePicker_start" :date="startDate"></date-picker>
        <date-picker tips="选择结束时间" id="datePicker_end" :date="endDate"></date-picker>
      </label>
    </div>
    <div>
      <label>
        <input type="text" placeholder="请选择学校" class="textBox">
        <input type="text" placeholder="请选择班级名称" class="textBox">
        <input type="text" placeholder="请选择课程" class="textBox">
        <input type="text" placeholder="请选择课次" class="textBox">
      </label>
      <span @click="changeChoices">
        <span :class="{'choose': chooseAll}" class="choose-icon"></span>
        <span>全选</span>
      </span>
    </div>
    <div>
        点评状态
        <span class="has-comment">已点评</span>
        <span class="no-comment">未点评</span>
    </div>
    <div>
      <button>搜索</button>
      <button>清空筛选</button>
    </div>
  </div>
</template>

<script>
  import DatePicker from "../utils/datePicker"

  export default {
    name: "remark",
    data() {
      return {
        startDate: "",
        endDate: "",
        chooseAll: true,
        commentStatus: true
      }
    },
    methods: {
      changeChoices() {
        this.chooseAll = !this.chooseAll;
      }
    },
    components: {DatePicker}
  }
</script>

<style scoped>

  .textBox {
    width: 180px;
    height: 32px;
    font-size: 12px;
    padding-left: 15px;
    border: 1px solid #409eff;
  }

  .choose-icon {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 1px solid #409eff;
  }

  /* .choose 此项真实有效， 可能编辑器不完全识别vue语法*/
  .choose {
    background-image: url("../../../../../static/images/teach/choose.png");
    background-repeat: no-repeat;
    background-position: -1px -2px;
  }

  .has-comment {
    width: 68px;
    height: 32px;
    display: inline-block;
    border-radius: 4px 0 0 4px;
    border: 1px solid #dcdfe6;
  }

  .no-comment {
    width: 68px;
    height: 32px;
    display: inline-block;
    border-radius: 0 4px 4px 0;
    border: 1px solid #dcdfe6;
  }
</style>
