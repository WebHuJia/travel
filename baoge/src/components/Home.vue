<template>
  <div>
    <HeaderVue :city="city"></HeaderVue>
    <HomeSwiper :list="SwiperList"></HomeSwiper>
    <HomeIcons :list="iconList"></HomeIcons>
    <HomeRecommend :list="RecomList"></HomeRecommend>
    <HomeWeekend :list="WeekList"></HomeWeekend>
  </div>
</template>

<script>
import HeaderVue from './Header/header.vue'
import HomeSwiper from './Header/Swiper.vue'
import HomeIcons from './Header/icons.vue'
import HomeRecommend from './Header/Recommend.vue'
import HomeWeekend from './Header/Weekend.vue'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    HeaderVue,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  },
  data () {
    return {
      city: '',
      SwiperList: [],
      iconList: [],
      RecomList: [],
      WeekList: []
    }
  },
  methods: {
    getHomeInfo () {
      var _this = this
      // 只有static目录才能进行访问静态资源，其他目录访问会直接跳转回主页
      // axios.get('/static/json/index.json').then(function(response){
      //   console.log(response.data);
      // })
      // 如果按照上面请求路径这样写，是模拟本地接口地址，假如代码上线，则需要修改成线上的接口地址，
      // 这样大批量的修改会有风险，可以利用webpack的转发配置将请求转发到配置路径下。
      // 在config目录下的index.js文件下，有个proxyTable的属性进行配置
      axios.get('/api/index.json?id=' + new Date().getTime()).then(function (res) {
        res = res.data
        if (res.ret && res.data) {
          const data = res.data
          _this.city = data.city
          _this.SwiperList = data.SwiperList
          _this.iconList = data.iconList
          _this.RecomList = data.RecomList
          _this.WeekList = data.WeekList
        }
      })
    }
  },
  // mounted:vue生命周期
  mounted () {
    // 等页面挂在好才去执行getHomeinfo事件
    this.getHomeInfo()
  }
}
</script>

<style>

</style>
