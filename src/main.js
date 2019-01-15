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

axios.interceptors.request.use(config => {
  try {
    if (localStorage.token) {
      let token = localStorage.token
      console.log('-----token-----')
      console.log(token)
      console.log('-----token-----')
    }
  } catch (e) {
    console.log('不支持')
  }
  // localStorage.setItem('XMDADMINTOKEN', 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2NTM0MTEwNTQ2MTI4ODk2Iiwic3QiOiIyIiwibG4iOiI2MiIsInBoIjoiMTg5ODcwOTAwNzMiLCJybiI6IjE4OTg3MDkwMDczIiwiZXhwIjoxNTQ4MDcxNjkyfQ.acf_iVnSldU7gPs-fgDX99Ob8nYTmRd_TMBIjnMaoOA\n')
  let token = localStorage.getItem('XMDADMINTOKEN')
  // console.log(token)
  let AUTH_TOKEN = token
  if (AUTH_TOKEN) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.common = {
      'x-authentication-token': `${AUTH_TOKEN}`
    }
    config.headers.name = 'daf'
  }
  return config
})
if (store.state.userInfo.name === '') {
  axios.post('/book/web/api/login/userMessage ', {pageNum: 1, pageSize: 12}).then(res => {
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
