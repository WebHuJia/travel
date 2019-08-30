<template>
  <ul id="menu" :style="{'height':lists.length * 50 + 'px'}" >
    <li v-for="(l, index) in lists" :key="index" @click.stop="titlename(l.name)" >
      <router-link :class="$store.state.LANG == 'zh-cn' ? '' : 'EnTextIndex'" :to="{name:l.url, params: {title: l.name}}" :data-title="l.name" v-html="$t(l.name)"></router-link>
    </li>
  </ul>
</template>
<script>
export default {
  data () {
    return {
      oneopen: '',
      lists: ''
    }
  },
  created () {
    this.oneopen = true
    this.lists = this.$store.state.users.menuList
  },
  methods: {
    titlename (d) {
      this.$store.state.users.subhead = ''
      this.$emit('titlename', {titlename: d})
    }
  },
  computed: {
    lang () {
      return this.$store.state.LANG
    }
  },
  watch: {
    oneopen (n, o) {
      if (n) {
        var d = document.querySelector('#menu li a.router-link-active').dataset.title
        //  d = 'menu.'+ d + '.title'
        this.$emit('titlename', {titlename: d})
      }
    },
    lang (n, o) {
      this.$nextTick(() => {
        var d = document.querySelector('#menu li a.router-link-active').dataset.title
        this.$emit('titlename', {titlename: d})
      })
    }
  }
}
</script>
<style lang="less" scoped>
  #menu{background-color: rgb(255, 255, 255);width: 197px;margin-right:20px;flex-shrink:0;
    li{height:50px;border-bottom:1px solid #f3f3f3;box-sizing:border-box;
      a{color:#222c38;font-size:16px;display: block;height:50px;line-height:50px;text-align: left;text-indent: 3em;box-sizing: border-box;
        &.router-link-active{color:rgb(53, 124, 225);border-left:6px solid rgb(53, 124, 225);text-indent:2.6em;}
        &.EnTextIndex{text-indent: 2em;
          &.router-link-active{text-indent:1.6em;}
        }
      }
    }
  }
</style>
