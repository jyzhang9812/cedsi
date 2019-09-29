<template>
  <div class="modal fade" :id="id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">作业点评</h4>
        </div>
        <div class="modal-body">
          <star-rating :star-size="50" :increment="0.5" class="star" @rating-selected="setRaing"></star-rating>
          <textarea placeholder="给TA一点鼓励吧!" class="area" v-model="comment"></textarea>
          <div class="star">
            <input type="checkbox" v-model="selectedWork">
            <span>设为精选作品</span>
          </div>
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
  import StarRating from 'vue-star-rating'

  export default {
    name: 'inputModal',
    props: { id: { type: String, default: 'helloWorld' } },
    data() { return { stars: 0, comment: '', selectedWork: false } },
    methods: {
      setRaing(stars) { this.stars = stars },
      submit() {
        this.$emit('remarkResult', { stars: this.stars, comment: this.comment, selectedWork: this.selectedWork });
        $('#' + this.id).modal('hide');
        this.stars = 0;
        this.comment = '';
        this.selectedWork = false;
      }
    },
    components: { StarRating }
  }
</script>

<style scoped>
  .area {
    margin: 15px 0 10px 10%;
    height: 100px;
    width: 80%;
    border: 1px solid #409EFF;
    border-radius: 4px;
    padding-left: 15px;
    outline: none;
  }

  .modal-dialog {
    width: 500px;
  }

  .star {
    margin-left: 10%;
  }
</style>