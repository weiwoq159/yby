/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/26
* Time: 下午3:52
* name:
*/
<template>
  <div class='news'>

    <div class="newDetail">
      <p class="title">{{list.title}}</p>
      <div class="detail">
        <p>来源:{{list.source}}</p>
        <p>更新时间:{{list.ceateTime | dateShow}}</p>
      </div>
      <div class="text">
        <p v-html='list.content'></p>
      </div>
      <div class="bottom">
        <p class='clickNum'>点击量:{{list.clicks}}</p>
        <div class="newsBottom">
          <div class="message">
            <i class='iconfont icon-liuyan'></i>
            <span>{{list.commentNum}}</span>
          </div>
          <div :class="list.isStar ? 'starActive' : 'star'" @click='changeColor(list)'>
            <i class='iconfont icon-heart1'></i>
            <span>{{list.liked}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'news',
  data () {
    return {
      showOrDis: true,
      arr: [1, 2, 3, 3]
    }
  },
  props: ['list', 'bookId'],
  beforeCreate () {
    if (this.$route.params.name === undefined) {
      this.$store.commit('SET_URL', this.$store.state.singer)
      this.$router.history.go(-1)
    }
  },
  methods: {
    changeColor (item) {
      console.log('-----item-----')
      console.log(item)
      console.log('-----item-----')
      item.isStar = !item.isStar
      if (item.isStar) {
        item.liked++
      } else {
        item.liked--
        if (item.liked === 0) {
          item.liked = null
        }
      }
    }
  },
  mounted () {
    console.log('--------------------')
    console.log(this.list)
  }
}
</script>

<style scoped lang='stylus'>
.newDetail
  padding: .3rem .15rem
  width 100%
  height 100%
  box-sizing: border-box;
  .title
    text-align center
    font-size: .14rem;
    color:#333;
    margin-bottom: .1rem
  .detail
    display: flex;
    justify-content space-around;
    padding 0 .3rem
    font-size: .1rem;
    color #aaa;
  .text
    margin-top .1rem
    p
      font-size: .12rem;
      color:#666;
      line-height 1.5
  .bottom
    display: flex
    justify-content space-between
    align-items center
    .clickNum
      margin-top 7px;
      font-size: 10px;
      color #999
    .lastNews
      margin-bottom 30px;
.newsBottom
  display: flex
  flex-direction : row-reverse
  margin-top 7px;
  font-size: 10px;
  div
    border:1px solid #666
    color: #666
    padding:3px 8px;
    border-radius 30px;
  .star
    margin-right 11px;
  .starActive
    margin-right:11px;
    color:red!important;
    border:1px solid red!important
  i
    font-size: 10px;
    margin-right 3px;
</style>
