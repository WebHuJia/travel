<template>
  <div>
    <HeaderVue></HeaderVue>
    <HomeSwiper></HomeSwiper>
    <HomeIcons></HomeIcons>
    <HomeRecommend></HomeRecommend>
    <HomeWeekend></HomeWeekend>
  </div>
</template>

<script>
import HeaderVue from './Header/header.vue'
import HomeSwiper from './Header/Swiper.vue'
import HomeIcons from './Header/icons.vue'
import HomeRecommend from './Header/Recommend.vue'
import HomeWeekend from './Header/Weekend.vue'
export default {
  name: 'Home',
  components: {
    HeaderVue,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  }
}
</script>

<style>

</style>
