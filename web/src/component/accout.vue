<template>
  <div id="accout">
    <label v-if="regisertype" v-html="$t('logSig.mobile')"></label>
    <label v-if="!regisertype" v-html="$t('logSig.email')"></label>
    <article :class="[{'disabled': disabled}]" class="clear">
      <div id="mobilecode" v-show="regisertype" :class="regisertype ? 'itMobile' : ''">
        <span class='intersmsiso' @mouseleave="hideselect" @click.stop="show = !show" v-html="showintersmsiso"></span><i @click.stop="show = !show" class="fa fa-caret-down fr"></i>
        <ul class='intersmsiso' v-if="show" @mouseenter="showselect" @mouseleave="hideselect">
          <li @click.stop="intersmsisoselect($event)" v-for="(int, index) in intersmsisoarr" :key="index">{{index}} <span>(+<i>{{int}}</i>)</span></li>
        </ul>
      </div>
      <input :class="[regisertype ? '' : 'isEmail',{'errorborder': $store.state.users.error.accout}]" @focus="touchCloseError" :disabled="disabled" type="text" name="username" v-model.trim="username" :placeholder="$t('placeholder.accout')" />
    </article>
  </div>
</template>
<script>
export default {
  props: {
    regisertype:{
      type: Boolean,
      default: true
    },
    accout: {
      type: String,
      default: ''
    },
    iscode: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      intersmsiso: '',
      username: '',
      intersmsisoarr: [],
      showintersmsiso: '',
      show: false,
      isocode: ''
    }
  },
  created () {
    this.username = this.accout
    var _that = this
    this.isocode = this.iscode
    this.axios.axiosget({
      url: '/user/login/intersmsiso'
    }).then((ret) => {//初始化请求国际码
      this.intersmsisoarr = ret.data.data
      if (Object.is(this.$store.state.LANG, 'zh-cn')) {
        var pushdata = {
          '中国': 86
        }
        this.intersmsisoarr = Object.assign(pushdata, this.intersmsisoarr)
      }
      this.$nextTick(() => {//dom节点加载后选择和传入值匹配项
        if (this.isocode) {
          for (var z in this.intersmsisoarr) {
            if (Number(this.intersmsisoarr[z]) == Number(this.isocode)) {

              this.showintersmsiso =  `+${this.intersmsisoarr[z]}`
              this.intersmsiso = this.intersmsisoarr[z]
            }
          }
        }
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    intersmsisoselect (event) {
      this.isocode = ''
      this.showintersmsiso = `+ ${event.currentTarget.children[0].children[0].innerHTML}`
      this.intersmsiso = event.currentTarget.children[0].children[0].innerHTML
      this.show = false
    },
    touchCloseError () {
      this.$store.state.users.error.accout = false
      this.$store.state.users.errorText = ''
    },
    showfun () {
      if (this.disabled) {
        return
      }
      this.show = !this.show
    },
    showselect () {
      if (this.disabled) {
        return
      }
      this.show = true
    },
    hideselect () {
      if (this.disabled) {
        return
      }
      this.show = false
    }
  },
  computed: {
    lang () {
      return this.$store.state.LANG
    },
    errorText () {
      return this.$store.state.users.errorText
    }
  },
  watch: {
    username (n, o) {
      this.$emit('accout', {intersmsiso: this.intersmsiso, username: this.username, regisertype: this.regisertype})
    },
    intersmsisoarr (n, o) {
      if (!this.iscode) {
        if (Object.is(this.$store.state.LANG, 'zh-cn')) {
          this.intersmsiso = '86'
          // this.showintersmsiso = '中国 (+86)'
          this.showintersmsiso = '+86'
          return
        }
        for (var z in n) {
          this.intersmsiso = n[z]
          this.showintersmsiso = `+${n[z]}`
          return
        }
      }
    },
    intersmsiso (n, o) {
      this.$emit('accout', {intersmsiso: this.intersmsiso, username: this.username, regisertype: this.regisertype})
    },
    showintersmsiso (n, o) {
      this.$emit('accout', {intersmsiso: this.intersmsiso, username: this.username, regisertype: this.regisertype})
    },
    regisertype (n, o) {
      this.username = ''
    },
    lang () {
      this.axios.axiosget({
        url: '/user/login/intersmsiso'
      }).then((ret) => {
        this.intersmsisoarr = ret.data.data
        if (Object.is(this.$store.state.LANG, 'zh-cn')) {
          var pushdata = {
            '中国': 86
          }
          this.intersmsisoarr = Object.assign(pushdata, this.intersmsisoarr)
        }
        this.$nextTick(() => {
          if (this.isocode) {
            for (var z in this.intersmsisoarr) {
              if (Number(this.intersmsisoarr[z]) == Number(this.isocode)) {
                this.showintersmsiso =  `+${this.intersmsisoarr[z]}`
                this.intersmsiso = this.intersmsisoarr[z]
              }
            }
          }
        })
      }).catch((error) => {
      console.log(error)
    })
    },
    errorText (n, o) {
      switch (n) {//错误时标红框
        case '此账号不存在': case 'This account does not exist':
          this.$store.state.users.error.accout = true
          break
        default:
          this.$store.state.users.error.accout = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
  #accout{
    label{color:#5a626d;font-size:14px;display: block;margin-bottom:10px;}
    input{width:555px;height:50px;border:1px solid #ddd;box-sizing: border-box;border-radius: 2px;text-indent:1em;display:inline-block;vertical-align: top;float:left;}
    div.itMobile + input{border-radius:0 2px 2px 0;width:440px;}
    article{display: flex;
      input{font-size:14px;}
    }
  }
  i.fa-caret-down{position: absolute;top: 50%;right: 24px;transform: translateY(-50%);cursor: pointer;}
  #mobilecode{width:110px;float:left;box-sizing:border-box;vertical-align: top;position: relative;font-size:14px;
    span.intersmsiso{display: block;width:110px;height:50px;box-sizing: border-box;border: 1px solid #d7d7d7;line-height:50px;white-space: nowrap;overflow:hidden;border-radius: 2px 0 0 2px;border-right:none;cursor: pointer;text-indent:1em;font-size:14px;}
    ul.intersmsiso{z-index: 123;border-width: 1px;border-color: rgb(215, 215, 215);border-style: solid;background-color: rgb(252, 253, 253);box-shadow: 0px 8px 16px 0px rgba(31, 30, 77, 0.09);box-sizing: border-box;
      position:absolute;top:50px;left:0;background:#fff;color:#caccd1;font-size: 14px;
      width:550px;height:400px;overflow: auto;border:1px solid #ddd;
      &::-webkit-scrollbar{width: 9px;}
      &::-webkit-scrollbar-thumb{background-color: rgb(223, 225, 233);border-radius: 9px;width:9px;}
      li{font-size:14px;line-height:1.5;width:100%;background:#fff;border-bottom:1px solid #ddd;height:50px;line-height:49px;box-sizing:border-box;margin-bottom:0;padding:0 22px;display:flex;justify-content:space-between;cursor: pointer;
        &:hover{background:#f4f5f6;color:#5a626d;}
        span{line-height:49px;}
      }
    }
  }
</style>

