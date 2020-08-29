<template>
  <div>
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <!-- 登录表单 -->
    <van-form @submit="login">
      <van-field
        v-model="username"
        name="用户名"
        label="账号"
        placeholder="请输入你的账号"
        :rules="rules.username"/>
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="rules.password"/>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
      <p class="tips">还没账号？去<router-link to="/register">注册</router-link></p>
    </van-form>
  </div>
</template>

<script>
// 引入axios,放送登录请求
// 因为已经在main.js文件里面将axios挂载了，所以此处不需要再引入
// import axios from 'axios'
export default {
  created() {
    // const { username, password } = this.$route.query
    // 传参时用到params就要改成params
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
  },
  methods: {
    async login() {
      // 因为在main.js文件里面提供了axios的基准地址，所以此处可以不用 'http://localhost:3000'
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      // console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        // 在组件中必须使用体会this.$toast
        this.$toast.success(message)
        // 保存token
        // 跳转到个人中心页面
        this.$router.push({
          path: '/user'
        })
      } else {
        this.$toast.fail(message)
      }
    }
  },
  data() {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名长度为5-11位数', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'onChange' },
          { pattern: /^\d{3,6}$/, message: '密码长度为3-6位数', trigger: 'onChange' }
        ]
      }
    }
  }
}
</script>

<style lang='less' scoped>
// lang: 用于指定css语言 lang="less scss css"
// scoped: 作用域 只要当前组件的样式带了scoped,那这个样式只会在当前组件生效
.hm-header{
  height: 50px;
  border-bottom:1px solid #ccc;
  display: flex;
  line-height: 50px;
  text-align:center;
  .back,
  .extra{
    width: 50px;
    }
  .iconfont{
    font-size:18px;
  }
  .title{
    flex:1;
    font-size:18px;
    font-weight:700
      }
    }
  .tips{
    padding: 15px;
    font-size: 16px;
    text-align:right;
  }
</style>
