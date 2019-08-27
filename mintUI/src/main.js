// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import './assets/reset.css'

import Vue from 'vue'
import App from './App'
import router from './router/index.js'
// 按需引入mint-ui部分组件
import { Header, Swipe, SwipeItem, Button, Switch } from 'mint-ui'
// 导入 MUI 的样式 用与底部 tabbar 样式
import '../lib/mui/css/mui.min.css'
import '../lib/mui/css/icons-extra.css'
// 引入veu-preview
import VuePreview from 'vue-preview'
// 引入Vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 使用vue-preview
Vue.use(VuePreview)
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.component(Switch.name, Switch)
Vue.config.productionTip = false
// 时间过滤器
Vue.filter('dataFilter', function (time) {
  let a = time.replace(/-/g, '/')
  let date = new Date(a)// 把定义的时间赋值进来进行下面的转换
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  // 修改格式
  month = month < 10 ? (month = '0' + month) : month
  day < 10 && (day = '0' + day)
  minute < 10 && (minute = '0' + minute)
  second < 10 && (second = '0' + second)
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
})
var car = JSON.parse(localStorage.getItem('car') || '[]')
const store = new Vuex.Store({
  state: {
    car: car
  },
  mutations: {
    seclecNum (state, obj) {
      var flag = false
      state.car.some(item => {
        if (item.id === obj.id) {
          item.count += parseInt(obj.count)
          flag = true
          return true
        }
      })
      if (!flag) {
        state.car.push(obj)
      }
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    getCarCount (state, obj) {
      state.car.some(item => {
        if (item.id === obj.id) {
          item.count = parseInt(obj.count)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    getSelectedChange (state, obj) {
      state.car.some(item => {
        if (item.id === obj.id) {
          item.seclected = obj.seclected
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    getAllCount (state) {
      var c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getCount (state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getSelected (state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.seclected
      })
      return o
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
