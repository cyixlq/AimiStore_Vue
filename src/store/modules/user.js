import { signIn } from '@/api/apiServices'

const state = {
  token: '',
  username: ''
}

const getters = {
  userToken (state, getters) {
    return state.token
  },
  userName (state, getters) {
    return state.username
  }
}

const actions = {
  signInAction ({ commit, state }, userInfo) {
    const username = userInfo.username.trim()
    const password = userInfo.password.trim()
    let data = new FormData()
    data.append('username', username)
    data.append('password', password)
    return new Promise((resolve, reject) => {
      signIn(data).then((response) => {
        if (response.status === 200) {
          let userInfoSigned = {
            token: response.data.token,
            username: response.data.username
          }
          commit('setUserInfo', userInfoSigned)
          resolve(response)
        } else {
          reject(response.msg)
        }
      }).catch(error => { reject(error) })
    })
  }
}

const mutations = {
  setUserInfo (state, userInfo) {
    state.token = userInfo.token
    state.username = userInfo.username
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
