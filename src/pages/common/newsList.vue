/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/28
* Time: 下午1:31
* name:
*/
<template>
  <div class='newsList'>
    <pullScroll
      :on-pull='onPull'
      :scroll-state='scrollState'
      :page='page'
      ref='pullScroll'>
      <div slot='scrollList'>
        <TagHeader></TagHeader>
        <Navigation></Navigation>
        <SearchInput></SearchInput>
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
        </div>
      </div>
    </pullScroll>
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
        name: '时间正序',
        id: 0
      }, {
        name: '时间倒序',
        id: 1
      }, {
        name: '被赞最多',
        id: 2
      }, {
        name: '评论最多',
        id: 3
      }],
      highLight: 0,
      reply: {},
      source: '',
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
    onPull (mun) { // 加载回调
      console.log(this.page.counter)
      if (this.page.counter <= this.page.total) {
        setTimeout(() => {
          this.page.counter++
          console.log(123)
          this.$refs.pullScroll.setState(5)
        }, 500)
      } else {
        this.$refs.pullScroll.setState(7)
      }
    }
  },
  created () {
    window.addEventListener('scroll', (e) => {
      console.log(e)
    })
  },
  // 获取新闻列表页面
  activated () {
    this.source = parseInt(localStorage.getItem('source')) || this.$route.params.category
    let classify = localStorage.getItem('classify') || this.$route.params.classify
    let _that = this
    this.axios.post('/book/web/api/book/search', {pageNum: '1', pageSize: 10, category: this.source, classify: classify}).then(function (res) {
      console.log(res.data)
      _that.selectionList = res.data
    })
  }
}
</script>

<style scoped lang='stylus'>
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
