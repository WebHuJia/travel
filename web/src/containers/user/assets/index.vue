<template>
  <div id="assets_bg">
    <div id="assets_page">
      <div class='allAssets'>
        <p>{{$t('myAssets.estimatedValue')}}</p>
        <span>≈{{$store.state.LANG == 'zh-cn' ? $store.state.assets.assets.totalValueToCNY : $store.state.assets.assets.totalValueToUSD}}</span>
      </div>
      <router-view @data="data"></router-view>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('myAssets.title') + this.$t('seo.title'),
      meta: [{
        name: 'keywords',
        content: this.$t('seo.keywords'),
      }, {
        name: 'description',
        content: this.$t('seo.description'),
      }]
    }
  },
}
</script>
<style lang="less" scoped>
#assets_bg{overflow: hidden;background: #f5f5f5;}
#assets_page{width:1200px;margin:90px auto;
  .allAssets{padding:30px 40px;height:50px;background:#fff;margin-bottom:10px;display: flex;flex-flow:column;
    p{line-height: 100%;font-size:22px;color:#222c38;margin-bottom:10px;}
    span{color:#969fa9;font-size:16px;}
  }
}
</style>
