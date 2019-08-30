<template>
  <div id="project" v-if="projectDataOnoff">
    <header>
      <article>
        <div>
          <img :src="projectData.thumbnail" :alt="projectData.post_title">
          <p>
            <span>{{projectData.post_title}}<i :class="projectData.financing.financing_stage">{{projectData.financing.financing_stage=='upcoming'? $t('investment.upcoming') : projectData.financing.financing_stage=='ongoing'? $t('investment.ongoing') : projectData.financing.financing_stage=='ended'? $t('projects.ended') : projectData.financing.financing_stage=='exchanging'? $t('projects.financing.exchange') : '' }}</i><b v-if="projectData.is_candy" @click="Candy" class="candy"><img src="/static/staticfile/images/candy.png" /></b></span>
            <em>{{projectData.post_subtitle}}</em>
          </p>
        </div>
        <section>
          <a :href="projectData.website" class="website" target="_blank">{{$t('projects.home')}}</a>
          <a :href="projectData.whitepaper" class="whitepaper" target="_blank">{{$t('projects.paper')}}</a>
        </section>
      </article>
      <div class="media" v-if="snsMediaOnoff">
        <b class="favorite" @click.stop="doFavorite"><i class="fa fa-star-o" v-if="!projectData.isFavorite"></i><i class="fa fa-star" v-else></i>{{$t(projectData.isFavorite ? 'collect.collect' : 'collect.c')}}</b>
        <section>
          <span class="bg">{{$t('projects.websitemedia')}}：</span>
          <p>
            <a :href="zz" v-for="(zz, iz) in projectData.sns" :key="iz" v-if="zz && (iz.split('_').length) == 2" target="_blank">
              <i class="fa" :class="'fa-'+iz.split('_')[1]"></i>
            </a>
          </p>
        </section>
      </div>
      <p class="info" v-html="projectData.post_excerpt"></p>
    </header>
    <ul class="cententList">
      <li>
        <h4>{{$t('projects.title.financing')}}</h4>
        <table class="pd7">
          <tbody>
            <tr>
              <td class="bg">{{$t('projects.financing.progress')}}</td>
              <td>{{projectData.financing.financing_proportion}}</td>
              <td class="bg">{{$t('projects.financing.exchangetime')}}</td>
              <td>{{projectData.exchange_time ? DefaultJs.getTime(projectData.exchange_time).formatting : '------'}}</td>
            </tr>
            <tr>
              <td class="bg">{{$t('projects.financing.progresstotal')}}</td>
              <td>{{projectData.amount}} {{projectData.token_name}}</td>
              <td class="bg">{{$t('projects.financing.Maximumrateofreturn')}}</td>
              <td>{{projectData.response_rate}}%</td>
            </tr>
            <tr>
              <td class="bg">{{$t('projects.financing.issueprice')}}</td>
              <td>{{projectData.info.token_price_equation}}</td>
              <td class="bg">{{$t('projects.financing.join')}}</td>
              <td><a href="https://t.me/coindypro" target="_blank">{{$t('projects.join')}}</a></td>
            </tr>
            <tr>
              <td class="bg">{{$t('projects.financing.exchange')}}</td>
              <td>{{projectData.exchange || '------'}}</td>
              <td class="bg"></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </li>
      <li v-if="commentOnoff">
        <h4>{{$t('projects.title.remark')}}</h4>
        <article class="pd7">
          <div v-for="(n, ii) in projectData.comment" :key="ii">
            <p>{{n['comment-details']}}</p>
            <span>---{{n['comment-author']}}</span>
          </div>
        </article>
        <!-- <button class="more">加载更多 <i class="fa fa-sort-desc"></i></button> -->
      </li>
      <li class="package" v-if="projectData.package.length >= 1 && ($store.state.LANG != 'zh-cn' && $store.state.isChineseIP == 'false')">
        <h4>{{$t('projects.title.packge')}}</h4>
        <ul class="pd7">
          <li v-for="(sss, iii) in projectData.package" :key="iii" @click.stop="packageFun(iii)" :class="[packageAct == iii ? 'act' : '' ,((sss.start_time * 1000) > tTime) ? 'upcoming' : projectData.financing.financing_stage !== 'ongoing' ? 'endgray' : ((DefaultJs.stringfullnumber(sss.remaining) * 1) <= 0) ? 'endgray' : (((DefaultJs.stringfullnumber(sss.remaining) * 1) > 0) && ((sss.end_time * 1000) < tTime)) ? 'endgray' : 'buy']">
            <i class="check"></i>
            <span>{{$t('projects.remaining')}}：{{sss.remaining}}{{$t('projects.unit')}}</span>
            <div>
              <p>{{$store.state.LANG == 'zh-cn' ? sss.name : sss.en_name}}</p>
              <strong>{{sss.use_coin_number}} {{sss.use_coin_name}} <i class="arrow_right"></i> {{sss.coin_number}} {{projectData.token_name}}</strong>
              <button :class="((sss.start_time * 1000) > tTime) ? 'upcoming' : (projectData.financing.financing_stage !== 'ongoing') ? 'ended' : ((DefaultJs.stringfullnumber(sss.remaining) * 1) <= 0) ? 'ended' : (((DefaultJs.stringfullnumber(sss.remaining) * 1) > 0) && ((sss.end_time * 1000) < tTime)) ? 'ended' : 'buy'">{{((sss.start_time * 1000) > tTime) ? $t('investment.upcoming') : projectData.financing.financing_stage !== "ongoing" ? $t('projects.ended') : ((DefaultJs.stringfullnumber(sss.remaining) * 1) <= 0) ? $t('projects.hasout') : (((DefaultJs.stringfullnumber(sss.remaining) * 1) > 0) && ((sss.end_time * 1000) < tTime)) ? $t('projects.ended') : $t('investment.ongoing')}}</button>
            </div>
          </li>
        </ul>
        <main>
          <h4 class="clear">{{$store.state.LANG == 'zh-cn' ? showpackage.name : showpackage.en_name}} <span class="fr" v-if="showpackage.info">{{showpackage.info}}</span></h4>
          <article>
            <section>
              <span>{{$t('projects.sepa')}}：{{showpackage.use_coin_number}} {{showpackage.use_coin_name}}</span>
              <div class="clear">
                <em class="clear"><b><i :style="'width: '+ ((DefaultJs.stringfullnumber(showpackage.total) - DefaultJs.stringfullnumber(showpackage.remaining)) / DefaultJs.stringfullnumber(showpackage.total) * 100) +'%'"></i></b><s>{{((DefaultJs.stringfullnumber(showpackage.total) - DefaultJs.stringfullnumber(showpackage.remaining)) / DefaultJs.stringfullnumber(showpackage.total) * 100).toFixed(1)}}%</s></em>
                <p>
                  <strong>{{$t('projects.total')}}&nbsp;</strong><span>{{showpackage.coin_sum}} {{$t('projects.unit')}}</span>
                  <strong>{{$t('projects.remaining')}}:&nbsp;</strong><span>{{showpackage.remaining}} {{$t('projects.unit')}}</span>
                </p>
              </div>
              <div style="margin:40px 0 24px">
                <p style="margin-bottom:10px;"><strong>{{$t('projects.clock')}}:&nbsp;&nbsp;</strong> <label><span v-for="(szs, iz) in showpackage.lock" :key="iz">{{$t('projects.num')}}{{iz+1}}{{$t('projects.expet')}}：{{szs.scale}} {{$t('projects.clocktime')}}{{szs.time}}<s>，</s></span></label></p>
                <p><strong>{{$t('projects.hottime')}}:&nbsp;&nbsp;</strong><span style="margin:0">{{DefaultJs.getTime(showpackage.start_time).formatting}} {{$t('projects.to')}} {{DefaultJs.getTime(showpackage.end_time).formatting}}</span></p>
              </div>
            </section>
            <section>
              <div class="clear">
                <p class="notstyle">{{$t('common.buy')}}<strong class="fr">≈ {{countNum * showpackage.coin_number}} {{projectData.token_name}}</strong></p>
                <p class="inputstyle"><input type="text" :max="DefaultJs.stringfullnumber(showpackage.remaining)*1" min="1" @input="(countNum * 1) >= (DefaultJs.stringfullnumber(showpackage.remaining) * 1)? countNum = (DefaultJs.stringfullnumber(showpackage.remaining) * 1) : countNum = countNum" v-model.trim="countNum" :disabled='((showpackage.start_time * 1000) > tTime) ? true : projectData.financing.financing_stage !== "ongoing" ? true : (((DefaultJs.stringfullnumber(showpackage.remaining) * 1) <= 0) && ((showpackage.end_time * 1000) < tTime)) ? true : (((DefaultJs.stringfullnumber(showpackage.remaining) * 1) > 0) && ((showpackage.end_time * 1000) < tTime)) ? true : false' placeholder="0"><strong class="fr">{{$t('projects.unit')}}</strong></p>
                <span class="notstyle">{{$t('projects.consum')}}<i> {{countNum * showpackage.use_coin_number}} {{showpackage.use_coin_name}}</i></span>
              </div>
              <div class="clear">
                <button :class="((showpackage.start_time * 1000) > tTime) ? 'upcoming' : (projectData.financing.financing_stage !== 'ongoing') ? 'ended' : ((DefaultJs.stringfullnumber(showpackage.remaining) * 1) <= 0) ? 'ended' : (((DefaultJs.stringfullnumber(showpackage.remaining) * 1) > 0) && ((showpackage.end_time * 1000) < tTime)) ? 'ended' : 'buy'" :disabled='projectData.financing.financing_stage !== "ongoing" ? true : ((showpackage.end_time * 1000) < tTime) ? true : ((showpackage.start_time * 1000) > tTime) ? true : false' @click.stop="showBuy({id: showpackage.id,tokenName: showpackage.use_coin_name,useNum:showpackage.use_coin_number})">{{((showpackage.start_time * 1000) > tTime) ? $t('investment.upcoming') : projectData.financing.financing_stage !== "ongoing" ? $t('projects.ended') : ((DefaultJs.stringfullnumber(showpackage.remaining) * 1) <= 0) ? $t('projects.hasout') : (((DefaultJs.stringfullnumber(showpackage.remaining) * 1) > 0) && ((showpackage.end_time * 1000) < tTime)) ? $t('projects.ended') : $t('common.buy')}}</button>
              </div>
            </section>
          </article>
        </main>
      </li>
    </ul>
    <article class="content">
      <ul class="pd7 tab">
        <li v-for="(s, i) in tablist"  :key="i" :class="[s.class, tabAct==i ?'act': '']" v-if="s.onoff" @click.stop="tab(i,s.class)">{{$t(s.name)}}</li>
      </ul>
      <section>
        <div class="pd7" v-if="infoonoff" v-html="projectData.post_content">
        </div>
        <h4 v-if="sns.onoff">{{$t('projects.title.sns')}}</h4>
        <ul v-if="sns.onoff">
          <li class="github" v-if="githubdata.onoff">
            <div class="pd7">
              <section>
                <i class="fa fa-github"></i><h5>Github</h5>
              </section>
              <p>
                <span class="githubwatch">
                  <svg class="octicon octicon-eye v-align-text-bottom" viewBox="0 0 16 16" version="1.1" width="16" height="16"
                    aria-hidden="true">
                    <path fill-rule="evenodd" d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path>
                  </svg>
                  Watch
                <em>{{watchNum}}</em>
                </span>
                <span class="githubstar">
                  <svg class="octicon octicon-star v-align-text-bottom" viewBox="0 0 14 16" version="1.1" width="14" height="16"
                    aria-hidden="true">
                    <path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path>
                  </svg>
                  Star
                  <em>{{starNum}}</em>
                </span>
              </p>
            </div>
            <p class="pd7">{{$t('projects.sns.num')}}</p>
            <v-chart :options="polar" />
            <p class="clear pd7"><i class="fl">{{$t('projects.sns.total')}}：<em id="totalNum">{{githubdata.totalnum}}</em></i><b class="fr">{{$t('projects.sns.time')}}：<s id="lastTime">{{githubdata.week[githubdata.week.length-1]}}</s></b></p>
          </li>
          <li v-if="twitter.onoff">
            <h4><i class="fa fa-twitter"></i><p>Twitter</p></h4>
            <dl class="pd7">
              <dd v-for="(s, i) in twitter.data" :key="i">
                <span>{{s.content}}</span>
                <p class="clear"><em class="fl">{{DefaultJs.getTime(s.publish_time).formatting}}</em><span class="fr" v-if="s.more" @click.stop="showMore($event)" data-more='0'>{{$t('projects.sns.more')}}</span></p>
              </dd>
              <dt><button class="more" @click.stop="snsMore({page: twitter.page.current_page,type: 'twitter'})">{{$t(twitter.moreText)}} <i v-if="twitter.loading" class="loading fa fa-spinner fa-pulse"></i> <i class="fa fa-sort-desc" v-if="twitter.more"></i></button></dt>
            </dl>
          </li>
          <li v-if="facebook.onoff">
            <h4><i class="fa fa-facebook"></i><p>FaceBook</p></h4>
            <dl class="pd7">
              <dd v-for="(s, i) in facebook.data" :key="i">
                <span>{{s.content}}</span>
                <p class="clear"><em class="fl">{{DefaultJs.getTime(s.publish_time).formatting}}</em><span class="fr" v-if="s.more" @click.stop="showMore($event)" data-more='0'>{{$t('projects.sns.more')}}</span></p>
              </dd>
              <dt><button class="more" @click.stop="snsMore({page: facebook.page.current_page,type: 'facebook'})">{{$t(facebook.moreText)}} <i v-if="facebook.loading" class="loading fa fa-spinner fa-pulse"></i> <i class="fa fa-sort-desc" v-if="facebook.more"></i></button></dt>
            </dl>
          </li>
        </ul>
        <ul v-if="newsonoff">
          <li v-if="news.onoff">
            <h4>{{$t('projects.title.news')}}</h4>
            <dl class="pd7 news">
              <dd v-for="(s, i) in news.data" :key="i" @click="$router.push({name: 'ProjectDetails', query: {id: s.id}})">
                <p>{{s.title}}</p>
                <p class="clear"><span class="fl">{{$t('projects.source')}} {{s.source}}</span> <em class="fr">{{DefaultJs.getTime(s.create_time).formatting}}</em></p>
              </dd>
              <dt><button class="more" @click.stop="newMore({page: news.page.current_page,type: 'news'})">{{$t(news.moreText)}} <i v-if="news.loading" class="loading fa fa-spinner fa-pulse"></i> <i class="fa fa-sort-desc" v-if="news.more"></i></button></dt>
            </dl>
          </li>
        </ul>
      </section>
    </article>
    <article class="investigation" v-if="investigationonoff">
      <div :class="ii" v-for="(ss, ii) in projectData.investigation" :key="ii">
        <h5 class="pd7">{{ii == 'team' ? $t('projects.report.team'): ii=='tech'? $t('projects.report.tech') :ii=='fund'? $t('projects.report.fund') :ii=="economy"? $t('projects.report.economy') : ii=="project"? $t('projects.report.project') : ''}}</h5>
        <table>
          <thead>
            <tr>
              <th>{{$t('projects.team.dimension')}}</th>
              <th>{{$t('projects.team.explain')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(s, i) in projectData.investigation[ii]" :key="i">
              <td>{{s.dimension}}</td>
              <td>{{s.description}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
    <article class="people pd7" v-if="peopleonoff">
      <div>
        <h5>{{$t('projects.team.core')}}</h5>
        <ul>
          <li v-for="(s, i) in projectData.people" :key="i" v-if="s.people_type=='core'">
            <img :src="s.more.thumbnail" :alt="s.name">
            <p>
              <span>{{s.name}}</span>
              <em>{{s.description}}</em>
            </p>
            <div>
              <a v-for="(ss, ii) in s.more.sns" :href="ss" v-if="ss" :key="ii"><i :class="['fa', 'fa-'+ii]"></i></a>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <h5>{{$t('projects.team.consultant')}}</h5>
        <ul>
          <li v-for="(s, i) in projectData.people" :key="i" v-if="s.people_type=='adviser'">
            <img :src="s.more.thumbnail" :alt="s.name">
            <p>
              <span>{{s.name}}</span>
              <em>{{s.description}}</em>
            </p>
            <div>
              <a v-for="(ss, ii) in s.more.sns" :href="ss" v-if="ss" :key="ii"><i :class="['fa', 'fa-'+ii]"></i></a>
            </div>
          </li>
        </ul>
      </div>
    </article>
    <article class="pd7 info" v-if="tokeninfoonoff">
      <table>
        <thead>
          <tr>
            <th>{{$t('projects.tokens.info.title')}}</th>
            <th>{{$t('projects.tokens.fina.title')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="bg">{{$t('projects.tokens.info.name')}}</td>
            <td>{{projectData.info.token_name}}</td>
            <td class="bg">{{$t('projects.tokens.fina.name')}}</td>
            <td>{{projectData.info.token_name}}</td>
          </tr>
          <tr>
            <td class="bg">{{$t('projects.tokens.info.platform')}}</td>
            <td>{{projectData.info.token_platform}}</td>
            <td class="bg">{{$t('projects.tokens.fina.prop')}}</td>
            <td>{{projectData.info.token_platform}}</td>
          </tr>
          <tr>
            <td class="bg">{{$t('projects.tokens.info.type')}}</td>
            <td>{{projectData.info.token_type}}</td>
            <td class="bg">{{$t('projects.tokens.fina.token')}}</td>
            <td>{{projectData.info.token_type}}</td>
          </tr>
          <tr>
            <td class="bg">{{$t('projects.tokens.info.price')}}</td>
            <td>{{projectData.info.token_price}}{{projectData.info.token_price_unit}}</td>
            <td class="bg">{{$t('projects.tokens.fina.softcap')}}</td>
            <td>{{projectData.info.token_price_equation}}</td>
          </tr>
          <tr>
            <td class="bg">{{$t('projects.tokens.info.total')}}</td>
            <td>{{projectData.info.token_amount}}</td>
            <td class="bg">{{$t('projects.tokens.fina.hardcap')}}</td>
            <td>{{projectData.info.token_amount}}</td>
          </tr>
        </tbody>
      </table>
    </article>
    <article class="milestone pd7" v-if="milestoneonoff">
      <ul>
        <li :class="i%2 ? 'left' : 'right'" v-for="(s, i) in projectData.milestone" :key="i">
          <div>
            <p>{{s.time}}</p>
            <span>{{s.event}}</span>
          </div>
        </li>
      </ul>
    </article>
    <div id="pop" v-if="pop">
      <div class="buy" v-if="buy.onoff">
        <p>{{$t('common.notification')}}</p>
        <span>{{$t('projects.pop.p')}} {{buy.useNum * countNum}} {{buy.tokenName}} {{$t('projects.pop.to')}}{{countNum}}{{$t('projects.pop.num')}}</span>
        <button class="close" @click.stop="pop=false;buy.onoff=false">{{$t('common.cancel')}}</button>
        <button @click.stop='buyFun'>{{$t('common.confirm')}}</button>
      </div>
    </div>
  </div>
</template>
<script>
import VueECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
export default {
  metaInfo () {
    return {
      title: this.projectData.post_title + this.$t('seo.title'),
      meta: [{
        name: 'keywords',
        content: this.$t('seo.keywords')
      }, {
        name: 'description',
        content: this.$t('seo.description')
      }]
    }
  },
  beforeRouteEnter (to, from, next) {
    next()
  },
  data () {
    return {
      tTime: new Date().getTime(),
      loading: true,
      packageAct: 0,
      tabAct: 0,
      coindyId: '',
      showpackage: '',
      infoonoff: true,
      newsonoff: false,
      investigationonoff: false,
      peopleonoff: false,
      tokeninfoonoff: false,
      milestoneonoff: false,
      countNum: '',
      financing_stage: '',
      commentOnoff: true,
      pop: false,
      buy: {
        onoff: false,
        buyId: '',
        buyNum: '',
        tokenName: '',
        useNum: ''
      },
      tablist: [
        {'name': 'projects.title.info', 'class': 'info', 'onoff': true},
        {'name': 'projects.title.sns', 'class': 'sns', 'onoff': true},
        {'name': 'projects.title.news', 'class': 'news', 'onoff': true},
        {'name': 'projects.title.report', 'class': 'investigation', 'onoff': true},
        {'name': 'projects.title.team', 'class': 'people', 'onoff': true},
        {'name': 'projects.title.deve', 'class': 'milestone', 'onoff': true},
        {'name': 'projects.title.detail', 'class': 'tokeninfo', 'onoff': true}
      ],
      projectData: {},
      projectDataOnoff: false,
      snsMediaOnoff: false,
      watchNum: '',
      starNum: '',
      gitChart: '',
      sns: {
        onoff: false
      },
      githubdata: {
        total: [],
        week: [],
        totalnum: 0,
        onoff: false
      },
      polar: {},
      twitter: {
        onoff: false,
        data: {},
        page: {},
        more: true,
        moreText: 'projects.title.more',
        loading: false
      },
      facebook: {
        onoff: false,
        data: {},
        page: {},
        more: true,
        moreText: 'projects.title.more',
        loading: false
      },
      news: {
        onoff: false,
        data: {},
        page: {},
        more: true,
        moreText: 'projects.title.more',
        loading: false
      },
      cnmaxleng: 134,
      enmaxleng: 265
    }
  },
  beforeCreate () {
    this.$store.state.loading = true
  },
  created () {
    this.allhttp()
  },
  mounted () {
    this.polar = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.githubdata.week,
        axisLabel: {
          textStyle: {
            fontSize: 12
          },
          minInterval: 7
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          textStyle: {
            fontSize: 12
          }
        }
      },
      grid: {
        left: 40,
        right: 30
      },
      backgroundColor: 'rgba(252,252,252,0)',
      series: [{
        data: this.githubdata.total,
        type: 'line',
        areaStyle: {}
      }],
      itemStyle: {
        color: new VueECharts.graphic.LinearGradient(
          0, 0, 0, 1,
          [
            {offset: .1, color: 'rgba(18,171,241,.8)'},
            {offset: .3, color: 'rgba(18,171,241,.4)'},
            {offset: .7, color: 'rgba(18,171,241,.2)'}
          ]
        ),
        shadowBlur: 200,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0],
          start: 0,
          end: 300
        }
      ]
    }
  },
  methods: {
    fulltime (s) {//时间转换
      var t = s * 1000
      var y = new Date(t).getFullYear()
      var m = new Date(t).getMonth() + 1 < 10 ? '0' + (new Date(t).getMonth() + 1) : new Date(t).getMonth() + 1
      var d = new Date(t).getDate() < 10 ? '0' + new Date(t).getDate() : new Date(t).getDate()
      return y + '-' + m + '-' + d
    },
    Candy(opt) {//领取糖果
      this.axios.axiospost({
        url: '/airdrop',
        data: {actionId: this.coindyId}
      }).then((ret) => {
        if (ret.data.code == 1){
          this.$message({
            content: ret.data.msg,
            type: 'check'
          })
        } else {
          this.$message({
            content: ret.data.msg,
          })
        }
      }).catch((error) => {
      console.log(error)
    })
    },
    http (d) {
      return this.axios.axiosget({
        url: d.url,
        params: d.params,
        mess: d.mess
      })
    },
    snsMore (d) {//社交媒体更多
      d.page++
      this[d.type].loading = true
      this[d.type].more = false
      if (d.page > this[d.type].page.last_page) {
        this[d.type].more = false
        this[d.type].loading = false
        this[d.type].moreText = 'projects.title.toload'
        return
      }
      this.http({url: '/feed/sns/' + this.$route.query.id, params: {id: this.$route.query.id, source: d.type, limit: 4, page: d.page}}).then((ret) => {
        this[d.type].loading = false
        this[d.type].more = true
        for (var i = 0; i < ret.data.data.length; i++) {
          this[d.type].data.push(ret.data.data[i])
        }
        if (this[d.type].data) {
          this[d.type].data.map((data, index) => {
            this.$set(data, 'more', false)
            if (this.$store.state.langreg.exec(data.content) !== null) {
              if (this.stringLeng(data.content) > 300) {
                data.more = true
              }
            }
          })
        }
        this[d.type].page = ret.data.page
        if (d.page >= ret.data.page.last_page) {
          this[d.type].more = false
          this[d.type].loading = false
          this[d.type].moreText = 'projects.title.toload'
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    newMore (d) {//新闻更多
      d.page++
      this[d.type].loading = true
      this[d.type].more = false
      if (d.page > this[d.type].page.last_page) {
        this[d.type].more = false
        this[d.type].loading = false
        this[d.type].moreText = 'projects.title.toload'
        return
      }
      this.http({url: '/feed/news/' + this.$route.query.id, params: {id: this.$route.query.id, source: d.type, limit: 4, page: d.page}}).then((ret) => {
        this[d.type].loading = false
        this[d.type].more = true
        for (var i = 0; i < ret.data.data.length; i++) {
          this[d.type].data.push(ret.data.data[i])
        }
        if (this[d.type].data) {
          this[d.type].data.map((data, index) => {
            this.$set(data, 'more', false)
            if (data.content !== null) {
              if (this.stringLeng(data.content) > 300) {
                data.more = true
              }
            }
          })
        }
        this[d.type].page = ret.data.page
        if (d.page >= ret.data.page.last_page) {
          this[d.type].more = false
          this[d.type].loading = false
          this[d.type].moreText = 'projects.title.toload'
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    showMore (event) {//展开收起更多文字
      if (event.currentTarget.dataset.more == 1) {
        event.currentTarget.parentNode.parentNode.querySelector('span').style.height = '3.5em'
        event.currentTarget.dataset.more = 0
        event.currentTarget.innerHTML = this.$t('projects.sns.more')
      } else {
        event.currentTarget.parentNode.parentNode.querySelector('span').style.height = 'auto'
        event.currentTarget.dataset.more = 1
        event.currentTarget.innerHTML = this.$t('projects.sns.away')
      }
    },
    stringLeng (str) {//字符串长度统计
      return str.replace(/[^\x00-\xFF]/g,'**').length;
    },
    packageFun (d) {//项目
      this.packageAct = d
      this.countNum = ''
      this.showpackage = this.projectData.package[d]
    },
    tab (d, c) {//tab切换，第一个tab页显示新闻、媒体、介绍综合 其他各显示各
      this.tabAct = d
      this.infoonoff = false
      this.newsonoff = false
      this.investigationonoff = false
      this.peopleonoff = false
      this.tokeninfoonoff = false
      this.milestoneonoff = false
      this.sns.onoff = false
      switch (c) {
        case 'sns':
          this.sns.onoff = true
          this.newsonoff = false
          break
        case 'news':
          this.newsonoff = true
          this.sns.onoff = false
          break
        case 'info':
          if (this.twitter.onoff || this.facebook.onoff || this.githubdata.onoff) {
            this.sns.onoff = true
          }
          this.infoonoff = true
          this.newsonoff = true
          break
        case 'investigation':
          this.investigationonoff = true
          break
        case 'people':
          this.peopleonoff = true
          break
        case 'milestone':
          this.milestoneonoff = true
          break
        case 'tokeninfo':
          this.tokeninfoonoff = true
          break
      }
    },
    showBuy (d) {//显示购买
      if (this.countNum <= 0) {
        this.$message({
          content: this.$t('projects.buynum')
        })
        return
      }
      this.pop = true
      this.buy.onoff = true
      this.buy.buyId = d.id
      this.buy.buyNum = this.countNum
      this.buy.tokenName = d.tokenName
      this.buy.useNum = d.useNum
    },
    buyFun () {//购买函数
      this.pop = false
      this.buy.onoff = false
      this.axios.axiospost({
        url: '/user/buy',
        data: {
          actionId: this.buy.buyId,
          actionNumber: this.buy.buyNum
        }
      }).then((ret) => {
        if (ret.data.code == 1) {this.$message({content: ret.data.msg, type: 'check'})}
        this.http({url: '/portal/details/object_id/' + this.$route.query.id}).then((details) => {
          let packageArr = []
          if (details.data.data.package && details.data.data.package.length >= 2 && details.data.data.financing.financing_stage == 'ongoing') {
            details.data.data.package.forEach((obj, index) => {
              // ((obj.start_time * 1000) > tTime) ? 'endgray' : projectData.financing.financing_stage !== 'ongoing' ? 'endgray' : ((DefaultJs.stringfullnumber(sss.remaining) * 1) <= 0) ? 'endgray' : (((DefaultJs.stringfullnumber(sss.remaining) * 1) > 0) && ((sss.end_time * 1000) < tTime)) ? 'endgray' : 'buy'
              if (((this.DefaultJs.stringfullnumber(obj.remaining) * 1) > 0) && (obj.end_time > 1 && ((obj.end_time * 1000) > this.tTime))) {
                packageArr.push(obj)
              }
            })
          }
          details.data.data.package = Array.from(new Set([...packageArr, ...details.data.data.package]))
          this.projectData = details.data.data
          if (details.data.data) {
            this.showpackage = details.data.data.package[this.packageAct]
          }
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    allhttp () {//所有请求综合方便调用
      this.axios.axios.all([
        this.http({url: '/portal/details/object_id/' + this.$route.query.id}),
        this.http({url: '/feed/github/' + this.$route.query.id, params: {id: this.$route.query.id}}),
        this.http({url: '/feed/sns/' + this.$route.query.id, params: {id: this.$route.query.id, source: 'twitter', limit: 4, page: 1}}),
        this.http({url: '/feed/sns/' + this.$route.query.id, params: {id: this.$route.query.id, source: 'facebook', limit: 4, page: 1}}),
        this.http({url: '/feed/news/' + this.$route.query.id, params: {id: this.$route.query.id, limit: 4, page: 1}}),
        this.http({url: '/portal/' + this.$route.query.id + '/airdrop', mess: '2'})
      ]).then(this.axios.axios.spread((details, github, twitter, facebook, news, coindy) => {
        coindy.data.data.id ? this.coindyId = coindy.data.data.id : ''
        if (details.data.code === 0) {
          this.$message({
            content: details.data.msg
          })
          this.$router.push({name: 'Sto'})
          return
        }
        let packageArr = []
        if (details.data.data.package && details.data.data.package.length >= 2 && details.data.data.financing.financing_stage == 'ongoing') {
          details.data.data.package.forEach((obj, index) => {//循环出套餐可购买的列表
            if (((this.DefaultJs.stringfullnumber(obj.remaining) * 1) > 0) && (obj.end_time > 1 && ((obj.end_time * 1000) > this.tTime))) {
              packageArr.push(obj)
            }
          })
        }
        details.data.data.package = Array.from(new Set([...packageArr, ...details.data.data.package]))
        //根据拿到的可购买套餐然后使用new set函数方法进行拼接 得出正确的顺序

        this.projectData = details.data.data
        this.projectDataOnoff = true
        if (details.data.data) {//如果详情存在
          this.snsMediaOnoff = false
          for (var snsi in this.projectData.sns) {
            if (this.projectData.sns[snsi]) {
              this.snsMediaOnoff = true
            }
          }
          if (this.projectData.comment) {
            this.commentOnoff = false
            for (var commenti in this.projectData.comment) {
              if (this.projectData.comment[commenti]['comment-author'] && this.projectData.comment[commenti]['comment-details']) {
                this.commentOnoff = true
                break
              }
            }
          } else {
            this.commentOnoff = false
          }
          if (this.projectData.investigation) {
            for (var invesi in this.projectData.investigation) {
              if (this.projectData.investigation[invesi].length <= 0) {
                this.tablist.map((obj, index) => {
                  if (obj.class === 'investigation') {
                    obj.onoff = false
                  }
                })
              } else {
                this.tablist.map((obj, index) => {
                  if (obj.class === 'investigation') {
                    obj.onoff = true
                  }
                })
              }
            }
          }
          if (this.projectData.milestone.length <= 0) {
            this.tablist.map((obj, index) => {
              if (obj.class === 'milestone') {
                obj.onoff = false
              }
            })
          } else {
            this.tablist.map((obj, index) => {
              if (obj.class === 'milestone') {
                obj.onoff = true
              }
            })
          }
        }
        this.financing_stage = this.projectData.financing.financing_stage
        this.starNum = github.data.data.stargazers
        this.watchNum = github.data.data.subscribers
        this.gitChart = github.data.data.commit_activity
        this.showpackage = details.data.data.package[0]
        if (this.gitChart) {//github数据存在则
          this.gitChart.map((data, index) => {
            this.githubdata.total.push(data.total)
            this.githubdata.week.push(this.fulltime(data.week))
            this.githubdata.totalnum += data.total
          })
          this.gitChart.length >= 1 ? this.githubdata.onoff = true : this.githubdata.onoff = false
        }
        this.twitter.data = twitter.data.data
        this.twitter.page = twitter.data.page
        this.facebook.data = facebook.data.data
        this.facebook.page = facebook.data.page
        this.news.data = news.data.data
        this.news.page = news.data.page
        if (this.facebook.page.last_page === 1) {//如果没有更多页时
          this.facebook.more = false
          this.facebook.loading = false
          this.facebook.moreText = 'projects.title.toload'
        }
        if (this.twitter.page.last_page === 1) {//如果没有更多页时
          this.twitter.more = false
          this.twitter.loading = false
          this.twitter.moreText = 'projects.title.toload'
        }
        if (this.twitter.data.length >= 1) {
          this.twitter.data.map((data, index) => {
            this.$set(data, 'more', false)
            if (data.content !== null) {
              if (this.stringLeng(data.content) > 300) {
                data.more = true
              }
            }
          })
          twitter.data.data.length >= 1 ? this.twitter.onoff = true : this.twitter.onoff = false
        } else {
          this.twitter.onoff = false
        }
        if (this.facebook.data >= 1) {
          this.facebook.data.map((data, index) => {
            this.$set(data, 'more', false)
            if (data.content !== null) {
              if (this.stringLeng(data.content) > 300) {
                data.more = true
              }
            }
          })
          facebook.data.data.length >= 1 ? this.facebook.onoff = true : this.facebook.onoff = false
        } else {
          this.facebook.onoff = false
        }
        if (this.news.data.length >= 1) {
          news.data.data.length >= 1 ? this.news.onoff = true : this.news.onoff = false
          this.news.onoff ? this.newsonoff = true : this.newsonoff = false
        } else {
          this.news.onoff = false
        }
        if (this.news.page.last_page == 1) {
          this.news.more = false
          this.news.loading = false
          this.news.moreText = 'projects.title.toload'
        }
        (!this.githubdata.onoff && !this.twitter.onoff && !this.facebook.onoff) ? this.sns.onoff = false : this.sns.onoff = true
        if (!this.sns.onoff) {
          this.tablist.map((obj, index) => {
            if (obj.class === 'sns') {
              obj.onoff = false
              this.snsTabonoff = false
            }
          })
        } else {
          this.tablist.map((obj, index) => {
            if (obj.class === 'sns') {
              obj.onoff = true
              this.snsTabonoff = true
            }
          })
        }
        if (!this.news.onoff) {
          this.tablist.map((obj, index) => {
            if (obj.class === 'news') {
              obj.onoff = false
            }
          })
        } else {
          this.tablist.map((obj, index) => {
            if (obj.class === 'news') {
              obj.onoff = true
            }
          })
        }
        this.loading = false
        window.scrollTo(0, 0)
        this.$store.state.loading = false
      })).catch((error) => {
          console.log(error)
        })
    },
    doFavorite (opt) {//收藏
      var url = ''
      if (!this.projectData.isFavorite) {
        url = '/portal/articles/doFavorite'
      } else {
        url = '/portal/articles/cancelFavorite'
      }
      this.axios.axiospost({
        url: url,
        data: {id: this.projectData.id}
      }).then((ret) => {
        if (ret.data.msg) {
          if (ret.data.code == 1) {
            this.$message({
              content: ret.data.msg,
              type: 'check'
            })
          } else {
            this.$message({
              content: ret.data.msg,
            })
          }
        } else {
          var content = ''
          if (!this.projectData.isFavorite) {
            content = 'collect.collect'
          } else {
            content = 'collect.closecollect'
          }
          this.$message({
            content: this.$t(content),
            type: 'check'
          })
        }
        this.projectData.isFavorite = !this.projectData.isFavorite
      }).catch((error) => {
        console.log(error)
      })
    },
  },
  computed: {
    lang () {
      return this.$store.state.LANG
    }
  },
  watch: {
    lang (n, o) {
      this.githubdata.total = []
      this.githubdata.week = []
      this.githubdata.totalnum = 0
      this.tabAct = 0
      this.infoonoff = true
      this.newsonoff = false
      this.investigationonoff = false
      this.peopleonoff = false
      this.tokeninfoonoff = false
      this.milestoneonoff = false
      this.allhttp()
    }
  }
}
</script>
<style lang="less" scoped>
  #project{margin-top:76px;background:#f5f5f5;padding-bottom:76px;font-size:14px;
    .pd7{padding:0 70px;}
    .mg7{margin:0 70px;}
    i.fa{display: inline-block;width:22px;height:22px;border-radius:50%;text-align:center;font-size:22px;line-height:22px;
      &.fa-medium,&.fa-weibo,&.fa-linkedin,&.fa-twitter,&.fa-facebook{color:#fff;background: #969fa9;font-size:16px;}
      &.fa-github{font-size:26px;line-height:100%;}
      &.fa-telegram{color:#969fa9;}
    }
    h5{font-weight: normal;}
    th{font-weight: normal;}
    h4{color:#222c38;font-size:16px;height:60px;line-height:60px;background: #fcfcfc;padding:0 70px;font-weight: normal;}
    header{width:1200px;background:#fff;margin:0 auto 10px;padding:40px 70px;box-sizing: border-box;overflow: hidden;
      article{display: flex;justify-content:space-between;
        div{display: flex;
          img{width:74px;height:74px;flex-shrink: 0;}
          p{display: flex;flex-flow:column;justify-content:space-around;margin-left:10px;
            .candy{margin-left:10px;cursor: pointer;
              img{width:auto;height:auto;animation: zy 2s ease infinite;}
            }
            span{display: flex;color:#222c38;font-size:22px;align-items:center;
              i{font-size: 14px;color:#fff;line-height:100%;padding:5px 10px;display:inline-block;margin-left:20px;border-radius:2px;
                &.ended{background:#969fa9;}
                &.upcoming{background:#c5f0e3;color:#03c086;}
                &.ongoing{background:#aecfff;color:#357ce1;}
                &.exchanging{background:#969fa9;}
              }
            }
            em{display: block;color:#969fa9;font-size:14px;}
          }
        }
        section{display: flex;
          a{color:#fff;background:#357ce1;width:138px;display:block;height:38px;line-height:38px;margin-right:14px;text-align:center;border-radius:2px;border-radius:40px;font-size:16px;
              background:rgb(53,124,225);
              background: linear-gradient(30deg, rgb(53,124,225),rgb(0,194,206));
              background: -webkit-linear-gradient(30deg, rgb(53,124,225),rgb(0,194,206));
              background: -moz-linear-gradient(30deg, rgb(53,124,225),rgb(0,194,206));
              background: -o-linear-gradient(30deg, rgb(53,124,225),rgb(0,194,206));
              &:hover{
              box-shadow: -1.302px 3.782px 8.4px 1.6px rgba(66, 146, 255, 0.22);
            }

            &:last-child{margin:0;}
          }
        }
      }
      p{line-height:1.7;color:#969fa9;font-size:14px;
        &.info{padding-top:20px;border-top:1px solid #f5f5f5;}
      }
      div.media{display: flex;color:#969fa9;align-items:center;margin:10px 0 18px;height:26px;padding-left:86px;
        section{display: flex;align-items: center;height:26px;margin-left:10px;border-radius: 1px;padding:0 10px;
          a{
            i.fa{font-size:12px;width:18px;height:18px;line-height:18px;
              &.fa-telegram{font-size:17px;line-height:17px;}
              &.fa-github{font-size:20px;}
              &.fa-reddit{font-size:18px;}
            }
          }
          span{font-size:14px;}
        }
        b.favorite{
          font-size: 14px;
          font-weight: normal;width:auto;white-space: nowrap;
          cursor: pointer;
          padding:0 10px;
          height:26px;justify-content: center;
          color: #a5aab0;
          font-size: 14px;
          display: flex;
          align-items: center;
          background: #f3f3f3;
          border-radius: 1px;
          i.fa{margin-right: 8px;font-size:18px;}
        }
        a{color:#969fa9;margin:0 10px;width:18px;height:18px;overflow: hidden;display: inline-block;font-size:12px;}
        p{margin-left:0px;display: flex;align-items: center;padding:0;margin:0;border:none;}
      }
    }
    ul.cententList{width:1200px;margin:0 auto;
      li{margin-bottom:10px;background:#fff;
        &.package{
          i.arrow_right{width:24px;height:12px;display: inline-block;
            background:url(/static/staticfile/images/sto/direction.png) no-repeat 0 0;
          }
          ul{margin:36px 0;display:flex;flex-wrap:wrap;
            li{width:258px;height:160px;box-sizing: border-box;margin:0 9px 12px 0;padding:0 20px;font-size:14px;cursor: pointer;flex-shrink:0;box-sizing: border-box;position:relative;overflow:hidden;border-radius: 8px;
              background:url(/static/staticfile/images/sto/ongoing.png) no-repeat 50%;
              &.endgray{
                background:url(/static/staticfile/images/sto/ended.png) no-repeat 50%;
              }
              &.upcoming{
                background:url(/static/staticfile/images/sto/upcoming.png) no-repeat 50%;
              }
              p{color:#fff;flex-shrink: 0;font-size:14px;text-overflow: ellipsis;overflow:hidden;white-space: nowrap;text-align:center;margin-bottom:20px;
              }
              i.check{position:absolute;top:4px;right:4px;width:20px;height:20px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAJBAMAAAD0ltBnAAAAJFBMVEUAAAD///////////////////////////////////////////+0CY3pAAAADHRSTlMA/ge26iuRZkivgW7mcmq8AAAAM0lEQVQI12MAAdYFYCpEHMxxNGLQbGAIEVZgKJQAcRjYBLcAOQwMiYJADpAL5IBAERADAMXbBgfNo6+aAAAAAElFTkSuQmCC) no-repeat 50%;display: none;}
              strong{color:#fff;font-size:14px;display: block;white-space: nowrap;font-weight: normal;display:block;text-align:center;}
              span{color:#fff;font-size:14px;text-align:left;white-space: nowrap;margin:14px 0 20px;display: block;}
              &:nth-child(4n) {margin:0;}
              &.act{box-shadow: 0 6px 10px 0 rgba(31,30,77,.2);
                i.check{display: block;}
              }
              div{width:100%;}
              button{font-size:14px;color:#6885b7;padding:8px 40px;background:#fff;border-radius:50px;margin:16px auto;display: block;}
              img{width:40px;height:40px;border-radius:50%;margin-right:10px;}
            }
          }
          h4{font-size:16px;font-weight: normal;
            &.clear{background:none;padding:0;margin:0 70px;border:1px solid #e2e2e2;box-sizing: border-box;text-indent: 50px;background:#f6f6f6;color:#357ce1;}
            span{color:#357ce1;margin:16px 50px 0 0;font-size:18px;font-weight: normal;
              &:before{background:url(/static/staticfile/images/sto/cody.png) no-repeat 50%;width:28px;vertical-align: middle;height:28px;display: inline-block;content: '';margin-right:4px;}
            }
          }
          main{margin:0 70px;padding:0 0 40px;
            h4{font-weight: normal;margin:0!important;
              span{color:#357ce1;}
            }
            span{font-size:14px;color:#969fa9;}
            article{display: flex;border:1px solid #e5e5e5; box-shadow: 0px 3px 9.9px 0.1px rgba(224, 224, 225, 0.15);
              em{display:flex;height:1em;align-items:center;margin:10px 0 50px;
                b{width:1020px;height:8px;border-radius:8px;background:#f5f5f5;position:relative;font-weight: normal;}
                i{background:rgb(53,124,225);
                  background: linear-gradient(30deg, rgb(53,124,225),rgb(0,194,206));
                  background: -webkit-linear-gradient(30deg, rgb(53,124,225),rgb(0,194,206));
                  background: -moz-linear-gradient(30deg, rgb(53,124,225),rgb(0,194,206));
                  background: -o-linear-gradient(30deg, rgb(53,124,225),rgb(0,194,206));position:absolute;top:0;left:0;border-radius: 8px;height:8px;flex-grow: 2;}
                s{margin-left:4px;}
              }
              section{padding:5px 40px;box-sizing: border-box;margin:45px 0 20px;width:470px;
                &:first-child{border-right:1px solid #f5f5f5;width:590px;flex-shrink: 0;}
                /*&:last-child{width:}*/
                div{display:flex;flex-flow:wrap;padding:0;
                  span{

                  }
                  strong{white-space: nowrap;font-size:14px;}
                  p{width:100%;flex-shrink: 0;display:flex;
                    span{display: flex;white-space: nowrap;margin-right:90px;color:#222c38;}
                    strong{color:#969fa9;}
                    label{display:flex;flex-flow:wrap;
                      span{margin:0 0 4px;color:#222c38;
                        &:last-child s{display:none;}
                      }
                    }
                  }
                  em{width:100%;flex-shrink: 0;}
                  .notstyle{display: block;width:100%;line-height:100%;
                    span{display: inline;margin:0;padding:0;}
                    i{font-size:14px;}
                  }
                  .inputstyle{border:1px solid #e2e2e2;background:#fcfcfc;border-radius:2px;width:388px;display:flex;margin:10px 0 16px;
                    input{height:42px;box-sizing: border-box;background:#fcfcfc;width:100%;text-indent:14px;}
                    strong{padding:14px;}
                  }
                  span.notstyle{text-align:center;color:#222c38;}
                  button{width: 371px;color:#fff;margin:30px auto 0;
                    height: 38px;border-radius:38px;
                    box-shadow: -1.302px 3.782px 8.4px 1.6px rgba(66, 146, 255, 0.22);
                    background:rgb(53,124,225);
                    background: linear-gradient(30deg, rgb(53,124,225),rgb(0,194,206));
                    background: -webkit-linear-gradient(30deg, rgb(53,124,225),rgb(0,194,206));
                    background: -moz-linear-gradient(30deg, rgb(53,124,225),rgb(0,194,206));
                    background: -o-linear-gradient(30deg, rgb(53,124,225),rgb(0,194,206));
                    &.ended{
                      background:#caccd1;
                    }
                  }
                }
              }
            }
          }
        }
        table{display:block;border:1px solid #f7f7f7;padding:20px 0 40px;display:flex;justify-content: center;font-size:14px;
          tbody{border:1px solid #f7f7f7;}
          tr{height:40px;line-height:40px;border-bottom:1px solid #f7f7f7;box-sizing:border-box;}
          td{width:266px;text-indent: 3em;font-size:14px;
            a{text-indent:0;margin:0 18px 0 0;color:#357ce1;font-size:14px;}
          }
          .bg{background:#fdfdfd;border:1px solid #f7f7f7;box-sizing: border-box;color:#969fa9;}
        }
        article{
          div{font-size:14px;padding: 16px 0;
            p{line-height: 1.75;}
            span{display: block;text-align:right;}
          }
        }
      }
    }
    article.content{width:1200px;margin:0 auto;box-sizing: border-box;background:#fff;overflow: hidden;
      ul{display:flex;height:60px;line-height:60px;font-size:14px;border-bottom:1px solid #f5f5f5;
        &.tab{
          li{margin-right:78px;cursor: pointer;padding-bottom:0;
            &.act{color:#357ce1;border-bottom:2px solid #357ce1;box-sizing: border-box;}
          }
        }
        li{height:60px;line-height:60px;
          &:last-child{margin:0;}
          h4{display: flex;align-items:center;font-weight: normal;background:none;
            i{font-size:18px;color:#1296db;width:23px;height:23px;border-radius: 23px;border-radius:50%;text-align:center;line-height:27px;margin-right:20px;font-weight: normal;
              &.fa-twitter{color:#fff;background: #1296db;}
              &.fa-facebook{color:#fff;background: #1296db;}
            }
          }
          &.github{color:#666666;font-size:14px;padding:0 0 30px 0;
            section{display:flex;align-items: center;
            }
            p{font-size:14px;
              em,i,s,b{font-size:14px;}
            }
            i.fa-github{color:#1296db;font-size:30px;margin-right:20px;width:30px;height:30px;}
            div{display: flex;justify-content: space-between;align-items: center;
              p{display:flex;text-indent:1em;font-size:14px;
                span{display: flex;align-items: center;margin-left:120px;
                  svg{margin-right:10px;}
                }
              }
            }
            & /deep/ div.echarts{width:1050px;margin:0 auto;
              div{width:100%;
                canvas{width:100%;}
              }
            }
          }
          dl{
            dd{font-size:14px;border-top:1px solid #f4f4f4;padding-top:20px;
              &:first-child{border:none;}
              span{display:block;line-height:1.75em;height:3.5em;overflow: hidden;margin-bottom:10px;font-size:14px;
                & /deep/ p{
                  line-height:1.75em;
                }
              }
              p{padding-bottom:10px;
                em{font-size:14px;}
                span{height: auto;cursor: pointer;font-size:14px;}
              }
            }
            &.news{font-size:14px;
              dd{font-size:14px;border-bottom:1px solid #f4f4f4;padding-top:20px;cursor: pointer;
                &:last-of-type{border:none;}
                &:hover{
                  p{color:#357ce1;}
                  p.clear{color:#000;}
                }
                p{font-size:14px;}
                p.clear{font-size:14px;
                  span{margin:0;line-height: 100%;}
                }
              }
            }
          }
        }
      }
      section{
        div{margin:20px 0 40px;
          & /deep/ p{line-height:1.75;font-size:14px;
            a{font-size:14px;padding:10px 0;display: block;}
          }
          & /deep/ img{max-width:100%;display: block;margin:0 auto;}
        }
        ul{display: block;height:auto;
          li{height:auto;}
        }
      }
    }
    article.investigation{width:1200px;margin:0 auto;background:#fff;overflow: hidden;font-size:14px;padding:10px 0 50px 0;
      h5{margin-top:20px;font-weight: normal;font-size:16px;}
      table{margin:20px auto;display:block;border:1px solid #f5f5f5;width:1060px;box-sizing:border-box;font-size:14px;
        thead{display: block;
          tr{background:#fcfcfc;height:55px;}
        }
        tr{background:#fff;min-height:55px;border-bottom:1px solid #f5f5f5;display:flex;align-items:center;line-height:1.75;
          th{text-align:center;height:55px;line-height:55px;width:100%;font-weight: normal;
            &:first-child{flex-shrink: 0;width:240px;text-align:center;}
            &:last-child{border-left:1px solid #f5f5f5;width:818px;}
          }
          td{padding:30px;line-height:1.75;box-sizing:border-box;
            &:first-child{flex-shrink: 0;width:240px;text-align:center;}
            &:last-child{border-left:1px solid #f5f5f5;width:818px;}
          }
          &:nth-child(2n) {background:#fcfcfc;}
        }
      }
    }
    article.milestone{width:1200px;box-sizing:border-box;margin:0 auto;background:#fff;padding:60px 70px;font-size:14px;
      ul{overflow: hidden;position:relative;font-size:14px;color:#969fa9;
        &:after{display: block;width:2px;background: #f5f5f5;position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;content: '';}
        li{overflow: hidden;z-index: 123;position:relative;
          div{width:495px;background:#f5f5f5;border-radius:2px;position:relative;padding:20px;box-sizing:border-box;}
          p{margin-bottom:10px;color:#222c38;font-size:14px;}
          span{line-height:1.75;font-size:14px;}
          &.right {
            div{float: right;
              &:before{position:absolute;top:50%;left:-10px;width:0;height:0;border-width:10px 10px 10px 0;border-style:solid;border-color:transparent #f5f5f5 transparent transparent;content:'';display: block;transform: translateY(-50%)}
              &:after{width:10px;height:10px;display: block;content: '';background:#e8e8e8;position: absolute;top:0;left:-40px;bottom:0;margin:auto;border-radius:50%;right:auto;}
            }
            p{text-align:left;}
          }
          &.left {
            p{text-align:left;}
            div{float:left;
              &:before{position:absolute;top:50%;left:none!important;right:-10px;width:0;height:0;border-width:10px 0 10px 10px;border-style:solid;border-color:transparent transparent transparent #f5f5f5;content:'';display: block;transform: translateY(-50%)
              }
              &:after{width:10px;height:10px;display: block;content: '';background:#e8e8e8;position: absolute;top:0;right:-40px;bottom:0;margin:auto;left:auto;border-radius:50%;}
            }
          }
        }
      }
    }
    article.people{width:1200px;box-sizing: border-box;margin:0 auto;background:#fff;padding:10px 70px 40px;
      h5{border-bottom:1px solid #f5f5f5;padding:20px 0;font-weight: normal;font-size:16px;}
      ul{
        li{display: flex;align-items:center;padding:24px;border-bottom:1px solid #f5f5f5;
          img{width:108px;height:108px;flex-shrink: 0;border-radius: 50%;}
          p{margin:0 10px 0 30px;flex-grow:2;
            span{color:#222c38;font-size:16px;display:block;margin-bottom:10px;}
            em{color:#969fa9;font-size:14px;line-height:1.75;display:block;}
          }
          div{width:80px;flex-shrink: 0;display:flex;flex-wrap: wrap;justify-content: center;align-items:center;
            a{display: block;width:50%;text-align:center;margin:10px 0;
              i.fa{color:#fff;background:#5864b0;}
            }
          }
        }
      }
    }
    article.info{width:1200px;box-sizing: border-box;margin:0 auto;background:#fff;padding:30px 0 70px;font-size:14px;
      table{margin:20px auto;display:block;border:1px solid #f5f5f5;width:1060px;box-sizing:border-box;font-size:14px;
        thead{display: block;
          tr{height:42px;}
        }
        tbody{display:block;}
        tr{background:#fff;min-height:42px;border-bottom:1px solid #f5f5f5;display:flex;align-items:center;line-height:1.75;
          th{text-align:center;height:42px;line-height:42px;width:50%;display:block;
            &:first-child{text-align:center;}
            &:last-child{border-left:1px solid #f5f5f5;}
          }
          td{line-height:1.75;box-sizing:border-box;width:25%;text-align:center;height:42px;line-height:42px;display:block;
            &:last-child{border-left:1px solid #f5f5f5;}
            &.bg{background:#fcfcfc;}
          }
        }
      }
    }
    button.more{display:flex;height:60px;border-top:1px solid #f4f4f4;box-sizing: border-box;font-size:14px;width:100%;background:#fff;color:#757575;align-items: center;justify-content: center;
      i{height: 10px;line-height: 10%;overflow: hidden;display: block;width: 14px;margin-left:4px;font-size:18px;}
    }
    #pop{
      .buy{position:fixed;top:0;left:0;right:0;bottom:0;margin:auto;width:300px;height:100px;background:#fff;flex-wrap: wrap;text-align:center;
        width:460px;height:285px;box-shadow: 0px 8px 16px 0px rgba(31, 30, 77, 0.09);
        display: flex;justify-content: center;;
        p{width:100%;flex-shrink: 0;height:76px;line-height:76px;color:#5c6383;font-size:20px;border-bottom:1px solid #edeef0;}
        span{display: block;    flex-shrink: 0;line-height: 1.7;padding: 20px;box-sizing: border-box;width: 100%;}
        button{width:100px;height:40px;background:#357ce1;color:#fff;font-size:18px;border-radius:2px;margin:0 20px;
          &.close{background:#caccd1;color:#9194a4;}
        }
      }
    }
  }
  @keyframes zy {
    0% {transform: rotate(-15deg);}
    5% {transform: rotate(15deg);}
    10% {transform: rotate(-15deg);}
    15% {transform: rotate(15deg);}
    20% {transform: rotate(-15deg);}
    100% {transform: rotate(-15deg);}
  }
</style>
