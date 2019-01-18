/**
* Created with vue.js
* User: 马强/529524114@qq.com
* Date: 2018/12/25
* Time: 下午3:53
* name:我的发布
*/
<template>
  <div class='myPublish'>
    <div class="select">
      <div class="year">
        <div class='pullList' @click='choseYearList'>
          <span class='choseName'>{{yearChose}}</span>
        </div>
        <ul v-if='display1' class='selectList1'>
          <li
            v-for='item in yearArr'
            :key=item
            @click='chooseYear(item)'
          >
            {{item}}
          </li>
        </ul>
      </div>
      <div class="screen">
        <div class='pullList' @click='choseNameList'>
          <i class='icon-liebiao iconfont'></i>
          <span class='choseName'>{{choseName}}</span>
        </div>
        <ul v-if='display' class='selectList'>
          <li
            v-for='(item, index) in status'
            :key='index'
            @click='chooseName(item)'
          >
            {{item.name}}
          </li>
        </ul>
      </div>
    </div>
    <publishList
      class='list'
      v-for='(item, index) in publishList2'
      :key="index"
      :publishList='item'
    >
    </publishList>
    <div v-if='publishList.length===0'>
      <p>该年度暂无文章发布</p>
    </div>
  </div>
</template>

<script>
import publishList from './components/publishList'
export default {
  name: 'myPublish',
  components: {
    publishList
  },
  data () {
    return {
      publishList: [],
      publishList1: '',
      publishList2: [],
      yearArr: [],
      yearChose: '',
      display: false,
      status: [
        {
          name: '全部',
          id: 0
        }, {
          name: '已发布',
          id: 1
        }, {
          name: '审核中',
          id: 2
        }, {
          name: '审核未通过',
          id: 4
        }
      ],
      choseName: '筛选',
      statusChose: '',
      status1: '',
      display1: ''
    }
  },
  methods: {
    chooseName (item) {
      console.log(item)
      this.statusChose = item.id
      this.choseName = item.name
      this.status1 = item.status
      this.display = !this.display
    },
    chooseYear (item) {
      console.log(item)
      this.yearChose = item
      this.display1 = !this.display1
    },
    choseNameList () {
      this.display = !this.display
      this.display1 = false
    },
    choseYearList () {
      this.display1 = !this.display1
      this.display = false
    },
    myPublish (res) {
      // console.log('-----res-----')
      // console.log(res)
      // console.log('-----res-----')
      // let _this = this
      // this.yearChose = '2019'
      // Object.keys(res.data.data).forEach(function (item) {
      //   res.data.data[item].forEach(function (i) {
      //     _this.publishList.push(i)
      //   })
      // })
      this.publishList = res.data.data
      this.yearChose = '2019'
    }
  },
  watch: {
    yearChose (newVal, oldVal) {
      console.log(newVal)
      this.publishList1 = this.publishList.filter(val => {
        if (val.time.substring(0, 4) === newVal.toString()) {
          return val
        }
      })
      this.statusChose = ''
      this.publishList2 = this.publishList1
      console.log(this.publishList2)
    },
    statusChose (newVal, oldVal) {
      if (newVal === 0) {
        this.publishList2 = this.publishList1
      } else {
        if (this.statusChose !== '') {
          this.publishList2 = this.publishList1.filter(val => {
            if (val.status === newVal) {
              return val
            }
          })
        }
      }
    }
  },
  mounted () {
    let date = new Date()
    let year = date.getFullYear()
    for (let item = 0; item <= 1; item++) {
      this.yearArr.push(year - item)
    }
    console.log(this.yearArr)
    // this.axios.get('static/tsconfig.json').then(this.myPublish)
    this.axios.post('/book/web/api/book/getRelease', {pageNum: 1, pageSize: 200}).then(this.myPublish)
  }
}
</script>

<style>
  .year li{
    text-align: center;
    padding:8px 0;
    font-size: 12px;
  }
  .year ul {
    width: 80px;
    margin-top: 10px;
    background: #fff;
    border-radius: 3px;
  }
  .choseName{
    margin-left: 5px;
    font-size:14px;
  }
  .el-input__suffix{
    right:13px;
  }
  .selectList1 {
    position: absolute;
    left: 10px;
    border:1px solid #666
  }
  .selectList {
    position: absolute;
    right: 0px;
    border:1px solid #666
  }
  .screen{
    position: relative;
    text-align: center;
  }
  .pullList{
    display: flex;
  }
.screen li{
  text-align: center;
  padding:8px 0;
  font-size: 12px;
}
  .screen ul {
    width: 80px;
    margin-top: 10px;
    background: #fff;
    border-radius: 3px;
  }
  .choseName{
    margin-left: 5px;
    font-size:14px;
  }
.icon-liebiao{
  font-size: 14px;
}
.myPublish{
  min-height: 100%;
  background: #eee;
  padding:13px;
  box-sizing: border-box;
}
.select{
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.selected1{
  width: 70px;
}
.selcted2{
  width: 70px;
}
.selcted2 span {
  display: none;
}
.selcted2 input {
  text-align: center;
}
.selected1 div .el-input__inner {
  padding-right:0px;
  padding:0px;
  background: rgba(0,0,0,0);
  border-style: none;
  color: #333;
}
.selected1 .el-input .el-select__caret{
  color: #333;
}
</style>
