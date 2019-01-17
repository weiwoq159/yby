/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/26
* Time: 下午1:18
* name:
*/
<template>
  <div class='navigation'>
    <ul>
      <li
        v-for= '(item, index) in list'
        :key = 'index'
        @click="changeUrl(item)"
      >
        <router-link
          :to='item.link'
          @click="changeUrl(item)"
        >{{item.name}}
          <div class="line"></div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  data () {
    return {
      url: '',
      routePath: '',
      list: [{
        name: '人力资源',
        link: '/tabGroup/HR',
        category: 1
      }, {
        name: '社会保障',
        link: '/tabGroup/social',
        category: 2
      }, {
        name: '财务税收',
        link: '/tabGroup/taxation',
        category: 3
      }, {
        name: '公积金',
        link: '/tabGroup/funed',
        category: 4
      }, {
        name: '燚精选',
        link: '/tabGroup/Selection',
        category: 5
      }]
    }
  },
  methods: {
    changeUrl (item) {
      localStorage.setItem('source', item.category)
    }
  },
  activated () {
    if (this.$route.path !== '/tabGroup/HrList') {
      this.$store.commit('SET_URL', this.$route.path)
      this.url = this.$store.state.url
      // console.log(this.url)
    }
  }
}
</script>

<style scoped lang='stylus'>
  @import "~@/assets/index.styl"
  .active1
    color:#c40000
    .line
      background: #c40000;
      display : block
  .line
    display none
  .router-link-active
    color:#c40000
    .line
      display block
  ul
    display flex;
    justify-content: space-around;
    background: #f8f8f8
    height: .35rem
    li
      line-height :.35rem
      font-size: .13rem;
      position relative
      .line
        background: #c40000;
        width .3rem;
        height 4px;
        margin : 0 auto;
        margin-top -4px;
        border-radius 4px;
        display none;
      a
        color:$link
</style>
