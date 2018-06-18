import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Dialog } from 'vant'

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000
})

instance.interceptors.request.use(
  config => {
    if (store.state.user.token) {
      let token = store.state.user.token
      config.headers.Authorization = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status === 200) {
      return res
    } else {
      if (res.status === 401) {
        Dialog.confirm({
          title: '注意',
          message: '您还没有登录或者身份已经过期，无法访问当前路径！请前往登录'
        }).then(() => {
          // on confirm
          router.push('/login')
        })
      }
      return res
    }
  },
  error => {
    Dialog.alert({
      title: '错误',
      message: error.message
    })
    return Promise.reject(error)
  }
)

export default instance
