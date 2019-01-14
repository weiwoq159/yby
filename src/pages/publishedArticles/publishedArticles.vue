/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/25
* Time: 下午5:09
* name:
*/
<template>
  <div class='release'>
    <div class="ReleaseTitle">
      <el-input v-model="publish.title" placeholder="标题："></el-input>
    </div>
    <div class="drowDown">
      <div class="ReleaseTitle" @click=DropDown()>
        <el-input v-model="publish.kind" placeholder="" :disabled="true"></el-input>
        <span> > </span>
      </div>
      <transition name="fade">
        <ul class='dropList' v-if='isDrop'>
          <li
            v-for='item in options'
            :key='item.id'
            @click='changeInput(item)'
          >
            <p>{{item.label}}</p>
          </li>
        </ul>
      </transition>
    </div>
    <div class="ReleaseContent">
      <el-input
        type="textarea"
        placeholder="正文"
        v-model="publish.content">
      </el-input>
    </div>
    <div class="upData">
      <button class='upButt' @click='submit'>发布精选</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'publishedArticles',
  data () {
    return {
      publish: {
        title: '',
        kind: '类型：',
        content: '',
        category: ''
      },
      isDrop: false,
      options: [{
        value: 1,
        label: '人力资源'
      }, {
        value: 2,
        label: '社会保障'
      }, {
        value: 3,
        label: '财务税收'
      }, {
        value: 4,
        label: '公积金'
      }]
    }
  },
  methods: {
    DropDown () {
      this.isDrop = !this.isDrop
    },
    changeInput (item) {
      this.publish.category = item.value
      this.publish.kind = item.label
      this.isDrop = !this.isDrop
    },
    submit () {
      this.axios.post('/book/web/api/release/essence', this.publish).then(res => console.log(res))
      console.log(this.publish)
    }
  }
}
</script>

<style lang='stylus'>
  .upData
    position relative
    box-shadow 0px -5px 25px #aaa
    display flex
    position fixed
    bottom 0;
    width 100%;
    height 30px;
    padding 15px 0px
  .upButt
    background: #c40000;
    color #fff;
    text-align center
    padding:5px 0px;
    display block
    width 90%;
    margin 0 auto
    border-radius 20px;
    align-items center
    font-size: 16px;
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity:0;
  }
  .ReleaseContent
    width 100%;
    display flex;
    margin-top .15rem
    border-bottom: 1px solid #eee
    .el-textarea__inner
      border-style none;
      height:480px;
  .ReleaseTitle
    width 100%;
    display flex;
    margin-top .15rem
    border-bottom:1px solid #eee
    p
      padding-left:12px
      width 60px;
      line-height .38rem
      font-size: .14rem;
    span
      line-height .38rem
      margin-right 20px;
    .el-input
      background: #fff
      .el-input__inner
        width 100%;
        height:.38rem;
        border-style none
        background-color: #fff!important;
        color: #606266
        line-height: 1
  .dropList
    padding-top:10px;
    padding-left:40px
    p
      height:20px;
      line-height 20px;
      font-size: 14px
</style>
