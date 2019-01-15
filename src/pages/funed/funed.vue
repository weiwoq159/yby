/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/25
* Time: 下午5:14
* name: 公积金页面
*/
<template>
  <div class='funed'>
    <AFPic
      :AFPic='AFPic'
      :name='name'
      :scource='category'
    ></AFPic>
    <div class="funedList">
      <p class="newsTitle">精选推荐</p>
      <FunedList
        v-for="(item, index) in fundedList.data"
        :key="index"
        :content='item'
        :url='url'
      >
      </FunedList>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
import AFPic from './components/AFPic'
import FunedList from './components/funedList'
import pullScroll from '../common/pullScroll'
export default {
  name: 'funed',
  components: {
    AFPic,
    FunedList,
    pullScroll
  },
  data () {
    return {
      AFPic: '',
      fundedList: '',
      category: 4,
      url: '',
      name: '公积金',
      page: {
        counter: 9,
        pageStart: 1,
        pageEnd: 1,
        total: 10
      },
      scrollState: true
    }
  },
  methods: {
    fundHomeNews (res) {
      this.AFPic = res.data.data
      api.checkImg(this.AFPic)
    },
    fundHomeDate (res) {
      console.log(res)
      this.fundedList = res.data
    },
    onScroll (e) {
      console.log(e)
    }
  },
  mounted () {
    console.log('------公积金模块加载中-------')
    this.axios.post('/book/web/api/book/searchHome', {category: this.category}).then(this.fundHomeNews)
    this.axios.post('/book/web/api/book/search', {pageNum: '1', pageSize: '4', category: this.category})
      .then(this.fundHomeDate)
  },
  activated () {
    this.$store.commit('SET_URL', this.$route.path)
    this.url = this.$store.state.url
    window.addEventListener('scroll', function (e) {
      console.log(e)
    })
  },
  destroyed () {
    console.log()
  }
}
</script>

<style scoped lang='stylus'>
  .funedList
    background: #f8f8f8;
    padding:15px 12px;
    border-radius 15px;
    .newsTitle
      text-align center
      margin-bottom  15px
      font-size: 14px
</style>
