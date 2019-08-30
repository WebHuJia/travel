<template>
    <div class='downpage'>
      <div class="downpagebanner">
        <banner :content="false" type="appdownload-pc" @contentData="bannerCenter" ></banner>
        <article>
          <h1>{{$t('downloadPage.page.c')}}</h1>
          <p>{{$t('downloadPage.page.p')}}</p>
          <img :src="$t('downloadPage.url')" class='h5' style="display: none" alt="">
          <div class='wrapcontent'>
            <span v-html="bannerText.content" :style="$store.state.LANG !== 'zh-cn' ? 'margin-top:45px' : ''"></span>
            <div class='downbox'>
              <div class='qrbox'>
                <section id="ImgQr" ref="ImgQr"></section>
                <p v-html="$t('downloadPage.page.q')"></p>
              </div>
              <div class='btnbox'>
                <router-link  :to="{name: 'IosDownload'}">
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
        </article>
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
      bannerText: {}
    }
  },
  created () {
    console.log(this.$store.state.MOBILE)
    if (this.$store.state.MOBILE === 'web') {
      this.$router.push({name: 'Download'})
    } else {
      this.$router.push({name: 'MobileDown'})
    }
    this.$nextTick(() => {
      this.$QRCodeSC({
        obj:'ImgQr',
        w: 120,
        h: 120,
        url: `${document.location.protocol}//${document.domain}/mobile/download?lang=${this.$store.state.LANG}`
      })
    })
    function getBlob(url) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(xhr.response);
          }
        };

        xhr.send();
      });
    }
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
    lang () {
      return this.$store.state.LANG
    }
  },
  watch: {
    MOBILE (n, o) {
      console.log(n)
      if (n === 'web') {
        this.$router.push({name: 'Download'})
      } else {
        this.$router.push({name: 'MobileDown'})
      }
    },
    lang () {
      this.$refs.ImgQr.innerHTML = ''
      this.$QRCodeSC({
        obj:'ImgQr',
        w: 120,
        h: 120,
        url: `${document.location.protocol}//${document.domain}/mobile/download?lang=${this.$store.state.LANG}`
      })
    }
  }
}
</script>
<style lang="less" scoped>
.downpage{margin-top:74px;
    // .downpage .banner p{height:130px;}
  .downpagebanner{position: relative;background-repeat:  no-repeat;background-position: 50%;height: 671px;
    .wrapcontent{max-width:965px;width:auto;margin: 0 auto;}
    h1{height:100px;text-indent: -99999px}
    p{height:90px;text-indent: -99999px}
    span{display: block;height:30px;color:#fff;text-align: left;margin-top: 34px;font-size: 17px;
      & /deep/ i{display: inline-block;background: url(/static/staticfile/images/iosapp/titleiconen.png) no-repeat 50%/27px;width: 27px;height: 27px;}
    }
    article{position:absolute;top:0;left:0;width:100%;height:100%;}
  }
  .downbox{display: flex;margin-top: 40px;height:134px;
    #ImgQr{width:120px;padding:6px;margin-right: 60px;margin-left: 16px;}
    & /deep/ img{width:120px;padding:6px;background: #fff;height:120px;margin-right: 60px;margin-left: 16px;border-radius:2px;}
    .btnbox{display: flex;flex-flow: column;
      a{display: block;width:137px;height:41px;border-radius: 41px;background: #fff;color:#010101;font-size: 16px;line-height: 41px;font-weight: 500;text-align:center;
        &:hover{color:#357ce1;}
        i{font-size: 20px;}
        &:first-child{margin-bottom:50px;}
      }
    }
  }
  .content{width:1200px;margin:20px auto;
    ul{background: url(/static/staticfile/images/iosapp/downbg.png) no-repeat 40% 36%;overflow: hidden;
      li{display: flex;justify-content: space-around;align-items: center;margin-bottom: 135px;}
      p{width:350px;text-align: left;margin-top:40px;
        strong{display: block;font-size: 28px;color:#212121;margin-bottom: 18px;}
        span{display: block;color:#666666;font-size: 16px;line-height: 1.7;}
      }
    }
  }
}

</style>
