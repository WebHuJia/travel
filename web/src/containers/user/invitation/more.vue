<template>
  <div id="more">
    <h4>{{logonoff ? $t('invitation.rule.log') : $t('invitation.rule.reward')}}</h4>    
    <div>
      <ul v-if="logonoff">
        <li v-for="(s, i) in loglist" :key="i">
          <span>{{s.mobile ? '+'+ s.iso_code + ' '+ s.mobile : s.user_email}}</span>
          <strong>{{DefaultJs.getTime(s.create_time).formatting}}</strong>
        </li>
      </ul>
      <ul v-if="!logonoff">
        <li v-for="(s, i) in rewardlist" :key="i">
          <span>{{s.coin_number + ' ' + s.token_name}}</span>
          <strong>{{DefaultJs.getTime(s.create_time).formatting}}</strong>
        </li>
      </ul>
    </div>
    <pager :pageSize="pagelist.last_page" v-model.trim="pageNo" @on-jump="jump"></pager>
  </div>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('invitation.rule.more') + this.$t('seo.title'),
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
    return{
      type: '',
      logonoff: false,
      loglist: '',
      rewardlist: '',
      pagelist: '',
      pageNo: 1
    }
  },
  created () {
    this.type = this.$route.params.type ? 'log' : 'reward'
    this.logonoff = this.$route.params.type
    this.$store.state.users.subhead = this.logonoff ? 'invitation.rule.log' : 'invitation.rule.reward';
    this.http()
  },
  methods: {
    jump (d) {
      this.pageNo = d
      this.http()
    },
    http () {
      if (this.type === 'log') {
        this.axios.axiosget({
          url: '/inviteLog',
          params: {page:this.pageNo,limit: 10},
          headers: {
            'x-device-language': this.$store.state.LANG,
            'XX-Token': localStorage.getItem('token'),
            'XX-Device-Type': this.$store.state.users.device_type
          }
        }).then((ret) => {
          this.loglist = ret.data.data
          this.pagelist = ret.data.page
        }).catch((error) => {
          console.log(error)
        })
      } else if (this.type === 'reward') {
        this.axios.axiosget({
          url: '/inviteReward',
          params: {page:this.pageNo,limit: 10},
          headers: {
            'x-device-language': this.$store.state.LANG,
            'XX-Token': localStorage.getItem('token'),
            'XX-Device-Type': this.$store.state.users.device_type
          }
        }).then((ret) => {
          this.rewardlist = ret.data.data
          this.pagelist = ret.data.page
        }).catch((error) => {
          console.log(error)
        })
      } 
    }
  }
}
</script>
<style lang="less" scoped>
  #more{background:#fff;margin:10px 0;border-radius:2px;padding-bottom:60px;min-height:500px;
    h4{height:60px;line-height:60px;display:flex;align-items: center;border-bottom:1px solid #f2f3f8;padding:0 30px;font-size:14px;}
    li{height:50px;line-height:50px;display: flex;justify-content:space-between;color:#222c38;font-size:14px;padding:0 30px;border-bottom:1px solid #f2f3f8;align-items: center;
      span{font-size:14px;}
      strong{width:180px;flex-shrink: 0;display: block;text-align: left;font-weight: normal;font-size:14px;}
    }

  }
</style>


