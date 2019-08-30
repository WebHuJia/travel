<template>
  <ul id="exponent">
    <li v-for="(exp, index) in exponentList" :key="index">
      <span class='clear'>
        <i class='fl' v-html="$t(exp.name)"></i>
        <em class='fr' :class="{'not': !exp.fluctuate, 'up': (exp.fluctuate && exp.fluctuate > 0), 'red': (exp.fluctuate && exp.fluctuate < 0)}">{{exp.fluctuate > 0 ? '+' : ''}}{{exp.fluctuate}}%</em>
      </span>
      <p>{{exp.about}}</p>
    </li>
  </ul>
</template>
<script>
export default {
  data () {
    return {
      exponentList: [
        {
          name: 'exponent.sum',
          //  fluctuate: '-1',
          about: '------'
        }, {
          name: 'exponent.oneday',
          //  fluctuate: '-1',
          about: '------'
        }, {
          name: 'exponent.btc',
          fluctuate: '--',
          about: '-----'
        }, {
          name: 'exponent.eth',
          fluctuate: '--',
          about: '-----'
        }, {
          name: 'exponent.eos',
          fluctuate: '--',
          about: '-----'
        }
      ]
    }
  },
  mounted () {
    this.exponentaxiosget()
  },
  computed: {
    lang () {
      return this.$store.state.LANG
    }
  },
  methods: {
    exponentaxiosget () {
      this.axios.axiosget({
        url: '/portal/homeGlobalJson',
        timeout: ''
      }).then((ret) => {
        this.exponentList = [
          {
            name: 'exponent.sum',
            //  fluctuate: '-1',
            about: this.$store.state.SYMBOL + (ret.data.data.total_market_cap == null ? '------' : this.DefaultJs.toThousands(ret.data.data.total_market_cap.toFixed(2)).split(',.').join('.'))
          }, {
            name: 'exponent.oneday',
            //  fluctuate: '-1',
            about: this.$store.state.SYMBOL + (ret.data.data.total_volume_24h == null ? '------' : this.DefaultJs.toThousands(ret.data.data.total_volume_24h.toFixed(2)).split(',.').join('.'))
          }, {
            name: 'exponent.btc',
            fluctuate: ret.data.data.btc_percent_change_24h == null ? '------' : ret.data.data.btc_percent_change_24h,
            
            about: this.$store.state.SYMBOL + (ret.data.data.btc == null ? '------' : this.DefaultJs.toThousands(ret.data.data.btc.toFixed(2)).split(',.').join('.'))
          }, {
            name: 'exponent.eth',
            fluctuate: ret.data.data.eth_percent_change_24h == null ? '------' : ret.data.data.eth_percent_change_24h,
            about: this.$store.state.SYMBOL + (ret.data.data.eth == null ? '------' : this.DefaultJs.toThousands(ret.data.data.eth.toFixed(2)).split(',.').join('.'))
          }, {
            name: 'exponent.eos',
            fluctuate: ret.data.data.eos_percent_change_24h == null ? '------' : ret.data.data.eos_percent_change_24h,
            about: this.$store.state.SYMBOL + (ret.data.data.eos == null ? '------' : this.DefaultJs.toThousands(ret.data.data.eos.toFixed(2)).split(',.').join('.'))
          }
        ]
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  watch: {
    lang (n, o) {
      this.exponentaxiosget()      
    }
  }
}
</script>
<style lang="less" scoped>
  #exponent{height:150px;width:100%;background:#0a151e;display:block;overflow: hidden;line-height:200px;
    li{width:20%;height:70px;border-right:1px solid rgba(158,181,202,.3);display:inline-block;box-sizing:border-box;
      span{display: block;margin:0 38px 16px 46px;
        i{color:rgba(158,181,202,.5);font-size:14px;}
        em{font-size:16px;line-height:100%;padding:6px 16px;border-radius: 3px;
          &.not{opacity: 0;}
          &.up{background: rgba(27,150,128,.2);color:#0da88b;}
          &.red{color:#ff2b1d;background:#2a121a;}
        }
      }
      p{color:#9eb5ca;font-size:26px;line-height:100%;margin-left:46px;overflow: hidden;text-overflow: ellipsis;}
    }
  }
</style>
