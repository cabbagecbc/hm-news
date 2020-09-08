<template>
  <div class="search">
    <div class="header">
      <div class="left" @click="goBack">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <input type="search"
        placeholder="请输入搜索关键词"
        @keyup.enter="search"
        v-model="key"
        >
      </div>
      <div class="right" @click="search">搜索</div>
    </div>
    <!-- 搜索标题 -->
    <div class="recomment-list" v-if="recommendList.length">
      <div
        class="item one-txt-cut"
        v-for="item in recommendList"
        :key="item.id"
        @click="goSearch(item.title)"
      >{{item.title}}</div>
    </div>
    <!-- 点击搜索后的文章列表 -->
    <div class="list" v-else-if="list.length">
      <hm-post v-for="item in list" :key="item.id" :post="item"></hm-post>
    </div>
    <div class="content" v-else>
      <div class="history">
        <h3>历史记录</h3>
        <div class="list">
          <div class="item one-txt-cut"
            v-for="item in history"
            :key="item"
             @click="goSearch(item)"
          >{{item}}
          </div>
        </div>
      </div>
      <hr>
      <div class="hot">
        <h3>热门搜索</h3>
        <div class="list">
          <div class="item"
            v-for="item in hot"
            :key="item"
            @click="goSearch(item)"
          >{{item}}

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: '',
      // 放搜索的结果
      list: [],
      history: [],
      hot: [],
      // 推荐列表
      recommendList: []
    }
  },
  created() {
    // 如果没有历史记录，保证是一个空数组
    this.history = JSON.parse(localStorage.getItem('history')) || []
    // 假设发送请求，获取了数据
    this.hot = ['关晓彤', '华为', '茄子', '姑娘']
  },
  methods: {
    // 点击搜索
    async search() {
      console.log(123)
      if (!this.key) return this.$toast('请输入搜索关键字')
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.key
        }
      })
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
      }
      // 1.把key添加到缓存中
      // 如果原来有这个历史记录，删除即可
      // 如果原来没有，则添加到数组的前面
      this.history = this.history.filter(item => item !== this.key)
      this.history.unshift(this.key)
      localStorage.setItem('history', JSON.stringify(this.history))
      // 清空推荐
      this.recommendList = []
    },
    // 点击箭头返回
    goBack() {
      // console.log(13)
      if (this.key) {
        this.key = ''
      } else {
        this.$router.back()
      }
    },
    // 搜索
    goSearch(item) {
      console.log('123')
      this.key = item
      this.search()
    }
  },
  // 监听
  watch: {
    key(value) {
      if (value === '') {
        this.list = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .center {
    flex: 1;
    padding: 0 10px;
    position: relative;
    input {
      width: 100%;
      height: 34px;
      border-radius: 17px;
      border: 1px solid #ccc;
      font-size: 14px;
      padding-left: 30px;
    }
    .iconfont {
      position: absolute;
      left: 22px;
      top: 10px;
    }
  }
  .right {
    font-size: 14px;
  }
}
.content {
  padding: 10px;
  .history {
    margin-bottom: 10px;
  }
  h3 {
    font-size: 14px;
    margin: 10px 0;
  }
  .list {
    overflow: hidden;
  }
  .item {
    float: left;
    width: 60px;
    height: 30px;
    border: 1px solid #ccc;
    background-color: #ddd;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    margin: 5px;
  }
}
</style>
