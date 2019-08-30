<template>
  <transition name="fade">
    <div class="message" :class="type" v-if="visible">
      <i class="fa " :class="'fa-'+type"></i>
      <div class="content">{{content}}
        <i v-if="hasClose" class="btn-close iconfont icon-close" @click.stop="visible=false"></i>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Message",
  data () {
    return {
      content: '',
      time: 2000,
      visible: false,
      type: 'exclamation',// 'check', 'exclamation', 'close'
      hasClose:false,
      autotime: null
    }
  },
  created() {
    this.autotime = setTimeout(() => {
      this.visible = false
    }, this.time)
  }
}
</script>
<style lang="less" scoped>
  .message{
    border-radius: 2px;
    box-shadow: 0px 8px 16px 0px rgba(24, 24, 35, 0.24);
    display: flex;
    min-width: auto;padding: 0 .3rem;width: auto;white-space: nowrap;
    border-radius: 2px;
    position: fixed;
    z-index: 12345;
    left: 50%;
    font-size: 16px;
    top: 220px;
    height:38px;
    align-items: center;
    transform: translateX(-50%);
    background-color: rgb(242, 243, 248);
    transition: opacity .3s,transform .4s;
    overflow: hidden;
    color:#222c38;
    &.check{}
    &.exclamation{}
    i.fa-check{color:#fff;margin-right:10px;background:#3ed786;width:20px;height:20px;border-radius:50%;text-align: center;line-height:20px;font-size:14px;}
    i.fa-close{color:#fff;margin-right:10px;background:red;width:20px;height:20px;border-radius:50%;text-align: center;line-height:20px;font-size:14px;}
    i.fa-exclamation{color:#fff;margin-right:10px;background:#ff5e5e;width:20px;height:20px;border-radius:50%;text-align: center;line-height:20px;font-size:14px;}
  }
</style>
