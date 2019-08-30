<template>
  <div id="downpage">
    <div class="wrap clear">
      <em class="icon left"></em>
      <div class="qr_btn">
        <h3 v-html="imgD.title || $t('downloadPage.title')"></h3>
        <span v-html="imgD.content || $t('downloadPage.content')"></span>
        <div>
          <section id="HomeImgQr" ref="HomeImgQr"></section>
          <p>
            <router-link :to="{name: 'IosDownload'}">
              <i class="fa fa-apple" aria-hidden="true"></i>iPhone
            </router-link>
            <a :href="googleUrl" target="_blank">
              <i class="fa fa-android" aria-hidden="true"></i>Android
            </a>
          </p>
        </div>
      </div>
      <img class="fr" :src="imgD.image || $t('downloadPage.imagesUrl')" alt />
      <em class="icon right"></em>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      googleUrl: "",
      imgD: {}
    };
  },
  created() {
    this.$nextTick(() => {
      this.$QRCodeSC({
        obj: "HomeImgQr",
        w: 80,
        h: 80,
        url: `${document.location.protocol}//${document.domain}/mobile/download?lang=${this.$store.state.LANG}`
      });
    });
    this.axios
      .axiosget({
        url: "/app/nextAppVersion",
        mess: "2",
        headers: {
          "x-user-device-os": "android"
        }
      })
      .then(ret => {
        if (ret.data.code == 0) {
          this.googleUrl =
            "https://play.google.com/store/apps/details?id=com.coindy.app";
          return;
        } else {
          if (ret.data.data == "") {
            this.$message({
              content: ret.data.msg
            });
            this.googleUrl =
              "https://play.google.com/store/apps/details?id=com.coindy.app";
            return false;
          }
          this.googleUrl = ret.data.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.bannerHttp();
  },
  methods: {
    bannerHttp() {
      this.axios
        .axiosget({
          url: "/portal/banner",
          params: { type: "home-pc-appdownload" }
        })
        .then(ret => {
          if (ret.data.data.length >= 2) {
            return;
          }
          this.imgD = ret.data.data[0];
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    lang() {
      return this.$store.state.LANG;
    }
  },
  watch: {
    lang() {
      this.bannerHttp();
      this.$refs.HomeImgQr.innerHTML = "";
      this.$QRCodeSC({
        obj: "HomeImgQr",
        w: 80,
        h: 80,
        url: `${document.location.protocol}//${document.domain}/mobile/download?lang=${this.$store.state.LANG}`
      });
    }
  }
};
</script>
<style lang="less" scoped>
#downpage {
  height: 490px;
  padding-top: 60px;
  width: 100%;
  background: #152940;
  overflow: hidden;
  .wrap {
    position: relative;
    em.icon {
      width: 62px;
      height: 62px;
      background: url("/static/staticfile/images/homedownicon.png") no-repeat;
      position: absolute;
      &.left {
        left: -130px;
        top: 70px;
      }
      &.right {
        top: 70px;
        right: -160px;
      }
    }
    .qr_btn {
      float: left;
      margin-top: 80px;
      max-width: 520px;
      margin-left: 84px;
      h3 {
        color: #ffffff;
        font-size: 38px;
      }
      span {
        color: #9eb5ca;
        font-size: 16px;
        line-height: 1.75;
        margin-top: 26px;
        display: block;
      }
      div {
        width: 328px;
        margin-top: 54px;
        text-align: center;
        display: block;
        section {
          display: inline-block;
        }
        & /deep/ img {
          vertical-align: top;
          width: 116px;
          height: 116px;
          background: #fff;
          border-radius: 6px;
          padding: 12px;
          flex-shrink: 0;
          margin-right: 32px;
          display: inline-block;
        }
        p {
          vertical-align: top;
          display: inline-block;
          width: 150px;
          height: 116px;
          a {
            width: 147px;
            height: 50px;
            display: block;
            color: #152940;
            font-size: 20px;
            background: #fff;
            border-radius: 50px;
            line-height: 50px;
            font-size: 20px;
            flex-shrink: 0;
            text-align: left;
            text-indent: 24px;
            margin-bottom: 38px;
            &:hover {
              color: #357ce1;
              i.fa {
                color: #357ce1;
              }
            }
            i.fa {
              color: #152940;
              margin-right: 10px;
              display: inline;
            }
          }
        }
      }
    }
    img.fr {
      flex-shrink: 0;
      margin-right: 30px;
    }
  }
}
</style>
