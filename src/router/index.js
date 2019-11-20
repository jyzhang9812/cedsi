import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/container/index/index.vue'


// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

//Webpack懒加载
const sidebar = resolve => {
  require.ensure(['../components/container/student/dashboard.vue'], () => {
    resolve(require('../components/container/student/dashboard.vue'));
  });
};
const showPage = resolve => {
  require.ensure(['../components/container/student/right/showPage/showPage.vue'], () => {
    resolve(require('../components/container/student/right/showPage/showPage.vue'));
  });
};
const activitydetailCard = resolve => {
  require.ensure(['../components/container/student/right/showPage/activitydetailCard.vue'], () => {
    resolve(require('../components/container/student/right/showPage/activitydetailCard.vue'));
  });
};
const course = resolve => {
  require.ensure(['../components/container/student/right/course/course.vue'], () => {
    resolve(require('../components/container/student/right/course/course.vue'));
  });
};
const community = resolve => {
  require.ensure(['../components/container/student/right/community/community.vue'], () => {
    resolve(require('../components/container/student/right/community/community.vue'));
  });
};
const homework = resolve => {
  require.ensure(['../components/container/student/right/homework/homework.vue'], () => {
    resolve(require('../components/container/student/right/homework/homework.vue'));
  });
};
const create = resolve => {
  require.ensure(['../components/container/student/right/create/create.vue'], () => {
    resolve(require('../components/container/student/right/create/create.vue'));
  });
};
const myclass = resolve => {
  require.ensure(['../components/container/student/right/class/class.vue'], () => {
    resolve(require('../components/container/student/right/class/class.vue'));
  });
};
const message = resolve => {
  require.ensure(['../components/container/student/right/message/message.vue'], () => {
    resolve(require('../components/container/student/right/message/message.vue'));
  });
};
const question = resolve => {
  require.ensure(['../components/container/student/right/question/question.vue'], () => {
    resolve(require('../components/container/student/right/question/question.vue'));
  });
};
const presentation = resolve => {
  require.ensure(['../components/container/student/right/presentation/presentation.vue'], () => {
    resolve(require('../components/container/student/right/presentation/presentation.vue'));
  });
};
const SignupPage = resolve => {
  require.ensure(['../components/container/auth/signup.vue'], () => {
    resolve(require('../components/container/auth/signup.vue'));
  });
};
const SigninPage = resolve => {
  require.ensure(['../components/container/auth/signin.vue'], () => {
    resolve(require('../components/container/auth/signin.vue'));
  });
};
const coursemap = resolve => {
  require.ensure(['../components/container/student/right/course/coursemap.vue'], () => {
    resolve(require('../components/container/student/right/course/coursemap.vue'));
  });
};
const addHomework = resolve => {
  require.ensure(['../components/container/student/right/course/addHomework.vue'], () => {
    resolve(require('../components/container/student/right/course/addHomework.vue'));
  });
};
const payment = resolve => {
  require.ensure(['../components/container/student/payment.vue'], () => {
    resolve(require('../components/container/student/payment.vue'));
  });
};
const payOK = resolve => {
  require.ensure(['../components/container/student/payOK.vue'], () => {
    resolve(require('../components/container/student/payOK.vue'));
  });
};
//import ErrorPage from '../components/container/auth/errorPage.vue'
const ErrorPage = resolve => {
  require.ensure(['../components/container/auth/errorPage.vue'], () => {
    resolve(require('../components/container/auth/errorPage.vue'));
  });
};


