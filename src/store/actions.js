import * as TYPES from './mutation-types.js';
import globalAxios from '../axios-auth';
import router from '../router';

const actions = {
    login({ commit, dispatch, state }, authData) {
        var token = ''
        globalAxios.post("/user/login",
            { "username": authData.username, "password": authData.password })
            .then(
                response => {
                    console.log(response);
                    token = response.data.token
                    state.expirationDate = response.data.exp;
                    state.roleId = response.data.role;
                    state.user = authData.username
                    state.status = response.data.status
                    commit(TYPES.authUser, {

                        token: token,
                        userId: null
                    })
                    localStorage.setItem('idToken', token)
                    localStorage.setItem('user', state.user)
                    localStorage.setItem('roleId', state.roleId)
                    localStorage.setItem('expirationDate', state.expirationDate)


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
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         commit(TYPES.authUser, {
        //             token: token,
        //             userId: null
        //         })
        //   console.log('0000000000000000000')
        //         if (state.status == 'fail') {
        //             console.log('error')
        //         }
        //         else {
        //             router.replace({ path: state.roles[state.roleId - 1] })
        //         }
        //         resolve()
        //     }, 1000)
        // })
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
    tryAutoLogin({ commit, state }) {
        const token = localStorage.getItem('idToken');
        const expirationDate = Number(localStorage.getItem('expirationDate'));
        const now = new Date();
        let flag = 1;
        if (now.getTime() <= expirationDate) {
            console.log("token未过期");
            flag = 0;
        } else {
            console.log("token已过期");
        }
        if (!token || flag) {
            return;
        }

        const userId = localStorage.getItem('userId');
        commit(TYPES.authUser, {
            token: token,
            userId: userId
        })
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
    getUser({ commit, state }) {
        globalAxios.get('/student/studentinfo',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': state.idToken
                }
            }
        ).then(response => {
            console.log(response.data)
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
    getCourse({ commit, state }) {
        globalAxios.get('/student/courses',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': state.idToken
                }
            }
        ).then(response => {
            var arr = [];
            // console.log(response);
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
    getCourseDetail({ commit, state }, id) {
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
                        point.description = chaptersArr[i].CP_DESCRIPTION;
                        point.number = chaptersArr[i].CP_NUMBER;
                        point.name = chaptersArr[i].CP_NAME;
                        point.videoSrc = chaptersArr[i].CP_RESOURCE.VIDEO;
                        List.list.push(point);
                    }
                    List.name = response.data.data.courseName,
                        commit(TYPES.changeCouseDetail, List)
                    commit(TYPES.updateLoading, false)
                },
                error => {
                    commit(TYPES.updateLoading, false)
                    console.log(error);
                }
            );
    },
    getWork({ commit, state }, curId) {
        globalAxios.get('/student/works?type=' + curId,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': state.idToken
                }
            }
        ).then(response => {
            var arr = []
            var content = []
            console.log(response);
            if (curId == 0) {
                for (var i = 0; i < response.data.homework.length; i++) {
                    arr.push(response.data.homework[i])
                }
                for (var i = 0; i < arr.length; i++) {
                    var array = {}
                    array.name = arr[i].HW_NAME;
                    array.img_url = arr[i].HW_COVER;
                    array.teacher_remark = arr[i].TEACHER_REMARK;
                    array.rank = arr[i].HW_RANK;
                    array.time = arr[i].SUBMIT_TIME;
                    content.push(array);
                }
            }
            else {
                for (var i = 0; i < response.data.product.length; i++) {
                    arr.push(response.data.product[i])
                }
                for (var i = 0; i < arr.length; i++) {
                    var array = {}
                    array.name = arr[i].PRODUCT_NAME;
                    array.img_url = arr[i].COVER_URL;
                    array.teacher_remark = arr[i].TEACHER_REMARK;
                    array.rank = arr[i].PRODUCT_RANK;
                    array.time = arr[i].CREATE_TIME;
                    content.push(array);
                }
            }
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
    getMsg({ commit, state }, curId) {
        globalAxios.get('/student/message/' + (curId + 1),
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
    getClass({ commit, state }) {
        globalAxios.get('/student/class',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': state.idToken
                }
            }
        ).then(response => {
            console.log(response);
            var myClass = {}
            var arr = []

            myClass.name = response.data.className
            myClass.teacher = response.data.teacher
            myClass.memberCount = response.data.member_count
            for (var i = 0; i < response.data.classmates.length; i++) {
                arr.push(response.data.classmates[i])
            }
            myClass.classmates = arr
            commit(TYPES.getClass, myClass)
            commit(TYPES.updateLoading, false)
        },
            error => {
                commit(TYPES.updateLoading, false)
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