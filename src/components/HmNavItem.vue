<template>
  <div class="nav-item" @click="clickFn">
    <div class="title"><slot></slot></div>
    <div class="content"><slot name="content"></slot></div>
    <div class="arrow">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickFn() {
      // 导航条点击事件测试
      // console.log('123')
      console.log(this.to)
      if (this.to) {
        this.$router.push(this.to)
      }
    }
  },
  props: {
    to: String
    // to: {
    //   type: String
    // }
  }
}
</script>

<style lang="less" scoped>
  .nav-item{
    display: flex;
    font-size: 16px;
    border-bottom: 1px solid #ccc;
    height: 50px;
    align-items: center;
    margin-left: 10px;
    padding-right: 10px;
    .content{
      flex:1;
      text-align: right;
      color: #888;
      font-size: 14px;
    }
    .arrow{
      padding-left: 10px;
    }
  }
</style>
