<template>
  <div id="about">
    <banner  type="about-pc">
    </banner>
    <article>
      <section class="introduce">
        <dl v-for="(sss, iii) in d.introduce" :key="iii">
          <dt>{{sss.title}}</dt>
          <dd v-for='(s, i) in sss.details' :key="i" :class="s.class">
            <img :src="s.thumbnail || '/static/staticfile/images/about/' + s.class + '.png'" alt="">
            <p v-for="(ss, ii) in s.description" :key="ii" v-html="$t(ss)"></p>
          </dd>
        </dl>
      </section>
      <section class="advantage">
        <dl>
          <dd v-for="(s, i) in d.advantage.details" :key="i" :class="s.class">
            <section>
              <div>
                <p>{{$t(s.subtitle)}}</p>
                <span v-for="(ss, ii) in s.description" :key="ii">{{$t(ss)}}</span>
              </div>
              <img :src="s.thumbnail || '/static/staticfile/images/about/' + s.class + '.png'" alt="">
            </section>
          </dd>
          <dd class="contact">
            <h3>{{$t(d.contact.title)}}</h3>
            <section>
              <p>{{$t('about.bs')}}{{$t(d.contact.sns.email)}}</p>
              <div>
                <a v-for="(s, i) in d.contact.sns" target="_blank" :key="i" v-if="i !== 'email'" :href="s" ><i :class="['fa', 'fa-'+i]"></i></a>
                <!-- <a v-for="(s, i) in d.contact.sns" target="_blank" :key="i" v-if="i !== 'email'" :href="(typeof s == 'object' ? ($store.state.LANG == 'zh-cn' ? s[0] : s[1]) : s)" ><i :class="['fa', 'fa-'+i]"></i></a> -->
              </div>
            </section>
          </dd>
        </dl>
      </section>
      <section class="parther">
        <div>
          <h4>{{$t('ourPartners.title')}}</h4>
          <ul>
            <li v-for="(s, i) in d.partner" :key="i">
              <a :href="s.url || 'javascript:;'"  :alt="s.description" :title="s.description">
                <img :src="s.thumbnail" :alt="s.description" :title="s.description">
              </a>
            </li>
          </ul>
        </div>
      </section>
    </article>
  </div>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('footer.support.list.about.name') + this.$t('seo.title'),
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
      className: ['sto','team','dropcandy'],
      advantageclassName: ['replacement','etf','cody'],
      d: {
        "introduce":[
          { "title":"企业优势",
            "details":[
              {
                "thumbnail":"",
                "url":"",
                "description":["提供STO交易令牌合规化","为你的TOKEN提供合法合规的服务"],
                "class": 'sto'
              },
              {
              "thumbnail":"",
              "url":"",
              "description":["专业团队，国际服务","为你融资到上交易所一条龙服务"],
                "class": 'team'
              },
              {
                "thumbnail":"",
                "url":"",
                "description":["空投糖果，让更多投资人","知道你的存在，并且为你传播"],
                "class": 'dropcandy'
              }
            ]
          }
        ],
        "contact":{
          "title":"联系我们",
          "sns":{
            "email":"support@coindy.com",
            "facebook": "https://www.facebook.com/CoindyOfficial",
            "twitter": "https://twitter.com/CoindyOfficial",
            "telegram": ["https://t.me/coindycn",'https://t.me/coindyofficial']
          }
        },
        "advantage":{
          "title":"何为CODY",
          "details":[
            {
              "subtitle":"自由置换",
              "thumbnail":"",
              "url":"",
              "description":["用户在Coindy平台上可用CODY","自由置换开通糖果置换的项目方Token"]
            },
            {
              "subtitle":"第一支区块链创新项目的ETF基金",
              "thumbnail":"",
              "url":"",
              "description":["多种早期项目TOKEN组合","加入CODY的Token永久锁定","更多种类持续加入中"]
            },
            {
              "subtitle":"未来的CODY",
              "thumbnail":"",
              "url":"",
              "description":["未来的CODY座位Coindy的价值通证","还可以使用CODY查阅更多专业投资者分享、","报告等，也可以对喜欢的项目进行投资；","项目方通过锁定"]
            }
          ]
        },
        "partner":[
          {"url":"","thumbnail":"//admin.coindy.tuobar.com/themes/coinsuger/public/assets/images/investor/coinex.jpg","description":""},
          {"url":"","thumbnail":"//admin.coindy.tuobar.com/themes/coinsuger/public/assets/images/investor/okex.png","description":""},
          {"url":"","thumbnail":"//admin.coindy.tuobar.com/themes/coinsuger/public/assets/images/partner/1.png","description":""},
          {"url":"","thumbnail":"//admin.coindy.tuobar.com/static/images/BIY.jpg","description":""},
          {"url":"","thumbnail":"//admin.coindy.tuobar.com/themes/coinsuger/public/assets/images/investor/oax.jpg","description":""},
          {"url":"","thumbnail":"//admin.coindy.tuobar.com/themes/coinsuger/public/assets/images/investor/collinstar.jpg","description":""},
          {"url":"","thumbnail":"//admin.coindy.tuobar.com/themes/coinsuger/public/assets/images/partner/6.png","description":""},
          {"url":"","thumbnail":"//admin.coindy.tuobar.com/themes/coinsuger/public/assets/images/investor/rockminer.jpg","description":""},
          {"url":"","thumbnail":"//admin.coindy.tuobar.com/themes/coinsuger/public/assets/images/investor/bitell.png","description":""},
          {"url":"","thumbnail":"//admin.coindy.tuobar.com/themes/coinsuger/public/assets/images/investor/das.png","description":""}
        ]
      }
    }
  },
  beforeCreate () {
    this.$store.state.loading = true
  },
  created () {
    this.http()
  },
  methods: {
    http () {
      this.axios.axiosget({
        url: '/about'      
      }).then((ret) => {
        this.d = ret.data.data
        this.d.introduce.map((obj, index) => {
          obj.details.map((data,ii) => {
            this.$set(data,'class', this.className[ii])
          })
        })
        this.d.advantage.details.map((obj, index) => {
          this.$set(obj,'class', this.advantageclassName[index])
        })
        this.$store.state.loading = false
      }).catch((error) => {
      console.log(error)
    })
    }
  },
  computed: {
    lang () {
      return this.$store.state.LANG
    }
  },
  watch: {
    lang () {
      this.http()
    }
  }
}
</script>
<style lang="less" scoped>
  #about{
    i.fa{display: inline-block;width:22px;height:22px;border-radius:50%;text-align:center;font-size:22px;line-height:22px;
      &.fa-medium,&.fa-medium,&.fa-weibo,&.fa-linkedin,&.fa-twitter,&.fa-facebook{color:#fff;background: #969fa9;font-size:16px;}
      &.fa-github{font-size:26px;line-height:100%;}
      &.fa-telegram{color: #969fa9;}
    }
    section{
      &.introduce{background:#f5f6fa;height:480px;
        dl{display: flex;width:1200px;margin:0 auto;flex-flow:wrap;justify-content:space-around;
          dt{color:#5a626d;font-size: 28px;text-align: center;margin:80px auto;}
          dd{height:auto;width:230px;background:none;display:flex;justify-content: center;flex-flow:column;font-size:14px;
            img{margin:0 auto 34px;flex-shrink: 0;width:102px;}
            p{font-size:14px;line-height:1.75;text-align:center;}
            &:nth-child(2n){background: none;}
          }
        }
      }
      &.advantage{
        dd{overflow: hidden;align-items:center;
          section{overflow: hidden;height:100%;width:1100px;margin:0 auto;    align-items: center;justify-content: space-between;display: flex;}
          p{font-size:26px;color:#5a626d;margin-bottom:20px;}
          span{color:#5a626d;font-size:14px;display: block;line-height:1.75;}
          &:nth-child(2n){
            div{order:1;}
            img{order:0}
          }
          &.contact{height:400px;display: flex;justify-content: center;align-items: center;flex-flow: column;
          section{width:654px;height:60px;border:1px solid #dadce1;margin:0 auto;box-sizing: border-box;display: flex;align-items: center;}
            h3{color:#5a626d;font-size: 28px;margin-bottom:80px;}
            p{color:#5a626d;font-size: 20px;width:438px;line-height:60px;text-align: center;margin-bottom:0;}
            div{width:215px;display: flex;justify-content: center;align-items:center;border-left:1px solid #dadce1;
              a{margin:0 20px;}
            }
          }
        }
      }
    }
    & /deep/ #banner{
      section{
        span{font-size:36px;}
        p{margin-top:20px;font-size:14px;
          u{font-size:14px!important;}
        }
      }
    }
    dl{display: flex;flex-flow:wrap;
      dt{width:100%;flex-shrink: 0;}
      dd{background:#fff;width:100%;height:440px;
        &:nth-child(2n){background:#f5f6fa;}
        section{width:1200px;margin:0 auto;}
        span{display: block;}
      }
    }
    .parther{height:450px;
      h4{color:#5a626d;font-size: 28px;text-align: center;margin:80px 0;}
      ul{width: 1060px;margin:0 auto;margin:0 auto;display: flex;flex-flow: wrap;justify-content:space-around;
        li{margin-bottom:20px;}
      }
    }
  }
</style>


