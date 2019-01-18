/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/28
* Time: 下午1:31
* name:
*/
<template>
  <div class='newsList'>
      <TagHeader></TagHeader>
      <Navigation></Navigation>
      <SearchInput ref='searchInput'></SearchInput>
      <div class="newsL">
        <ul class='listSort'>
          <li v-for='item in sort'
              :key='item.id'
              :class="highLight===item.id ? 'active' : ''"
              @click="changeActive(item)"
          >{{item.name}}</li>
        </ul>
        <FunedList
          v-for="(item, index) in selectionList.data"
          :key="index"
          :content='item'
          :source='source'
        >
        </FunedList>
        <p @click='loading' class='loading'>{{text}}</p>
      </div>
  </div>
</template>

<script>
import TagHeader from '../common/header'
import SearchInput from '../common/searchInput'
import Navigation from '../tabGroup/components/navigation'
import FunedList from '@/pages/funed/components/funedList'
import bottomTemp from '../common/bottomTemp'
import api from '@/api/api'
import pullScroll from '../common/pullScroll'
export default {
  name: 'newsList',
  components: {
    FunedList,
    bottomTemp,
    TagHeader,
    SearchInput,
    Navigation,
    pullScroll
  },
  data () {
    return {
      selectionList: '',
      standby: '',
      sort: [{
        name: '时间倒序',
        id: 1
      }, {
        name: '时间正序',
        id: 0
      }, {
        name: '被赞最多',
        id: 2
      }, {
        name: '评论最多',
        id: 3
      }],
      highLight: 1,
      reply: {},
      source: '',
      page: {
        counter: 2,
        total: 10
      },
      classify: '',
      scrollState: true,
      text: '点击加载更多'
    }
  },
  methods: {
    changeActive (item) {
      console.log(item.id)
      this.highLight = item.id
      switch (item.id) {
        case 0 :
          this.selectionList.data.sort(api.selectTime)
          break
        case 1 :
          this.selectionList.data.sort(api.unSelectTime)
          break
        case 2 :
          this.selectionList.data.sort(api.slectGoodUp)
          break
        case 3 :
          this.selectionList.data.sort(api.reply)
          break
      }
    },
    changeColor (item) {
      console.log(item)
      this.axios.post('/book/web/api/praise/add', {typeId: item.id, type: 1}).then(res => {
        console.log(res)
        item.isStar = !item.isStar
        if (item.isStar) {
          item.liked++
        } else {
          item.liked--
        }
      })
    },
    loading (mun) { // 加载回调
      if (this.page.counter <= this.page.total) {
        this.page.total = Math.ceil(this.selectionList.meta.total / 10)
        console.log(this.page)
        this.axios.post('/book/web/api/book/search',
          {
            pageNum: this.page.counter + 1,
            pageSize: 10,
            category: this.source,
            classify: this.classify
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
  // 获取新闻列表页面
  activated () {
    this.page = {
      counter: 1,
      total: 10
    }
    this.text = '点击加载更多'
    this.highLight = 1
    this.source = this.$route.params.category || parseInt(localStorage.getItem('source'))
    this.classify = this.$route.params.classify || localStorage.getItem('classify')
    let _that = this
    this.axios.post('/book/web/api/book/search', {pageNum: '1', pageSize: 10, category: this.source, classify: this.classify}).then(function (res) {
      _that.selectionList = res.data
      _that.selectionList.data.sort(api.unSelectTime)
      _that.page.total = res.data.meta.total
    })
    this.$refs.searchInput.input = ''
    this.$refs.searchInput.id = ''
    localStorage.setItem('seach', '')
    localStorage.setItem('search', '')
    localStorage.setItem('yjx', '')
  }
}
</script>

<style scoped lang='stylus'>
  .loading{
    text-align center
    font-size: 16px;
    color #ccc
    padding 10px 0
  }
  .noMessage{
    text-align center;
    padding:20px 0px;
  }
   .newsL{
     background: #f8f8f8;
     padding 0 10px;
     border-top-left-radius 30px;
     border-top-right-radius 30px;
     border-radius :15px;
     padding-bottom 20px;
   }
  .newsList{
    height:100%;
  }
  .active
    color #333!important
  .listSort
    display flex
    justify-content space-around
    padding:10px 0px;
    li
      color: #aaa;
      font-size: .11rem;
</style>
