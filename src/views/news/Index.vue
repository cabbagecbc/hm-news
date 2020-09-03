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
    <div class="user">
      <span class="iconfont iconwode"></span>
    </div>
    </div>
    <!-- 导航tab栏 -->
    <!-- active是激活该数值对应的标签 -->
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="tab.name" v-for="tab in tabList" :key="tab.id">
        <hm-post :post="item" v-for="item in newList" :key="item.id"></hm-post>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      // 用于存放栏目列表数据
      tabList: [],
      newList: [],
      pageIndex: 1,
      pageSize: 20
    }
  },
  created() {
    this.getTabList()
  },
  methods: {
    async getTabList() {
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
        this.newList = data
        console.log(this.newList)
      }
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
</style>
