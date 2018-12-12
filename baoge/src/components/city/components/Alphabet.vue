<template>
  <ul class="list">
    <li class="item"
     v-for="item of letters"
     :key="item"
     :ref="item"
     @click="handleLetterClick"
     @touchstart.prevent="handletouchstart"
     @touchmove="handletouchmove"
     @touchend="handletouchend"
    >
      {{item}}
    </li>
  </ul>
</template>
<script>
export default {
  name: 'CityAlphabet',
  data () {
    return {
      touch: false,
      timer: null
    }
  },
  computed: {
    letters () {
      const letters = []
      for (let i in this.cities) {
        letters.push(i)
      }
      return letters
    }
  },
  props: {
    cities: Object
  },
  methods: {
    handleLetterClick (e) {
      this.$emit('change', e.target.innerText)
    },
    handletouchstart () {
      this.touch = true
    },
    handletouchmove (e) {
      if (this.touch) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          const first = this.$refs['A'][0].offsetTop
          const last = e.touches[0].clientY - 79
          // e.touches是获取当前点击元素的手指的一些信息
          const index = Math.floor((last - first) / 20)
          if (index >= 0 && index < this.letters.length) {
            this.$emit('change', this.letters[index])
          }
        }, 16)
      }
    },
    handletouchend () {
      this.touch = false
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~css/varibles.styl'
.list
  position absolute
  top 1.58rem
  bottom 0
  right 0
  width .4rem
  display flex
  flex-direction column
  justify-content center
  .item
    text-align center
    line-height .4rem
    color $bgColor
</style>
