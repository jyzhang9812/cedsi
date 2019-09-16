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
const payment = resolve => {
  require.ensure(['../components/container/student/payment.vue'], () => {
    resolve(require('../components/container/student/payment.vue'));
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
const staging = resolve => {
  require.ensure(['../components/container/teacher/staging/staging.vue'], () => {
    resolve(require('../components/container/teacher/staging/staging.vue'));
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
const checkStudent = resolve => {
  require.ensure(['../components/container/eduAdmin/activity/checkStudent.vue'], () => {
    resolve(require('../components/container/eduAdmin/activity/checkStudent.vue'));
  });
};
const addActivity = resolve => {
  require.ensure(['../components/container/eduAdmin/activity/addActivity.vue'], () => {
    resolve(require('../components/container/eduAdmin/activity/addActivity.vue'));
  });
};
import { resolve } from 'url';
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

Vue.use(Router);
//增加了导航钩子，如果没有token则不能进入页面
export default new Router({
  mode: 'history',
  routes: [
    { path: '*', component: ErrorPage }, //重定向
    { path: '/', component: index },
    { path: '/signup', component: SignupPage },
    { path: '/signin', component: SigninPage },
    { path: '/404', component: ErrorPage },
    {
      path: '/dashboard',
      beforeEnter(to, from, next) {
        if (window.localStorage.getItem("idToken")) {
          next()
        } else {
          next('/signin')
        }
      },
      component: sidebar, children: [
        {
          path: '/dashboard/showPage',
          beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          },
          component: showPage
        },
        {
          path: '/dashboard/community', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: community
        },
        {
          path: '/dashboard/class',
          beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          },
          component: myclass
        },
        {
          path: '/dashboard/message', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: message
        },
        {
          path: '/dashboard/homework', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: homework
        },
        {
          path: '/dashboard/create', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: create
        },
        {
          path: '/dashboard/course', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: course
        },
        {
          path: '/dashboard/presentation', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: presentation
        },
        {
          path: '/dashboard/question', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: question
        },
        {
          path: '/dashboard/showPage/activedetailCard',
          beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          },
          component: activitydetailCard
        },
      ]
    },
    {
      path: '/payment',
      beforeEnter(to, from, next) {
        if (window.localStorage.getItem("idToken")) {
          next()
        } else {
          next('/signin')
        }
      },
      component: payment
    },
    {
      path: '/dashboard/coursemap', beforeEnter(to, from, next) {
        if (window.localStorage.getItem("idToken")) {
          next()
        } else {
          next('/signin')
        }
      }, name: 'coursemap', component: coursemap
    },
    {
      path: '/console', beforeEnter(to, from, next) {
        if (window.localStorage.getItem("idToken")) {
          next()
        } else {
          next('/signin')
        }
      },
      component: asider,
      children: [
        {
          path: '/console/staging', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: staging
        },
        {
          path: '/console/space', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: space
        },
        {
          path: '/console/password', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: password
        },
        {
          path: '/console/homework', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: remark
        },
        {
          path: '/console/choiceness', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: choiceness
        },
        {
          path: '/console/video', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: videos
        },
        {
          path: '/console/activity', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: activity
        },
        {
          path: '/console/question', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: quiz
        },
        {
          path: '/console/opuscomment', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: opuscomment
        },
        {
          path: '/console/topiccomment', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: topiccomment
        },
        {
          path: '/console/material', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: material
        },
        {
          path: '/console/statistics', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: statistics
        },
        {
          path: '/console/message', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: tMessage
        },
      ]
    },
    {
      path: '/eduAdmin', beforeEnter(to, from, next) {
        if (window.localStorage.getItem("idToken")) {
          next()
        } else {
          next('/signin')
        }
      },
      component: eduAdmin,
      children: [
        {
          path: '/eduAdmin/', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: eduStaging
        },
        {
          path: '/eduAdmin/activity', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: eduActivity
        },
        {
          path: '/eduAdmin/activity/addActivity', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: addActivity
        },
        {
          path: '/eduAdmin/activity/checkStudent', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: checkStudent
        },
        {
          path: '/eduAdmin/classManagement', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: classManagement
        },
        {
          path: '/eduAdmin/stuManagement', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: stuManagement
        },
        {
          path: '/eduAdmin/teaching', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: teaching
        },
        {
          path: '/eduAdmin/eduStatistice', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: eduStatistics
        },
        {
          path: '/eduAdmin/teacherManagement', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: teacherManagement
        }
      ]
    },
    {
      path: '/superAdmin', beforeEnter(to, from, next) {
        if (window.localStorage.getItem("idToken")) {
          next()
        } else {
          next('/signin')
        }
      },
      component: superAdmin,
      children: [
        {
          path: '/superAdmin/', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: adminManagement
        },
      ]
    },
    {
      path: '/Admin',
      component: Admin,
      children: [
        // {
        //   path: '/Admin/', beforeEnter(to, from, next) {
        //     if (window.localStorage.getItem("idToken")) {
        //       next()
        //     } else {
        //       next('/signin')
        //     }
        //   }, component: eduAdminManagement
        // },
        {
          path: '/Admin/', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: courseManagement
        },
        {
          path: '/Admin/videoManagement/:courseId/uploadVideo', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: uploadVideo
        },
        {
          path: '/Admin/videoManagement', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: videoManagement
        },
        {
          path: '/Admin/courseManagement/addCourse', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: addCourse
        },
        {
          path: '/Admin/chapterManagement/:courseId', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: chapterManagement
        },
        {
          path: '/Admin/chapterManagement/:courseId/addChapter', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: addChapter,name:'addChapter'
        },
        {
          path: '/Admin/organizationManagement', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: organizationManagement
        },
        {
          path: '/Admin/organizationManagement/addOrganization', beforeEnter(to, from, next) {
            if (window.localStorage.getItem("idToken")) {
              next()
            } else {
              next('/signin')
            }
          }, component: addOrganization
        },
      ]
    }
  ]
})