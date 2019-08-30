<template>
  <router-view  v-if="!$store.state.loading" />
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('userCenter.title') + this.$t('seo.title'),
      meta: [{
        name: 'keywords',
        content: this.$t('seo.keywords')
      }, {
        name: 'description',
        content: this.$t('seo.description')
      }]
    }
  },
  created () {
  }
}
</script>
<style lang="less" scoped>

</style>
