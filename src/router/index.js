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
// 以下是教师角色
import statistics from "../components/container/teacher/analyse/statistics";
import material from "../components/container/teacher/activity/material";
import topiccomment from "../components/container/teacher/activity/topiccomment";
import opuscomment from "../components/container/teacher/activity/opuscomment";
import quiz from "../components/container/teacher/activity/quiz";
import activity from "../components/container/teacher/activity/activity";
import video from "../components/container/teacher/teach/video";
import choiceness from "../components/container/teacher/teach/choiceness";
import remark from "../components/container/teacher/teach/remark";
import password from "../components/container/teacher/password/password";
import space from "../components/container/teacher/space/space";
import staging from "../components/container/teacher/staging/staging";
import asider from "../components/container/teacher/sidebar"

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: HomePage },
        { path: '/signup', component: SignupPage },
        { path: '/signin', component: SigninPage },
        {
            path: '/dashboard',
            component: sidebar,
            children: [
                { path: '/dashboard/class', component: myclass },
                { path: '/dashboard/message', component: message },
                { path: '/dashboard/homework', component: homework },
                { path: '/dashboard/', component: dashboard },
                { path: '/dashboard/presentation', component: presentation },
                { path: '/dashboard/question', component: question }
            ]
        },
        { path: '/dashboard/map', component: map },
        {
            path: '/console',
            component: asider,
            children: [
                { path: '/console/staging', component: staging },
                { path: '/console/space', component: space },
                { path: '/console/password', component: password},
                { path: '/console/homework', component: remark },
                { path: '/console/choiceness', component: choiceness },
                { path: '/console/video', component: video },
                { path: '/console/activity', component: activity },
                { path: '/console/question', component: quiz },
                { path: '/console/opuscomment', component: opuscomment },
                { path: '/console/topiccomment', component: topiccomment },
                { path: '/console/material', component: material },
                { path: '/console/statistics', component: statistics }
            ]
        }
    ]
})
