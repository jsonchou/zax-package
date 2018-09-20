import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import state from './state'

import getters from './getters'
import actions from './actions'

Vue.use(Vuex);

/** 警告
 ** 所有store变量名称，mutation-types必须严格遵守一一匹配格式
 **/

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
})