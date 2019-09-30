import * as TYPES from './mutation-types.js';
import globalAxios from '../axios-auth';
import router from '../router';

const actions = {

    //公用
    //runtimeError处理
    jmpToError(errorType) {
        if (errorType == 'Runtime.ExitError') {
            router.push({ path: '/404' })
        }
    },
    //获取首页
    getActivity({ commit, state }) {
        return globalAxios.get("/activity")
            .then(
                response => {
                    console.log(response);
                    let arr = []
                    let b = []
                    for (var i = 0; i < response.data.length; i++) {
                        arr.push(response.data[i])
                    }
                    for (var i = 0; i < arr.length; i++) {
                        var array = {}
                        array.id = arr[i].ID;
                        array.cover = arr[i].COVER;
                        array.title = arr[i].TITLE;
                        array.subtitle = arr[i].SUBTITLE;
                        array.content = arr[i].CONTENT;
                        array.avatar = arr[i].AVATAR;
                        array.teacher = arr[i].TEACHER_NAME;
                        array.release_time = arr[i].RELEASE_TIME
                        array.type = arr[i].ACTIVITY_TYPE;
                        array.time = arr[i].ACTIVITY_TIME;
                        array.price = arr[i].ACTIVITY_PRICE;
                        array.place = arr[i].ACTIVITY_PLACE;
                        array.principal_id = arr[i].PRINCIPAL_ID
                        b.push(array);
                    }
                    commit(TYPES.changeActivity, b)
                },
                error => {
                    router.push({ path: '/404' })
                    console.log(error);
                }
            );
    },
    //获取具体活动
    searchActivity({ commit, state }, id) {
        return globalAxios
            ({
                method: "GET",
                url: "/activity/" + id,
            }).then(
                response => {
                    console.log(response);
                    let array = {}
                    array.id = response.data.ID;
                    array.cover = response.data.COVER;
                    array.title = response.data.TITLE;
                    array.subtitle = response.data.SUBTITLE;
                    array.content = response.data.CONTENT;
                    array.avatar = response.data.AVATAR;
                    array.teacher = response.data.TEACHER_NAME;
                    array.release_time = response.data.RELEASE_TIME
                    array.type = response.data.ACTIVITY_TYPE;
                    array.time = response.data.ACTIVITY_TIME;
                    array.price = response.data.ACTIVITY_PRICE;
                    array.place = response.data.ACTIVITY_PLACE;
                    state.payInfo = array;
                },
                error => {
                    router.push({ path: '/404' })
                    console.log(error);
                });
    },

    //登录注册
    login({ commit, dispatch, state }, authData) {
        var token = ''
        return globalAxios.post("/user/login",
            { "username": authData.username, "password": authData.password })
            .then(
                response => {
                    console.log(response);
                    token = response.data.token
                    state.expirationDate = response.data.exp;
                    state.roleId = response.data.role;
                    state.user = authData.username
                    state.status = response.data.status
                    // console.log(state.expirationDate)
                    if (token === undefined) {
                        commit(TYPES.authUser, {
                            token: null,
                            userId: null
                        })
                    }
                    else {
                        commit(TYPES.authUser, {
                            token: token,
                            userId: null
                        })
                        localStorage.setItem('idToken', token)
                        localStorage.setItem('user', state.user)
                        localStorage.setItem('roleId', state.roleId)
                        localStorage.setItem('expirationDate', state.expirationDate)
                    }

                    if (state.status == 'fail') {
                        console.log('error')
                    }
                    else {
                        router.replace({ path: state.roles[state.roleId - 1] })
                    }
                },
                error => {
                    router.push({ path: '/404' })
                    console.log(error);
                }
            );
    },
    signup({ commit, dispatch }, authData) {
        globalAxios.post("/user/register",
            { "username": authData.username, "password": authData.password, "account": authData.account })
            .then(
                response => {
                    console.log(response);
                    router.replace({ path: '/signin' })
                },
                error => {
                    router.push({ path: '/404' })
                    console.log(error);
                }
            );
    },
    //处理刷新页面state数据丢失问题
    tryAutoLogin({ dispatch, commit, state }) {
        const token = localStorage.getItem('idToken');
        const expirationDate = Number(localStorage.getItem('expirationDate'));
        console.log(expirationDate)
        const now = new Date();
        if (now.getTime() <= expirationDate) {
            console.log("token未过期");
            commit(TYPES.authUser, {
                token: token,
                // expirationDate: expirationDate,
                userId: userId
            })
        } else {
            console.log("token已过期");
            if (localStorage.getItem('idToken')) {
                dispatch('logout')
                router.replace({ path: '/signin' });
            } else {
                router.replace({ path: '/' })
            };
        }

        const userId = localStorage.getItem('userId');
        // commit(TYPES.authUser, {
        //     token: token,
        //     // expirationDate: expirationDate,
        //     userId: userId
        // })
    },
    logout: ({ commit }) => {
        commit(TYPES.clearAuthData);
        localStorage.removeItem('idToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('roleId');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('user');
        router.replace('/')
    },


    //students方法
    //获取用户个人资料
    getUser({ commit, state }) {
        return globalAxios.get('/student/studentinfo',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': state.idToken
                }
            }
        ).then(response => {
            // console.log(response.data)
            var user = {}
            var arr = response.data
            user.avatar = arr.AVATAR,
                user.time = arr.CREATED_TIME,
                user.username = arr.NICK_NAME,
                user.mobile = arr.MOBILE,
                user.phone = arr.PHONE,
                user.email = arr.EMAIL,
                user.gender = arr.GENDER,
                commit(TYPES.getUserInfo, user)
            commit(TYPES.updateLoading, false)
        },
            error => {
                commit(TYPES.updateLoading, false)
                console.log(error);
            })
    },
    //用户更改个人资料
    updateUser({ commit, state }, userData) {
        globalAxios({
            method: "PUT",
            url: '/student/studentinfo',
            data: userData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': state.idToken
            }
        })
            .then(response => {
                console.log(response)
                commit(TYPES.getUserInfo, userData)
                commit(TYPES.updateLoading, false)
            }, error => {
                commit(TYPES.updateLoading, false)
                console.log(error);
            })
    },
    //获取用户课程
    getCourse({ commit, state }) {
        return globalAxios.get('/student/courses',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': state.idToken
                }
            }
        ).then(response => {
            var arr = [];
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                arr.push(response.data[i])
            }
            commit(TYPES.changeCourseList, arr)
            commit(TYPES.changeCourseCurrentList, 0)
            commit(TYPES.updateLoading, false)
        },
            error => {
                commit(TYPES.updateLoading, false)
                console.log(error);
            })
    },
    //课程视频及信息
    getCourseDetail({ commit, dispatch, state }, id) {
        globalAxios.get('/student/courses/' + id + '/chapters', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': state.idToken
            }
        })
            .then(
                response => {
                    console.log(response)
                    var chaptersArr = response.data.data.chapter_message.chapters;
                    var finishChaptersArr = response.data.data.chapter_message.finish_chapters;
                    state.finishChaptersLength = finishChaptersArr.length;
                    var List = {
                        name: '',
                        list: []
                    }
                    for (var i = 0; i < chaptersArr.length; i++) {
                        var point = {}
                        if (i < finishChaptersArr.length) {
                            point.bgImg =
                                "../../static/images/scratch/coordinateed.6a1e9a5.png";
                            point.status = "已完成";
                            point.flag = true;
                        } else {
                            point.bgImg =
                                "../../static/images/scratch/coordinate.a15fa38.png";
                            point.status = "未解锁";
                            point.flag = false;
                        }
                        point.time = chaptersArr[i].CP_UPLOAD_TIME;
                        point.description = chaptersArr[i].CP_DESCRIPTION;
                        point.number = chaptersArr[i].CP_NUMBER;
                        point.name = chaptersArr[i].CP_NAME;
                        point.videoSrc = chaptersArr[i].CP_RESOURCE.VIDEO;
                        point.lectureSrc = chaptersArr[i].CP_RESOURCE.LECTURE;
                        point.templateSrc = chaptersArr[i].CP_RESOURCE.TEMPLATE;
                        point.chapterId = chaptersArr[i].CP_ID;
                        List.list.push(point);
                    }
                    List.name = response.data.data.courseName,
                        console.log(List)
                    commit(TYPES.changeCouseDetail, List)
                    commit(TYPES.updateLoading, false)
                },
                error => {
                    commit(TYPES.updateLoading, false)
                    console.log(error);
                }
            );
    },
    //获取作业
    getWork({ commit, state }, courseId) {
        globalAxios.get('/student/courses/' + courseId + '/homework',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': state.idToken
                }
            }
        ).then(response => {
            var arr = []
            var content = []
            // console.log(response);
            // if (curId == 0) {
            for (var i = 0; i < response.data.homework.length; i++) {
                arr.push(response.data.homework[i])
            }
            for (var i = 0; i < arr.length; i++) {
                var array = {}
                array.id = arr[i].HW_ID;
                array.url = './static/build/player.html?fileUrl=' + arr[i].HW_URL;
                array.name = arr[i].HW_NAME;
                array.img_url = arr[i].HW_COVER;
                array.teacher_remark = arr[i].TEACHER_REMARK;
                array.rank = arr[i].HW_RANK;
                array.time = arr[i].SUBMIT_TIME;
                content.push(array);
            }
            // }
            // else {
            //     for (var i = 0; i < response.data.product.length; i++) {
            //         arr.push(response.data.product[i])
            //     }
            //     for (var i = 0; i < arr.length; i++) {
            //         var array = {}
            //         array.name = arr[i].PRODUCT_NAME;
            //         array.img_url = arr[i].COVER_URL;
            //         array.teacher_remark = arr[i].TEACHER_REMARK;
            //         array.rank = arr[i].PRODUCT_RANK;
            //         array.time = arr[i].CREATE_TIME;
            //         content.push(array);
            //     }
            // }
            commit(TYPES.changeWorkList, content)
            commit(TYPES.changeWorkCurrentList, 0)
            commit(TYPES.updateLoading, false)
        },
            error => {
                commit(TYPES.updateLoading, false)
                console.log(error);
            }
        );
    },
    //系统消息
    getMsg({ commit, state }, curId) {
        return globalAxios.get('/student/message/' + (curId + 1),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': state.idToken
                }
            }
        ).then(
            response => {
                // console.log(response);
                var arr = [];
                for (var i = 0; i < response.data.length; i++) {
                    arr.push(response.data[i])
                }
                commit(TYPES.changeMsgList, arr)
                commit(TYPES.changeMsgCurrentList, 0)
                commit(TYPES.updateLoading, false)
            },
            error => {
                commit(TYPES.updateLoading, false)
                console.log(error);
            }
        );
    },
    //所在班级
    getClass({ commit, state }) {
        return globalAxios.get('/student/class',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': state.idToken
                }
            }
        ).then(response => {
            // console.log(response);
            var myClasses = []
            if (response.data) {
                for (let i = 0; i < response.data.length; i++) {
                    var myClass = {}
                    var arr = []
                    myClass.name = response.data[i].className
                    myClass.teacher = response.data[i].teacher
                    myClass.memberCount = response.data[i].member_count
                    for (let j = 0; j < response.data[i].classmates.length; j++) {
                        arr.push(response.data[i].classmates[j])
                    }
                    myClass.classmates = arr
                    console.log(arr)
                    myClasses.push(myClass)
                }
            }
            commit(TYPES.getClass, myClasses)
            commit(TYPES.updateLoading, false)
        },
            error => {
                commit(TYPES.updateLoading, false)
                console.log(error);
            }
        );
    },

    //获取全部课程
    getAllCourse({ commit, state }) {
        return globalAxios.get('/courses',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': state.idToken
                }
            }
        ).then(response => {
            var arr = [];
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                arr.push(response.data[i])
            }
            commit(TYPES.changeAllList, arr)
            commit(TYPES.changeAllCurrentList, 0)
            commit(TYPES.updateLoading, false)
        },
            error => {
                commit(TYPES.updateLoading, false)
                console.log(error);
            })

    },
    //查询课程
    payCourse({ commit, state }, id) {
        return globalAxios.get('/courses/' + id,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': state.idToken
                }
            }
        ).then(response => {
            var arr = {}
            console.log(response);
            arr = response.data
            var array = {}
            array.id = arr.ID;
            array.cover = arr.COVER;
            array.name = arr.COURSE_NAME;
            array.founder = arr.FOUNDER;
            array.intro = arr.INTRO;
            array.time = arr.CREATE_TIME
            array.price = arr.PRICE;
            state.payInfo = array
            commit(TYPES.updateLoading, false)
        },
            error => {
                commit(TYPES.updateLoading, false)
                console.log(error);
            })
    },


    // Admin方法
    //获取课程目录
    getCourseList({ dispatch, commit, state }) {
        return globalAxios.get(
            "/admin/course",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: state.idToken
                }
            }
        ).then(
            response => {
                console.log('0000000000000')
                var courseArr = [];
                var courseList = [];
                courseArr = response.data;
                for (var i = 0; i < courseArr.length; i++) {
                    var course = {};
                    course.name = courseArr[i].COURSE_NAME;
                    course.id = courseArr[i].ID;
                    if (i == 0) course.isActive = true;
                    else course.isActive = false;
                    courseList.push(course);
                }
                commit(TYPES.changeAdminCourseList, courseList);
                console.log(courseList)
                return dispatch('changeCourse', courseList[0].id).then(() => {
                    console.log('22222222222')
                })
            },
            error => {
                // this.$router.push({path:'/404'})
                console.log(error);
            }
        );
    },

    //切换课程下方视频数据
    changeCourse({ dispatch, commit, state }, id) {
        return globalAxios.get(
            "/admin/course/" + id + "/video",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: state.idToken
                }
            }
        ).then(
            response => {
                console.log('1111111111111')
                console.log(response);
                var videoArr = [];
                var videoData = [];
                videoArr = response.data.data;
                if (videoArr == null) {
                    return null
                } else {
                    for (var i = 0; i < videoArr.length; i++) {
                        var video = {};
                        video.chapterId = videoArr[i].CP_ID;
                        video.videoId = videoArr[i].RS_ID;
                        video.chapterName = videoArr[i].CP_NAME;
                        video.videoName = videoArr[i].RS_NAME;
                        video.introduction = videoArr[i].RS_COMMENT;
                        video.date = videoArr[i].RS_CREATE_TIME
                        video.uploadAdmin = videoArr[i].RS_FOUNDER;
                        video.chapterNum = videoArr[i].CP_NUMBER;
                        video.videoUrl = videoArr[i].RS_URL;
                        videoData.push(video);
                    }
                    commit(TYPES.changeVideo, videoData);
                    commit(TYPES.changeVideoCurrentList, 0)
                    console.log(videoData);
                }
            },
            error => {
                // this.$router.push({path:'/404'})
                console.log(error);
            }
        );
    },
    //上传视频页面 获取章节数据
    getCourseChapter({ dispatch, state }, courseId) {
        globalAxios.get(
            "/admin/course/" + courseId + "/chapters",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: state.idToken
                }
            }
        ).then(
            response => {
                console.log(response);
                var chapterArr = [];
                var chapterData = [];
                chapterArr = response.data.data;
                for (var i = 0; i < chapterArr.length; i++) {
                    var chapter = {};
                    chapter.name = chapterArr[i].CP_NAME;
                    chapter.id = chapterArr[i].CP_ID;
                    chapterData.push(chapter);
                }
                state.inputData.chapter.list = chapterData;
            },
            error => {
                console.log(error);
            }
        );
    },
    //章节管理页面 获取章节详细信息
    getChapterDetial({ dispatch, state, commit }, courseId) {
        return globalAxios.get(
            "/admin/course/" + courseId + "/chapters",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: state.idToken
                }
            }
        ).then(
            response => {
                console.log(response.data);
                var chapterArr = [];
                var chapterData = [];
                chapterArr = response.data.data;
                state.chapterLength = chapterArr.length
                for (var i = 0; i < state.chapterLength; i++) {
                    var chapter = {};
                    chapter.chapterId = chapterArr[i].CP_ID;
                    chapter.chapterName = chapterArr[i].CP_NAME;
                    chapter.date = chapterArr[i].CP_UPLOAD_TIME;
                    chapter.introduction = chapterArr[i].CP_DESCRIPTION;
                    chapter.date = chapterArr[i].CP_UPLOAD_TIME;
                    chapter.uploadAdmin = chapterArr[i].CP_FOUNDER;
                    chapter.chapterNum = chapterArr[i].CP_NUMBER;
                    chapter.id = chapterArr[i].CP_ID;
                    chapterData.push(chapter);
                }
                state.chapterData = chapterData;
                commit(TYPES.changeChapterList, chapterData)
                commit(TYPES.changeChapterCurrentList, 0)
            },
            error => {
                console.log(error);
            }
        );
    },



    //superAdmin方法
    //superAdmin get Admin 
    getAdmin({ commit, state }) {
        globalAxios.get(
            "/superadmin/admin",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: state.idToken
                }
            }
        )
            .then(
                response => {
                    var admin_arr = response.data.data;
                    var admin_table = [];
                    for (var i = 0; i < admin_arr.length; i++) {
                        var admin = {};
                        admin.username = admin_arr[i].USER_NAME;
                        admin.id = admin_arr[i].USER_ID;
                        if (admin_arr[i].USER_STATUS == "active") admin.status = "启用";
                        else admin.status = "禁用";
                        admin.character = "管理员";
                        admin_table.push(admin);
                    }
                    commit(TYPES.changeAdminList, admin_table)
                    commit(TYPES.changeAdminCurrentList, 0)
                    commit(TYPES.updateLoading, false)
                },
                error => {
                    commit(TYPES.updateLoading, false)
                    console.log(error)

                }
            )
    },
    //superAdmin add Admin
    addAdmin({ commit, state, dispatch }, addAdmin) {
        console.log(state.idToken)
        globalAxios
            .post(
                "/superadmin/admin",
                { username: addAdmin.username, password: addAdmin.password },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: state.idToken
                    }
                }
            )
            .then(
                response => {
                    console.log(response);
                    dispatch("getAdmin")
                    commit(TYPES.updateLoading, false)
                },
                error => {
                    commit(TYPES.updateLoading, false)
                    console.log(error);
                }
            );
    },
    //superAdmin delete Admin
    deleteAdmin({ commit, state }, deleteAdmin) {
        globalAxios
            .delete(
                "/superadmin/admin?userId=" + deleteAdmin.id,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: state.idToken
                    }
                }
            )
            .then(
                response => {
                    console.log(response);
                    state.adminList.splice(deleteAdmin.index, 1);
                    commit(TYPES.changeAdminCurrentList, (deleteAdmin.page * state.limit));
                    commit(TYPES.updateLoading, false)
                },
                error => {
                    commit(TYPES.updateLoading, false)
                    console.log(error);
                }
            );
    },
    updateAdminStatus({ state }, updateAdmin) {
        console.log(updateAdmin)
        globalAxios
            .put(
                "/superadmin/admin",
                { userId: updateAdmin.userId, status: updateAdmin.status },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: state.idToken
                    }
                }
            )
            .then(
                response => {
                    commit(TYPES.updateLoading, false)
                    console.log(response);
                },
                error => {
                    commit(TYPES.updateLoading, false)
                    console.log(error);
                }
            );
    }
}
export default actions