<template>
  <div>
    <div class="title">周末去哪儿</div>
    <ul>
      <li class="item border-bottom" v-for='item of recommendList' :key='item.id'>
        <div class="item-img-wrapper">
          <img class="item-img" :src="item.imgUrl" alt="">
        </div>
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-desc">{{item.desc}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeWeekend',
  data () {
    return {
      recommendList: [{
        id: '001',
        imgUrl: 'http://img1.qunarzz.com/sight/source/1505/fa/ca65fde9677de2.jpg_r_640x214_4500e3ff.jpg',
        title: '世界之窗',
        desc: '深圳世界之窗成人票(夜场)(万圣节特惠10.12-10.26【不限人群】)'
      }, {
        id: '002',
        imgUrl: 'http://img1.qunarzz.com/sight/source/1505/fa/ca65fde9677de2.jpg_r_640x214_4500e3ff.jpg',
        title: '世界之窗',
        desc: '深圳世界之窗成人票(夜场)(万圣节特惠10.12-10.26【不限人群】)'
      }, {
        id: '003',
        imgUrl: 'http://img1.qunarzz.com/sight/source/1505/fa/ca65fde9677de2.jpg_r_640x214_4500e3ff.jpg',
        title: '世界之窗',
        desc: '深圳世界之窗成人票(夜场)(万圣节特惠10.12-10.26【不限人群】)'
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~css/mixins.styl'
.title
  margin-top .2rem
  line-height .8rem
  background #eee
  text-indent .2rem
.item-img-wrapper
  overflow hidden
  height 0
  padding-bottom 33.9%
  .item-img
    width 100%
.item-info
  flex 1
  padding .1rem
  min-width: 0;
  .item-title
    line-height .54rem
    font-size .32rem
    ellipsis()
  .item-desc
    line-height .4rem
    color #ccc
    ellipsis()
</style>
