<template>
  <div class="user-edit">
    <hm-header>编辑资料</hm-header>
    <!-- 头像 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + user.head_img" alt="">
    </div>
    <!-- 导航 -->
    <hm-navitem @click="showNickname">
      <template>昵称</template>
      <template #content>{{user.nickname}}</template>
    </hm-navitem>
    <hm-navitem @click="showPassword">
      <template>密码</template>
      <template #content>******</template>
    </hm-navitem>
    <hm-navitem @click="showGender">
      <template>性别</template>
      <template #content>{{ user.gender === 1 ? '男':'女' }}</template>
    </hm-navitem>

    <!-- 渲染dialog组件 -->
    <van-dialog v-model="isShowNickname" title="编辑昵称" show-cancel-button @confirm="updateNickname">
      <van-field v-model="nickname" placeholder="请输入用户名" />
    </van-dialog>
    <van-dialog v-model="isShowPassword" title="修改密码" show-cancel-button @confirm="updatePassword">
      <van-field v-model="password" placeholder="请输入密码" />
    </van-dialog>
    <van-dialog v-model="isShowGender" title="修改性别" show-cancel-button @confirm="updateGender">
      <!-- <van-radio-group v-model="gender">
        <van-radio :name="1">男</van-radio>
        <van-radio :name="0">女</van-radio>
      </van-radio-group> -->
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: '',
      isShowNickname: false,
      nickname: '',
      isShowPassword: false,
      password: '',
      isShowGender: false,
      gender: 1
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      // 在送请求，获取个人信息
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    },
    showNickname() {
      // console.log('123')
      this.isShowNickname = true
      this.nickname = this.user.nickname
    },
    async updateUser(data) {
      // console.log('123')
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      // console.log(res.data)
      if (res.data.statusCode === 200) {
        // 重新渲染
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    async updateNickname() {
      // console.log('123')
      // const userId = localStorage.getItem('userId')
      // const res = await this.$axios.post(`/user_update/${userId}`, {
      //   nickname: this.nickname
      // })
      // // console.log(res.data)
      // if (res.data.statusCode === 200) {
      //   // 重新渲染
      //   this.getUserInfo()
      //   this.$toast.success('修改成功')
      // }
      this.updateUser({
        nickname: this.nickname
      })
    },
    showPassword() {
      this.isShowPassword = true
      this.password = this.user.password
    },
    async updatePassword() {
      // console.log('123')
      // const userId = localStorage.getItem('userId')
      // const res = await this.$axios.post(`/user_update/${userId}`, {
      //   password: this.password
      // })
      // // console.log(res.data)
      // if (res.data.statusCode === 200) {
      //   // 重新渲染
      //   this.getUserInfo()
      //   this.$toast.success('修改成功')
      // }
      this.updateUser({
        password: this.password
      })
    },
    showGender() {
      this.isShowGender = true
      this.gender = this.user.gender
    },
    updateGender() {
      this.updateUser({
        gender: this.gender
      })
    }

  }
}
</script>

<style lang="less" scoped>
// 1. 给当前组件的所有样式的选择器添加一个属性选择器  .avatar  .avatar[data-v-xxxx] .van-dialog__content .van-dialog__content[data-v-xxxx]
// 2. 给当前组件的模板中所有的元素添加上一个属性,不包括 动态生成的  data-v-xxxx

.avatar {
  padding: 40px 0;
  text-align: center;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
/*
  深度作用选择器的三种写法
  >>>  css的写法
  /deep/  less的写法
  ::v-deep  scss的写法
*/
/deep/ .van-dialog__content {
  padding: 15px !important;
  .van-field {
    border: 1px solid #ccc;
  }
}
</style>
