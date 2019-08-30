<template>
  <div id="changepassword">    
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
    <button @click.stop='btnsumlit'  class="btnhover" v-html="$t('common.submit')"></button>
  </div>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('userCenter.changePassword') + this.$t('seo.title'),
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
      password: '',
      reqpassword: '',
      username: '',
      google_code: '',
      regisertype: '',
      verification_code: '',
      intersmsiso: '',
      passwordonoff: true,
      strongpwdonoff: false,
      reqstrongpwdonoff: false
    }
  },
  created () {
    this.$store.state.users.subhead = 'find.findreset.title'
    this.username = this.$route.params.username
    this.regisertype = this.$route.params.regisertype
    this.verification_code = this.$route.params.verification_code
    this.intersmsiso = this.$route.params.intersmsiso
    this.ga = this.$route.params.ga
    this.google_code = this.$route.params.google_code
  },
  methods: {
    btnsumlit() {
      if (!this.password && !this.reqpassword) {
        this.$message({
          content:this.$t('common.notpassword')
        })
        this.$store.state.users.error.password = true
        return
      }
      if (!this.strongpwdonoff) {
        this.$message({
          content: this.$t('common.strongpws')
        })
        this.$store.state.users.error.password = true
        return
      }
      if (!this.passwordonoff) {
        this.$message({
          content: this.$t('find.pwdnot')
        })
        this.$store.state.users.error.password = true
        return
      }
      var geturl = '/user/emailpasswordReset'
      var getdata = {
        "username": this.username,
        "password": this.reqpassword,
        'intersmsiso': this.intersmsiso,
        'account_type': this.account_type,
        'google_code': this.google_code,
        'verification_code': this.verification_code
      }
      if (this.regisertype) {
        geturl = '/user/passwordReset'
      } else if (!this.regisertype) {
        geturl = '/user/emailpasswordReset'
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
          this.$store.state.errorText = ret.data.msg
          return
        }
        this.DefaultJs.logoutremover ()
        this.$router.push({ name: 'Login'})
      }).catch((error) => {
          console.log(error)
        })
    },
    passwordcode(d) {
      this.password = d.password
      this.strongpwdonoff = d.strongpwdonoff
      this.passwordonoff = (this.password == this.reqpassword)
    },
    reqpasswordcode(d) {
      this.reqpassword = d.password
      this.reqstrongpwdonoff = d.strongpwdonoff
      this.passwordonoff = (this.password == this.reqpassword)
    },
  }
}
</script>
<style lang="less" scoped>
  //  #app > #nav{background-color: rgb(10, 21, 30);}
  #changepassword{display:flex;flex-flow:column;background:#fff;
    h3{height:58px;line-height: 58px;color:#222c38;font-size:16px;padding:0 30px;border-bottom:1px solid #f2f3f8;margin-bottom:30px;}
    p{color:#5a626d;font-size:18px;margin-bottom:10px;padding:0 30px;
      b{font-size: 22px;color:#222c38;margin-left:10px;}
    }
    ul.label{
      li{position:relative;width:550px;margin-bottom:42px;padding:0 30px;
        label{color:#5a626d;font-size:16px;display: block;margin-bottom:10px;
        }
      input{width:550px;height:50px;border:1px solid #ddd;box-sizing: border-box;border-radius: 2px;text-indent:1em;}
      }
    }
    button{background:#357ce1;color:#fff;font-size:18px;;width:210px;height:50px;line-height:50px;text-align: center;border-radius: 2px;margin-top:18px;margin:12px 30px 70px;display: block;}
  }
</style>


