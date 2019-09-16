<template>
  <div class="modal fade" :id="id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
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
          <span>{{promptWords}}</span>
        </div>
        <div class="modal-footer">
          <button type="button" class="button-footer button-cancel" data-dismiss="modal">取消</button>
          <button type="button" class="button-footer button-confirm" @click="submit">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "deletePrompt",
    props: {
      id: { type: String, default: "hello vue" },
      workId: { type: String, default: "hello world" },
      promptWords: { type: String, default: "此操作将永久删除该文件, 是否继续?" }
    },
    methods: {
      submit() { this.$emit('deleteWork'); $('#' + this.id).modal('hide'); }
    }
  }
</script>

<style scoped>
  .button-footer {
    width: 56px;
    height: 32px;
    border-radius: 5px;
  }

  .button-confirm {
    background-color: #409EFF;
    color: #FFF;
    border: 1px solid #409EFF;
  }

  .button-confirm:focus,
  .button-confirm:hover {
    outline: none;
    background-color: #66B1FF;
  }

  .button-cancel {
    background-color: #FFF;
    color: #606266;
    border: 1px solid #DCDFE6;
    margin-right: 10px;
  }

  .button-cancel:focus,
  .button-cancel:hover {
    outline: none;
    color: #409eff;
    background-color: #ecf5ff;
  }

  .modal-body {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .glyphicon,
  .glyphicon-exclamation-sign {
    font-size: 25px;
    color: #E6A23C;
    margin-right: 10px;
  }
</style>