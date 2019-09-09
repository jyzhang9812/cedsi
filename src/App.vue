<template>
  <div id="app":style="appheight">
    <app-header/>
    <vue-element-loading :active="vueElementLoading" :is-full-screen="true"
    spinner="bar-fade-scale" color="#FF6700" />
    <router-view :style="screenHeight"></router-view>
    <app-footer/>
  </div>
</template>

<script>
  import Header from './components/header/header.vue'
  import Footer from './components/footer/footer.vue'
  import VueElementLoading from'vue-element-loading'
  import { mapState } from 'vuex'

  export default {
    name: 'app',
    components: {
      'app-header': Header,
      'app-footer': Footer,
      VueElementLoading
    },
    data() {
      return {
        height: 0,
        width: 0,
        appheight:0,
      }
    },
    created: function () {
      this.height = document.documentElement.clientHeight,
      console.log(this.height)
      this.appheight = 'min-height:' + this.height + 'px;';
      this.screenHeight = 'min-height:' + (this.height - 56) + 'px;';
      this.$store.dispatch('tryAutoLogin');
    },
    computed:{
    ...mapState({  //...对象扩展符
      vueElementLoading:'vueElementLoading'
    })
  }
}
</script>

<style>
  body, html, #app {
    margin: 0;
    /* font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; */
    font-family: 'TianZhen19e6a6ae661ff1';
  }
</style>
