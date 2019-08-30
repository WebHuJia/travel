import store from '@/store'
var APIURL = 'https://api.coindy.tuobar.com/v2.0'
const portalURL = window.location.href
if (portalURL.indexOf('coindy.com') !== -1) {
  APIURL = 'https://api.coindy.com/v2.0'
}
// APIURL = 'https://api.coindy.com/v2.0'

function GetQueryString (name) { // 获取url代参
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r !== null) return unescape(r[2]); return null
}
const USER_TOKEN = GetQueryString('token')
const REG = { // 通用正则匹配
  pawreg: /^(?=.*\d)(?=.*[0-9a-zA-Z_.-]).{6,32}$/,
  numreg: /^\d+$/,
  strongpawreg: /^(?=.*\d)(?=.*[0-9a-zA-Z_.-])(?=.*[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]).{6,32}$/,
  chinamobilereg: /(^(13\d|14[5|7]|15[^4\D]|17[013678]|18\d)\d{8})$/,
  notchinamobilereg: /^[0-9]{5,15}$/,
  emailreg: /^([0-9a-zA-Z_.-])+@([0-9a-zA-Z_-])+(\.([a-zA-Z_-])+)+$/
}
function Fulltime (st) { // 剩余时间
  var stt = st * 1000
  var i = new Date().getTime()
  var t = stt - i
  var d = Math.floor(t / (24 * 3600 * 1000))
  var leave1 = t % (24 * 3600 * 1000)
  var h = Math.floor(leave1 / (3600 * 1000))
  var leave2 = leave1 % (3600 * 1000)
  var m = Math.floor(leave2 / (60 * 1000))
  var leave3 = leave2 % (60 * 1000)
  var s = Math.round(leave3 / 1000)
  return {
    d,
    h,
    m,
    s
  }
}
function getTime (time) { // 时间戳转时间方法
  var d = new Date(time * 1000)
  var year = d.getFullYear()
  var month = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1)
  var day = d.getDate() <= 9 ? '0' + d.getDate() : d.getDate()
  var hours = d.getHours() <= 9 ? '0' + d.getHours() : d.getHours()
  var minutes = d.getMinutes() <= 9 ? '0' + d.getMinutes() : d.getMinutes()
  var seconds = d.getSeconds() <= 9 ? '0' + d.getSeconds() : d.getSeconds()
  return {
    formatting: year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds,
    notTimes: year + '-' + month + '-' + day
  }
}
//  千位字符串转数字
function stringfullnumber (d) {
  return Number(d.split(',').join(''))
}
//  数字转千位字符串
function numberfullstring (num) {
  return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}
function logoutremover () { // 全局使用注销账户，不使用localstorage的清空方法是因为有一些配置不需要清除
  store.state.users.uid = ''
  store.state.users.intersmsiso = ''
  store.state.users.username = ''
  store.state.users.user_email = ''
  store.state.users.mobile = ''
  store.state.users.token = ''
  store.state.token = ''
  store.state.users.encryptionusername = ''
  store.state.users.encryptionuseremail = ''
  store.state.users.encryptionmobile = ''
  localStorage.removeItem('username')
  localStorage.removeItem('mobile')
  localStorage.removeItem('user_email')
  localStorage.removeItem('intersmsiso')
  localStorage.removeItem('ga')
  localStorage.removeItem('token')
  localStorage.removeItem('uid')
  localStorage.removeItem('expire_time')
  localStorage.removeItem('__M_a')
  localStorage.removeItem('__W_a')
}
function toThousands(num) {
  var result = [], counter = 0;
  num = (num || 0).toString().split('')
  for (var i = num.length - 1; i >= 0; i--) {
    counter++;
    result.unshift(num[i])
    if (!(counter % 3) && i != 0) { result.unshift(',') }
  }
  return result.join('')
}
function GetUrl (name) {
  return decodeURIComponent ((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20')) || null
}
export default {
  APIURL,
  GetQueryString,
  USER_TOKEN,
  REG,
  Fulltime,
  logoutremover,
  getTime,
  stringfullnumber,
  numberfullstring,
  toThousands,
  GetUrl
}
