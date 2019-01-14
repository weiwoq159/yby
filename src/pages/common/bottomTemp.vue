/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/26
* Time: 下午5:30
* name:
*/
<template>
  <div class="bottomTemp">
    <button class='release'>
      <router-link to='/personal/PublishedArticles'>
        发布精选
      </router-link>
    </button>
    <button class='hrSolve'>
      <!--<a href='http://www.1boyun.com/'>-->
        <!--人力资源解决方案-->
      <!--</a>-->
      <a href="http://www.1boyun.com/">人力资源解决方案</a>
    </button>
  </div>
</template>

<script>
export default {
  name: 'bottomTemp',
  methods: {
  }
}
</script>

<style scoped lang='stylus'>
  .bottomTemp
    display flex
    justify-content space-around
    position fixed
    left:0px;
    bottom:0px;
    width 100%;
    padding .1rem 0;
    button
      width 1.66rem;
      height:.25rem;
      border-radius 14rem
      font-size: 14px;
      a
        color #ffffff
        font-size:14px ;
  .release
    background #c400000
  .hrSolve
    background: #ffa200;
</style>
