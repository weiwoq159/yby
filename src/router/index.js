import Vue from 'vue'
import Router from 'vue-router'
import Funed from '../pages/funed/funed'
import HomePage from '../pages/homePage/homePage'
import HumanResources from '../pages/humanResources/humanResources'
// import Mine from '../pages/personal/mine'
import Personal from '../pages/personal/personal'
import MyPublish from '../pages/personal/myPublish'
import MyReply from '../pages/personal/MyReply'
import PublishedArticles from '../pages/publishedArticles/publishedArticles'
import SearchResults from '../pages/searchResults/searchResults'
import Selection from '../pages/selection/selection'
import Social from '../pages/social/social'
import TabGroup from '../pages/tabGroup/tabgroup'
import Taxation from '../pages/taxation/taxation'
import News from '../pages/news/news'
import text from '../pages/common/text'
import HrList from '../pages/common/newsList'
import Reply from '../pages/common/reply'
import list from '../pages/common/list'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'homePage',
    meta: {
      title: '首页'
    },
    component: HomePage
  },
  {
    path: '/tabGroup',
    name: 'tabGroup',
    component: TabGroup,
    children: [{
      path: '/tabGroup/social',
      name: 'Social',
      meta: {
        title: '社会保障'
      },
      component: Social,
      children: [
        {
          path: '/tabGroup/social/list',
          name: 'socialList',
          component: HrList
        }
      ]
    },
    {
      path: '/tabGroup/HR',
      name: 'HumanResources',
      meta: {
        title: '人力资源'
      },
      component: HumanResources,
      children: [
        {
          path: '/tabGroup/HR/list',
          name: 'hrList',
          component: HrList
        }
      ]
    },
    {
      path: '/tabGroup/taxation',
      name: 'Taxation',
      meta: {
        title: '账务税收'
      },
      component: Taxation
    },
    {
      path: '/tabGroup/funed',
      name: 'Funed',
      meta: {
        title: '公积金'
      },
      component: Funed
    },
    {
      path: '/tabGroup/Selection',
      name: 'Selection',
      meta: {
        title: '燚精选'
      },
      component: Selection
    },
    {
      path: '/tabGroup/HrList',
      name: 'HrList',
      meta: {
        title: '列表'
      },
      component: HrList
    }
    ]
  },
  {
    path: '/SearchResults',
    name: 'SearchResults',
    meta: {
      title: '搜索结果'
    },
    component: SearchResults
  },
  {
    path: '/reply',
    name: 'Reply',
    meta: {
      title: '我的回复'
    },
    component: Reply
  },
  {
    path: '/tabGroup/Selection/news/:bookId',
    name: 'News',
    meta: {
      title: '新闻详情'
    },
    component: News
  },
  {
    path: '/personal',
    name: 'Personal',
    meta: {
      title: '个人中心'
    },
    component: Personal
  },
  {
    path: '/personal/mypublish',
    name: 'MyPublish',
    meta: {
      title: '我的发布'
    },
    component: MyPublish
  },
  {
    path: '/personal/myreply',
    name: 'MyReply',
    meta: {
      title: '我的回复'
    },
    component: MyReply
  },
  {
    path: '/personal/PublishedArticles',
    name: 'PublishedArticles',
    meta: {
      title: '发布精选'
    },
    component: PublishedArticles
  },
  {
    path: '/text',
    name: 'text',
    component: text
  },
  {
    path: '/list',
    name: 'list',
    component: list
  }
  ]
})
