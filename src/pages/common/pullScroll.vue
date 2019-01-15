/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2019/1/4
* Time: 下午3:39
* name:
*/
<template>
  <div
    class='pullScroll'
    ref='pullScroll'
    @scroll="onScroll($event)"
    @touchstart='touchStart($event)'
    @touchmove='touchMove($event)'
    @touchend='touchEnd($event)'
  >
    <div class="scroll-top" :style='{height: top+"px"}'>
      <div v-if='this.aspect === 2'>
        <p v-if='state === 1'>
          下拉刷新
        </p>
        <p v-if='state === 2'>
          刷新中
        </p>
        <p v-if='state === 3'>
          松开刷新
        </p>
        <p v-if='state === 4'>
          刷新完成
        </p>
      </div>
    </div>
    <div class="scrollList" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)'}">
      <slot name='scrollList'></slot>
      <div class="scroll-bottom">
        <div v-if="state==6">加载中</div>
        <div v-if="state==5">加载完成</div>
        <div v-if="state==7">没有更多</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pullScroll',
  props: {
    'page': {
      type: Object // counter: 当前页  pageStart: 开始页数  pageEnd: 结束页数  total: 总页数
    },
    'onRefresh': {
      type: Function,
      require: true
    },
    'onPull': {
      type: Function,
      require: true
    },
    'scrollState': {// 是否可滑动
      type: Boolean,
      require: true
    }
  },
  data () {
    return {
      startPageX: '',
      startPageY: '',
      myScroll: null,
      myScrollList: null,
      scrollPosition: '',
      timer: '',
      aspect: 1,
      top: 0,
      state: 0
    }
  },
  methods: {
    // 手指放到屏幕上
    /**
     * 1:下拉刷新
     * 2:刷新中
     * 3:松开刷新
     * 4:刷新完成
     * 5:加载完成
     * 7:没有更多
     * 加载中:6
     * */
    setState (index) {
      this.state = index
      if (index === 4 || index === 5) {
        setTimeout(() => {
          this.state = 0
          this.top = 0
        }, 400)
      }
      console.log(index)
    },
    touchStart (e) {
      this.startPageX = e.targetTouches[0].pageX
      this.startPageY = e.targetTouches[0].pageY
    },
    // 手指滑动
    touchMove (e) {
      let _this = this
      if (this.scrollState && e.targetTouches[0].pageY > _this.startPageY) {
        _this.aspect = 2
        if (_this.myScroll.scrollTop === 0) {
          let diff = e.targetTouches[0].pageY - _this.startPageY
          // 计算滑动距离
          _this.top = Math.pow(diff, 0.9)
          let ranget = diff / document.body.clientHeight * 100
          if (ranget > 20) {
            this.state = 3
          } else if (ranget < 15) {
            this.state = 1
          }
          e.preventDefault()
        }
      } else if (this.scrollState && e.targetTouches[0].pageY < _this.startPageY) {
        _this.top = 0
        _this.aspect = 1
      }
    },
    // 滑动结束  模块隐藏
    /*
     * 刷新中：1
     * 松开刷新：2
     * 刷新完成：3
     * 加载中：4
     * 加载完成：5
     * 下拉刷新：6
     * 没有更多：7
     */
    touchEnd (e) {
      if (this.aspect === 2 && this.state === 3) {
        console.log('go here')
        this.top = 100
        this.state = 2
        this.topCallBack()
      } else if (this.aspect === 2) {
        this.top = 0
        this.state = 0
      }
    },
    // 滚动条事件
    onScroll (e) {
      // 获取列表高度
      console.log(e)
      let listHeight = this.myScrollList.offsetHeight
      let listScrollTop = e.target.scrollTop + this.myScroll.offsetHeight // 当前滚动条位置
      if (this.state === 0 && listHeight - listScrollTop < 100) {
        this.bottomCallback()
      }
    },
    bottomCallback () {
      if (this.state !== 7) {
        this.state = 6
        this.onPull(this.state)
      } else {
        console.log('go here')
        setTimeout(() => {
          this.state = 0
        }, 500)
      }
    },
    topCallBack () {
      this.onRefresh(this.state)
    }
  },
  mounted () {
    this.myScroll = this.$refs.pullScroll // 获取滑条dom
    this.myScrollList = this.myScroll.children[1] // 获取列表dom
    console.log(this.myScrollList)
  }
}
</script>

<style scoped>
.pullScroll{
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  overflow:hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  will-change: transform;
  transition: all 450ms;
  backface-visibility: hidden;
}
.scroll-top{
  color:#333;
  text-align: center;
  display:flex;
  position:absolute;
  top:0;
  left:0;
  width:100%;
  overflow: hidden;
  background: #ccc;
}
.scroll-top div{
  display:flex;
  height:auto;
  width:100%;
  justify-content: center;
  align-items:center;
  flex-wrap: wrap;
}
.scrollList{
  overflow:hidden;
  min-height: 100%;
}
.scroll-bottom{
  text-align: center;
  line-height: 40px;
}
</style>
