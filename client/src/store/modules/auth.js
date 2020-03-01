import { axios } from '@/plugins/axios'

const state = {
  currentUser: null,
  userChecked: false
}

const mutations = {
  CHECKED_USER (state) {
    state.userChecked = false
  },
  LOGOUT (state) {
    state.currentUser = null
    state.userChecked = false
  },
  SET_AUTHENTICATE_USER (state, user) {
    state.currentUser = user
    state.userChecked = true
  }
}

const actions = {
  async getCurrentUser ({ commit }) {
    console.log('getCurrentUser')
    try {
      const user = await axios.get('me')
      commit('SET_AUTHENTICATE_USER', user.data)
    } catch (e) {
      commit('CHECKED_USER')
      throw e
    }
  }
}

const getters = {
  logged: state => state.currentUser !== null
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
