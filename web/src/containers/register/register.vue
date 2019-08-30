<template>
  <div v-if="!$store.state.loading" class="clear box">
    <div class="fl left">
    <div id="register" v-if="register">
      <div>
        <h3>{{$t('register.title')}}</h3>
        <ul class='tab'>
          <li @click.stop="tabonoff('mobile')" :class="{'act': regisertype}" v-html="$t('register.mobilereg')"></li>
          <li @click.stop="tabonoff('email')" :class="{'act': !regisertype}"  v-html="$t('register.emailreg')"></li>
        </ul>
        <ul class='label'>
          <li>
            <accout key="register" :accout="username" @accout='accout' :regisertype="regisertype"></accout>
          </li>
          <li>
            <password @passwordcode="passwordcode"></password>
          </li>
          <li>
            <my-verify  @verifyResult="verifyResult"></my-verify>
          </li>
          <li>
            <label v-html="$t('logSig.invite')"></label>
            <input type="text" name="invitefrom" v-model.trim="invitefrom">
          </li>
        </ul>
        <button @click.stop='btnsumlit' class="btnhover">{{$t('logSig.register')}}</button>
      </div>
    </div>
    <div id="registerVer" v-if="registerVer" class="clear">
      <h3 v-if="regisertype">{{$t('logSig.code')}}</h3>
      <h3 v-if="!regisertype">{{$t('logSig.code')}}</h3>
      <!-- <p>{{$t('register.code1')}}{{username}}{{$t('register.code2')}}</p> -->
      <ul class='label'>
        <li>
          <my-verify  @verifyResult="verifyResult"></my-verify>
        </li>
        <li>
          <verificationcode
          :account_type='account_type'
          :regisertype='regisertype'
          @verificationCode="verificationCode"
          :username="username"
          :nc_csessionid='nc_csessionid'
          :nc_sig='nc_sig'
          :nc_token='nc_token'
          :nc_scene='nc_scene'
          :intersmsiso="intersmsiso" ></verificationcode>
        </li>
      </ul>
      <button @click.stop='Verbtnsumlit' class="btnhover" v-html="$t('register.register')"></button>
    </div>
    </div>
    <div class="right fl">
      <!--<p v-html="$t('register.getcody')"></p>-->
      <img :src="$store.state.registerBanner" alt="">
      <!-- <span>{{$t('register.getnum1')}} {{countUserReg}} {{$t('register.getnum2')}}</span> -->
    </div>
  </div>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('logSig.freeregister') + this.$t('seo.title'),
      meta: [{
        name: 'keywords',
        content: this.$t('seo.keywords'),
      }, {
        name: 'description',
        content: this.$t('seo.description'),
      }]
    }
  },
  data () {
    return {
      regisertype: true,
      intersmsiso: '',
      loading: false,
      showintersmsiso: '',
      intersmsisoarr: [],
      username: '',
      password: '',
      nc_csessionid: '',
      nc_sig: '',
      nc_token: '',
      nc_scene: '',
      invitefrom: '',
      strongpwdonoff: false,
      countUserReg: '---',
      verification_code: '',
      account_type: 'mobile',
      register: true,
      registerVer: false
    }
  },
  beforeCreate () {
    this.axios.axiosget({
      url: '/portal/banner',
      params: {type: 'register-login-pc'}
    }).then((ret) => {
      this.$store.state.registerBanner = ret.data.data[0].image
    })
  },
  created () {
    var reg = this.DefaultJs.REG.notchinamobilereg
    var rege = this.DefaultJs.REG.emailreg
    var objnull = false
    for (var z in this.$route.params) {
      objnull = true
    }
    if (objnull) {
      if (!reg.test(this.$route.params.username) && !rege.test(this.$route.params.username)) {
        this.username = ''
      } else {
        this.username = this.$route.params.username
      }
      this.regisertype = this.$route.params.regisertype
      this.regisertype ? this.account_type = 'mobile' : this.account_type = 'email'
    }
    this.invitefrom = this.$route.query.invite
    this.axios.axiosget({
      url: '/h5/countUserReg'
    }).then((ret) => {
      this.countUserReg = ret.data.data.count
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    tabonoff(d) {
      this.$store.state.users.error.accout = false
      this.username = ''
      switch(d) {
        case 'mobile':
        this.regisertype = true
        this.account_type = 'mobile'
        return
        case 'email':
        this.regisertype = false
        this.account_type = 'email'
        return
      }
    },
    btnsumlit() {
      var sendurl = '/user/VerificationCode/send'
      this.loading = true
      if (!this.$store.state.nc_csessionid) {
        this.$message({
          content:this.$t('common.nct')
        })
        return
      }
      if (!this.password) {
        this.$message({
          content:this.$t('common.notpassword')
        })
        this.$store.state.users.error.password = true
        return
      }
      if (!this.strongpwdonoff) {

        this.$message({
          content:this.$t('common.strongpws')
        })
        this.$store.state.users.error.password = true
        return
      }
      let reg = null;
      if (this.regisertype) {
        if (this.intersmsiso == '86') {
          reg = this.DefaultJs.REG.chinamobilereg
        } else {
          reg = this.DefaultJs.REG.notchinamobilereg
        }
        if (!reg.test(this.username)) {
          this.$message({
            content:this.$t('find.mobileerror')
          })
          this.$store.state.users.error.accout = true
          return
        }
      } else if (!this.regisertype) {
        reg = this.DefaultJs.REG.emailreg
        if (!reg.test(this.username)) {
          this.$message({
            content:this.$t('find.emailerror')
          })
          this.$store.state.users.error.accout = true
          return;
        }
      }
      this.axios.axiospost({
        url: '/isAccountExist',
        data: {
        'username': this.username,
        'intersmsiso': this.intersmsiso,
        'account_type': this.regisertype ? 'mobile' : 'email'
        }
      }).then((data) => {
        this.$store.state.nc_csessionid = ''
        this.$store.state.nc_sig = ''
        this.$store.state.nc_token = ''
        this.$store.state.nc_scene = ''
        this.$store.state.nc.reset()
        if (!data.data.data.isExist) {
          this.$store.state.users.error.accout = false
          this.registerVer = true
          this.register = false
        } else {
          this.$store.state.users.error.accout = true
          this.$message({
            content: this.$t('logSig.isregister')
          })
        }
      }).catch((error) => {
          console.log(error)
        })
    },
    verifyResult (d) {
      this.nc_csessionid = d.nc_csessionid
      this.nc_sig = d.nc_sig
      this.nc_token = d.nc_token
      this.nc_scene = d.nc_scene
    },
    passwordcode(d) {
      this.password = d.password
      this.strongpwdonoff = d.strongpwdonoff
    },
    accout(d) {
      this.intersmsiso = d.intersmsiso
      this.username = d.username
    },
    Verbtnsumlit() {
      if (!this.$store.state.nc_csessionid) {
        this.$message({
          content:this.$t('common.nct')
        })
        return
      }
      if (!this.verification_code) {
        this.$message({
          content:this.$t('placeholder.code')
        })
        this.$store.state.users.error.code = true
        return
      }
      var geturl = '/user/emailRegister'
      if (this.regisertype) {
        geturl = '/user/register'
      } else if (!this.regisertype) {
        geturl = '/user/emailRegister'
      }
      this.axios.axiospost({
        url: geturl,
        data: {
          "username": this.username,
          "password": this.password,
          "intersmsiso": this.intersmsiso,
          'invite_code': this.invitefrom,
          'verification_code': this.verification_code,
          'account_type': this.account_type
        }
      }).then((ret) => {
        this.$store.state.successful = false
        this.$store.state.nc_csessionid = ''
        this.$store.state.nc_sig = ''
        this.$store.state.nc_token = ''
        this.$store.state.nc_scene = ''
        this.$store.state.nc.reset()
        if (ret.data.code == 0) {
          this.$store.state.users.errorText = ret.data.msg
          this.$message({
            content: ret.data.msg,
          })
        } else {
          this.$store.state.users.errorText = ''
          this.$message({
            content: ret.data.msg,
            type: 'check'
          })
        }
        if (ret.data.code == 1) {
          this.$store.state.users.token = ret.data.data.token
          window.localStorage.setItem('token', ret.data.data.token)
          window.localStorage.setItem('expire_time', ret.data.data.expire_time)
          if (this.regisertype) {
            this.$store.state.users.username = this.intersmsiso + ' ' + (this.username.substr(0, 3) + '****' + this.username.substr(7))
            this.$store.state.users.mobile = this.username
            window.localStorage.setItem('__M_a', window.btoa(window.btoa(window.btoa(this.username.substr(3) +this.username.substr(0,3)))))
          } else if (!this.regisertype) {
            this.$store.state.users.username = (this.username.substr(0, 1) + '****' + this.username.substr(5))
            this.$store.state.users.user_email = this.username
            window.localStorage.setItem('__W_a', window.btoa(window.btoa(window.btoa(this.username.substr(3) + this.username.substr(0,3)))))
          }
          this.axios.accountInfo()
          this.$router.push({ name: 'Portal'})
        }
      }).catch((error) => {
          console.log(error)
        })
    },
    verificationCode (d) {
      this.verification_code = d.verification_code
    },
  },
  computed: {
    lang () {
      return this.$store.state.LANG
    }
  },
  watch: {
    lang () {
      this.axios.axiosget({
        url: '/portal/banner',
        params: {type: 'register-login-pc'}
      }).then((ret) => {
        this.$store.state.registerBanner = ret.data.data[0].image
      })
    }
  }
}
</script>
<style lang="less" scoped>
  //  #app > #nav{background-color: rgb(10, 21, 30);}
  div.clear.box{margin:174px auto;;width:1200px;position:relative;}
    .left{width:550px;flex-shrink: 0;}
    .right{flex-shrink: 0;position:absolute;top:0;left:760px;height:100%;display:flex;justify-content: center;align-items: center;flex-flow:column;
      p{margin-top:170px;color:#5a626d;font-size: 22px;margin-bottom:30px;line-height: 1.3;}
      span{color:#5a626d;font-size:18px;}
    }
  #register{
    h3{font-size:36px;color:#222c38;margin-bottom:50px;}
    ul.tab{display: flex;color:#5a626d;font-size:16px;margin-bottom:40px;
      li{padding:0 0 6px;margin-right: 70px;cursor: pointer;display:inline-block;
        &.act{color:#357ce1;border-bottom:2px solid #357ce1;}
      }
    }
    ul.label{
      li{position:relative;width:550px;margin-bottom:38px;
        label{color:#5a626d;font-size:14px;display: block;margin-bottom:10px;}
        input{width:550px;height:50px;border:1px solid #ddd;box-sizing: border-box;border-radius: 2px;text-indent:1em;}
        input.testpassstrong{width:auto;height:auto;background:transparent;border:none;
          &.act{color:red;}
        }
      }
    }
    button{background:#357ce1;color:#fff;font-size:18px;;width:210px;height:50px;line-height:50px;text-align: center;border-radius: 2px;}
  }
  #registerVer{flex-flow:column;
    h3{font-size:36px;color:#222c38;margin-bottom:50px;}
    p{color:#5a626d;font-size:18px;margin-bottom:42px;}
    ul.label{
      & /deep/ #verificationmobild #google .val-box{justify-content:left;}
      li{position:relative;width:550px;margin-bottom:38px;
        label{color:#5a626d;font-size:16px;display: block;margin-bottom:10px;
        }
        input[name=intersmsiso]{
          width:140px;height:50px;flex-shrink: 0;text-align: center;
        }
      }
    }
    button{background:#357ce1;color:#fff;font-size:18px;;width:210px;height:50px;line-height:50px;text-align: center;border-radius: 2px;margin-top:60px;}
  }
</style>


