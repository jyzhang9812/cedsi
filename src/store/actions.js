import * as TYPES from './mutation-types.js';
import globalAxios from '../axios-auth';
import router from '../router';

const actions = {

    login({ commit, dispatch, state }, authData) {
        globalAxios.post("/user/login",
            { "username": authData.username, "password": authData.password })
            .then(
                response => {
                    console.log(response);
                    state.expirationDate = response.data.exp;
                    state.idToken = response.data.token;
                    localStorage.setItem('idToken', state.idToken)
                    state.roleId = response.data.role;
                    state.user = authData.username
                    localStorage.setItem('user', state.user)
                    localStorage.setItem('roleId', state.roleId)
                    localStorage.setItem('expirationDate', state.expirationDate)
                    state.status = response.data.status
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
            { "username": authData.username, "password": authData.password })
            .then(
                response => {
                    console.log(response);
                    this.$router.replace({ path: '/signin' })
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
        },
            error => {
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
        },
            error => {
                console.log(error);
            })
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
            var content = [{
                name: '',
                rank: '',
                time: '',
                img_url: '',
                teacher_remark: '',
            }]
            // console.log(response);
            if (curId == 0) {
                for (var i = 0; i < response.data.homework.length; i++) {
                    arr.push(response.data.homework[i])
                }
                for (var i = 0; i < arr.length; i++) {
                    content[i].name = arr[i].HW_NAME;
                    content[i].img_url = arr[i].HW_COVER;
                    content[i].teacher_remark = arr[i].TEACHER_REMARK;
                    content[i].rank = arr[i].HW_RANK;
                    content[i].time = arr[i].SUBMIT_TIME;
                }
            }
            else {
                for (var i = 0; i < response.data.product.length; i++) {
                    arr.push(response.data.product[i])
                }
                for (var i = 0; i < arr.length; i++) {
                    content[i].name = arr[i].PRODUCT_NAME;
                    content[i].img_url = arr[i].COVER_URL;
                    content[i].teacher_remark = arr[i].TEACHER_REMARK;
                    content[i].rank = arr[i].PRODUCT_RANK;
                    content[i].time = arr[i].CREATE_TIME;
                }
            }
            commit(TYPES.changeWorkList, content)
            commit(TYPES.changeWorkCurrentList, 0)
        },
            error => {
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
            },
            error => {
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
            // console.log(response);
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
                },
                error => {
                    console.log(error)

                }
            )
    },
    //superAdmin add Admin
    addAdmin({ commit, state, dispatch }, addAdmin) {
        globalAxios
            .post(
                "/superadmin/admin",
                { username: addAdmin.username, password: addAdmin.password },
                {
                    header: {
                        "Content-Type": "application/json",
                        Authorization: state.idToken
                    }
                }
            )
            .then(
                response => {
                    console.log(response);
                    dispatch("getAdmin")
                },
                error => {
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
                },
                error => {
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
                    console.log(response);
                },
                error => {
                    console.log(error);
                }
            );
    }
}
export default actions