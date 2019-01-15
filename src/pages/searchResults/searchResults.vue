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
    <SearchInput v-on:changeList='change'></SearchInput>
    <FunedList
      v-for="(item, index) in searchList.data"
      :key="index"
      :content='item'
      v-if='len !== 0'
    >
    </FunedList>
    <p v-show='false'>{{name}}</p>
    <div v-if='len === 0'>
      <img class='rocket' src="static/img/rocket.png" alt="">
      <p class='resultText'>未搜索到相关内容</p>
      <p class='resultText'>试试从其他分类下进行搜索</p>
    </div>
  </div>
</template>

<script>
import Header from '@/pages/common/header'
import SearchInput from '@/pages/common/searchInput'
import FunedList from '@/pages/funed/components/funedList'
export default {
  name: 'searchResults',
  components: {
    Header,
    SearchInput,
    FunedList
  },
  data () {
    return {
      searchMes: '',
      searchList: '',
      standby: '',
      name: '',
      len: '',
      id: '',
      false: false
    }
  },
  methods: {
    mounted (res) {
      console.log(res)
      this.searchList = res.data
      this.len = this.searchList.data.length
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
    }
  },
  watch: {

  },
  activated () {
    if (this.$route.params.name) {
      this.name = this.$route.params.name
      this.axios.post('/book/web/api/book/search', {
        pageNum: 1,
        pageSize: 10,
        keyword: this.name,
        category: this.id
      }).then(this.mounted)
    }
  },
  beforeRouteLeave (to, from, next) {
    this.searchList = ''
    next()
  }
}
</script>

<style scoped>
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
