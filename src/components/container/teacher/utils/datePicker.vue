<template>
  <div class="outside">
    <img class="icon-prefix" :src="inputPrefixSrc" alt="">
    <label>
      <input type="text" :id="id" v-model="time" :placeholder='tips' class="inputbox">
    </label>
    <img class="icon-suffix" :src="inputSuffixSrc" alt="" @click="clearbox" v-show="this.time !== ''">
  </div>
</template>

<script>
  export default {
    name: 'laydate',
    props: {
      tips: String,
      id: String,
      date: String
    },
    data() {
      return {
        time: this.date,
        inputPrefixSrc: "../../../static/images/datepicker/calendar.png",
        inputSuffixSrc: "../../../static/images/datepicker/delete.png"
      }
    },
    methods: {
      clearbox(){
        this.time = "";
      }
    },
    mounted() {
      laydate.render({
        elem: '#' + this.id,
        format: 'yyyy-MM-dd HH:mm',
        isInitValue: false,
        theme: "#409eff",
        done: (value) => {
          this.time = value
        }
      })
    }
  }
</script>

<style scoped>
  .outside {
    display: inline-block;
    border: 1px solid #409eff;
    width: 180px;
    height: 32px;
  }

  .icon-prefix {
    display: inline;
    height: 18px;
    width: 18px;
    margin-left: 5px;
  }

  .icon-suffix {
    display: inline;
    height: 18px;
    width: 18px;
    cursor: pointer;
  }

  .inputbox {
    text-align: center;
    height: 30px;
    width: 120px;
    border: none;
    font-size: 12px;
  }

  .inputbox:focus {
    outline: none;
  }

  .inputbox::placeholder {
    font-size: 12px;
  }
</style>
