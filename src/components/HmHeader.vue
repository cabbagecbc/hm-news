<template>
  <div class="hm-header">
    <div class="back" @click="back">
        <span class="iconfont iconjiantou2"></span>
    </div>
    <div class="title"><slot></slot></div>
    <div class="extra"></div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      // this.$router.push()
      // this.$router.back()
      // this.$router.forward()
      // this.$routet.go()
      this.$router.go(-1)
    }
  }
}
</script>

<style>

</style>
