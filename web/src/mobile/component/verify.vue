<template>
  <div id="verify">
    <label v-if="titleOnoff" v-html="$t('common.NCVerify')"></label>
    <div id="nc-verify" class="border nc-container"></div>
  </div>
</template>

<script>
  export default {
    name: 'Verify',
    props: {
      titleOnoff: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        nc_csessionid: null,
        nc_sig: null,
        nc_token: ['FFFF00000000017CBA84', (new Date()).getTime(), Math.random()].join(':'),
        nc_scene: 'nc_message_h5',
        ncOpt: null
      }
    },
    mounted () {
      if (this.$store.state.noCaptcha == 'load') {
        this.ncOpt = {
          renderTo: '#nc-verify',
          appkey: 'FFFF00000000017CBA84',
          scene: this.nc_scene,
          token: this.nc_token,
          customWidth: 500,
          trans: {'key1': 'code0'},
          elementID: ['usernameID'],
          is_Opt: 0,
          language: 'cn',
          isEnabled: true,
          timeout: 10000,
          times: 5,
          bannerHidden:false,
          initHidden:false,
          callback: (data) => {
            this.nc_csessionid = data.csessionid
            this.$store.state.nc_csessionid = data.csessionid
            this.nc_sig = data.sig
          }
        }
        if (this.$store.state.LANG == 'zh-cn') {
          this.ncOpt.language = 'cn'
        } else if (this.$store.state.LANG == 'en-us') {
          this.ncOpt.language = 'en'
        }
        this.$store.state.nc = new NoCaptcha(this.ncOpt)
        this.$store.state.successful = false
        this.$store.state.nc.reset()
      }
    },
    computed: {
      successful () {
        return this.$store.state.successful
      },
      lang () {
        return this.$store.state.LANG
      },
      nc_csessionidcom () {
        return this.$store.state.nc_csessionid
      },
      Captcha () {
        return this.$store.state.noCaptcha
      },
      nc () {
        return this.$store.state.nc
      }
    },

    watch: {
      nc_csessionidcom () {
        this.$emit('verifyResult', {nc_csessionid: this.$store.state.nc_csessionid, nc_sig: this.nc_sig, nc_token: this.nc_token, nc_scene: this.nc_scene})
      },
      successful (n, o) {
        if (!n) {
          this.$store.state.successful = false
          this.$store.state.nc.reset()
          this.$store.state.nc_csessionid = ''
          return
        }
      },
      nc_csessionid (newName, oldName) {
        if (!newName) {
          this.$store.state.successful = false
          this.$store.state.nc.reset()
          this.$store.state.nc_csessionid = ''
          return
        }
        this.$emit('verifyResult', {nc_csessionid: this.$store.state.nc_csessionid, nc_sig: this.nc_sig, nc_token: this.nc_token, nc_scene: this.nc_scene})
      },
      lang (n, o) {
        if (n === 'zh-cn') {
          this.ncOpt.language = 'cn'
          this.$store.state.nc.reset()
        } else if (n === 'en-us') {
          this.ncOpt.language = 'en'
          this.$store.state.successful = false
          this.$store.state.nc.reset()
        }
        this.nc = new NoCaptcha(this.ncOpt)
      },
      Captcha (n, o) {
        let f = () => {
          this.ncOpt = {
            renderTo: '#nc-verify',
            appkey: 'FFFF00000000017CBA84',
            scene: this.nc_scene,
            token: this.nc_token,
            customWidth: 500,
            trans: {'key1': 'code0'},
            elementID: ['usernameID'],
            is_Opt: 0,
            language: 'cn',
            isEnabled: true,
            timeout: 10000,
            times: 5,
            bannerHidden:false,
            initHidden:false,
            callback: (data) => {
              this.nc_csessionid = data.csessionid
              this.$store.state.nc_csessionid = data.csessionid
              this.nc_sig = data.sig
            }
          }
          if (this.$store.state.LANG == 'zh-cn') {
            this.ncOpt.language = 'cn'
          } else if (this.$store.state.LANG == 'en-us') {
            this.ncOpt.language = 'en'
          }
          this.$store.state.nc = new NoCaptcha(this.ncOpt)


          this.$store.state.successful = false
          this.$store.state.nc.reset()
        }
        try {
          f ()
        }catch(e) {
            f ()
        }

      },
      nc (n, o) {
        this.$store.state.successful = false
        this.$store.state.nc.reset()
        try {
          this.$store.state.successful = false
          this.$store.state.nc.reset()
        }catch(e) {
          this.$store.state.successful = false
          this.$store.state.nc.reset()
        }
      }
    }
  }
</script>
<style lang="less">
  body{
    #appMobile{
      #verify{border-radius: 2px;width:100%;height:100%;
        label{margin-bottom:10px;display: block;color:#5a626d;}
        #nc-verify{
          width:100%;height:100%;
          .nc_wrapper{width:100%;}
          ._nc{
            .stage{padding:0;height:100%;}
            .slider{width:100%;left:0;right:0;height:100%;}
            label{height:100%;}
            .button{height:100%;}
          }
          .nc_scale {
            border: 1px solid #ddd;border-radius: 2px;
            background: #fff; /* 默认背景色 */
            height: 100%;
            line-height: 100%;
            box-sizing: border-box;
          }
          ￼.nc_scale .scale_text {
            color: #5a626d; /* 默认字体颜色 */
          }
          .nc_scale div.nc_bg {
            background: #7ac23c; /* 滑过时的背景色 */
          }
          .nc_scale .scale_text2 {
            color: #fff; /* 滑过时的字体颜色 */
          }
          .nc_scale span {
            height: 100%;
            line-height: 100%;
          }
          .nc_scale .btnok {
            height: 100%;
            line-height: 100%;
          }
          .errloading {
            border: #faf1d5 1px solid;
            color: #ef9f06;
          }
          .nc_scale .btn_slide{box-sizing: border-box;height:48px;line-height:48px;width:70px;background:#caccd1;}
          .nc_scale .btn_ok{box-sizing: border-box;height:48px;line-height:48px;width:70px;}
        }
      }
    }
  }
</style>
