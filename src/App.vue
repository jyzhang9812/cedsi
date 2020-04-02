<template>
  <div id="app">
    <el-container>
      <el-header>
        <app-header height="56px"></app-header>
      </el-header>
      <router-view></router-view>
      <el-footer height="53px" style="padding:0;">
        <app-footer></app-footer>
      </el-footer>
    </el-container>
    <vue-element-loading :active="vueElementLoading" :is-full-screen="true" spinner="bar-fade-scale" color="#FF6700" />
  </div>
</template>

<script>
  import Header from './components/header/header.vue'
  import Footer from './components/footer/footer.vue'
  import VueElementLoading from 'vue-element-loading'
  import { mapState } from 'vuex'

  export default {
    name: 'app',
    components: {
      'app-header': Header,
      'app-footer': Footer,
      VueElementLoading
    },
    data() {
      return {}
    },
    created: function () {
      this.$store.dispatch('tryAutoLogin');
    },
    computed: {
      ...mapState({  //...对象扩展符
        vueElementLoading: 'vueElementLoading'
      })
    }
  }
</script>

<style>
  #app,
  .el-container,
  .el-aside,
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  .el-header,
  .el-footer {
    margin: 0;
    padding: 0;
  }

  .el-main {
    padding: 0;
  }
</style>