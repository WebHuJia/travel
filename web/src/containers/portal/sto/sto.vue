<template>
  <div id="sto" v-if="!$store.state.loading">
    <!--<banner v-if="($store.state.isChineseIP == 'false' && this.$store.state.LANG != 'zh-cn')" type="sto-pc" color="true" ></banner>-->
    <banner type="sto-pc" color="true" ></banner>
    <!--<dl class="content" v-if="($store.state.isChineseIP == 'false' && this.$store.state.LANG != 'zh-cn')">-->
    <dl class="content">
      <dt>
        <ul>
          <li v-for="(s, i) in tabList" v-if="s.onoff" :key="i" :class="[s.class, actClass == s.class ? 'act' : '']" @click.stop="tab(s.class)">{{$t(s.name)}}</li>
        </ul>
      </dt>
      <dd v-if="notdata" class="notdata">
        <i class="fa fa-spinner fa-pulse fa-4x"></i>
      </dd>
      <dd v-if="!notdata && list.length" v-for="(s, i) in list"  :key="i">
        <i class="state" v-if="s.type_state === 'ongoing'">{{$t('investment.ongoing')}}</i>
        <div class='info'>
          <section @click="$router.push({name: 'Project', query: {id: s.id}})">
            <img :src="s.thumbnail" :alt="s.post_title" >
            <p>
              <span>{{s.post_title}}</span>
              <em>{{s.post_subtitle}}</em>
            </p>
          </section>
          <p class='comment' >
            <s>{{s.comment['comment-details']}}</s>
            <u><em v-if="s.comment['comment-author']">----</em>{{s.comment['comment-author']}}</u>
          </p>
          <article>
            <p>{{$t('projects.tokens.info.total')}}  <span>{{s.token_amount}} {{s.token_name}}</span> ≈{{DefaultJs.toThousands((DefaultJs.stringfullnumber(s.token_amount) * s.token_price))}} {{s.token_price_unit}}</p>
            <p>{{$t('projects.tokens.info.time')}} <span>{{DefaultJs.getTime(s.start_time).formatting}} - {{DefaultJs.getTime(s.end_time).formatting}}</span></p>
          </article>
        </div>
        <div v-if="s.type_state === 'ongoing'" class="ongoing">
          <section>
            <p>{{$t('projects.remaining')}}</p>
            <strong>{{s.surplus}} {{s.token_name}}</strong>
            <span>≈{{s.surplus_price}} {{s.token_price_unit}}</span>
          </section>
          <main>{{$t('projects.financing.progress')}}
            <i><em :style="'width: '+s.financing_progress+'%'"></em></i>{{s.financing_progress}}%
          </main>
          <b><strong :class="{'cnw':$store.state.LANG == 'zh-cn', 'enw':$store.state.LANG == 'en-us'}">{{$t('projects.financing.people')}}</strong>  <span>{{s.peopleNumber}}</span></b>
          <b><strong :class="{'cnw':$store.state.LANG == 'zh-cn', 'enw':$store.state.LANG == 'en-us'}">{{$t('projects.financing.tokenname')}}</strong> <span v-for="(sz, ii) in s.useCoinName" :key="ii">{{sz}}<i>、</i></span></b>
          <div><router-link :to="({name: 'Project', query: {id: s.id}})" class="ongoing">{{$t('investment.goinvestment')}}</router-link></div>
        </div>
        <div v-if="s.type_state === 'upcoming'" class="upcoming">
          <section>
            <p>{{$t('sto.project.countdown')}}</p>
            <countdown :endTime="s.start_time"  :endText="'projects.start'"></countdown>
            <!-- 回调 callback添加倒计时0 时刷新api -->
          </section>
          <div><router-link :to="({name: 'Project', query: {id: s.id}})" class="ongoing">{{$t('investment.upcoming')}}</router-link></div>
        </div>
        <div v-if="s.type_state === 'ended'" class="ended">
          <section>
            <p>{{$t('sto.project.raised')}}</p>
            <strong>{{s.amount}} {{s.token_name}}</strong>
            <span>≈{{s.amount_price}} {{s.token_price_unit}}</span>
          </section>
          <article>
            <p>
              <span>{{$t('task.title.c')}}</span>
              <b>{{s.exchange || '------'}}</b>
            </p>
            <p>
              <span>{{$t('sto.project.st')}}</span>
              <b>{{s.response_rate ? s.response_rate + ' %' : DefaultJs.Fulltime(s.exchange_time).d > 0 ? DefaultJs.Fulltime(s.exchange_time).d : '------'}}</b>
            </p>
          </article>
          <div><router-link :to="({name: 'Project', query: {id: s.id}})"  class="ended" style="cur">{{$t('candy.completed')}}</router-link></div>
        </div>
        <div v-if="s.type_state === 'exchanging'" class="exchanging">
          <section>
            <p>{{$t('sto.project.raised')}}</p>
            <strong>{{s.amount}} {{s.token_name}}</strong>
            <span>≈{{s.amount_price}} {{s.token_price_unit}}</span>
          </section>
          <article>
            <p>
              <span>{{$t('projects.financing.exchange')}}</span>
              <b>{{s.exchange || '------'}}</b>
            </p>
            <p>
              <span>{{$t('sto.project.max')}}</span>
              <b>{{s.response_rate ? s.response_rate + ' %' : DefaultJs.Fulltime(s.exchange_time).d > 0 ? DefaultJs.Fulltime(s.exchange_time).d : '------'}}</b>
            </p>
          </article>
          <div><router-link :to="({name: 'Project', query: {id: s.id}})"  class="ended" style="cur">{{$t('candy.completed')}}</router-link></div>
        </div>
      </dd>
      <dd v-if="!list.length" class="notdata">{{$t('common.noRecords')}}</dd>
    </dl>
    <!--<div class="ischinese" v-if="($store.state.isChineseIP =='true' || this.$store.state.LANG == 'zh-cn')">-->
      <!--<img src="/static/staticfile/images/logo.png" alt="">-->
      <!--<h3>关于屏蔽中国大陆IP访问的说明</h3>-->
      <!--<p>亲爱的中国大陆用户：</p>-->
      <!--<span>根据中国相关政策法规，Coindy 无法为中国大陆地区用户提供服务。<br />如有疑问，欢迎加入telegram群：<a target="_blank" href="https://t.me/coindycn">https://t.me/coindycn</a>感谢您对 Coindy 的理解与支持！</span>-->
    <!--</div>-->
  </div>
