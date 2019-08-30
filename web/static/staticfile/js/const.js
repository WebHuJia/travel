var APIURL = 'https://coindyapi.tuobar.com/v1.1';
var portalURL = window.location.href;
if(portalURL.indexOf('coindy.com') != '-1'){
  APIURL = 'https://api.coindy.com/v1.1'
}
var CDNURL = 'http://pcvliimxv.bkt.clouddn.com/'
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}
var USER_TOKEN = GetQueryString('token') //token
var INVITE = GetQueryString('invite')
var DEVICE_TYPE = GetQueryString('type')