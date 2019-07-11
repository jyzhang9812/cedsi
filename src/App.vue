<template>
  <div id="app">
    <app-header />
    <router-view :style="screenHeight"></router-view>
  </div>
</template>

<script>
  import Header from './components/header/header.vue'
  export default {
    name: 'app',
    components: {
      'app-header': Header
    },
    data:{
      height:0,
      width:0,
    },
    created:function(){
      this.height=document.documentElement.clientHeight,
      this.screenHeight='min-height:'+(this.height-56)+'px;'
    }
  }
</script>

<style>
  body, html {
    margin: 0;
    /* font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; */
    font-family:'TianZhen19e6a6ae661ff1';
  }
</style>