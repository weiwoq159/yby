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
        v-for="(item, index) in selectionList.data"
        :key="index"
        :content='item'
        :url='url'
        :source='category'
      >
      </FunedList>
      <p @click='loading' class='loading'>{{text}}</p>
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
        counter: 1,
        total: 10
      },
      scrollState: true,
      myScroll: '',
      myScrollList: '',
      selectionList: '',
      text: '点击加载更多'
    }
  },
  methods: {
    fundHomeNews (res) {
      this.AFPic = res.data.data
      api.checkImg(this.AFPic)
    },
    fundHomeDate (res) {
      console.log(res)
      this.selectionList = res.data
    },
    onScroll (e) {
      console.log(e)
    },
    loading () { // 加载回调
      if (this.page.counter <= this.page.total) {
        this.page.total = Math.ceil(this.selectionList.meta.total / 10)
        console.log(this.page.total)
        console.log(this.page)
        this.axios.post('/book/web/api/book/search',
          {
            pageNum: this.page.counter + 1,
            pageSize: this.page.total,
            category: this.category
          }).then((res) => {
          this.selectionList.data = [...this.selectionList.data, ...res.data.data]
          console.log(this.selectionList)
          this.page.counter++
        })
      } else {
        this.text = '没有更多'
      }
    }
  },
  mounted () {
    console.log('------公积金模块加载中-------')
    this.axios.post('/book/web/api/book/searchHome', {category: this.category}).then(this.fundHomeNews)
    this.axios.post('/book/web/api/book/search', {pageNum: '1', pageSize: 20, category: this.category})
      .then(this.fundHomeDate)
  },
  activated () {
    this.page = {
      counter: 1,
      total: 10

    }
    this.$store.commit('SET_URL', this.$route.path)
    this.url = this.$store.state.url
  },
  destroyed () {
    console.log()
  }
}
</script>

<style scoped lang='stylus'>
  .loading{
    text-align center
    font-size: 16px;
    color #ccc
    padding:10px 0
  }
  .funedList
    background: #f8f8f8;
    padding:15px 12px;
    border-radius 15px;
    .newsTitle
      text-align center
      margin-bottom  15px
      font-size: 14px
</style>
