<template>
  <div class="user">
    <div class="header">
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
    <hm-navitem  to="/edit">
      <template>设置</template>
      <template #content></template>
    </hm-navitem>
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
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${userId}`, {
      headers: {
        Authorization: token
      }
    })
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
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
