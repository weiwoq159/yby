/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/25
* Time: 下午5:03
* name:
*/
<template>
  <div class='homePage'>
    <HomePageHeader></HomePageHeader>
    <div class="logo">
      <img src="static/img/logo.png" alt="">
    </div>
    <HomePageSearch></HomePageSearch>
    <Navigation></Navigation>
  </div>
</template>

<script>
import HomePageHeader from './components/homePageHeader'
import HomePageSearch from './components/homePageSearch'
import Navigation from './components/navigation'
export default {
  name: 'homePage',
  components: {
    HomePageHeader,
    HomePageSearch,
    Navigation
  },
  methods: {
    myPublish (res) {
      this.$store.commit('SET_USERINFO', res.data.data)
      console.log(this.$store.state.userInfo)
    }
  },
  mounted () {
    this.axios.post('/book/web/api/login/userMessage ', {pageNum: 1, pageSize: 12}).then(this.myPublish)
    try {
      if (localStorage.token) {
        let token = localStorage.token
        console.log('-----token-----')
        console.log(token)
        console.log('-----token-----')
      }
    } catch (e) {
      console.log('不支持')
    }
    let token = localStorage.getItem('XMDADMINTOKEN')
    console.log(token)
  }
}
</script>

<style scoped lang='stylus'>
  .logo
    margin-top : .96rem
    margin-bottom: .31rem
    img
      display: block
      width :1.1rem
      margin:0 auto;
</style>
