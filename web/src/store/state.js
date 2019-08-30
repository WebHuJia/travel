var state = {
  LANG: localStorage.getItem('lang') || 'zh-cn',
  SYMBOL: '￥',
  TOKEN: '',
  TOKEN_TYPE: '',
  isHome: true,
  successful: '',
  regisertype: '',
  fulltime: '',
  isIE: false,
  nc: '',
  BOMheight: `${document.documentElement.clientHeight}px`,
  BOMwidth: `${document.documentElement.clientWidth}px`,
  MOBILE: 'web',
  it: false,
  nc_csessionid: '',
  isChineseIP: '',
  refreshed: 'no',
  noCaptcha: '',
  registerBanner: '',
  navbg: 'background-color: rgb(10, 21, 30)',
  langreg: /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi,
  fullpath: {
    name: '',
    query: ''
  },
  loading: false
}
if (state.LANG === 'zh-cn') {
  state.SYMBOL = '￥'
} else if (state.LANG === 'en-us') {
  state.SYMBOL = '$'
}
export default state
