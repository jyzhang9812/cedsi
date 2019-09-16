<template>
  <div class="modal fade" :id="id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">驳回作业</h4>
        </div>
        <div class="modal-body">
          <span>选择时间</span>
          <date-picker class="date" tips="请选择新的截止时间" :id="'turnDownWork' + id" @changeDate="changeDate"></date-picker>
          <textarea placeholder="给TA一点鼓励吧!" class="area" v-model="comment"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="submit">提交</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import DatePicker from "../utils/datePicker";

  export default {
    name: "turnDownWork",
    components: { DatePicker },
    props: { id: { type: String, default: 'Happy_New_Year' } },
    data() {
      return { deadline: '', comment: '' }
    },
    methods: {
      changeDate(date) { this.deadline = date },
      submit() {
        this.$emit('turnDownWorkResult', { stars: this.deadline, comment: this.comment });
        $('#' + this.id).modal('hide');
        this.deadline = '';
        this.comment = '';
      }
    }
  }

</script>

<style scoped>
  .area {
    margin-top: 15px;
    height: 100px;
    width: 80%;
    margin-left: 10%;
    border: 1px solid #409EFF;
    border-radius: 4px;
    padding-left: 15px;
    outline: none;
  }
</style>