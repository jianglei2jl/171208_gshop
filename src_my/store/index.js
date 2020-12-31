/**
 * vuex核心管理模块
 */

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
export default new Vuex.Store({ //默认向外暴露一个store配置对象
    state, //状态对象
    mutations, //直接更新状态的对象
    actions, //间接更新状态的对象，组件dispatch给它，然后它通过commit给mutations
    getters //包含多个计算属性的对象
})