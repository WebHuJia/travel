<template>
  <div>
    <HeaderVue></HeaderVue>
    <HomeSwiper></HomeSwiper>
  </div>
</template>

<script>
import HeaderVue from './Header/header.vue'
import HomeSwiper from './Header/Swiper.vue'
export default {
  name: 'Home',
  components: {
    HeaderVue,
    HomeSwiper
  }
}
</script>

<style>

</style>
