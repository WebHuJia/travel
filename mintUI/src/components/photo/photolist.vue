<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            v-for="item of list"
            :key="item.id"
            class="mui-control-item"
            :class="[item.id==0?'mui-active':'']"
          >{{ item.title }}</a>
        </div>
      </div>
    </div>
    <div class="mui-content-padded">
      <p>这是图片放大预览示例，点击如下图片体验全屏预览功能</p>
      <p>
        <router-link to="/home/photolist/photoinfor">
          <img src="../../assets/images/yuantiao.jpg" data-preview-src data-preview-group="1" />
        </router-link>
      </p>

      <p>图片全屏后，双击或双指缩放均可对图片进行放大、缩小操作，左右滑动可查看同组(data-preview-group相同的图片为一组)其它图片，点击会关闭预览</p>
      <p>
        <router-link to="/home/photolist/photoinfor">
          <img src="../../assets/images/muwu.jpg" data-preview-src data-preview-group="1" />
        </router-link>
      </p>
      <p>第三张图片，纯粹为了占位：</p>
      <p>
        <router-link to="/home/photolist/photoinfor">
          <img src="../../assets/images/shuijiao.jpg" data-preview-src data-preview-group="1" />
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import mui from '../../../lib/mui/js/mui.min.js'

export default {
  data () {
    return {
      list: [
        {
          id: '1',
          title: '上海'
        },
        {
          id: '2',
          title: '北京'
        },
        {
          id: '3',
          title: '热点'
        },
        {
          id: '4',
          title: '北京'
        },
        {
          id: '5',
          title: '上海'
        },
        {
          id: '6',
          title: '武汉'
        }
      ]
    }
  },
  created () {
    this.All()
    window.scrollTo(0, 0) // 进入页面回滚到顶部
  },
  mounted () {
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    })
  },
  methods: {
    All () {
      this.list.unshift({ id: '0', title: '全部' })
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
