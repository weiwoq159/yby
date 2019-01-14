/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/26
* Time: 上午11:11
* name:
*/
<template>
  <div class='searchInput'>
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
      }, {
        id: '5',
        name: '燚️精选'
      }],
      id: '',
      input: '',
      place: '请选择'
    }
  },
  methods: {
    upLoad (res) {
      this.$router.push({name: 'SearchResults', params: {name: this.input}})
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
      font-size: 14px;
      line-height 1.5
    button
      height:.25rem
      padding:0px;
    .left
      width 30%;
      i
        line-height:.25rem
    .right
      width 65%;
      position relative
      .seach_button
        position absolute;
        top:-1px
        right:10px;
        background: rgba(0,0,0,0);
        color:$button
</style>
