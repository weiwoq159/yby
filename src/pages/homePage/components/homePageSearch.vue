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
      this.$router.push({name: 'SearchResults', params: {name: this.input5}})
    }
  }
}
</script>

<style lang='stylus'>
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
    font-size: .19rem;
  .el-input-group__append
    border-color : #aaa!important;
    border-left:1px solid #aaa
  .el-button--default
    font-size: .19rem;
    border-left:0px;
  .el-icon-search
    padding-left 0px
</style>
