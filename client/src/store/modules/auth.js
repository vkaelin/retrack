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
  },
  UPDATE_SETTINGS (state, form) {
    state.currentUser.company = form.company
    state.currentUser.street = form.street
    state.currentUser.city = form.city
    state.currentUser.country = form.country
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
  async login ({ commit }, { email, password, remember }) {
    try {
      const user = await axios.post('sessions', { uid: email, password, remember })
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
  },
  async register ({ commit }, form) {
    try {
      const user = await axios.post('users', form)
      commit('SET_AUTHENTICATE_USER', user.data.user)
    } catch (e) {
      throw e
    }
  },
  updateSettings ({ commit }, form) {
    commit('UPDATE_SETTINGS', form)
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
