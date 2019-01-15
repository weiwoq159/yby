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
      <el-select v-model="yearChose" placeholder="请选择" class='selected1'>
        <el-option
          v-for="(item, index) in yearArr"
          :key="index"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <div class="screen">
        <i class='icon-liebiao iconfont'></i>
        <el-select  v-model="statusChose" placeholder="筛选" class='selected1 selcted2'>
          <el-option
            v-for="item in status"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    <publishList
      class='list'
      v-for='(item, index) in publishList2'
      :key="index"
      :publishList='item'
    >
    </publishList>
    <div v-if='publishList1.length===0'>
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
      publishList: '',
      publishList1: '',
      publishList2: '',
      yearArr: [],
      yearChose: '',
      status: [
        {
          name: '已发布',
          id: 1
        }, {
          name: '审核中',
          id: 2
        }, {
          name: '审核未通过',
          id: 3
        }
      ],
      statusChose: ''
    }
  },
  methods: {
    myPublish (res) {
      this.publishList = res.data.data
      this.yearChose = 2019
    }
  },
  watch: {
    yearChose (newVal, oldVal) {
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
      if (this.statusChose !== '') {
        this.publishList2 = this.publishList1.filter(val => {
          if (val.status === newVal) {
            return val
          }
        })
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
    this.axios.post('/book/web/api/book/getRelease ', {pageNum: 1, pageSize: 12}).then(this.myPublish)
  }
}
</script>

<style>
.icon-liebiao{
  font-size: 16px;
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
.selcted2::-webkit-input-placeholder{
  color:red;
}
.selcted2::-moz-placeholder{   /* Mozilla Firefox 19+ */
  color:red;
}
.selcted2:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
  color:red;
}
.selcted2:-ms-input-placeholder{  /* Internet Explorer 10-11 */
  color:red;
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
