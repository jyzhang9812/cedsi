import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/container/index/index.vue'

//Webpack懒加载
const sidebar = resolve =>{
  require.ensure(['../components/container/student/dashboard.vue'],()=>{
    resolve(require('../components/container/student/dashboard.vue'));
  });
};
const course = resolve =>{
  require.ensure(['../components/container/student/right/course/course.vue'],()=>{
    resolve(require('../components/container/student/right/course/course.vue'));
  });
};
const homework = resolve =>{
  require.ensure(['../components/container/student/right/homework/homework.vue'],()=>{
    resolve(require('../components/container/student/right/homework/homework.vue'));
  });
};
const myclass = resolve =>{
  require.ensure(['../components/container/student/right/class/class.vue'],()=>{
    resolve(require('../components/container/student/right/class/class.vue'));
  });
};
const message = resolve =>{
  require.ensure(['../components/container/student/right/message/message.vue'],()=>{
    resolve(require('../components/container/student/right/message/message.vue'));
  });
};
const question = resolve =>{
  require.ensure(['../components/container/student/right/question/question.vue'],()=>{
    resolve(require('../components/container/student/right/question/question.vue'));
  });
};
const presentation = resolve =>{
  require.ensure(['../components/container/student/right/presentation/presentation.vue'],()=>{
    resolve(require('../components/container/student/right/presentation/presentation.vue'));
  });
};
const SignupPage = resolve =>{
  require.ensure(['../components/container/auth/signup.vue'],()=>{
    resolve(require('../components/container/auth/signup.vue'));
  });
};
const SigninPage = resolve =>{
  require.ensure(['../components/container/auth/signin.vue'],()=>{
    resolve(require('../components/container/auth/signin.vue'));
  });
};
const coursemap = resolve =>{
  require.ensure(['../components/container/student/right/course/coursemap.vue'],()=>{
    resolve(require('../components/container/student/right/course/coursemap.vue'));
  });
};
//import ErrorPage from '../components/container/auth/errorPage.vue'
const ErrorPage = resolve =>{
  require.ensure(['../components/container/auth/errorPage.vue'],()=>{
    resolve(require('../components/container/auth/errorPage.vue'));
  });
};