</template>
<script>
import countdown from '@/component/countdown.vue'
export default {
  components: {
    countdown
  },
  metaInfo () {
    return {
      title: this.$t('nav.sto') + this.$t('seo.title'),
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
      itTime: new Date().getTime(),
      banner: [],
      bannercontent: '',
      actList: 'alllist',
      tabList:[
        {
          name: 'common.all',
          class: 'all',
          onoff: true
        },
        {
          name: 'investment.ongoing',
          class: 'ongoing',
          onoff: true
        },
        {
          name: 'investment.upcoming',
          class: 'upcoming',
          onoff: true
        },
        {
          name: 'candy.completed',
          class: 'ended',
          onoff: true
        }
      ],
      list: '',
      alllist: [],
      ongoinglist: [],
      upcominglist: [],
      endedlist: [],
      exchanginglist: [],
      page: 1,
      actClass: 'all',
      notdata: true,
      type: ''
    }
  },
  beforeCreate () {
    this.$store.state.loading = true
    // if (this.$store.state.isChineseIP == 'true' || this.$store.state.LANG == 'zh-cn') {
    //   this.$store.state.loading = false
    // }
  },
  created () {
    // if (this.$store.state.isChineseIP == 'false' && this.$store.state.LANG != 'zh-cn') {
      this.allHttp()
    // }
  },
  methods: {
    http (t) {
      return this.axios.axiosget({
        url: '/portal/articlesList',
        params: {
          page:this.page,
          limit: 100,
          type: t || this.type
        }
      })
    },
    tab (d) {
      this.actClass = d
      this.type = d
      if (d+'list' == 'endedlist') {
        this.list = [...this['endedlist'],...this['exchanginglist']]
      } else {
        this.list = this[d+'list']
      }
      this.actList = `${d}list`
    },
    allHttp () {
      this.axios.axios.all([this.http('ongoing'),this.http('upcoming'),this.http('ended'),this.http('exchanging')]).then(this.axios.axios.spread((ongoing,upcoming,ended,exchanging) => {
        //  this.list = all.data.data
        this.notdata = false
        //  this.alllist = all.data.data
        this.ongoinglist = ongoing.data.data
        this.upcominglist = upcoming.data.data
        this.endedlist = ended.data.data
        this.exchanginglist = exchanging.data.data
        this.ongoinglist.length ? '' : this.tabList[1].onoff = false
        this.upcominglist.length ? '' : this.tabList[2].onoff = false
        ;(this.endedlist.length && this.exchanginglist.length) ? '' : this.tabList[3].onoff = false
        this.ongoinglist.map((obj, index) => {
          this.$set(obj,'type_state', 'ongoing')
        })
        this.upcominglist.map((obj, index) => {
          this.$set(obj,'type_state', 'upcoming')
        })
        this.endedlist.map((obj, index) => {
          this.$set(obj,'type_state', 'ended')
        })
        this.exchanginglist.map((obj, index) => {
          this.$set(obj,'type_state', 'exchanging')
        })
        window.scrollTo(0, 0)
        this.alllist = [
          ...this.ongoinglist,
          ...this.upcominglist,
          ...this.endedlist,
          ...this.exchanginglist
        ]
        this.list = this[this.actList]
        if (this.actList == 'endedlist') {
          this.list = [...this.endedlist, ...this.exchanginglist]
        }
        this.$store.state.loading = false
      })).catch((error) => {
        console.log(error)
      })
    }
  },
  computed: {
    lang () {
      return this.$store.state.LANG
    },
    isChineseIP () {
      return this.$store.state.isChineseIP
    }
  },
  watch: {
    lang (n, o) {
      // if (this.$store.state.isChineseIP == 'false' && this.$store.state.LANG != 'zh-cn') {
        this.$store.state.loading = true
        this.allHttp()
      // }
    },
    isChineseIP(n, o) {
      // if (n == 'false' && this.$store.state.LANG != 'zh-cn') {
      //   this.allHttp()
      // } else if (n == 'true') {
      //   this.$store.state.loading = false
      // }
    }
  }
}
</script>
<style lang="less" scoped>
  #sto{background:#f7f7f7;overflow: hidden;padding-bottom:100px;margin-top:74px;
    .banner{height:360px;background:#1e0b59;margin-top:74px;
      a{display: flex;width:100%;height:100%;justify-content: center;align-items:center;font-size:45px;font-weight:bold;flex-flow:column;
        span{
          background: #23beff;
          background: linear-gradient(30deg, #23beff, #4df6cf);
          background: -webkit-linear-gradient(30deg, #23beff, #4df6cf);
          background: -o-linear-gradient(30deg, #23beff, #4df6cf);
          background: -moz-linear-gradient(30deg, #23beff, #4df6cf);
          background: -ms-linear-gradient(30deg, #23beff, #4df6cf);
          background-clip: text;
          -webkit-background-clip: text;
          -moz-background-clip: text;
          -o-background-clip: text;
          -ms-background-clip: text;
          color: transparent;font-size:45px;line-height:2em;font-weight:bold;}
        i{font-size:24px;color: #fff;font-size: 24px;background: #357ce1;border-radius: 2px;display: block;padding: 0 30px;height: 50px;line-height: 50px;text-align: center;margin-top:20px;}
      }
    }
    .content{width:1200px;margin:20px auto 0;
      dt{margin-bottom:1px;background:#fff;
        ul{display: flex;justify-content: space-around;height:80px;line-height:80px;align-items:center;width:930px;margin:0 auto;color:#969fa9;font-size:18px;
          li{cursor: pointer;padding-bottom:10px;box-sizing:border-box;
            &.act{color:#357ce1;border-bottom:2px solid #357ce1;}
          }
        }
      }
      dd{margin-bottom:20px;background:#fff;display:flex;padding:30px 0;align-items:center;position:relative;overflow: hidden;
        &.notdata{display: flex;justify-content: center;padding:40px 0;}
        i.state{position: absolute;top:10px;right:-120px;width:233px;height:42px;border-radius: 42px;line-height: 42px;color:#fe5144;font-size:18px;text-indent:1.5em;background:#fff4f2;}
        div{width:600px;border-right:1px solid #f7f7f7;padding-left:50px;box-sizing:border-box;
          &.info{
            p{width:82%;}
          }
          &:last-child{border:none;}
          section{display: flex;flex-flow:column;text-align:center;
            img{width:74px;height: 74px;display: block;flex-shrink: 0;margin-right:20px;}
            p{display: flex;flex-flow: column;justify-content:space-around;
            }
            span{color:#222c38;font-size:14px;display: block;width:100%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;line-height:1.2;}
            em{color:#969fa9;font-size:14px;display: block;width:100%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;line-height:1.2;}
            strong{color:#03c086;font-size:30px;margin:10px; display:block;}
          }
          &.info{
            p{text-align: left;}
            section{flex-flow: row;cursor: pointer;}
            p.notcomment{height:30px;}
            p.comment{margin:10px 50px 20px 0;font-size:14px;
              s{display: block;line-height:1.7;margin-bottom:10px;font-size: 14px;}
              u{display: block;text-align: right;font-size: 14px;}
            }
          }
          &.upcoming{
            section{
              strong{color:#03c086;font-size:30px;margin:20px auto 40px;display: block;}
            }
          }
          &.ended,&.exchanging{
            article{display: flex;justify-content:space-around;
              p{color:#969fa9;font-size:14px;    flex-flow: column;display: flex;justify-content: center;align-items: center;}
              b{font-size: 24px;color:#5a626d;margin:10px 0 0;text-align: center;}
            }
          }
          p{color:#969fa9;font-size:14px;line-height:1.7;}
          article{margin-top:30px;
            p{color:#969fa9;font-size:14px;margin-bottom:20px;line-height:100%;
              span{color:#222c38;font-size:14px;}
            }
          }
          main{color:#222c38;font-size:14px;display:flex;align-items:center;margin:30px 0;
            i{width:360px;height:6px;border-radius:6px;background:#f7f7f7;position:relative;display:block;margin:0 10px;
              em{background:#357ce1;position:absolute;top:0;left:0;height:100%;border-radius: 6px;}
            }
          }
          b{display: block;color:#969fa9;font-size:14px;margin-bottom:10px;
            strong{font-size:14px;display:inline-block;
              &.cnw{width:70px;}
              &.enw{width:190px;}
            }
            u{margin-left:10px;font-size:14px;}
            span{color:#222c38;font-size:14px;
              &:first-child{margin-left:20px;}
              &:last-child i{display: none;}
            }
          }
          div{display: flex;align-items: center;justify-content: center;padding:0;width:100%;
            a{display: inline-block;padding:0 30px;width:auto;}
          }
          a,button{display: block;width:151px;height:38px;border-radius: 2px;font-size:18px;color:#fff;margin:0 auto;text-align:center;line-height:38px;
            &.upcoming,&.ongoing{background:#357ce1;}
            &.ended{background:#d9d9d9;}
            &:disabled{cursor: auto;}
          }
        }
      }
    }
    .ischinese{width:1200px;margin: 120px auto;background:#fff;padding:100px;box-sizing: border-box;
      img{display: block;margin:0 auto 20px;width:130px;}
      h3{text-align: center;margin: 30px auto;font-weight: normal;font-size:14px;}
      p{margin:30px 0;font-size:14px;}
      a{margin:0 10px;}
      span{line-height:2;font-size:14px;}
    }
  }
  .notdata{display:flex;align-items:center;justify-content:center;font-size:18px;text-align:center;}
</style>


