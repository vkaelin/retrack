import { axios } from '@/plugins/axios'

const state = {
  projects: []
}

const mutations = {
  UPDATE_PROJECTS (state, projects) {
    state.projects = projects
  }
}

const actions = {
  async deleteAll ({ commit }) {
    commit('UPDATE_PROJECTS', [])
  },
  async get ({ commit }) {
    const resp = await axios.get('projects').catch(e => console.log(e))
    commit('UPDATE_PROJECTS', resp.data)
  }
}

const getters = {
  projectsLoaded: state => state.projects.length !== 0
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
