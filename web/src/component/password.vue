<template>
  <div id="password">
    <label v-if="titleOnoff" v-html="$t('login.password')"></label>
    <div class='strongpwgreg' v-if="strongpwgreg && isShowPasswordStrong">
      <section class='testpassbg'>
        <input :class="{'act': passleng, 'actcolor': strongbg >=1 }" type="text" disabled>
        <input :class="{'act': strongbg>=1, 'actcolor': strongbg >=1 }" type="text" disabled>
        <input :class="{'act': strongbg>=2, 'actcolor': strongbg >=1 }" type="text" disabled>
        <input :value="$t(strongtext)" :class="{'actcolor': strongbg >=1}" class="strongtext" type="text" disabled>
      </section>
      <span>
        <button class="testpassstrong" :class="{'act': passleng}" type="text" disabled><i class="fa fa-check-circle" v-if="passleng"></i><i class="fa fa-exclamation-circle" v-if="!passleng"></i>6-32 {{$t('common.length')}}</button>
        <button class="testpassstrong" :class="{'act': strongbg >= 1}"  type="text" disabled><i class="fa fa-check-circle" v-if="strongbg >= 1"></i><i class="fa fa-exclamation-circle" v-if="!strongbg >= 1"></i>{{$t('password.showText')}}</button>
      </span>
    </div>
    <input :placeholder="$t('placeholder.password')" :class="[{'errorborder': $store.state.users.error.password}]" type="password" @focus="touchCloseError($event),strongpwgreg = true,strongpasschange" @blur="hidestrongpwgreg" @keyup="strongpwgreg = true, strongpasschange"  name="password" v-model.trim="password">
  </div>
</template>
<script>
export default {
  props: {
    titleOnoff: {
      type: Boolean,
      default: true
    },
    isShowPasswordStrong: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      password: '',
      strongpwgreg: false,
      passleng: false,
      strongbg: 0,
      strongtext: '',
      strongpwdonoff: false
    }
  },
  methods: {
    hidestrongpwgreg() {
      this.strongpwgreg = false
    },
    touchCloseError () {

      this.$store.state.users.error.password = false
      this.$store.state.users.errorText = ''
    },
    strongpasschange() {
      if (this.isShowPasswordStrong) {
        let pass = this.password

        if (pass.length == 0) {
          this.strongpwgreg = false
          this.strongpwdonoff = false
          this.passleng = false
        }
        if (pass.length < 6) {
          this.passleng = false
          this.strongbg = 0
          this.strongtext = ''
          this.strongpwgreg = true
          this.strongpwdonoff = false
        }
        if (pass.length >= 6 && pass.length < 33) {
          this.passleng = true
          this.strongtext = 'common.passwordStrong.weak'
          this.strongpwdonoff = false
        }
        if (!this.DefaultJs.REG.numreg.test(pass) && pass.length >= 6 && this.DefaultJs.REG.pawreg.test(pass) && !this.DefaultJs.REG.strongpawreg.test(pass)) {
          this.strongbg = 1
          this.strongtext = 'common.passwordStrong.in'
          this.strongpwdonoff = true
        }
        if (!this.DefaultJs.REG.numreg.test(pass) && pass.length >= 8 && this.DefaultJs.REG.pawreg.test(pass) && this.DefaultJs.REG.strongpawreg.test(pass)) {
          this.strongbg = 2
          this.strongtext = 'common.passwordStrong.strong'
          this.strongpwdonoff = true
        }
        if (pass.length >= 34) {
          this.strongtext = 'common.passwordStrong.max'
          this.strongpwdonoff = false
        }
      }
    },
  },
  computed: {
    errorText () {
      return this.$store.state.users.errorText
    }
  },
  watch: {
    password () {
      this.strongpasschange()
      this.$emit('passwordcode',{password:this.password,strongpwdonoff:this.strongpwdonoff})
    },
    errorText (n) {
      switch (n) {
        case '密码强度不符合': case 'The password is not strong enough': case '密码不能为空': case 'The password cannot be empty': case '密码不能小于6个字符': case 'Password can not be less than 6 characters': case '密码错误': case 'Incorrect password':
          this.$store.state.users.error.password = true
        break
        default:
          this.$store.state.users.error.password = false
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
  #password{position:relative;width:550px;margin-bottom:38px;
    label{color:#5a626d;font-size:14px;display: block;margin-bottom:10px;
    }
    div.strongpwgreg{position:absolute;bottom:58px;left:0;width:auto;height:90px;border-radius: 6px;background: #f2f3f8;padding:20px 20px 0;z-index: 13;font-size:16px;  box-shadow: 0px 2px 13px 0px rgba(31, 30, 77, 0.16);
      &:after{    width:0; height:0; position: absolute;bottom:-8px;left:20px;border-left:9px solid transparent;border-right:9px solid transparent;border-top:9px solid #f2f3f8;display: block;content: '';}
      section.testpassbg{display: flex;width:auto;height:14px;margin-bottom:14px;
        input{width:36px;height:18px;background:#d7d7d7;margin-right:14px;font-size:14px;
          &.strongtext{background: transparent;font-size:14px;color:#ff3218;border:none;height:1.1em;width:114px;margin:0;text-indent: 0;
            &.actcolor{color:#3ed786;}
          }
          &.act{background:#ff3218;border-color:#ff3218;
            &.actcolor{background:#3ed786;border-color:#3ed786;}
            }
        }
      }
      span{
        button{margin-bottom: 14px;display: block;font-size:14px;
          &:disabled{background:transparent;}
          i{margin-right:6px;}
          i.fa-check-circle{color:#3ed786;}
          i.fa-exclamation-circle{color:#ff4022;}
        }
      }
    }
    input{width:550px;height:50px;border:1px solid #ddd;box-sizing: border-box;border-radius: 2px;text-indent:1em;
      &.testpassstrong{width:auto;height:auto;background:transparent;border:none;
        &.act{color:red;}
      }
    }
  }
</style>


