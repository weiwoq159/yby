// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/reset.css'
import '@/assets/iconfont.css'
import filter from './filter'
import store from '@/store'
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

// import Vconsole from 'vconsole'
// let vConsole = new Vconsole()
// export default vConsole
Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(elementUi)
/* eslint-disable no-new */
// localStorage.setItem('XMDADMINTOKEN', 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2NTM0MTEwNTQ2MTI4ODk2Iiwic3QiOiIyIiwibG4iOiI2MiIsInBoIjoiMTg5ODcwOTAwNzMiLCJybiI6IjE4OTg3MDkwMDczIiwiZXhwIjoxNTQ4MDcxNjkyfQ.acf_iVnSldU7gPs-fgDX99Ob8nYTmRd_TMBIjnMaoOA')

function getQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
// 这样调用：
let token = getQueryString('token')
if (token === null) {
  console.log(1)
} else {
  localStorage.setItem('token', getQueryString('token'))
}
// localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2NTM0MTEwNTQ2MTI4ODk2Iiwic3QiOiIyIiwibG4iOiI2MiIsInBoIjoiMTg5ODcwOTAwNzMiLCJybiI6IjE4OTg3MDkwMDczIiwiZXhwIjoxNTQ4MDcxNjkyfQ.acf_iVnSldU7gPs-fgDX99Ob8nYTmRd_TMBIjnMaoOA')
axios.interceptors.request.use(config => {
  config.headers.common = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    'x-authentication-token': localStorage.token === undefined ? '' : localStorage.token
  }
  // config.timeout = 3600*24*7;
  config.timeout = 10000
  return config
})
console.log(store.state.userInfo.id === '')
if (store.state.userInfo.id === '') {
  axios.post('/book/web/api/login/userMessage ', {pageNum: 1, pageSize: 20}).then(res => {
    store.commit('SET_USERINFO', res.data.data)
  })
}

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
new Vue({
  el: '#app',
  router,
  filter,
  store,
  components: { App },
  template: '<App/>'
})
