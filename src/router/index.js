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
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'homePage',
    component: HomePage
  },
  {
    path: '/tabGroup',
    name: 'tabGroup',
    component: TabGroup,
    children: [{
      path: '/tabGroup/social',
      name: 'Social',
      component: Social
    },
    {
      path: '/tabGroup/HR',
      name: 'HumanResources',
      component: HumanResources
    },
    {
      path: '/tabGroup/taxation',
      name: 'Taxation',
      component: Taxation
    },
    {
      path: '/tabGroup/funed',
      name: 'Funed',
      component: Funed
    },
    {
      path: '/tabGroup/Selection',
      name: 'Selection',
      component: Selection
    },
    {
      path: '/tabGroup/HrList',
      name: 'HrList',
      component: HrList
    }
    ]
  },
  {
    path: '/SearchResults',
    name: 'SearchResults',
    component: SearchResults
  },
  {
    path: '/reply',
    name: 'Reply',
    component: Reply
  },
  {
    path: '/tabGroup/Selection/news/:bookId',
    name: 'News',
    component: News
  },
  {
    path: '/personal',
    name: 'Personal',
    component: Personal
  },
  {
    path: '/personal/mypublish',
    name: 'MyPublish',
    component: MyPublish
  },
  {
    path: '/personal/myreply',
    name: 'MyReply',
    component: MyReply
  },
  {
    path: '/personal/PublishedArticles',
    name: 'PublishedArticles',
    component: PublishedArticles
  },
  {
    path: '/text',
    name: 'text',
    component: text
  }
  ]
})
