<template>
   <main class='iosapp'>
     <banner type="appdownload-pc-ios" :image='false'  ></banner>
    <article>
      <div class='content'>
        <a href="https://itunes.apple.com/us/app/coindy/id1436784207?l=zh&ls=1&mt=8" target="_blank" class='iosstore'>{{$t('downloadPage.ios.g')}}</a>
        <div class='pagetitle'>
          <h3 v-html="$t('downloadPage.ios.h')"></h3>
          <p v-html="$t('downloadPage.ios.i')"></p>
          <p class='warn'><strong v-html="$t('downloadPage.ios.in')"></strong></p>
        </div>
        <table>
          <tr>
            <td>{{$t('downloadPage.ios.a')}}</td>
          </tr>
          <tr v-for="(s, i) in aList" :key=i>
            <td v-html="s"></td>
          </tr>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td>{{$t('downloadPage.ios.an')}}</td>
          </tr>
        </table>
        <!-- <span class='readspan'>如果以上账号失效，请刷新网页重新获取</span> -->
      </div>
      <div class='operation'>
        <h3>{{$t('downloadPage.ios.o')}}</h3>
        <ul>
          <li v-for="(s, i) in iList" :key="i">
            <p v-html="$t('downloadPage.ios.'+s)"></p>
            <img :src="'/static/staticfile/images/iosapp/'+(i+1)+'.png'" alt="">
          </li>
        </ul>
      </div>
    </article>
  </main>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('downloadPage.iostitle') + this.$t('seo.title'),
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
      aList: ['bw679237@icloud.com','m83n2l73@icloud.com','f047pxq6@icloud.com','u53xf4a2@icloud.com','b74821d9@icloud.com','d985lk5f@icloud.com','rx4x9b9z@icloud.com','x22d80d5@icloud.com'],
      iList: ['op', 'c', 'l', 'lo', 's']
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
      console.log(n, o)
      if (n === 'web') {
        this.$router.push({name: 'IosDownload'})
      } else {
        this.$router.push({name: 'MobileIosDown'})
      }
    },
    DOMwidth (n, o) {
      if (this.$store.state.MOBILE === 'web') {
        this.$router.push({name: 'IosDownload'})
      } else {
        this.$router.push({name: 'MobileIosDown'})
      }
    }
  }
}
</script>
<style lang="less" scoped>
.block{display: block;}
.pohide{position: absolute;top:0;left:0;}
::-webkit-scrollbar{display: none;}
.texthide{text-indent: -999999px;}
.iosapp{text-align: center;margin-top:74px;
  p{line-height: 1.7;}
  a{margin:50px auto;}
  .focus{max-width: 1000px;margin:0 auto;
    div{display: flex;justify-content: center;}
  }
  .banner {
    img{display: block;width:100%;height:auto;
      &.mobileTag{margin: 0 auto;}
    }
  }
  h3{color:#212121;font-size: 30px;}
  p{color:#666666;font-size: 14px;}
  span{color:#212121;font-size: 14px;}
  table{width: 500px;height:auto;background:#f8f8f8;border-radius: 6px;display: block;margin:0 auto;padding:12px 46px;
    tbody{display: block;width:100%;}
    tr{line-height: 100%;color:#212121;font-size: 15px;margin: 21px 0;display: block;width:100%;text-align: left;font-size:0;white-space: nowrap;
      td{display: inline-block;margin-right: 30px;font-size: 15px;white-space: nowrap;height: 1em;line-height: 1em;
        &:first-child{margin-right: 30px;color:#212121;white-space: initial;line-height: 1.7;height:auto;margin:0;}
      }
    }
  }
  a{color: #ffffff;width:243px;height:44px;line-height: 44px;text-align: center;display: block;margin:50px auto;border-radius: 44px;background: #21a0f7;display: none;}
  ul{max-width: 908px;display: flex;flex-wrap:wrap;justify-content:left;margin:0 auto;
    li{flex-shrink: 0;width:50%;margin-bottom: 50px;display:flex;flex-flow:column;height:632px;position:relative;
      img{flex-shrink: 0;display:block;margin:0 auto;position:absolute;bottom:0;left:50%;transform: translateX(-50%)}
      p{color:#212121;font-size: 20px;margin-top: 20px;
        & /deep/ i{display: inline-block;width:19px;height:19px;background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATBAMAAACAfiv/AAAAJFBMVEUAAAAhoPchoPchoPchoPchoPchoPchoPchoPchoPchoPchoPeUs4VtAAAAC3RSTlMAxZAH586BeCAeFYHnQ+UAAABWSURBVAjXY2Bg4Cz03g0EGxgYmLWBNIS5dDeMySwNZzLthjNnI5jZCKY0gumNYO5GFsVUK4AwIQFhbgPctk0McDcIM8BctnUBA8y9ygwgwFHo7VgBpAGto26DvDH2HAAAAABJRU5ErkJggg==') no-repeat;color:#ffffff;font-size: 12px;font-style: normal;line-height: 19px;text-align: center;vertical-align:middle;margin-right: 6px;}
      }
    }
  }
  .readspan{margin:30px auto 40px;display:block;text-align:center;}
  .pagetitle{text-align: center;padding-top:66px;
    h3{line-height: 100%;margin-bottom: 30px;color: #212121;font-size: 30px;}
    p{margin-bottom: 22px;font-size: 14px;color: #666666;
      &.warn{color:#f00;font-size:14px;width:90%;margin:22px auto;}
    }
    span{font-size: 14px;color:#212121;margin-bottom: 30px;}
  }
  .operation{margin-bottom: 110px;
    h3{margin:44px auto;color:#212121;font-size: 30px;font-weight: normal;}
  }
}
</style>
