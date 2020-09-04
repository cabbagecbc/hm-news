<template>
  <div class="manage">
    <hm-header>我的栏目管理</hm-header>
    <!-- 删除板块 -->
    <div class="content">
      <div class="active">
        <h3>点击删除以下频道(必须保留四个哦)</h3>
        <div class="list">
          <div class="item" v-for="item in activeList" :key="item.id" @click="delTab(item.id)">{{item.name}}</div>
        </div>
      </div>
      <!-- 点击添加板块 -->
      <div class="deactive">
        <h3>添加添加以下频道</h3>
        <div class="list">
          <div class="item" v-for="item in deactiveList" :key="item.id" @click="addTab(item.id)">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeList: [],
      deactiveList: []
    }
  },
  async created() {
    const activeList = JSON.parse(localStorage.getItem('activeList'))
    const deactiveList = JSON.parse(localStorage.getItem('deactiveList'))
    if (activeList) {
      this.activeList = activeList
      this.deactiveList = deactiveList
      return
    }
    const res = await this.$axios.get('/category')
    console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.activeList = data
      console.log(this.activeList)
    }
  },
  methods: {
    delTab(id) {
      if (this.activeList.length <= 4) return
      const index = this.activeList.findIndex(item => item.id === id)
      // 点击时往未激活的栏目中添加
      this.deactiveList.push(this.activeList[index])
      // 点击时删除激活中的标签
      this.activeList.splice(index, 1)
    },
    addTab(id) {
      const index = this.deactiveList.findIndex(item => item.id === id)
      // 点击时往未激活的栏目中添加
      this.activeList.push(this.deactiveList[index])
      // 点击时删除激活中的标签
      this.deactiveList.splice(index, 1)
    }
  },
  watch: {
    // 深度监听
    activeList: {
      deep: true,
      handler(value) {
        localStorage.setItem('activeList', JSON.stringify(this.activeList))
        localStorage.setItem('deactiveList', JSON.stringify(this.deactiveList))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 10px;
  .active,
  .deactive {
    h3 {
      font-size: 14px;
      font-weight: 400;
      margin: 10px 0;
    }
    .list {
      overflow: hidden;
      .item {
        width: 60px;
        height: 30px;
        border: 1px solid #ccc;
        background-color: #eee;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        float: left;
        margin: 5px;
      }
    }
  }
}
</style>
