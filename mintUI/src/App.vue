<template>
  <div id="app">
    <!-- header 区域 -->
    <mt-header fixed title="Vue项目">
      <span @click="go" slot="left">
        <mt-button icon="back" v-show="flag">返回</mt-button>
      </span>
    </mt-header>
    <!-- 组件 view-roter 区域 -->
    <div class="contain">
      <!-- keep-live 是vue提供的一个抽象组件，能在组件切换过程中，将状态保持在内存中，防止重复渲染DOM -->
      <keep-alive>
        <transition mode="out-in">
          <router-view></router-view>
        </transition>
      </keep-alive>
    </div>
    <!-- tabbar 区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item1" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="b">{{this.$store.getters.getAllCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      flag: false
    }
  },
  created () {
    if (this.$route.path === '/home') {
      this.flag = false
    } else {
      this.flag = true
    }
  },
  methods: {
    go () {
      console.log(this.$route)
      this.$router.go(-1)
    }
  },
  watch: {
    '$route.path': function (newVal) {
      if (newVal === '/home') {
        this.flag = false
      } else {
        this.flag = true
      }
    },
    // 监听路由变化, 每次切换页面，让页面都固定到顶部
    '$route': function (to, from) {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("./assets/reset");
#app {
  padding-top: 40px;
  padding-bottom: 50px;
  $color: red;
  .contain {
    overflow-x: hidden;
  }
  h1 {
    color: $color;
  }
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
.mui-bar-tab .mui-tab-item1 {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
.mui-bar-tab .mui-tab-item1.mui-active {
  color: #007aff;
}
.mui-bar-tab .mui-tab-item1 .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item1 .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
