import { axios } from '@/plugins/axios'

const state = {
  currentUser: null
}

const mutations = {
  LOGOUT (state) {
    state.currentUser = null
  },
  SET_AUTHENTICATE_USER (state, user) {
    state.currentUser = user
  }
}

const actions = {
  async getCurrentUser ({ commit }) {
    console.log('getCurrentUser')
    try {
      const user = await axios.get('me')
      commit('SET_AUTHENTICATE_USER', user)
    } catch (e) {
      throw e
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
