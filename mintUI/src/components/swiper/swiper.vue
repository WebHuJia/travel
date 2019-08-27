<template>
  <div>
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="item of imgurl" :key="item.i">
        <img :src="item" alt />
        <!-- <img src="../../assets/images/muwu.jpg" alt=""> -->
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: ['imgurl']
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item:nth-child(1) {
    background: red;
  }
  .mint-swipe-item:nth-child(2) {
    background: rgb(102, 255, 0);
  }
  .mint-swipe-item:nth-child(3) {
    background: rgb(47, 0, 255);
  }
}
</style>
