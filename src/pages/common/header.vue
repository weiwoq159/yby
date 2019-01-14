/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/25
* Time: 下午7:08
* name:
*/
<template>
  <div class='searchHeader'>
    <div>
      <i class='iconfont icon-home'></i>
      <router-link to='/'>首页</router-link>
    </div>
    <img src="static/img/logo.png" alt="">
    <div class="headerRight">
      <router-link to='/personal'>个人中心</router-link>
      <i class='iconfont icon-person'></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabHeader'
}
</script>

<style scoped lang='stylus'>
  @import '~@/assets/index.styl'
  .searchHeader
    height : .34rem
    display flex
    justify-content space-between
    align-items center
    padding:8px 12px;
    img
      width : .74rem;
      height:18px;
      align-items : center;
    div
      line-height .34rem
      display : flex;
      justify-content: space-around
      align-items center
      a,span
        color: $login;
        font-size: .12rem;
      i
        line-height:.38rem
        color: $loginIcon
</style>
