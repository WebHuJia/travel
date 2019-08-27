<template>
  <div>
    <transition @before-enter="bEnter" @enter="enter" @after-enter="aEnter">
      <div class="ball" v-show="ballFlag" ref="a"></div>
    </transition>
    <!-- 头部轮播 -->
    <swiper :imgurl="imgurl"></swiper>
    <div>
      购买数量:
      <number @change="fatherchange" :max="quan_tity"></number>
    </div>
    <br />
    <mt-button type="primary" @click="changBall">加入购物车</mt-button>
    <br />
    <br />
    <mt-button type="primary" size="large" plain @click="goDEsc">进入图文详情详情</mt-button>
    <br />
    <br />
    <mt-button type="danger" size="large" plain @click="goComent(id)">进入评论详情</mt-button>
    <br />
    <br />
  </div>
</template>

<script>
// 引入swiper组件
import swiper from '../swiper/swiper.vue'
// 引入购买数量组件
import number from '../nunber/number.vue'
export default {
  data () {
    return {
      id: this.$route.params.id,
      imgurl: [
        'https://placekitten.com/600/200',
        'https://placekitten.com/600/500',
        'https://placekitten.com/600/300'
      ],
      ballFlag: false,
      selectConunt: 1,
      quan_tity: 20
    }
  },
  components: {
    swiper,
    number
  },
  methods: {
    goDEsc () {
      this.$router.push({ name: 'goDEsc' })
    },
    goComent (id) {
      this.$router.push({ name: 'goComent', parmas: { id } })
    },
    changBall () {
      this.ballFlag = !this.ballFlag
      var arr = {
        id: this.id,
        count: this.selectConunt,
        seclected: true
      }
      this.$store.commit('seclecNum', arr)
    },
    bEnter (el) {
      el.style.transform = 'translate(0,0)'
      // 表示动画入场之前，坐标表示位置是在起始位置不动
      // 在一次入场动画执行完成之后，在最终位置停下来并不在起始位置，通过这里的位置的设置可以将入场动画结束时的位置调到这里
    },
    enter (el, done) {
      // 没有实际效果，但不可缺少，可以理解为强制动画刷新
      // eslint-disable-next-line no-unused-expressions
      el.offsetWidth // offsetHeight、offsetLeft等都可以
      // 获取小球移动距离

      // 子组件的起始徽标 a 获取
      const aPosition = this.$refs.a.getBoundingClientRect()
      // 父组件的结束徽标 b 获取
      // 认真点就是父组件获取到再传递子组件，不过推荐偷懒法：
      const bPosition = document.getElementById('b').getBoundingClientRect()

      const xDist = bPosition.left - aPosition.left
      const yDist = bPosition.top - aPosition.top

      // ES6 的模板字符串
      el.style.transform = `translate( ${xDist}px,${yDist}px )`

      el.style.transition = 'all 1s cubic-bezier(.4,-0.24,1,.63)'

      // 这里的 done，其实就是 afterEnter 这个函数，
      // 也就是说：done 是 afterEnter 函数的引用
      done()
    },
    aEnter (el) {
      this.ballFlag = !this.ballFlag
    },
    fatherchange (count) {
      this.selectConunt = count
    }
  }
}
</script>

<style lang="scss" scoped>
.ball {
  width: 15px;
  height: 15px;
  background: red;
  border-radius: 50%;
  position: absolute;
  z-index: 99;
  left: 52px;
  top: 270px;
}
</style>
