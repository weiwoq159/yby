import * as type from './mutationType'

const mutation = {
  [type.SET_SINGER] (state, isLogin) {
    state.isLogin = isLogin
  },
  [type.SET_URL] (state, url) {
    state.url = url
  },
  [type.SET_USERID] (state, userId) {
    state.userId = userId
  }
}

export default mutation
