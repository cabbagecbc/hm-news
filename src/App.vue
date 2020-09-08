<template>
  <div id="app">
    <!-- 被keep-alive包裹的组件都会被缓存下来 -->
   <keep-alive include="index">
      <router-view/>
   </keep-alive>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
