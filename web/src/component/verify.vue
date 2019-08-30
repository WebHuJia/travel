<template>
  <div id="verify" :class="$store.state.MOBILE == 'web'? 'nc_web' : 'nc_mobile'">
    <label v-if="titleOnoff" v-html="$t('common.NCVerify')"></label>
    <div id="nc-verify"  class="border nc-container"></div>
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
      nc_token: this.$store.state.MOBILE == 'web' ? ['FFFF0N00000000006414', (new Date()).getTime(), Math.random()].join(': ') : ['FFFF00000000017CBA84', (new Date()).getTime(), Math.random()].join(':'),
      nc_scene: this.$store.state.MOBILE == 'web' ? 'nc_message' : 'nc_message_h5',
      ncOpt: null
    }
  },
  beforeCreate () {

  },
  mounted () {
    if (this.$store.state.noCaptcha == 'load') {
      this.ncOpt = {
        renderTo: '#nc-verify',
        appkey: this.$store.state.MOBILE == 'web' ? 'FFFF0N00000000006414' : 'FFFF00000000017CBA84',
        scene: this.nc_scene,
        token: this.nc_token,
        customWidth: 500,
        trans: {'key1': 'code0'},
        elementID: ['usernameID'],
        is_Opt: 0,
        language: this.$store.state.LANG == 'zh-cn' ? 'cn' : 'en',
        isEnabled: true,
        timeout: 5000,
        times: 5,
        callback: (data) => {
          this.nc_csessionid = data.csessionid
          this.$store.state.nc_csessionid = data.csessionid
          this.nc_sig = data.sig
        }
      }
      if (this.$store.state.MOBILE == 'web') {
        this.$store.state.nc = new noCaptcha(this.ncOpt)
      } else {
        this.$store.state.nc = new NoCaptcha(this.ncOpt)
      }
    }
  },
  methods: {
    reset () {
      try {
        this.$store.state.successful = false
        this.$store.state.nc.reset()
      }catch(e) {
        setTimeout(()=>{
          this.$store.state.successful = false
          this.$store.state.nc.reset()
        },200)
      }
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
    mobile () {
      return this.$store.state.MOBILE
    },
    nc () {
      return this.$store.state.nc
    }
  },
  watch: {
    nc (n,o) {
      setTimeout(()=>{
        this.reset()
      },100)
    },
    nc_csessionidcom () {
      this.$emit('verifyResult', {nc_csessionid: this.$store.state.nc_csessionid, nc_sig: this.nc_sig, nc_token: this.nc_token, nc_scene: this.nc_scene})
    },
    successful (n, o) {
      if (!n) {
        setTimeout(()=>{
          this.reset()
        },100)
        return
      }
    },
    nc_csessionid (newName, oldName) {
      if (!newName) {
        setTimeout(()=>{
          this.reset()
        },100)
        return
      }
      this.$emit('verifyResult', {nc_csessionid: this.$store.state.nc_csessionid, nc_sig: this.nc_sig, nc_token: this.nc_token, nc_scene: this.nc_scene})
    },
    lang (n, o) {
      if (n == 'zh-cn') {
        this.ncOpt.language = 'cn'
      } else if (n == 'en-us') {
        this.ncOpt.language = 'en'
      }
      if (this.mobile == 'web') {
        this.$store.state.nc = new noCaptcha(this.ncOpt)
      } else {
        this.$store.state.nc = new NoCaptcha(this.ncOpt)
      }
      setTimeout(()=>{
        this.reset()
      },100)
    },
    Captcha(n, o) {
      let f = () => {
        if (this.$store.state.noCaptcha == 'load') {
          this.ncOpt = {
            renderTo: '#nc-verify',
            appkey: this.$store.state.MOBILE == 'web' ? 'FFFF0N00000000006414' : 'FFFF00000000017CBA84',
            scene: this.nc_scene,
            token: this.nc_token,
            customWidth: 500,
            trans: {'key1': 'code0'},
            elementID: ['usernameID'],
            is_Opt: 0,
            language: this.$store.state.LANG == 'zh-cn' ? 'cn' : 'en',
            isEnabled: true,
            timeout: 5000,
            times: 5,
            callback: (data) => {
              this.nc_csessionid = data.csessionid
              this.$store.state.nc_csessionid = data.csessionid
              this.nc_sig = data.sig
            }
          }
          if (this.mobile == 'web') {
            this.$store.state.nc = new noCaptcha(this.ncOpt)
          } else {
            this.$store.state.nc = new NoCaptcha(this.ncOpt)
          }
          setTimeout(()=>{
            this.reset()
          },100)
        }
      }
      try {
        f ()
        setTimeout(()=>{
          this.reset()
        },300)
      }catch(e) {
        f ()
      }
    }
  }
}
</script>
<style lang="less">
  #verify{border-radius: 2px;font-size:14px;
    label{margin-bottom:10px;display: block;color:#5a626d;}
    #nc-verify{display:block!important;
      width:550px;height:50px;
      .nc_wrapper{width:550px;}
      .nc_scale {
        border: 1px solid #ddd;border-radius: 2px;
        background: #fff; /* 默认背景色 */
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
      }
      .stage{padding:0;height:50px;
        .slider{height:50px;left:0;right:0;width:100%;}
        .button{height:50px;}
      }
      .nc_scale .scale_text {
        color: #5a626d; /* 默认字体颜色 */
      }
      .nc_scale div.nc_bg {
        background: #f4f4f6; /* 滑过时的背景色 */
      }
      .nc_scale .scale_text2 {
        color: #5a626d; /* 滑过时的字体颜色 */
      }
      .nc_scale span {
        height: 50px;
        line-height: 50px;
        font-size:14px;
      }
      .nc_scale .btnok {
        height: 50px;
        font-size:14px;

        line-height: 50px;
      }
      .nc_scale .btn_ok {
        color:#357ce1;
        /*background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAMAAACeyVWkAAAAP1BMVEUAAAA1fOE1fOE1fOE1fOE1fOE1fOE1fOE1fOE1fOE1fOE1fOE1fOE1fOE1fOE1fOE1fOE1fOE1fOE1fOE1fOEcj/FKAAAAFHRSTlMAyySNMu/0rk/luQt6GdaaXEhuPCrxNdIAAACNSURBVBjTdZFHEoAgDAADCSUC1vz/rY4UQUf3wMDSUqBAqFhYIUFHO2k43eRmpGO2Ir088fm6fVl7PTLJmwmAnmK/RgIcJae8RFCjPcrPCniQUZsSHZTY5zyGdhHybgxOhMPSMqnvLiEKrVJRgHWSUk8H73h5naVBn7l91+GnZlnb8aT/7UXvmxFz9+0E4PwYFRgxks0AAAAASUVORK5CYII=);*/
      }
      .errloading {
        border: 1px solid #ff3f08;
        color: #ff3f08;
        width: 550px;
        height: 50px;
        line-height: 50px;
        padding: 0;
        -ms-flex-pack: center;
        display: flex;
        align-items: center;
        justify-content: center;
        span{
          display: -ms-flexbox;
          display: flex;
          -ms-flex-align: center;
          align-items: center;
        }
      }
      .nc_scale .btn_slide{box-sizing: border-box;height:48px;line-height:48px;width:70px;background:#caccd1;}
      .nc_scale .btn_ok{box-sizing: border-box;height:48px;line-height:48px;width:70px;}
    }
  }
</style>
