<template>
    <div class='downpage'>
      <div class="banner">
        <h1>{{$t('downloadPage.page.c')}}</h1>
        <p>{{$t('downloadPage.page.p')}}</p>
        <banner type="appdownload-h5" :content="false" :image="true" @contentData="bannerCenter"></banner>
        <div class='wrapcontent'>
            <span v-html="bannerText.content" :style="$store.state.LANG !== 'zh-cn' ? 'margin-top:45px' : ''"></span>
          <div class='downbox'>
            <div class='qrbox'>
              <section id="ImgQr"></section>
              <p v-html="$t('downloadPage.page.q')"></p>
            </div>
            <div class='btnbox'>
              <router-link :to="{name: 'MobileIosDown'}">
                <i class="fa fa-apple"></i>
                {{$t('downloadPage.page.i')}}
              </router-link>
              <a :href="googleUrl" target="_blank">
                <i class="fa fa-android"></i>
                {{$t('downloadPage.page.a')}}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <ul>
          <li>
            <img src="/static/staticfile/images/iosapp/precise.png" alt="">
            <p style="margin-top:-40px;">
              <strong v-html="$t('downloadPage.page.h')"></strong>
              <span v-html="$t('downloadPage.page.f')"></span>
            </p>
          </li>
          <li class='txtleft'>
            <p>
              <strong v-html="$t('downloadPage.page.qu')"></strong>
              <span v-html="$t('downloadPage.page.t')"></span>
            </p>
            <img src="/static/staticfile/images/iosapp/high.png" alt="">
          </li>
          <li>
            <img src="/static/staticfile/images/iosapp/safety.png" alt="">
            <p>
              <strong v-html="$t('downloadPage.page.fu')"></strong>
              <span v-html="$t('downloadPage.page.ad')"></span>
              <span v-html="$t('downloadPage.page.co')"></span>
            </p>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('footer.product.list.down.name') + this.$t('seo.title'),
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
      ImgQr: '',
      googleUrl: '',
      bannerText: ''
    }
  },
  created () {
    this.$nextTick(() => {
      this.$QRCodeSC({
        obj:'ImgQr',
        w: 120,
        h: 120,
        url: `https://${document.domain}/mobile/down`
      })
    })
    this.axios.axiosget({
      url: '/app/nextAppVersion',
      mess: '2',
      headers: {
        'x-user-device-os': 'android'
      }
    }).then((ret) => {
      if (ret.data.code == 0) {
        this.googleUrl = 'https://play.google.com/store/apps/details?id=com.coindy.app'
      } else {
        if (ret.data.data == '') {
          this.$message({
            content: ret.data.msg
          })
          this.googleUrl = 'https://play.google.com/store/apps/details?id=com.coindy.app'
        }
        this.googleUrl = ret.data.data
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    bannerCenter (d) {
      if (d.length >= 2) {
        return
      }
      this.bannerText = {
        content: d.content[0].content,
        description: d.content[0].description
      }
    }
  },
  computed: {
    MOBILE () {
      return this.$store.state.MOBILE
    },
    DOMwidth () {
      return this.$store.state.BOMwidth
    }
  },
  watch: {
    MOBILE (n, o) {
      if (n === 'web') {
        this.$router.push({name: 'Download'})
      } else {
        this.$router.push({name: 'MobileDown'})
      }
    },
    DOMwidth (n, o) {
      if (this.$store.state.MOBILE === 'web') {
        this.$router.push({name: 'Download'})
      } else {
        this.$router.push({name: 'MobileDown'})
      }
    }
  }
}
</script>
<style lang="less" scoped>
.downpage{background: #fff;
    // .downpage .banner p{height:130px;}
    & /deep/ #banner{height:auto!important;
      section{
        p.content{margin-top:35rem;color:#000;font-size:24px;text-align: center;}
      }
    }
  .banner{position: relative;background-repeat:  no-repeat;background-position: 50%;
    .wrapcontent{width:100%;margin: 0 auto;}
    h1{height:100px;text-indent: -99999px;position:absolute;}
    p{height:90px;text-indent: -99999px;position:absolute;}
    span{display: block;height:30px;color:#000;text-align: center;margin-top: 34px;font-size: 17px;
      & /deep/ i{display: inline-block;background: url(/static/staticfile/images/iosapp/titleiconen.png) no-repeat 50%/27px;width: 27px;height: 27px;}
    }
    .downbox{display: flex;margin-top: 40px;height:134px;justify-content: center;
      & /deep/ img{width:120px;padding:6px;background: #fff;height:120px;margin-right: 60px;margin-left: 16px;border-radius:2px;}
      .btnbox{display: flex;flex-flow: column;
        a{display: block;width:137px;height:41px;border-radius: 41px;background: #ededed;color:#010101;font-size: 16px;line-height: 41px;font-weight: 500;text-align:center;
          i{font-size: 20px;font-weight: normal;}
          &:first-child{margin-bottom:50px;}
        }
      }
    }
  }
  .content{width:100%;padding:20px 0;margin: 0 auto;
    ul{background: url(/static/staticfile/images/iosapp/downbg.png) no-repeat 40% 36%;overflow: hidden;
      li{display: flex;justify-content: space-around;align-items: center;margin-bottom: 135px;}
      p{width:350px;text-align: left;margin-top:40px;
        strong{display: block;font-size: 28px;color:#212121;margin-bottom: 18px;}
        span{display: block;color:#666666;font-size: 16px;line-height: 1.7;}
      }
    }
  }
}
@media all and (max-width:1100px){
  body{min-width: auto;
    .downpage {
      & /deep/ #banner{
        section{
          p.content{margin-top:70rem;font-size:18px;}
        }
      }
      .content{width:100%;
        ul{background:none!important;padding-inline-start:0;
          li{flex-flow: column;margin-bottom:100px;
            p{margin-top:40px!important;text-align: center;}
            &.txtleft{
              p{order:1;}
              img{order:0;}
            }
          }
        }
      }
    }
  }
}

@media all and (max-width:750px) {
  .downpage{
    & /deep/ #banner{
      section{
        p.content{margin-top:34rem!important;font-size:18px;}
      }
    }
    .content{width:100%;
      ul li img{width:70%;display: block;}
    }
    .banner{background: none!important;height:auto!important;
      img.h5{display: block!important;width:100%;margin:0 auto;height:auto;}
      .wrapcontent{margin-bottom:40px;}
      span{font-size:24px;color:#313131;text-align: center;padding:20px;margin:40px 0;height:auto;line-height:1.7;}

      .downbox{height:auto!important;
        .qrbox{display:none;}
        .btnbox{flex-flow:row;width:100%;justify-content: space-around;flex-wrap:wrap;
          a{width:200px;height:50px;line-height:50px;font-size:24px;background:#ededed;flex-shrink: 0;
            i{font-size:28px;}
          }
        }
      }
    }
  }
}
</style>

