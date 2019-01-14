/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2019/1/10
* Time: 上午9:42
* name:
*/
<template>
  <div class='replyInput' @touchmove.prevent @click='displayReply'>
    <div class="inputt">
      <input type="text" v-model='reply' @click.prevent>
      <i
        class='iconfont icon-tijiao'
        @click='replyEnter'
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'replyInput',
  data () {
    return {
      reply: ''
    }
  },
  methods: {
    replyEnter () {
      this.$emit('replyEnter1', false)
    },
    displayReply () {
      this.$emit('replyEnter1', false)
    }
  }
}
</script>

<style scoped>
.replyInput{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background: rgba(0,0,0,.3);
  z-index: 999999;
}
.inputt{
  background: #000;
  width: 100%;
  height:.6rem;
  padding:10px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
  .inputt input {
    width: 100%;
    height: 100%;
  }
  .icon-tijiao{
    font-size: 28px;
    color: #c40000;
    margin-left: 10px;
  }
</style>
