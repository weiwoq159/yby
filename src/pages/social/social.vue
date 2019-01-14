/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/25
* Time: 下午5:15
* name:
*/
<template>
  <div class='social'>
    <PageParts
      :list='socialList'
      :name='name'
      :scource='category'
    >
    </PageParts>
  </div>
</template>

<script>
import api from '@/api/api'
import PageParts from '../common/pageParts'
export default {
  name: 'social',
  components: {
    PageParts
  },
  data () {
    return {
      socialList: '',
      name: '社会保障',
      category: 2
    }
  },
  methods: {
    searchHome (res) {
      console.log(res)
      this.socialList = res.data.data
      api.checkImg(this.socialList)
    }
  },
  mounted () {
    this.axios.post('/book/web/api/book/searchHome', {category: this.category}).then(this.searchHome)
  }
  // ,
  // beforeRouteLeave (to, from, next) {
  //   console.log(this)
  //   next()
  // }
}
</script>

<style scoped>

</style>
