import instance from '@/api/api.js'

export const getHomeBanners = function () {
  return instance.get('/buyer/home/banners')
}

export const getMenuData = function (id) {
  return instance.get('/buyer/category/' + id)
}

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
