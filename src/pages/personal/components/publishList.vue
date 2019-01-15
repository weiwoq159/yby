/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/26
* Time: 下午5:49
* name:
*/
<template>
  <div class='publishList'>
    <router-link :to="{name:'News',params :{bookId:publishList.id, name:publishList, url:this.$store.state.url}}">
      <div class="left">
        <p class='data'>{{day}}<span class='month'>{{month}}月</span></p>
      </div>
      <div class="right">
        <p class='title'>{{publishList.title}}<span class='state'>{{publishList.status | changeStatus}}</span></p>
        <p class='content'>{{publishList.content | changeTitle}}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'publishList',
  props: ['publishList'],
  computed: {
    month () {
      let date = new Date(this.publishList.time.replace(/-/g, '/'))
      return date.getMonth() + 1
    },
    day () {
      let date = new Date(this.publishList.time.replace(/-/g, '/'))
      return date.getDate()
    }
  }
}
</script>

<style scoped lang='stylus'>
  .state
    float right;
    font-size: 12px;
    color #aaa;
  .publishList
    padding:15px;
    background: #fff;
    margin-bottom:10px;
    a
      width 100%
      display block
      display flex;
      align-items stretch
      .left
      .month
        font-size: 10px;
        color #333
        white-space:nowrap;
        font-weight: 300;
      .data
        font-size: 14px;
        font-weight: 900;
        color: #333
        white-space:nowrap;
    .right
      margin-left 15px;
      width 100%;
      .title
        font-size: 14px;
        width 100%;
        color:#333
      .content
        font-size: 12px;
        color:#666
        margin-top 9px;
        line-height:1.5
    img
      widows:68px;
      height 68px;
      margin 0 16px;

</style>
