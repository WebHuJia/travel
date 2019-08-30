<template>
  <div style="height:100%;">
    <main class='h5register' v-if="registeronoff">
      <header>
        <h1 class='texthide'><a href="//www.coindy.com/" class='block'>coindy</a></h1>
        <h2>{{$t('h5register.news')}}</h2>
        <router-link :to="{name: 'MobileDown'}">{{$t('h5register.dow')}}</router-link>
      </header>
      <banner :autoBannerHeight="true" type="register-promotion-h5" :content="false" :image="true"></banner>
      <article class='bg'>
        <span class='block countNum'><span v-html="$t('h5register.n')"></span><i id="countNum"> {{countNum}}</i> <span v-html="$t('h5register.l')"></span></span>
        <!-- <img src="/static/staticfile/images/h5register/bg.jpg" alt="" class='bgImg'> -->
        <div class='content'>
          <ul class='tab'>
            <li @click.stop="tabonoff('mobile')" :class="{'act': regisertype}" v-html="$t('register.mobilereg')"></li>
            <li @click.stop="tabonoff('email')" :class="{'act': !regisertype}"  v-html="$t('register.emailreg')"></li>
          </ul>
          <form>
            <div class="box usernamebox">
              <accout @accout='accout' :regisertype="regisertype" ></accout>
              <button type="button" id='nextShowBtn' v-if="!nextShow" @click="nextShowFun">{{$t('h5register.lq')}}</button>
            </div>
            <div v-show="nextShow">
              <div class="box">
                <Mobile_verify :titleOnoff="false"  @verifyResult="verifyResult"></Mobile_verify>
              </div>
              <div class="box code">
                <verificationcode
                  :titleOnoff="false"
                  :account_type='account_type'
                  :regisertype='regisertype'
                  @verificationCode="verificationCode"
                  :username="username"
                  :nc_csessionid='nc_csessionid'
                  :nc_sig='nc_sig'
                  :nc_token='nc_token'
                  :nc_scene='nc_scene'
                  :intersmsiso="intersmsiso" ></verificationcode>
              </div>
              <div class="box">
                <password :isShowPasswordStrong="false" :titleOnoff="false" @passwordcode="passwordcode"></password>
              </div>
              <div class="box sub">
                <input type="button" @click="Verbtnsumlit" id="submitbtn" name="" :value="$t('h5register.btnlq')">
              </div>
            </div>
          </form>
          <ul class='project'>
            <li class='project_li'>
              <div class='profit'>
                <div>
                  <img src="/static/staticfile/images/h5register/hot_bg_one.png" alt="">
                  <p>
                    <span v-html="$t('h5register.p')"></span>
                    <strong :style="$store.state.LANG == 'zh-cn' ? 'margin-top:.2rem' : ''">521%</strong>
                  </p>

                </div>
                <div>
                  <img src="/static/staticfile/images/h5register/hot_bg_two.png" alt="">
                  <p>
                    <span v-html="$t('h5register.z')"></span>
                    <strong :style="$store.state.LANG == 'zh-cn' ? 'margin-top:.2rem' : ''">1367%</strong>
                  </p>
                </div>
              </div>
              <ol class='profitList'>
                <li class='block'><i></i>{{$t('h5register.z8')}}</li>
                <li class='block'><i></i>{{$t('h5register.z9')}}</li>
              </ol>
            </li>
            <li class='project_li'>
              <h3>
                {{$t('h5register.x')}}
              </h3>
              <table>
                <tr>
                  <td class="tabBg" v-html="$t('h5register.d')"></td>
                  <td class="tabBg">SOP</td>
                </tr>
                <tr>
                  <td v-html="$t('h5register.f')"></td>
                  <td>0.017594203 USDT</td>
                </tr>
                <tr>
                  <td class="tabBg" v-html="$t('h5register.c')"></td>
                  <td class="tabBg">0.24057971 USDT</td>
                </tr>
                <tr>
                  <td v-html="$t('h5register.zzl')"></td>
                  <td>1367.38056%</td>
                </tr>
              </table>
            </li>
            <li class='project_li'>
              <h3 v-html="$t('h5register.w')"></h3>
              <div class='mt'>
                <p v-html="$t('h5register.in')"></p>
                <img :src="$t('h5register.projectadav')" alt="">
              </div>
            </li>
            <li class='project_li'>
              <h3 v-html="$t('h5register.lx')"></h3>
              <div class='mt last'>
                <img src="/static/staticfile/images/h5register/foot_fig_bg.png" alt="">
                <span>
                <a class="block" href="https://t.me/coindycn"><i class="team"></i>https://t.me/coindycn</a>
                <a class="block" href="https://0.plus/sp/coindycn"><i class="plus"></i>https://0.plus/sp/coindycn</a>
                <p><i class="wechat"></i>{{$t('h5register.kf')}}</p>
                <p><i class="email"></i>support@coindy.com</p>
                <p><i class="site"></i>Digomi Masivi 4,Tbilisi, Georgia</p>
              </span>
              </div>
            </li>
          </ul>
          <!--<footer>-->
            <!--<img src="/static/staticfile/images/h5register/rightsLogo.png" alt="">-->
            <!--<p v-html="$t('intr.name')"></p>-->
            <!--<p>2017-2018 All rights reserved</p>-->
          <!--</footer>-->
        </div>
      </article>
      <div class="pop" id='pop' v-if="registerpop">
        <div>
          <i class="fa fa-times" aria-hidden="true" @click="registerpop = false"></i>
          <img src="/static/staticfile/images/h5register/popprize.png" alt="CODY奖品">
          <p>已经注册</p>
          <span>去下载App领取50CODY</span>
          <router-link :to="{name:'MobileDown'}">去下载</router-link>
        </div>
      </div>
    </main>
    <main class='skipdown' v-if="!registeronoff">
      <div class='skiptext'>
        <p>Successfully received</p>
        <span class="block">100CODY</span>
        <i class="block">Download App to see your wallet <br> address.</i>
      </div>
      <div class='skipbtn'>
        <router-link :to="{name: 'MobileDown'}" class='block btn' style="font-size:.32rem;">Download App to get more tokens.</router-link>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('h5register.news') + this.$t('seo.title'),
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
      registerpop: false,
      registeronoff: true,
      countNum: '------',
      nextShow: false,
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
    this.$store.commit('refreshed')
    if (this.$store.state.MOBILE === 'web') {
      this.$router.push({name: 'Register',query: this.$route.query})
    } else {
      this.$router.push({name: 'MobileRegister',query: this.$route.query})
    }
  },
  created () {
    this.invitefrom = this.$route.query.invite
    this.axios.axiosget({
      url: '/h5/countUserReg'
    }).then((ret) => {
      this.countNum = ret.data.data.count
    }).catch((err) => {
      console.log(err)
    })
    if (this.$store.state.nc) {
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
  methods: {
    accout(d) {
      this.intersmsiso = d.intersmsiso
      this.username = d.username
      this.regisertype = d.regisertype
    },
    tabonoff(d) {
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
    },
    nextShowFun () {
      this.nextShow = true
      try {
        this.$store.state.successful = false
        this.$store.state.nc.reset()
      }catch(e) {
        setTimeout(()=>{
          this.$store.state.successful = false
          this.$store.state.nc.reset()
        },200)
      }
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
        if (ret.data.code == 0) {
          this.$message({
            content: ret.data.msg,
          })
          if (ret.data.msg == '此账号已存在' || ret.data.msg == 'This account already exists') {
            this.registerpop = true
            return
          }
        } else {
          this.$message({
            content: ret.data.msg,
            type: 'check'
          })
        }
        this.$store.state.successful = false
        this.$store.state.nc_csessionid = ''
        this.$store.state.nc_sig = ''
        this.$store.state.nc_token = ''
        this.$store.state.nc_scene = ''
        this.$store.state.nc.reset()
        if (ret.data.code == 1) {
          this.registeronoff = false
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  computed: {
    nc () {
      return this.$store.state.nc
    },
    lang () {
      return this.$store.state.LANG
    }
  },
  watch: {
    lang () {

    },
    nc () {
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
  }
}
</script>

<style lang="less" scoped>

#appMobile{
  .h5register{overflow-x: hidden;background: #5218c9;position: relative;margin:0 auto;
    & /deep/ input{height: 1.4em!important;margin: 1em 0!important;border: none;line-height:1.4em!important;}
    & /deep/ #verify{position:absolute;top:0;left:0;border-radius:1rem;overflow:hidden;
      .nc_wrapper{height:100%;}
      #nc-verify{
        .nc_scale{
          span{line-height:1rem;}
        }
      }
      .slider{
        .label{
          height:1rem;line-height:1rem;
        }
      }
      .stage{
        .track{
          div{height:100%;line-height:1rem;}
        }
      }
    }
    & /deep/ input{font-size:.3rem;
      &::placeholder{color:#cccccc;font-size:.3rem}
    }
    & /deep/ #password{height:100%;
      margin:0;width:100%;border-radius:1rem;
      input{width:100%;border-radius:1rem;height:100%;}
    }
    & /deep/ #verificationcode{
      height:100%;width:100%;border-radius:1rem;line-height:1rem;
      .code{height:100%;display: flex;align-items: center;}
      input{font-size:.28rem;
        &::placeholder{color:#cccccc;font-size:.24rem}
      }
      input{height:100%;line-height:1rem;width:100%;padding:0;}
      input[type=text]{border-radius:1rem 0 0 1rem;border:none;text-indent: 1em;font-size:.26rem}
      input[type=button]{background: none;border:1px solid #d1d1d1;color:#666666;font-size:.32rem;;text-align: center;height:.62rem;line-height: .62rem;border-radius:.62rem;margin-right:.3rem;width:auto;font-size:.26rem;padding:0 .2rem;height:2em!important;line-height:2em!important;position:absolute;right:.3rem;top:0;}
    }
    img{width:100%;height:auto;}
    header{height:.9rem;background: #fff;display: flex;line-height: .9rem;padding:0 .3rem;
      h1{height:.9rem;background:url(/static/staticfile/images/h5register/logo.png) no-repeat 50%;background-size: 1.04rem .4rem;width:1.04rem;flex-shrink: 0;line-height:.9rem;}
      h2{font-size:.24rem;;color:#666666;flex-grow: 2;text-align: center;line-height:.9rem;}
      a{font-size:.24rem;;color:#666666;flex-shrink: 0;line-height:.9rem;}
    }
    .banner{width:100%;overflow: hidden;position: relative;text-align: center;
      img{display: block;}
      h3,p{height:5rem;}
    }
    span.countNum{line-height: 100%;color:#fff;font-size:.32rem;line-height: 1.2;padding:.1rem;text-align: center;margin-bottom: .4rem;
      i{color:#ffd16d;font-style: normal;}
    }
    ul.tab{display: flex;color:#5a626d;font-size:.32rem;margin-bottom:1rem;justify-content: center;width:6.4rem;height:1rem;border:.02rem solid #fff;border-radius:2.2rem;margin:0 auto;
      li{cursor: pointer;display:inline-block;height:100%;line-height:1rem;width:50%;text-align: center;color:#fff;box-sizing: border-box;
        &.act{background:#fff;border-radius:2.2rem;color:#541bca;height:1rem;}
      }
    }
    .bg{position: relative;background: #5117c9 url(/static/staticfile/images/h5register/bg.jpg) no-repeat 0 top/100% auto;overflow: hidden;margin-top:-1px;
      // .content{position:absolute;;top:0;left:0;width:100%;}
      form{
        div.box{height:1rem;width:6.4rem;margin:.3rem auto;position:relative;border-radius: 1rem;display: flex;align-items: center;border-radius: 1rem;background: #fff;overflow: hidden;
          &.nextShow{display: none;}
          &.usernamebox {
            & /deep/ #accout{width:100%;height:100%;
              input{font-size:.3rem;line-height:1rem;
                &::placeholder{font-size:.24rem;}
              }
              span{text-align:left;font-size:.3rem;text-indeng:.2rem;}
              i{right:.2rem;}
              article{height:100%;
                input.isEmail{border-radius:1rem;}
              }
              #mobilecode{width:1.8rem;
                span{width:1.8rem;height:100%;line-height:1rem;border:none;font-size:.3rem;}
                ul.intersmsiso{height:6rem;position:fixed;bottom:0;width:100%;top:auto;pointer-events: all;z-index: 12345;
                  li{font-size:.32rem;
                    span{font-size:.32rem;
                      i{font-size:.32rem;}
                    }
                  }
                }
              }

              input{width:100%;height:100%;border-radius:0 1rem 1rem 0;}
              label{display: none;}
            }
            input{text-indent: 3.6rem;}
            #nextShowBtn{height: 1rem;position: absolute;top: 0;right: 0;width: 2.1rem;line-height: 1rem;text-align: center;color: #c3591c;font-size: .3rem;border-radius: 1rem;box-sizing: border-box;border: 0;background: #f7bf38;}
          }
          & /deep/ #password{
            input{
              &::placeholder{font-size: .24rem;}
            }
          }
          .intersmsiso{width:3rem;height:1rem;border-radius: 1rem 0 0 1rem;position: absolute;top:0;left:0;z-index: 1234;background: none;border: none;opacity: 0;cursor: pointer;}
          &.sub{margin:.7rem auto .5rem;;background:url(/static/staticfile/images/h5register/regbtnbg.png) no-repeat 50%/cover;
            #submitbtn{text-indent: 0;background: transparent;width:100%;height:.9rem;color: #c3591c;font-size: .3rem;font-weight: bold;position:absolute;top:0;left:0;}
            img{position: absolute;top:0;left:0;height:100%;}
          }
          input{border-radius: 1rem;width:100%;box-sizing: border-box;border:none;font-size:.32rem;text-indent: 1.3rem;
            &[type='submit']{text-indent: 0;background: none;color:#c3591c;font-size:.3rem;font-weight: bold;height:2.3rem;line-height: .86rem;}
            & + button{height:1rem;position: absolute;top:0;right:0;width:2.1rem;line-height: 1rem;text-align: center;color:#c3591c;font-size:.32rem;;border-radius: 1rem;box-sizing: border-box;border:0;background: #f7bf38;}
          }
        }
      }
      .project{width:calc(100% - 1rem);overflow: hidden;margin-block-start: 0px;margin-block-end: 0px;margin-inline-start: 0px;padding-inline-start: 0;margin: 0 auto;
        li.project_li{margin:.9rem auto;border-radius: .6rem;background: #fff;padding:.4rem;font-size: 0;text-align: center;position: relative;
          &:first-child{margin-top: 0;}
          div.profit {display:flex;
            div{width:2.72rem;display: inline-block;position: relative;color:#666666;font-size:.28rem;height:2.51rem;vertical-align: middle;position: relative;
              img{width:100%;height:100%;}
              &:nth-child(1){margin-right: 2%;}
              &:nth-child(2){margin-left: 2%;}
              p{position: absolute;top:1.3rem;left:0;right:0;bottom:.2rem;margin: auto;color: #f89b2e;height:1.3rem;text-align: center;
                span{color:#f89b2e;font-size:.2rem;display: block;line-height: 1.2;}
                strong{color:#f89b2e;font-size: .5rem;display: block;}
              }
            }
          }
          ol.profitList{margin-top: .5rem;
            li{font-size:.28rem;color:#666666;list-style: disc;text-align: left;margin-top:.2rem;
              i{display: inline-block;width:.08rem;height:.08rem;background: #666666;border-radius: 50%;vertical-align: middle;margin-right:.2rem;}
            }
          }
          h3{background: url(/static/staticfile/images/h5register/regtitlebg.png) no-repeat;width: 100%;height: .86rem;position: absolute;top: -.12rem;left: 0;color:#c3591c;font-size:.35rem;line-height: .86rem;background-size:4.73rem .86rem;background-position: 50%;}
          p{color:#666666;font-size: .28rem;text-align: left;line-height: 1.7;}
          .mt{margin-top: .56rem;
            img{margin-top:.4rem;display: block;}
            &.last{display:flex;align-items:flex-end;
              img{width:auto;height:2.8rem;flex-shrink: 0;margin-right:0;margin-top:0;}
              span{font-size:.28rem;color:#666;text-align: left;white-space: nowrap;
                a{color:#666;margin-bottom: .2rem;font-size:.28rem;line-height:100%;}
                i{display: inline-block;width:.28rem;height:.3rem;background:url(/static/staticfile/images/h5register/registericon.png) no-repeat 0 0;background-size:.26rem 2.12rem;vertical-align: middle;margin-right:.2rem;
                  &.team{background-position: 0 .01rem;}
                  &.plus{background-position: 0 -.46rem;}
                  &.wechat{background-position: 0 -.93rem;}
                  &.email{background-position: 0 -1.4rem;}
                  &.site{background-position: 0 -1.86rem;}
                }
                p{color: #666;margin-bottom: .2rem;line-height:100%;}
              }
            }
          }
          table{font-size:.28rem;color:#666666;margin-top: .8rem;width: 100%;border-spacing:0;border-top:1px solid #cccccc;border-left:1px solid #cccccc;
            tr{height:.67rem;line-height: .67rem;
              td{border-bottom:1px solid #cccccc;border-right: 1px solid #cccccc;text-align: left;text-indent: .5em;white-space: nowrap;
                &:nth-child(1){width:40%;}
                &:nth-child(2){width:60%;}
              }
            }
          }
        }
      }
    }
    #intersmsiso{position: absolute;top:0;left:0;width:3rem;height:.4rem;border-radius: .4rem 0 0 1rem;z-index: 12345;text-indent: 0;cursor: pointer;background: none;box-sizing:border-box;pointer-events:none;}
    footer{color:#9077d9;font-size: .6rem;text-align: center;padding-bottom:1.5rem;
      img{width: .4rem;height:auto;margin-bottom: .4rem;}
    }
    .tabBg{background: #f8f8f8;}
    .pop{background: rgba(0,0,0,0.5);position: fixed;top:0;left: 0;width:100%;height:100%;z-index: 12356;
      div{position: fixed;top:0;left:0;right:0;bottom:0;margin: auto;width: 80%;height:7rem;background: #fff;border-radius: .06rem;text-align: center;
        img{display: block;width:3rem;margin:.2rem auto;}
        p{color: #212121;font-size: .3rem;font-weight: bold;line-height: 1.7;}
        span{color: #666666;font-size: .4rem;display: block;line-height: 1.7;margin-top:.2rem;}
        a{display: block;width:4.8rem;height:.81rem;background: url(/static/staticfile/images/h5register/popbtn.png) no-repeat 50%;background-size:4.8rem .81rem;line-height: .86rem;margin:.4rem auto;color:#c3591c;font-size: .32rem;font-weight: bold;}
        i.fa{position: absolute;right: 10px;top: 10px;font-size: .4rem;cursor: pointer;}
      }
    }
  }
  .skipdown{background: url(/static/staticfile/images/h5register/skipbg.jpg) no-repeat 50% top/cover;width:100%;height:100%;overflow: hidden;
    .skiptext{background: url(/static/staticfile/images/h5register/skiptext.png) no-repeat 50%/cover;width:6.51rem;height:4.78rem;margin:3.8rem auto 1.3rem;color:#f89b2e;overflow: hidden;text-align:center;
      p{font-size: .36rem;margin:1.16rem auto .7rem;font-weight: bold;}
      span{font-size: .48rem;font-weight: bold;margin-bottom: .4rem;}
      i{font-size: .28rem;font-style: normal;line-height:1.5;}
    }
    .skipbtn{width:6.52rem;margin:0 auto;
      a{
        &.btn{width:6.52rem;margin:0 auto;background: url(/static/staticfile/images/h5register/regbtnbg.png) no-repeat 50%;background-size: 100%;height:1.06rem;line-height:1.05rem;color:#c3591c;font-size: .3rem;font-weight: normal;margin-bottom: 1.6rem;text-align:center;}
        span{color: #ffffff;opacity: .6;text-align: center;font-size: .6rem;margin-bottom: .2rem;}
        strong{color:#fff;text-align: center;font-size: .6rem;font-weight: normal;
          i{font-size: .7rem;font-weight: normal;margin-left: 4px;}
        }
      }
    }
  }
}
</style>

