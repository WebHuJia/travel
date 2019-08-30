<template>
  <div id="code">
    <section v-if="!loadingonoff">
      <i v-if="!not" class="fa fa-times" @click.stop="popshow = !popshow" aria-hidden="true"></i>
      <h4 v-if="!not">{{$t('placeholder.code')}}</h4>
      <div>
        <label v-if="googleonoff && !tab">{{$t('find.googlecode')}}</label>
        <verification @vercode="vercode" v-if="googleonoff && !tab"></verification>
        <my-verify @verifyResult="verifyResult" v-if="mobile && tab"></my-verify>
        <verificationcode
          v-if="mobile && tab"
          :account_type="this.$store.state.users.mobile ? 'mobile' : 'email'"
          :nc_csessionid="nc_csessionid"
          :nc_sig="nc_sig"
          :nc_token="nc_token"
          :nc_scene="nc_scene"
          :regisertype="this.$store.state.users.mobile ? true : false"
          @verificationCode="verificationCode"
          :username="this.$store.state.users.username"
          :intersmsiso="this.$store.state.users.intersmsiso"
        ></verificationcode>
        <a href="javascript:;" v-if="!sole" @click.stop="tabgomo" v-html="$t(txt)"></a>
      </div>
      <button v-if="!not" @click.stop="verify" class="btnhover">{{$t('common.verify')}}</button>
    </section>
    <loadingcenter v-else />
  </div>
</template>
<script>
export default {
  props: {
    not: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      verification_code: "",
      tab: false,
      popshow: true,
      loadingonoff: true,
      mobile: false,
      googleonoff: null,
      sole: true,
      txt: "mobile.usemobilecode",
      intersmsiso: "",
      username: "",
      regisertype: "",
      type: "",
      account_type: "",
      success: false,
      nc_csessionid: "",
      nc_sig: "",
      nc_token: "",
      nc_scene: "",
      google_code: "",
      check_type: 1
    };
  },
  created() {
    this.axios
      .axiosget({
        url: "/user/accountInfo"
      })
      .then(ret => {
        this.loadingonoff = false;
        if (ret.data.code == 1) {
          localStorage.setItem("mobile", ret.data.data.mobile);
          localStorage.setItem("user_email", ret.data.data.email);
          localStorage.setItem("uid", ret.data.data.uid);
          localStorage.setItem("intersmsiso", ret.data.data.intersmsiso);
          this.$store.state.users.intersmsiso = ret.data.data.intersmsiso;
          localStorage.setItem("ga", ret.data.data.ga);
          this.googleonoff = ret.data.data.ga;
          this.mobile = ret.data.data.mobile != "" ? true : false;
          this.sole = true;
          if (ret.data.data.mobile && ret.data.data.ga) {
            this.sole = false;
            this.check_type = 2;
          }
          if (ret.data.data.mobile && !ret.data.data.ga) {
            this.tab = true;
            this.check_type = 1;
          }
          if (!ret.data.data.mobile && ret.data.data.ga) {
            this.check_type = 2;
            this.tab = false;
          }
          if (!ret.data.data.ga && !ret.data.data.mobile) {
            this.$message({
              content: this.$t("common.phoneandga")
            });
            this.$router.push({ name: "AccountSecurity" });
            return;
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    vercode(d) {
      this.google_code = d.vercode;
      this.$emit("googlecode", { code: this.google_code });
    },
    tabgomo(d) {
      this.tab = !this.tab;
      if (this.tab) {
        this.check_type = 1;
      } else {
        this.check_type = 2;
      }
      console.log(this.check_type);
      this.verification_code = "";

      this.tab
        ? (this.txt = "find.usegooglecode")
        : (this.txt = "mobile.usemobilecode");
    },
    verifyResult(d) {
      this.nc_csessionid = d.nc_csessionid;
      this.nc_sig = d.nc_sig;
      this.nc_token = d.nc_token;
      this.nc_scene = d.nc_scene;
    },
    verificationCode(d) {
      this.verification_code = d.verification_code;
      this.$emit("verificationCode", { code: this.verification_code });
    },
    verify() {
      if (this.tab && !this.$store.state.nc_csessionid) {
        this.$message({
          content: this.$t("common.nct")
        });
        return;
      }
      var sendurl = "/checkVerificationCode";
      var senddata = null;
      if (this.tab) {
        senddata = {
          username: this.$store.state.users.username,
          intersmsiso: this.$store.state.users.intersmsiso,
          account_type: this.$store.state.users.mobile ? "mobile" : "email",
          check_type: this.check_type,
          verification_code: this.verification_code
        };
      } else {
        senddata = {
          username: this.$store.state.users.username,
          intersmsiso: this.$store.state.users.intersmsiso,
          account_type: this.$store.state.users.mobile ? "mobile" : "email",
          check_type: this.check_type,
          google_code: this.google_code
        };
      }
      this.axios
        .axiospost({
          url: sendurl,
          data: senddata
        })
        .then(ret => {
          if (ret.data.code == 1) {
            this.success = true;
          } else {
            this.success = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  watch: {
    popshow() {
      this.$emit("popshowonoff", { popshow: this.popshow });
    },
    success(n, o) {
      this.$emit("success", {
        success: this.success,
        nc_csessionid: this.$store.state.nc_csessionid,
        nc_sig: this.nc_sig,
        nc_token: this.nc_token,
        nc_scene: this.nc_scene
      });
    },
    verification_code() {
      this.$emit("verificationCode", { code: this.verification_code });
    },
    google_code() {
      this.$emit("googlecode", { code: this.google_code });
    }
  }
};
</script>
<style lang="less" scoped>
#code {
  width: 466px;
  height: 320px;
  text-align: center;
  padding: 50px;
  & /deep/ #verify {
    margin: -30px 0 30px;
    label {
      text-align: left;
    }
    #nc-verify {
      width: 100%;
      .nc_wrapper {
        width: 100%;
      }
      .errloading {
        width: 100%;
      }
    }
  }
  & /deep/ #verificationcode {
    label {
      text-align: left;
    }
  }
  i.fa.fa-times {
    font-weight: 200;
    font-size: 20px;
    position: absolute;
    top: 24px;
    right: 24px;
    cursor: pointer;
    color: #bbbcbc;
  }
  background-color: rgb(255, 255, 255);
  box-shadow: -6.364px 6.364px 36px 0px rgba(31, 30, 77, 0.2);
  label {
    text-align: left;
    display: block;
    width: 100%;
    margin: 0 auto 20px;
  }
  h4 {
    color: #222c38;
    font-size: 26px;
    font-weight: 400;
    line-height: 100%;
    margin-bottom: 60px;
  }
  button {
    border-radius: 2px;
    background-color: rgb(53, 124, 225);
    width: 460px;
    height: 50px;
    color: #fff;
    font-size: 18px;
    margin-top: 30px;
  }
  a {
    display: block;
    width: 100%;
    text-align: right;
    color: #357ce1;
    font-size: 14px;
    margin-top: 10px;
  }
}
</style>
