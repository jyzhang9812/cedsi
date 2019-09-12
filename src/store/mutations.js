import * as TYPES from './mutation-types.js';

const mutations = {
    [TYPES.authUser](state, userData) {
        state.idToken = userData.token;
        state.userId = userData.userId;
        // state.expirationDate = userData.expirationDate;
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
    [TYPES.updateLoading](state, num) {
        state.vueElementLoading = num
    },

    //student
    [TYPES.getUserInfo](state, UserInfo) {
        state.userInfo = UserInfo
    },
    [TYPES.getClass](state, myClass) {
        state.myClass = myClass
    },

    [TYPES.changeCouseDetail](state, List) {
        state.courseName = List.name
        for (var i = 0; i < List.list.length; i++) {
            state.pointList[i].bgImg = List.list[i].bgImg
            state.pointList[i].status = List.list[i].status
            state.pointList[i].description = List.list[i].description
            state.pointList[i].number = List.list[i].number
            state.pointList[i].name = List.list[i].name
            state.pointList[i].videoSrc = List.list[i].videoSrc
            state.pointList[i].flag = List.list[i].flag
        }
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

    //Admin
    [TYPES.changeAdminCourseList](state, List) {
        state.adminCourseList = List
    },
    [TYPES.changeVideo](state, List) {
        state.videoData = List
    },
    [TYPES.changeVideoCurrentList](state, value) {
        state.videoCurrentList = state.videoData.slice(value, value + state.limit);
    },
    [TYPES.changeChapterList](state, List) {
        state.chapterData = List
    },
    [TYPES.changeChapterCurrentList](state, value) {
        state.chapterCurrentList = state.chapterData.slice(value, value + state.limit);
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
