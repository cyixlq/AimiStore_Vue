import { getShoppingCart, addCart } from '../../api/apiServices'

const state = {
  cart: []
}

const getters = {
  getAllCart (state) {
    return state.cart
  },
  getCartCount (state) {
    return state.cart.length
  }
}

/*
cartInfo数据格式如下
{
    "number": 2,
    "productSpecVo": {
        "id": "7",
        "image": "1",
        "name": "2+128G",
        "price": 5299
    },
    "productTitle": "【低至4298元起】Apple/苹果 iPhone 8 64G 全网通4G手机 苹果8"
}
 */

const actions = {
  /*
    这里的data的数据格式,可以直接commit，不需要再次封装
    {
      goodsId: '21',
      username: 'hu',
      cartInfo: {
        "number": 2,
        "productSpecVo": {
          "id": "7",
          "image": "1",
          "name": "2+128G",
          "price": 5299
        },
        "productTitle": "【低至4298元起】Apple/苹果 iPhone 8 64G 全网通4G手机 苹果8"
      }
    }
   */
  addCartItem ({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      let itemData = new FormData()
      itemData.append('productSpecId', data.cartInfo.productSpecVo.id)
      itemData.append('count', data.cartInfo.number)
      addCart(data.username, itemData).then(res => {
        if (res.status === 200) {
          resolve('添加成功，在购物车等亲哦！')
          commit('commitCartItem', data)
        } else {
          reject(new Error('添加失败！服务端错误！'))
        }
      }).catch(err => reject(err))
    })
  },
  pushAllCart ({ commit, state }, username) {
    return new Promise((resolve, reject) => {
      getShoppingCart(username).then(res => {
        commit('commitAllCart', res.data)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  optSkuNum ({ commit, state }, data) {
    commit('commitSkuNum', data)
  }
}

const mutations = {
  /*
    这里的data的数据格式
    {
      goodsId: '21',
      cartInfo: {
        "number": 2,
        "productSpecVo": {
          "id": "7",
          "image": "1",
          "name": "2+128G",
          "price": 5299
        },
        "productTitle": "【低至4298元起】Apple/苹果 iPhone 8 64G 全网通4G手机 苹果8"
      }
    }
   */
  commitCartItem (state, data) {
    var isFind = false
    for (let i in state.cart) {
      if (state.cart[i].productId === data.goodsId) {
        for (let j in state.cart[i].cartBos) {
          if (state.cart[i].cartBos[j].productSpecVo.id === data.cartInfo.productSpecVo.id) {
            state.cart[i].cartBos[j].number += data.cartInfo.number
          } else {
            state.cart[i].cartBos.push(data.cartInfo)
          }
        }
        isFind = true
      }
    }
    if (!isFind) {
      let cartItem = {
        cartBos: [data.cartInfo],
        productId: data.goodsId,
        productName: data.goodsName
      }
      state.cart.push(cartItem)
    }
  },
  commitAllCart (state, allCartInfo) {
    state.cart = allCartInfo
  },
  commitSkuNum (state, data) {
    for (let i in state.cart) {
      if (state.cart[i].productId === data.goodsId) {
        for (let j in state.cart[i].cartBos) {
          if (state.cart[i].cartBos[j].productSpecVo.id === data.skuId) {
            if (data.isAdd) {
              state.cart[i].cartBos[j].number++
              break
            } else {
              if (state.cart[i].cartBos[j].number > 1) {
                state.cart[i].cartBos[j].number--
                break
              }
            }
          }
        }
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
