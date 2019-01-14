/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/28
* Time: 下午1:31
* name:
*/
<template>
  <div class='newsList'>
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
  </div>
</template>

<script>
import FunedList from '@/pages/funed/components/funedList'
import bottomTemp from '../common/bottomTemp'
import api from '@/api/api'
export default {
  name: 'newsList',
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
      reply: {}
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
    }
  },
  // 获取新闻列表页面
  activated () {
    console.log(this.$route.params.url)
    if (this.$route.params.url) {
      this.$store.commit('SET_URL', this.$route.params.url)
    } else {
      this.$store.commit('SET_URL', this.$store.state.isLogin)
    }
    let source = this.$route.params.source
    let _that = this
    this.axios.post('/book/web/api/book/search', {pageNum: '1', pageSize: '10', category: source}).then(function (res) {
      console.log(res.data.data)
      _that.selectionList = res.data
    })
  }
}
</script>

<style scoped lang='stylus'>
  .newsList{
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
    padding:10px 35px;
    li
      color: #aaa;
      font-size: .11rem;
</style>
