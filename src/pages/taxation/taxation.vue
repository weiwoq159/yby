/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/25
* Time: 下午5:28
* name:
*/
<template>
  <div class='taxation'>
    <PageParts
      :list='taxationList'
      :height='height'
      :name='name'
      :scource='category'
    ></PageParts>
  </div>
</template>

<script>
import api from '@/api/api'
import PageParts from '../common/pageParts'

export default {
  name: 'taxation',
  components: {
    PageParts
  },
  data () {
    return {
      taxationList: '',
      height: 0.59,
      name: '财务税收',
      category: 3
    }
  },
  methods: {
    searchHome (res) {
      this.taxationList = res.data.data
      api.checkImg(this.taxationList)
    }
  },
  mounted () {
    this.axios.post('/book/web/api/book/searchHome', {category: this.category}).then(this.searchHome)
  },
  activated () {
    this.$store.commit('SET_SINGER', this.$route.path)
  }
}
</script>

<style>

</style>
