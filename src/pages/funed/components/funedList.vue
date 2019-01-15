/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/26
* Time: 下午2:24
* name: 公积金新闻列表
*/
<template>
  <div class="funed_tist">
    <div class="listBox">
      <router-link :to="{name:'News',params :{bookId:content.id, name:content, url:this.$store.state.url}}">
        <div class="title">
          <div class="essence" v-if="content.essence===1">
            <i class="iconfont icon-anonymous-iconfont"></i>
            <span>精华</span>
          </div>
          <p v-html='content.title'></p>
          <!--<p class="titleText">{{content.title | changeTitle}}</p>-->
        </div>
        <div class="content">
          <p>{{content.intro | changeContent}}</p>
        </div>
        <div class="bottom">
          <span class='tag'>{{content.classify}}</span>
          <p class='whereFrom'>来源:{{content.source | changeSource}}</p>
          <p class='updateTime'>{{content.ceateTime | dateShow }}</p>
        </div>
      </router-link>
      <!--底部按钮-->
      <div class="newsBottom">
        <div class="message" @click='gotoReply(content)'>
          <i class='iconfont icon-liuyan'></i>
          {{content.replyNum}}
        </div>
        <div :class="content.isLiked === 1 ? 'starActive' : 'star'" @click='changeColor(content)'>
          <i class='iconfont icon-heart1'></i>
          <span>{{content.liked}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'funedList',
  props: ['content', 'url'],
  mounted () {
    // console.log('-----------------')
    // console.log(this.content)
  },
  methods: {
    changeColor (item) {
      console.log(item)
      this.axios.post('/book/web/api/praise/add', {typeId: item.id, type: 2}).then(res => {
        console.log(res)
        if (item.isLiked === 0) {
          item.isLiked = 1
          item.liked++
        } else {
          item.isLiked = 0
          item.liked--
        }
      })
    },
    gotoReply (content) {
      console.log(content)
      this.$router.push({name: 'News', params: {bookId: content.id, name: content, url: this.$store.state.url}})
    }
  }
}
</script>
<style scoped lang='stylus'>
  .funed_tist
    margin-bottom 10px;
  .listBox
    background: #fff;
    padding:15px;
    a
      display block
    .title
      display flex
      align-items center
      color #666
      .essence
        padding:2px 8px;
        border-radius 20px;
        color:#fff
        font-size: 11px;
        background: #c400000;
        display inline
        margin-right 10px;
        min-width 46px;
      .titleText
        font-size: 14px;
    .content
      margin-top:10px;
      p
        font-size: 12px;
        color: #666
        line-height 1.4;
    .bottom
      font-size: 10px;
      color:#aaa;
      display: flex;
      justify-content space-between;
      align-items center
      margin-top 16px;
      span
        border-radius 15px;
        border 1px solid #aaa
        padding 3px;
  .newsBottom
    display: flex
    flex-direction : row-reverse
    margin-top 20px;
    font-size: 10px;
    div
      border:1px solid #666
      color: #666
      padding:3px 8px;
      border-radius 30px;
    .star
      margin-right 11px;
      display flex
      align-items center
      justify-content space-between
    .starActive
      margin-right:11px;
      color:#c40000!important;
      border:1px solid #c40000!important
      display flex
      align-items center
      justify-content space-between
    i
      font-size: 10px;
      margin-right 4px;
</style>
