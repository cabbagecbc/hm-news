<template>
  <div class="index">
    <div class="header">
      <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="search">
      <div class="search-box">
        <span class="iconfont iconsearch"></span>
        <span>搜索新闻</span>
      </div>
    </div>
    <div class="user" @click="$router.push('/user')">
      <span class="iconfont iconwode"></span>
    </div>
    </div>
    <!-- 导航tab栏 -->
    <!-- active是激活该数值对应的标签 -->
    <!-- 标签管理 -->
    <van-sticky class="more-sticky">
      <div class="more" @click="$router.push('/manage')">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </van-sticky>
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="tab.name" v-for="tab in tabList" :key="tab.id">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="我是有底线的"
            @load="onLoad"
          >
            <hm-post :post="item" v-for="item in newList" :key="item.id"></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  // 组件的名字，递归的时候可以通过name渲染自己，缓存的时候通过name可以缓存自己
  name: 'index',
  data() {
    return {
      active: 0,
      // 用于存放栏目列表数据
      tabList: [],
      newList: [],
      pageIndex: 1,
      pageSize: 6,
      // 上拉刷新
      loading: false,
      finished: false,
      // 下拉刷新
      refreshing: false
    }
  },
  created() {
    this.getTabList()
  },
  methods: {
    async getTabList() {
      // manage标签管理页面修改好以后渲染首页tab栏
      // 先判断缓存中是否存在
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      if (activeList) {
        this.tabList = activeList
        // 发送请求第一个tab栏的新闻数据
        this.getNewList(this.tabList[0].id)
        return
      }
      const res = await this.$axios.get('/category')
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        console.log(this.tabList)
        // 发送请求获取第一个tab栏的数据
        this.getNewList(this.tabList[0].id)
      }
    },
    // 获取新闻列表
    async getNewList(id) {
      // 发送请求获取新闻数据
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.newList = [...this.newList, ...data]
        // console.log(this.newList)
        // 当数据加载完成时要将loading变成false
        this.loading = false
        // 加载完成后 隐藏加载状态
        this.refreshing = false
        // 当加载一定数量时，要判断是否还有数据可更新加载，没有则将finished变成true
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      setTimeout(() => {
        // console.log('需要加载数据了')
        // 刷新后加载下一页数据
        this.pageIndex++
        this.getNewList(this.tabList[this.active].id)
      }, 1000)
    },
    onRefresh() {
      // 要使该页新闻数据为空
      this.newList = []
      // 在第一页
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      setTimeout(() => {
        // console.log('下拉刷新了')
        this.getNewList(this.tabList[this.active].id)
      }, 1000)
    }
  },
  watch: {
    // 监听active，看active是否激活
    // 监听变化
    active(value) {
      // console.log(value)
      // 清空原来栏目下的数据
      this.newList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      setTimeout(() => {
        // 重新加载当前页面active下的数据
        this.getNewList(this.tabList[this.active].id)
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
  .header {
  display: flex;
  height: 50px;
  background-color: #ff0000;
  line-height: 50px;
  text-align: center;
  color: #fff;
  .logo,
  .user {
    width: 70px;
  }
  .logo {
    span {
      font-size: 50px;
    }
  }
  .user {
    span {
      font-size: 24px;
    }
  }
  .search {
    flex: 1;
    .search-box {
      height: 34px;
      line-height: 34px;
      background-color: rgba(255, 255, 255, .5);
      margin-top: 8px;
      border-radius: 17px;
      font-size: 14px;
      span:first-child {
        margin-right: 5px;
      }
    }
  }
}
/deep/ .van-tabs__wrap {
  width: 100%;
}
.more {
  width: 10%;
  height: 44px;
  position: absolute;
  right: 0;
  z-index: 999;
  background-color: #fff;
  text-align: center;
  line-height: 44px;
  transform: rotate(90deg);
  .iconfont{
    font-size: 20px;
  }
}
.more-sticky {
  /deep/ .van-sticky--fixed {
    z-index: 100;
  }
}
</style>
