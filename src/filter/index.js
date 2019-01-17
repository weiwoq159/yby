import Vue from 'vue'
// import {formatDate} from './time'
Vue.filter('telToName', function (value) {
  if ((/^1(3|4|5|7|8)\d{9}$/.test(value))) {
    return value.substr(0, 3) + '*****' + value.substr(8, 11)
  } else {
    return value
  }
})
Vue.filter('changeTitle', function (value) {
  if (value) {
    if (value.length <= 10) {
      return value
    } else {
      return value.substring(0, 10) + '...'
    }
  }
})
Vue.filter('content', function (value) {
  if (value.length <= 40) {
    return value
  } else {
    return value.substring(0, 40) + '...'
  }
})
Vue.filter('replyNum', function (value) {
  if (value === null) {
    return 0
  } else {
    return value
  }
})
Vue.filter('telReplace', function (value) {
  if (value) {
    return value.substr(0, 3) + '****' + value.substr(7, 11)
  } else {
    return ''
  }
})
Vue.filter('changeContent', function (value) {
  if (!value) {
    value = ''
    return value
  }
  value = value.replace(/<\/?[^>]*>/g, '')
  value = value.replace(/[ | ]*\n/g, '\n')
  value = value.replace(/\n[\s| | ]*\r/g, '\n')
  value = value.replace(/&nbsp;/ig, '')
  value = value.replace(/\s+/ig, '')
  value = value.replace(/[a-zA-Z]/, '')
  return value.substring(0, 80) + '...'
})
Vue.filter('changeSource', function (value) {
  if (value.length > 7) {
    return value.substring(0, 7) + '...'
  } else {
    return value
  }
})

// Vue.filter('dateShow', function (value) {
//   let date = new Date(value)
//   return formatDate(date, 'yy/MM/dd')
// })

Vue.filter('dateShow', function (time) {
  // console.log(value.replace(/-/g, '/'))
  // let date = new Date(value)
  // console.log(date)
  // let o = {
  //   'Y+': date.getFullYear(),
  //   'M+': date.getMonth() + 1,
  //   'd+': date.getDate() - 1,
  //   'h+': date.getHours(),
  //   'm+': date.getMinutes(),
  //   's+': date.getSeconds()
  // }
  // let formate = ''
  // for (let k in o) {
  //   if (o[k] !== 0) {
  //     formate += o[k] + '-'
  //   }
  // }
  // let f = formate.substr(0, formate.length - 1)
  // return f
  if (time !== '' && time !== null && time !== undefined) {
    time = time.substring(0, 10)
    time = time.replace(/-/, '-').replace(/-/, '-')
    return time
  }
})

Vue.filter('dateFilter', function (time) {
  var date = new Date(time)
  return date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate()
})

Vue.filter('changeStatus', function (time) {
  if (time === 1) {
    return '已发布'
  } else if (time === 2) {
    return '审核中'
  } else if (time === 3) {
    return '审核未通过'
  }
})

Vue.filter('num', function (value) {
  let chineseArr = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  let english = value.split('')
  let arr = []
  for (let i in english) {
    arr.push(chineseArr[english[i]])
  }
  return arr.join('')
})
export default {

}
