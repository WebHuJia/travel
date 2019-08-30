<template>
  <div id="assetslog">
    <h4>{{$t('myAssets.financial')}}
      <router-link :to="{name: 'Assets'}">{{$t('myAssets.assetslog')}}</router-link>
    </h4>
    <ul class='tab'>
      <li v-for="(s, i) in tabLists" :key="i" :class="[s.class,s.class === actclassName?'act': '']" >
        <span @click.stop="showLists(s.class)" v-html="$t(s.name)"></span>
      </li>
    </ul>
    <table>
      <thead>
        <tr>
          <th v-for="(s, i) in titleList" :class="[s.class, ((notD || notW) && s.class == 'time') ? 'wd' : '']" :key="i" v-if="s.class !== 'fun'">
            <u v-html="$t(s.title)"></u>
            <span v-if="s.sort"><i class="fa fa-sort-asc" ref="sortdom" @click.stop="sort($event,s.class,'asc')"></i><i class="fa fa-sort-desc" @click.stop="sort($event,s.class,'desc')"  ref="sortdom"></i></span>
          </th>
          <th v-for="(s, i) in titleList" :class="[s.class]" :key="i" v-if="s.class == 'fun' && (notD || notW)"><u v-html="$t(s.title)"></u></th>
        </tr>
      </thead>
      <tbody v-if="!notW && !notD" >
        <tr v-for="(s, i) in list" :key="i">
          <td v-for="(z, q) in titleList" :key="q" class="time" v-if="z.class == 'time'">{{s[z.class]? DefaultJs.getTime(s[z.class]).formatting : ''}}</td>
          <td v-for="(z, q) in titleList" v-if="z.class !== 'fun' && z.class !== 'time'" :key="q" :class="z.class">{{s[z.class]}}</td>
          <td class="fun" v-if="notW || notD">
            <a href="javascript:;" class='notWithdrawOpen'>{{$t('common.moretwo')}}
              <i class="fa fa-angle-right" v-if="i !== actI"></i>
              <i class="fa fa-angle-down" v-if="i == actI"></i>
            </a>
          </td>
        </tr>
        <tr class='notdata' v-if="notdata">
          <td>{{$t('myAssets.not')}}</td>
        </tr>
      </tbody>
      <tbody v-if="notW">
        <tr v-for="(s, i) in WDlist" :key="i" :class="{'MoreShow': i == actI}">
          <td class="time">{{DefaultJs.getTime(s.w_create_time).formatting}}</td>
          <td >{{s.token_name}}</td>
          <td >{{$t('common.withdraw')}}</td>
          <td >{{s.quantity}}</td>
          <td >{{s.coin_balance}}</td>
          <td class="fun">
            <a href="javascript:;" class='notWithdrawOpen' @click.stop="MoreWD(i)">{{$t('common.moretwo')}}
              <i class="fa fa-angle-right" v-if="i !== actI"></i>
              <i class="fa fa-angle-down" v-if="i == actI"></i>
            </a>
            <ul v-if="i == actI">
              <li>{{$t('common.withdraw')}}{{$t('common.address')}}： {{s.withdraw_address? s.withdraw_address : '------'}}</li>
              <li>{{$t('myAssets.totime')}}： {{s.t_create_time ? DefaultJs.getTime(s.t_create_time).formatting: '------'}}</li>
              <li>{{$t('myAssets.tokenId')}}： <a target="_blank" :href="'https://etherscan.io/block/'+ s.block_number">{{s.hash ? s.hash : '------'}}</a></li>
              <li>{{$t('myAssets.state')}}： {{(s.status == 'system-auto-success' || s.status == 'accept-and-success') ? $t('myAssets.complete') : s.status == 'waiting-for-process' ? $t('myAssets.process') : (s.status == 'refuse-and-fail' || s.status == 'system-auto-fail') ? $t('myAssets.fail') : (s.status == 'system-auto-processing' || s.status == 'system-auto-process' || s.status == 'accept-and-processing') ? $t('myAssets.pocessing') :'------'}}</li>
            </ul>
          </td>
        </tr>
        <tr class='notdata' v-if="notdata">
          <td>{{$t('myAssets.not')}}</td>
        </tr>
      </tbody>
      <tbody v-if="notD">
        <tr v-for="(s, i) in WDlist" :key="i" :class="{'MoreShow': i == actI}">
          <td class="time">{{s.w_create_time? DefaultJs.getTime(s.w_create_time).formatting : ''}}</td>
          <td >{{s.token_name}}</td>
          <td >{{$t('common.top')}}</td>
          <td >{{s.quantity}}</td>
          <td >{{s.coin_balance}}</td>
          <td class="fun">
            <a href="javascript:;" class='notWithdrawOpen' @click.stop="MoreWD(i)">{{$t('common.moretwo')}}
              <i class="fa fa-angle-right" v-if="i !== actI"></i>
              <i class="fa fa-angle-down" v-if="i == actI"></i>
            </a>
            <ul v-if="i == actI">
              <li>{{$t('common.top')}}{{$t('common.address')}}： {{s.user_wallet_address}}</li>
              <li>{{$t('myAssets.totime')}}： {{s.t_create_time? DefaultJs.getTime(s.t_create_time).formatting : ''}}</li>
              <li>{{$t('myAssets.tokenId')}}：  <a target="_blank" :href="'https://etherscan.io/block/'+ s.block_number">{{s.hash}}</a></li>
              <li>{{$t('myAssets.state')}}： {{s.status == 'system-auto-success' ? $t('myAssets.complete') : s.status == 'waiting-for-process' ? $t('myAssets.process') : s.status == 'refuse-and-fail' ? $t('myAssets.fail') : ''}}</li>
            </ul>
          </td>
        </tr>
        <tr class='notdata' v-if="notdata">
          <td>{{$t('myAssets.not')}}</td>
        </tr>
      </tbody>
      <tbody v-if="stateData" class="notdata">
        <tr class='loadingdata' v-if="loadingdata">
          <td><loadingcenter /></td>
        </tr>
      </tbody>
    </table>
    <pager style="padding-bottom:30px;" :pageSize="assetsPage.last_page" v-model.trim="pageNo" @on-jump="jump"></pager>
  </div>
