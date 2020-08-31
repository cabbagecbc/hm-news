<template>
  <div class="user">
    <div class="header" @click="$router.push('/user-edit')">
      <div class="avatar">
        <!-- 路径要拼成绝对路径 -->
        <img :src="base + user.head_img" alt="">
      </div>
      <div class="info">
        <div class="name">
          <span v-if="user.gender === 0" class="iconfont iconxingbienv"></span>
          <span v-else class="iconfont iconxingbienan"></span>
          <!-- 性别第二种写法 -->
          <!-- <span class="iconfont" :class="user.gender ===1 ? 'iconxingbienan' : 'iconxingbienv'"></span> -->
          <span>{{user.nickname}}</span>
        </div>
        <div class="time">{{user.create_date | time}}</div>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <!-- 导航条 -->
    <hm-navitem  to="/follow">
      <template>我的关注</template>
      <template #content>关注的用户</template>
    </hm-navitem>
    <hm-navitem>
      <template>我的跟帖</template>
      <template #content>回复/回复</template>
    </hm-navitem>
    <hm-navitem>
      <template>我的作品</template>
      <template #content>文章/视频</template>
    </hm-navitem>
    <hm-navitem>
      <template>我的收藏</template>
      <template #content>文章/视频</template>
    </hm-navitem>
    <hm-navitem  to="/user-edit">设置</hm-navitem>
    <div style="margin: 15px;">
      <van-button type="info" block @click="logout">退出</van-button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    base() {
      return this.$axios.defaults.baseURL
    }
  },
  data() {
    return {
      user: ''
    }
  },
  async created() {
    // token必须放到请求头中 请求头:Authorization
    const userId = localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${userId}`)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
    }
    // main.js文件里已经提示了用户信息验证失败
    // else if (statusCode === 401) {
    //   this.$toast('用户验证失败')
    //   this.$router.push('/login')
    //   localStorage.removeItem('token')
    //   localStorage.removeItem('userId')
    // }
  },
  methods: {
    async logout() {
      try {
        // console.log('123')
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '确定要退出吗'
        })
      } catch {
        return this.$toast('取消退出')
      }
      // console.log('确定')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$router.push('/login')
      this.$toast('退出成功')
    }
  }
}
</script>

<style lang="less" scoped>
.user{
  .header{
    display: flex;
    padding: 30px 10px;
    border-bottom: 3px solid #ddd;
    .avatar{
      width: 70px;
      height: 70px;
      border-radius: 50px;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .info{
      flex: 1;
      padding-top:10px;
      padding-left: 30px;
      font-size: 14px;
      .time{
        margin-top: 10px;
        color: #888;
      }
      .iconxingbienv{
        color: tomato;
      }
      .iconxingbienan{
        color: aquamarine;
      }
    }
  }
}
</style>
