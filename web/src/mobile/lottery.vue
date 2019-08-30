<template>
  <div id="lott">
    <main id="H5Lottery" v-if="!loadingonoff">
      <div class="lotterywrap lottery">
        <div class="banner" :style="`background-image:url(${banner.image})`">
          <p class='lotterynum codynum' id="codynumbox"><em class='lotteryspr'></em>CODY <i id="codynum">{{data.balance}}</i></p>
          <h2 class="texthide">{{$t('h5lottery.max')}}</h2>
          <h3 class="texthide">{{$t('h5lottery.hign')}}</h3>
        </div>
        <div class="bg">
          <div class="lotterybox">
            <p id="lotteryzoom"></p>
            <div id="lottery" ref="lottery">
            </div>
            <p class='lotterynum'>{{$t('h5lottery.free')}}: <i id="lotterynum">{{data.lotteryNumber}}</i>{{$store.state.LANG == 'zh-cn'? '次': ''}}</p>
            <a href="javascript:;" class="share_btn" @click.stop="share_freeLotteryNum">{{$t('h5lottery.share')}}</a>
            <span class='sharerule'>{{$t('h5lottery.share2')}}</span>
            <a href="javascript:;" class='myint' @click.stop="onoff.pop.onoff = true,onoff.pop.record = true">{{$t('h5lottery.mylog')}}<i class="lotteryspr"></i></a>
          </div>
          <div class="centent">
            <div class='record'>
              <h3>{{$t('h5lottery.record')}}</h3>
              <ul class='record_tab'>
                <li @click.stop="tab = 'all'" :class="{'act' : tab == 'all'}">{{$t('h5lottery.recordtext')}}</li>
                <li @click.stop="tab = 'mylog'" :class="{'act': tab == 'mylog'}">{{$t('h5lottery.myrecord')}}</li>
              </ul>
              <table class='record_table'>
                <thead>
                <tr>
                  <th>UID</th>
                  <th>{{$t('h5lottery.bear')}}</th>
                </tr>
                </thead>
                <tbody id="record_tbody" v-if="tab == 'all'">
                <tr v-for="(s, i) in data.record_tbody" :key="i"><td>{{s.user_id}}</td><td>{{Number.parseFloat(s.coin_number) + ' ' + s.token_name}}</td></tr>
                </tbody>
                <tbody @touchstart="touchPushMore($event)" id="mylog_tbody" v-else>
                <tr  v-for="(s, i) in data.myRecord_tbody" :key="i"><td>{{s.user_id}}</td><td>{{Number.parseFloat(s.coin_number) + ' ' + s.token_name}}</td></tr>
                <tr v-if="notlog" class="notlog"><td>{{notlog}}</td></tr>
                </tbody>
              </table>
            </div>
            <div class="rule">
              <h3>{{$t('h5lottery.act')}}</h3>
              <div id="rule_box" v-html="data.base.content"></div>
            </div>
          </div>
          <i class='bottombgcenter'></i>
        </div>
      </div>
      <div v-if="onoff.pop.onoff" class="pop" id='pop'>
        <div v-if="onoff.pop.prize" id='prize'>
          <img id="prizeImg" :src="`/static/staticfile/images/lottery/${data.lottery.token_name}.png`" :alt="data.lottery.token_name">
          <span>{{$store.state.LANG == 'zh-cn' ? $t('h5lottery.con') : ''}}<b v-if="$store.state.LANG == 'zh-cn'">获得</b><b id="prizeText">{{Number.parseFloat(data.lottery.coin_number) + ' ' + data.lottery.token_name}}</b></span>
          <a href="javascript:;" @click="hidePop">{{$t('common.ok')}}</a>
        </div>
        <div v-if="onoff.pop.share" id="share" @click="onoff.pop.onoff = false,onoff.pop.share = false">
          <section>
            <a href="javascript:;" @click.stop="openShareImg" class="btn-get-invite" id="btn-get-invite">
              <span>{{$t('invitation.info.clearimg')}}</span>
            </a>
            <a href="javascript:;" class='btn-copy-url' @click.stop="copyurl" id="btn-copy-url">
              <span>{{$t('invitation.info.copyurl')}}</span>
            </a>
          </section>
        </div>
        <div v-if="onoff.pop.notfreepop" id="notfreepop">
          <p>{{$t('h5lottery.consume50')}}</p>
          <article>
            <a class="close" @click="hidePop" href="javascript:;">{{$t('common.cancel')}}</a>
            <a class="ok" @click="StartLottery" href="javascript:;">{{$t('common.ok')}}</a>
          </article>
        </div>
        <div v-if="onoff.pop.alertbox" id="alertbox">
          <p id="alerttextbox">{{alertBoxText}}</p>
          <article>
            <a class="ok" @click="hidePop" id="lottery_start" href="javascript:;">{{$t('common.ok')}}</a>
          </article>
        </div>
        <div v-if="onoff.pop.record" id="record" class='record'>
          <section>
            <a href="javascript:;" class='close' @click.stop="onoff.pop.onoff = false,onoff.pop.record = false"></a>
            <h3>{{$t('invitation.rule.log')}}</h3>
            <table>
              <thead>
              <tr>
                <th>UID</th>
                <th>{{$t('common.time')}}</th>
              </tr>
              </thead>
              <tbody id="inviteBox">
              <tr  v-for="(s, i) in data.myInviteBox" :key="i"><td>{{s.user_id}}</td><td>{{DefaultJs.getTime(s.create_time).notTimes}}</td></tr>
              <tr v-if="notlog" class="notlog"><td>{{notlog}}</td></tr>
              </tbody>
            </table>
            <i class="bottombgcenter"></i>
          </section>
        </div>
      </div>
    </main>
    <loadingcenter v-else class="box" />
  </div>
