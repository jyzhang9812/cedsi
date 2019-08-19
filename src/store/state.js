const state =  {
    url: '../../../../static/images/',
    idToken: null,
    expirationDate: null,
    userId: null,
    user: null,

    //学生
    userInfo:[],
    content:[],
    myClass:[],
    status: null,
    roles: ['/dashboard', '/console', '/EduAdmin', '/Admin', '/superAdmin'],
    roleId: 0,
    courseList: [],
    courseCurrentList: [],
    workList: [],
    workCurrentList: [],
    msgList: [],
    msgCurrentList: [],

    //超级管理员
    adminList: [],
    adminCurrentList: [],

    //公用
    limit: 12
}
export default state