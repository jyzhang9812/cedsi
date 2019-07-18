<template>
    <div class="panels">
      <table class="table table-hover" rules=rows frame=below>
        <thead>
        <tr>
          <th v-for="title in tableTitle" class="title">{{title}}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td></td>
          <td>1</td>
          <td class="blue">test1</td>
          <td>2019-5-2 19:30</td>
          <td>编程测试</td>
          <td>布置作业</td>
          <td>赛迪思</td>
          <td>1/6</td>
          <td>
            <div class="switch-box is-info">
              <input id="info" class="switch-box-input" type="checkbox" checked/>
              <label for="info" class="switch-box-slider"></label>
              <label for="info" class="switch-box-label"></label>
            </div>
          </td>
          <td>正常</td>
          <td><span class="blue">编辑</span>&nbsp;&nbsp;<span class="red">删除</span></td>
        </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
  export default {
    name: "choiceness",
    data() {
      return {
        tableTitle: [
          "序号",
          "作者姓名",
          "手机号码",
          "提交时间",
          "作品",
          "学校",
          "班级",
          "课程名称",
          "课程等级",
          "状态",
          "操作"
        ]
      }
    }
  }
</script>

<style scoped>

  .blue {
    color: #409EFF;
  }

  .red {
    color: #FF6947;
  }

  .panels {
    margin-left: 10px;
    font-size: 12px;
    color: #606266;
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
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    content: '';
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  .switch-box .switch-box-input {
    display: none;
  }

  .switch-box .switch-box-input ~ .switch-box-label {
    margin-left: 8px;
  }

  .switch-box .switch-box-input:checked ~ .switch-box-slider:after {
    left: 16px;
  }

  .switch-box.is-info .switch-box-input:checked:not(:disabled) ~ .switch-box-slider {
    background: #5faee3;
  }

  .switch-box.is-info .switch-box-input:checked:not(:disabled) ~ .switch-box-slider:after {
    background: #3498db;
  }

</style>
