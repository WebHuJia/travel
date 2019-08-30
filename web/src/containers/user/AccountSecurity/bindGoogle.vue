<template>
  <div id="bindGoogle">
    <h3>{{$t('userCenter.bindgoogle.title')}}</h3>
    <p>{{$t('userCenter.bindgoogle.info')}}</p>
    <ul class='label'>
      <li>
        <h4>{{$t('userCenter.bindgoogle.first')}}</h4>
        <p>{{$t('userCenter.bindgoogle.firsttitle')}}</p>
        <div>
          <section id="ImgQr">
          </section>
          <p>
            <a href="https://itunes.apple.com/us/app/coindy/id1436784207?l=zh&ls=1&mt=8"><i class="fa fa-apple" aria-hidden="true"></i>App Store</a>
            <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"><img class="fa fa-google_play" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAM1BMVEUAAAD// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /+3leKCAAAAEHRSTlMACBHSxxragryn9eVcTDeOTzY3UgAAAJVJREFUOMu101sOAyEIBVABkWpfd/+rbTp+kM6MkDStXyacRMRr+dHipG7CRSMwIMwWEABCLEYBQCVu11sANoH6WIEpBOh6DlwMo1PgAsdWsBOougC4TNEL0wG4eNel3ffAhRVt287Bp5h1wDLwzI7gqMm2aLIG1wwGlY86fywPBLomgfk6cjUM7YCQRrHv2cchKn9cL4vtER2juXzCAAAAAElFTkSuQmCC" />google play</a>
          </p>
        </div>
      </li>
      <li>
        <h4>{{$t('userCenter.bindgoogle.two')}}</h4>
        <p>{{$t('userCenter.bindgoogle.twotitle')}}
          <span>{{$t('userCenter.bindgoogle.twoinfo')}}</span>
        </p>
        <div>
          <section>
            <loadingcenter v-if="qrCodeUrlOnoff" />
            <img @load="qrCodeUrlOnoff = false" :src="qrCodeUrl" alt="">
          </section>
           <label>
            <span>{{$t('userCenter.bindgoogle.key')}}</span>
            <em>{{secret}}</em>
            <a href="javascript:;" @click.stop="copyurl" id="copy_btn">{{$t('userCenter.bindgoogle.copy')}}</a>
          </label>
        </div>
      </li>
      <li>
        <h4>{{$t('userCenter.bindgoogle.three')}}</h4>
         <label>{{$t('userCenter.ga')}}</label>
        <input type="text" v-model.trim="google_code">
        <button @click.stop='btnsumlit' v-html="$t('userCenter.bindgooglesuccess')"></button>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  metaInfo () {
    return {
      title: this.$t('userCenter.bindgoogle.title') + this.$t('seo.title'),
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
      google_code: '',
      Invitecode: '',
      verification_code: '',
      secret: '',
      qrCodeUrl: '',
      qrCodeUrlOnoff: true
    }
  },
  created () {
    this.$nextTick(() => {
      this.$QRCodeSC({
        obj:'ImgQr',
        w: 91,
        h: 91,
        url: `https://${document.domain}/mobile/google`
      })
    })
    this.$store.state.users.subhead = 'userCenter.bindgoogle.title'
    this.axios.axiosget({
      url: '/user/googleAuthenticator'
    }).then((ret) => {
      this.secret = ret.data.data.secret
      this.qrCodeUrl = ret.data.data.qrCodeUrl
    }).catch((error) => {
      console.log(error)
    })
  },
  mounted () {

  },
  methods: {
    copyurl () {
      this.$copyText(this.secret).then((e) => {
        this.$message({
          content: this.$t('common.success'),
          type: 'check'
        })
      }, (e) => {
        this.$message({
          content: 'Can not copy',
          type: 'check'
        })
      })
    },
    btnsumlit() {
      if (!this.google_code || this.google_code.length <= 5) {
        this.$message({
          content: this.$t('find.googleerror')
        })
        return
      }
      var geturl = '/user/bindGa'
      this.axios.axiospost({
        url: geturl,
        data: {
          "google_code": this.google_code,
          "google_secret": this.secret,
        }
      }).then((ret) => {
        if (ret.data.code == 1) {
          this.$message({
            content: ret.data.msg,
            type: 'check',
          })
          window.localStorage.setItem('ga', true)
          this.$store.state.users.ga=true
          this.axios.accountInfo()
          this.$router.push({ name: 'AccountSecurity'})
        }
      }).catch((error) => {
          console.log(error)
        })
    },
    vercode (d) {
      this.verification_code = d.vercode
    }
  }
}
</script>
<style lang="less" scoped>
  //  #app > #nav{background-color: rgb(10, 21, 30);}
  #bindGoogle{display:flex;flex-flow:column;background:#fff;
    h3{height:58px;line-height: 58px;color:#222c38;font-size:16px;padding:0 30px;border-bottom:1px solid #f2f3f8;margin-bottom:20px;font-weight: normal;}
    p{color:#5a626d;font-size:14px;margin:0 30px 10px;padding:0 0 20px;line-height:1.7;border-bottom:1px solid #f2f3f8;
      b{font-size: 22px;color:#222c38;margin-left:10px;}
    }
    h4{color:#222c38;font-size:16px;margin-bottom:20px;font-weight: normal;}
    ul.label{margin-top:20px;
      li{position:relative;margin-bottom:42px;padding:0 30px;
        label{color:#a5aab0;font-size:14px;display: block;margin-bottom:10px;margin-top:30px;}
        p{margin:0;font-size:16px;
          span{display:block;margin-top:16px;color:#ff0a0a;font-size:14px;}
        }
        input{width:550px;height:50px;border:1px solid #ddd;box-sizing: border-box;border-radius: 2px;text-indent:1em;}
        div{display: flex;margin:20px 0;border-bottom:1px solid #f2f3f8;padding-bottom:20px;
          section{width:91px;height:91px;margin-right:24px;margin-right:24px;
            & /deep/ #loading-center{
              margin:0;padding:0;border:none;
              &-absolute{
                transform: scale(.4);
              }
            }
            img{width:91px;height:91px;display: block;}
          }
          p{color:#fff;font-size:14px;display:flex;flex-flow:column;justify-content: space-around;padding:0;border:none;
            a{display: flex;justify-content: center;align-items:center;width:119px;height:27px;line-height:27px;text-align:center;color:#fff;background:#357ce1;border-radius:2px;font-size:14px;text-align:left;text-align:center;
              i{margin-right:10px;
                }
              img.fa-google_play{width:18px;height:18px;display: inline-block;vertical-align: middle;margin:0;}
            }
          }
          label{display: flex;flex-wrap:wrap;align-items:flex-end;color:#5a626d;font-size:14px;margin:0;
            span{display: block;flex-shrink: 0;width:100%;}
            a{color:#357ce1;font-size:14px;margin-left:30px;}
          }
        }
      }
    }
    button{background:#357ce1;color:#fff;font-size:18px;;width:210px;height:50px;line-height:50px;text-align: center;border-radius: 2px;margin-top:18px;margin:60px 0 70px;display: block;}
  }
</style>
