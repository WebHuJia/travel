<template>
    <div>
      <Lottery :config="Lotteryconfig"></Lottery>
    </div>
</template>

<script>
  import Lottery from './lottery'
    export default {
        name: "error404",
      components: {
          Lottery
      },
      data () {
          return {
            Lotteryconfig: {
              roundness_total: 7,
              roundness_bg_img: '/static/staticfile/images/lottery/lottery.png',
              roundness_start_img: '/static/staticfile/images/lottery/ETH.png',
              completeRollEvent () {console.log(123)}
            }
          }
      }
    }
</script>

<style scoped lang="less">
  div{width:100%;height:100%;}
</style>
