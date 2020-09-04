import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import User from '../views/user/User.vue'
import UserEdit from '../views/user/UserEdit.vue'
import Demo from '../views/user/Demo.vue'
import MyFollow from '../views/user/MyFollow.vue'
import Mycomment from '../views/user/MyComment.vue'
import MyStar from '../views/user/MyStar.vue'
// 自己加的作品页面
import MyZuopin from '../views/user/MyZuopin.vue'
import Index from '../views/news/Index.vue'
import Manage from '../views/news/Manage.vue'
import PostDetail from '../views/news/PostDetail.vue'

Vue.use(VueRouter)

const routes = [
  // { path: '/', component: Login, name: 'login' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'uaer' },
  { path: '/user-edit', component: UserEdit, name: 'user-edit' },
  { path: '/demo', component: Demo },
  { path: '/myfollow', component: MyFollow, name: 'myfollow' },
  { path: '/mycomment', component: Mycomment, name: 'mycomment' },
  { path: '/mystar', component: MyStar, name: 'mystar' },
  { path: '/myzuopin', component: MyZuopin, name: 'myzuopin' },
  { path: '/', component: Index, name: 'index' },
  { path: '/manage', component: Manage, name: 'manage' },
  { path: '/post-detail/:id', component: PostDetail, name: 'post-detail' }
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
  // if (to.name === 'user') {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     next()
  //   } else {
  //     router.push('/login')
  //   }
  // } else {
  //   next()
  // }
  const token = localStorage.getItem('token')
  // 需要拦截的所有页面
  const authUrls = ['/user', '/user-edit', '/myfollow', '/mystar', '/myzuopin']
  if (!authUrls.includes(to.path) || token) {
    next()
  } else {
    router.push('/login')
  }
})

export default router
