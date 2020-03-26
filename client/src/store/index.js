import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth'
import notification from '@/store/modules/notification'
import project from '@/store/modules/project'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    auth,
    notification,
    project
  }
})
