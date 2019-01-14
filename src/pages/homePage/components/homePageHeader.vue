/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/25
* Time: 下午5:38
* name:
*/
<template>
  <div class='homePageHeader'>
    <div class="header">
      <p class=login>
        <router-link to='/personal'>个人中心</router-link>
        <i class='iconfont icon-person'></i>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homePageHeader'
}
</script>

<style scoped lang='stylus'>
  @import '~styles/index.styl'
  .header
    padding-right .12rem
  .login
    text-align: right;
    color: $login
    display flex
    align-items center
    flex-direction row-reverse
    margin-top 10px;
    a
      color: $login
      font-size: .12rem;
    i
      font-size: .16rem;
      line-height: .12rem;
      color: $loginIcon
  .logo
    margin-top : .96rem
    margin-bottom: .31rem
    img
      display: block
      width :1.1rem
      margin:0 auto;
  .search
    padding:0 .3rem
</style>
