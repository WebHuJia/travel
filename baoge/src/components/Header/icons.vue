<template>
  <div class="icons">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(page,index) of pages" :key="index">
        <div class="icon" v-for="item of page" :key="item.id">
          <div class="icon-img">
            <img class="icon-img-content" :src="item.imgUrl" alt="">
          </div>
          <p class="icon-desc">{{item.desc}}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
export default {
  name: 'HomeIcons',
  data () {
    return {
      iconList: [{
        id: '001',
        imgUrl: require('../../assets/img/icons_01.png'),
        desc: '景点门票'
      }, {
        id: '002',
        imgUrl: require('../../assets/img/icons_02.png'),
        desc: '滑雪季'
      }, {
        id: '003',
        imgUrl: require('../../assets/img/icons_03.png'),
        desc: '泡温泉'
      }, {
        id: '004',
        imgUrl: require('../../assets/img/icons_04.png'),
        desc: '动物植园'
      }, {
        id: '005',
        imgUrl: require('../../assets/img/icons_05.png'),
        desc: '景点门票'
      }, {
        id: '006',
        imgUrl: require('../../assets/img/icons_06.png'),
        desc: '滑雪季'
      }, {
        id: '007',
        imgUrl: require('../../assets/img/icons_07.png'),
        desc: '泡温泉'
      }, {
        id: '008',
        imgUrl: require('../../assets/img/icons_08.png'),
        desc: '动物植园'
      }, {
        id: '009',
        imgUrl: require('../../assets/img/icons_01.png'),
        desc: '一日游'
      }],
      swiperOption: {
        autoplay: 0,
        pagenation: '.swiper-pagination'
      }
    }
  },
  computed: {
  // 计算图标个数，分配页数
    pages () {
      const pages = []
      this.iconList.forEach((item, index) => {
        const page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~css/varibles.styl'
@import '~css/mixins.styl'
.icons >>> .swiper-container
    height: 0
    padding-bottom: 55%
.icons >>> .swiper-pagination-bullet-active
    background $bgColor
.icons >>> .swiper-pagination-bullet
    width 6px
    height 6px
.icons
    overflow: hidden
    height: 0
    padding-bottom: 55%
    background #fff
    padding-top .1rem
    .icon
        position relative
        overflow hidden
        float left
        width 25%
        height 0
        padding-bottom 25%
        .icon-img
            position absolute
            top 0
            left 0
            right 0
            bottom .44rem
            box-sizing border-box
            padding .1rem
            .icon-img-content
                height 100%
                display block
                margin 0 auto
        .icon-desc
            position absolute
            left 0
            right 0
            bottom 0
            height .44rem
            line-height .44rem
            color #333
            text-align center
            ellipsis()
</style>
