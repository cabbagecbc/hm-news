<template>
<div >
  <hm-header>注册</hm-header>
  <hm-logo></hm-logo>
  <!-- 注册表单 -->
    <van-form @submit="register">
      <van-field
        v-model="user.username"
        name="用户名"
        label="账号"
        placeholder="请输入账号"
        :rules="rules.username"/>
        <van-field
        v-model="user.nickname"
        label="昵称"
        placeholder="请输入昵称"
        :rules="rules.nickname"/>
      <van-field
        v-model="user.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="rules.password"/>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          注册
        </van-button>
      </div>
      <p class="tips">已有帐号？去<router-link to="/login">登录</router-link></p>
    </van-form>
</div>
</template>

<script>
// 注册请求发送
// 因为main.js里面已经将axios挂载到原型链上，所以此处不需要再引入
// import axios from 'axios'
export default {
  data() {
    return {
      user: {
        username: '',
        nickname: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名长度为5-11位数', trigger: 'onChange' }
        ],
        nickname: [
          { required: true, message: '输入昵称', trigger: 'onChange' },
          { pattern: /^[\4e00-\u9fa5]{2,6}$/, message: '昵称必须时2-6位的中文', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'onChange' },
          { pattern: /^\d{3,6}$/, message: '密码长度为3-6位数', trigger: 'onChange' }
        ]
      }
    }
  },
  methods: {
    async register() {
      // console.log('注册')
      // 因为在main.js文件里面提供了axios的基准地址，所以此处可以不用 'http://localhost:3000'
      const res = await this.$axios.post('/register', this.user)
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        // 在组件中必须使用体会this.$toast
        this.$toast.success(message)
        // 保存token
        // 跳转页面
        this.$router.push('/login')
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style></style>
