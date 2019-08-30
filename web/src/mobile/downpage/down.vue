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
        googleUrl: ''
      }
    },
    beforeCreate () { // 匹配设备跳转不同链接下载app
      this.axios.axiosget({
        url: '/app/nextAppVersion',
        mess: '2',
        headers: {
          'x-user-device-os': 'android'
        }
      }).then((ret) => {
        if (ret.data.code == 0) {
          this.googleUrl = 'https://play.google.com/store/apps/details?id=com.coindy.app'
          return
        } else {
          if (ret.data.data == '') {
            this.$message({
              content: ret.data.msg
            })
            this.googleUrl = 'https://play.google.com/store/apps/details?id=com.coindy.app'
            return false
          }
          this.googleUrl = ret.data.data
        }
      }).catch((error) => {
        console.log(error)
      })
      var userAgentInfo = navigator.userAgent
      var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod', 'Windows']
      setTimeout(()=>{
        for (var i = 0; i < Agents.length; i++) {
          if (userAgentInfo.indexOf(Agents[i]) > -1) {
            switch (Agents[i]) {
              case 'Android':
                location.href = this.googleUrl
                return
              case 'iPhone': case 'iPod': case 'iPad':
                location.href = 'https://itunes.apple.com/us/app/coindy/id1436784207?l=zh&ls=1&mt=8'
                return
            }
          }
        }
      },200)
    }
  }
</script>
<style lang="less" scoped>
  #judgedown{width:100%;height:100%;position: fixed;background:#fff;z-index: 1234567;text-align:center;overflow:hidden;
    p{position: absolute;justify-content: center;width:80%;height:3rem;top:0;left:0;right:0;bottom:0;margin:auto;
    }
  ;}
</style>

