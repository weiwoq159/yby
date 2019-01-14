/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2019/1/4
* Time: 下午5:41
* name:
*/
<template>
  <div class='list'>
    <pullScroll
      :on-refresh='onRefresh'
      :on-pull='onPull'
      :scroll-state='scrollState'
      :page='page'
      ref='pullScroll'>
      <div slot='scrollList'>
        <ul>
          <li
            v-for='(item, index) in list'
            :key='index'
          >
            {{item.name}}
          </li>
        </ul>
      </div>
    </pullScroll>
  </div>
</template>

<script>
import pullScroll from './pullScroll'
export default {
  name: 'list',
  components: {
    pullScroll
  },
  data () {
    return {
      list: [
        {
          name: 'lili',
          id: 1
        }
      ],
      page: {
        counter: 9,
        pageStart: 1,
        pageEnd: 1,
        total: 10
      },
      scrollState: true
    }
  },
  methods: {
    onRefresh (mun) { // 刷新回调
      setTimeout(() => {
        let arr = []
        for (let i = 1; i <= 30; i++) {
          arr.push({
            name: 'lilei',
            id: 1
          })
        }
        this.list = arr
        this.page.counter = 1
        this.$refs.pullScroll.setState(4)
      }, 400)
    },
    onPull (mun) { // 加载回调
      console.log(this.page.counter)
      if (this.page.counter <= this.page.total) {
        setTimeout(() => {
          this.page.counter++
          for (let i = 1; i <= 10; i++) {
            this.list.push({
              name: 'lucy',
              id: 1
            })
          }
          this.$refs.pullScroll.setState(5)
        }, 500)
      } else {
        this.$refs.pullScroll.setState(7)
      }
    }
  },
  mounted () {
    for (let i = 0; i <= 30; i++) {
      this.list.push({
        name: 'lili',
        id: 1
      })
    }
  }
}
</script>

<style scoped>
.list{
  height: 100%;
}
</style>
