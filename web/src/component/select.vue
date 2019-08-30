<template>
  <div id="select">
    <span @mouseleave="show = false" @click.stop="show = !show" :data-value="value">{{$t(value)}}<i class="fa fa-caret-down fr" @click.stop="show = !show" ></i></span>
    <ul v-if="show" @mouseenter="show = true" @mouseleave="show = false">
      <li @click.stop="typetab($event)" :data-value="s"  v-if="type === 'text'" v-for="(s, index) in lists" :key="index" v-html="$t(s)"></li>
    </ul>
  </div>  
</template>
<script>
export default {
  props: {
    lists:{
      type: Array,
      default: ''
    },
    type:{
      type: String,
      default: 'text'
    },
    default_value:{
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value: '',
      show: false,
      isolists: ''
    }
  },
  created () {
    this.value = this.default_value
  },
  methods: {
    typetab (event) {
      this.value = event.currentTarget.dataset.value
      this.show = false
    }
  },
  computed: {
    lang () {
      return this.$store.state.LANG
    }
  },
  watch: {
    value (n, o) {
      this.$emit('selectvalue', {value: this.value})
    },
    lang () {

      this.$emit('selectvalue', {value: this.value})
    },
    default_value () {
      this.value = this.default_value
    }
  }
}
</script>
<style lang="less" scoped>
#select {position:relative;width:200px;
    span{display: block;height:50px;line-height: 50px;width:100%;text-align: center;border:1px solid #ddd;box-sizing: border-box;border-radius: 2px;text-align: left;text-indent:1em;position:relative;text-transform:uppercase;font-size:14px;
      i{position: absolute;top:0;right:10px;bottom:0;line-height:50px;}
    }
    ul{z-index: 123;text-align: center;border-width: 1px;border-color: rgb(215, 215, 215);border-style: solid;background-color: rgb(252, 253, 253);box-shadow: 0px 8px 16px 0px rgba(31, 30, 77, 0.09);box-sizing: border-box;
      position:absolute;top:49px;left:0;background:#fff;color:#caccd1;font-size: 18px;
      width:100%;height:auto;overflow: auto;border:1px solid #ddd;
      &::-webkit-scrollbar{width: 9px;}
      &::-webkit-scrollbar-thumb{background-color: rgb(223, 225, 233);border-radius: 9px;width:9px;}
      li{font-size:18px;line-height:1.5;width:100%;background:#fff;border-bottom:1px solid #ddd;height:50px;line-height:49px;box-sizing:border-box;margin-bottom:0;padding:0 22px;display:flex;justify-content:space-between;cursor: pointer;text-transform:uppercase;font-size:14px;
      &:hover{background:#f4f5f6;color:#5a626d;}
    }
  }
}
</style>

