/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/25
* Time: 下午5:17
* name:
*/
<template>
  <div class='humanResources'>
    <PageParts
      :list='HRList'
      :name='name'
      :scource='category'
    ></PageParts>
  </div>
</template>

<script>
import api from '@/api/api'
import PageParts from '../common/pageParts'
export default {
  name: 'humanResources',
  components: {
    PageParts
  },
  data () {
    return {
      HRList: '',
      address: '',
      name: '人力资源',
      category: 1
    }
  },
  methods: {
    searchHome (res) {
      this.HRList = res.data.data
      // console.log(res.data.data)
      api.checkImg(this.HRList)
    },
    changeAddress (res) {
      this.address = res.data
    }
  },
  mounted () {
    this.axios.get('./static/address.json').then(this.changeAddress)
    this.axios.post('/book/web/api/book/searchHome', {category: this.category}).then(this.searchHome)
  }
}
</script>

<style scoped>

</style>
