<template>
  <keep-alive exclude="Selection">
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </keep-alive>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='stylus'>
  *
    margin:0
  html,body,#app
    width :100%;
    min-height:100%;
    height:100%;
  html
    font-size: 100px!important;
  body
    font-size: 16px;
</style>
