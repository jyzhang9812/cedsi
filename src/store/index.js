import Vue from 'vue';
import Vuex from 'vuex';
import VueLocalStorage from 'vue-localstorage';

Vue.use(VueLocalStorage);

Vue.use(Vuex);
//const url = '../../assets/images/'

export const store =new Vuex.Store({
    state:{
        url:'../../../static/images/'
    },
    mutations:{
    },
    getters:{},
    actions:{},
})

// export default store