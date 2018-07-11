import instance from '@/api/api.js'

/*
  首页相关接口
 */
export const getHomeBanners = function () {
  return instance.get('/buyer/home/banners')
}

export const getHomeProducts = function () {
  return instance.get('/buyer/home/other')
}

/*
  分类相关接口
 */
export const getMenuData = function (id) {
  return instance.get('/buyer/category/' + id)
}

/*
  登录注册相关接口
 */
export const signIn = function (data) {
  return instance.post('/buyer/login', data)
}

export const signUp = function (userInfo) {
  return instance.post('/buyer/u', userInfo)
}

export const checkUserName = function (username) {
  return instance.get('/buyer/u/valid?username=' + username)
}

export const checkPhone = function (phone) {
  return instance.get('/buyer/u/valid?phone=' + phone)
}

/*
  地址相关接口
 */
export const getAddressList = function (username) {
  return instance.get('/buyer/address?username=' + username)
}

export const addAddress = function (username, addressInfo) {
  return instance.post('/buyer/address/' + username, addressInfo)
}

export const updateAddress = function (username, addressInfo) {
  return instance.put('/buyer/address/' + username, addressInfo)
}

export const deleteAddress = function (addressId) {
  return instance.delete('/buyer/address/' + addressId)
}

export const findAddressById = function (addressId) {
  return instance.get('/buyer/address/' + addressId)
}

/*
  商品详情相关接口
 */
export const findBoodsById = function (goodsId) {
  return instance.get('/buyer/product/' + goodsId)
}

/*
  购物车相关接口
 */
export const getShoppingCart = function (username) {
  return instance.get('/buyer/cart/' + username)
}

export const addCart = function (username, skuInfo) {
  return instance.post('/buyer/cart/' + username, skuInfo)
}
