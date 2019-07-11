import Vue from 'vue'
import Router from 'vue-router'
import sidebar from '../components/dashboard/student.vue'
import dashboard from '../components/right/course/course.vue'
import homework from '../components/right/homework/homework.vue'
import myclass from '../components/right/class/myclass.vue'
import message from '../components/right/message/message.vue'
import presentation from '../components/right/presentation/presentation.vue'
import HomePage from '../components/index/index.vue'
import SignupPage from '../components/auth/signup.vue'
import SigninPage from '../components/auth/signin.vue'
import Scratch from '../components/right/scratch/Scratch.vue'
import Question from '../components/right/message/Question'


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
        { path: '/dashboard/question',component: Question}
      ]
    },
    { path:'/dashboard/scratch',component:Scratch },   
  ]
})