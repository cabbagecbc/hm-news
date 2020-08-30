import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'uaer' }
]

const router = new VueRouter({
  routes
})

// 配置全局的导航守卫
// to表示到哪去
// from表示从哪来
// next表示放行
// 判断to的path是否是/user 个人中心
// 1.不是去个人中心 next()
// 2.是去个人中心 判断是否有token
// 有token，next（）
// 没有token login
router.beforeEach(function(to, from, next) {
// 只要路由发生跳转,跳转之前这个函数就要执行
// console.log('to', to)
// console.log('from', from)
  if (to.name === 'user') {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})

export default router
