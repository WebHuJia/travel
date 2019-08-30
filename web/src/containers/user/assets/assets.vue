<template>
  <div id="assets">
    <div class='content'>
      <div class='funmodule'>
        <div>
          <section>
            <input type="text" v-model.trim="token_name">
            <i class="fa fa-search" @click.stop="search" aria-hidden="true"></i>
          </section>
          <p v-if="false">
            <i v-if="smallassets == 1" @click.stop="onoff" class="fa fa-toggle-on"></i>
            <i v-if="smallassets == 0" @click.stop="onoff" class="fa fa-toggle-off"></i>
            {{$t('myAssets.hidesmall')}}
            <i class="fa fa-question-circle-o" title="少于0.1USDT的资产" alt="少于0.1USDT的资产"></i>
          </p>
        </div>
        <router-link :to="{name: 'AssetsLog'}">{{$t('myAssets.financial')}}</router-link>
      </div>
      <table>
        <thead>
          <tr>
            <th v-for="(s, i) in titleList" :class="[s.class,{'enfunu': (s.class =='fun' &&$store.state.LANG !== 'zh-cn')}]" :key="i">
              <u v-html="$t(s.title)"></u>
              <span v-if="s.sort"><i class="fa fa-sort-asc" ref="sortdom" @click.stop="sort($event,s.class,'asc')"></i><i class="fa fa-sort-desc" @click.stop="sort($event,s.class,'desc')"  ref="sortdom"></i></span>
            </th>
          </tr>
        </thead>
        <tbody v-if="!notdata && !$store.state.assets.assetsLoading">
          <tr v-for="(s, i) in showcoinslists" :key="i" :data-coinId='s.coin_id' :data-officialToken="s.is_official_token">
            <td v-for="(z, q) in titleList" v-if="z.class !== 'fun'" :key="q" :class="z.class">{{z.class == 'value' ? ($store.state.LANG == 'zh-cn' ? s['valueToCNY'] : s['valueToUSD']) : s[z.class]}}</td>
            <td class="fun">
              <a href="javascript:;" @click.stop="showGetDepositAddress({d:s.coin_id, token_name: s.token_name})" v-if="s.is_official_token === 1" >{{$t('common.top')}}</a>
              <a href="javascript:;" v-if="s.is_official_token !== 1" >&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a href="javascript:;" v-if="s.is_withdraw_open === 1" @click.stop="showWithdraw ({d:s.coin_id, a:s.coin_available, token_name:s.token_name})">{{$t('common.withdraw')}}</a>
              <a href="javascript:;" @click.stop="notWithdrawalert" v-if="s.is_withdraw_open !== 1"  class='notWithdrawOpen'>{{$t('common.withdraw')}}</a>
              <a v-if="s.coin_id !== 37 && s.coin_id == 25" :href="s.coin_id == 25 ? 'https://www.coinex.com/exchange?currency=eth&dest=cody#limit' : 'javascript:;'" :target="s.coin_id == 25? '_blank' : '_self'">{{$t('common.buy')}}</a>
              <router-link v-if="s.coin_id !== 37 && s.coin_id !== 25" :to="{name: 'Project',query:{id: s.coin_id}}">{{$t('common.buy')}}</router-link>
            </td>
          </tr>
        </tbody>
        <tbody v-if="stateData">
          <tr class='notdata' v-if="notdata">
            <td>{{$t('myAssets.not')}}</td>
          </tr>
          <tr class='loadingdata' v-if="$store.state.assets.assetsLoading">
            <td><loadingcenter /></td>
          </tr>
        </tbody>
      </table>
      <pager style="padding-bottom:30px;" v-if="false" :pageSize="assetsPage.last_page" v-model.trim="pageNo" @on-jump="jump"></pager>
    </div>
    <div id="pop" v-if="showpop.onoff">
        <div class='extract' v-if="showpop.showpop_extract">
          <h3>{{showtoken_name}}{{$t('myAssets.BTCup')}}</h3>
          <i class='fa fa-close' @click.stop="closepop,showpop.showpop_extract=false"></i>
          <ul>
            <li>
               <label>{{$t('userCenter.withdrawAddress')}}</label>
              <section>
                <input @focus="$store.state.users.error.tokenvalue = false" :class="[{'errorborder': $store.state.users.error.tokenvalue}]" type="text" v-model.trim="tokenvalue">
                <span @click.stop="showWithdrawLists = !showWithdrawLists">{{$t('myAssets.selectsite')}}<i data-v-0b9ea0db="" class="fa fa-sort-desc"></i></span>
                <ul v-if="showWithdrawLists">
                  <li @click.stop="typetab($event)" v-for="(s, i) in withdrawAddressList" :key="i">
                    <span>{{s.address_type}}</span>
                    <strong>{{s.withdraw_address}}</strong>
                  </li>
                </ul>
              </section>
              <em>{{withdrawInfo}}</em>
            </li>
            <li>
               <label>{{$t('common.amount')}}</label>
              <section>
                <input @focus="$store.state.users.error.quantitynum = false" :class="[{'errorborder': $store.state.users.error.quantitynum}]" type="text" v-model.trim="quantitynum">
                <span>{{quantity.token_name}}</span>
              </section>
              <span>{{$t('myAssets.wiamout')}}{{mention}} {{quantity.token_name}}<b>{{$t('myAssets.smallamout')}}{{quantity.withdraw_coin_min}} {{quantity.token_name}}</b></span>
              <strong>{{$t('myAssets.fees')}}: {{quantity.withdraw_fee}} {{quantity.token_name}}</strong>
            </li>
            <li>
              <popcode @googlecode='googlecode' :not='not' class="pop" @verificationCode='verificationCode'></popcode>
            </li>
            <li>
              <p>{{$t('myAssets.pstitle')}}</p>
              <span>{{declare}}</span>
            </li>
          </ul>
          <button @click.stop="withdraw">{{$t('common.withdraw')}}</button>
        </div>
        <div class='up' v-if="showpop.showpop_get">
          <h3>{{showtoken_name}}{{$t('myAssets.BTCTopUp')}}</h3>
          <i class='fa fa-close' @click.stop="closepop,showpop.showpop_get=false"></i>
          <img :src="getDepositAddressUrl" alt="">
          <span>{{getDepositAddressText}}</span>
          <button @click.stop="copyurl" id="copy-url">{{$t('common.copyupurl')}}</button>
          <dl>
            <dt>{{$t('common.atten')}}</dt>
            <dd v-for="(s, i) in info" :key="i">{{i+1}}、{{s}}</dd>
          </dl>
        </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      titleList: [
        {title: 'mentiontoken.tokenName',sort: true,class: 'token_name',sortf: 'desc'},
        {title: 'projects.total', sort: true,class: 'coin_balance', sortf: 'desc'},
        {title: 'myAssets.usable', sort: true,class: 'coin_available', sortf: 'desc'},
        {title: 'myAssets.lock',sort: true,class: 'coin_locked', sortf: 'desc'},
        {title: 'myAssets.extrart',sort: true,class: 'coin_withdrawing', sortf: 'desc'},
        {title: 'myAssets.worth',sort: true,class: 'value', sortf: 'desc'},
        {title: 'mentiontoken.operation',sort: false,class: 'fun', sortf: 'desc'},
      ],
      coinslists: '',
      showcoinslists: '',
      searchcoinslists: '',
      kyc: false,
      userSumAssets: '-----',
      assetsToETH: '-----',
      assetsToBTH: '-----',
      pageNo: 1,
      smallassets: 0,
      token_name: '',
      info: ['1、请勿向上述地址充值任何非 ETH 资产，否则资产将不可找回。', '2、最小充值金额：0.01 ETH，小于最小金额的充值将不会上账且无法退回。', '3、您充值至上述地址后，需要整个网络节点的确认。', '4、您的充值地址可能会改变，重复充值前请再次确认地址，我们会尽量通过网站公告及邮件通知您！'],
      getDepositAddressText: '',
      getDepositAddressUrl: '',
      notdata: false,
      loadingdata: true,
      withdrawId: '' || 27,
      stateData: true,
      showpop: {
        onoff: true,
        showpop_get: false,
        showpop_extract: false
      },
      not: true,
      withdrawInfo: '',
      quantity: '',
      declare: '',
      mention: 0,
      withdrawAddressList: '',
      tokenvalue: '',
      showWithdrawLists: false,
      quantitynum: '',
      google_code: '',
      verification_code: '',
      assetsPage: '',
      sortonoff: false,
      order: '',
      sortType: '',
      showtoken_name: ''
    }
  },
  created () {
    // if (this.$store.state.assets.assets) {
    //   this.coinslists = this.$store.state.assets.assets.coins
    //   this.showcoinslists = this.$store.state.assets.assets.coins
    //   this.userSumAssets = this.$store.state.assets.assets.userSumAssets
    //   this.assetsToETH = this.$store.state.assets.assets.assetsToETH
    //   this.assetsToBTH = this.$store.state.assets.assets.assetsToBTH
    //   this.$store.state.assets.assetsLoading = false
    // } else {
      this.http()
    // }
    this.getDepositAddress()
    this.axios.axiosget({
      url: '/user/withdrawAddressList',
      params: {
        page: this.pageNo,
        limit: 100
      }
    }).then((ret) => {
      this.withdrawAddressList = ret.data.data
    }).catch((error) => {
        console.log(error)
      })
  },
  methods: {
    copyurl () {
      this.$copyText(this.getDepositAddressText).then((e) => {
        this.$message({
          content: this.$t('common.success'),
          type: 'check'
        })
      }, (e) => {
        this.$message({
          content: 'Can not copy',
          type: 'check'
        })
      })
    },
    jump (d) {
      this.pageNo = d
      this.http()
    },
    onoff () { // 小额资产显示开关
      if (this.smallassets === 1) {
        this.smallassets = 0
      } else {
        this.smallassets = 1
      }
    },
    search () { // 搜索功能
      this.notdata = false
      this.$store.state.assets.assetsLoading = true
      this.stateData = true
      if (!this.token_name) {
        this.showcoinslists = this.coinslists
        this.$store.state.assets.assetsLoading = false
        this.stateData = false
        return
      }
      this.axios.axiosget({
        url: '/user/assetsSearchToken',
        params: {
          small: this.smallassets,
          token_name: this.token_name
        }
      }).then((ret) => {
        if (ret.data.code == 1) {
          this.$store.state.assets.assetsLoading = false
          this.stateData = false
          if (ret.data.data.coins.length) {
            this.showcoinslists = ret.data.data.coins
            // this.showcoinslists.map((obj, index) => {
            //   obj.currency = this.$t('common.currency') + obj.currency
            // })
          } else {
            this.notdata = true
            this.stateData = true
          }
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    sort (event,t,d) { // 排序
      this.token_name = ''
      var dom = this.$refs.sortdom
      for (var i = 0; i < dom.length; i++) {
        dom[i].style.color = '#e1e6e9'
      }
      this.order = d
      this.sortType = t
      event.currentTarget.style.color = "#b0b7bf"
      this.http()
    },
    http () { // 我的资产
      this.coinslists = ''
      this.showcoinslists = ''
      this.$store.state.assets.assetsLoading = true
      this.stateData = true
      this.axios.axiosget({
        url: '/user/assets',
        params: {
          type:this.sortType,order:this.order

        }
      }).then((ret) => {
        if (ret.data.code == 1) {
          // ret.data.data.coins.map((obj, index) => {
          //   obj.currency = this.$t('common.currency') + obj.currency
          // })
          this.$store.state.assets.assetsLoading = false
          this.stateData = false
          this.coinslists = ret.data.data.coins
          this.showcoinslists = ret.data.data.coins
          this.userSumAssets = ret.data.data.userSumAssets
          this.assetsToETH = ret.data.data.assetsToETH
          this.assetsToBTH = ret.data.data.assetsToBTH
          this.$store.state.assets.assets = ret.data.data
          this.assetsPage = ret.data.page
        }
      }).catch((error) => {
          console.log(error)
        })
    },
    getDepositAddress (d) { // 充值申请api
      if(this.$store.state.assets.DepositAddress && this.$store.state.assets.DepositAddress.lang === this.$store.state.LANG) {
        this.getDepositAddressText = this.$store.state.assets.DepositAddress.depositAddressETH
        this.getDepositAddressUrl = 'data:image/png;base64,' + this.$store.state.assets.DepositAddress.depositAddressETHQrcode
        this.info = this.$store.state.assets.DepositAddress.info
        return
      }
      this.axios.axiospost({
        url: '/user/getDepositAddress',
        data: {id: d || 25}
      }).then((ret) => {
        if (ret.data.code == 1) {
          this.getDepositAddressText = ret.data.data.depositAddressETH
          this.getDepositAddressUrl = 'data:image/png;base64,' + ret.data.data.depositAddressETHQrcode
          this.info = ret.data.data.info
          this.$set(ret.data.data, 'lang', this.$store.state.LANG)
          this.$store.state.assets.DepositAddress = ret.data.data
        }
      }).catch((error) => {
          console.log(error)
        })
    },
    showGetDepositAddress (opt) { // 充值按钮
      this.showtoken_name = opt.token_name
      this.showpop.onoff = true
      this.showpop.showpop_extract = false
      this.showpop.showpop_get = true
      this.getDepositAddress(opt.d)
    },
    closepop (d) { // 关闭弹窗
      this.showpop.onoff = !this.showpop.onoff
    },
    notWithdrawalert () { // 禁止提币
      alert(this.$t('myAssets.notw'))
    },
    verificationCode (d) { // 验证码
      this.verification_code = d.code
    },
    googlecode (d) { // 谷歌验证码
      this.google_code = d.code
    },
    withdraw () { // 提币申请
      var codedata = null
      if (!this.tokenvalue) {
        this.$message({
          content: this.$t('common.nottokenvalue')
        })
        this.$store.state.users.error.tokenvalue = true
        return
      }
      if (!this.quantitynum) {
        this.$message({
          content: this.$t('common.fullquantitynum')
        })
        this.$store.state.users.error.quantitynum = true

        return
      }
      if (!this.verification_code && !this.google_code) {
        this.$message({
          content: this.$t('common.notcode')
        })
        this.$store.state.users.error.code = true
        return
      }
      if (this.verification_code) {
        codedata = {
          verification_code: this.verification_code
        }
      } else if (this.google_code) {
        codedata = {
          google_code: this.google_code,
        }
      }
      this.axios.axiospost({
        url: '/user/withdraw',
        data: {
          id: this.withdrawId,
          withdraw_address: this.tokenvalue,
          quantity: this.quantitynum,
          ...codedata
        }
      }).then((ret) => {
        if (ret.data.code == 1) {
          this.$message({
            content: ret.data.msg,
            type: 'check'
          })
        }
        if (ret.data.code == 0) {
          this.$store.state.users.errorText = ret.data.msg
          this.$message({
            content: ret.data.msg
          })
          if (ret.data.msg == '请先完成实名认证' || ret.data.msg == 'Please complete the KYC first') {
            this.$router.push({name: 'Kyc'})
          }
          return
        }
        this.showpop.onoff = false
        this.showpop.showpop_extract = false
        this.withdrawId = ''
        this.tokenvalue = ''
        this.quantitynum = ''
        this.google_code = ''
        this.verification_code = ''
        this.http()
      }).catch((error) => {
        console.log(error)
      })
    },
    showWithdraw (opt) { // 显示提币申请-- 信息
      this.showtoken_name = opt.token_name
      this.showpop.onoff = true
      this.showpop.showpop_extract = true
      this.showpop.showpop_get = false
      this.withdrawId = opt.d;
      this.mention = opt.a;
      this.withdrawInfo = '';
      this.quantity = '';
      this.declare = '';
      this.axios.axiosget({
        url: '/user/withdrawInfo',
        params: {
          coin_id: this.withdrawId
        }
      }).then((ret) => {
        this.$set(ret.data.data, 'lang', this.$store.state.LANG)
        this.withdrawInfo = ret.data.data.withdrawInfo
        this.quantity = ret.data.data.quantity
        this.declare = ret.data.data.declare
        this.$store.state.assets.Withdraw = ret.data.data
      }).catch((error) => {
        console.log(error)
      })
    },
    typetab (event) { // 提币地址
      this.tokenvalue = event.currentTarget.querySelector('strong').innerHTML
      this.showWithdrawLists = false
    }
  },
  computed: {
    lang () {
      return this.$store.state.LANG
    }
  },
  watch: {
    token_name (n, o) {
      if (n.length <= 0) {
        this.showcoinslists = this.coinslists
        this.notdata = false
        this.$store.state.assets.assetsLoading = true
        this.stateData = true
        this.http()
      }
    },
    smallassets () {
      this.notdata = false
      this.$store.state.assets.assetsLoading = true
      this.stateData = true
      this.http ()
    },
    lang () {
      this.getDepositAddress()
      this.axios.axiosget({
        url: '/user/withdrawAddressList',
        params: {
          page: this.pageNo,
          limit: 100
        }
      }).then((ret) => {
        this.withdrawAddressList = ret.data.data
      }).catch((error) => {
          console.log(error)
        })
      this.axios.axiosget({
        url: '/user/withdrawInfo',
        params: {
          coin_id: this.withdrawId
        }
      }).then((ret) => {
        this.withdrawInfo = ret.data.data.withdrawInfo
        this.quantity = ret.data.data.quantity
        this.declare = ret.data.data.declare
      }).catch((error) => {
        console.log(error)
      })
      // this.http()
    },
  }
}
</script>
<style lang="less" scoped>
  #assets{width:1200px;margin:0 auto;
    .content{
      .funmodule{height:84px;margin-bottom:1px;background:#fff;display:flex;padding:26px 40px;box-sizing:border-box;align-items:center;justify-content:space-between;
        div{display: flex;align-items: center;
          section{border-width: 1px;border-color: rgb(215, 215, 215);border-style: solid;border-radius: 2px;background-color: rgb(255, 255, 255);width: 197px;height: 31px;font-size:14px;box-sizing:border-box;margin-right: 36px;display:flex;
            input{width:100%;height:100%;text-indent: 1em;}
            i{line-height:28px;padding:0 6px;}
          }
          p{display: flex;align-items:center;
            i.fa{font-size:28px;margin:0 10px 0 0;
              &.fa-toggle-on{color:#357ce1;}
            }
          }
          i.fa{font-size:20px;margin-left:10px;cursor: pointer;
            &.fa-search{margin:0;color:#d7d7d7;-webkit-text-stroke:1px #fff;color:#d7d7d7;}
          }
        }
        a{color:#357ce1;font-size:14px;}
      }
      div{background: #fff;overflow: hidden;
        & /deep/ ul{margin:50px auto;}
      }
    }
    table{background: #fff;padding:0 40px 40px;display:block;font-size:14px;color:#222c38;
      thead{color:#969fa9;font-size:16px;display: flex;flex-flow:column;
        tr{font-size:14px;}
        th{display: flex;align-items:center;}
        u{font-size:14px;font-weight: normal;}
      }
      tbody{min-height:150px;display: block;display: flex;flex-flow:column;color:#222c38;}
      th,td{display: block;font-size:14px;}
      tr{height:50px;line-height:50px;display:flex;align-items:center;font-size:14px;
        &.loadingdata,&.notdata{justify-content: center;}
        &.notdata{
          td{width:auto;text-align: center;white-space: nowrap;}
        }
        &.loadingdata{
          height:200px;
          td{width:200px;height:200px;}
        }
        th{width:200px;text-align:left;
          span{display: inline-block;cursor: pointer;color:#e1e6e9;margin-left:6px;
            i{height:8px;line-height:100%;overflow: hidden;display:block;width:10px;
              &.fa-sort-desc{line-height:10%;}
            }
          }
        }
        th.fun{text-indent:.6em;
          &.enfunu{text-indent: 0;}
        }
        td{width:200px;
          &.fun{display: flex;
            a{width:50px;text-align:center;font-size:14px;
              &.notWithdrawOpen{color:#969fa9;}
            }
          }
        }
      }
      a{color:#357ce1;margin:0 20px 0 0;
        &:last-child{margin:0;}
      }
      .fun{width: 250px;}
    }
    #pop{
      div{width:584px;height:800px;position:fixed;top:0;left:0;margin:auto;bottom:0;right:0;z-index: 12345;background:#fff;padding:40px 60px 20px;box-sizing: border-box;
        box-shadow: -6.364px 6.364px 36px 0px rgba(31, 30, 77, 0.2);border-radius:2px;
        i.fa-close{position:absolute;top:20px;right:26px;font-size:28px;cursor: pointer;}
        &.up{height:720px;
          h3{margin-bottom:20px;color:#222c38;font-size:22px;}
          img{width:120px;height:120px;display: block;margin:40px auto 30px;}
          span{color:#9194a4;font-size:14px;display:block;margin:0 auto 20px;text-align: center;}
          button{width:140px;height:40px;line-height:40px;color:#9194a4;font-size:14px;background: #f5f5f5;display: block;margin:0 auto;}
          dl{padding-top:30px;border-top:1px solid #f5f5f5;margin-top:40px;
            dt{color:#222c38;font-size: 14px;margin-bottom: 20px;}
            dd{color:#9194a4;font-size: 14px;line-height:1.7;margin-bottom:10px;}
          }
        }
        &.extract{
          h3{margin-bottom:20px;color:#222c38;font-size:22px;}
          li{margin-bottom:20px;color:#9194a4;font-size:14px;position:relative;
            &:last-child{margin-bottom:0;}
            label{margin-bottom:10px;color:#9194a4;font-size: 14px;display: block;}
            input{width:462px;height:45px;background:#fcfdfd;border:1px solid #d7d7d7;border-radius: 2px;display: block;margin-bottom:10px;text-indent:1em;font-size:13px;}
            p{color:#222c38;font-size:14px;margin-bottom:10px;}
            strong{display: block;font-size:14px;font-weight: normal;}
            b{font-weight: normal;font-size:14px;}
            span{font-size:14px;display: flex;justify-content: space-between;margin-bottom:10px;line-height:1.2;}
            em{font-size:14px;line-height:1.2;color:#d9534f;}
            & /deep/ div#code{padding:0;box-shadow:none;
              position: relative;width:462px;height:auto;
              label{font-size:14px;margin-bottom:10px;}
              #verify{margin:0 0 10px;}
            }
            section{position: relative;height:45px;line-height:45px;margin-bottom:10px;
              ul{z-index: 123456;text-align: center;border-width: 1px;border-color: rgb(215, 215, 215);border-style: solid;background-color: rgb(252, 253, 253);box-shadow: 0px 8px 16px 0px rgba(31, 30, 77, 0.09);box-sizing: border-box;
                position:absolute;top:46px;left:0;background:#fff;color:#caccd1;font-size: 18px;
                width:100%;max-height:250px;height:auto;overflow: auto;border:1px solid #ddd;
                &::-webkit-scrollbar{width: 9px;}
                &::-webkit-scrollbar-thumb{background-color: rgb(223, 225, 233);border-radius: 9px;width:9px;}
                li{font-size:18px;line-height:1.5;width:100%;background:#fff;border-bottom:1px solid #ddd;height:50px;line-height:49px;box-sizing:border-box;margin-bottom:0;padding:0 22px;display:flex;cursor: pointer;text-transform:capitalize;align-items:center;
                span{margin:0;}
                &:hover{background:#f4f5f6;color:#5a626d;}
                }
              }
              span{top:0;right:0;position: absolute;height:100%;width: auto;line-height: 45px;margin:0;padding-right:10px;cursor: pointer;
                i{line-height:42px;margin-left:10px;}
              }
            }
          }
          button{color:#fff;width:462px;height:50px;line-height:50px;color:#fff;font-size:18px;background:#357ce1;border-radius: 2px;margin-top:20px;}
        }
      }
    }

  }
</style>
