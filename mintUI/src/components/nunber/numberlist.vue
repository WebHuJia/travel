<template>
    <div>
      <div class="mui-numbox"  data-numbox-min="1">
        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input class="mui-numbox-input" type="number" v-model="n" readonly @change="numChange" />
        <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
      </div>
    </div>
</template>
<script>
import mui from '../../../lib/mui/js/mui.min.js'
export default {
  data () {
    return {

    }
  },
  props: ['n', 'num'],
  mounted () {
    mui('.mui-numbox').numbox()
  },
  methods: {
    numChange (el) {
      // this.$emit('change', parseInt(el.target.valueAsNumber))
      this.$store.commit('getCarCount', {
        id: this.num,
        count: el.target.valueAsNumber
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