</template>
<script>
export default {

  data () {
    return {
      allList: [],
      buyList: [],
      otherList: [],
      depositList: [],
      withdrawList: [],
      list: [],
      actI: '-',
      actclassName: 'allList',
      notW: false,
      notD: false,
      notdata: false,
      stateData: true,
      loadingdata: true,
      allListpage: 1,
      buyListpage: 1,
      otherListpage: 1,
      depositListpage: 1,
      withdrawListpage:1,
      atTab: 'allList',
      pageNo: 1,
      assetsPage: '',
      tabLists: [
        {name: 'myAssets.accountlog',class: 'allList'},
        {name: 'myAssets.waterlog',class: 'buyList'},
        {name: 'myAssets.toplog',class: 'depositList'},
        {name: 'myAssets.turnlog',class: 'withdrawList'},
        {name: 'common.other',class: 'otherList'},
      ],
      titleList: [
        {title: 'common.time', sort: false,class: 'time'},
        {title: 'mentiontoken.tokenName',sort: false,class: 'coinNames'},
        {title: 'common.type', sort: false,class: 'action'},
        {title: 'common.amount',sort: false,class: 'coin_number'},
        {title: 'common.balance',sort: false,class: 'coin_balance'},
        {title: 'common.actions',sort: false,class: 'fun'},
      ],
    }
  },
  created () {
    this.axios.axios.all([this.http ({t: 'all',p: this.allListpage}),this.http ({t: 'buy',p: this.buyListpage}),this.http ({t: 'other',p: this.otherListpage}),this.withdrawAllLog({p:this.withdrawListpage}),this.depositAllLog({p:this.depositListpage})]).then(this.axios.axios.spread((all, buy, other, withdraw, deposit) => {
      this.stateData = false
      this.loadingdata = false
      this.allList = all.data.data
      this.buyList = buy.data.data
      this.otherList = other.data.data
      this.list = this.allList
      this.depositList = deposit.data.data
      this.withdrawList = withdraw.data.data
      this.assetsPage = all.data.page
      this.allListpage = all.data.page
      this.buyListpage = buy.data.page
      this.otherListpage = other.data.page
      this.depositListpage = deposit.data.page
      this.withdrawListpage = withdraw.data.page
      if (this.allList.length == 0) {
        this.notdata = true
      }
    })).catch((error) => {
        console.log(error)
      })
  },
  methods: {
    http (opt) {
      return this.axios.axios({
        method: 'post',
        url:this.DefaultJs.APIURL + '/user/getAllCoinLog',
        headers: {
          'x-device-language': this.$store.state.LANG,
          'XX-Token': localStorage.getItem('token'),
          'XX-Device-Type': this.$store.state.users.device_type
        },
        data: {
          type: opt.t,
          page: opt.p,
          limit: 10,
        },
        mess: '2'
      })
    },
    withdrawAllLog (opt) {
      return this.axios.axiospost({
        url: '/user/withdrawAllLog',
        headers: {
          'x-device-language': this.$store.state.LANG,
          'XX-Token': localStorage.getItem('token'),
          'XX-Device-Type': this.$store.state.users.device_type
        },
        data: {
          page: opt.p,
          limit: 10,
        }
      })
    },
    depositAllLog (opt) {
      return this.axios.axiospost({
        url: '/user/depositAllLog',
        headers: {
          'x-device-language': this.$store.state.LANG,
          'XX-Token': localStorage.getItem('token'),
          'XX-Device-Type': this.$store.state.users.device_type
        },
        data: {
          page: opt.p,
          limit: 10,
        }
      })
    },
    showLists (d) {
      this.atTab = d
      this.pageNo = 1
      if (!this[d] || this[d].length == 0) {
        this.notdata = true
      } else {
        this.notdata = false
      }
      if (d == 'depositList') {
        this.notD = true
        this.notW = false
        this.WDlist = this[d]
      } else if (d == 'withdrawList') {
        this.notW = true
        this.notD = false
        this.WDlist = this[d]
      } else {
        this.list = this[d]
        this.notW = false
        this.notD = false
      }
      this.actI = '-'
      this.actclassName = d
      if (!this[d+'page']) {
        this.assetsPage = {
          current_page: 0,
          last_page: 0,
          per_page: 10,
          total: 0
        }
      } else {
        this.assetsPage = this[d + 'page']
      }
    },
    MoreWD (d) {
      d == this.actI ? this.actI = '-' : this.actI = d
    },
    jump (d) {
      this.pageNo = d
      this.stateData = true
      this.loadingdata = true
      var n = this.pageNo
      if (this.atTab == 'depositList') {
        this.depositAllLog({p:n})
        .then((deposit) => {
          this.stateData = false
          this.loadingdata = false
          this.depositList = deposit.data.data
          this.depositListpage = deposit.data.page
          this.WDlist = deposit.data.data
        }).catch((error) => {
          console.log(error)
        })
      } else if (this.atTab == 'withdrawList') {
        this.withdrawAllLog({p: n})
        .then((withdraw) => {
          this.stateData = false
          this.loadingdata = false
          this.withdrawList = withdraw.data.data
          console.log(this.withdrawList)
          this.withdrawListpage = withdraw.data.page
          this.WDlist = withdraw.data.data
        }).catch((error) => {
          console.log(error)
        })
      } else {
        var type = this.atTab.split('List')[0]
        this.http ({t:type,p: n})
        .then((ret) => {
          this.stateData = false
          this.loadingdata = false
          this[type + 'List'] = ret.data.data
          this.list = ret.data.data
          this[type + 'Page'] = ret.data.page
        }).catch((error) => {
          console.log(error)
        })
      }
    },
  },
  computed: {
    lang () {
      return this.$store.state.LANG
    }
  },
  watch: {
    atTab (n, o) {
      var n = this.pageNo
      if (this.atTab == 'depositList') {
        this.depositAllLog({p:n})
        .then((deposit) => {
          this.stateData = false
          this.loadingdata = false
          this.depositList = deposit.data.data
          this.depositListpage = deposit.data.page
          this.WDlist = deposit.data.data
        }).catch((error) => {
          console.log(error)
        })
      } else if (this.atTab == 'withdrawList') {
        this.withdrawAllLog({p: n})
        .then((withdraw) => {
          this.stateData = false
          this.loadingdata = false
          this.withdrawList = withdraw.data.data
          this.withdrawListpage = withdraw.data.page
          this.WDlist = withdraw.data.data
        }).catch((error) => {
          console.log(error)
        })
      } else {
        var type = this.atTab.split('List')[0]
        this.http ({t:type,p: n})
        .then((ret) => {
          this.stateData = false
          this.loadingdata = false
          this[type + 'List'] = ret.data.data
          this.list = ret.data.data
          this[type + 'Page'] = ret.data.page
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    lang () {
      this.stateData = true
      this.loadingdata = true
      this.axios.axios.all([this.http ({t: 'all',p: this.pageNo}),this.http ({t: 'buy',p: this.pageNo}),this.http ({t: 'other',p: this.pageNo}),this.withdrawAllLog({p:this.pageNo}),this.depositAllLog({p:this.pageNo})]).then(this.axios.axios.spread((all, buy, other, withdraw, deposit) => {
        this.stateData = false
        this.loadingdata = false
        this.allList = all.data.data
        this.buyList = buy.data.data
        this.otherList = other.data.data
        this.list = this[this.atTab.split('List')[0] + 'List']
        this.depositList = deposit.data.data
        this.withdrawList = withdraw.data.data
        this.assetsPage = eval(this.atTab.split('List')[0]).data.page
        this.allListpage = all.data.page
        this.buyListpage = buy.data.page
        this.otherListpage = other.data.page
        this.depositListpage = deposit.data.page
        this.withdrawListpage = withdraw.data.page
      })).catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="less" scoped>
  #assetslog{padding:0 39px;background:#fff;font-size:14px;
    h4{height:84px;line-height:84px;color:#222c38;font-size:16px;border-bottom:1px solid #f5f5f5;font-weight: normal;box-sizing: border-box;
      a{font-weight: normal;float:right;height:84px;line-height:84px;font-size:14px;}
    }
    ul.tab{display: flex;margin:20px 0;
      li{width:87px;height:28px;line-height:28px;color:#969fa9;font-size:14px;cursor: pointer;margin-right:20px;
        span{display: block;width:100%;height:100%;line-height: 28px;text-align:center;font-size:14px;
        }
        &.act{background:#357ce1;color:#fff;border-radius: 2px;}
      }
    }
    table{display: block;text-align:left;padding-bottom:40px;font-size:14px;position:relative;min-height:400px;
      thead{align-items: center;
        height:44px;line-height:44px;color:#969fa9;font-size:14px;display: flex;background:#fbfbfb;
        u{font-size:14px;font-weight: normal;}
      }
      tbody{margin-top:30px;display: block;
        &.notdata{align-items:center;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          width: 200px;
          height: 200px;
          td{width:auto;white-space: nowrap;}
        }
        tr{display: flex;height:50px;transition:.2s;
          &.MoreShow{height:180px;transition: .2s;}
        }
      }
      tr{position: relative;font-size:14px;
        th{width:230px;text-align: center;}
        td{width:230px;height:50px;line-height:50px;border-bottom:1px solid #f5f5f5;font-size:14px;text-align:center;
          ul{width:1132px;background-color: rgb(255, 255, 255);box-shadow: -4px 0px 16px 0px rgba(236, 236, 236, 0.55);height: 105px;padding:30px 20px;box-sizing: border-box;text-align: left;position: absolute;top:50px;left:0;display:flex;flex-flow:wrap;z-index:123;font-size:14px;
            li{flex-shrink: 0;margin-bottom:10px;font-size:14px;
              a{color:#357ce1;font-size:14px;}
              &:nth-child(1n) {width:70%;}
              &:nth-child(2n) {width:30%;}
            }
          }

        }
        .time{width:230px;flex-shrink: 0;text-indent: 1em;
          &.wd{width:254px;}
        }
        .fun{width:100px;flex-shrink: 0;text-align: center;}
        a{color:#222c38;font-size:14px;}
        &.loadingdata,&.notdata{text-align: center;justify-content: center;height:200px;display: flex;justify-content: center;align-items: center;
          td{width:auto;white-space: nowrap;}
        }
      }
    }
  }
</style>


