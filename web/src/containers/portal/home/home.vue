<template>
  <div id="home">
    <banner type="web" :title="false" :content='false' :color='false'></banner>
    <announcement class="homeannouncement"></announcement>
    <exponent></exponent>
    <intr></intr>
    <downpage></downpage>
    <teamwork></teamwork>
  </div>
</template>
<script>
import exponent from './exponent'
import intr from './intr'
import downpage from './downpage'
import teamwork from './teamwork'
import announcement from './announcement'
export default {
  metaInfo () {
    return {
      title: this.$t('seo.hometitle'),
      meta: [{
        name: 'keywords',
        content: this.$t('seo.keywords')
      }, {
        name: 'description',
        content: this.$t('seo.description')
      }]
    }
  },
  name: 'Home',
  data () {
    return {
      announcementlists: null
    }
  },
  components: {
    exponent,intr,downpage,teamwork,announcement
  },
  mounted () {

  },
  methods: {

  },
  computed: {
    lang () {
      return this.$store.state.LANG
    }
  },
  watch: {
    lang () {

    }
  }
}
</script>
<style lang="less" scoped>

  .banner{height:494px;display: block;position:relative;
    .swiper-container{height:100%;}
    &:hover{
      i.swiper-button-next{display:block;}
      b.swiper-button-prev{display:block;}
    }
    .swiper-pagination{height:6px;display:flex;justify-content: center;bottom:19px;width:100%;
      & /deep/ .pagination-class{display: block;background:rgba(255,255,255,.3);width:22px;height:4px;margin:0 4px;border-radius: 1px;}
      & /deep/ .pagination-class-active{width:39px;height:4px;background: #fff;}
    }
    .swiper-button-disabled{pointer-events:all;cursor: pointer;}
    i.swiper-button-next{display: none;right:0;opacity: .5;width:60px;height:60px;position:absolute;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8BAMAAADI0sRBAAAAElBMVEUDAg/s7O23t7oxMTujo6f///+Yj3a5AAAABXRSTlNm5bNzpCcJONsAAAAvSURBVDjLYxgFo2AUkA6c8UsrGuCVZhImoB2raCgckKMbYTclLndmGAWjYBQgAQCBlATnzRGBEwAAAABJRU5ErkJggg==) no-repeat;
      &:hover{opacity:1;}
    }
    b.swiper-button-prev{display: none;left:0;opacity: .5;width:60px;height:60px;position:absolute;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8BAMAAADI0sRBAAAAElBMVEUDAg/s7O23t7oxMTujo6f///+Yj3a5AAAABXRSTlNm5bNzpCcJONsAAAAwSURBVDjLYxgFo2AUkABM8MoyC+GVNlTAK41fM0MoHODQTYndzEKE/D0KRsEowAQAtr0EqyQ77M0AAAAASUVORK5CYII=) no-repeat;;
      &:hover{opacity:1;}
    }
    a{display: block;height:100%;width:100%;}
    img{height:100%;width:100%;}
  }
  .homeannouncement{background: #0a151e;}
</style>
