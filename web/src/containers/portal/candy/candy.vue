<template>
  <div id="task">
    <banner type="candy-pc"></banner>
    <div class="wrap">
      <div class="official" :class="{'flexCenter': CodyList.length <= 3}">
        <ul>
          <li v-for="(s, i) in CodyList" :key="i">
            <p>{{s.name}}</p>
            <strong v-if="s.rewardType == 'Array'">
              <span v-for="(ss, ii) in s.reward" :key="ii"> + {{ss.coin_number}} <b>{{ss.token_name}}</b></span>
            </strong>
            <strong v-if="s.rewardType == 'object'">
              <span> + {{s.reward.coin_number}} </span>{{s.reward.token_name}}
            </strong>
            <!-- <button @click.stop="CodyReword({id: s.id,station: s.station,url: s.url,outlink: s.outlink})">{{s.buttonname}}</button> -->
            <button :class="s.status" @click.stop="showPop({obj:s})" v-html="$t(s.status == 'pending' ? 'nav.candy' : s.buttonname)"></button>
          </li>
        </ul>
      </div>
      <div class="news" v-if="AllList.length">
        <h3>{{$t('task.title.news')}}</h3>
        <ul>
          <li v-for="(s, i) in AllList" v-if="s.onoff" :key="i" @click.stop="RouterPush({id: s.id})" :style="s.heightonoff? 'z-index:123123' : ''">
            <dl :class="{'comp': (s.reward.length <= 2)}" @mouseleave="s.heightonoff = false">
              <dt>
                <img :src="s.thumbnail" :alt="s.post_title">
                <p>
                  <span>{{s.post_title}}<router-link v-if="s.is_candy" :to="{name: 'Project', query: {id: s.id}}" class="ongoing"><img src="/static/staticfile/images/candy.png" /></router-link><strong :class="[{'act': s.isFavorite}]" @click.stop="doFavorite({id: s.id, onoff: s.isFavorite, type: 'news'})"></strong></span>
                  <em>{{s.post_subtitle}}</em>
                </p>
              </dt>
              <dd :class="{'heightauto': s.heightonoff}" :style="s.heightonoff ? ('height:'+ s.reward.length * 30 + 'px') : ''">
                <div  v-for="(z, zi) in s.reward" :key="zi">
                  <p :title="z.name + z.reward.coin_number + z.reward.token_name"><span>{{z.name}} + {{z.reward.coin_number}} {{z.reward.token_name}}</span><i class="fa fa-question-circle-o" @click.stop="showPop({obj: z})"></i></p><strong><a  v-if="z.status !== 'complete'" @click.stop="openUrl({url: z})" :alt="z.name">{{z.type == 'telegram' ? $t(z.status !== 'complate' ? 'candy.join' : z.status == 'complate' ? 'candy.completed' : z.status == 'pending' ? 'collect.g' : '') : z.type == 'outlink' ? $t(z.status !== 'complate' ? 'common.att' : '') : ''}}</a><a v-else class="ag">{{$t('collect.ag')}}</a></strong>
                </div>
              </dd>
              <dd class="showBtnBox"  v-if="s.reward.length > 2" @click.stop="s.heightonoff = !s.heightonoff,ListShowOnoff({onoff: s.heightonoff, event: $event})"><i v-if="!s.heightonoff" class="fa fa-angle-double-down"></i><i v-else class="fa fa-angle-double-up"></i></dd>
            </dl>
          </li>
        </ul>
      </div>
      <div class="news" v-if="beexchangeList.length">
        <h3>{{$t('task.title.c')}}</h3>
        <ul>
          <li v-for="(s, i) in beexchangeList" v-if='s.onoff' :key="i"  @click.stop="RouterPush({id: s.id})"  :style="s.heightonoff? 'z-index:123123' : ''">
            <dl :class="{'comp': (s.reward.length <= 2)}" @mouseleave="s.heightonoff = false">
              <dt>
                <img :src="s.thumbnail" :alt="s.post_title">
                <p>
                  <span>{{s.post_title}}<router-link v-if="s.is_candy" :to="{name: 'Project', query: {id: s.id}}" class="ongoing"><img src="/static/staticfile/images/candy.png" /></router-link><strong :class="[{'act': s.isFavorite}]" @click.stop="doFavorite({id: s.id, onoff: s.isFavorite, type: 'ended'})"></strong></span>
                  <em>{{s.post_subtitle}}</em>
                </p>
              </dt>
              <dd :class="{'heightauto': s.heightonoff}" :style="s.heightonoff? ('height:'+ s.reward.length * 30 + 'px') : ''">
                <div  v-for="(z, zi) in s.reward" :key="zi">
                  <p :title="z.name + z.reward.coin_number + z.reward.token_name"><span>{{z.name}} + {{z.reward.coin_number}} {{z.reward.token_name}}</span><i class="fa fa-question-circle-o" @click.stop="showPop({obj: z})"></i></p><strong><a  v-if="z.status !== 'complete'" @click.stop="openUrl({url: z})" :alt="z.name">{{z.type == 'telegram' ? $t(z.status !== 'complate' ? 'candy.join' : z.status == 'complate' ? 'candy.completed' : z.status == 'pending' ? 'collect.g' : '') : z.type == 'outlink' ? $t(z.status !== 'complate' ? 'common.att' : '') : ''}}</a><a v-else class="ag">{{$t('collect.ag')}}</a></strong>
                </div>
              </dd>
              <dd class="showBtnBox"  v-if="s.reward.length > 2" @click.stop="s.heightonoff = !s.heightonoff,ListShowOnoff({onoff: s.heightonoff, event: $event})"><i v-if="!s.heightonoff" class="fa fa-angle-double-down"></i><i v-else class="fa fa-angle-double-up"></i></dd>
            </dl>
          </li>
        </ul>
      </div>
      <div class="news" v-if="alexchangeList.length">
        <h3>{{$t('task.title.o')}}</h3>
        <ul>
          <li v-for="(s, i) in alexchangeList" v-if="s.onoff" :key="i" @click.stop="RouterPush({id: s.id})"  :style="s.heightonoff? 'z-index:123123' : ''">
            <dl :class="{'comp': (s.reward.length <= 2)}" @mouseleave="s.heightonoff = false">
              <dt>
                <img :src="s.thumbnail" :alt="s.post_title">
                <p>
                  <span>{{s.post_title}}<router-link v-if="s.is_candy" :to="{name: 'Project', query: {id: s.id}}" class="ongoing"><img src="/static/staticfile/images/candy.png" /></router-link><strong :class="[{'act': s.isFavorite}]" @click.stop="doFavorite({id: s.id, onoff: s.isFavorite, type: 'exchanging'})"></strong></span>
                  <em>{{s.post_subtitle}}</em>
                </p>
              </dt>
              <dd :class="{'heightauto': s.heightonoff}" :style="s.heightonoff? ('height:'+ s.reward.length * 30 + 'px') : ''">
                <div v-for="(z, zi) in s.reward" :key="zi">
                  <p :title="z.name + z.reward.coin_number + z.reward.token_name"><span>{{z.name}} + {{z.reward.coin_number}} {{z.reward.token_name}}</span><i class="fa fa-question-circle-o" @click.stop="showPop({obj: z})"></i></p><strong><a  v-if="z.status !== 'complete'" @click.stop="openUrl({url: z})" :alt="z.name">{{z.type == 'telegram' ? $t(z.status !== 'complate' ? 'candy.join' : z.status == 'complate' ? 'candy.completed' : z.status == 'pending' ? 'collect.g' : '') : z.type == 'outlink' ? $t(z.status !== 'complate' ? 'common.att' : '') : ''}}</a><a v-else class="ag">{{$t('collect.ag')}}</a></strong>
                </div>
              </dd>
              <dd class="showBtnBox"  v-if="s.reward.length > 2" @click.stop="s.heightonoff = !s.heightonoff,ListShowOnoff({onoff: s.heightonoff, event: $event})"><i v-if="!s.heightonoff" class="fa fa-angle-double-down"></i><i v-else class="fa fa-angle-double-up"></i></dd>
            </dl>
          </li>
        </ul>
      </div>
    </div>
    <div id="pop" v-if="showonoff">
      <h4>{{$t('task.title.p')}}</h4>
      <i class="fa fa-remove" @click="showonoff = false, showList = []"></i>
      <div v-for="(s, i) in showList" :key='i'>
        <span v-if="s.type== 'textImg' || s.type == 'text'">
          <i v-for='(ss, ii) in s.info' :key="ii">{{ss}}</i>
        </span>
        <span v-if="s.type=='textImg' || s.type == 'img'">
          <img @error='imgerr($event)' :src="ss" v-for="(ss, ii) in s.steps" :key="ii"/>
        </span>
      </div>
      <button @click="goOutLink" v-if="popButtonOnoff">{{$t('common.btn.z')}}</button>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('nav.candy') + this.$t('seo.title'),
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
      CodyList: [],
      OtherList: [],
      AllList: [],
      beexchangeList: [],
      alexchangeList: [],
      showList: [],
      showonoff: false,
      outlinkUr: '',
      pop: {
        onoff: false,
        obj: { }
      },
      popButtonOnoff: true
    }
  },
  beforeCreate () {
    this.$store.state.loading = true
  },
  created () {
    this.taskHttp()
  },
  methods: {
    ListShowOnoff (d) {//列表展示更多层级
      d.onoff ? d.event.currentTarget.parentNode.parentNode.style.zIndex = '1231412' : ''
    },
    taskHttp () {
      this.axios.axiosget({
        url: '/user/task'
      }).then((ret) => {
        this.CodyList = []
        this.OtherList = []
        this.showList = []
        let codyList = []
        let codyList_com = []
        ret.data.data.forEach((obj, index) => {
          let type =  Object.prototype.toString.call(obj.reward)
          var buttonname = ''
          this.$set(obj, 'pop', false)
          this.$set(obj, 'rewardType', type == '[object Array]' ? 'Array' : type == '[object Object]' ? 'object' : '')
          switch (obj.type) {//区分判断不同类型区分不同按钮名和状态
            case 'register':
            buttonname = 'common.btn.r'
            this.$set(obj, 'station', true)
            this.$set(obj, 'url', 'Register')
            break
            case 'download-app':
            buttonname = 'common.btn.d'
            this.$set(obj, 'station', true)
            this.$set(obj, 'url', 'Download')
            break
            case 'invite':
            buttonname = 'common.btn.i'
            this.$set(obj, 'station', true)
            this.$set(obj, 'url', 'Invitation')
            break
            case 'telegram':
            buttonname = 'projects.join'
            // obj.status = 'pending'
            this.$set(obj, 'outlink', true)
            this.$set(obj, 'station', false)
            obj.pop = true
            this.$set(obj, 'url', obj.more.telegram_group_invite_link)
            break
            case 'outlink':
            buttonname = 'common.btn.t'
            this.$set(obj, 'outlink', true)
            this.$set(obj, 'station', false)
            obj.pop = true
            this.$set(obj, 'url', obj.more.outlink)
            break
            case 'kyc':
            buttonname = 'common.btn.k'
            obj.pop = true
            this.$set(obj, 'station', true)
            this.$set(obj, 'url', 'Kyc')
            break
            case 'signIn':
            buttonname = 'common.btn.s'
            this.$set(obj, 'outlink', false)
            this.$set(obj, 'station', true)
            this.$set(obj, 'signIn', true)
            obj.pop = true
            break
          }
          this.$set(obj, 'buttonname', buttonname)
          if (obj.post_id == 25) {//如果是cody项目时则区分到cody列表显示块

            if (obj.status == 'complete') {
              obj.buttonname = 'candy.completed'
              codyList_com.push(obj)
            } else {
              codyList.push(obj)
            }
          } else {//如果是其他则区分到其他列表
            this.$store.state.task.OtherList.push(obj)
            this.OtherList.push(obj)
          }
        })
        this.CodyList = Array.from(new Set([...codyList, ...codyList_com]))
        this.$store.state.task.CodyList = Array.from(new Set([...codyList, ...codyList_com]))

        this.axios.axios.all([this.http({type: 'upcoming,ongoing', dataList: 'AllList'}),
        this.http({type: 'ended', dataList: 'beexchangeList'}),
        this.http({type: 'exchanging', dataList: 'alexchangeList'})]).then(this.axios.axios.spread((upon, en, ex) => {
          this.$store.state.loading = false
        }))//当所有列表请求完毕后再让loading隐藏
      }).catch((error) => {
        console.log(error)
      })
    },
    http (opt) {
      this.axios.axiosget({//请求
        url: '/portal/articlesList',
        params: {
          page: 1,
          limit: 200,
          type: opt.type
        }
      }).then((ret) => {
        this[opt.dataList] = []
        ret.data.data.map((t, i) => {
          this.$set(t, 'heightonoff', false)
          this.$set(t, 'reward', [])
          this.$set(t, 'onoff', false)
          this.OtherList.map((obj, index) => {
            if (obj.post_id == t.id) {
              this.$set(obj, 'isPop', true)
              t.onoff = true
              t.reward.push(obj)
            }
          })
        })
        let onoff = false
        ret.data.data.forEach((obj, index)=>{
          if (obj.onoff) {
            onoff = true
          }
        })
        this[opt.dataList] = []
        if (onoff) {
          this[opt.dataList] = ret.data.data
        }
      }).catch((error) => {
          console.log(error)
        })
    },
    RouterPush (opt) {//进入项目详情页
      this.$router.push({name: 'Project', query: {id: opt.id}})
    },
    doFavorite (opt) {//收藏
      if (!localStorage.getItem('token')) {
        this.$message({
          content: this.$t('common.l')
        })
        this.$router.push({name: 'Login'})
        return
      }
      var url = ''
      if (!opt.onoff) {
        url = '/portal/articles/doFavorite'
      } else {
        url = '/portal/articles/cancelFavorite'
      }
      this.axios.axiospost({
        url: url,
        data: {id: opt.id}
      }).then((ret) => {
        switch (opt.type) {
          case 'news' :
          this.http({type: 'upcoming,ongoing', dataList: 'AllList'})
          break
          case 'ended':
          this.http({type: 'ended', dataList: 'beexchangeList'})
          break
          case 'exchanging':
          this.http({type: 'exchanging', dataList: 'alexchangeList'})
          break
        }
        if (ret.data.msg) {
          if (ret.data.code == 0 || ret.data.code == 10001) {
            this.$message({
              content: ret.data.msg,
            })
          } else {
            this.$message({
              content: ret.data.msg,
              type: 'check'
            })
          }
        } else {
          var content = ''
          if (!opt.onoff) {
            content = 'collect.collect'
          } else {
            content = 'collect.closecollect'
          }
          this.$message({
            content: this.$t(content),
            type: 'check'
          })
        }
      }).catch((error) => {
          console.log(error)
        })
    },
    showPop (opt) {//显示弹窗
      this.popButtonOnoff = true
      this.pop.obj = opt.obj
      if (opt.obj.status == 'pending') {
        this.axios.axiospost({
          url: '/user/getTelegramTaskReward',
          data: {id: opt.obj.id}
        }).then((ret) => {
          if (ret.data.code == 1) {
            this.$message({
              content: `${ret.data.msg}`,
              type: 'check'
            })
          }
          this.taskHttp()
        }).catch((error) => {
          console.log(error)
        })
        this.showonoff = false
        this.showList = []
        return
      }
      if (opt.obj.isPop) {
        var showData = {}
        this.showonoff = true
        if (opt.obj.steps !== '' && opt.obj.info.length >= 1) {
          showData.steps = opt.obj.steps
          showData.info = opt.obj.info
          showData.type = 'textImg'
        } else if (opt.obj.steps !== '') {
          showData.type = 'img'
          showData.steps = opt.obj.steps
        } else {
          showData.type = 'text'
          showData.info = opt.obj.info
        }
        this.showList.push(showData)

        if (opt.obj.pop && opt.obj.station) {
          this.pop.onoff = true
        }
        this.popButtonOnoff = false
        return
      }

      if (opt.obj.signIn) {
        this.axios.axiospost({
          url: '/user/getSignInTaskReward',
          data: {id: opt.obj.id}
        }).then((ret) => {
          if (ret.data.code == 1) {
            if (!opt.obj.outlink) {
              this.$message({
                content: `${this.$t('common.btn.sc')} ${ret.data.msg}`,
                type: 'check'
              })
            } else {
              this.$message({
                content: `${ret.data.msg}`,
                type: 'check'
              })
            }
          }
          this.taskHttp()
        }).catch((error) => {
          console.log(error)
        })
        this.showonoff = false
        this.showList = []
        return
      }
      this.outlinkUrl = opt.obj.url
      if (opt.obj.station && !opt.obj.pop) {
        this.$router.push({name: opt.obj.url})
      } else if (opt.obj.outlink || (opt.obj.pop && opt.obj.station)) {
        var showData = {}
        this.showonoff = true
        this.CodyList.map((obj, index) => {
          if (obj.id == opt.obj.id) {
            if (obj.steps !== '' && obj.info.length >= 1) {
              showData.steps = obj.steps
              showData.info = obj.info
              showData.type = 'textImg'
            } else if (obj.steps !== '') {
              showData.type = 'img'
              showData.steps = obj.steps
            } else {
              showData.type = 'text'
              showData.info = obj.info
            }
            this.showList.push(showData)
          }
        })
        if (opt.obj.pop && opt.obj.station) {
          this.pop.onoff = true
        }
        return
      }
    },
    goOutLink () {//外链
        this.showonoff = false
        this.showList = []
        if (!localStorage.getItem('token')) {
          this.$message({
            content: this.$t('common.l')
          })
          this.$router.push({name: 'Login'})
          return
        }
        if (this.pop.obj.type == 'outlink') {
          this.axios.axiospost({
            url: '/user/getTelegramTaskReward',
            data: {id: this.pop.obj.id}
          }).then((ret) => {
            if (ret.data.code == 1) {
              this.$message({
                content: `${ret.data.msg}`,
                type: 'check'
              })
            }
            this.taskHttp()
          }).catch((error) => {
            console.log(error)
          })
        }
        if (this.pop.onoff) {
          this.$router.push({name:this.outlinkUrl})
          return
        }
        if (!localStorage.getItem('token')) {
          this.$message({
            content: this.$t('common.l')
          })
          this.$router.push({name: 'Login'})
          return
        }
        window.open(this.outlinkUrl, '_blank')
    },
    openUrl (opt) {//打开链接
      if (!localStorage.getItem('token')) {
        this.$message({
          content: this.$t('common.l')
        })
        this.$router.push({name: 'Login'})
        return
      }
      if (opt.url.type == 'outlink') {
        window.open(opt.url.url, '_blank')
        this.axios.axiospost({
            url: '/user/getTelegramTaskReward',
            data: {id: opt.url.id}
          }).then((ret) => {
            if (ret.data.code == 1) {
              this.$message({
                content: `${ret.data.msg}`,
                type: 'check'
              })
            }
            this.taskHttp()
          }).catch((error) => {
            console.log(error)
          })
      } else {
        window.open(opt.url.url, '_blank')
      }
    },
    imgerr (event) {//图片错误
      event.currentTarget.style.display="none"
    },
    CodyReword (opt) {//进行cody活动任务
      if (!localStorage.getItem('token')) {
        this.$message({
          content: this.$t('common.l')
        })
        this.$router.push({name: 'Login'})
        return
      }
      if (opt.station) {
        this.$router.push({name: opt.url})
      } else if (opt.pop) {

      } else if (opt.outlink){
        window.open(opt.url, '_blank')
      }
    }
  },
  computed: {
    lang () {
      return this.$store.state.LANG
    }
  },
  watch: {
    lang () {//监听语言重新请求
      this.showonoff = false
      this.taskHttp()
    }
  }
}
</script>
<style lang="less" scoped>
  #task{margin-top:74px;background:#f2f3f8;overflow: hidden;
    /*.banner{height:330px;background:  url(/static/staticfile/images/taskbanner.jpg) no-repeat 50%;display:flex;align-items:center;flex-flow:column;justify-content: center;*/
      /*p{color:#ffffff;font-size: 50px;margin-bottom:50px;}*/
      /*a{color:#ffffff;font-size:24px;background:#357ce1;border-radius: 2px;display: block;padding: 0 30px;height:50px;line-height:50px;text-align: center;}*/
    /*}*/
    & /deep/ #banner{
      .singlebanner{
        i{
          background:rgb(53,124,225);
          background: linear-gradient( 30deg, rgb(53,124,225), rgb(0,194,206));
          background: -moz-linear-gradient(30deg, rgb(53,124,225), rgb(0,194,206));
          background: -webkit-linear-gradient(30deg, rgb(53,124,225), rgb(0,194,206));
          background: -ms-linear-gradient(30deg, rgb(53,124,225), rgb(0,194,206));
          background: -o-linear-gradient(30deg, rgb(53,124,225), rgb(0,194,206));
        }
      }
    }
    #pop{width:530px;background:#fff;position: fixed;top:50%;left:50%;transform:translateX(-50%) translateY(-50%);z-index: 999999;
        box-shadow: -6.364px 6.364px 36px 0px rgba(31, 30, 77, 0.2);
      h4{color:#5c6383;font-size:20px;text-align: center;height:76px;line-height:76px;
        box-sizing: border-box;border-bottom:1px solid #edeef0;
      }
      i.fa{position: absolute;top:20px;right:20px;font-size:20px;cursor: pointer;
        &.fa-remove{font-size:26px;}
      }
      img{display: block;margin: 10px auto;}
      div{max-height:530px;overflow: auto;padding:0 60px;margin-top:30px;
        span{display: block;
          img{display: block;width:100%;}
          i{display: block;margin-bottom:10px;line-height:1.75;}
        }
      }
      button{width:414px;height:52px;color:#fff;box-sizing: border-box;font-size: 16px;background:#fff;border-radius:2px;display:block;margin:30px auto;border-radius:52px;
        background: rgb(53,124,225);
        background: linear-gradient(30deg, rgb(53,124,225), rgb(0,194,206));
        background: -moz-linear-gradient(30deg, rgb(53,124,225), rgb(0,194,206));
        background: -webkit-linear-gradient(30deg, rgb(53,124,225), rgb(0,194,206));
        background: -ms-linear-gradient(30deg, rgb(53,124,225), rgb(0,194,206));
        background: -o-linear-gradient(30deg, rgb(53,124,225), rgb(0,194,206));
        &:hover{box-shadow: -1.302px 3.782px 8.4px 1.6px rgba(66, 146, 255, 0.22);}
      }
    }
    .wrap{width:1200px;margin:50px auto;
      ul{display: flex;flex-flow:wrap;
        li{border-radius:2px;margin-right:18px;cursor: pointer;
            // &:hover{box-shadow: 0px 6px 21px 0px rgba(27, 31, 68, 0.13);transition: box-shadow .2s}
            dt{display: flex;align-items:center;flex-flow:column;margin-bottom:18px;
              img{box-sizing: border-box;flex-shrink: 0;width:70px;height:70px;display: block;}
              p{display: flex;flex-flow: column;flex-grow: 2;
                span{color:#1b1f44;font-size: 18px}
                em{color:#a5aab0;font-size:14px;line-height:1.35;max-height:3.5em;overflow:hidden;text-overflow:ellipsis;
                  display:-webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;
                }
              }
              a{
                img{animation: zy 2s ease infinite;}
              }
              strong{color:#a5aab0;width:20px;height:20px;border-radius:1px;background:url('/static/staticfile/images/collect.png') no-repeat 50%;background-size: 18px 16px;
                &.act{background-image:url('/static/staticfile/images/collect_act.png');}
              }
            }
            dd{
              &.heightauto{transition:.3s;}
              div{
                height:30px;line-height:30px;display: flex;align-items: center;font-size:14px;white-space: nowrap;justify-content: space-between;
                span{font-size:14px;overflow: hidden;max-width:27em;text-overflow:ellipsis;white-space: nowrap;display:block;}
                p{max-width:28em;display: flex;white-space: nowrap;align-items:center;}
                a{font-size:12px;width:75px;border:1px solid #6d78a8;cursor: pointer;border-radius: 22px;color:#6d78a8;height:22px;line-height:22px;display:block;text-align:center;
                  &:hover{background:#6d78a8;color:#fff;}
                  &.ag{color:#d3d3d3;border-color: #d3d3d3;}
                }
                i{margin-left:20px;color:#a5aab0;}
              }
            }

        }
      }
      h3{color:#5a626d;font-size: 30px;text-align:left;margin:50px auto 20px;line-height:100%;}
      .official{
        ul{
          li{width:286px;height:180px;display: flex;flex-flow: column;justify-content: center;align-items: center;background:#fff;border-radius:2px;transition: box-shadow .2s;margin-bottom:20px;
            &:nth-child(4n){margin-right:0;}
            p{margin-bottom: 15px;padding: 0 10px;text-align: center;line-height: 1.3;font-size:16px;color:#1b1f44;}
            strong{font-size:14px;color:#1b1f44;display: block;margin-bottom:15px;
              span{color:#1b1f44;font-size:34px;b{font-size:14px;}}
            }
            button{color:#fff;box-sizing: border-box;font-size: 16px;background:#fff;border-radius:2px;
              &.complete{background:#caccd1;}
              /*&:hover{background:#357ce1;color:#fff;}*/
              background:rgb(53,124,225);
              background: linear-gradient(30deg, rgb(53,124,225), rgb(0,194,206));
              background: -moz-linear-gradient(30deg, rgb(53,124,225), rgb(0,194,206));
              background: -webkit-linear-gradient(30deg, rgb(53,124,225), rgb(0,194,206));
              background: -ms-linear-gradient(30deg, rgb(53,124,225), rgb(0,194,206));
              background: -o-linear-gradient(30deg, rgb(53,124,225), rgb(0,194,206));
              width: 158px;
              height: 35px;
              border-radius:35px;
              &:hover{box-shadow: -1.302px 3.782px 8.4px 1.6px rgba(66, 146, 255, 0.22);}
              /*&.pending{background:#357ce1;color:#fff;}*/
            }
          }
        }
      }
      .news{
        ul{
          li{width:590px;height:224px;flex-shrink: 0;margin-bottom:20px;box-sizing:border-box;position:relative;background:#fff;
            &:nth-child(2n){margin-right:0;}
            dl{width:590px;box-sizing: border-box;position:absolute;top:0;left:0;background:#fff;z-index: 123;
              &.comp{padding-bottom:30px;}
              &:hover{box-shadow: 0px 6px 21px 0px rgba(27, 31, 68, 0.13);transition: box-shadow .2s}
            }
            dt{height:70px;border-bottom:1px solid #f2f3f8;padding-bottom:28px;flex-flow:row;padding:28px;
              img{border:1px solid #f2f3f8;margin-right:20px;}
              p{height:100%;justify-content: space-around;
                span{display: block;height:34px;line-height:34px;
                  img{width:auto;height:auto;border:none;}
                  i{margin-right:8px;}
                  a{display: inline-block;margin-left:20px;height:34px;line-height:34px;vertical-align:top;
                    img{margin:0;}
                  }
                  strong{display: flex;align-items:center;float:right;
                  }
                }
              }
            }
            dd{padding:0 28px;height:60px;transition: .3s;background:#fff;overflow:hidden;
              &.showBtnBox{height: 30px;width: 100%;background: transparent;padding: 0;line-height: 30px;text-align:center;
                button{width:100%;text-align: center;background:transparent;height:30px;}
              }
            }
          }
        }
      }
      .alexchange,.beexchange{
        ul{
          li{width:286px;height:395px;background:#fff;flex-shrink: 0;margin-bottom: 20px;padding: 20px 28px;box-sizing: border-box;
            &:nth-child(4n){margin-right:0;}
            dt{align-items: center;padding-bottom:14px;border-bottom:1px solid #f2f3f8;height:280px;box-sizing:border-box;
              img{margin:36px auto 20px;}
              strong{display: flex;justify-content: flex-end;width: 100%;align-items:center;
                i{margin-right:8px;}
                img{width:auto;height:auto;margin:0 26px 0;}
              }
              p{
                span{text-align: center;margin-bottom:30px;}
                em{overflow: hidden;text-overflow:ellipsis;height:5.25em;display:-webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;}
              }
            }
          }
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
