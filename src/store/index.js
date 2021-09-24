import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations' //mutations变量不能改
import actions from './action'//actions,注意带s
Vue.use(Vuex);

const state = {
    username: '',
    cartCount: 0
}

export default new Vuex.Store({//简写变量不能随意改的
    state,
    mutations,
    actions
})