<template>
  <div :class="{'invitationbox': loading}">
    <div id="invitation" v-if="!loading">
      <dl>
        <dt>
          <span>{{years}}{{$store.state.LANG == 'zh-cn' ? $t('invitation.title1') : '-'}}{{month <= 9 ? '0'+month:month}}{{$t('invitation.title2')}}</span>
          <p>
            <em>{{boardlist.people}} {{$t('invitation.num')}}</em>
            <strong>{{boardlist.rewards}} {{$t('invitation.reward')}}</strong>
          </p>
        </dt>
        <dd v-for="(z, i) in boardlist.list" :key="i">
          <i :class="'pm'+i"></i>
          <span v-if="z.mobile">+{{z.iso_code ? z.iso_code : '86'}} {{z.mobile}}</span>
          <span v-if="!z.mobile">{{z.user_email}}</span>
          <strong>{{z.total}} {{$t('invitation.person')}}</strong>
        </dd>
      </dl>
      <div class='info'>
        <h4>{{$t('invitation.info.title')}}</h4>
        <ul>
          <li>
             <label>{{$t('invitation.info.inviteCode')}}</label>
            <div>
              <input type="text" :value="infolist.inviteCode"  disabled>
              <button id="copy-code"
                @click.stop="copycode">{{$t('invitation.info.copycode')}}</button>
            </div>
          </li>
          <li>
             <label>{{$t('invitation.info.img')}}</label>
            <button @click.stop="poponoff=true"  class="btnhover">{{$t('invitation.info.clearimg')}}</button>
          </li>
          <li>
             <label>{{$t('invitation.info.url')}}</label>
            <div>
              <input type="text" :value="infolist.inviteUrl" disabled>
              <button id="copy-url" :data-clipboard-text="infolist.inviteUrl" @click.stop="copyurl">{{$t('invitation.info.copyurl')}}</button>
            </div>
          </li>
        </ul>
      </div>
      <div class='rule'>
        <h4>{{$t('invitation.rule.title')}}</h4>
        <ol>
          <li v-for="(s, i) in descriptionlist.info" :key="i">{{s}}</li>
        </ol>
      </div>
      <div class='log'>
        <p>
          <span>
            <i @click.stop="logonoff=true" :class="{'act': logonoff}">{{$t('invitation.rule.log')}}</i>
            <i @click.stop="logonoff=false" :class="{'act': !logonoff}">{{$t('invitation.rule.reward')}}</i>
          </span>
          <router-link v-if="rewardlist.length >= 1" :to="{name: 'InvitationMore', params: {type: logonoff}}">{{$t('invitation.rule.more')}}</router-link>
        </p>
        <ul v-if="logonoff" >
          <li v-for="(s, i) in loglist" :key="i">
            <span>{{s.mobile ? '+'+ s.iso_code + ' '+ s.mobile : s.user_email}}</span>
            <strong>{{DefaultJs.getTime(s.create_time).formatting}}</strong>
          </li>
          <li v-if="rewardlist.length < 1" class="notInveData" >
            {{$t('common.noRecords')}}
          </li>
        </ul>
        <ul v-if="!logonoff">
          <li v-for="(s, i) in rewardlist" :key="i">
            <span>{{s.coin_number + ' ' + s.token_name}}</span>
            <strong>{{DefaultJs.getTime(s.create_time).formatting}}</strong>
          </li>
          <li v-if="rewardlist.length < 1" class="notInveData" >
            {{$t('common.noRecords')}}
          </li>
        </ul>

      </div>
      <div id="pop" v-if="poponoff">
        <h4>{{$t('invitation.rule.pop.text1')}} <i @click.stop="poponoff = false" class="fa fa-times" aria-hidden="true"></i></h4>
        <section>
          <loadingcenter v-if="invitePosterUrlOnoff" />
          <img @load="invitePosterUrlOnoff = false" ref="downimg" id="downimg" :src="infolist.invitePosterUrl" alt="">
        </section>
        <div>
          <img :src="'data:image/png;base64,'+ infolist.invitePosterUrlQrcode" alt="poster">
          <p>
            <span>{{$t('invitation.rule.pop.text2')}}</span>
            <strong>{{$t('invitation.rule.pop.text3')}}{{$t('invitation.rule.pop.text4')}}</strong>
            <i>*{{$t('invitation.save')}}</i>
          </p>
          <!-- <a href="javascript:;" id="downa" @click.stop="down({imgurl: (infolist.invitePosterUrl).slice(0,-5) +'.jpg?output=embed'})">{{$t('invitation.rule.pop.down')}}</a> -->
        </div>
      </div>
    </div>
    <loadingcenter v-else />

  </div>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('menu.invitation.title') + this.$t('seo.title'),
      meta: [{
        name: 'keywords',
        content: this.$t('seo.keywords')
      }, {
        name: 'description',
        content: this.$t('seo.description')
      }],
    }
  },
  data () {
    return {
      notInviData: true,
      logonoff: true,
      loading: true,
      years: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      boardlist: '',
      infolist: '',
      descriptionlist: '',
      loglist: '',
      rewardlist: '',
      poponoff: false,
      copybtnUrl: '',
      copybtnCode: '',
      invitePosterUrlOnoff: true
    }
  },
  created () {
    this.allhttp()
  },
  methods: {
    allhttp () {
      this.axios.axios.all([this.http({url:'/inviteBoard'}), this.http({url:'/inviteInfo'}), this.http({url:'/inviteDescription'}), this.http({url:'/inviteLog', params: {page: 1, limit: 10}}), this.http({url:'/inviteReward', params: {page: 1, limit: 10}}),]).then(this.axios.axios.spread((boarddata, infodata, descriptiondata, logdata, rewarddata) => {
        this.boardlist = boarddata.data.data
        this.infolist = infodata.data.data
        this.descriptionlist = descriptiondata.data.data
        this.loglist = logdata.data.data
        this.rewardlist = rewarddata.data.data
        this.loading = false
      })).catch((error) => {
        console.log(error)
      })
    },
    copyurl () {
      this.$copyText(this.infolist.inviteUrlCopy).then((e) => {
        this.$message({
          content: this.$t('common.success'),
          type: 'check'
        })
      }, (e) => {
        this.$message({
          content: 'Can not copy',
        })
      })
    },
    copycode () {
        this.$copyText(this.infolist.inviteCode).then((e) => {
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
    http (opt) {
      return this.axios.axiosget({
        url: opt.url,
        params: opt.params
      })
    },
    down (opt) {
      var imgurl = opt.imgurl
      var image = this.$refs.downimg
      var _that = this

      function browserIsIe() {
        if (!!window.ActiveXObject || "ActiveXObject" in window){
            return true;
        }
        else{
            return false;
        }
      }
    //创建iframe并赋值的函数,传入参数为图片的src属性值.
    function createIframe(imgSrc) {
      //如果隐藏的iframe不存在则创建
      //iframe的src属性如不指向图片地址,则手动修改,加载图片
      if (_that.$refs.IframeReportImg.src != imgSrc) {
        _that.$refs.IframeReportImg.src = imgSrc
      } else {
        //如指向图片地址,直接调用下载方法
        _that.downloadImg();
      }
    }
    //下载图片的函数

    //接下来进行事件绑定
      var imgSrc = opt.imgurl
      //调用创建iframe的函数
      createIframe(imgSrc);
      // image.setAttribute('crossOrigin', 'anonymous')
      // image.onload = () => {
      //   var canvas = document.createElement('canvas')
      //   canvas.width = image.width
      //   canvas.height = image.height
      //   var context = canvas.getContext('2d')
      //   context.drawImage(image, 0, 0, image.width, image.height)
      //   var url = canvas.toDataURL('image/png')
      //   var a = document.getElementById('downa')
      //   a.download = this.infolist.inviteCode
      //   a.href = url
      // }
      // image.src = document.getElementById('downimg').src
    },
    downloadImg() {
      //iframe的src属性不为空,调用execCommand(),保存图片
      if (this.$refs.IframeReportImg.src != "about:blank") {
        window.frames["IframeReportImg"].document.execCommand("SaveAs");
      }
    }
  },
  computed: {
    lang () {
      return this.$store.state.LANG
    }
  },
  watch: {
    lang () {
      this.allhttp()
    }
  }
}
</script>
<style lang="less" scoped>
  .invitationbox{position:relative;height:500px;background:#fff;}
  #invitation{
    strong{font-weight: normal;}
    dl{background:#fff;border-radius:2px;
      dt{display: flex;height:60px;line-height:60px;color:#222c38;font-size:16px;font-weight: normal;border-bottom:1px solid #f2f3f8;
        align-items: center;padding:0 30px;justify-content: space-between;
        span{}
        p{
          em{margin-right:70px;}
          strong{font-weight: normal;}
        }
      }
      dd{height:74px;line-height:74px;display: flex;border-bottom:1px solid #f2f3f8;padding:0 30px;align-items:center;
        i{display: block;width:27px;height:38px;flex-shrink: 0;margin-right:340px;}
        i.pm0{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAmCAMAAAAC7hAUAAAA2FBMVEUAAADxb1fxb1fzk4L/4D//4D//4UD930H/4UD/4UD/4UD/4UD/+/L/4D7/4T7/4UD/4UD/4UD4sUr/4UD/4UD+4EH/4UDxb1f/4UD4vF/0m3v5sEr/4UD//vj/4UDxb1f/////4UD/4ED9wDHxb1f39/f////+2Tn4th79xTX+0TP87Jb+4qD+1Hf4qkz7yCv6uyX+5kDzp5n6wij9yUrzfWP89ub/8tb88tD/9cH+3pL86YD+0mr7yWT/5Vv+2FL/40v+7L/677H+4qr3rqD95mr2l0/9wkD5c9BTAAAAInRSTlMA0sT20HoT4bVoTzP+9cM7Hurn2JmHX11E+/e+pH9vLRsKny/mQAAAAU5JREFUOMvV0OdWg0AQhuFRU0hI73YFBZY0DKRX+/3fkd+sm2zkJPnv+wfOPGdYgKyjpU/bCxcby1ma6pUet2zrLuWkkiQ6e+IGz7oLOTmnf2bDE/YxmLQ/N9ZmNX8bxWyYW1u75ld/7N1pW3t9ba15Nuw4jkTXVdgDNWEPtzmHy80iIWzhS7y+J1ltNQVNlgKEhFw2JZm4mzqvLCrGhDQDd2sngizGC41ZUMlCoiPsCG/U/TWBkQHL4OqLyLbHzohNxi/0SHTDazaadTs7C/HUIlEBpiZserFBlDhmmWPWd9mMQxbA8BF1mIibBysRtWD+AasSSuP/x8wLfCvJdqcXv9VpXujmU8RVsRjaukCtcWYei2GwJc/DaQVSZS1GzwvsIIDgAxIp2lYsA/tQltB3C5JUJQNn+n4f+W5enaVXa2UwSiT1ks7MZhqtffgBRLJ5zVNAF+0AAAAASUVORK5CYII=) no-repeat 0 0;}
        i.pm1{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAmCAMAAAAC7hAUAAAAolBMVEUAAADB0NNPrOuixtqGxO/I1tfI1tft8fG30NzI1tfI1tfI1tfI1tfI1tfI1tfI1tfI1tfE0tXI1tfI1tfI1tfI1telyNlPrOtstufI1tfI1tdPrOvI1teayujI1tf6+/uxwMTH1tdPrOv3+PjB0NOzxsn///+4yszT3t+9zs/Z4ePP2duKxu/w8/Pf5+pbsOrl6uuWzPF3vu+92+1ns+ajyd2pHLiIAAAAIHRSTlMA3dL29AgY/f26mCTj3M7Er6hxZDjx6JiGVEUYDveCRjSpiDcAAAFaSURBVDjL3dAJcoIwGIbhdAEE3PeqbROzAKGg3e5/tX5/CEKdsQfo64xInskmu7sdU7f702brB2qQdw3cyHrG2P2RepNdj27knv0jO73LqLZlWdq6uraPz1K05c+/7FRHotf3ydvmePwSxuR9HAA3DO23uTTG2CLTKFMOt3ui4DUyrkpozfEpCGPmehFuXqlBroxwQRSuhCilURBrbdHiMIDN8aOwZ+xUGVQS0p5PsAme2EPzM8YzKduJMxwFD4VJnMsKo9ZoP3HIWArL3LtQ+JKGU3TWgC3JeFtt7OWoIZlqLYtMzXuWdibolN4UrRlcTJlKc1+hxAh3mApVcCoyZ4s40piWwBZ0B3o3TdovuYMdVn5R3eS3GwUMzbEosAtEfxkVjDFR6440TjJlTeHQofaSgcYH5ktHtKx2NRSySyEuAkUQJZKA9dtNoC4RL9l16TyJJ3Gy6Jb7AbCrbj+zlkcWAAAAAElFTkSuQmCC) no-repeat 0 0;}
        i.pm2{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAmCAMAAAAC7hAUAAAArlBMVEUAAAD2n1ty0mGg35TyqGf2oFz2oF32oF32oF32oF32oF32oF32oF32oF3NsF72oF32oF1y0mH2oF2r1oz85dLG6bp00WH2oF32oF2q5KD//fty0mH////3oV3zfDpy0mH39/f1mVb////yhEH0klHzi0j+9/P85dj3qXz5wqT3sIn78uv3vI74uZb73Mj6y7H96972yKP3wJn4s3z2oXDZ89T317+00YmM0nGxul95AE8CAAAAHXRSTlMAu9L9CPPkN2PEHZWGSP7WzMMp++XYq6RzaFNKF9gRKJ8AAAFaSURBVDjL3ZJXcsMwDEQZq7jHJb2ANiFS3d1p979YAJaJnRnnAHmf+2YBUCNxdRkBl/nTJRdVIkRnwUTLHyKbdMQ/clG0bN53bdvu1s1v9/bRQmB/c+YiPMAJX8HNFovPBrcASmmtlWJ5TW5GLn66yxGx2atMEplWLO9fBPH6fIvMujQykxlZliNh6cEhx/woPZmTXVZxCtBiybHhJsGy72qgzJYyWCMWtWSMcsUrAC2ppvN8UzU0gFFuYwLKjtpwXGNlnQaYCjEAcMevOC29M/Z36Tpn9bEuci3DNbF3jgJxJU/cPPQYvQkzydHzgG8hKq4YLMItE7qzD6DdQE2Zd1Qbknv0C2t6eF1gHUaOBT/CF6scMV+FWhoLYhg2yrKUYRv0hP/YQXrlPzXTTUjanWEXpAPhGZMkq40xWlk194abKZzSt61APEogkNozzmzvYZJAMh2O4xB9A7vLY9YgSN6PAAAAAElFTkSuQmCC) no-repeat 0 0;}
        span{display: block;width:400px;height:100%;line-height:74px;font-size:14px;}
        strong{width:100px;flex-shrink: 0;text-align: right;height:74px;line-height:74px;margin-left:55px;font-size:14px;}
      }
    }
    h4{height:60px;line-height:60px;display:flex;align-items: center;border-bottom:1px solid #f2f3f8;padding:0 30px;font-weight: normal;font-size:16px;}
    div.info{background:#fff;margin:10px 0;border-radius:2px;padding-bottom:60px;
      ul{display:flex;margin-top:30px;
        li{color:#a5aab0;font-size:14px;padding:0 30px;
          &:nth-child(2) {padding:0 20px;}
          label{display: block;margin-bottom:10px;font-size:14px;}
          button{width:240px;height:50px;line-height: 50px;color:#fff;background: #357ce1;border-radius: 2px;font-size:16px;}
          div{display: flex;border:1px solid #d7d7d7;margin-right:20px;
            button{width:106px;flex-shrink: 0;height: 50px;line-height:50px;font-size:14px;color:#5a626d;background:#f4f5f5;border-radius: 0;border-radius:0 2px 2px 0;position:relative;
              &:after{display: block;content:'';width:1px;height:1.5em;position: absolute;top:0;left:0;bottom:0;background:#d7d7d7;margin:auto;}
              &:hover{color:#357ce1;}
            }
            input{text-indent:1em;font-size:14px;color:#222c38;border-radius: 2px 0 0 2px;background:#f4f5f5;}
            &:first-child{margin:0;}
          }
        }
      }
    }
    div.rule{background:#fff;padding-bottom:30px;
      ol{margin-top:30px;}
      li{line-height:1.75;font-size:14px;color:#222c38;padding:0 30px;}
    }
    div.log{margin:10px 0 40px;background:#fff;
      p{height:60px;line-height:60px;display:flex;align-items: center;padding:0 30px;border-bottom:1px solid #f2f3f8;justify-content: space-between;
        span{display:flex;height:60px;line-height:60px;align-items:center;
          i{margin-right:50px;display: block;height:60px;line-height:60px;box-sizing:border-box;cursor: pointer;font-size:14px;
            &.act{color:#357ce1;border-bottom:2px solid #357ce1;}
          }
        }
        a{color:#a5aab0;font-size:14px;}
      }
      ul{max-height:510px;overflow: hidden;}
      li{height:50px;line-height:50px;display: flex;justify-content:space-between;color:#222c38;font-size:14px;padding:0 30px;border-bottom:1px solid #f2f3f8;align-items: center;
        span{font-size: 14px;}
        strong{width:140px;flex-shrink: 0;display: block;text-align: left;font-size:14px;white-space: nowrap;}
      }
    }
    #pop{position:fixed;top:0;left:0;right:0;bottom:0;margin:auto;width:500px;height:700px;background:#fff;border-radius:2px;text-align:center;z-index:12345;
      box-shadow: -6.364px 6.364px 36px 0px rgba(31, 30, 77, 0.2);border-radius:2px;
      h4{text-align: center;display:block;margin-bottom:20px;position: relative;
        i.fa{position: absolute;top:10px;right:10px;font-size:22px;cursor: pointer;;}
      }
      section{position:relative;height:460px;
        img{width:260px;height:460px;display: block;margin:0 auto;}
        & /deep/ #loading-center{width:200px;height:200px;
          margin:auto;padding:0;border:none;position:absolute;right:0;bottom:0;left:0;top:0;
          /*&-absolute{*/
            /*transform: scale(.4);*/
          /*}*/
        }
      }
      div{border-top:1px solid #f2f3f8;padding:4px;margin-top:20px;display:flex;align-items:center;justify-content: center;
        // span{text-align: left;font-size:14px;}
        img{width:120px;height:120px;display: inline-block;margin:0;margin-left:20px;}
        // a{width:200px;height:40px;line-height:40px;text-align: center;color:#fff;font-size:14px;background: #357ce1;border-radius: 2px;}
        p{text-align: left;margin-left:10px;
          span{font-size:18px;display:block;}
          strong{font-size:16px;font-weight: normal;display:block;margin-top:10px;}
          i{font-size:12px;display:block;margin-top:20px;}
        }
      }
      iframe{position: absolute;z-index: -12345;width:1px;height:1px;}
    }
    li.notInveData{height: 100px!important;text-align: center!important;line-height: 100px!important;display: block!important;}
  }
</style>
