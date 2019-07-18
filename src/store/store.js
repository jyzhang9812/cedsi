import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios-auth'
import globalAxios from 'axios'

import router from '../router/index'
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession
} from 'amazon-cognito-identity-js'


Vue.use(Vuex)

const POOL_DATA = {
  UserPoolId: 'us-east-2_LA3rFIuz0',
  ClientId: '7cn1elb75rhrsr8bsvj3sekjmu'
}

const userPool = new CognitoUserPool(POOL_DATA);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    storeUser(state, user) {
      state.user = user
    },
    clearAuthData(state) {
      console.log('---');
      state.idToken = null;
      state.userId = null;
    }
  },
  actions: {
    setLogoutTimer({ commit }, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData');
      }, expirationTime * 1000);
    },
    signup({ commit, dispatch }, authData) {
      axios.post('/signupNewUser?key=AIzaSyBQpS8Ag4RQhf9LKYMy3QyivL7D8dX7tAE', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res);
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          });
          const now = new Date();
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
          localStorage.setItem('token', res.data.idToken);
          localStorage.setItem('userId', res.data.localId);
          localStorage.setItem('expirationDate', expirationDate);
          dispatch('storeUser', authData);
          dispatch('setLogoutTimer', res.data.expiresIn);
        })
        .catch(err => console.log(err));
    },
    signupAWS({ commit, dispatch }, authData) {
      const user = {
        username: authData.username,
        email: authData.email,
        password: authData.password
      }
      const attrList = [];
      const emailAttributes = {
        Name: 'email',
        Value: authData.email
      }
      attrList.push(new CognitoUserAttribute(emailAttributes));

      userPool.signUp(user.username, user.password, attrList, null, function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        const registeredUser = result.user;
        console.log('user name is ' + registeredUser.getUsername());
      });
      return;
    },
    confirmUserAWS({ commit, dispatch }, confirmData) {
      const userData = {
        Username: confirmData.username,
        Pool: userPool
      };
      const cognitoUser = new CognitoUser(userData);
      cognitoUser.confirmRegistration(confirmData.code, true, function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        console.log('call result: ' + result);
      });
      router.replace('/signin');
    },
    login({ commit, dispatch }, authData) {
      axios.post('/verifyPassword?key=AIzaSyBQpS8Ag4RQhf9LKYMy3QyivL7D8dX7tAE', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
          console.log(res.data.localId)
          console.log(expirationDate)
          console.log(res.data.idToken)
          localStorage.setItem('token', res.data.idToken);
          localStorage.setItem('userId', res.data.localId);
          localStorage.setItem('expirationDate', expirationDate);
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          });
          dispatch('setLogoutTimer', res.data.expiresIn);
        })
        .catch(err => console.log(err));
    },
    loginAWS({ commit, dispatch }, authData) {
      console.log(authData);
      const tempData = {
        Username: 'huiquan',
        Password: 'zhang123'
      };
      const authDetails = new AuthenticationDetails(tempData);
      console.log(authDetails);
      const userData = {
        Username: 'huiquan',
        Pool: userPool
      }
      console.log(userData);

      const cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: function (result) {
          var accessToken = result.getAccessToken().getJwtToken();
          var backendId= result.getAccessToken().payload.sub;
          var unixTime= result.getAccessToken().payload.exp;
          const now = new Date();
          const expirationDate = new Date(unixTime * 1000);
          const loTime = expirationDate.toLocaleString();
          console.log(expirationDate);
          console.log(loTime);
          console.log(result);
          console.log(accessToken);
          console.log(backendId);
          console.log(backendId);
          localStorage.setItem('token', accessToken);
          localStorage.setItem('userId', backendId);
          localStorage.setItem('expirationDate', expirationDate);
          commit('authUser', {
            token: accessToken,
            userId: backendId
          });
          dispatch('setLogoutTimer', 3600);
        },
        onFailure: function (err) {
          alert(err.message || JSON.stringify(err));
        },
      });
    },
    tryAutoLogin({ commit }) {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const expirationDate = localStorage.getItem('expirationDate');
      const now = new Date();
      if (now >= expirationDate) {
        return;
      }
      const userId = localStorage.getItem('userId');
      commit('authUser', {
        token: token,
        userId: userId
      })
    },
    logout({ commit }) {
      console.log('lalalal');
      commit('clearAuthData');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('expirationDate');
      router.replace('/signin');

    },
    resetPassword({ commit, dispatch }, resetData) {
      const userData = {
        Username: resetData.username,
        Pool: userPool
      };
      console.log('username' + resetData.username);
      const cognitoUser = new CognitoUser(userData);
      console.log('cognitoUser' + cognitoUser);
      cognitoUser.forgotPassword({
        onSuccess: function (data) {
          // successfully initiated reset password request
          console.log('CodeDeliveryData from forgotPassword: ' + data);
        },
        onFailure: function (err) {
          alert(err.message || JSON.stringify(err));
        },
        //Optional automatic callback
        inputVerificationCode: function (data) {
          console.log('Code sent to: ' + data);
          var verificationCode = '011240';
          var newPassword = 'zhang123';
          cognitoUser.confirmPassword(verificationCode, newPassword, {
            onSuccess() {
              console.log('Password confirmed!');
            },
            onFailure(err) {
              console.log('Password not confirmed!');
            }
          });
        }
      });
    },
    getAuthenticatedUser() {
      return userPool.getCurrentUser();
    },
    isAuthenticated() {
      // const user = this.getAuthenticatedUser();
      const user = userPool.getCurrentUser();
      if (!user) {

      } else {
        user.getSession((err, session) => {
          if (err) {

          } else {
            if (session.isValid()) {
              console.log('success')
            } else {

            }
          }
        });
      }
    },
    storeUser({ commit, state }, userData) {
      if (!state.idToken) {
        return;
      }
      globalAxios.post('/user.json' + '?auth=' + state.idToken, userData).then(res => console.log(res)).catch(err => console.log(err));
    },
    fetchUser({ commit, state }) {
      if (!state.idToken) {
        return;
      }
      globalAxios.get('/user.json' + '?auth=' + state.idToken)
        .then(res => {
          console.log(res);
          const data = res.data;
          const users = [];
          for (let key in data) {
            const user = data[key];
            user.id = key;
            users.push(user);
          }
          console.log(users);
          // this.email=users[0].email;
          commit('storeUser', users[0])
        })
        .catch(err => console.log(err));
    },
    postTest({ commit, state }, userData){
      userPool.getCurrentUser().getSession((err,session)=>{
        if(err){
          return;
        }
        globalAxios.post('https://un73a1rrib.execute-api.us-east-2.amazonaws.com/demo-stage/cedsi', 
        {
          id:'user-2',
          title:'title-2',
          description:'des-2'
        },{
          headers:{
            'Authorization':session.getIdToken().getJwtToken()
          }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
      });
      
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.idToken !== null
    }
  }
})