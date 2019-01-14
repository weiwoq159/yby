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
    <FunedList
      v-for="(item, index) in selectionList.data"
      :key="index"
      :content='item'
    >
    </FunedList>
    <bottomTemp></bottomTemp>
  </div>
</template>

<script>
import FunedList from '@/pages/funed/components/funedList'
import bottomTemp from '../common/bottomTemp'
import api from '@/api/api'
export default {
  name: 'selection',
  components: {
    FunedList,
    bottomTemp
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
      category: 5
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
    fundHomeDate (res) {
      console.log(res)
      let source = this.$route.params.source
      let id = this.$route.params.id
      let _that = this
      if (source === undefined) {
        this.selectionList = res.data
        this.selectionList.data.sort(api.selectTime)
      } else {
        this.standby = res.data
        // this.$route.params.id
        this.axios.post('/book/web/api/book/listPage', {pageNum: '1', pageSize: '10', category: source, classifyId: id}).then(function (res) {
          console.log(res.data.data)
          _that.selectionList = res.data
        })
      }
    }
  },
  // 获取新闻列表页面
  activated () {
    this.axios.post('/book/web/api/book/search', {pageNum: '1', pageSize: '10', category: this.category}).then(this.fundHomeDate)
  }
}
</script>

<style scoped lang='stylus'>
.selection{
  background: #eee;
  padding 0 10px;
  border-top-left-radius 30px;
  border-top-right-radius 30px;
  padding-bottom: 10px;
}
.active
  color #333!important
.listSort
  display flex
  justify-content space-around
  padding:10px 25px;
  li
    color: #aaa;
    font-size: .11rem;
</style>
