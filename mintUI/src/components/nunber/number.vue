<template>
    <div>
      <div class="mui-numbox"  data-numbox-min="1" :data-numbox-max="max">
        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input class="mui-numbox-input" type="number" @change="numChange" />
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
  props: ['max'],
  mounted () {
    mui('.mui-numbox').numbox()
  },
  methods: {
    numChange (el) {
      this.$emit('change', parseInt(el.target.valueAsNumber))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
