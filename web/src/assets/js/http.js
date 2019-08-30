import axios from 'axios'
import DefaultJs from './default.js'
import Axios from '@/assets/js/axios'
import Router from '@/router'
import Message from '@/component/message'
import store from '@/store'
import {Promise} from "es6-promise-polyfill";
// Axios.accountInfo()
axios.defaults.timeout = 5000
axios.defaults.retry = 4
axios.defaults.retryDelay = 500
axios.interceptors.response.use((response) => {
  if (store.state.MOBILE === 'web') {
    var expireTime = localStorage.getItem('expire_time') * 1000
    var nowtime = new Date().getTime()
    if (localStorage.getItem('token') && DefaultJs.Fulltime(expireTime - nowtime).d <= 6) {
      Axios.axiospost({
        url: '/user/refreshToken'
      }).then((ret) => {
        if (ret.data.code == 0) {
          this.$message({
            content: ret.data.msg,
          })
          return
        }
        window.localStorage.setItem('token', ret.data.data.token)
        window.localStorage.setItem('expire_time', ret.data.data.expire_time)
      }).catch((error) => {
        console.log(error)
      })
    }
    if (!localStorage.getItem('token') || !localStorage.getItem('expire_time')) {
      DefaultJs.logoutremover()
    }
    if (window.localStorage.getItem('__M_a')) {
      store.state.users.mobile = window.atob(window.atob(window.atob(window.localStorage.getItem('__M_a'))))
      store.state.users.mobile = (store.state.users.mobile.slice(-3) + store.state.users.mobile.slice(0, -3))
    }
    if (window.localStorage.getItem('__W_a')) {
      store.state.users.user_email = window.atob(window.atob(window.atob(window.localStorage.getItem('__W_a'))))
      store.state.users.user_email = (store.state.users.user_email.slice(-3) + store.state.users.user_email.slice(0, -3))
    }
    if (localStorage.getItem('token') && (!window.localStorage.getItem('__W_a') && !window.localStorage.getItem('__M_a'))) {
      DefaultJs.logoutremover()
      Message.install({
        content: this.$t('common.l')
      })
    }
    store.state.users.mobile ? store.state.users.username = store.state.users.mobile : store.state.users.username = store.state.users.user_email
    if (response.data.code == 10001) {
      store.state.fullpath.name = Router.currentRoute.name
      store.state.fullpath.query = Router.currentRoute.query
      localStorage.getItem('token') ? store.state.users.token = localStorage.getItem('token') : store.state.users.token = false
      if (store.state.MOBILE == 'web') {
        Router.push({name: 'Login', query: {redirect: store.state.fullpath.name}})
      }
      // } else {
      //   Router.push({name: 'MobileRegister', query: {redirect: store.state.fullpath.name}})
      // }
      DefaultJs.logoutremover()
    } else {
    }
  }
  return response
}, (error) => {//请求出现错误时
  var config = error.config;
  if(!config || !config.retry) return Promise.reject(error);
  config.__retryCount = config.__retryCount || 0;
  if(config.__retryCount >= config.retry) {
    return Promise.reject(error);
  }
  config.__retryCount += 1;
  var backoff = new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, config.retryDelay || 1);
  });
  return backoff.then(function() {
    return axios(config);
  });
})
export default axios
