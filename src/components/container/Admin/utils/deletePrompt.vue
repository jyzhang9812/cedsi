<template>
  <!-- Modal -->
  <div id="deletePrompt" :id="id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <span class="modal-title">提示</span>
        </div>
        <div class="modal-body">
          <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          <span>此操作将永久删除该文件, 是否继续?</span>
        </div>
        <div class="modal-footer">
          <button type="button" class="button-footer button-cancel" data-dismiss="modal">取消</button>
          <button type="button" :id="id + 'btn'" class="button-footer button-confirm">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "deletePrompt",
    props: {
      id: String,
      workId: {
        type: String,
        default: "hello world"
      }
    },
    mounted() {
      $('#' + this.id + 'btn').on('click', () => {
        $('#' + this.id).modal('hide');
        this.$emit('deleteWork', this.workId);
      });
    }
  }
</script>

<style scoped>
  #datePicker .button-footer {
    width: 56px;
    height: 32px;
    border-radius: 5px;
  }

  #datePicker .button-confirm {
    background-color: #409EFF;
    color: #FFF;
    border: 1px solid #409EFF;
  }

  #datePicker .button-confirm:focus,
  #datePicker .button-confirm:hover {
    outline: none;
    background-color: #66B1FF;
  }

  #datePicker .button-cancel {
    background-color: #FFF;
    color: #606266;
    border: 1px solid #DCDFE6;
    margin-right: 10px;
  }

  #datePicker .button-cancel:focus,
  #datePicker .button-cancel:hover {
    outline: none;
    color: #409eff;
    background-color: #ecf5ff;
  }

  #datePicker .modal-body {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #datePicker .glyphicon,
  #datePicker .glyphicon-exclamation-sign {
    font-size: 25px;
    color: #E6A23C;
    margin-right: 10px;
  }
</style>
