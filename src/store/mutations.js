import * as TYPES from './mutation-types.js';

const mutations = {
    [TYPES.authUser](state, userData) {
        state.idToken = userData.token;
        state.userId = userData.userId;
    },
    [TYPES.storeUser](state, user) {
        state.user = user
    },
    [TYPES.clearAuthData](state) {
        state.idToken = null;
        state.userId = null;
        state.expirationDate = null;
        state.roleId = 0;
    },

    //student
    [TYPES.getUserInfo](state, UserInfo) {
        state.userInfo = UserInfo
    },
    [TYPES.getClass](state, myClass) {
        state.myClass = myClass
    },
    [TYPES.changeCourseList](state, courseList) {
        state.courseList = courseList
    },
    [TYPES.changeCourseCurrentList](state, value) {
        state.courseCurrentList = state.courseList.slice(value, value + state.limit);
    },
    [TYPES.changeWorkList](state, workList) {
        state.workList = workList
    },
    [TYPES.changeWorkCurrentList](state, value) {
        state.workCurrentList = state.workList.slice(value, value + state.limit);
    },
    [TYPES.changeMsgList](state, msgList) {
        state.msgList = msgList
    },
    [TYPES.changeMsgCurrentList](state, value) {
        state.msgCurrentList = state.msgList.slice(value, value + state.limit);
    },

    //superAdmin
    [TYPES.changeAdminList](state, adminList) {
        state.adminList = adminList
    },
    [TYPES.changeAdminCurrentList](state, value) {
        state.adminCurrentList = state.adminList.slice(value, value + state.limit);
    },
}
export default mutations
