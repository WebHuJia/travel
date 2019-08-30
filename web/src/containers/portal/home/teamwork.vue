<template>
  <div id="teamwork" >
    <div class='teamworkbox'>
      <h3 v-html="$t('teamword.title')"></h3>
      <ul>
        <li v-for="(team, index) in teamworkList" :key="index">
          <img :src="team.imagesurl" :alt="team.name">
        </li>
      </ul>
    </div>
    <div class='register' v-if="register">
      <h4 v-html="$t('teamword.register')"></h4>
      <div>
        <input type="text" :placeholder="$t('placeholder.mobileemail')" v-model="username">
        <router-link :to="{name: 'Register', params: {username: username,regisertype: regisertype}}" v-html="$t('logSig.register')"></router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      teamworkList: [
        {
          name: 'coinex',
          imagesurl: '/static/staticfile/images/investor/coinex.png'
        }, {
          name: 'scapital',
          imagesurl: '/static/staticfile/images/investor/scapital.png'
        }, {
          name: 'collinstar',
          imagesurl: '/static/staticfile/images/investor/collinstar.png'
        }, {
          name: 'bitell',
          imagesurl: '/static/staticfile/images/investor/bitell.png'
        }, {
          name: 'rockminer',
          imagesurl: '/static/staticfile/images/investor/rockminer.png'
        }, {
          name: 'oax',
          imagesurl: '/static/staticfile/images/investor/oax.png'
        }
      ],
      register: true,
      username: '',
      regisertype: true
    }
  },
  created () {
    this.register = localStorage.getItem('token') ? false : true
  },
  computed: {
    token () {
      return this.$store.state.users.token
    }
  },
  watch: {
    token (n, o) {
      this.register = localStorage.getItem('token') ? false : true
    },
    username (n, o) {
      var reg = this.DefaultJs.REG.notchinamobilereg    
      var rege = this.DefaultJs.REG.emailreg
      if (!reg.test(this.username)) {
        this.regisertype = false
      }
      if (!rege.test(this.username)) {
        this.regisertype = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
  #teamwork{width:100%;overflow: hidden;
    .teamworkbox{
      height:546px;overflow: hidden;border-bottom:1px solid #f4f5f6;
      h3{color:#222c38;font-size:35px;text-align:center;margin:118px auto 106px;}
      ul{font-size:0;text-align:center;width:800px;margin:0 auto;
        li{width:182px;height:78px;display:inline-block;margin:15px 41px;
          img{width:182px;height:78px;display:block;margin:0 auto;}
        }
      }
    }
    .register{overflow: hidden;height:208px;
      h4{color:#222c38;font-size:26px;text-align: center;margin-top:52px;}
      div{width:530px;position:relative;margin:48px auto 0;
        input{border-width: 1px;border-color: rgb(242, 242, 242);border-style: solid;background-color: rgb(255, 255, 255);height:38px;border-radius: 2px;box-sizing: border-box;width:400px;text-indent: 2em;
          &::placeholder{color:#caccd1;}
        }
        a{width:122px;height:38px;line-height:38px;text-align: center;color:#fff;font-size:16px;border-radius: 2px;background:#357ce1;position:absolute;top:0;right:0;}
      }
    }
  }
</style>
