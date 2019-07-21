<template>
  <div class="dropdown">
    <div class="outside" :id="id"
         data-toggle="dropdown" aria-haspopup="true"
         aria-expanded="true" @click="startRotate">
      <label :for="id + 'text'"></label>
      <input type="text" class="inputBox" :placeholder="tips"
             :value="option"
             :id="id + 'text'">
      <img :src="menuIconSrc" alt=""
           :class="[rotate? 'afterRotate':'beforeRotate']"
           class="menu-icon">
    </div>
    <ul class="dropdown-menu" :aria-labelledby="id">
      <li v-for="item in dropDownList">
        <a href="#" @click="reportOption(item)">{{item}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "selectInput",
    props:{
      option: String,
      tips: String,
      dropDownList: Array,
      id: String
    },
    data() {
      return {
        menuIconSrc: "../../../../../static/images/selectInput/menudown.png",
        rotate: false
      }
    },
    methods: {
      startRotate() {
        this.rotate = !this.rotate;
      },
      reportOption(item) {
        this.startRotate();
        this.$emit('option', item, this.id)
      }
    }
  }
</script>

<style scoped>

  /* 此项真实有效，可能 IDE 不能识别VUE的动态 class 绑定*/
  .beforeRotate {
    transition: all .3s;
  }

  /* 此项真实有效，可能 IDE 不能识别VUE的动态 class 绑定*/
  .afterRotate {
    transform: rotate(-180deg);
    transition: all .3s;
  }

  .outside {
    display: inline-block;
    width: 180px;
    height: 32px;
    border: 1px solid #409eff;
    cursor: pointer;
    border-radius: 5px;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
  }

  .outside:hover {
    border-color: #c0c4cc;
  }

  .inputBox {
    padding-left: 15px;
    padding-right: 30px;
    font-size: 12px;
    border: none;
    height: 30px;
    width: 150px;
    cursor: pointer;
  }

  .inputBox:focus {
    outline: none;
  }

  .menu-icon {
    display: inline;
    width: 14px;
    height: 14px;
  }

</style>
