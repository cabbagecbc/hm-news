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
// 全局的把vant所有的组件都导入好了
Vue.use(Vant)
// 手动按需导入
// import Button from 'vant/lib/button'
// import 'vant/lib/button/style'
// Vue.use(Button)
// 关闭控制台的提示消息
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