</template>
<script>
import Lottery from '@/assets/js/lottery.js'
export default {
  metaInfo () {
    return {
      title: this.$t('h5lottery.max') + ' ' + this.$t('h5lottery.high') + this.$t('seo.title'),
      meta: [{
        name: 'keywords',
        content: this.$t('seo.keywords'),
      }, {
        name: 'description',
        content: this.$t('seo.description'),
      }]
    }
  },
  data () {
    return {
      tab: 'all',
      freeOnoff: false,
      loadingonoff: true,
      invitePosterUrl: null,
      inviteUrl: null,
      Lottery: '',
      alertBoxText: '',
      banner: {
        image:'',
        freeBtn: '/static/staticfile/images/lottery/lottery_btn.png',
        notFreeBtn: '/static/staticfile/images/lottery/lottery_btn_not_free.png',
        lotteryBtnImg: '/static/staticfile/images/lottery/lottery_btn_not_free.png'
      },
      data: {
        base: {
          content: '<ul class=" list-paddingleft-2"><li><article><em>1</em><p>活动期间，用户可通过以下方式获得转盘机会：</p></article><blockquote><article><em>a</em><p>每消耗50 CODY可转盘一次；</p></article><article><em>b</em><p>邀请好友注册可获得1次转盘机会，每个用户至多能通过此方式获得10次转盘机会；</p></article><article><em>c</em><p>用户分享活动到Facebook或者Twitter可获得一次转盘机会，通过此方式最多获得一次转盘机会。</p></article></blockquote></li><li><article><em>2</em><p>活动期间，用户通过转盘即有机会获得ETH、CODY；</p></article></li><li><article><em>3</em><p>获得糖果的用户可前往Coindy App-我的资产中进行提现操作，每次提现需对应糖果手续费。</p></article></li><li><article><em class="opthide"></em><p>*Coindy将保留变更、调整、终止本活动的权利，有权调整或变更活动的规则。若有争议，Coindy保留最终解释权。</p></article></li></ul>',
          image: "https://oss.coindytest.tuobar.com/activity/20181227/6dadfa123c92e13e2f47cebbfa7000d1.png-watermark",
          reward_number: "7",
          status: "1"
        },
        myInviteBox: '',
        record_tbody: '',
        myRecord_tbody: '',
        myCodyLog: '',
        balance: '-',
        lotteryNumber: '-',
        share: '',
        lottery: ''
      },
      onoff: {
        pop: {
          onoff: false,
          prize: false,
          share: false,
          notfreepop: false,
          alertbox: false,
          record: false
        },
        notFreeOnoff: false
      },
      pushdata: {
        mylotteryPage: 1
      },
      notlog: '',
      firstLottery: true
    }
  },
  created () {
    this.axios.axios.all([this.httpget({url: '/h5/lottery/myInvite'}),
      this.httpget({url: '/h5/lottery/lotteryLog'}),
      this.httpget({url: '/h5/myLotteryLog', params: {page: this.pushdata.mylotteryPage,limit: 20}}),
      this.httpget({url: '/h5/queryMyCody'}),
      this.httpget({url: '/h5/lottery/lotteryNumber'}),
      this.httpget({url: "/h5/lotteryBase"}),
      this.httpget({url: "/portal/banner",params: {type: 'lottery-h5'}}),
      this.httpget({url: '/h5/lottery/share'})
    ]).then(this.axios.axios.spread((invite,log,mylog,balance,num,base,lottery,share) => {
      this.data.base = base.data.data
      this.data.record_tbody = log.data.data
      this.loadingonoff = false
      if (lottery.data.data.length <= 3) {
        this.banner.image = lottery.data.data[0].image
        this.banner.freeBtn = lottery.data.data[1].image
        this.banner.notFreeBtn = lottery.data.data[2].image
      }
      if (invite.data.code == 10001) {
        this.notlog = invite.data.msg
        this.$message({
          content: this.notlog
        })
        // return
      }
      this.data.myInviteBox = invite.data .data
      this.data.myRecord_tbody = mylog.data.data
      this.data.balance = balance.data.data.balance
      this.data.lotteryNumber = num.data.data
      this.data.lotteryNumber <=0 ? this.onoff.notFreeOnoff = true : ''
      this.data.lotteryNumber <=0 ? this.banner.lotteryBtnImg = this.banner.notFreeBtn : this.banner.lotteryBtnImg = this.banner.freeBtn
      this.data.share = share.data.data
    }))
  },
  mounted () {

  },
  methods: {
    StartLottery () {
      this.firstLottery = false
      this.hidePop()
      this.onoff.notFreeOnoff = false
      this.callJsToStarto()
    },
    //开始抽奖lottery->js
    callJsToStarto () {
      this.Lottery.disable()
      if (!this.$route.query.token && !this.$route.query.type) {
        this.$message({
          content: this.notlog
        })
        this.Lottery.reset()
        return
      }
      if (this.data.lotteryNumber <= 0 && this.onoff.notFreeOnoff && this.firstLottery) {
        this.onoff.pop.onoff = true
        this.onoff.pop.notfreepop = true
        this.Lottery.reset()
        return
      }
      this.axios.axios({
        method: 'get',
        url: `${this.DefaultJs.APIURL}/h5/lottery`,
        headers: {
          'x-device-language': this.$route.query.lang,
          'XX-Token': this.$route.query.token,
          'XX-Device-Type': this.$route.query.type,
        },
      }).then((ret)=>{
        if (ret.data.code == 0) {
          this.onoff.pop.onoff = true
          this.onoff.pop.alertbox = true
          // this.alertBoxText = this.$store.state.LANG == 'zh-cn' ? '第一期活动已结束' : 'The first round of activities has ended'
          this.alertBoxText = ret.data.msg
          this.Lottery.reset()
          return
        }
        if (this.data.lotteryNumber <= 0 && this.data.balance >= 50) {
          this.data.balance = this.DefaultJs.toThousands(this.DefaultJs.stringfullnumber(this.data.balance) - 50)
        }
        if (this.data.lotteryNumber >= 1) {
          this.data.lotteryNumber --
        }
        this.data.lottery = ret.data.data
        if (this.Lottery) {this.Lottery.stopRoll(ret.data.data.reward - 1)}
      })
    },
    //2、flash动画完成通知js  flash->js
    callJsToCompleteo () {
      this.onoff.pop.onoff = true
      this.onoff.pop.prize = true
      this.Lottery.enable()
      this.axios.axios.all([this.httpget({url: '/h5/lottery/myInvite'}),
        this.httpget({url: '/h5/lottery/lotteryLog'}),
        this.httpget({url: '/h5/myLotteryLog', params: {page: this.pushdata.mylotteryPage,limit: 20}}),
        this.httpget({url: '/h5/queryMyCody'}),
        this.httpget({url: '/h5/lottery/lotteryNumber'}),
      ]).then(this.axios.axios.spread((invite,log,mylog,balance,num) => {
        this.data.myInviteBox = invite.data.data
        this.data.record_tbody = log.data.data
        this.data.myRecord_tbody = mylog.data.data
        this.data.balance = balance.data.data.balance
        this.data.lotteryNumber = num.data.data
        this.data.lotteryNumber >= 0 ? this.onoff.notFreeOnoff = true : this.onoff.notFreeOnoff = false
        this.data.lotteryNumber <=0 ? this.banner.lotteryBtnImg = this.banner.notFreeBtn : this.banner.lotteryBtnImg = this.banner.freeBtn
      }))
      this.alertBoxText = ''
      this.Lottery.reset()
    },
    hidePop () {
      this.onoff.pop = {
        onoff: false,
        prize: false,
        share: false,
        notfreepop: false,
        alertbox: false,
        record: false
      }
    },
    httpget (opt) {
      return this.axios.axios({
        method: 'get',
        headers: {
          'x-device-language': this.$route.query.lang,
          'XX-Token': this.$route.query.token,
          'XX-Device-Type': this.$route.query.type,
        },
        url: `${this.DefaultJs.APIURL}${opt.url}`,
        params: opt.params
      })
    },
    httppost (opt) {
      return this.axios.axiospost({
        url: opt.url,
        data: opt.data
      })
    },
    notfreefun () {
      console.log('notfree')
    },
    copyurl () {
      this.onoff.pop.onoff = false
      this.onoff.pop.share = false
      this.$copyText(this.data.share.inviteUrlCopy).then((e) => {
        this.$message({
          content: this.$t('common.success'),
          type: 'check'
        })
      }, (e) => {
        this.$message({
          content: 'Can not copy'
        })
      })
    },
    openShareImg () {
      this.onoff.pop.onoff = false
      this.onoff.pop.share = false
      window.postMessage(this.data.share.invitePosterUrl);
      // window.location.href = this.data.share.invitePosterUrl
    },
    share_freeLotteryNum () {
      this.onoff.pop.onoff = true
      this.onoff.pop.share = true
      setTimeout(() => {
        this.httpget({url: '/h5/lottery/shareReward'})
      }, 2000)
    },
    touchPushMore (event) {
      if (event.currentTarget.scrollHeight - ((event.currentTarget.scrollTop + event.currentTarget.clientHeight)) <= 20) {
        this.pushdata.mylotteryPage++
        this.httpget({url: '/h5/myLotteryLog',mess:'2', params: {page: this.pushdata.mylotteryPage,limit: 20}}).then((ret) => {
          if (this.pushdata.mylotteryPage >= ret.data.page.last_page){return}
          ret.data.data.forEach((obj,index)=>{
            this.data.myRecord_tbody.push(obj)
          })
        }).catch((err)=>{
          console.log(err)
        })
      }
    }
  },
  computed: {

  },
  watch: {
    banner: {
      handler (n, o) {
        this.$nextTick(()=>{
          this.Lottery = new Lottery({
            'r': Number(this.data.base.reward_number),//奖品总数
            'width':542,//flash宽度
            'height':542,//flash高度
            's': this.banner.lotteryBtnImg,//开始抽奖按钮图片
            'container' : this.$refs.lottery,//嵌入容器
            'contentId' : 'lottery',//嵌入swf 的div层的 id
            'lotteryImg': this.data.base.image,
            'onClickRollEvent' : this.callJsToStarto,//对应上面接口
            'onCompleteRollEvent':this.callJsToCompleteo //对应上面接口
          });
        })
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
  #lott{
    & /deep/ #loading-center-absolute{transform: scale(.5);position: fixed;top:0;left:0;right:0;bottom:0;margin:auto;width:200px;height:200px;}
  }
  #H5Lottery{text-align:center;
    .fl{float:left;}
    .fr{float:right;}
    .opthide{opacity: 0;position: relative;z-index: -111;}
    .texthide{text-indent:-999999px;}
    .banner{position: relative;width:100%;height:4.74rem;background-size:7.5rem 4.78rem;overflow: hidden;;}
    #lottery{width:5.42rem;height:5.42rem;margin:.6rem auto 0;
      img.opthide{width:5.42rem;height:5.42rem;}
      & /deep/ .lottery_container{position: absolute;top:.64rem;left:0;right:0;margin:auto;
        #lottery_hover{width:5.42rem;height:5.42rem;background-size:5.42rem 5.42rem;}
        #lottery_start{width:3.51rem;height:3.51rem;animation: none;transform: none;animation: zomm 1.5s infinite;
          &:hover{transform: none;animation: none;}
          &.lottery_disable{
            animation: none;
          }
        }

      }
      #notfree{width:3.6rem;height:3.6rem;position: absolute;top:1.5rem;left:0;right:0;margin:auto;z-index:888;text-indent: -99999px;}
    }
    .lotterybox{
      .lotterynum{margin: 1.2rem auto 1.11rem;width:100%;color:#fff8dd;font-size: .3rem;height: .3rem;line-height: .3rem;opacity: .8;font-weight: normal;text-align: center;
        i{color:#fdce22;font-size:.34rem;margin-right: .14rem;height:.3rem;line-height: .3rem;vertical-align: top;}
      }
      .myint{color:#fec161;font-size:.3rem;text-align:center;opacity: .8;margin-top: .36rem;display: block;
        img{width:.15rem;height:.28rem;vertical-align: top;margin-left: .1rem;}
      }
      span.sharerule{text-align: center;opacity: .6;color:#fff;font-size:.28rem;margin-top:.34rem;display:block;}
    }

    .ui-popup.ui-popup-modal.ui-popup-show{z-index: 12345!important;}
    .bg{background:#5218c9 url(/static/staticfile/images/lottery/bg.jpg) no-repeat 0 0;background-size:7.5rem 29.22rem;overflow: hidden;;position:relative;
      .centent{padding:0 .5rem 1.12rem;position: relative;z-index: 123;display: block;text-align: center;
        div h3{color:#fff;font-size: .4rem;margin-bottom: .36rem}
        .record{margin:.58rem auto .5rem;}
        table.record_table:before{display: none;}
        .record{
          .record_tab{height:.83rem;line-height:.83rem;display: flex;background:#39099a;color:#ffffff;font-size:.28rem;font-weight: bold;
            li{width:50%;color:#6e27ff;height:.83rem;line-height:.83rem;font-size:.28rem;
              &.act{background:#6e27ff;color:#fff;}
            }
          }
        }
        .rule div:before, .centent table:before{content:'';display:block;width:6.8rem;height:.2rem;border-radius: .2rem;background:#3d05b2;margin-left:-.15rem;box-shadow: 0 10px 10px rgba(171,146,224,.27);position: relative;}
        .rule:after, .centent table:after{content:'';display:block;height:.7rem;border-radius: 0 0 .24rem .24rem;background: #7546d4;margin-top:-.54rem;z-index: 0;position: relative;}
        .rule div{background:#fff;color:#716aa0;font-size:.28rem;border-radius: 0 0 .24rem .24rem;line-height: 1.7;text-align: left;padding:.8rem .6rem .9rem .36rem;position: relative;margin-top: .3rem;z-index: 123;;box-shadow: 0px 0px 10px 10px rgba(171,146,224,.27) inset}
        .rule div:before{position: absolute;width:6.8rem;box-sizing: border-box;top:0;left:0;}
        .rule {
          #rule_box{font-size:.28rem;
            & /deep/ ul{font-size:.28rem;
              p{font-size:.28rem;}
              li{margin-bottom: .2rem;
                &:last-child{margin: 0;
                  em{display:none;}
                }
              }
              article{display:flex;align-items: baseline;
                em{display: block;width:.42rem;height:.39rem;flex-shrink: 0;color:#ffffff;font-size:.28rem;line-height: .4rem;text-align: center;position: relative;margin-right: .14rem;z-index: 12;
                  &:after{background: #f99b2f;width:.39rem;height:.39rem;content:'';position: absolute;top:0;right:0;border-radius: 50%;z-index:-1;}
                  &:before{background:#fed31c;width:.39rem;height:.39rem;content:'';position: absolute;top:0;left:0;border-radius: 50%;z-index: -1;}
                }
              }
              blockquote{display:block;margin:0;padding-left:.64rem;
                article{
                  em{background:url(/static/staticfile/images/lottery/lotteryspr.png) no-repeat 0 -2.54rem;background-size:4.81rem 3.98rem;width:.35rem;height:.35rem;display:block;flex-shrink: 0;line-height: .35rem;text-align: center;color:#f99b2f;font-size:.24rem;margin-right: .1rem;
                    &:after{display: none;}
                    &:before{display: none;}
                  }
                }
              }
            }
          }
        }
      }
    }
    table{display: block;color:#716aa0;
      thead{
        tr{
          height:.9rem;
          th{
            height:.9rem;line-height: .9rem;
          }
        }
      }
      tr{background: #fff;display: block;width:100%;font-size:0;
        &.notlog{
          td{border:none!important;}
        }
      }
      th{border-bottom:1px solid #e8e7e7;}
      td,th{width:50%;display: inline-block;position: relative;z-index:123;height:.73rem;line-height: .73rem;box-sizing:border-box;font-size:.28rem;}
      tbody{max-height:4.38rem;overflow:auto;position: relative;z-index:123;border-radius:0 0 .24rem .24rem;}
      thead,tbody{width:100%;display: block;}
      tbody{min-height: .73rem;background:#fff;}
    }
    .record{width:100%;height:100%;
      h3{color:#fff;font-size: .4rem;margin:.36rem auto;}
      table{position: relative;
        tbody{max-height:4.38rem;}
        &:before{content:'';display:block;width:6.8rem;height:.2rem;border-radius: .2rem;background:#3d05b2;margin-left:-.15rem;box-shadow: 0 10px 10px rgba(171,146,224,.27);position: relative;}
        &:after{content:'';display:block;height:.7rem;border-radius: 0 0 .24rem .24rem;background: #7546d4;margin-top:-.54rem;z-index: 0;position: relative;}
      }
    }
    #pop.pop{background:rgba(0,0,0,.6);position: fixed;top:0;left:0;width:100%;height:100%;z-index: 1234;
      #record{
        &.record{width:100%;height:100%;
          section{position: relative;
            h3{color:#fff;font-size: .4rem;margin:.36rem auto;}
            table{position: relative;padding:.2rem .5rem 0;height:90%;
              tbody{max-height:90%;}
              &:before{content:'';display:block;width:6.8rem;height:.2rem;border-radius: .2rem;background:#3d05b2;margin-left:-.15rem;box-shadow: 0 10px 10px rgba(171,146,224,.27);position: relative;}
              &:after{content:'';display:block;height:.7rem;border-radius: 0 0 .24rem .24rem;background: #7546d4;margin-top:-.54rem;z-index: 0;position: relative;}
            }
          }
        }
      }
      div{width:5.87rem;height:6.5rem;background: #fff;border-radius: .06rem;position: fixed;top:0;left:0;right:0;bottom:0;margin:auto;z-index: 123;
        &#prize{display: flex;flex-flow:column;justify-content:center;align-items: center;
          span{font-size:.26rem;
            b{font-size:.26rem;}
          }
        }
        &#alertbox,&#notfreepop{height:3rem;
          article{display: flex;height:1.1rem;border-top:1px solid #f6f6f6;line-height:1.1rem;background:#fff;}
          p{margin:.8rem auto;color:#212121;font-size:.3rem;}
          a{display: inline-block;width:50%;background:none;margin:0;height:100%;line-height:1.1rem;
            &.ok{color:#423c38;font-size:.3rem;border-left:1px solid #f6f6f6;}
            &.close{color:#999999;font-size:.3rem;}
          }
        }
        &#alertbox{
          article{justify-content: center;}
          a{
            &.ok{border:none;}
            &.close{border:none;}
          }
        }
        img{width:3.84rem;display: block;margin:.1rem auto;
          &#prizeImg{width:3.55rem;height:auto;margin-top:.3rem;}
        }
        b{font-weight: normal;}

        img{width:1rem;margin:0;}
      }
    }

    #pop.pop #record.record section table td:first-child,#pop.pop #record.record section table th:first-child,.bg .centent table td:first-child,.bg .centent table th:first-child{border-right:1px solid #e8e7e7;}

    #pop.pop #record.record section table tr:nth-child(2n),.bg .centent table tr:nth-child(2n){background: #f6f4f4;}

    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
      #pop.pop div#share{ bottom:-env(safe-area-inset-bottom);}
    }
    @keyframes zomm {
      0%{transform: scale(1)}
      50%{transform: scale(.9)}
      100%{transform: scale(1)}
    }
    @-webkit-keyframes zomm {
      0%{transform: scale(1)}
      50%{transform: scale(.9)}
      100%{transform: scale(1)}
    }

    .lotteryspr{background:url(/static/staticfile/images/lottery/lotteryspr.png) no-repeat 0 0;background-size:4.81rem 3.98rem;}
    #pop.pop #record.record section a.close{background:url(/static/staticfile/images/lottery/lotteryspr.png) no-repeat -.46rem -2.14rem;background-size: 4.81rem 3.98rem;;position: absolute;top:.3rem;right:.3rem;width:.62rem;height:.62rem;margin:0;transform: scale(.86)}
    #pop.pop div a{display:block;background:url(/static/staticfile/images/lottery/lotteryspr.png) no-repeat 0 -1.19rem;background-size: 4.81rem 3.98rem;width:4.8rem;height:.81rem;line-height:.81rem;color:#c3591c;font-size:.3rem;font-weight: bold;margin:.6rem auto;}

    #pop.pop #record.record section{background:#5218c9 url( /static/staticfile/images/lottery/invitedbg.jpg) no-repeat 0 0;background-size:7.5rem 12.06rem;position: fixed;top:0;left:0;width:100%;height:100%;}
    #pop.pop #record.record section h3:after,#pop.pop #record.record section h3:before,.bg .centent div h3:after,.bg .centent div h3:before{background:url(/static/staticfile/images/lottery/lotteryspr.png) no-repeat -.01rem -2.19rem;background-size:4.81rem 3.98rem;;display:inline-block;width:.34rem;height:.26rem;content:'';margin:0 .2rem;}
    .lotterybox .share_btn{width: 4.32rem;height: 1.06rem;background:url(/static/staticfile/images/lottery/lotteryspr.png) no-repeat 0 0;background-size:4.81rem 3.98rem;;display: block;text-align: center;line-height: .96rem;margin:0 auto;color:#c3591c;font-size: .36rem;font-weight: bold;}
    .lotterybox{width:7.5rem;background: url(/static/staticfile/images/lottery/lottery_bg.png) no-repeat 50% top;background-size:7.5rem 8.37rem;position: relative;overflow: hidden;}
    #pop.pop #record.record section:after,.lotterywrap .bg:after{background:url(/static/staticfile/images/lottery/lotteryspr.png) no-repeat -1.24rem -2.19rem;background-size: 4.81rem 3.98rem;;width:1.03rem;height:1.79rem;display:block;content:'';position:absolute;left:0;bottom:.4rem;}
    #pop.pop #record.record section:before,.lotterywrap .bg:before{background:url(/static/staticfile/images/lottery/lotteryspr.png) no-repeat -2.41rem -2.20rem;background-size: 4.81rem 3.98rem;;width:1.07rem;height:1.25rem;display:block;content:'';position:absolute;bottom:0;right:0;}
    #pop.pop #record.record section i.bottombgcenter,.lotterywrap .bg i.bottombgcenter{background:url(/static/staticfile/images/lottery/lotteryspr.png) no-repeat -.05rem -2.99rem;background-size: 4.81rem 3.98rem;width:1rem;height:.92rem;display:block;content:'';position:absolute;bottom:.2rem;left:2.9rem;}
    #pop.pop #record.record section i.bottombgcenter{left:5.3rem;bottom:1.2rem;}
    #pop.pop #share{width:100%;height:100%;background:none;
      section{width:7.5rem;height:2.75rem;position: fixed;top:auto;bottom:0;border-radius: 0;text-align: center;background:#fff;display: flex;
        a{display: inline-block;background:none;width:1rem;height:auto;margin:.7rem 1rem;line-height: 0;
          span{color:#666666;font-size:.24rem;white-space: nowrap;margin-top: 1.3rem;display: block;}
        }
      }
      .btn-copy-url, .btn-get-invite{width:50%;display:block;position:relative;margin:0;display: flex;justify-content: center;align-items: center;
        &:before{width:1rem;height:1rem;border-radius: 50%;position:absolute;background:#7da6bf;content:'';top:.7rem;left:0;right:0;margin:auto;}
      }
      .btn-get-invite:after{content:'';background:url(/static/staticfile/images/lottery/lotteryspr.png) no-repeat -3.62rem -2.09rem;background-size:4.81rem 3.98rem;;width:.42rem;height:.42rem;position:absolute;top:1rem;left:0;right:0;;margin:auto;}
      .btn-copy-url:after{content:'';background:url(/static/staticfile/images/lottery/lotteryspr.png) no-repeat -4.14rem -2.09rem;background-size:4.81rem 3.98rem;;width:.42rem;height:.42rem;position:absolute;top:1rem;left:0;right:0;;margin:auto;}
    }
    .myint i.lotteryspr{width:.16rem;height:.28rem;background-position: -4.63rem -2.14rem;display: inline-block;vertical-align: top;margin-left:.1rem;}

    #lotteryzoom{width: 6.38rem;height:6.38rem;position: absolute;background: url(/static/staticfile/images/lottery/zoom.png) no-repeat 50% top;background-size:6.38rem 6.38rem;;top:.17rem;left:0;right:0;margin:auto;animation: bgzoom 2.5s infinite}
    @keyframes bgzoom {
      0%{background-image: url(/static/staticfile/images/lottery/zoomdef.png);}
      25%{background-image: url(/static/staticfile/images/lottery/zoom.png);}
      50%{background-image: url(/static/staticfile/images/lottery/zoomdef.png);}
      75%{background-image: url(/static/staticfile/images/lottery/zoom.png);}
      100%{background-image: url(/static/staticfile/images/lottery/zoomdef.png);}
    }
    #codynumbox.lotterynum.codynum{position: absolute;left:-.2rem;top:.33rem;height:.54rem;min-width:3rem;border-radius: .54rem;opacity: 1;
      background:rgb(112,20,199);
      background: linear-gradient(rgb(112,20,199),rgb(255,74,51) );
      background: -webkit-linear-gradient(rgb(112,20,199),rgb(255,74,51) );
      background: -moz-linear-gradient(rgb(112,20,199),rgb(255,74,51) );
      background: -o-linear-gradient(rgb(112,20,199),rgb(255,74,51) );
      box-shadow: inset 3px 5.196px 6px 0px rgba(37, 14, 128, 0.25);
      z-index: 12;;
      line-height: .54rem;color:#fff;font-size:.24rem;text-align: left;
      padding-left:.5rem;
      i{font-size:.26rem;margin-left:.02rem;}
    }
    #codynumbox.lotterynum.codynum em.lotteryspr{width:.22rem;height:.22rem;display: inline-block;background-position: -3.62rem -2.54rem;vertical-align: middle;margin-right: .1rem;}
    #codynum{display:inline-block;}
  }

</style>
