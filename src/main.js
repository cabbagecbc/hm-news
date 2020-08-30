import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入通用样式
import './style/base.less'
// 引入字体图标
import './style/iconfont.css'
// 全局导入
// 导入vant
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'
// 导入amfe-flexible
import 'amfe-flexible'
// 导入全局组件
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
import HmNavItem from './components/HmNavItem.vue'
import axios from 'axios'
import moment from 'moment'

// 把axios挂载到原型链上去
Vue.prototype.$axios = axios
// 给axios配置默认的baseURL，基准地址
axios.defaults.baseURL = 'http://localhost:3000'

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

// 定义全局过滤器
Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})

Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-navitem', HmNavItem)
// 全局的把vant所有的组件都导入好了
Vue.use(Vant)

// 关闭控制台的提示消息
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
