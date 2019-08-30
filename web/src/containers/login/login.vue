<template>
  <div id="login" class="clear">
    <div class="left">
      <h3>{{$t('login.title')}}</h3>
      <ul class="tab">
        <li
          @click.stop="tabonoff('mobile')"
          :class="{'act': regisertype}"
          v-html="$t('logSig.mobile')"
        ></li>
        <li
          @click.stop="tabonoff('email')"
          :class="{'act': !regisertype}"
          v-html="$t('logSig.email')"
        ></li>
      </ul>
      <ul class="label">
        <li>
          <accout key="login" @accout="accout" :regisertype="regisertype"></accout>
        </li>
        <li>
          <password :isShowPasswordStrong="false" @passwordcode="passwordcode"></password>
        </li>
        <li>
          <my-verify @verifyResult="verifyResult"></my-verify>
        </li>
      </ul>
      <button @click.stop="btnsumlit" class="btnhover" v-html="$t('logSig.login')"></button>
      <router-link :to="{name: 'Find'}" class="lineheight" v-html="$t('login.forgetpassword')"></router-link>
    </div>
    <div class="right fl">
      <!--<p v-html="$t('register.getcody')"></p>-->
      <img :src="$store.state.registerBanner" alt />
      <router-link :to="{name: 'Register'}" class="lineheight" v-html="$t('logSig.freeregister')"></router-link>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo() {
    return {
      title: this.$t("login.title") + this.$t("seo.title"),
      meta: [
        {
          name: "keywords",
          content: this.$t("seo.keywords")
        },
        {
          name: "description",
          content: this.$t("seo.description")
        }
      ]
    };
  },
  data() {
    return {
      regisertype: true,
      intersmsiso: "",
      showintersmsiso: "",
      intersmsisoarr: [],
      username: "",
      password: "",
      strongbg: 0,
      passleng: false,
      strongtext: "",
      nc_csessionid: "",
      strongpwgreg: false,
      nc_sig: "",
      strongpwdonoff: false
    };
  },
  beforeCreate() {
    this.axios
      .axiosget({
        //右侧文案图api
        url: "/portal/banner",
        params: { type: "register-login-pc" }
      })
      .then(ret => {
        this.$store.state.registerBanner = ret.data.data[0].image;
      });
  },
  methods: {
    tabonoff(d) {
      //切换邮箱手机
      this.$store.state.users.error.accout = false;
      this.username = "";
      switch (d) {
        case "mobile":
          this.regisertype = true;
          return;
        case "email":
          this.regisertype = false;
          return;
      }
    },
    passwordcode(d) {
      //密码
      this.password = d.password;
      this.strongpwdonoff = d.strongpwdonoff;
    },
    btnsumlit() {
      //登陆
      var geturl = "/user/emailLogin";
      var getdata = {
        username: this.username,
        password: this.password,
        intersmsiso: this.intersmsiso,
        invite_code: this.invitefrom,
        nc_csessionid: this.nc_csessionid,
        nc_sig: this.nc_sig,
        nc_token: this.nc_token,
        nc_scene: this.nc_scene,
        account_type: this.regisertype ? "mobile" : "email"
      };
      if (this.regisertype) {
        //区分使用不同的登陆接口
        geturl = "/user/mobileLogin";
      } else if (!this.regisertype) {
        geturl = "/user/emailLogin";
      }
      if (!this.$store.state.nc_csessionid) {
        //滑块码如果有异常时
        this.$message({
          content: this.$t("common.nct")
        });
        return;
      }
      if (!this.password) {
        //密码
        this.$message({
          content: this.$t("common.notpassword")
        });
        this.$store.state.users.error.password = true;
        return;
      }
      let reg = null;
      if (this.regisertype) {
        //账号区分正则判断
        if (this.intersmsiso == "86") {
          reg = this.DefaultJs.REG.chinamobilereg;
        } else {
          reg = this.DefaultJs.REG.notchinamobilereg;
        }
        if (!reg.test(this.username)) {
          this.$message({
            content: this.$t("find.mobileerror")
          });
          this.$store.state.users.error.accout = true;
          return;
        }
      } else if (!this.regisertype) {
        reg = this.DefaultJs.REG.emailreg;
        if (!reg.test(this.username)) {
          this.$message({
            content: this.$t("find.emailerror")
          });
          this.$store.state.users.error.accout = true;
          return;
        }
      }
      this.axios
        .axiospost({
          url: geturl,
          data: getdata
        })
        .then(ret => {
          if (ret.data.code == 0) {
            this.$message({
              content: ret.data.msg
            });
            this.$store.state.users.errorText = ret.data.msg;
            return;
          }
          this.$store.state.users.token = ret.data.data.token;
          this.$store.state.users.mobile = ret.data.data.user.mobile;
          this.$store.state.users.user_email = ret.data.data.user.user_email;
          this.$store.state.users.uid = ret.data.data.user.id;
          window.localStorage.setItem("token", ret.data.data.token);
          window.localStorage.setItem(
            "mobile",
            ret.data.data.user.mobile
              ? ret.data.data.user.mobile.substr(0, 3) +
                  "****" +
                  ret.data.data.user.mobile.substr(7)
              : ""
          );
          window.localStorage.setItem(
            "username",
            ret.data.data.user.mobile
              ? "+" +
                  ret.data.data.user.iso_code +
                  " " +
                  (ret.data.data.user.mobile.substr(0, 3) +
                    "****" +
                    ret.data.data.user.mobile.substr(7))
              : ret.data.data.user.user_email.substr(0, 1) +
                  "****" +
                  ret.data.data.user.user_email.substr(5)
          );
          window.localStorage.setItem(
            "intersmsiso",
            ret.data.data.user.iso_code
          );
          window.localStorage.setItem("uid", ret.data.data.user.id);
          window.localStorage.setItem("expire_time", ret.data.data.expire_time);
          window.localStorage.setItem("ga", ret.data.data.ga);
          //进行加密存放
          window.localStorage.setItem(
            "__M_a",
            window.btoa(
              window.btoa(
                window.btoa(
                  ret.data.data.user.mobile.substr(3) +
                    ret.data.data.user.mobile.substr(0, 3)
                )
              )
            )
          );
          this.$store.state.users.encryptionusername = ret.data.data.user.mobile
            ? ret.data.data.user.mobile.substr(0, 3) +
              "****" +
              ret.data.data.user.mobile.substr(7)
            : ret.data.data.user.user_email.substr(0, 1) +
              "****" +
              ret.data.data.user.user_email.substr(5);
          if (ret.data.data.user.user_email !== "") {
            //如果邮箱存在
            window.localStorage.setItem(
              "__W_a",
              window.btoa(
                window.btoa(
                  window.btoa(
                    ret.data.data.user.user_email.substr(3) +
                      ret.data.data.user.user_email.substr(0, 3)
                  )
                )
              )
            );
            window.localStorage.setItem(
              "user_email",
              ret.data.data.user.user_email
                ? ret.data.data.user.user_email.substr(0, 1) +
                    "****" +
                    ret.data.data.user.user_email.substr(5)
                : ""
            );
          }
          this.$store.state.successful = false;
          this.$store.state.nc.reset();
          this.$message({
            content: ret.data.msg,
            type: "check"
          });
          if (!this.$route.query.redirect) {
            //判断是否是从上一级跳转到的登陆页面
            this.$router.push({ name: "Portal" });
            this.$store.state.fullpath.query = {};
          } else {
            if (this.$store.state.fullpath.query) {
              this.$router.push({
                name: this.$route.query.redirect,
                query: this.$store.state.fullpath.query
              });

              this.$store.state.fullpath.query = "";
              return;
            }
            this.$router.push({ name: this.$route.query.redirect });
            this.$store.state.fullpath.query = "";
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    intersmsisoselect(event) {
      //国际码
      this.showintersmsiso = event.currentTarget.innerHTML;
      this.intersmsiso = event.currentTarget.children[0].innerHTML;
    },
    verifyResult(verifyResult) {
      //滑块
      this.nc_csessionid = verifyResult.nc_csessionid;
      this.nc_sig = verifyResult.nc_sig;
      this.nc_token = verifyResult.nc_token;
      this.nc_scene = verifyResult.nc_scene;
    },
    intercode(d) {
      //国际码
      this.intersmsiso = d.intersmsiso;
      this.showintersmsiso = d.showintersmsiso;
    },
    accout(d) {
      //账号
      this.intersmsiso = d.intersmsiso;
      this.username = d.username;
    }
  },
  computed: {
    lang() {
      //切换语言重新请求右侧图
      return this.$store.state.LANG;
    }
  },
  watch: {
    lang() {
      //切换语言重新请求右侧图
      this.axios
        .axiosget({
          url: "/portal/banner",
          params: { type: "register-login-pc" }
        })
        .then(ret => {
          this.$store.state.registerBanner = ret.data.data[0].image;
        });
    }
  }
};
</script>
<style lang="less" scoped>
//  #app > #nav{background-color: rgb(10, 21, 30);}
#login {
  margin: 174px auto;
  width: 1200px;
  position: relative;
  .left {
    width: 550px;
    flex-shrink: 0;
    float: left;
  }
  .right {
    flex-shrink: 0;
    position: absolute;
    top: 0;
    left: 760px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    p {
      margin-top: 170px;
      color: #5a626d;
      font-size: 22px;
      margin-bottom: 30px;
      line-height: 1.3;
    }
    span {
      color: #5a626d;
      font-size: 18px;
      line-height: 1.7;
      display: block;
    }
    a {
      display: block;
      margin-top: 30px;
      width: 100%;
    }
  }
  h3 {
    font-size: 36px;
    color: #222c38;
    margin-bottom: 50px;
  }
  ul.tab {
    color: #5a626d;
    font-size: 16px;
    margin-bottom: 40px;
    display: block;
    overflow: hidden;
    li {
      padding: 0 0 6px;
      margin-right: 70px;
      cursor: pointer;
      display: inline-block;
      &.act {
        color: #357ce1;
        border-bottom: 2px solid #357ce1;
      }
    }
  }
  ul.label {
    margin-bottom: 60px;
    li {
      position: relative;
      width: 550px;
      margin-bottom: 38px;
      label {
        color: #5a626d;
        font-size: 16px;
        display: block;
        margin-bottom: 10px;
      }
      input {
        width: 550px;
        height: 50px;
        border: 1px solid #ddd;
        box-sizing: border-box;
        border-radius: 2px;
        text-indent: 1em;
      }
    }
  }
  button {
    background: #357ce1;
    color: #fff;
    font-size: 18px;
    width: 210px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 2px;
    margin-right: 76px;
  }
}
</style>


