<template>
  <div id="bgbox">
    <div id="userhome">
      <usermenu @titlename="titlename"></usermenu>
      <div id="box">
        <h3>{{$t(tname)}}{{$store.state.users.subhead ? '/' + $t($store.state.users.subhead) : ''}}</h3>
        <router-view class="flexgrow2" />
      </div>
    </div>
  </div>
</template>
<script>
import usermenu from '@/containers/user/menu'
export default {
  metaInfo () {
    return {
      title: this.$t('userCenter.title') + this.$t('seo.title'),
      meta: [{
        name: 'keywords',
        content: this.$t('seo.keywords'),
      }, {
        name: 'description',
        content: this.$t('seo.description'),
      }]
    }
  },
  components: {
    usermenu
  },
  data () {
    return {
      tname: ''
    }
  },
  created () {
    this.axios.accountInfo()
  },
  computed: {
    title () {
      return this.$route.params.title
    }
  },
  methods: {
    titlename (d) {
      this.tname = d.titlename
    }
  },
  watch: {
    title (n, o) {
      n? this.tname = n : ''
    }
  }
}
</script>
<style lang="less" scoped>
    #bgbox{background: #f2f3f8;overflow: hidden;
      #userhome{display: flex;width:1200px;margin:124px auto;
        #box{flex-shrink: 0;width:982px;
          h3{color:#222c38;font-size:16px;height:50px;line-height: 50px;text-indent: 30px;background: #fff;margin-bottom: 10px;font-weight: normal;} 
        }
      }
    }
</style>
