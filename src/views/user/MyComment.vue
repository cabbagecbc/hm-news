<template>
  <div class="my-comment">
    <hm-header>我的评论</hm-header>
    <div class="list">
      <!-- immediate-check="false"  的作用是 是否在初始化时立即执行滚动位置检查
            也就是让加载在最开始时不要执行 上拉加载更多数据时再执行
      -->
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="我是有底线的"
          :immediate-check="false"
          offset="10"
          @load="onLoad"
        >
          <div class="item" v-for="item in commentList" :key="item.id">
          <div class="time">{{item.create_data | time('YYYY-MM-DD HH:mm')}}</div>
          <div class="comment" v-if="item.parent">
            <div class="name">回复：{{item.parent.user.nickname}}</div>
            <!-- 评论回复内容 -->
            <div class="comment_content">{{item.parent.content}}</div>
          </div>
          <div class="content">{{item.content}}</div>
          <div class="origin">
            <span class="one-txt-cut">原文：{{item.post.title}}</span>
            <span class="iconfont iconjiantou1"></span>
          </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentList: [],
      // 当前页
      pageIndex: 1,
      // 每页的条数
      pageSize: 5,
      // loading 默认false 如果loading为true 代表list组件正在加载数据，onLoad就不会触发
      // 当滚动到底部，触发onLoad时，会自动将loading：false改为true
      loading: false,
      // 代表是否结束 false代表还有数据 finished：代表没有更多数据
      finished: false,
      refreshing: false
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    async getCommentList() {
      const res = await this.$axios.get('/user_comments', {
        // get请求的参数必须放到params中或者拼接到url地址中
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log('这是后台评论数据', res.datasc)
      // 已经获取后台评论数据后
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // 此处为了让新加载的数据不覆盖前面的，所以将data进行改动,用展开运算符
        this.commentList = [...this.commentList, ...data]
        // 第二种写法，concat拼接
        // this.commentList = this.commentList.concat(data)
        console.log(this.commentList)
        // 加载成功后要将loading改成false，因为加载成功时loading会自动变成true
        this.loading = false
        // 判断：当没有更多数据时，要将finished变成true
        if (data.length < this.pageSize) {
          this.finished = true
        }
        // 重新渲染数据成功后要结束下拉刷新，数据加载完要将refreshing=false
        this.refreshing = false
      }
    },
    onLoad() {
      // 延时器可以取消，但为了更好的查看效果，可以使用，开发时不使用
      // 加载下一页数据
      setTimeout(() => {
        // console.log('需要加载更多数据了')
        this.pageIndex++
        this.getCommentList()
      }, 1000)
    },
    onRefresh() {
      console.log('正在下拉刷新')
      setTimeout(() => {
        // this.refreshing = false
        // 让页数等于1，重新加载数据保持所有数据刷新：清除以前加载的数据
        this.pageIndex = 1
        this.getCommentList()
        this.commentList = []
        // 此处loading改为true的原因是因为：当loading=false时，加载commentList时就会触发load，自动加载第一页数据，最后就会加载两次第一页数据
        this.loading = true
        this.finished = false
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
  .item {
  border-bottom: 1px solid #ccc;
  padding: 10px 20px;
  .time {
    color: #666;
    padding: 10px 0;
    font-size: 14px;
  }
  .comment {
    background-color: #ddd;
    padding: 10px;
    .name {
      color: #666;
      font-size: 14px;
    }
    .comment_content {
      color: #999;
      line-height: 30px;
      margin-top: 10px;
      font-size: 16px;
    }
  }
  .content {
    margin: 10px 0;
    font-size: 16px;
  }
  .origin {
    font-size: 14px;
    color: #999;
    display: flex;
    justify-content: space-between;
  }
}
</style>
