import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入通用样式
import './style/base.less'
// 引入字体图标
import './style/iconfont.css'

// 导入amfe-flexible
import 'amfe-flexible'
// 导入全局组件
import './utils/global'
// 导入全局axios请求
import './utils/request'
// 导入全局过滤器
import './utils/filters'
// 导入全局vant
import './utils/vant'

// 关闭控制台的提示消息
Vue.config.productionTip = false

window.vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
