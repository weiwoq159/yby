/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/27
* Time: 下午1:26
* name:
*/
<template>
  <div class='text12'>
    <div v-for="(item, index) in input" :key="index">
      {{item.name}}<input type="text" v-model='item.value'>{{item.value}}
    </div>
    <button @click='checkInput'>检测</button>
    <div v-for="(item, key) in input1" :key="key">
      {{item}}{{key}}
    </div>
    <button @click='checkInput'>检测</button>
    <ul>
      <li
        v-for='(item, index) in input'
        :key="index"
        :class="show == index?'active': ''"
        @click='change(index)'
      >
        {{item}}
      </li>
    </ul>

    <ul class='textFlex'>
      <li>1211111112111111121111111211111112111111</li>
      <li>12111111121111111211111112111111</li>

      <li>12111111121111111211111112111111</li>

      <li>12111111121111111211111112111111</li>

      <li>12111111121111111211111112111111</li>

      <li>12111111121111111211111112111111</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'text123',
  data () {
    return {
      input: [{
        name: '用户名',
        value: ''
      }, {
        name: '密码',
        value: ''
      }, {
        name: '公积金',
        value: ''
      }, {
        name: '房产证',
        value: ''
      }],
      input1: {
        name: '1',
        password: '',
        address: '2'
      },
      show: true
    }
  },
  methods: {
    checkInput () {
      let input1 = this.input1
      var b = Object.keys(input1).filter(
        i => input1[i] === ''
      )
      console.log(b)
    },
    change (index) {
      this.show = index
      // let date = new Set()
      // let dateArr
      // let newObj = {}
      // if (Object.prototype.toString.call(newVal) === '[object Array]') {
      //   newVal.filter(res => {
      //     let year = new Date(res.time)
      //     date.add(year.getFullYear())
      //     return date
      //   })
      //   dateArr = [...date]
      //   dateArr.forEach((item, index) => {
      //     newObj[item] = []
      //     for (let i in newVal) {
      //       let year = newVal[i].time.substring(0, 4)
      //       if (item.toString() === year) {
      //         newObj[item].push(newVal[i])
      //         console.log(1)
      //       }
      //     }
      //   })
      //   console.log(newObj)
      //   this.publishList = newObj
      // } else {
      //   return false
      // }
      // return newObj
    }
  }
}
</script>

<style scoped>
  @import '~styles/reset'
  input{
  border: 1px solid #000;
}
  .active {
    background: #000;
  }
  .textFlex{
    width: 100%;
    display: flex;
    justify-content: space-between;
    overflow: scroll;
  }
  .textFlex li {
    background: #000;
    height: 20px;
    margin-left: 10px;
    color: #ffffff;
  }
</style>
