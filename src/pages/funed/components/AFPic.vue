/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/24
* Time: 下午4:19
* name:
*/
<template>
  <div class='AFPic'>
    <ul class='AFPicList'>
      <li
        v-for="(item, index) in AFPic"
        :key='index'
        :style="{backgroundImage:'url(' + item.img + ')'}"
        @click='goToDetail(item)'
      >
        <span>{{item.count}}</span>
        <p>{{item.classify}}</p>
        <div class='bottomLine'></div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/api/api'
export default {
  name: 'AFPic',
  props: ['AFPic', 'name', 'scource'],
  watch: {
    news (newVal, oldVal) {
      api.checkAFPic(newVal)
      console.log(newVal)
    },
    AFPic (newVal, oldVal) {
      console.log(newVal)
    }
  },
  methods: {
    goToDetail (item) {
      this.$router.push({name: 'list4', params: {source: this.scource, url: this.name, classify: item.classify}})
    }
  }
}
</script>

<style scoped lang='stylus'>
.clear {
  clear both
}
.AFPicList
  padding 0px 13px;
  display: flex;
  justify-content: space-between;
  li
    width: 110px;
    height:100px;
    background: #000;
    margin-bottom 20px;
    background-size cover
    float left;
    border-radius 4px
    span
      width 40px;
      font-size: 14px;
      border-radius 4px;
      background: #c40000;
      color: #fff
      display block
      text-align center;
    p
      text-align center;
      position relative;
      top:30%
      font-size: 14px;
      color:#fff;
    .bottomLine
      width .3rem;
      height:4px;
      border-radius 4px;
      background: #c40000;
      margin 0 auto
      position relative
      top:35%;
</style>
