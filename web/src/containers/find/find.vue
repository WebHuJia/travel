<template>
  <div>
    <div id="find" v-if="verificationFind" class="clear">
      <div class="left">
        <h3>{{$t('find.title')}}</h3>
        <ul class='tab'>
          <li @click.stop="tabonoff('mobile')" :class="{'act': regisertype}" v-html="$t('logSig.mobile')"></li>
          <li @click.stop="tabonoff('email')" :class="{'act': !regisertype}" v-html="$t('logSig.email')"></li>
        </ul>
        <ul class='label'>
          <li>
            <accout key="find" @accout='accout' :regisertype="regisertype" ></accout>
          </li>
          <li>
            <my-verify @verifyResult="verifyResult"></my-verify>
          </li>
        </ul>
        <button @click.stop='btnsumlit' class="btnhover" v-html="$t('common.submit')"></button>
      </div>
    </div>
    <div id="verificationVer" v-if="verificationVer" class="clear">
      <h3>{{$t('find.findver.title')}}</h3>
      <ul class='label'>
        <li>
          <label v-if="regisertype">{{$t('logSig.mobile')}}</label>
          <label v-if="!regisertype">{{$t('logSig.email')}}</label>
          <input type="text" disabled :value="regisertype? '+' + intersmsiso + ' ' + username : username">
        </li>
        <li>
          <my-verify @verifyResult="verifyResult"></my-verify>
        </li>
        <li>
          <verificationcode
          :account_type="account_type"
          :regisertype='regisertype'
          @verificationCode="verificationCode"
          :username="username"
          :nc_csessionid='nc_csessionid'
          :nc_sig='nc_sig'
          :nc_token='nc_token'
          :nc_scene='nc_scene'
          :intersmsiso="intersmsiso" ></verificationcode>
        </li>
        <li v-if="ga">
          <label v-html="$t('find.googlecode')"></label>
          <input type="text" v-model.trim="google_code" :placeholder="$t('placeholder.code')">
        </li>
      </ul>
      <button @click.stop="sumlitbtn" class="btnhover" v-html="$t('common.submit')"></button>
    </div>
    <div id="verificationReset" v-if="verificationReset" class="clear">
      <h3>{{$t('find.findreset.title')}}</h3>
      <ul class='label'>
        <li>
          <password @passwordcode="passwordcode"></password>
        </li>
        <li>
          <password @passwordcode="reqpasswordcode"></password>
          <input type="text" v-if="!passwordonoff" disabled :value="$t('find.pwdnot')">
        </li>
      </ul>
      <button @click.stop='Resetsumlit'  class="btnhover" v-html="$t('common.submit')"></button>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('login.forgetpassword') + this.$t('seo.title'),
      meta: [{
        name: 'keywords',
        content: this.$t('seo.keywords')
      }, {
        name: 'description',
        content: this.$t('seo.description')
      }]
    }
  },
  data () {
    return {
      regisertype: true,
      intersmsiso: '',
      username: '',
      password: '',
      nc_csessionid: '',
      nc_token: '',
      nc_scene: '',
      nc_sig: '',
      ga: false,
      google_code: '',
      verification_code: '',
      reqpassword: '',
      check_type: 1,
      passwordonoff: true,
      reqstrongpwdonoff: false,
      strongpwdonoff: false,
      verificationVer: false,
      verificationReset: false,
      verificationFind: true,
      account_type: 'mobile'
    }
  },
  methods: {
    tabonoff (d) { // 切换手机邮箱
      this.$store.state.users.error.accout = false
      this.username = ''
      switch (d) {
        case 'mobile':
          this.regisertype = true
          this.account_type = 'mobile'
          return
        case 'email':
          this.regisertype = false
          this.account_type = 'email'
      }
    },
    btnsumlit () { // 查看账号是否存在
      var sendurl = '/isAccountExist'
      var senddata = {
        'username': this.username,
        'intersmsiso': this.intersmsiso,
        'account_type': this.account_type
      }
      if (!this.$store.state.nc_csessionid) { // 判断滑块
        this.$message({
          content: this.$t('common.nct')
        })
        return
      }
      let reg = null
      // 国际码区分正则判断
      if (this.regisertype) {
        if (this.intersmsiso === '86') {
          reg = this.DefaultJs.REG.chinamobilereg
        } else {
          reg = this.DefaultJs.REG.notchinamobilereg
        }
        if (!reg.test(this.username)) {
          this.$message({
            content: this.$t('find.mobileerror')
          })
          this.$store.state.users.error.accout = true
          return
        }
      } else if (!this.regisertype) {
        reg = this.DefaultJs.REG.emailreg
        if (!reg.test(this.username)) {
          this.$message({
            content: this.$t('find.emailerror')
          })
          this.$store.state.users.error.accout = true
          return
        }
      }
      this.axios.axiospost({
        url: sendurl,
        data: senddata
      }).then((ret) => {
        if (ret.data.data.isExist) { // 账号判断存在则进入下一步
          this.$store.state.users.error.accout = false
          this.ga = ret.data.data.ga
          this.nc_csessionid = ''
          if (this.$store.state.nc.reset) {
            this.$store.state.nc.reset()
          }
          this.verificationReset = false
          this.verificationVer = true
          this.verificationFind = false
        } else { // 如果账号不存在则提示 停止进入下一步
          this.$store.state.users.error.accout = true
          this.$message({
            content: this.$t('find.notaccout')
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    verifyResult (d) { // 滑块反馈
      this.nc_csessionid = d.nc_csessionid
      this.nc_sig = d.nc_sig
      this.nc_token = d.nc_token
      this.nc_scene = d.nc_scene
    },
    accout (d) { // 账号 国际码 类型
      this.intersmsiso = d.intersmsiso
      this.username = d.username
      this.regisertype = d.regisertype
    },
    sumlitbtn () { // 提交
      if (!this.nc_csessionid) { // 如果没滑块或者滑块码丢失则提示重新滑块
        this.$message({
          content: this.$t('common.nct')
        })
        return
      }
      if (!this.verification_code) { // 如果验证码不存在
        this.$message({
          content: this.$t('placeholder.code')
        })
        this.$store.state.users.error.code = true
        return
      }
      var geturl = '/checkVerificationCode'
      var getdata = {
        'username': this.username,
        'intersmsiso': this.intersmsiso,
        'verification_code': this.verification_code,
        'google_code': this.google_code,
        'account_type': this.account_type,
        'nc_csessionid': this.nc_csessionid,
        'nc_sig': this.nc_sig,
        'nc_token': this.nc_token,
        'nc_scene': this.nc_scene,
        'check_type': this.check_type
      }
      this.axios.axiospost({
        url: geturl,
        data: getdata
      }).then((ret) => {
        if (ret.data.code === 0) { // 如果失败
          this.$store.state.users.errorText = ret.data.msg
          this.$message({
            content: ret.data.msg
          })
          return
        }
        this.$store.state.users.errorText = ''
        this.verificationReset = true
        this.verificationVer = false
        this.verificationFind = false
      }).catch((error) => {
        console.log(error)
      })
    },
    verificationCode (d) { // 验证码
      this.verification_code = d.verification_code
    },
    Resetsumlit () { // 重置验证码提交块
      if (!this.password && !this.reqpassword) { // 如果两个密码有一个不存在
        this.$message({
          content: this.$t('common.notpassword')
        })
        this.$store.state.users.error.password = true
        return
      }
      if (!this.strongpwdonoff) { // 如果2个密码强度不匹配
        this.$message({
          content: this.$t('common.strongpws')
        })
        this.$store.state.users.error.password = true
        return
      }
      if (!this.passwordonoff) { // 如果2个密码不相同
        this.$message({
          content: this.$t('find.pwdnot')
        })
        this.$store.state.users.error.password = true
        return
      }
      var geturl = '/user/emailpasswordReset'
      var getdata = {
        'username': this.username,
        'password': this.reqpassword,
        'intersmsiso': this.intersmsiso,
        'verification_code': this.verification_code,
        'google_code': this.google_code,
        'account_type': this.account_type,
        'check_type': this.check_type
      }
      if (this.regisertype) {
        geturl = '/user/passwordReset'
      } else if (!this.regisertype) {
        geturl = '/user/emailpasswordReset'
      }
      this.axios.axiospost({
        url: geturl,
        data: getdata
      }).then((ret) => {
        if (ret.data.code == 0) { this.$store.state.users.errorText = ret.data.msg }
        if (ret.data.code == 1) {
          this.$store.state.users.errorText = ''
          this.$message({
            content: ret.data.msg,
            type: 'check'
          })
        }
        this.$router.push({name: 'Login'})
      }).catch((error) => {
        console.log(error)
      })
    },
    passwordcode (d) { // 密码组件反馈
      this.password = d.password
      this.strongpwdonoff = d.strongpwdonoff
      this.passwordonoff = (this.password == this.reqpassword)
    },
    reqpasswordcode (d) { // 密码强度反馈
      this.reqpassword = d.password
      this.reqstrongpwdonoff = d.strongpwdonoff
      this.passwordonoff = (this.password == this.reqpassword)
    }
  },
  watch: {
    ga (n, o) {
      this.check_type = this.ga ? 3 : 1
    }
  }
}
</script>
<style lang="less" scoped>
  //  #app > #nav{background-color: rgb(10, 21, 30);}
  #find{margin:174px auto;width:1200px;
    h3{font-size:36px;color:#222c38;margin-bottom:50px;}
    ul.tab{color:#5a626d;font-size:16px;margin-bottom:40px;cursor: pointer;
      li{padding-bottom:6px;margin-right: 70px;display:inline-block;
        &.act{color:#357ce1;border-bottom:2px solid #357ce1;}
      }
    }
    ul.label{margin-bottom: 60px;
      li{position:relative;width:550px;margin-bottom:38px;
        label{color:#5a626d;font-size:16px;display: block;margin-bottom:10px;
        }
        input{width:550px;height:50px;border:1px solid #ddd;box-sizing: border-box;border-radius: 2px;text-indent:1em;}
      }
    }
    button{background:#357ce1;color:#fff;font-size:18px;;width:210px;height:50px;line-height:50px;text-align: center;border-radius: 2px;}
  }
  #verificationVer{margin:174px auto 450px;width:1200px;flex-flow:column;
    h3{font-size:36px;color:#222c38;margin-bottom:50px;}
    p{color:#5a626d;font-size:18px;margin-bottom:60px;
      b{font-size: 22px;color:#222c38;margin-left:10px;}
    }
    ul.label{
      li{position:relative;width:550px;margin-bottom:42px;
        label{color:#5a626d;font-size:16px;display: block;margin-bottom:10px;
        }
      input{width:550px;height:50px;border:1px solid #ddd;box-sizing: border-box;border-radius: 2px;text-indent:1em;
        &:disabled{background:#f4f5f5!important;}
      }
      }
    }
    button{background:#357ce1;color:#fff;font-size:18px;;width:210px;height:50px;line-height:50px;text-align: center;border-radius: 2px;margin-top:18px;}
  }
#verificationReset{margin:174px auto 450px;width:1200px;flex-flow:column;
  h3{font-size:36px;color:#222c38;margin-bottom:50px;}
  p{color:#5a626d;font-size:18px;margin-bottom:60px;
    b{font-size: 22px;color:#222c38;margin-left:10px;}
  }
  ul.label{
    li{position:relative;width:550px;margin-bottom:42px;
      label{color:#5a626d;font-size:16px;display: block;margin-bottom:10px;
      }
      input{width:550px;height:50px;border:1px solid #ddd;box-sizing: border-box;border-radius: 2px;text-indent:1em;
        &:disabled{background:#f4f5f5;}
      }

    }
  }
  button{background:#357ce1;color:#fff;font-size:18px;;width:210px;height:50px;line-height:50px;text-align: center;border-radius: 2px;margin-top:18px;}
}
</style>
