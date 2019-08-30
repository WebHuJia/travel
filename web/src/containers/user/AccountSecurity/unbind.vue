<template>
  <div id="unbind">
    <h3>{{$t('userCenter.unbindpage.title')}}</h3>
    <ul class='label'>
      <li>
        <label v-if="regisertype">{{$t('logSig.mobile')}}</label>
        <label v-if="!regisertype">{{$t('logSig.email')}}</label>
        <input type="text" disabled v-model.trim="account">
      </li>
      <li>
        <my-verify @verifyResult="verifyResult"></my-verify>
      </li>
      <li>
        <verificationcode
        :account_type="this.$route.params.type"
        @verificationCode="verificationCode"
        :username="(this.$route.params.type === 'mobile') ? this.$store.state.users.mobile : this.$store.state.users.user_email"
        :nc_csessionid="nc_csessionid"
        :nc_sig="nc_sig"
        :nc_token="nc_token"
        :nc_scene="nc_scene"
        :regisertype='regisertype'
        :intersmsiso="intersmsiso" ></verificationcode>
      </li>
      <li v-if="ga">
        <label v-html="$t('find.googlecode')"></label>
        <input type="text" v-model.trim="google_code" :placeholder="$t('placeholder.code')">
      </li>
    </ul>
    <button @click.stop="sumlitbtn" class="btnhover" v-html="$t('userCenter.unbind')"></button>
  </div>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('userCenter.unbindpage.title') + this.$t('seo.title'),
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
      google_code: null,
      regisertype: null,
      verification_code: null,
      intersmsiso: '',
      bind: null,
      bindtype: null,
      ga: false,
      account: '',
      account_type: '',
      nc_csessionid: '',
      nc_sig: '',
      nc_token: '',
      nc_scene: '',
    }
  },
  created () {
    this.$store.state.users.subhead = 'userCenter.unbindpage.title'
    this.account = this.$route.params.account
    this.regisertype = (this.$route.params.type === 'mobile') ? true : false
    this.bind = this.$route.params.bind
    this.ga = this.$route.params.ga
    this.intersmsiso = this.$route.params.intersmsiso
    this.account_type = this.$route.params.type
  },
  methods: {
    sumlitbtn() {
      if (this.ga && (!this.google_code || this.google_code.length <= 5)) {
        this.$message({
          content: this.$t('find.googleerror')
        })
        return
      }
      if (!this.verification_code) {
        this.$message({
          content: this.$t('placeholder.code')
        })
        return
      }
      if (!this.$store.state.nc_csessionid) {
        this.$message({
          content: this.$t('common.nct')
        })
        return
      }
      var sendurl = '/user/unbindEmail'
      if (this.regisertype) {
        sendurl = '/user/unbindMobile'
      } else if (!this.regisertype) {
        sendurl = '/user/unbindEmail'
      }
      var senddata = {
        'verification_code': this.verification_code,
      }
      if (this.ga) {
        senddata = {
          'google_code': this.google_code,
          'verification_code': this.verification_code,
        }
      }
      this.axios.axiospost({
        url: sendurl,
        data:senddata
      }).then((ret) => {
        if (ret.data.code == 1) {
          this.$message({
            content: ret.data.msg,
            type: 'check'
          })
          if (this.regisertype) {
            localStorage.removeItem('mobile')
            localStorage.removeItem('intersmsiso')
            localStorage.removeItem('__M_a')
            this.$store.state.users.mobile = ''
          } else {
            localStorage.removeItem('user_email')
            localStorage.removeItem('__W_a')
            this.$store.state.users.user_email = ''
          }
          localStorage.setItem('username', localStorage.getItem('mobile') ? localStorage.getItem('mobile') : localStorage.getItem('user_email'))
          this.axios.accountInfo()
          this.$router.push({ name: 'AccountSecurity'})
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
    verificationCode (d) {
      this.verification_code = d.verification_code
    }
  }
}

</script>
<style lang="less" scoped>
  //  #app > #nav{background-color: rgb(10, 21, 30);}
  #unbind{display:flex;flex-flow:column;background:#fff;
    h3{height:58px;line-height: 58px;color:#222c38;font-size:16px;padding:0 30px;border-bottom:1px solid #f2f3f8;margin-bottom:30px;}
    p{color:#5a626d;font-size:18px;margin-bottom:10px;padding:0 30px;
      b{font-size: 22px;color:#222c38;margin-left:10px;}
    }
    ul.label{
      li{position:relative;width:550px;margin-bottom:42px;padding:0 30px;
        label{color:#5a626d;font-size:14px;display: block;margin-bottom:10px;
        }
      input{width:550px;height:50px;border:1px solid #ddd;box-sizing: border-box;border-radius: 2px;text-indent:1em;}
      }
    }
    button{background:#357ce1;color:#fff;font-size:18px;;width:210px;height:50px;line-height:50px;text-align: center;border-radius: 2px;margin-top:18px;margin:12px 30px 70px;display: block;}
  }
</style>