// 以下是教师角色
const statistics = resolve =>{
  require.ensure(['../components/container/teacher/analyse/statistics.vue'],()=>{
    resolve(require('../components/container/teacher/analyse/statistics.vue'));
  });
};
const material = resolve =>{
  require.ensure(['../components/container/teacher/activity/material.vue'],()=>{
    resolve(require('../components/container/teacher/activity/material.vue'));
  });
};
const topiccomment = resolve =>{
  require.ensure(['../components/container/teacher/activity/topiccomment.vue'],()=>{
    resolve(require('../components/container/teacher/activity/topiccomment.vue'));
  });
};
const opuscomment = resolve =>{
  require.ensure(['../components/container/teacher/activity/opuscomment.vue'],()=>{
    resolve(require('../components/container/teacher/activity/opuscomment.vue'));
  });
};
const quiz = resolve =>{
  require.ensure(['../components/container/teacher/activity/quiz.vue'],()=>{
    resolve(require('../components/container/teacher/activity/quiz.vue'));
  });
};
const activity = resolve =>{
  require.ensure(['../components/container/teacher/activity/activity.vue'],()=>{
    resolve(require('../components/container/teacher/activity/activity.vue'));
  });
};
const videos = resolve =>{
  require.ensure(['../components/container/teacher/teach/videos.vue'],()=>{
    resolve(require('../components/container/teacher/teach/videos.vue'));
  });
};
const choiceness = resolve =>{
  require.ensure(['../components/container/teacher/teach/choiceness.vue'],()=>{
    resolve(require('../components/container/teacher/teach/choiceness.vue'));
  });
};
const remark = resolve =>{
  require.ensure(['../components/container/teacher/teach/remark.vue'],()=>{
    resolve(require('../components/container/teacher/teach/remark.vue'));
  });
};
const password = resolve =>{
  require.ensure(['../components/container/teacher/password/password.vue'],()=>{
    resolve(require('../components/container/teacher/password/password.vue'));
  });
};
const space = resolve =>{
  require.ensure(['../components/container/teacher/space/space.vue'],()=>{
    resolve(require('../components/container/teacher/space/space.vue'));
  });
};
const staging = resolve =>{
  require.ensure(['../components/container/teacher/staging/staging.vue'],()=>{
    resolve(require('../components/container/teacher/staging/staging.vue'));
  });
};
const asider = resolve =>{
  require.ensure(['../components/container/teacher/sidebar.vue'],()=>{
    resolve(require('../components/container/teacher/sidebar.vue'));
  });
};
//以下是教务角色
const eduAdmin = resolve =>{
  require.ensure(['../components/container/eduAdmin/eduSidebar.vue'],()=>{
    resolve(require('../components/container/eduAdmin/eduSidebar.vue'));
  });
};
const eduActivity = resolve =>{
  require.ensure(['../components/container/eduAdmin/activity/activity.vue'],()=>{
    resolve(require('../components/container/eduAdmin/activity/activity.vue'));
  });
};
const classManagement = resolve =>{
  require.ensure(['../components/container/eduAdmin/office/classManagement.vue'],()=>{
    resolve(require('../components/container/eduAdmin/office/classManagement.vue'));
  });
};
const stuManagement = resolve =>{
  require.ensure(['../components/container/eduAdmin/office/stuManagement.vue'],()=>{
    resolve(require('../components/container/eduAdmin/office/stuManagement.vue'));
  });
};
const teaching = resolve =>{
  require.ensure(['../components/container/eduAdmin/teaching/teaching.vue'],()=>{
    resolve(require('../components/container/eduAdmin/teaching/teaching.vue'));
  });
};
const eduStatistics = resolve =>{
  require.ensure(['../components/container/eduAdmin/statistics/statistics.vue'],()=>{
    resolve(require('../components/container/eduAdmin/statistics/statistics.vue'));
  });
};
const eduStaging = resolve =>{
  require.ensure(['../components/container/eduAdmin/edustaging/edustaging.vue'],()=>{
    resolve(require('../components/container/eduAdmin/edustaging/edustaging.vue'));
  });
};
const teacherManagement = resolve =>{
  require.ensure(['../components/container/eduAdmin/office/teacherManagement.vue'],()=>{
    resolve(require('../components/container/eduAdmin/office/teacherManagement.vue'));
  });
};
import { resolve } from 'url';
//以下是超级管理员角色
const superAdmin = resolve =>{
  require.ensure(['../components/container/superAdmin/superAdminSidebar.vue'],()=>{
    resolve(require('../components/container/superAdmin/superAdminSidebar.vue'));
  });
};
const adminManagement = resolve =>{
  require.ensure(['../components/container/superAdmin/adminManagement/adminManagement.vue'],()=>{
    resolve(require('../components/container/superAdmin/adminManagement/adminManagement.vue'));
  });
};
//以下是管理员角色
const Admin = resolve =>{
  require.ensure(['../components/container/Admin/adminSidebar.vue'],()=>{
    resolve(require('../components/container/Admin/adminSidebar.vue'));
  });
};
const eduAdminManagement = resolve =>{
  require.ensure(['../components/container/Admin/eduAdminManagement/eduAdminManagement.vue'],()=>{
    resolve(require('../components/container/Admin/eduAdminManagement/eduAdminManagement.vue'));
  });
};
const videoManagement = resolve =>{
  require.ensure(['../components/container/Admin/videoManagement/videoManagement.vue'],()=>{
    resolve(require('../components/container/Admin/videoManagement/videoManagement.vue'));
  });
};

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
    },
    {
      path:'/superAdmin',
      component:superAdmin,
      children:[
        { path:'/superAdmin/',component:adminManagement},
      ]
    },
    {
      path:'/Admin',
      component:Admin,
      children:[
        { path:'/Admin/',component:eduAdminManagement},
        { path:'/Admin/videoManagement',component:videoManagement},
      ]
    }
  ]
})
