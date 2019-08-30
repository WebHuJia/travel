<template>
<!-- :endTime="endTime" :callback="callback" :endText="endText" -->
    <strong>
        <slot>
            {{$t(content)}}
        </slot>
    </strong>
</template>
<script>
export default {
  data () {
    return {
    content: '',
    timer: ''
    }
  },
  props: {
    endTime: {
      type: String,
      default: ''
    },
    endText: {
      type: String,
      default: 'projects.ended'
    },
    callback : {
      type: Function,
      default: function () {}
    }
  },
  mounted () {
    this.countdowm(this.endTime)
  },
  methods: {
    countdowm(timestamp) {
      let self = this;
      this.timer = setInterval(() => {
        let nowTime = new Date();
        let endTime = new Date(timestamp * 1000);
        let t = endTime.getTime() - nowTime.getTime();
        if (t>0) {
          let day = Math.floor(t / 86400000);
          let hour=Math.floor((t / 3600000)%24);
          let min=Math.floor((t / 60000)%60);
          let sec=Math.floor((t / 1000)%60);
          hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          let format = '';
          if (day > 0) {
              format =  `${day} ${this.$t('common.times.day')} ${hour} ${this.$t('common.times.hour')} ${min} ${this.$t('common.times.minute')} ${sec} ${this.$t('common.times.secound')}`;
          }
          if (day <= 0 && hour > 0 ) {
              format = `${hour} ${this.$t('common.times.hour')} ${min} ${this.$t('common.times.minute')} ${sec} ${this.$t('common.times.secound')}`;
          }
          if (day <= 0 && hour <= 0) {
              format =`${min} ${this.$t('common.times.minute')} ${sec} ${this.$t('common.times.secound')}`;
          }
          this.content = format;
          } else {
            clearInterval(this.timer);
            this.content = this.endText;
            this._callback();
          }
          },1000);
        },
      _callback() {
      if (this.callback && this.callback instanceof Function) {
        this.callback(...this);
      }
    }
  },
  beforeDestroy () {
    window.clearInterval(this.timer)
    this.timer = ''
  }
}
</script>