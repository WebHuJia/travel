<template>
  <router-view />
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('menu.invitation.title') + this.$t('seo.title'),
      meta: [{
        name: 'keywords',
        content: this.$t('seo.keywords'),
      }, {
        name: 'description',
        content: this.$t('seo.description'),
      }]
    }
  }
}
</script>
<style lang="less" scoped>

</style>


