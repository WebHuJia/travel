import axios from 'axios'
import store from '@/store'
import DefaultJs from './default'
import Message from '@/component/message'
import Router from '@/router'
import qs from 'qs'
import { Promise } from 'es6-promise-polyfill'
function axiosget (opt) {
  // 返回一个promise对象
  var mess = '1'
  opt.mess ? mess = opt.mess : mess = '1'
  return new Promise((resolve, reject) => {
    axios({
      url: `${DefaultJs.APIURL}${opt.url}`,
      method: 'get',
      headers: {
        'x-device-language': store.state.LANG,
        'XX-Token': localStorage.getItem('token'),
        'XX-Device-Type': store.state.users.device_type,
        ...opt.headers
      },
      params: {
        'time': new Date().getTime(),
        'device_type': store.state.users.device_type,
        ...opt.params
      }
    }).then((ret) => {
      if (ret.data.msg != '') {
      }
      if (ret.data.code == 0 || ret.data.code == 10001) {
        if (Object.is(mess, '1')) {
          Message.install({
            content: ret.data.msg
          })
        }
        if (store.state.nc) {
          store.state.nc_csessionid = ''
          store.state.nc_sig = ''
          store.state.nc_token = ''
          store.state.nc_scene = ''
          store.state.nc.reset()
        }
        store.state.fulltime = false
        store.state.successful = false
        store.state.nc_csessionid = ''
        if (ret.data.code == 10001) {
          DefaultJs.logoutremover()
          localStorage.getItem('token') ? store.state.users.token = localStorage.getItem('token') : store.state.users.token = false
        }
        // return
      }
      resolve(ret)
    }).catch(function (error) {
      console.log(error)
      reject(error)
    })
  })
}
function axiospost (opt) {
  // 返回一个promise对象
  var mess = '1'
  opt.mess ? mess = opt.mess : mess = '1'
  return new Promise((resolve, reject) => {
    axios({
      url: `${DefaultJs.APIURL}${opt.url}`,
      method: 'post',
      headers: {
        'x-device-language': store.state.LANG,
        'XX-Token': localStorage.getItem('token'),
        'XX-Device-Type': store.state.users.device_type,
        ...opt.headers
      },
      data: {
        'device_type': store.state.users.device_type,
        ...opt.data
      }
    }).then((ret) => {

      if (ret.data.code == 0 || ret.data.code == 10001) {
        if (Object.is(mess, '1')) {
          Message.install({
            content: ret.data.msg
          })
        }
        if (store.state.nc) {
          store.state.nc_csessionid = ''
          store.state.nc_sig = ''
          store.state.nc_token = ''
          store.state.nc_scene = ''
          store.state.nc.reset()
        }
        store.state.fulltime = false
        store.state.successful = false
        store.state.nc_csessionid = ''
        if (ret.data.code == 10001) {
          DefaultJs.logoutremover()
          localStorage.getItem('token') ? store.state.users.token = localStorage.getItem('token') : store.state.users.token = false
        }
        // return
      }
      resolve(ret)
    }).catch((error) => {
      console.log(error)
      reject(error)
    })
  })
}
function logout () { // 全局使用登出功能方法
  axios({
    method: 'post',
    url: `${DefaultJs.APIURL}/user/logout`,
    headers: {
      'x-device-language': store.state.LANG,
      'XX-Token': localStorage.getItem('token'),
      'XX-Device-Type': store.state.users.device_type
    },
    data: {
      'device_type': store.state.users.device_type
    }
  }).then((ret) => {
    DefaultJs.logoutremover()
    store.state.users.logout = true
    if (store.state.nc) {
      store.state.nc_csessionid = ''
      store.state.nc_sig = ''
      store.state.nc_token = ''
      store.state.nc_scene = ''
      store.state.nc.reset()
    }
    store.state.fulltime = false
    store.state.successful = false
    store.state.nc_csessionid = ''
  }).catch((error) => {
    console.log(error)
  })
}
function accountInfo () { // 全局使用获取加密用户信息
  axios({
    method: 'get',
    url: `${DefaultJs.APIURL}/user/accountInfo`,
    headers: {
      'x-device-language': store.state.LANG,
      'XX-Token': localStorage.getItem('token'),
      'XX-Device-Type': store.state.users.device_type
    }
  }).then((ret) => {
    if (ret.data.code == 1) {
      localStorage.setItem('mobile', ret.data.data.mobile)
      localStorage.setItem('user_email', ret.data.data.email)
      localStorage.setItem('uid', ret.data.data.uid)
      // window.localStorage.setItem('expire_time', ret.data.data.expire_time)
      localStorage.setItem('intersmsiso', ret.data.data.intersmsiso)
      localStorage.setItem('ga', ret.data.data.ga)
      window.localStorage.setItem('username', ret.data.data.mobile ? '+' + ret.data.data.intersmsiso + ' ' + (ret.data.data.mobile.substr(0, 3) + '****' + ret.data.data.mobile.substr(7)) : (ret.data.data.email.substr(0, 1) + '****' + ret.data.data.email.substr(5)))
      store.state.users.intersmsiso = ret.data.data.intersmsiso
      store.state.users.ga = ret.data.data.ga
      store.state.users.uid = ret.data.data.uid
      store.state.users.username = ret.data.data.mobile ? '+' + ret.data.data.intersmsiso + ' ' + (ret.data.data.mobile.substr(0, 3) + '****' + ret.data.data.mobile.substr(7)) : (ret.data.data.email.substr(0, 1) + '****' + ret.data.data.email.substr(5))
      store.state.users.encryptionuseremail = ret.data.data.user_email
      store.state.users.encryptionmobile = ret.data.data.mobile
    }
  }).catch((error) => {
    console.log(error)
  })
}
export default{
  axios,
  axiosget,
  axiospost,
  logout,
  accountInfo
}
