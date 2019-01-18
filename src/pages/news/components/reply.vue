/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/26
* Time: 下午3:52
* name:
*/
<template>
  <div class='reply'>
    <ul class='listSort'>
      <li v-for='item in sort'
          :key='item.id'
          :class="highLight===item.id ? 'active' : ''"
          @click="changeActive(item)"
      >{{item.name}}</li>
    </ul>
    <p class='noReply' v-if='this.reply.length === 0'>暂无评论</p>
    <div class="replyMes"
         v-for='(item, index) in reply'
         :key = "index"
    >
      <el-container>
        <el-aside width="40px">
          <div class="photoImg">
            <img src="static/img/photo.png" alt="">
          </div>
        </el-aside>
        <el-main>
          <div class="name">
            <p class="title" v-if='item.fromUname'>{{item.fromUname | telToName}}</p>
            <p class="title" v-if='!item.fromUname'>123123</p>
            <p class="date">{{item.createTimes | dateFilter}}</p>
          </div>
          <p class="text">{{item.content}}</p>
          <div class="bottom">
            <div class="newsBottom">
              <div class="message" @click='repeat(item)'>
                <i class='iconfont icon-liuyan messageFont'></i>
                <span>{{item.replyNum | replyNum}}</span>
              </div>
              <div
                :class="item.status == 1 ? 'starActive' : 'star'"
                @click='changeColor(item)'>
                <i class='iconfont icon-heart1'></i>
                <span>{{item.goodUp | replyNum}}</span>
              </div>
            </div>
          </div>
          <div class='messageReply' v-if='item.relpy.length'>
            <ul>
              <li
                v-for="(reply, inde) in item.relpy"
                :key="inde"
                v-if='inde <= 10'
                >
                <span class="uName">{{reply.replyUname | telToName}}</span>
                <span v-if='!reply.replyToUname'>:</span>
                <span v-if='reply.replyToUname'>回复:</span>{{reply.replyToUname}} {{reply.content}}
              </li>
              <li class='more' v-if='item.relpy.length >= 1'>
                <router-link :to="{name:'Reply',params:{content: item}}">点击查看更多 </router-link>
              </li>
            </ul>
          </div>
        </el-main>
      </el-container>
    </div>
    <div
       class='replyInput'
       @touchmove.prevent
       @click.stop='disReply()'
       v-if='showOrDis'
       >
      <div class="inputt">
        <input type="text" v-model='replyContent' @click.stop ref='content'>
        <i
          class='iconfont icon-tijiao'
          @click.stop='displayReply($event)'
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'

export default {
  name: 'reply',
  props: ['bookId', 'newReply', 'list'],
  data () {
    return {
      showOrDis: false,
      sort: [
        {
          name: '时间倒序',
          id: 0
        }, {
          name: '时间正序',
          id: 1
        }, {
          name: '被赞最多',
          id: 2
        }, {
          name: '评论最多',
          id: 3
        } ],
      highLight: 0,
      reply: [],
      replyContent: '',
      replyCon: '',
      selectItem: ''
    }
  },
  watch: {
    newReply (newVal, oldVal) {
      this.reply.unshift(newVal)
      console.log(oldVal)
    },
    bookId (newVal, oldVal) {
      console.log(newVal, oldVal)
      this.selectItem = []
      this.axios.post('/book/web/api/comment/commentShow', {bookId: this.bookId, pageNum: 1, pageSize: 200}).then(this.changeReply)
    }
  },
  methods: {
    changeActive (item) {
      console.log(item.id)
      this.highLight = item.id
      switch (item.id) {
        case 0 :
          this.reply.sort(api.time)
          break
        case 1 :
          this.reply.sort(api.untime)
          break
        case 2 :
          this.reply.sort(api.goodUp)
          break
        case 3 :
          this.reply.sort(api.reply)
          break
      }
    },
    changeColor (item) {
      console.log(item)
      this.axios.post('/book/web/api/praise/add', {typeId: item.id, type: 2}).then(res => {
        console.log(res)
        console.log(item.status)
        if (!item.status) {
          item.status = 1
          item.goodUp++
        } else {
          item.status = 0
          item.goodUp--
        }
      })
    },
    disReply () {
      this.showOrDis = false
    },
    changeReply (res) {
      this.reply = []
      if (res.data.data === null) {
        return this.showOrDis
      } else {
        console.log('-----res-----')
        console.log(res)
        console.log('-----res-----')
        this.reply = res.data.data.comment.sort(api.time)
      }
    },
    replyOK () {
      console.log(this.selectItem)
      this.selectItem.relpy.push({
        content: this.replyContent,
        createTimes: (new Date()).getTime(),
        replyUname: this.$store.state.userInfo.name,
        fromUheadportrait: null,
        fromUname: this.$store.state.userInfo.name,
        goodUp: null,
        replyNum: 0,
        status: 0,
        relpy: []
      })
      this.replyContent = ''
      this.replyCon.replyNum++
      console.log(this.selectItem.relpy)
    },
    repeat (item) {
      console.log(item)
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
        this.axios.post('/book/web/api/reply/replyAdd',
          {
            commentId: this.replyCon.id,
            replyType: 1,
            content: this.replyContent
          }).then(this.replyOK)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .name .title{
    font-weight : 100;
  }
  .uName{
    color:#666;
    font-weight:100
  }
  .noReply{
    font-size: 14px;
    text-align center
    margin 20px 0;
    color #ccc
  }
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
    background: #f6f6f6;
    width: 100%;
    height:.6rem;
    padding:10px 15px;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
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
  .icon-heart1{
    font-size: 10px;
  }
  .icon-tijiao{
    font-size: 32px;
    color: #c40000;
    margin-left: 10px;
    position:absolute;
    right:17px;
  }
  .newsBottom
    display: flex
    flex-direction : row-reverse
    margin-top 20px;
    font-size: 10px;
    div
      border:1px solid #666
      color: #666
      padding:0.6vw 3vw;
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
  .bottom
    display: flex
    flex-direction row-reverse
    .clickNum
      margin-top 7px;
      line-height 31px;
      font-size: 10px;
      color #999
  .photoImg
    img
      width 100%;
      height:100%;
      border-radius 50%
  .active
    color #333!important
  .reply
    background: #f8f8f8;
    padding:10px 12px;
    border-radius 25px;
  .listSort
    display flex
    justify-content space-around
    /*padding:5px 0;*/
    margin-bottom:10px;
    li
      color: #aaa;
      font-size: 3.2vw;
  .replyMes
    background: #ffffff;
    padding:15px;
    margin-bottom:3vw;
    color:#666
  .photoImg
    width 40px;
    height 40px;
  .name
    display flex
    justify-content space-between;
    align-items center
  .title
    font-size: 4vw;
    color:#333;
  .date
    font-size: 10px;
    color:#aaa;
  .text
    word-wrap:break-word
    font-size: 3.5vw;
    color: #666;
    margin-top 9px;
  main
    padding:10px 0 0 15px
  .messageReply
    margin-top 10px;
    background: #f5f5f5
    font-size: 3.5vw;
  .messageReply ul
    padding:10px 15px;
  .messageReply ul li
    margin-top 3px;
  .more
    text-align right
    font-size: 12px;
    margin-top 15px!important;
    a
      color #aaa

</style>
