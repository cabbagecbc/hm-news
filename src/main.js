import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入通用样式
import './style/base.less'
// 引入字体图标
import './style/iconfont.css'
// 全局导入
// 导入vant
import Vant from 'vant'
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