// 以下是教师角色
const statistics = resolve => {
  require.ensure(['../components/container/teacher/analyse/statistics.vue'], () => {
    resolve(require('../components/container/teacher/analyse/statistics.vue'));
  });
};
const material = resolve => {
  require.ensure(['../components/container/teacher/activity/material.vue'], () => {
    resolve(require('../components/container/teacher/activity/material.vue'));
  });
};
const topiccomment = resolve => {
  require.ensure(['../components/container/teacher/activity/topiccomment.vue'], () => {
    resolve(require('../components/container/teacher/activity/topiccomment.vue'));
  });
};
const opuscomment = resolve => {
  require.ensure(['../components/container/teacher/activity/opuscomment.vue'], () => {
    resolve(require('../components/container/teacher/activity/opuscomment.vue'));
  });
};
const quiz = resolve => {
  require.ensure(['../components/container/teacher/activity/quiz.vue'], () => {
    resolve(require('../components/container/teacher/activity/quiz.vue'));
  });
};
const activity = resolve => {
  require.ensure(['../components/container/teacher/activity/activity.vue'], () => {
    resolve(require('../components/container/teacher/activity/activity.vue'));
  });
};
const videos = resolve => {
  require.ensure(['../components/container/teacher/teach/videos.vue'], () => {
    resolve(require('../components/container/teacher/teach/videos.vue'));
  });
};
const choiceness = resolve => {
  require.ensure(['../components/container/teacher/teach/choiceness.vue'], () => {
    resolve(require('../components/container/teacher/teach/choiceness.vue'));
  });
};
const remark = resolve => {
  require.ensure(['../components/container/teacher/teach/remark.vue'], () => {
    resolve(require('../components/container/teacher/teach/remark.vue'));
  });
};
const password = resolve => {
  require.ensure(['../components/container/teacher/password/password.vue'], () => {
    resolve(require('../components/container/teacher/password/password.vue'));
  });
};
const space = resolve => {
  require.ensure(['../components/container/teacher/space/space.vue'], () => {
    resolve(require('../components/container/teacher/space/space.vue'));
  });
};
const asider = resolve => {
  require.ensure(['../components/container/teacher/sidebar.vue'], () => {
    resolve(require('../components/container/teacher/sidebar.vue'));
  });
};
const tMessage = resolve => {
  require.ensure(['../components/container/teacher/message/tMessage.vue'], () => {
    resolve(require('../components/container/teacher/message/tMessage.vue'));
  });
};
const postJob = resolve => {
  require.ensure(['../components/container/teacher/teach/postJob.vue'], () => {
    resolve(require('../components/container/teacher/teach/postJob.vue'));
  });
}
const coursePlan = resolve => {
  require.ensure(['../components/container/teacher/teach/coursePlan.vue'], () => {
    resolve(require('../components/container/teacher/teach/coursePlan.vue'));
  });
}
const teacherUserCenter = resolve => {
  require.ensure(['../components/container/teacher/teacherUserCenter/teacherUserCenter.vue'], () => {
    resolve(require('../components/container/teacher/teacherUserCenter/teacherUserCenter.vue'));
  });
};
const teachingClass = resolve => {
  require.ensure(['../components/container/teacher/teacherUserCenter/teachingClass.vue'], () => {
    resolve(require('../components/container/teacher/teacherUserCenter/teachingClass.vue'));
  });
}
//以下是教务角色
const eduAdmin = resolve => {
  require.ensure(['../components/container/eduAdmin/eduSidebar.vue'], () => {
    resolve(require('../components/container/eduAdmin/eduSidebar.vue'));
  });
};
const eduActivity = resolve => {
  require.ensure(['../components/container/eduAdmin/activity/activity.vue'], () => {
    resolve(require('../components/container/eduAdmin/activity/activity.vue'));
  });
};
const classManagement = resolve => {
  require.ensure(['../components/container/eduAdmin/office/classManagement.vue'], () => {
    resolve(require('../components/container/eduAdmin/office/classManagement.vue'));
  });
};
const stuManagement = resolve => {
  require.ensure(['../components/container/eduAdmin/office/stuManagement.vue'], () => {
    resolve(require('../components/container/eduAdmin/office/stuManagement.vue'));
  });
};
const addStudent = resolve => {
  require.ensure(['../components/container/eduAdmin/office/addStudent.vue'], () => {
    resolve(require('../components/container/eduAdmin/office/addStudent.vue'));
  });
};
const teaching = resolve => {
  require.ensure(['../components/container/eduAdmin/teaching/teaching.vue'], () => {
    resolve(require('../components/container/eduAdmin/teaching/teaching.vue'));
  });
};
const eduStatistics = resolve => {
  require.ensure(['../components/container/eduAdmin/statistics/statistics.vue'], () => {
    resolve(require('../components/container/eduAdmin/statistics/statistics.vue'));
  });
};
const eduStaging = resolve => {
  require.ensure(['../components/container/eduAdmin/edustaging/edustaging.vue'], () => {
    resolve(require('../components/container/eduAdmin/edustaging/edustaging.vue'));
  });
};
const teacherManagement = resolve => {
  require.ensure(['../components/container/eduAdmin/office/teacherManagement.vue'], () => {
    resolve(require('../components/container/eduAdmin/office/teacherManagement.vue'));
  });
};
const addActivity = resolve => {
  require.ensure(['../components/container/eduAdmin/activity/addActivity.vue'], () => {
    resolve(require('../components/container/eduAdmin/activity/addActivity.vue'));
  });
};
const eduUserCenter = resolve => {
  require.ensure(['../components/container/eduAdmin/eduUserCenter/eduUserCenter.vue'], () => {
    resolve(require('../components/container/eduAdmin/eduUserCenter/eduUserCenter.vue'));
  });
};
import { resolve } from 'url';
// import { resolveSoa } from 'dns';
//以下是超级管理员角色
const superAdmin = resolve => {
  require.ensure(['../components/container/superAdmin/superAdminSidebar.vue'], () => {
    resolve(require('../components/container/superAdmin/superAdminSidebar.vue'));
  });
};
const adminManagement = resolve => {
  require.ensure(['../components/container/superAdmin/adminManagement/adminManagement.vue'], () => {
    resolve(require('../components/container/superAdmin/adminManagement/adminManagement.vue'));
  });
};
//以下是管理员角色
const Admin = resolve => {
  require.ensure(['../components/container/Admin/adminSidebar.vue'], () => {
    resolve(require('../components/container/Admin/adminSidebar.vue'));
  });
};
const videoManagement = resolve => {
  require.ensure(['../components/container/Admin/videoManagement/videoManagement.vue'], () => {
    resolve(require('../components/container/Admin/videoManagement/videoManagement.vue'));
  });
};
const uploadVideo = resolve => {
  require.ensure(['../components/container/Admin/videoManagement/uploadVideo.vue'], () => {
    resolve(require('../components/container/Admin/videoManagement/uploadVideo.vue'));
  });
};
const courseManagement = resolve => {
  require.ensure(['../components/container/Admin/courseManagement/courseManagement.vue'], () => {
    resolve(require('../components/container/Admin/courseManagement/courseManagement.vue'));
  });
};
const addCourse = resolve => {
  require.ensure(['../components/container/Admin/courseManagement/addCourse.vue'], () => {
    resolve(require('../components/container/Admin/courseManagement/addCourse.vue'));
  });
};
const chapterManagement = resolve => {
  require.ensure(['../components/container/Admin/chapterManagement/chapterManagement.vue'], () => {
    resolve(require('../components/container/Admin/chapterManagement/chapterManagement.vue'));
  });
};
const addChapter = resolve => {
  require.ensure(['../components/container/Admin/chapterManagement/addChapter.vue'], () => {
    resolve(require('../components/container/Admin/chapterManagement/addChapter.vue'));
  });
};
const organizationManagement = resolve => {
  require.ensure(['../components/container/Admin/organizationManagement/organizationManagement.vue'], () => {
    resolve(require('../components/container/Admin/organizationManagement/organizationManagement.vue'));
  });
};
const addOrganization = resolve => {
  require.ensure(['../components/container/Admin/organizationManagement/addOrganization.vue'], () => {
    resolve(require('../components/container/Admin/organizationManagement/addOrganization.vue'));
  });
};
const activityManagement = resolve => {
  require.ensure(['../components/container/Admin/activityManagement/activity.vue'], () => {
    resolve(require('../components/container/Admin/activityManagement/activity.vue'));
  });
};
const activityManagementAdd = resolve => {
  require.ensure(['../components/container/Admin/activityManagement/addActivity.vue'], () => {
    resolve(require('../components/container/Admin/activityManagement/addActivity.vue'));
  });
};
const adminUserCenter = resolve => {
  require.ensure(['../components/container/Admin/AdminUserCenter/AdminUserCenter.vue'], () => {
    resolve(require('../components/container/Admin/AdminUserCenter/AdminUserCenter.vue'));
  });
};
Vue.use(Router);
//增加了导航钩子，如果没有token则不能进入页面
const router = new Router({
  mode: 'history',
  routes: [
    { path: '*', component: ErrorPage }, //重定向
    { path: '/', component: index },
    { path: '/signup', component: SignupPage },
    { path: '/signin', component: SigninPage },
    { path: '/404', component: ErrorPage },
    {
      path: '/dashboard',
      component: sidebar, children: [
        {
          path: '/dashboard/showPage',
          component: showPage
        },
        {
          path: '/dashboard/community',
          component: community
        },
        {
          path: '/dashboard/class',
          component: myclass
        },
        {
          path: '/dashboard/message',
          component: message
        },
        {
          path: '/dashboard/homework',
          component: homework
        },
        {
          path: '/dashboard/create',
          component: create
        },
        {
          path: '/dashboard/course',
          component: course
        },
        {
          path: '/dashboard/presentation',
          component: presentation
        },
        {
          path: '/dashboard/question',
          component: question
        },
      ]
    },
    {
      path: '/payment',
      component: payment
    },
    {
      path: '/payOK',
      component: payOK
    },
    {
      path: '/activitydetailCard',
      component: activitydetailCard
    },
    {
      path: '/dashboard/coursemap',
      name: 'coursemap',
      component: coursemap
    },
    {
      path: '/dashboard/addHomework',
      name: 'addHomework',
      component: addHomework
    },
    {
      path: '/console',
      component: asider,
      children: [
        {
          path: '/console/space',
          component: space
        },
        {
          path: '/console/password',
          component: password
        },
        {
          path: '/console/homework',
          component: remark
        },
        {
          path: '/console/choiceness',
          component: choiceness
        },
        {
          path: '/console/video',
          component: videos
        },
        {
          path: '/console/activity',
          component: activity
        },
        {
          path: '/console/question',
          component: quiz
        },
        {
          path: '/console/opuscomment',
          component: opuscomment
        },
        {
          path: '/console/topiccomment',
          component: topiccomment
        },
        {
          path: '/console/material',
          component: material
        },
        {
          path: '/console/statistics',
          component: statistics
        },
        {
          path: '/console/message',
          component: tMessage
        },
        {
          path: '/console/postJob',
          component: postJob
        },
        {
          path: '/console/coursePlan',
          component: coursePlan
        },
        {
          path: '/console/userCenter',
          component: teacherUserCenter
        },
        {
          path: '/console/teachingClass',
          component: teachingClass
        }
      ]
    },
    {
      path: '/eduAdmin',
      component: eduAdmin,
      children: [
        {
          path: '/eduAdmin/',
          component: classManagement
        },
        {
          path: '/eduAdmin/activity',
          component: eduActivity
        },
        {
          path: '/eduAdmin/activity/addActivity',
          component: addActivity
        },
        {
          path: '/eduAdmin/classManagement',
          component: classManagement
        },
        {
          path: '/eduAdmin/classManagement/:classId/addStudent',
          component: addStudent
        },
        {
          path: '/eduAdmin/stuManagement',
          component: stuManagement
        },
        {
          path: '/eduAdmin/teaching',
          component: teaching
        },
        {
          path: '/eduAdmin/eduStatistice',
          component: eduStatistics
        },
        {
          path: '/eduAdmin/teacherManagement',
          component: teacherManagement
        },
        {
          path: '/eduAdmin/userCenter',
          component: eduUserCenter
        },
      ]
    },
    {
      path: '/superAdmin',
      component: superAdmin,
      children: [
        {
          path: '/superAdmin/',
          component: adminManagement
        }
      ]
    },
    {
      path: '/Admin',
      component: Admin,
      children: [
        {
          path: '/Admin/',
          component: courseManagement
        },
        {
          path: '/Admin/videoManagement/:courseId/uploadVideo',
          component: uploadVideo
        },
        {
          path: '/Admin/videoManagement',
          component: videoManagement
        },
        {
          path: '/Admin/courseManagement/addCourse',
          component: addCourse
        },
        {
          path: '/Admin/chapterManagement/:courseId',
          component: chapterManagement
        },
        {
          path: '/Admin/chapterManagement/:courseId/addChapter',
          component: addChapter,
          name: 'addChapter'
        },
        {
          path: '/Admin/organizationManagement',
          component: organizationManagement
        },
        {
          path: '/Admin/organizationManagement/addOrganization',
          component: addOrganization
        },
        {
          path: '/Admin/activityManagement',
          component: activityManagement
        },
        {
          path: '/Admin/activityManagement/addActivity',
          component: activityManagementAdd
        },
        {
          path: '/Admin/userCenter',
          component: adminUserCenter
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (window.localStorage.getItem("idToken")) {
    next();
  } else {
    to.path === '/signin' ? next() : next('/signin');
  }
});

export default router;