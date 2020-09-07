<template>
  <div class="post-detail">
    <div class="header">
      <div class="left">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew" @click="$router.back()"></span>
      </div>
      <!-- 右边关注 -->
      <div class="right">
        <div class="followed" v-if="post.has_follow" @click="unfollow">已关注</div>
        <div class="follow" v-else @click="follow">关注</div>
      </div>
    </div>
    <!-- 文章详情 -->
    <div class="content">
      <div class="title">{{post.title}}</div>
      <div class="name">
        <span>{{post.user.nickname}}</span>
        <span>{{post.create_date | time}}</span>
      </div>
      <div class="info" v-if="post.type===1" v-html="post.content"></div>
      <video v-else :src="getUrl(post.content)" controls autoplay muted></video>
      <!-- 点赞和分享 -->
      <div class="buttons">
        <div class="good" :class="{active: post.has_like}" @click="like">
          <span class="iconfont icondianzan"></span>
          <span>{{post.like_length || 0}}</span>
        </div>
        <div class="share">
          <span class="iconfont iconweixin"></span>
          <span>微信</span>
        </div>
      </div>
    </div>
    <!-- 评论区域 -->
    <div class="comment-list">
      <h3>精彩回帖</h3>
      <hm-comment
      :comment="comment"
      v-for="comment in commentList"
      :key="comment.id"
      @reply="onReply"
      ></hm-comment>
    </div>
    <!-- 底部区域 -->
    <div class="footer-textarea" v-if="isShowTextarea">
      <textarea ref="textarea" :placeholder="'回复：' + nickname" v-model="content"></textarea>
      <van-button class="send" type="danger" @click="publish">发送</van-button>
    </div>
    <div class="footer-input" v-else>
      <div class="search">
        <input type="text" placeholder="回复" @focus="onFocus">
      </div>
      <span class="iconfont iconpinglun-"><i>20</i></span>
      <span class="iconfont iconshoucang" :class="{now: post.has_star}" @click="star"></span>
      <span class="iconfont iconfenxiang"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        user: {}
      },
      commentList: [],
      isShowTextarea: false,
      content: '',
      nickname: '',
      replyId: ''
    }
  },
  created() {
    this.getInfo()
    this.getCommentList()
  },
  methods: {
    // 判断用户是否登录,登录则跳回该页面
    noLogin() {
      // 判断是否登录
      const token = localStorage.getItem('token')
      if (!token) {
        // 若是没有登陆了就要跳转到登录再跳转回来
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        return true
      } else {
        // 若是登录
        return false
      }
    },
    // 获取文章详情
    async getInfo() {
      // 此处需要每篇文章的id
      const { id } = this.$route.params
      const res = await this.$axios.get(`/post/${id}`)
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
        console.log(this.post)
      }
    },
    // 获取视频详情地址
    getUrl(url) {
      // 获取标签中的内容
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
      // innerText抽取标签里的内容
      // innerHTML包含标签
    },
    // 点击关注判断用户是否登录
    async follow() {
      // 判断是否登录，登录则直接关注，没登录则需要跳转到登录页面后用户登录再跳转回文章详情页面
      const token = localStorage.getItem('token')
      if (!token) {
        // 没有token意味着没有登录
        this.$router.push({
          parh: '/login',
          query: {
            back: true
          }
        })
        return
      }
      // 有token则直接关注，发送ajax请求
      const res = await this.$axios.get(`/user_follows/${this.post.user.id}`)
      console.log(res.data)
      if (res.data.statusCode === 200) {
        this.$toast.success('已关注')
        this.getInfo()
      }
    },
    // 取消关注
    async unfollow() {
      const res = await this.$axios.get(`/user_unfollow/${this.post.user.id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('取消关注成功')
        this.getInfo()
      }
    },
    // 判断是否登录，进行点赞
    async like() {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/post_like/${this.post.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    // 收藏
    async star() {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/post_star/${this.post.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    // 获取文章评论列表
    async getCommentList() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        console.log(this.commentList)
      }
    },
    // 显示文本域（评论回复框）
    async onFocus() {
      this.isShowTextarea = true
      // 让textarea自动获取焦点
      await this.$nextTick()
      // console.log(this.$refs.textarea)
      this.$refs.textarea.focus()
    },
    // 发表评论
    async publish() {
      const res = await this.$axios.post(`/post_comment/${this.post.id}`, {
        content: this.content,
        parent_id: this.replyId
      })
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getCommentList()
        this.content = ''
        this.replyId = ''
        this.nickname = ''
        this.isShowTextarea = false
      }
    },
    // 将id和nickname传给父组件
    async onReply(id, nickname) {
      console.log('父组件', id, nickname)
      this.isShowTextarea = true
      // 自动获取焦点
      await this.$nextTick()
      this.$refs.textarea.focus()
      // 回显nickname
      this.nickname = '@' + nickname
      this.replyId = id
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  height: 50px;
  align-items: center;
  .left {
    span {
      line-height: 50px;
    }
  }
  .center {
    flex: 1;
    span {
      font-size:70px;
    }
  }
  .right {
    font-size: 14px;
    div {
      width: 60px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 15px;
    }
    .followed {
      border: 1px solid #ccc;

    }
    .follow {
      color: #fff;
      background-color: #f00;
    }
  }
}
.content {
  padding: 10px;
  border-bottom: 3px solid #ccc;
  .title {
    font-weight: 700;
    font-size: 18px;
  }
  .name {
    font-size: 14px;
    color: #666;
    margin: 10px 0;
    span:first-child {
      margin-right: 20px;
    }
  }

  .info {
    font-size: 14px;
    /deep/ img {
      width: 100%;
    }
  }
  video {
    width: 100%;
  }
  .buttons {
    padding: 20px 0;
    display: flex;
    justify-content: space-around;
    > div {
      width: 120px;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      border: 1px solid #ccc;
      text-align: center;
      font-size: 16px;
      .iconfont {
        font-size: 18px;
        margin-right: 10px;
      }
      .iconweixin {
        color: green;
      }
    }
    .active{
      color: red;
      .iconfont{
        color: red;
      }
    }
  }
}
// 评论回复区域
.comment-list{
  h3{
    text-align: center;
    padding: 10px 0;
  }
  p{
    text-align: center;
    color: #ccc;
    margin-top: 10px;
    font-size: 18px;
  }
}
// 底部区域
.footer-input{
  background-color: #fff;
  width: 100%;
  height: 50px;
  display: flex;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  align-items: center;
  justify-content: space-around;
  padding: 0 10px;
  .iconfont {
    font-size: 24px;
  }
  .now {
    color: red;
  }
  .iconpinglun- {
    position: relative;
    i {
      position: absolute;
      right: 0;
      top: 0;
      background-color: red;
      font-size: 10px;
      color: #fff;
      padding: 0 3px;
      right: -5px;
      border-radius: 5px;
      font-style: normal;
    }
  }
  .search {
    width: 180px;
    padding-right: 10px;
    input {
      height: 30px;
      background-color: #ddd;
      border-radius: 15px;
      width: 100%;
      border: none;
      font-size: 14px;
      padding-left: 20px;
    }
  }
}
.footer-textarea {
  width: 100%;
  height: 100px;
  display: flex;
  position: fixed;
  z-index: 999;
  bottom: 0;
  padding: 10px;
  align-items: flex-end;
  background-color: #fff;
  border-top: 1px solid #ccc;
  justify-content: space-around;
  textarea {
    width: 260px;
    height: 80px;
    background-color: #ccc;
    border-radius: 5px;
    border: none;
    padding: 10px;
    font-size: 14px;
  }
  .send{
    border-radius: 20%;
  }
}
</style>
