import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Axios from './assets/js/axios'
import DefaultJs from './assets/js/default'
import Message from './component/message'
import popCode from './component/code'
import SelectBox from './component/select'
import Password from './component/password'
import Banner from './component/banner'
import Upload from './component/upload'
import Accout from './component/accout'
import LoadingCenter from './component/loadingCenter'
import CreateTime from './component/createtime'
import VerificationCode from './component/verificationCode'
import HTTPaxios from './assets/js/http.js'
import MetaInfo from 'vue-meta-info'
import Pager from './component/pager'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueI18n from 'vue-i18n'
import VueECharts from 'vue-echarts/components/ECharts'
import 'babel-polyfill'
import VueClipboard from 'vue-clipboard2'
import QRCode from 'qrcode2'
import Verify from './component/verify'
import MobileVerify from './mobile/component/verify'
import Verification from './component/verification'
Vue.component('my-verify', Verify)
Vue.component('Mobile_verify', MobileVerify)
Vue.component('verification', Verification)
const QRCodeSC = (opt) => {//二维码组件初始化
  let qrcode = new QRCode(opt.obj, { // qrcode  html为标签id
    width: opt.w, // 长度
    height: opt.h, // 宽度
    text: opt.url // 内容
    // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas)
    // background: '#f0f'
    // foreground: '#ff0'
  })
  return qrcode
}
Vue.prototype.$QRCodeSC = QRCodeSC//挂载到VUE原型链上
VueClipboard.config.autoSetContainer = true // 复制功能组件
Vue.use(VueClipboard)
//  import vUploader from 'v-uploader'
var DefaultLang = navigator.language || navigator.userLanguage//获取电脑上本身语言
if (!localStorage.getItem('lang')) {//判断是否已经有语言字段 如果有则不进行填充保存
  if (DefaultLang === 'zh-CN') {
    localStorage.setItem('lang', 'zh-cn')
    store.state.LANG = 'zh-cn'
  } else {
    localStorage.setItem('lang', 'en-us')
    store.state.LANG = 'en-us'
  }
}

Vue.prototype.$message = Message.install//全局提示条
Vue.use(VueAwesomeSwiper) // 首页轮播图
Vue.use(VueI18n) // 语言切换
Vue.use(MetaInfo) // seo 标题 meta
Vue.prototype.DefaultJs = DefaultJs//全局默认JS配置文件
Vue.prototype.axios = Axios
Vue.config.productionTip = false
Vue.component('v-chart', VueECharts)
Vue.component('banner', Banner)
Vue.component('selectbox', SelectBox)
Vue.component('password', Password)
Vue.component('accout', Accout)
Vue.component('verificationcode', VerificationCode)
Vue.component('popcode', popCode)
Vue.component('pager', Pager)
Vue.component('upload', Upload)
Vue.component('createtime', CreateTime)
Vue.component('loadingcenter', LoadingCenter)
const i18n = new VueI18n({//国际版语言初始化
  locale: localStorage.getItem('lang') || 'zh-cn',
  messages: {
    'zh-cn': require('./assets/lang/zh'),
    'en-us': require('./assets/lang/en')
  }
})
/* eslint-disable no-new */
const VueApp = new Vue({
  el: '#app',
  router,
  i18n,
  store,
  HTTPaxios,
  components: { App },
  template: '<App/>'
})
if (store.state.isChineseIP == '') {//是否中国IP初始请求
  Axios.axiosget({
    url: '/portal/isChineseIP',
    timeout: 5000,
  }).then((ret) => {
    // store.state.isChineseIP = 'false'
    // store.state.isChineseIP = 'true'
    store.state.isChineseIP = String(ret.data.data)
  })
}
//设备判断和滑块区分加载
function mobile () {
  var userAgentInfo = navigator.userAgent
  var isIE = userAgentInfo.indexOf("compatible") > -1 && userAgentInfo.indexOf("MSIE") > -1;
  var isEdge = userAgentInfo.indexOf("Edge") > -1 && !isIE;
  var isIE11 = userAgentInfo.indexOf('Trident') > -1 && userAgentInfo.indexOf("rv:11.0") > -1;
  (isIE11 || isIE || isEdge) ? store.state.isIE = true : ''
  var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod', 'Windows', 'Macintosh']
  Agents.map((obj, index) => {
    if (userAgentInfo.indexOf(obj) > -1) {//如果查询到匹配字段时
      switch (obj) {
        case 'Android': case 'iPhone': case 'SymbianOS': case 'Windows Phone': case 'iPad': case 'iPod': case 'Mobile':
          store.state.MOBILE = obj
          if (!document.querySelector('#aliNc')) {
            let script = document.createElement('script')
            script.src = '//aeis.alicdn.com/sd/nch5/index.js'
            script.id = 'aliNc'
            document.body.appendChild(script)
            document.querySelector('#aliNc').onload = () => {
              store.state.noCaptcha = 'load'
            }
          }
          break
      }
    }
  })
  if (store.state.MOBILE === 'web') {//如果上面字段没有查询到匹配时则统一设置为web端
    if (!document.querySelector('#aliNc')) {
      let script = document.createElement('script')
      script.src = '//aeis.alicdn.com/sd/ncpc/nc.js'
      script.id = 'aliNc'
      document.body.appendChild(script)
      document.querySelector('#aliNc').onload = () => {
        store.state.noCaptcha = 'load'
      }
    }
  }
}
mobile()

router.beforeResolve((to, from, next) => {
  if (to.name == 'Register' && from.name == 'MobileRegister') {
    next()
    location.reload()
  }
  if (to.query.lang) {//判断url是否有多个lang字段 如果有多个时截取第一个进行保存
    if (to.query.lang !== 0 && (typeof to.query.lang).toLowerCase() != 'string') {
      store.state.LANG = to.query.lang[0]
    } else {
      store.state.LANG = to.query.lang
    }
    localStorage.setItem('lang', store.state.LANG)
    i18n.locale = store.state.LANG
  }
  store.state.loading = false
  store.state.users.errorText = ''
  store.state.users.subhead = ''
  store.state.users.error = {//跳转路由时清除所有错误状态，暂时没想到其他方便的清除方式，先在全局中清除
    accout: false,
    password: false,
    code: false,
    codeBtn: false,
    googlecode: false
  }
  if (to.name == 'Portal') {//导航条颜色 不同页面导航条颜色不同。故此只能通过路由判断页面加载不同css
    store.state.navbg = 'background-color: rgba(10, 21, 30,.6)'
  } else if (to.name == 'CandyApply' || to.name ==  'About') {
    store.state.navbg = 'background-color: transparent'
  } else {
    store.state.navbg = 'background-color: rgb(10, 21, 30)'
  }
  window.scrollTo(0, 0)
  if (to.meta.requireAuth) {//如果有跳转前页则跳转到前页， 如果无时跳转到首页
    if (localStorage.getItem('token')) {
      if (!localStorage.getItem('username')) {
        Axios.accountInfo()
      }
      next()
    } else {
      store.state.fullpath.name = router.currentRoute.name
      store.state.fullpath.query = router.currentRoute.query
      DefaultJs.logoutremover()
      next({name: 'Login', query: {redirect: store.state.fullpath.name}})
    }
  } else {
    next()
  }
})

