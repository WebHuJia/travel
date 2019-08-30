<template>
  <div id="bindGoogle">    
    <h3>{{$t('userCenter.unbindgoogle.title')}}</h3>
    <ul class='label'>
      <li>
        <verification @vercode="vercode"></verification>
      </li>
    </ul>
    <button @click.stop='btnsumlit' class="btnhover" v-html="$t('userCenter.unbind')"></button>
  </div>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('userCenter.unbindgoogle.title') + this.$t('seo.title'),
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
      verification_code: ''
    }
  },
  created () {
    this.$store.state.users.subhead = 'userCenter.unbindgoogle.title'

  },
  methods: {
    btnsumlit() {
      if (!this.verification_code) {
        this.$message({
          content: this.$t('register.code1') + this.$t('find.googlecode')
        })
        return
      }
      this.axios.axiospost({
        url: '/user/unbindGa',
        data: {
          "google_code": this.verification_code
        }
      }).then((ret) => {
        if (ret.data.code == 1) {
          this.$message({
            content: ret.data.msg,
            type: 'check',
          })
        }
        window.localStorage.setItem('ga', false)
        this.$store.state.users.ga=false
        this.axios.accountInfo()
        this.$router.push({ name: 'AccountSecurity'})
      }).catch((error) => {
          console.log(error)
        })
    },
    vercode (d) {
      this.verification_code = d.vercode
    }
  }
}
</script>
<style lang="less" scoped>
  //  #app > #nav{background-color: rgb(10, 21, 30);}
  #bindGoogle{display:flex;flex-flow:column;background:#fff;
    h3{height:58px;line-height: 58px;color:#222c38;font-size:16px;padding:0 30px;border-bottom:1px solid #f2f3f8;margin-bottom:30px;}
    p{color:#5a626d;font-size:18px;margin-bottom:10px;padding:0 30px;
      b{font-size: 22px;color:#222c38;margin-left:10px;}
    }
    ul.label{
      li{position:relative;width:400px;margin-bottom:42px;padding:0 30px;
        label{color:#5a626d;font-size:16px;display: block;margin-bottom:10px;
        }
      input{width:400px;height:50px;border:1px solid #ddd;box-sizing: border-box;border-radius: 2px;text-indent:1em;}
      }
    }
    button{background:#357ce1;color:#fff;font-size:18px;;width:210px;height:50px;line-height:50px;text-align: center;border-radius: 2px;margin-top:18px;margin:12px 30px 70px;display: block;}
  }
</style>
