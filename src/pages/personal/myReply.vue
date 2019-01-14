/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/25
* Time: 下午3:26
* name:我的回复
*/
<template>
  <div class='myReply'>
    <div
      class="reply"
      v-for='(item, index) in contentList'
      :key='index'
    >
      <p class='content'> <span v-if='item.toUname'>回复：{{item.toUname}}&nbsp;</span>{{item.content | content}}</p>
      <p class='date'>{{item.createTime | dateShow}}</p>
      <div class='intro'>
        <img src="static/img/afPic1.png" alt="">
        <p>{{item.bookTitle}}</p>
      </div>
    </div>
    <div v-if='contentList.length===0'>
      <p>该用户暂无评论</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myReply',
  data () {
    return {
      contentList: []
    }
  },
  methods: {
    searchIReplys (res) {
      this.contentList = [...res.data.data.comment, ...res.data.data.reply]
      console.log(this.contentList)
    }
  },
  mounted () {
    this.axios.post('/book/web/api/iReplys/searchIReplys', {fromUid: 1}).then(this.searchIReplys)
  }
}
</script>

<style scoped>
  .myReply{
    padding:15px;
    background: #f8f8f8;
    height:100%;
  }
  .reply{
    background: #fff;
    padding:13px;
    margin-bottom: 10px;
  }
  .content{
    font-size: 12px;
    color: #666;
    line-height: 1.5;
    margin-bottom: 10px;
  }
  .date{
    font-size: 10px;
    margin-bottom: 11px;
    color:#999;
  }
  .intro{
    background: #fafafa;
    display: flex;
    align-items: center;
  }
  .intro img{
    width: 33px;
    height: 33px;
  }
  .intro p{
    margin-left:13px;
    font-size: 12px;
    color: #333;
    font-weight: bold;
  }
</style>
