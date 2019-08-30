<template>
  <div id="nav" class='clear lineheight' :style="$store.state.navbg">
    <router-link :to="{name: 'Portal'}" class='logo fl lineheight'>
      <img src="/static/staticfile/images/headlogo.png" alt="coindy">
    </router-link>
    <ul class='ent fl lineheight'>
      <li v-for="(entlist, index) in headerlist" :key='index' class="fl lineheight">
        <router-link class='featuredcolor lineheight' :to="{name: entlist.url}" v-html="$t(entlist.name)"></router-link>
      </li>
    </ul>
    <div class='fr logsign lineheight'>
      <div class="fl" v-if="users_onoff">
        <!-- <router-link class='featuredcolor lineheight' :to="{name: 'Register'}">{{$t('nav.entrust')}}</router-link> -->
        <router-link class='featuredcolor fl lineheight' :to="{name: 'Assets'}">{{$t('nav.myAssets')}}</router-link>
      </div>
      <div class="fl" v-if="!users_onoff">
        <router-link class='featuredcolor fl lineheight' :to="{name: 'Login'}">{{$t('logSig.login')}}</router-link>
        <router-link class='featuredcolor fl lineheight' :to="{name: 'Register'}">{{$t('logSig.register')}}</router-link>
      </div>
      <div v-if='users_onoff' class="loginUser fl" @mouseover="hoverHeight('navurl')" @mouseout="hideHeight('navurl')">
        <router-link class='featuredcolor fl lineheight' :to="{name: 'Collect'}" >{{username}}
          <ul class="navurl" ref="navurl">
            <li v-for="(s, i) in NavUrl" :key="i" >
              <router-link :to="{name: s.url, params: {title: s.name}}" @click="$store.state.users.menuTitle = s.name" v-html="$t(s.name)" ></router-link>
            </li>
            <li><a href="javascript:;" class='featuredcolor fl lineheight' @click.stop="logout">{{$t('logSig.back')}}</a></li>
          </ul>
        </router-link>
      </div>
      <div class='fl lineheight lang'>
        <p><span>{{$t(langText)}}</span><i class="fa fa-sort-desc" aria-hidden="true"></i></p>
        <ul>
          <li @click.stop="toggleLang ('zh-cn')" class='featuredcolor lineheight'>{{$t('lang.china')}}</li>
          <li @click.stop="toggleLang ('en-us')" class='featuredcolor lineheight'>{{$t('lang.english')}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      langText: 'lang.china',
      username: '',
      users_onoff: false,
      headerlist: [
        //  {
        //    name: 'nav.market',
        //    url: 'Market'
        //  }, {
        //    name: 'nav.transaction',
        //    url: 'Transaction'
        //  },
        {
          name: 'nav.sto',
          url: 'Sto'
        }, {
          name: 'nav.candy',
          url: 'Candy'
        }, {
          name: 'nav.appdownload',
          url: 'Download'
        }, {
          name: 'nav.announcement',
          url: 'Announcement'
        }
      ],
      NavUrl: ''
    }
  },
  created () {
    this.NavUrl = this.$store.state.users.menuList
    if (this.$store.state.users.token || window.localStorage.getItem('token')) {
      this.users_onoff = true
    }
    this.username = window.localStorage.getItem('username')
    var lang = localStorage.getItem('lang') || 'zh-cn'
    if (Object.is(lang, 'zh-cn')) {
      this.langText = 'lang.china'
    } else if (Object.is(lang, 'en-us')) {
      this.langText = 'lang.english'
    }
  },
  methods: {
    toggleLang (lang) {
      this.$store.state.LANG = lang
      localStorage.setItem('lang', lang)
      if (Object.is(this.$store.state.LANG, 'zh-cn')) {
        this.$store.state.SYMBOL = '￥'
      } else {
        this.$store.state.SYMBOL = '$'
      }
      this.$message({
        content: this.$t('common.cutsuccess'),
        type: 'check'
      })
      if (Object.is(lang, 'zh-cn')) {
        this.langText = 'lang.china'
        this.$i18n.locale = this.$store.state.LANG
      } else if (Object.is(lang, 'en-us')) {
        this.langText = 'lang.english'
        this.$i18n.locale = this.$store.state.LANG
      }
    },
    hoverHeight (e) {
      this.$refs[e].style.height = ((this.NavUrl.length + 1) * 40) + 'px'
    },
    hideHeight (e) {
      this.$refs[e].style.height = '0px'
    },
    logout () {
      this.axios.logout()
      this.$message({
        content: this.$t('common.logout'),
        type: 'check'
      })
      this.$router.push({ name: 'Portal'})
      this.users_onoff = false
    }
  },
  computed: {
    inlogin () {
      return this.$store.state.users.token
    },
    setusername () {
      return this.$store.state.users.username
    },
    lang () {
      return this.$store.state.LANG
    }
  },
  watch: {
    inlogin (n, o) {

      n? this.users_onoff = true : this.users_onoff = false
      this.username =  window.localStorage.getItem('username') || this.$store.state.users.username
    },
    setusername (n, o) {
      this.username = window.localStorage.getItem('username')
    },
    lang () {
      if (Object.is(this.$store.state.LANG, 'zh-cn')) {
        this.$store.state.SYMBOL = '￥'
      } else {
        this.$store.state.SYMBOL = '$'
      }
      this.$i18n.locale = this.$store.state.LANG
    }
  }
}
</script>
<style lang="less" scoped>
  .lineheight{height:74px;line-height:74px;}
  #nav{width:100%;min-width: 1400px;height:74px;line-height:74px;
    .loginUser{position:relative;
      &:hover{
        ul.navurl{
          transition: .3s;
        }
      }
      ul.navurl{position: absolute;top:74px;left:50%;width:150px;transform: translateX(-50%);
        box-shadow: 0px 6px 21px 0px rgba(27, 31, 68, 0.13);transition: box-shadow .2s;
        background: #fff;height:0;transition: .3s;overflow: hidden;border-radius:0 0 2px 2px;
        li{height:40px;line-height:40px;color:#000;font-size:14px;text-align:center;
          a{margin:0;height:40px;line-height:40px;color:#000;font-size:14px;text-align:center;border-bottom:1px solid #fdfdfd;box-sizing: border-box;width:100%;white-space: nowrap;padding:0;
            &:last-child{border:none;}
          }
          &:hover{
            background:#eaf2fc;
            a{color:#357ce1;font-size:14px;}
          }
        }
      }
    }
    li{cursor: pointer;
      &:hover{
        a{color:#357ce1;}
      }
      a{display: block;height:100%;padding:0 24px;}
    }
    .logo{width:123px;height:37px;margin:18px 60px 0 80px;
        img{width:100%;height:100%;display: block;margin:0 auto;}
      }
    .ent{color:#9eb5ca;font-size:0;height: 74px;line-height:74px;
      li{font-size:16px;
      }
    }
    .logsign{margin-right:80px;font-size:0;
      a{margin:0 20px;display: inline-block;
        &:hover{color:#357ce1;}
      }
      .lang{margin-left:20px;width:100px;
        &:hover ul{height:80px;transition: .2s;box-shadow: 0px 6px 21px 0px rgba(27, 31, 68, 0.13);transition:.2s}
        p{height:74px;color:#9eb5ca;font-size:16px;line-height: 74px;cursor: pointer;align-items:center;display:flex;justify-content: center;
          i{line-height:74px;margin-top:-6px;margin-left:4px;}
        }
        ul{height: 0px;text-align:center;overflow: hidden;transition:.2s;background:#fff;border-radius: 0 0 2px 2px;color:#000;
          li{cursor: pointer;height:40px;line-height:40px;font-size:14px;color:#000;
            &:hover{
              background:#eaf2fc;color:#357ce1;font-size:14px;
            }
          }
        }
      }
    }

  }
</style>
