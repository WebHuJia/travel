<template>
  <div id="securityver">
    <h3>{{$t('find.findver.title')}}</h3>
    <ul class='label'>
      <li>
        <label v-if="regisertype">{{$t('logSig.mobile')}} </label>
        <label v-if="!regisertype">{{$t('logSig.email')}} </label>
        <input type="text" disabled :value="usernamem">
      </li>
        <li>
          <my-verify @verifyResult="verifyResult"></my-verify>
        </li>
      <li>
        <verificationcode
        :account_type="account_type"
        :type="type"
        :regisertype="regisertype"
        :nc_token="nc_token"
        :nc_scene="nc_scene"
        :nc_sig="nc_sig"
        :nc_csessionid="nc_csessionid"
        @verificationCode="verificationCode"
        :username="username"
        :intersmsiso="intersmsiso" ></verificationcode>
      </li>
      <li v-if="ga">
        <label v-html="$t('find.googlecode')"></label>
        <input type="text" v-model.trim="google_code" :placeholder="$t('placeholder.code')">
      </li>
    </ul>
    <button @click.stop="sumlitbtn" class="btnhover" v-html="$t('common.submit')"></button>
  </div>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('find.findver.title') + this.$t('seo.title'),
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
      regisertype: this.$store.state.users.mobile ? true : false,
      intersmsiso: '',
      username: '',
      usernamem: '',
      intersmsisoselectonoff: false,
      ga: false,
      google_code: '',
      verification_code: '',
      user_email: '',
      nc_csessionid: '',
      nc_sig: '',
      nc_token: '',
      nc_scene: '',
      routername: '',
      type: 'findpassword',
      check_type: '',
      account_type: this.$store.state.users.mobile ? 'mobile' : 'email'
    }
  },
  created () {
    this.$store.state.users.subhead = 'find.findver.title'
    this.usernamem = localStorage.getItem('mobile') ? '+' + localStorage.getItem('intersmsiso') + ' ' + localStorage.getItem('mobile') : localStorage.getItem('username')
    this.username = this.$store.state.users.mobile
    this.user_email = this.$store.state.users.user_email
    this.intersmsiso = localStorage.getItem('intersmsiso')
    this.ga = eval(localStorage.getItem('ga'))
  },
  methods: {
    sumlitbtn () {
      var geturl = '/checkVerificationCode'
      if (this.ga) {
        this.check_type = 3
      } else {
        this.check_type = 1
      }
      if (!this.$store.state.nc_csessionid) {
        this.$message({
          content: this.$t('common.nct')
        })
        return
      }
      if (this.ga && (!this.google_code || this.google_code.length <= 5)) {
        this.$message({
          content: this.$t('find.googleerror')
        })
        this.$store.state.users.error.googlecode = true
        return
      }
      if (!this.verification_code) {
        this.$message({
          content: this.$t('placeholder.code')
        })
        this.$store.state.users.error.code = true
        return
      }
      var getdata = {
        "username": this.username,
        "intersmsiso": this.intersmsiso,
        "verification_code": this.verification_code,
        "google_code": this.google_code,
        'account_type': this.account_type,
        'check_type': this.check_type
      }
      this.axios.axiospost({
        url: geturl,
        data:getdata
      }).then((ret) => {
        if (ret.data.code == 1) {
          this.$message({
            content: ret.data.msg,
            type: 'check',
          })
        } else {
          this.$store.state.users.errorText = ret.data.msg

          return
        }
        this.$router.push({ name: 'ChangePassword', params: {
          username: this.$store.state.users.username,
          google_code: this.google_code,
          regisertype: this.regisertype,
          verification_code: this.verification_code,
          intersmsiso: this.intersmsiso,
          bind: this.$route.params.unbind,
          ga: eval(this.$route.params.ga),
          account_type: this.account_type
        }})
      }).catch((error) => {
          console.log(error)
        })
    },
    verificationCode (d) {
      this.verification_code = d.verification_code
    },
    intersmsisoselect(event) {
      this.showintersmsiso = event.currentTarget.innerHTML
      this.intersmsiso = event.currentTarget.children[0].innerHTML
    },
    verifyResult (d) {
      this.nc_csessionid = d.nc_csessionid
      this.nc_sig = d.nc_sig
      this.nc_token = d.nc_token
      this.nc_scene = d.nc_scene
    },
    intercode(d) {
      this.intersmsiso = d.intersmsiso,
      this.codesumlit = d.codesumlit
    }
  }
}
</script>
<style lang="less" scoped>
  //  #app > #nav{background-color: rgb(10, 21, 30);}
  #securityver{display:flex;flex-flow:column;background:#fff;
    h3{height:58px;line-height: 58px;color:#222c38;font-size:16px;padding:0 30px;border-bottom:1px solid #f2f3f8;margin-bottom:30px;}
    p{color:#5a626d;font-size:18px;margin-bottom:10px;padding:0 30px;
      b{font-size: 22px;color:#222c38;margin-left:10px;}
    }
    ul.label{
      li{position:relative;width:550px;margin-bottom:42px;padding:0 30px;
        label{color:#5a626d;font-size:14px;display: block;margin-bottom:10px;
        }
      input{width:550px;height:50px;border:1px solid #ddd;box-sizing: border-box;border-radius: 2px;text-indent:1em;
        &:disabled{background:#f4f5f5;}
      }
      }
    }
    button{background:#357ce1;color:#fff;font-size:18px;;width:210px;height:50px;line-height:50px;text-align: center;border-radius: 2px;margin-top:18px;margin:12px 30px 70px;display: block;}
  }
</style>


