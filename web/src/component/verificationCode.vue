<template>
  <div id="verificationcode">
    <label v-if="titleOnoff && regisertype" v-html="$t('mobile.mobilecode')"></label>
    <label v-if="titleOnoff && !regisertype"  v-html="$t('mobile.emailcode')"></label>
    <div class='code'>
      <input :class="[{'errorborder': $store.state.users.error.code}]" @focus="touchCloseError" v-model.trim="verification_code" type="text" :placeholder="$t('placeholder.code')">
      <input @click.stop='codesumlit' ref="codebtn" type="button" :value="$t(butntext)">
    </div>
  </div>
</template>
<script>
export default {
  props:{
        'regisertype':{
          type: Boolean,
          default: true
        },
        'account':{
          type: String,
          default: ''
        },
        'account_type':{
          type: String,
          default: ''
        },
        'username':{
          type: String,
          default: ''
        },
        'intersmsiso':{
          type: String,
          default: ''
        },
        'nc_csessionid':{
          type: String,
          default: ''
        },
        'nc_sig':{
          type: String,
          default: ''
        },
        'nc_token':{
          type: String,
          default: ''
        },
        'nc_scene':{
          type: String,
          default: ''
        },
        'type':{
          type: String,
          default: ''
        },
        titleOnoff: {
          type: Boolean,
          default: true
        }
  },
  data () {
    return {
      verification_code: '',
      butntext: 'mobile.getcode',
      timenum: 60,
      codebtnonoff: true,
      codetimne: ''
    }
  },
  methods: {
    codesumlit() {
      this.$store.state.users.error.codeBtn = false
      this.$store.state.users.error.code = false
      this.$store.state.users.errorText = ''
      this.$store.state.fulltime = true
      if (!this.$store.state.nc_csessionid) {
        this.$message({
          content: this.$t('common.nct')
        })
        this.$store.state.successful = false
        // this.$store.state.nc.reset()
        return
      }
      clearInterval(this.codetimne);
      this.codetimne = null;
      if (!this.codebtnonoff) {
        return
      }
      var geturl = '/user/VerificationCode/emailSend'
      if (this.account_type == 'mobile') {
        geturl = '/user/VerificationCode/send'
      } else if (!this.account_type == 'email') {
        geturl = '/user/VerificationCode/emailSend'
      }
      var getdata = {
        'username': this.username,
        'intersmsiso': this.intersmsiso,
        'nc_csessionid': this.nc_csessionid,
        'nc_sig': this.nc_sig,
        'nc_token': this.nc_token,
        'nc_scene': this.nc_scene,
        'account_type': this.account_type
      }
      this.httpget (geturl,getdata)
    },
    touchCloseError () {
      this.$store.state.users.error.code = false
      this.$store.state.users.errorText = ''
    },
    httpget (geturl,getdata) {
      this.fulltime()
      this.$refs.codebtn.disabled = true
      this.$refs.codebtn.className = 'no-drop'
      this.axios.axiospost({
        url: geturl,
        data: getdata
      }).then((ret) => {
        if (ret.data.code == 0) {
          this.$message({
            content: ret.data.msg
          })
          this.init()
          return
          // this.$refs.codebtn.style.cursor = 'pointer'
          // this.$refs.codebtn.style.background = 'inherit'
          // this.$refs.codebtn.style.color = 'inherit'
        }
      }).catch((error) => {
      console.log(error)
      this.init()
      this.$message({
        content: this.$t('h5lottery.timeout')
      })
    })
    },
    init () {
      this.$refs.codebtn.disabled = false
      this.$refs.codebtn.className = ''
      this.codebtnonoff = true
      this.butntext = 'mobile.getcode'
      this.timenum = 60
      this.$refs.codebtn.disabled = false
      this.$store.state.successful = false
      this.$store.state.nc.reset()
      this.$store.state.nc_csessionid = ''
      this.$refs.codebtn.className = ''
      clearInterval(this.codetimne)
    },
    fulltime () {
      this.codebtnonoff = false
      this.codetimne = setInterval(() => {
        this.timenum--
        if (this.timenum <= 0) {
          this.init()
          return
        }
        this.butntext = `${this.timenum} ${this.$t('mobile.fullcode')}`
      },1000)
    }
  },
  computed: {
    errorText () {
      return this.$store.state.users.errorText
    },
    reqsuccess () {
      return this.$store.state.fulltime
    }
  },
  codebtnonoff (n, o) {
    if (n) {
      clearInterval(this.codetimne);
      this.codetimne = null;
      this.codebtnonoff = true
      this.butntext = 'mobile.getcode'
      this.timenum = 60
      this.$refs.codebtn.disabled = false
      this.$refs.codebtn.className = ''
      this.$emit('codetimeout', {codetimeout: this.codebtnonoff})
    }
  },
  beforeDestroy() {
    clearInterval(this.codetimne);
    this.codetimne = null;
  },
  watch: {
    verification_code (n, o) {
      this.$emit('verificationCode', {
        verification_code: this.verification_code
      })
    },
    reqsuccess (n) {
      if (!n) {
        this.codebtnonoff = true
        this.butntext = 'mobile.getcode'
        this.timenum = 60
        this.$refs.codebtn.disabled = false
        this.$store.state.successful = false
        this.$store.state.nc.reset()
        this.$refs.codebtn.className = ''
        clearInterval(this.codetimne)
      }
    },
    errorText (n, o) {
      switch (n) {
        case '短信验证码已经过期，请先获取短信验证码': case 'SMS verification code has expired, please get SMS verification code first': case 'Please get the SMS verification code first': case '请先获取短信验证码':
          this.$store.state.users.error.code = false
          this.$store.state.users.error.codeBtn = true
        break
        case '短信验证码不正确': case 'SMS verification code is incorrect': case '验证码为数字': case 'Verification code must be a number':
          this.$store.state.users.error.code = true
          this.$store.state.users.error.codeBtn = false
        break
        default:
          this.$store.state.users.error.code = false
          this.$store.state.users.error.codeBtn = false
        break
      }
    }
  },
}
</script>
<style lang="less" scoped>
  #verificationcode{
    label{color:#5a626d;font-size:14px;display: block;margin-bottom:10px;}
    .code{display: flex;font-size:14px;
      input{border-radius: 2px 0 0 2px;font-size:14px;}
      input[type=button]{
        &.no-drop{
          cursor:no-drop;
          color:#a5aab0;
          &:hover{
            color:#a5aab0;
          }
        }
        &:hover{color:#357ce1;}
      width:140px;height:50px;flex-shrink: 0;text-align: center;border-radius:0 2px 2px 0;background: #f4f5f5;border-left:none;text-indent:0;
      }
    }
    input{width:550px;height:50px;border:1px solid #ddd;box-sizing: border-box;border-radius: 2px;text-indent:1em;
    }
  }
</style>

