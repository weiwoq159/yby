/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/26
* Time: 上午9:46
* name:
*/
<template>
  <div class='pageParts'>
    <div class="list">
      <div class='hrList'
           v-for='item in list'
           :key='item.classify'
           :style="{backgroundImage:'url(' + item.img + ')', height:height + 'rem'}"
           @click='goToDetail(item)'
      >
        <div class="hrTitle">
          <p>{{item.classify}}</p>
          <div class='line'></div>
        </div>
        <div class="readNum">
          <span>{{item.count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pageParts',
  props: ['list', 'height', 'name', 'scource'],
  methods: {
    goToDetail (item) {
      console.log(item)
      this.$router.push({name: 'SocialList', params: {source: this.scource, url: this.name, classify: item.classify}})
    }
  },
  mounted () {
    console.log('-----this.source-----')
    console.log(this.scource)
    console.log('-----this.source-----')
  }
}
</script>

<style scoped lang='stylus'>
.pageParts
  padding:0 13px;
  .hrList
    background-size cover
    border-radius 5px;
    display flex;
    justify-content space-between;
    padding .15rem
    margin-bottom 10px;
    height:85px;
    div
      color: #fff
      p
        font-size: .14rem;
      span
        font-size: .12rem;
        display block
        padding:2px .14rem
        border:1px solid #fff;
        border-radius 14rem
      .line
        height:3px;
        width 30px
        background: #fff;
        margin-top 6px;
        border-radius 5px;
</style>
