/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/26
* Time: 下午3:44
* name:
*/
<template>
  <div class='news' id='news'>
    <TagHeader></TagHeader>
    <Navigation ref='navigation'></Navigation>
    <NewDetail
      :list='list'
      @changeList='changeList'
    ></NewDetail>
    <Reply
      :bookId='bookId'
      :newReply='newReply'
      :list='list'
      ref='reply'
    ></Reply>
  </div>
</template>

<script>
import TagHeader from '../common/header'
import Navigation from '@/pages/tabGroup/components/navigation'
import NewDetail from './components/newDetail'
import Reply from './components/Reply'
import pullScroll from '../common/pullScroll'
export default {
  name: 'news',
  components: {
    TagHeader,
    Navigation,
    NewDetail,
    Reply,
    pullScroll
  },
  data () {
    return {
      list: '',
      bookId: '',
      newReply: '',
      booId: '',
      page: {
        counter: 1,
        total: 10
      },
      classify: '',
      scrollState: true
    }
  },
  methods: {
    changeList (changeList) {
      this.newReply = changeList
    },
    fundHomeDate (res) {
      console.log(res)
      this.list = res.data.data[0]
      console.log(this.list)
    },
    onPull (mun) { // 加载回调
      if (this.page.counter <= this.page.total) {
        // console.log('执行毁掉')
        this.axios.post('/book/web/api/comment/commentShow',
          {
            bookId: this.bookId,
            pageNum: this.page.counter + 1,
            pageSize: 200
          }).then((res) => {
          this.page.total = Math.ceil(res.data.data.num / 10)
          // console.log(res.data.data)
          this.$refs.reply.reply = [...this.$refs.reply.reply, ...res.data.data.comment]
          console.log(this.$refs.reply.reply)
          this.page.counter++
          this.$refs.pullScroll.setState(5)
        })
      } else {
        this.$refs.pullScroll.setState(7)
      }
    }
  },
  activated () {
    this.page = {
      counter: 1,
      total: 10
    }
    this.bookId = this.$route.params.bookId
    this.list = this.$route.params.name
    if (this.$route.params.name) {
      this.list = this.$route.params.name
      console.log(this.list)
    } else {
      this.bookId = localStorage.getItem('id')
      this.axios.post('/book/web/api/book/search', {pageNum: '1', pageSize: 20, id: this.bookId})
        .then(this.fundHomeDate)
    }
    this.axios.post('/book/web/api/book/click', {id: this.bookId})
      .then(res => {
        console.log('-----res-----')
        console.log(res)
        console.log('-----res-----')
      })
  }
}
</script>

<style scoped>
.news{
  width: 100%;
  position: relative;
}
</style>
