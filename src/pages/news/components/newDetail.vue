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
      <!--<p class="title">{{list.title}}</p>-->
      <p class="title" v-html='list.title'></p>
      <div class="detail">
        <p>来源:{{list.source | changeTitle}}</p>
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
            <span>{{list.commentNum | replyNum}}</span>
          </div>
          <div :class="list.isLiked == 1 ? 'starActive' : 'star'" @click='changeColor(list)'>
            <i class='iconfont icon-heart1'></i>
            <span>{{list.liked | replyNum}}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class='replyInput'
      @touchmove.prevent
      @click.stop='disReply'
      v-show='showOrDis'
    >
      <div class="inputt">
        <input type="text" v-model='replyContent' ref='content' @click.stop >
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
      replyContent: '',
      height: 667
    }
  },
  props: ['list', 'bookId'],
  methods: {
    changeColor (item) {
      console.log(this.list)
      this.axios.post('/book/web/api/praise/add', {typeId: item.id, type: 1}).then(res => {
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
      this.showOrDis = false
    },
    replyOK (res) {
      console.log(res)
      let lis = {
        content: this.replyContent,
        createTimes: (new Date()).getTime(),
        replyUname: this.$store.state.userInfo.name,
        fromUheadportrait: null,
        fromUname: this.$store.state.userInfo.name,
        goodUp: 0,
        replyNum: 0,
        status: 0,
        relpy: [],
        id: res.data.data.commentId
      }
      this.list.commentNum++
      this.$emit('changeList', lis)
      this.replyContent = ''
    },
    repeat (item) {
      this.height = document.body.clientHeight
      console.log('-----------------------------')
      console.log(this.height)
      this.replyCon = item
      this.showOrDis = true
      this.selectItem = item
      this.$nextTick(() => {
        this.$refs.content.focus()
      })
    },
    displayReply () {
      if (this.replyContent === '') {
        this.showOrDis = false
        return false
      } else {
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
.text >>> div {
  width:100%!important
  overflow-x:hidden;
}
.text >>> *{
  font-size: 3.5vw!important;
  line-height 1.5!important;
}
.news >>> img{
  width:100%
}

.inputt{
  background: #f6f6f6;
  width: 100%;
  height:.6rem;
  padding:10px 15px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.inputt input {
  width: 100%;
  height: 90%;
  padding: 0 12px;
  font-size: 16px;
  background:#eee;
  border-radius:100px;
  padding-right: 13vw;
}
.icon-tijiao{
  font-size: 32px;
  color: #c40000;
  margin-left: 10px;
  position:absolute;
  right:17px;
}

.newDetail
  padding: .2rem .15rem
  width 100%
  height 100%
  box-sizing: border-box;
  .title
    text-align center
    font-size: 4vw
    color:#333;
    margin-bottom: .1rem
    line-height:6vw;
  .detail
    display: flex;
    justify-content space-around;
    /*padding 0 .3rem*/
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
  margin-right 13px;
  font-size: 10px;
  div
    border:1px solid #666
    color: #666
    padding:0.6vw 3vw;
    border-radius 30px;
  .star
    margin-right 11px;
  .starActive
    margin-right:11px;
    color:#c40000!important;
    border:1px solid #c40000!important
  i
    font-size: 10px;
    margin-right 3px;
</style>
