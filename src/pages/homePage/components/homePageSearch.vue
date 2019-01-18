/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/25
* Time: 下午5:04
* name:
*/
<template>
  <div class="search">
    <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" @click='search'></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      input5: ''
    }
  },
  methods: {
    search () {
      if (this.input5 === '') {
        const loading = this.$loading({
          lock: true,
          text: '请输入搜索内容',
          spinner: 'el-icon-error',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        setTimeout(() => {
          loading.close()
        }, 2000)
        return false
      } else {
        this.$router.push({name: 'SearchResults', params: {name: this.input5}})
        localStorage.setItem('searchUrl', 1)
        localStorage.setItem('seach', this.input5)
        this.input5 = ''
      }
    }
  }
}
</script>

<style lang='stylus'>
  .el-icon-success,.el-icon-loading,.el-icon-error{
    font-size: 40px;
    margin-bottom:15px;
  }
  .el-loading-spinner{
    margin-top:-40px;
  }
  .search
    height:.3rem
    padding 0 .3rem
    .input-with-select
      height: .3rem
      border-radius .4rem
      border-color: #aaa
      input
        background: #fff;
        border-bottom-left-radius .4rem;
        border-top-left-radius .4rem
        border-right:0px;
        border-color:#aaa;
      .el-input-group__append
        background: #fff;
        border-bottom-right-radius .4rem;
        border-top-right-radius .4rem
  .el-icon-search
    font-size: .22rem;
    border-left:1px solid #aaa
    padding-left:10px
    display:inline-block;
    color:#333;
  .el-input-group__append
    border-color : #aaa!important;
    padding: 0 15px;
    /*border-left:1px solid #aaa*/
  .el-button--default
    font-size: .19rem;
    border-left:0px;

</style>
