import Vue from 'vue'
import VueX from 'vuex'
import creatLogger from 'vuex/dist/logger'
import * as actions from './aciton'
import * as getters from './getter'
import mutations from './mutations'
import state from './states'

Vue.use(VueX)

const debug = process.env.NODE_ENV !== 'production'

export default new VueX.Store({
  actions,
  getters,
  mutations,
  state,
  strict: debug,
  plugins: debug ? [creatLogger()] : []

})
