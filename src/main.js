// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import {store} from './store';
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.root = 'https://dk2nj7uhfi.execute-api.us-east-2.amazonaws.com/prod/studentinfo';

Vue.prototype.$video = Video

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
