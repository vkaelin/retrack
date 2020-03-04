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
      commit('SET_AUTHENTICATE_USER', user.data)
    } catch (e) { }
  },
  async login ({ commit }, { uid, password }) {
    try {
      const user = await axios.post('sessions', { uid, password })
      commit('SET_AUTHENTICATE_USER', user.data)
    } catch (e) {
      throw e
    }
  },
  async logout ({ commit }) {
    try {
      await axios.delete('sessions')

      commit('LOGOUT')
    } catch (e) {
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
