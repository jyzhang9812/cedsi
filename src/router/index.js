import Vue from 'vue'
import Router from 'vue-router'
<<<<<<< HEAD
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
=======
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
>>>>>>> cff2c3fd4c22898b2d77e99cb51bd590e620742c


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
<<<<<<< HEAD
        { path: '/dashboard/question',component: question}
      ]
    },
    { path:'/dashboard/map',component:map },   
=======
        { path: '/dashboard/question',component: Question}
      ]
    },
    { path:'/dashboard/scratch',component:Scratch },   
>>>>>>> cff2c3fd4c22898b2d77e99cb51bd590e620742c
  ]
})