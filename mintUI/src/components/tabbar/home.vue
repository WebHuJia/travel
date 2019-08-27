<template>
  <div>
    <!-- 首页轮播 -->
    <swiper :imgurl="imgurl"></swiper>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newlist">
          <span class="mui-icon mui-icon-home"></span>
          <div class="mui-media-body">新闻列表</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <span class="mui-icon mui-icon-email">
            <span class="mui-badge">5</span>
          </span>
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/textlist">
          <span class="mui-icon mui-icon-chatbubble"></span>
          <div class="mui-media-body">图文</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-location"></span>
          <div class="mui-media-body">location</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-search"></span>
          <div class="mui-media-body">Search</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-phone"></span>
          <div class="mui-media-body">Phone</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import swiper from '../swiper/swiper.vue'
// import { Toast } from 'mint-ui'
// import defaultImg from '../../assets/images/cbd.jpg'
export default {
  data () {
    return {
      imgurl: ['https://placekitten.com/600/200', 'https://placekitten.com/600/500', 'https://placekitten.com/600/300']
    }
  },
  created () {
    // Toast({
    //   message: '操作成功',
    //   iconClass: 'mui-icon mui-icon-weixin'
    // })
  },
  methods: {},
  components: {
    swiper
  }
}
</script>

<style lang="scss" scoped>
.mui-table-view.mui-grid-view.mui-grid-9 {
  background: #fff;
  border: none;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: none;
}
</style>
