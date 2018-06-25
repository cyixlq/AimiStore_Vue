const state = {
  goods: []
}

const getters = {
  goodsInfo (state, goodsId) {
    for (let i in state.goods) {
      if (state.goods[i].goodsId === goodsId) {
        return {
          goodsId: state.goods[i].goodsId,
          goodsName: state.goods[i].goodsName,
          goodsImg: state.goods[i].goodsImg
        }
      }
    }
  },
  goodsNum (state) {
    return state.goods.length
  }
}

const actions = {
  addGoodsAction ({ commit }, goodsInfo) {
    commit('addGoods', goodsInfo)
  }
}

const mutations = {
  addGoods (state, goodsInfo) {
    state.goods.push(goodsInfo)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
