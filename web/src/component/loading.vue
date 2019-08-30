<template>
	<div id="loading"  v-if="$store.state.loading">
    <loadingcenter />
	</div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    loading () {
      return this.$store.state.loading
    }
  },
  watch: {
    loading (n, o) {
    }
  }
}
</script>
<style lang="less" scoped>
#loading{background-color: #fff;height: 100%;width: 100%;position: fixed;z-index: 1;margin-top: 0px;top: 0px;}

</style>


