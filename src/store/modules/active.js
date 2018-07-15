const state = {
  active: 0
}

const getters = {
  indexActive (state, getters) {
    return state.active
  }
}

const actions = {
  changeActive ({ commit, state }, index) {
    commit('commitActive', index)
  }
}

const mutations = {
  commitActive (state, index) {
    state.active = index
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
