<template>
  <div id="banner" :style="`height:${(autoBannerHeight? 'auto' : bannerHeight)}`">
      <div v-if="swiper" class="swiperbanner" @mouseover="on_top_enter" @mouseleave="on_top_leave">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(s, i) in d" :key="i">
            <router-link v-if="!s.outLink && s.url" :to="{name: s.url}" :class="{'noturl': !s.url}" :alt="s.title" :title="s.content" :style="image? '' : `background-image:url(${s.image})`"></router-link>
            <a v-else :href="s.url||'javascript:;'" :target="s.target" :class="{'noturl': !s.url}" :alt="s.title" :style="image? '' : `background-image:url(${s.image})`"></a>
            <img :src="s.image" v-if="image" :alt="s.content" :title="s.title">
            <section>
              <span :class="{'color': color && !$store.state.isIE}" v-if="s.description" v-html="s.description"></span>
              <p v-if="content && s.content" class="content"><slot name="content"><u v-html="s.content"></u></slot></p>
              <i v-if="s.button" class="btnhover" >{{s.button}}</i>
            </section>
          </swiper-slide>
        </swiper>
        <div v-if="pagination" class="swiper-pagination" slot="pagination"></div>
        <span v-if="pages">
          <i @mouseover="" @mouseleave="" class="swiper-button-next"></i>
          <b @mouseover="" @mouseleave="" class="swiper-button-prev"></b>
        </span>
      </div>
      <div v-else class="singlebanner">
        <article v-for="(s, i) in d" :key="i" >
          <router-link v-if="!s.outLink && s.url" :to="{name: s.url}" :class="{'noturl': !s.url}" :title="s.content" :alt="s.title"  :style="image? '' : `background-image:url(${s.image})`"></router-link>
          <a v-else :target="s.target" :href="s.url||'javascript:;'" :class="{'noturl': !s.url}" :title="s.content" :alt="s.content" :style="image? '' : `background-image:url(${s.image})`"></a>
          <img :src="s.image" v-if="image" :alt="s.content" :title="s.title">
          <section>
            <span :class="{'color': color && !$store.state.isIE}" v-if="s.description" v-html="s.description"></span>
            <p v-if="content && s.content" class="content"><slot name="content"><u v-html="s.content"></u></slot></p>
            <i v-if="s.button" class="btnhover" >{{s.button}}</i>
          </section>
        </article>
      </div>
  </div>
