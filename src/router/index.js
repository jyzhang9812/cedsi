import Vue from 'vue'
import Router from 'vue-router'

import sidebar from '../components/container/student/dashboard.vue'
import course from '../components/container/student/right/course/course.vue'
import homework from '../components/container/student/right/homework/homework.vue'
import myclass from '../components/container/student/right/class/class.vue'
import message from '../components/container/student/right/message/message.vue'
import question from '../components/container/student/right/question/question'
import presentation from '../components/container/student/right/presentation/presentation.vue'
import index from '../components/container/index/index.vue'
import SignupPage from '../components/container/auth/signup.vue'
import SigninPage from '../components/container/auth/signin.vue'
import ErrorPage from '../components/container/auth/errorPage.vue'
import coursemap from '../components/container/student/right/course/coursemap.vue'
// 以下是教师角色
import statistics from "../components/container/teacher/analyse/statistics";
import material from "../components/container/teacher/activity/material";
import topiccomment from "../components/container/teacher/activity/topiccomment";
import opuscomment from "../components/container/teacher/activity/opuscomment";
import quiz from "../components/container/teacher/activity/quiz";
import activity from "../components/container/teacher/activity/activity";
import videos from "../components/container/teacher/teach/videos";
import choiceness from "../components/container/teacher/teach/choiceness";
import remark from "../components/container/teacher/teach/remark";
import password from "../components/container/teacher/password/password";
import space from "../components/container/teacher/space/space";
import staging from "../components/container/teacher/staging/staging";
import asider from "../components/container/teacher/sidebar"
//以下是教务角色
import eduAdmin from "../components/container/eduAdmin/eduSidebar"
import eduActivity from "../components/container/eduAdmin/activity/activity"
import classManagement from "../components/container/eduAdmin/office/classManagement"
import stuManagement from "../components/container/eduAdmin/office/stuManagement"
import teaching from "../components/container/eduAdmin/teaching/teaching"
import eduStatistics from "../components/container/eduAdmin/statistics/statistics"
import eduStaging from "../components/container/eduAdmin/edustaging/edustaging"
import teacherManagement from "../components/container/eduAdmin/office/teacherManagement"

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: index },
    { path: '/signup', component: SignupPage },
    { path: '/signin', component: SigninPage },
    { path: '/404', component: ErrorPage },
    {
      path: '/dashboard', component: sidebar, children: [
        { path: '/dashboard/class', component: myclass },
        { path: '/dashboard/message', component: message },
        { path: '/dashboard/homework', component: homework },
        { path: '/dashboard/', component: course },
        { path: '/dashboard/presentation', component: presentation },
        { path: '/dashboard/question',component: question}
      ]
    },
    { path:'/dashboard/coursemap', name:'coursemap',component:coursemap },
    {
      path: '/console',
      component: asider,
      children: [
          { path: '/console/staging', component: staging },
          { path: '/console/space', component: space },
          { path: '/console/password', component: password},
          { path: '/console/homework', component: remark },
          { path: '/console/choiceness', component: choiceness },
          { path: '/console/video', component: videos },
          { path: '/console/activity', component: activity },
          { path: '/console/question', component: quiz },
          { path: '/console/opuscomment', component: opuscomment },
          { path: '/console/topiccomment', component: topiccomment },
          { path: '/console/material', component: material },
          { path: '/console/statistics', component: statistics }
      ]
    },
    {
      path:'/eduAdmin',
      component:eduAdmin,
      children:[
        { path:'/eduAdmin/',component:eduStaging},
        { path:'/eduAdmin/activity',component:eduActivity },
        { path:'/eduAdmin/classManagement',component:classManagement },
        { path:'/eduAdmin/stuManagement',component:stuManagement },
        { path:'/eduAdmin/teaching',component:teaching },
        { path:'/eduAdmin/eduStatistice',component:eduStatistics },
        { path:'/eduAdmin/teacherManagement',component:teacherManagement}
      ]
    }
  ]
})
