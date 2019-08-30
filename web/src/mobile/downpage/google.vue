<template>
  <div id="judgedown">
    <p>
      {{$t('downloadPage.judgedown')}}
      <loadingcenter />
    </p>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  beforeCreate () { // 匹配设备跳转不同链接下载app
    var userAgentInfo = navigator.userAgent
    var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod', 'Windows']
    for (var i = 0; i < Agents.length; i++) {
      if (userAgentInfo.indexOf(Agents[i]) > -1) {
        switch (Agents[i]) {
          case 'Android':
          location.href = 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2'
          return
          case 'iPhone': case 'iPod': case 'iPad':
          location.href = 'https://itunes.apple.com/cn/app/google-authenticator/id388497605?mt=8'
          return
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
  #judgedown{width:100%;height:100%;position: fixed;background:#fff;z-index: 1234567;text-align:center;overflow:hidden;
    p{position: absolute;justify-content: center;width:80%;height:3rem;top:0;left:0;right:0;bottom:0;margin:auto;
    }
  ;}
</style>