</template>
<script>
export default {
  //多张banner的时候默认启用swiper组件，默认开启手势滑动，默认有左右箭头、分页器
  props: {
    type: {//类型
      type: String,
      default: ''
    },
    pagination: {//是否分页器
      type: Boolean,
      default: true
    },
    pages: {//是否启用左右箭头
      type: Boolean,
      default: true
    },
    Alltouch: {//是否全屏点击
      type: Boolean,
      default: true
    },
    color: {//是否启用多色彩
      type: Boolean,
      default: false
    },
    title: {//是否有标题
      type: Boolean,
      default: true
    },
    image: {//是否使用图片标签，如果使用标签则无需填写高度，
      type: Boolean,
      default: false
    },
    content: {//是否显示内容，默认为true，
      type: Boolean,
      default: true
    },
    autoBannerHeight: {//是否显示内容，默认为true，
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      d: {},
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          bulletClass: 'pagination-class',
          bulletActiveClass: 'pagination-class-active'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        autoplay: {
          delay: 4000,
          disableOnInteraction:false,
        },
        loop: true
      },
      bannerHeight: '300px'
    }
  },
  created () {
    this.http()
  },
  methods: {
    on_top_enter() {
      this.mySwiper.autoplay.stop()
    },
    on_top_leave() {
      this.mySwiper.autoplay.start()
    },
    http () {
      this.axios.axiosget({
        url: '/portal/banner',
        params: {type: this.type}
      }).then((ret)=>{
        let img = new Image ()
        img.src = ret.data.data[0].image
        img.onload = () => {
          this.bannerHeight = img.height + 'px'
        }

        ret.data.data.length >=2 ? this.swiper = true : this.swiper = false
        ret.data.data.map((obj, index) => {
            this.$set(obj, 'outLink', false)
          if (obj.url) {
            if (obj.url.split('/').length >= 2 || obj.url.split('.') >= 2) {
              this.$set(obj, 'outLink', true)
            }
          } else {
            obj.url = false
          }
          // obj.url ? this.$set(obj, 'btnonoff', true) : this.$set(obj, 'btnonoff', false)
        })
        this.$emit('contentData', {content: ret.data.data})
        this.d = ret.data.data
      }).catch((err)=>{
        console.log(err)
      })
    }
  },
  computed: {
    lang () {
      return this.$store.state.LANG
    },
    mySwiper() {
      // mySwiper 是要绑定到标签中的ref属性
      return this.$refs.mySwiper.swiper
    },
    myBotSwiper() {
      return this.$refs.myBotSwiper.swiper
    }
  },
  watch: {
    lang () {
      this.http()
    }
  }
}
</script>
<style lang="less" scoped>
  #banner{
    img{display: block;margin-left: 50%;transform: translateX(-50.1%);width:100%;height:100%;}
    article{position:relative;width:100%;height:100%;}
    a{display: block;width:100%;height:100%;font-size:45px;font-weight:bold;position:relative;background-position:50%;
      /*&:hover + section{*/
        /*i{*/
          /*box-shadow: -1.302px 3.782px 8.4px 1.6px rgba(66, 146, 255, 0.22);*/
        /*}*/
      /*}*/
    }
    section{position:absolute;top:0;left:0;width:100%;height:100%;flex-flow:column;display: flex;justify-content: center;align-items:center;pointer-events: none;
      span{font-size:45px;line-height:2em;font-weight:bold;color:#fff;
        &.color{
          background: #23beff;
          background: linear-gradient(30deg, #23beff, #4df6cf);
          background: -webkit-linear-gradient(30deg, #23beff, #4df6cf);
          background: -o-linear-gradient(30deg, #23beff, #4df6cf);
          background: -moz-linear-gradient(30deg, #23beff, #4df6cf);
          background: -ms-linear-gradient(30deg, #23beff, #4df6cf);
          background-clip: text;
          -webkit-background-clip: text;
          -moz-background-clip: text;
          -o-background-clip: text;
          -ms-background-clip: text;color: transparent;}
      }
      i{font-size:24px;color: #fff;background: #357ce1;border-radius: 2px;display: block;padding: 0 30px;height: 50px;line-height: 50px;text-align: center;margin-top:20px;min-width:228px;box-sizing:border-box;}
      & /deep/ p{width:1000px;
        &.content{font-size: 34px;color: #fff;margin: 0 auto;line-height:1.7;text-align:center;
          u{font-size:34px!important;line-height:1.7;}
        }
      }
    }
    a.noturl{cursor: default;display: none;}
    & /deep/ p.info{color: #fff;font-size: 14px;line-height: 1.75;width: 1100px;text-align: center;}
    & /deep/ p.conten{font-size: 34px;color: #fff;margin: 0 auto;line-height:1.7;text-align:center;
      u{font-size:34px!important;line-height:1.7;}
    }
    .swiperbanner{display: block;position:relative;width:100%;height:100%;
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
    .singlebanner{background:#fff;width:100%;height:100%;
      a{width:100%;height:100%;font-size:45px;font-weight:bold;display: block;;position:relative;}
      span{font-size:45px;line-height:2em;font-weight:bold;color:#fff;
        &.color{
          background: #23beff;
          background: linear-gradient(30deg, #23beff, #4df6cf);
          background: -webkit-linear-gradient(30deg, #23beff, #4df6cf);
          background: -o-linear-gradient(30deg, #23beff, #4df6cf);
          background: -moz-linear-gradient(30deg, #23beff, #4df6cf);
          background: -ms-linear-gradient(30deg, #23beff, #4df6cf);
          background-clip: text;
          -webkit-background-clip: text;
          -moz-background-clip: text;
          -o-background-clip: text;
          -ms-background-clip: text;color: transparent;}
      }
      i{font-size:24px;color: #fff;font-size: 24px;background: #357ce1;border-radius: 50px;display: block;padding: 0 30px;height: 50px;line-height: 50px;text-align: center;margin-top:20px;
      }
    }
  }
</style>

