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
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 引入axios
import axios from 'axios'
export default {
  methods: {
    async login() {
      const res = await axios.post('http://localhost:3000/login', {
        username: this.username,
        password: this.password
      })
      // console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        // 在组件中必须使用体会this.$toast
        this.$toast.success(message)
        // 保存token
        // 跳转页面
        this.$router.push('/user')
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

<style lang='less'>
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
</style>
