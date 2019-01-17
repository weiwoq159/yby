/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/25
* Time: 下午5:20
* name:
*/
<template>
  <div class='searchResults'>
    <Header></Header>
    <SearchInput v-on:changeList='change' :name='name'></SearchInput>
    <div v-if='len === 0'>
      <img class='rocket' src="static/img/rocket.png" alt="">
      <p class='resultText'>未搜索到相关内容</p>
      <p class='resultText'>试试从其他分类下进行搜索</p>
    </div>
    <pullScroll v-if="len!==0"
      :on-pull='onPull'
      :scroll-state='scrollState'
      :page='page'
      ref='pullScroll'>
      <div slot='scrollList'>

        <FunedList
          v-for="(item, index) in searchList.data"
          :key="index"
          :content='item'
          v-if='len !== 0'
        >
        </FunedList>
      </div>
    </pullScroll>

    <p v-show='false'>{{name}}</p>

  </div>
</template>

<script>
import Header from '@/pages/common/header'
import SearchInput from '../common/searcResulthInput'
import FunedList from '@/pages/funed/components/funedList'
import pullScroll from '../common/pullScroll'

export default {
  name: 'searchResults',
  components: {
    Header,
    SearchInput,
    FunedList,
    pullScroll
  },
  data () {
    return {
      searchMes: '',
      searchList: '',
      standby: '',
      name: '',
      len: '',
      id: '',
      false: false,
      page: {
        counter: 1,
        total: 10
      },
      classify: '',
      scrollState: true
    }
  },
  methods: {
    mounted (res) {
      console.log(res)
      this.searchList = res.data
      this.len = this.searchList.data.length
    },
    addResult (res) {
      console.log(res)
      this.searchList.data = [...this.searchList.data, ...res.data.data]
    },
    change (childValue) {
      this.name = childValue
      console.log(this.name)
      this.axios.post('/book/web/api/book/search', {
        pageNum: 1,
        pageSize: 10,
        keyword: this.name[0],
        category: parseInt(this.name[1])
      }).then(this.mounted)
    },
    onPull (mun) { // 加载回调
      console.log(this.page.counter)
      if (this.page.counter <= this.page.total) {
        console.log('执行毁掉')
        this.axios.post('/book/web/api/book/search', {
          pageNum: 1,
          pageSize: 10,
          keyword: this.name[0],
          category: this.id
        }).then(this.addResult)
      } else {
        this.$refs.pullScroll.setState(7)
      }
    }
  },
  activated () {
    if (this.$route.params.name) {
      this.name = this.$route.params.name
      this.axios.post('/book/web/api/book/search', {
        pageNum: this.page.counter,
        pageSize: this.page.total,
        keyword: this.name,
        category: this.id
      }).then(this.mounted)
    }
  },
  beforeRouteLeave (to, from, next) {
    this.searchList = ''
    this.name = ''
    next()
  }
}
</script>

<style scoped>
.searchResults{
  height: 100%;
}
.rocket{
  width: 25px;
  height:38px;
  display: block;
  margin: 0 auto;
  margin-top: 30px;
}
  .resultText{
    text-align: center;
    font-size: 15px;
    margin-top: 15px;
    color: #666;
  }
</style>
