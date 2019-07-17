import Vue from 'vue'
import Router from 'vue-router'
import sidebar from '../components/container/student/dashboard.vue'
import dashboard from '../components/container/student/right/course/course.vue'
import homework from '../components/container/student/right/homework/homework.vue'
import myclass from '../components/container/student/right/class/class.vue'
import message from '../components/container/student/right/message/message.vue'
import question from '../components/container/student/right/question/question'
import presentation from '../components/container/student/right/presentation/presentation.vue'
import HomePage from '../components/container/index/index.vue'
import SignupPage from '../components/container/auth/signup.vue'
import SigninPage from '../components/container/auth/signin.vue'
import map from '../components/container/student/right/course/map.vue'


Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: HomePage },
    { path: '/signup', component: SignupPage },
    { path: '/signin', component: SigninPage },
    {
      path: '/dashboard', component: sidebar, children: [
        { path: '/dashboard/class', component: myclass },
        { path: '/dashboard/message', component: message },
        { path: '/dashboard/homework', component: homework },
        { path: '/dashboard/', component: dashboard },
        { path: '/dashboard/presentation', component: presentation },
        { path: '/dashboard/question',component: question}
      ]
    },
    { path:'/dashboard/map',component:map },   
  ]
})