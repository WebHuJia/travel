<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import mynav from './component/nav'
import myfooter from './component/footer'
import loadingview from './component/loading'
export default {
  name: 'App',
  components: {
    mynav, myfooter, loadingview
  },
  mounted () {
    function checkIE () {
      return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style
    }
    if (checkIE()) {
      window.addEventListener('hashchange', () => {
        var currentPath = window.location.hash.slice(1)
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath)
        }
      }, false)
    }
  },
  computed: {
    lang () {
      return this.$store.state.LANG
    }
  },
  watch: {
    lang () {
      this.$i18n.locale = this.$store.state.LANG
    }
  }
}
</script>
<style lang='less'>
   html {font-size: 100px;height:100%;}
   #app{height:100%;font-size:14px;}
   input:-webkit-autofill{ -webkit-box-shadow:0 0 0px 1000px #fff inset;}
  body{margin:0;padding:0;height:100%;}
</style>
