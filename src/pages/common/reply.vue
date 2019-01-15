/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2019/1/9
* Time: 下午7:04
* name:
*/
<template>
  <div class='reply'>
    <el-container>
      <el-aside width="40px">
        <div class="photoImg">
          <img src="static/img/photo.png" alt="">
        </div>
      </el-aside>
      <el-main>
        <div class="name">
          <p class="title">{{content.fromUname}}</p>
          <p class="date">{{content.createTimes | dateFilter}}</p>
        </div>
        <p class="text">{{content.content}}</p>
        <div class="bottom">
          <div class="newsBottom">
            <div class="message" @click='repeat(item)'>
              <i class='iconfont icon-liuyan'></i>
              <span>{{content.replyNum}}</span>
            </div>
            <div
              :class="content.status === 1 ? 'starActive' : 'star'"
              @click='changeColor(item)'>
              <i class='iconfont icon-heart'></i>
              <span>{{content.goodUp}}</span>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
    <div
      class='messageReply'
      v-for='(item, index) in content.relpy'
      :key='index'
    >
      <div class="name">
        <p class='userName'>{{item.replyUname}}</p>
        <p class='time'>{{item.createTimes | dateFilter}}</p>
      </div>
      <div class="content">
        <p> <span v-if='item.replyToUname'>回复:</span>{{item.replyToUname}} {{item.content}}</p>
      </div>
      <!--<div class="bottom">-->
        <!--<div class="newsBottom">-->
          <!--<div class="message" @click='repeat(item)'>-->
            <!--<i class='iconfont icon-liuyan'></i>-->
            <!--<span>{{item.replyNum}}</span>-->
          <!--</div>-->
          <!--<div-->
            <!--:class="item.status === 1 ? 'starActive' : 'star'"-->
            <!--@click='changeColor(item)'>-->
            <!--<i class='iconfont icon-heart'></i>-->
            <!--<span>{{item.goodUp}}</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--{{item.replyUname}} <span v-if='item.replyToUname'>回复:</span>{{item.replyToUname}} {{item.content}}-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'reply',
  data () {
    return {
      content: ''
    }
  },
  mounted () {
    this.content = this.$route.params.content
    console.log(this.content)
  }
}
</script>

<style scoped lang='stylus'>
.name{
  margin 15px 0
}
.userName{
  color: #333
  font-size: 14px;
}
.time{
  font-size: 11px;
  color #999
}
.content p {
  font-size: 12px;
  color #666
}
.reply{
  background: #f8f8f8;
  padding:13px 13px 0px 13px;
}
.inputt input {
  width: 100%;
  height: 100%;
}
.el-container{
  background: #fff;
  padding 16px;
}
.newsBottom
  display: flex
  flex-direction : row-reverse
  margin-top 7px;
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
    color:red!important;
    border:1px solid red!important
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
.listSort
  display flex
  justify-content space-around
  padding:5px 0;
  li
    color: #aaa;
    font-size: .11rem;
.replyMes
  background: #ffffff;
  padding:15px;
  margin-bottom:3vw;
.photoImg
  width 40px;
  height 40px;
.name
  display flex
  justify-content space-between;
  align-items center
.title
  font-size: 14px;
  color:#333;
  margin-top :-3vw;
.date
  font-size: 10px;
  color:#aaa;
.text
  font-size: 12px;
  color: #666;
  /*margin-top 9px;*/
main
  padding:10px 0px 0px 15px
.messageReply
  border-top:1px solid #eee
  margin-top 10px;
  font-size: 14px;
  padding: 0px 17px;
.messageReply ul
  padding:10px 15px;
.messageReply ul li
  margin-top 3px;
  line-height:6vw;
.more
  text-align right
  font-size: 12px;
  margin-top 15px!important;
</style>
