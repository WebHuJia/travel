<template>
<div class="wrapper">
    <swiper :options="swiperOption" >
    <!-- slides -->
    <swiper-slide v-for="item of swiperList" :key="item.id">
      <img class="swiper-img"  :src="item.imgUrl" alt="">
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</div>
</template>
<script>
export default {
  name: 'HomeSwiper',
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true
      },
      swiperList: [{
        id: '01',
        imgUrl: '//dimg04.c-ctrip.com/images/700l0y000000lvexk72B5_1242_248_25.jpg'
      },
      {
        id: '02',
        imgUrl: '//dimg04.c-ctrip.com/images/70060y000000lvlou6C83_1242_248_25.jpg'
      }]
    }
  }
}
</script>
<style lang="stylus" scoped>
    .wrapper >>> .swiper-pagination-bullet-active
      background #fff
    .wrapper
      width 100%
      height 0
      overflow hidden
      padding-bottom 20%
      background #ccc
      .swiper-img
        width 100%
</style>
