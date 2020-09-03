/* 处理axios发送请求 */
import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import { Toast } from 'vant'

// 把axios挂载到原型链上去
Vue.prototype.$axios = axios
// 给axios配置默认的baseURL，基准地址
const URL = 'http://localhost:3000'
axios.defaults.baseURL = URL
Vue.prototype.$base = URL

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
  // config是请求的配置信息
  // console.log('拦截了请求信息', config)
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
// 添加响应拦截器
axios.interceptors.response.use(function(response) {
  console.log('拦截了响应', response)
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // 跳转登录页面
    router.push('/login')
    // 清除失效信息
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    // 给提示-用户信息验证失败
    Toast.fail('登录信息失效')
  }
  return response
})
Vue.prototype.$url = function(url) {
  if (url.startsWith('http')) {
    // 网络图片
    return url
  } else {
    return URL + url
  }
}
