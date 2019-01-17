/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/25
* Time: 下午5:18
* name:
*/
<template>
  <div class='selection'>
    <ul class='listSort'>
      <li v-for='item in sort'
          :key='item.id'
          :class="highLight===item.id ? 'active' : ''"
          @click="changeActive(item)"
      >{{item.name}}</li>
    </ul>
    <pullScroll
      :on-pull='onPull'
      :scroll-state='scrollState'
      :page='page'
      ref='pullScroll'>
      <div slot='scrollList' class='pull'>
        <FunedList
          v-for="(item, index) in selectionList.data"
          :key="index"
          :content='item'
          :source='category'
        >
        </FunedList>
      </div>
    </pullScroll>
    <bottomTemp></bottomTemp>
  </div>
</template>

<script>
import FunedList from '@/pages/funed/components/funedList'
import bottomTemp from '../common/bottomTemp'
import api from '@/api/api'
import pullScroll from '../common/pullScroll'
export default {
  name: 'selection',
  components: {
    FunedList,
    bottomTemp,
    pullScroll
  },
  data () {
    return {
      selectionList: '',
      standby: '',
      sort: [{
        name: '时间倒序',
        id: 0
      }, {
        name: '时间正序',
        id: 1
      }, {
        name: '被赞最多',
        id: 2
      }, {
        name: '回复最多',
        id: 3
      }],
      highLight: 0,
      reply: {},
      category: 5,
      page: {
        counter: 1,
        total: 10
      },
      classify: '',
      scrollState: true
    }
  },
  methods: {
    changeActive (item) {
      console.log(this.selectionList.data)
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
          this.selectionList.data.sort(api.selectReply)
          break
      }
    },
    changeColor (item) {
      item.isStar = !item.isStar
      if (item.isStar) {
        item.goodUp++
      } else {
        item.goodUp--
        if (item.goodUp === 0) {
          item.goodUp = null
        }
      }
    },
    onPull (mun) { // 加载回调
      if (this.page.counter <= this.page.total) {
        this.page.total = Math.ceil(this.selectionList.meta.total / 10)
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
          this.$refs.pullScroll.setState(5)
        })
      } else {
        this.$refs.pullScroll.setState(7)
      }
    },
    fundHomeDate (res) {
      console.log(res)
      // let source = this.$route.params.source
      // let id = this.$route.params.id
      // let _that = this
      // if (source === undefined) {
      this.selectionList = res.data
      this.selectionList.data.sort(api.selectTime)
      // } else {
      //   // this.standby = res.data
      //   // // this.$route.params.id
      //   // this.axios.post('/book/web/api/book/listPage', {pageNum: 1, pageSize: 10, category: source, classifyId: id}).then(function (res) {
      //   //   console.log(res.data.data)
      //   //   _that.selectionList = res.data
      //   // })
      // }
    }
  },
  // 获取新闻列表页面
  mounted () {
    this.page = {
      counter: 1,
      total: 10
    }
    this.axios.post('/book/web/api/book/search', {pageNum: 1, pageSize: 10, category: this.category}).then(this.fundHomeDate)
  }
}
</script>

<style lang='stylus'>
.tabgroup {
  height: 100%;
  overflow: hidden;
}

.selection{
  height:calc(100% - 130px)
  background: #f8f8f8;
  padding 0 3.5vw;
  border-top-left-radius 15px;
  border-top-right-radius 15px;
  padding-bottom: 11vw;
}
.active
  color #333!important
.listSort
  display flex
  justify-content space-between
  padding:10px 15px;
  li
    color: #aaa;
    font-size: .11rem;
</style>
