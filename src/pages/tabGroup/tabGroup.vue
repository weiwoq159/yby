/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/25
* Time: 下午5:05
* name:
*/
<template>
  <div class='tabgroup'>
    <TagHeader></TagHeader>
    <Navigation></Navigation>
    <SearchInput
      :option = 'address'
      :chosePlace='place'
      ref='searchInput'></SearchInput>
    <keep-alive exclude='Selection'>
      <router-view ref='part'></router-view>
    </keep-alive>
  </div>
</template>

<script>
import TagHeader from '../common/header'
import SearchInput from '../common/searchInput'
import Navigation from './components/navigation'
export default {
  name: 'tabgroup',
  components: {
    TagHeader,
    SearchInput,
    Navigation
  },
  data () {
    return {
      url: '',
      address: '',
      options: [{
        id: '1',
        name: '人力资源'
      }, {
        id: '2',
        name: '社会保障'
      }, {
        id: '3',
        name: '财务税收'
      }, {
        id: '4',
        name: '公积金'
      }],
      place: '请选择'
    }
  },
  mounted () {
    console.log(this.$route.path)
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      console.log(vm.url = to.path)
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.url = to.path
    next()
  },
  methods: {
    changeAddress (res) {
      this.address = res.data
      this.place = '请选择省市'
    }
  },
  updated () {
    // console.log(this.$refs.searchInput)
    this.$refs.searchInput.id = ''
    this.$refs.searchInput.input = ''
  },
  watch: {
    url (newVal, oldVal) {
      if (newVal === '/tabGroup/HR' || newVal === '/tabGroup/social' || newVal === '/tabGroup/taxation' || newVal === '/tabGroup/funed') {
        this.axios.get('./static/address.json', {category: '1'})
          .then(this.changeAddress)
      } else {
        this.place = '请选择'
        this.address = this.options
      }
    }
  }
}
</script>

<style scoped>

</style>
