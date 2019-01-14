/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/26
* Time: 上午11:11
* name:
*/
<template>
  <div
    class='searchInput'
    type="primary"
  >
    <div class="left">
      <el-select v-model="id" :placeholder="chosePlace">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div class="right">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <button class='seach_button' @click='upLoad()'>
        <i class='iconfont icon-search'></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searchInput',
  props: ['option', 'chosePlace'],
  data () {
    return {
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
      id: '',
      input: '',
      place: '请选择'
    }
  },
  methods: {
    upLoad () {
      if (this.input === '') {
        const loading = this.$loading({
          lock: true,
          text: '请输入搜索内容',
          spinner: 'el-icon-error',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        setTimeout(() => {
          loading.close()
        }, 2000)
      } else {
        this.$router.push({name: 'SearchResults', params: {name: this.input}})
      }
    }
  },
  watch: {
    option (newVal, oldVal) {
      this.options = newVal
    },
    chosePlace (newVal, oldVal) {
      this.place = newVal
    }
  }
}
</script>

<style lang='stylus'>
  @import "~@/assets/index.styl"
  .el-icon-success,.el-icon-loading,.el-icon-error{
    font-size: 40px;
    margin-bottom:15px;
  }
  .el-loading-spinner{
    margin-top:-40px;
  }
  .searchInput
    height:50px;
    display flex;
    justify-content space-between
    padding:.2rem .14rem
    height:.25rem
    input
      height:.25rem
      border-radius 40px;
      padding-right:30px;
      padding-left:7px;
      font-size: 12px;
      line-height 1.5;
      border 1px solid #aaa;
    button
      height:.25rem
      padding:0px;
    .left
      width 35%;
      i
        line-height:.25rem
    .right
      width 60%;
      position relative
      .seach_button
        position absolute;
        top:-1px
        right:10px;
        background: rgba(0,0,0,0);
        color:$button
</style>
