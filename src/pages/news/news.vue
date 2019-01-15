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
    }
  },
  activated () {
    this.bookId = this.$route.params.bookId
    this.list = this.$route.params.name
    this.$refs.navigation.url = this.$route.params.url
    if (this.$route.params.url !== '/tabGroup/Selection') {
      this.$refs.navigation.$el.children[0].children[4].children[0].className = ''
    }
  },
  beforeRouteLeave (to, from, next) {
    next()
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
