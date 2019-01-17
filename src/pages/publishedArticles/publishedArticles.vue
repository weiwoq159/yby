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
      <label class="leftTitle">标题：</label>
      <el-input class="rightFont" v-model="publish.title" ></el-input>
    </div>
    <div class="drowDown">
      <div class="ReleaseTitle" @click=DropDown()>
        <label class="leftTitle leftTitle2">类型：</label>
        <el-input v-model="publish.kind"  :disabled="true"></el-input>
        <span class="el-icon-arrow-right"></span>
      </div>
      <div name="fade" class="seList">
        <ul class='dropList' v-if='isDrop'>
          <li v-for='item in options' :key='item.id' @click='changeInput(item)' >
            <p>{{item.label}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="ReleaseContent">
      <label class="leftTitle">内容：</label>
      <el-input type="textarea" v-model="publish.content"></el-input>
    </div>
    <div class="upData">
      <button class='upButt' type="primary" @click='submit'>发布精选</button>
      <button class='upButt downButt' type="primary" @click='cancel'>取消发布</button>
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
        kind: '人力资源',
        content: '',
        category: ''
      },
      fullscreenLoading: false,
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
      const loading = this.$loading({
        lock: true,
        text: '文章发布中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      console.log(this.title)
      if (this.publish.title === '') {
        loading.text = '标题不能为空'
        loading.spinner = 'el-icon-error'
      } else if (this.publish.content === '') {
        loading.text = '正文不能为空'
        loading.spinner = 'el-icon-error'
      } else if (this.publish.category === '') {
        loading.text = '请选择类型'
        loading.spinner = 'el-icon-error'
      } else {
        this.axios.post('/book/web/api/release/essence', this.publish).then(res => {
          if (res.data.msg === 'success') {
            loading.text = '文章已发布'
            loading.spinner = 'el-icon-success'
            setTimeout(() => {
              loading.close()
            }, 1000)
            this.publish = {
              title: '',
              kind: '类型：',
              content: '',
              category: ''
            }
            this.$router.push({name: 'Selection'})
          }
        })
      }
      setTimeout(() => {
        loading.close()
      }, 1000)
    },
    cancel () {
      this.$router.back()
    }
  },
  mounted () {
    this.publish.category = this.options[0].value
  }
}
</script>

<style lang='stylus'>
  .el-input__inner[disabled]{
    color :#000!important
    opacity 1;
  }
  .leftTitle{
    display:inline-block;
    width:30vw;
    margin-top:4vw;
    text-align: center;
    font-size:4vw;
  }
  .seList{
    position: absolute;
    background: #fff;
    left: 15vw;
  }
  .leftTitle.leftTitle2{
    margin-left :1vw;
  }
  .rightFont .el-input__inner
  {
    margin-left:-1vw;
  }
  .upData
    position relative
    box-shadow 0 25px 72px 0 #999;
    display flex
    position fixed
    bottom 0;
    width 100%;
    height 7vw;
    padding 0.1rem 0
    background #fff
  .upButt
    background: #c40000;
    color #fff;
    text-align center
    /*padding:5px 0px;*/
    display block
    width 45%;
    margin 0 auto
    border-radius 20px;
    align-items center
    font-size: 4vw;
    line-height: 4vw;
  .downButt
    background: #ffa200
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity:0;
  }
  .el-icon-success,.el-icon-loading,.el-icon-error{
    font-size: 40px;
    margin-bottom 15px;
  }
  .el-loading-spinner{
    margin-top -40px;
  }
  .ReleaseContent
    width 100%;
    display flex;
    margin-top 1vw;
    .el-textarea__inner
      margin-top:2vw;
      margin-left:-2vw;
      border-style none;
      height:100vw;
  .ReleaseTitle
    width 100%;
    display flex;
    border-bottom 1px solid #eee
    p
      padding-left 12px
      width 60px;
      line-height .38rem
      font-size: .14rem;
    span
      line-height .38rem
      margin-right 20px;
      font-size: 14px;
    .el-input
      background: #fff
      .el-input__inner
        width 100%;
        height:12vw;
        border-style none
        background-color: #fff!important;
        color: #333;
        line-height 8vw;
  .dropList
    padding-top:10px;
    padding-left:40px;
    p
     height: 7.5vw;
     line-height: 20px;
     font-size: 4vw;
</style>
