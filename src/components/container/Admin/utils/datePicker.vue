<template>
  <div id="datePicker">
    <img class="icon-prefix" :src="inputPrefixSrc" alt="">
    <label :for="id"></label>
    <input type="text" :id="id" :value="date" :placeholder='tips' class="inputbox">
    <img class="icon-suffix" :src="inputSuffixSrc" alt=""
         @click="clearBox" v-show="this.date !== ''">
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
        inputPrefixSrc: this.$store.state.url2+"datepicker/calendar.png",
        inputSuffixSrc: this.$store.state.url2+"datepicker/delete.png",
        time: ""
      }
    },
    methods: {
      clearBox() {
        this.$emit('changeDate', "", this.id);
      }
    },
    mounted() {
      laydate.render({
        elem: '#' + this.id,
        format: 'yyyy-MM-dd HH:mm',
        isInitValue: false,
        theme: "#409eff",
        done: (value) => {
          this.$emit('changeDate', value, this.id);
        }
      })
    }
  }
</script>

<style scoped>
  #datePicker{
    display: inline-block;
    border: 1px solid #409eff;
    width: 180px;
    height: 32px;
    border-radius: 5px;
    margin-left: 5px;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
  }

  #datePicker .outside:hover {
    border-color: #c0c4cc;
  }

  #datePicker .icon-prefix {
    display: inline-block;
    height: 18px;
    width: 18px;
    margin-left: 5px;
  }

  #datePicker .icon-suffix {
    display: inline-block;
    height: 18px;
    width: 18px;
    cursor: pointer;
  }

  #datePicker .inputbox {
    text-align: center;
    height: 30px;
    width: 120px;
    border: none;
    border-radius: 5px;
    font-size: 12px;
  }

  #datePicker .inputbox:focus {
    outline: none;
  }

  #datePicker .inputbox::placeholder {
    font-size: 12px;
  }
</style>
