import Vue from 'vue';
import Vuex from 'vuex';
import globalAxios from '../axios-auth'
import router from '../router'
// import VueResource from "vue-resource"
// import VueLocalStorage from 'vue-localstorage';

// Vue.use(VueLocalStorage);
Vue.use(Vuex);
Vue.use(router);

export const store =new Vuex.Store({
    state:{
        idToken: "null",
        userId: "null",
        user: "null",
        status:"null",
        roles:['/dashboard','/console','/EduAdmin','/Admin','/superAdmin'],
        roleId:0
    },
    getters:{
        isAuthenticated(state) {
            return state.idToken !== null
          },
        whichRole(state){
            return state.roles[state.roleId-1]
        }
    },
    mutations:{
        authUser(state, userData) {
            state.idToken = userData.token;
            state.userId = userData.userId;
          },
          storeUser(state, user) {
            state.user = user
          },
          clearAuthData(state) {
            state.idToken = null;
            state.userId = null;
          }
    },
    actions:{
        login({ commit, dispatch,state }, authData) {
            globalAxios.post("/user/login",  
          {"username":authData.username,"password":authData.password})
          .then(
            response => {
              console.log(response);
              state.idToken = response.data.token;
              localStorage.setItem('idToken', state.idToken);
              state.status = response.data.status;
              if(state.status=='fail'){
                console.log('error')
              }
              else{
                state.roleId = response.data.role;
                router.replace({path:state.roles[state.roleId-1]})
              }
            },
            error => {
              router.push({path:'/404'})
              console.log(error);
            }
        );
      },
      logout: ({ commit }) => {
        commit('clearAuthData');
        localStorage.removeItem('idToken');
        localStorage.removeItem('userId');
        router.replace('/')
        // localStorage.removeItem('userId');
      }
        
    },
    
})