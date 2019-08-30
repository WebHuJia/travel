<template>
  <div id="accountsecurity">
    <div v-for="(l, index) in datalist" :key='index' :id="l.type">
      <h3 v-html="$t(l.title)"></h3>
      <ul>
        <li v-for="(s, z) in l.lists" :class="s.type" :key="z">
          <span v-html="$t(s.name)"></span>
          <p v-if="s.type != 'securityLevel'" :class="{'not': !s.value.bool}" v-html="s.value.bool? $t(s.value.value) :$t('userCenter.notbind')"></p>
          <p v-if="s.type == 'securityLevel' && securityLevelnum == 1" v-html='$t(s.value.value1)'></p>
          <p v-if="s.type == 'securityLevel' && securityLevelnum == 2" v-html='$t(s.value.value2)'></p>
          <p v-if="s.type == 'securityLevel' && securityLevelnum == 3" v-html='$t(s.value.value3)'></p>
          <!-- <a v-if="!s.revisability.fixation" @click.stop="notunbind(s)" href="javascript:;" :class="{'se': s.revisability.type}">{{s.revisability.value}}</a> -->
          <router-link v-if="s.revisability.passwordonoff" :to="{name: s.revisability.url, params: {
            'ga': ga,
            'account': s.value.value,
            'intersmsiso': intersmsiso,
            'type': s.revisability.type
          }}" class='se'>{{$t(s.revisability.value)}}</router-link>
          <a v-if="s.revisability.fixation"></a>
          <a v-if="!unbind && s.revisability.bool && !s.revisability.passwordonoff && !s.revisability.googleonoff">{{$t('userCenter.unbind')}}</a>
          <router-link v-if="!s.revisability.googleonoff && unbind && !s.revisability.fixation && !s.revisability.passwordonoff && s.revisability.bool" class="se"
          :to="{name: s.revisability.url, params: {
            'ga': ga,
            'account': s.value.value,
            'intersmsiso': intersmsiso,
            'type': s.revisability.type
          }}"
          >{{$t('userCenter.unbind')}}</router-link>
          <router-link v-if="!unbind && !s.revisability.fixation && !s.revisability.passwordonoff && !s.revisability.bool" class="se"
          :to="{name: s.revisability.url, params: {
            'ga': ga,
            'account': s.value.value,
            'intersmsiso': intersmsiso,
            'type': s.revisability.type
          }}"
          >{{$t('userCenter.bind')}}</router-link>
          <router-link v-if="s.revisability.googleonoff && unbind && !s.revisability.fixation && !s.revisability.passwordonoff && !s.revisability.bool" class="se"
          :to="{name: s.revisability.url, params: {
            'ga': ga,
            'account': s.value.value,
            'intersmsiso': intersmsiso,
            'type': s.revisability.type
          }}"
          >{{$t('userCenter.bind')}}</router-link>
          <router-link v-if="s.revisability.googleonoff && s.revisability.unbind" class="se"
          :to="{name: s.revisability.url, params: {
            'ga': ga,
            'account': s.value.value,
            'intersmsiso': intersmsiso,
            'type': s.revisability.type
          }}"
          >{{$t('userCenter.unbind')}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('menu.accountsecurity.title') + this.$t('seo.title'),
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
      securityLevelnum: 0,
      ga: eval(window.localStorage.getItem('ga')),
      username: window.localStorage.getItem('username'),
      mobile: window.localStorage.getItem('mobile'),
      user_email: window.localStorage.getItem('user_email'),
      intersmsiso: window.localStorage.getItem('intersmsiso'),
      unbind: false,
      datalist: [
        {
          type: 'basic',
          title: 'userCenter.info',
          lists: [
            {
              type: 'access',
              name: 'userCenter.access',
              value: {
                bool: true,
                value: window.localStorage.getItem('mobile') ? ('+' + window.localStorage.getItem('intersmsiso') + ' ' + window.localStorage.getItem('mobile')) : window.localStorage.getItem('username')
              },
              revisability: {
                fixation: true
              }
            },
            {
              type: 'uid',
              name: 'UID',
              value: {
                bool: true,
                value: ('00000000' + window.localStorage.getItem('uid')).slice(-8)
              },
              revisability: {
                fixation: true
              }
            },
            {
              type: 'password',
              name: 'userCenter.loginpassword',
              value: {
                bool: true,
                value: '******'
              },
              revisability: {
                bool: true,
                url: 'SecurityVer',
                value: 'userCenter.reset',
                passwordonoff: true
              }
            }
          ]
        },
        {
          type: 'dual',
          title: 'userCenter.dual',
          lists:[
            {
              type: 'securityLevel',
              name: 'userCenter.securityLevel',
              value: {
                bool: true,
                value1: '<i class="act"></i><i></i><i></i>',
                value2: '<i class="act"></i><i class="act"></i><i></i>',
                value3: '<i class="act"></i><i class="act"></i><i class="act"></i>'
              },
              revisability: {
                fixation: true
              }
            },
            {
              type: 'email',
              name: 'logSig.email',
              value: {
                bool: window.localStorage.getItem('user_email') ? true : false,
                value: window.localStorage.getItem('user_email') || 'userCenter.notbind'
              },
              revisability: {
                bool: window.localStorage.getItem('user_email') ? true : false,
                url: window.localStorage.getItem('user_email') ? 'Unbind' : 'Bind',
                type: 'email',
                value: window.localStorage.getItem('user_email') ? 'userCenter.unbind' : 'userCenter.bind',
              }
            },
            {
              type: 'mobile',
              name: 'mobile.mobile',
              value: {
                bool: window.localStorage.getItem('mobile') ? true : false,
                value: ('+' + window.localStorage.getItem('intersmsiso') + ' ' + window.localStorage.getItem('mobile')) || 'userCenter.notbind'
              },
              revisability: {
                bool: window.localStorage.getItem('mobile') ? true : false,
                url: window.localStorage.getItem('mobile') ? 'Unbind' : 'Bind',
                type: 'mobile',
                value: window.localStorage.getItem('mobile') ? 'userCenter.unbind' : 'userCenter.bind',
              }
            },
            {
              type: 'google',
              name: 'userCenter.ga',
              value: {
                bool: eval(window.localStorage.getItem('ga')) || false,
                value: eval(window.localStorage.getItem('ga')) ? 'userCenter.atbind' : 'userCenter.notbind'
              },
              revisability: {
                bool: eval(window.localStorage.getItem('ga')) || false,
                url: eval(window.localStorage.getItem('ga')) ? 'UnbindGoogle' : 'BindGoogle',
                type: 'google',
                value: eval(window.localStorage.getItem('ga')) ? 'userCenter.unbind' : 'userCenter.bind',
                unbind: eval(window.localStorage.getItem('ga')),
                googleonoff: true
              }
            }
          ]
        }
      ]
    }
  },
  created () {
    window.localStorage.getItem('user_email') ? this.securityLevelnum++ : this.securityLevelnum = this.securityLevelnum
    window.localStorage.getItem('mobile') ? this.securityLevelnum++ : this.securityLevelnum = this.securityLevelnum
    eval(window.localStorage.getItem('ga')) ? this.securityLevelnum++ : this.securityLevelnum = this.securityLevelnum
    if (window.localStorage.getItem('mobile') && window.localStorage.getItem('user_email')) {
      this.unbind = true
    } else {
      this.unbind = false
    }
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
  #accountsecurity{
    div{background: #fff;margin-bottom:10px;}
    h3{height:58px;line-height: 58px;color:#222c38;font-size:16px;padding:0 30px;font-weight: normal;}
    ul{
      li{display:flex;height:60px;line-height:60px;border-top:1px solid #f2f3f8;padding:0 30px;justify-content: space-between;
        span{color:#a5aab0;font-size:14px;height:60px;line-height:60px;width:200px;display: block;}
        p{font-size:14px;color:#5a626d;height:60px;line-height:60px;width:300px;display: flex;align-items:center;
          & /deep/ i{display: block;width:36px;height:15px;background:#e4e4e4;margin-right:10px;
            &.act{background: #357ce1;}
          }
        &.not{color:#ff5e5e;}}
        a{color:#a5aab0;font-size:14px;height:60px;line-height:60px;display: block;width:100px;text-align: right;
          &.alr{color:#357ce1;}
          &.se{color:#357ce1}
        }
      }
    }
  }
</style>
