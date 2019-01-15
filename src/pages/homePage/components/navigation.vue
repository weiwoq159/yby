/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/25
* Time: 下午5:04
* name:
*/
<template>
  <div class='navigation'>
    <ul>
      <li v-for='(item, index) in list'
          :key='index'
          :class="index==0 ? 'active' : ''">
        <router-link :to='item.link'>{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  data () {
    return {
      list: [{
        name: '人力资源',
        link: '/tabGroup/HR'
      }, {
        name: '社会保障',
        link: '/tabGroup/social'
      }, {
        name: '财务税收',
        link: '/tabGroup/taxation'
      }, {
        name: '公积金',
        link: '/tabGroup/funed'
      }, {
        name: '燚精选',
        link: '/tabGroup/Selection'
      }]
    }
  }
}
</script>

<style scoped lang='stylus'>
  @import '~styles/index.styl'
  .active
    border-style none
    padding-left:0px
  ul
    margin-top .41rem;
    display: flex
    justify-content: space-around
    padding: 0 .40rem
    li
      font-size: .12rem;
      /*margin-right:0.5vw;*/
      a
        color:$link
    div
      width 1px;
      height: 100%
      background: #000;

</style>
