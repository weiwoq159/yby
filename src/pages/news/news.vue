/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/26
* Time: 下午3:44
* name:
*/
<template>
  <div class='news'>
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
    ></Reply>
  </div>
</template>

<script>
import TagHeader from '../common/header'
import Navigation from '@/pages/tabGroup/components/navigation'
import NewDetail from './components/newDetail'
import Reply from './components/Reply'
export default {
  name: 'news',
  components: {
    TagHeader,
    Navigation,
    NewDetail,
    Reply
  },
  data () {
    return {
      list: '',
      bookId: '',
      newReply: ''
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
    }
  },
  activated () {
    this.bookId = this.$route.params.bookId
    this.list = this.$route.params.name
    if (this.$route.params.name) {
      this.list = this.$route.params.name
      console.log(this.list)
    } else {
      this.list = localStorage.getItem('id')
      this.axios.post('/book/web/api/book/search', {pageNum: '1', pageSize: '4', id: this.list})
        .then(this.fundHomeDate)
    }
  }
}
</script>

<style scoped>
.news{
  width: 100%;
  min-wheight: 100%;
  position: relative;
}
</style>
