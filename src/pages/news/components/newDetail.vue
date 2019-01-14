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
        <p class='clickNum'>点击量:{{list.clicks}}</p>
        <p>更新时间:{{list.ceateTime | dateShow}}</p>
      </div>
      <div class="text">
        <p v-html='list.content'></p>
      </div>
      <div class="bottom">
        <div class="newsBottom">
          <div class="message" @click='repeat(list)'>
            <i class='iconfont icon-liuyan'></i>
            <span>{{list.replyNum}}</span>
          </div>
          <div :class="list.isLiked == 1 ? 'starActive' : 'star'" @click='changeColor(list)'>
            <i class='iconfont icon-heart1'></i>
            <span>{{list.liked}}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class='replyInput'
      @touchmove.prevent
      @click.stop='disReply()'
      v-if='showOrDis'
    >
      <div class="inputt">
        <input type="text" v-model='replyContent' @click.stop>
        <i
          class='iconfont icon-tijiao'
          @click.stop='displayReply($event)'
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'news',
  data () {
    return {
      showOrDis: false,
      arr: [1, 2, 3, 3],
      replyContent: ''
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
      console.log(item)
      this.axios.post('/book/web/api/praise/add', {typeId: item.id, type: 2}).then(res => {
        console.log(res)
        if (!item.isLiked) {
          item.isLiked = 1
          item.liked++
        } else {
          item.isLiked = 0
          item.liked--
        }
      })
    },
    disReply () {
      console.log(123123)
      this.showOrDis = false
    },
    replyOK (res) {
      console.log(res)
      let lis = {
        content: this.replyContent,
        createTimes: (new Date()).getTime(),
        replyUname: this.$store.state.userInfo.name,
        relpy: {}
      }
      this.list.replyNum++
      this.$emit('changeList', lis)
    },
    repeat (item) {
      this.replyCon = item
      this.showOrDis = true
      this.selectItem = item
    },
    displayReply () {
      console.log(this.list)
      this.showOrDis = false
      this.axios.post('/book/web/api/comment/commentAdd',
        {
          bookId: this.replyCon.id,
          bookTitle: this.list.title,
          bookType: this.list.type,
          content: this.replyContent
        }).then(this.replyOK)
    }
  }
}
</script>

<style scoped lang='stylus'>
.replyInput{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background: rgba(0,0,0,.3);
  z-index: 999999;
}
.inputt{
  background: #000;
  width: 100%;
  height:.6rem;
  padding:10px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.inputt input {
  width: 100%;
  height: 100%;
  padding: 0 12px;
}
.icon-tijiao{
  font-size: 28px;
  color: #c40000;
  margin-left: 10px;
}
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
    flex-direction row-reverse
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
