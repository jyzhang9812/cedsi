<template>
  <div class="pag">
    <ul class="pagination modal-2">
      <li @click="goPrePage"><a>&laquo;</a></li>
      <li v-for="i, index in showPageBtn" :class="{'active': i === currentPage, 'pointer': i, 'hover': i && i !== currentPage}" 
        @click="pageOffset(i)">
        <a v-if="i">{{i}}</a>
        <a v-else>···</a>
      </li>
      <li @click="goNextPage"><a>&raquo;</a></li>
    </ul>
  </div>
</template>


<script>
  export default {
    name: "pagination",
    props: {
      num: Number,
      limit: Number,
      offset: Number
    },
    computed: {

      prePage() {
        return this.offset !== 0 && this.num;
      },

      nextPage() {
        return (this.offset + this.limit < this.num) && this.num;
      },

      totalPage() {
        return Math.ceil(this.num / this.limit);
      },

      currentPage() {
        return Math.ceil(this.offset / this.limit) + 1;
      },

      showPageBtn() {
        const pageNum = this.totalPage
        const index = this.currentPage
        if (pageNum <= 5) return [...new Array(5)].map((v, i) => i + 1)
        if (index <= 2) return [1, 2, 3, 0, pageNum]
        if (index >= pageNum - 1) return [1, 0, pageNum - 2, pageNum - 1, pageNum]
        if (index === 3) return [1, 2, 3, 4, 0, pageNum]
        if (index === pageNum - 2) return [1, 0, pageNum - 3, pageNum - 2, pageNum - 1, pageNum]
        return [1, 0, index - 1, index, index + 1, 0, pageNum]
      }
    },

    methods: {
      pageOffset(i) {
        if (i === 0 || i === this.currentPage) return
        this.offset = (i - 1) * this.limit;
        this.$emit('getNew', this.offset);
      },

      goPrePage() {
        if (this.prePage) {
          this.offset -= this.limit;
          this.$emit('getNew', this.offset);
        } else {
          alert("第一页了哦，亲！");
        }
      },
      goNextPage() {
        if (this.nextPage) {
          this.offset += this.limit;
          this.$emit('getNew', this.offset);
        } else {
          alert("最后一页了呢！");
        }
      }
    }
  }

</script>

<style scoped>
  .pag {
    font-size: 13px;
  }

  .pagination {
    list-style: none;
    display: inline-block;
    padding: 0;
    margin-top: 10px;
  }

  .pagination li {
    display: inline;
    text-align: center;
  }

  .pagination a {
    float: left;
    display: block;
    font-size: 13px;
    text-decoration: none;
    padding: 5px 12px;
    color: #c2c4cc;
    margin-left: -1px;
    border: 1px solid transparent;
    line-height: 1.5;
  }

  .pagination a.active {
    cursor: default;
  }

  .pagination a:active {
    outline: none;
  }

  .modal-2 li:first-child a {
    -moz-border-radius: 50px 0 0 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px 0 0 50px;
  }

  .modal-2 li:last-child a {
    -moz-border-radius: 0 50px 50px 0;
    -webkit-border-radius: 0;
    border-radius: 0 50px 50px 0;
  }

  .modal-2 a {
    border-color: #f4f4f5;
    color: #c2c4cc;
    background: #f4f4f5;
  }

  .modal-2 a:hover {
    color: #FFF;
    background-color: #409EFF;
  }

  .modal-2 a.active,
  .modal-2 a:active {
    border-color: #409EFF;
    background: #409EFF;
    color: #fff;
  }

</style>
