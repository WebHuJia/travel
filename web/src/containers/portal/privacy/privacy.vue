<template>
  <div id="privacy" v-html="$t('privacy.content')"></div>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('footer.support.list.policy.name') + this.$t('seo.title'),
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
  #privacy{
    width: 1170px;
    margin: 154px auto 80px;
    /deep/ .frame{
      h1{text-align: left;margin: 0 auto 30px 0;margin: 0 auto 30px auto;color: #222;font-family: 'Montserrat', Microsoft YaHei,sans-serif;font-size: 36px;font-weight: 200;}
      h2{text-align: left;color: #000;font-family: 'Montserrat',Microsoft YaHei,sans-serif;font-size: 18px;font-weight: 600;margin: 0 0 30px 0;}
      p{text-align: left;margin: 0 0 30px 0;line-height: 1.5;font-weight: 400;font-size: 14px;color: #524e4e;cursor: default;
    }
    }
  }
</style>

