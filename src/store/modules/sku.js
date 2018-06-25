const state = {
  sku: []
}

const getters = {
  // 根据商品ID来获取购物车中对应的sku集合
  /*
    {
      goodsId: '',
      skuId: '',
      num: ''
    }
   */
  skuInfo (state, goodsId) {
    for (let i in state.goods) {
      let list = []
      if (state.sku[i].goodsId === goodsId) {
        list.push(state.sku[i])
      }
    }
    return list
  }
}

const actions = {
  addSkuAction ({ commit, state }, skuInfo) {
    commit('addGoods', skuInfo)
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
