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
  let AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1NzgyNDYzOTE0MDc4MjA4Iiwic3QiOiIyIiwibG4iOiI4MCIsInBoIjoiMTM4MzU1MDA3MTIiLCJybiI6IumprOW8uuW8uiIsImV4cCI6MTU0Nzg5MjQ4NX0.gYUnvUJpbIxr3XkGlJuiZar59CDjXS2FoEdSUgCAFiM'
  if (AUTH_TOKEN) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.common = {
      'x-authentication-token': `${AUTH_TOKEN}`
    }
    config.headers.name = 'daf'
  }
  return config
})
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
