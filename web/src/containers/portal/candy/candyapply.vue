<template>
  <div id="candyapply">
    <banner type="candyapply-pc" ></banner>
    <article>
      <div>
        <ul>
          <li v-for="(s, i) in $t('task.apply.list.features')" :key="i">
            <img :src="s.url || ('/static/staticfile/images/candy/stoapply'+ (i+1) +'.png')" alt="">
            <p v-html="s.title"></p>
            <span v-for="(ss, ii) in s.details" :key="ii" v-html="ss"></span>
          </li>
        </ul>
      </div>
      <section class="packageList">
        <div>
          <h4>{{$t('task.apply.package')}}</h4>
          <dl v-for="(s, i) in $t('task.apply.list.packages')" :key="i">
            <!--<dt :style="'background-image:url(/static/staticfile/images/candy/package'+ (i+1) +'.png)'">{{s.name}}</dt>-->
            <dt>{{s.name}}</dt>
            <dd v-for="(ss, ii) in s.details" :key="ii">
              <span>{{ss.service}}</span>
              <em>{{ss.time}}</em>
              <b v-if="ss.provide" class="confirm"></b>
              <b v-else class="error"></b>
            </dd>
            <dt class="price">
              <p>{{$t('task.apply.price')}}：{{s.price}}</p>
              <span>{{$t('task.apply.originalPrice')}}：{{s.originalPrice}}</span>
            </dt>
          </dl>
        </div>
        <p class="ps">{{$t('task.apply.ps')}}：<span v-for="(s, i) in $t('task.apply.list.remarks')" :key="i" v-html="$t(s)"></span></p>
      </section>
      <main>
        <h4>{{$t('task.example')}}</h4>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiperbanner" @mouseover="on_top_enter" @mouseleave="on_top_leave">
          <swiper :options="swiperOption" ref="mySwiper" :data-lang="$store.state.LANG">
            <swiper-slide v-for="(s, i) in $t('task.caseShow')"  :data-lang="$store.state.LANG" :key="i">
              <section :class="s.class">
                <div>
                  <p>
                    <strong class="title" v-if="s.title" v-html="s.title"></strong>
                    <span class="value" v-if="s.value" v-html="s.value"></span>
                  </p>
                  <p>
                    <strong class="subtitle" v-if="s.subtitle" v-html="s.subtitle"></strong>
                    <span class="subvalue" v-if="s.subvalue" v-html="s.subvalue"></span>
                  </p>
                </div>
                <img :src="s.images" alt="" v-if="!s.partner">
                <div v-else class="partner">
                  <img v-for="(ss, ii) in s.partner" :key="ii" :src="'/static/staticfile/images/logo/'+ (ii + 1) +'.png'" alt="">
                </div>
              </section>
            </swiper-slide>
          </swiper>
          <span class="swiper-button">
            <i class="swiper-button-next"></i>
            <b class="swiper-button-prev"></b>
          </span>
        </div>
      </main>
      <div class="push">
        <section>
          <h5 v-html='$t(inputList.name)'></h5>
          <p v-html="$t(inputList.ps)"></p>
          <article>
            <label v-for="(s, i) in inputList.list" :key="i">
              <span><em style="color:red">*</em><i v-html="$t(s.name)"></i></span>
              <input type="text" v-if="s.type=='text'" v-model.trim="updata[s.model]">
              <selectbox :default_value='$t(packgeList[0])' :lists="packgeList" :type="'text'" @selectvalue='selectvalue' v-if="s.type=='select'"></selectbox>
            </label>
          </article>
          <article>
            <label>
              <span><em style="color:red">*</em>{{$t(emailname)}}</span>
              <input v-model.trim="updata[emailmodel]" />
            </label>
            <label>
              <span><em style="color:red">*</em>{{$t(textareaname)}}</span>
              <textarea name="" id="" cols="30" rows="10" v-model.trim="updata[textareamodel]"></textarea>
            </label>
          </article>
        </section>
        <div class="btn">
          <button @click.stop="submit" class="btnhover">{{$t('task.apply.inputList.submit')}}</button>
        </div>
      </div>
    </article>
    <div id="pop" v-if="submitOnoff">
      <p>{{$t('common.submitsucc')}}</p>
      <span>{{$t('sto.apply.relation24')}}E-mail: support@coindy.com</span>
      <button @click="submitOnoff = false,$router.push({name: 'Candy'})">{{$t('common.ok')}}</button>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('footer.product.list.drop.name') + this.$t('seo.title'),
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
      list: '',
      submitOnoff: false,
      packgeList: [],
      pagesList: [],
      packge: '',
      ps: '',
      inputList: {
        name: 'task.apply.inputList.name',
        ps: 'task.apply.inputList.ps',
        list: [
          {name: 'task.apply.inputList.list.package', type: 'select', model: 'package'},
          {name: 'task.apply.inputList.list.post_title', type: 'text', model: 'post_title'},
          {name: 'task.apply.inputList.list.start_time', type: 'text', model: 'start_time'},
          {name: 'task.apply.inputList.list.contact_phone', type: 'text', model: 'contact_phone'},
        ],

      },
      emailname: 'task.apply.inputList.list.contact_email', 
      emailtype: 'text', emailmodel: 'contact_email',
      textareaname: 'task.apply.inputList.list.message', 
      textareatype: 'textarea', textareamodel: 'message',
      updata: {
        package: '',
        post_title: '',
        contact_phone: '',
        contact_email: '',
        message: '',
        start_time: ""
      },
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          bulletClass: 'pagination-class',
          bulletActiveClass: 'pagination-class-active',
          renderBullet: (index, className) => {
            return `<span class=${className}>${this.$t('task.caseShow')[index].title}</span>`
          }
        },
        observer:true,
        observeParents:true,
        observeSlideChildren:true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        autoplay: {
          delay: 4000,
          disableOnInteraction:false,
        },
        loop: false
      }
    }
  },
  created () {
    let data = this.$t('task.apply.list.packages')
    data.forEach((obj, index)=>{
      this.packgeList.push(obj.name)
    })
  },
  methods: {
    selectvalue(d) {
      this.updata.package = this.$t(d.value)
    },
    on_top_enter() {
      this.mySwiper.autoplay.stop()
    },
    on_top_leave() {
      this.mySwiper.autoplay.start()
    },
    submit () {
      for (var z in this.updata) {
        if (this.updata[z] == '') {
          this.$message({
              content: this.$t('common.fullmessage'),
          })
          return
        }
      }
      var mreg = this.DefaultJs.REG.notchinamobilereg
      if (!mreg.test(this.updata.contact_phone)) {
        this.$message({
          content:this.$t('find.mobileerror')
        })
        return
      }
      var ereg = this.DefaultJs.REG.emailreg
      if (!ereg.test(this.updata.contact_email)) {
        this.$message({
          content:this.$t('find.emailerror')
        })
        return;
      }
      this.axios.axiospost({
        url: '/pr/apply',
        data: this.updata
      }).then((ret) => {
        if (ret.data.code == 1) {
          this.submitOnoff = true
        }
      }).catch((error) => {
          console.log(error)
        })
    }
  },
  computed: {
    lang () {
      return this.$store.state.LANG
    },
    mySwiper() {
      // mySwiper 是要绑定到标签中的ref属性
      return this.$refs.mySwiper.swiper
    },
    myBotSwiper() {
      return this.$refs.myBotSwiper.swiper
    }
  },
  watch: {
    lang () {
      this.mySwiper.observer.init()
      let data = this.$t('task.apply.list.packages')
      this.packgeList = []
      data.forEach((obj, index)=>{
        this.packgeList.push(obj.name)
      })
    },
  }
}
</script>
<style lang="less" scoped>
#candyapply{
  article{background:#f5f6fa;
    div{background:#fff;height:410px;height:410px;overflow: hidden;;}
  }
  ul{display: flex;justify-content: space-around;width:1200px;margin:80px auto 0;
    li{text-align: center;width:22%;
      img{display: block;margin:0 auto 40px;}
      p{color:#5a626d;font-size:24px;margin-bottom:20px;}
      span{display: block;color:#5a626d;font-size: 14px;margin-bottom:10px;line-height:1.7;}
    }
  }
  label{display:block;width:100%;flex-shrink: 0;
    span{display: block;}
  }
  section{display:flex;flex-flow:wrap;justify-content:space-around;
    &.packageList{background:url('/static/staticfile/images/candy/packagebg.jpg') no-repeat;height:877px;background-position: 50%;
      h4{color:#fff;}
    }
    div{background:none;height:auto;width:1200px;margin:0 auto;display: flex;flex-flow:wrap;justify-content: space-around;padding-bottom:20px;}
    h4{width:100%;flex-shrink: 0;text-align: center;color:#5a626d;font-size: 30px;margin:80px 0 60px;line-height:100%;height:1em;}
    dl{width:380px;height:510px;background:#fff;box-shadow: 0px 8px 16px 0px rgba(31, 30, 77, 0.09);border-radius:2px;    display: flex;flex-flow: column;
      background-image: linear-gradient( -180deg, rgb(20,66,139) 0%, rgb(13,44,93) 100%);
      background-image: -moz-linear-gradient( -180deg, rgb(20,66,139) 0%, rgb(13,44,93) 100%);
      background-image: -webkit-linear-gradient( -180deg, rgb(20,66,139) 0%, rgb(13,44,93) 100%);
      background-image: -ms-linear-gradient( -180deg, rgb(20,66,139) 0%, rgb(13,44,93) 100%);
      dt{color:#fff;font-size: 24px;text-align: center;height:130px;line-height: 130px;
        &.price{height:156px;line-height:100%;margin:30px 0 0 0;color:#fff;display:flex;flex-flow: column;align-items: center;justify-content: space-evenly;
          p{font-size: 24px;color:#fff;}
          span{color:#dee0e5;font-size:18px;text-decoration: line-through;}
        }
  }
      dd{color:#fff;font-size: 14px;height:54px;line-height: 54px;display: flex;justify-content: space-around;padding:0 50px;align-items:center;
        span{width:170px;flex-shrink: 0;display: block;font-size:14px;white-space: nowrap;}
        em{width: 80px;flex-shrink: 0;display: block;font-size:14px;}
        b{width:18px;flex-shrink: 0;display: block;text-align:right;background:url('/static/staticfile/images/candy/confirm.png') no-repeat ;
          background-size: 18px;height:18px;
          &.error{background:url('/static/staticfile/images/candy/error.png')}

        }
      }
    }
  }
  main{height:850px;overflow:hidden;background:#fff;
    h4{color:#012868;font-size:30px;line-height:250px;text-align: center;background:#fff;height:210px;}
    div{overflow:visible;height:auto;}
    i.swiper-button-next{top:60%;display: block;right:0;opacity: .5;width:60px;height:60px;position:absolute;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8BAMAAADI0sRBAAAAElBMVEUDAg/s7O23t7oxMTujo6f///+Yj3a5AAAABXRSTlNm5bNzpCcJONsAAAAvSURBVDjLYxgFo2AUkA6c8UsrGuCVZhImoB2raCgckKMbYTclLndmGAWjYBQgAQCBlATnzRGBEwAAAABJRU5ErkJggg==) no-repeat;
      &:hover{opacity:1;}
    }
    b.swiper-button-prev{top:60%;display: block;left:0;opacity: .5;width:60px;height:60px;position:absolute;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8BAMAAADI0sRBAAAAElBMVEUDAg/s7O23t7oxMTujo6f///+Yj3a5AAAABXRSTlNm5bNzpCcJONsAAAAwSURBVDjLYxgFo2AUkABM8MoyC+GVNlTAK41fM0MoHODQTYndzEKE/D0KRsEowAQAtr0EqyQ77M0AAAAASUVORK5CYII=) no-repeat;;
      &:hover{opacity:1;}
    }
    .swiper-pagination{width:1200px;margin:0 auto;height:60px;display:flex;position:relative;justify-content: center;cursor: pointer;
      & /deep/ span{color:#082950;font-size:20px;display:block;width:220px;height:60px;line-height:60px;cursor: inherit;
        &.pagination-class-active{background:#082950;color:#fff;}
      }
    }
    span.swiper-button{display:none;}
    .swiperbanner{background: url('/static/staticfile/images/candy/showbg.jpg') no-repeat;height:578px;background-position: 50%;cursor: grab;
      .swiper-container{padding-top:126px;box-sizing: border-box;height:578px;}
      &:hover{
        span.swiper-button{display:block;}
      }
    }
    .swiper-slide{background:none;
      section{width:1200px;justify-content:flex-start;
        &.banner_ds{
          div{margin-right: 40px;}
          .title{margin-top:40px;margin-bottom: 10px;}
          p{
            span{margin-bottom: 44px;}
          }
        }
        &.banner_pack{
          margin-top: -56px;
          flex-flow:column;
          p{max-width: 100%;}
          div{width:100%;padding:0;}
          .partner{
            flex-flow: row;
            flex-wrap: wrap;
            img{margin:0 32px 20px 0;
              &:nth-child(5n){margin-right:0;}
            }
          }
        }
        &.candy{margin-top:-56px;
          .title{margin-top: 96px;margin-bottom:10px;}
          p{
            span{}
          }
        }
        &.candy_act{
          .title{margin-top:100px;}
        }
        margin:0 auto;height:auto;display:flex;text-align: left;flex-flow: row;
        .title{margin-top:60px;}
        div{color:#fff;flex-shrink: 0;margin:0 140px 0 10px;display:flex;flex-flow: column;width:auto;justify-content: start;
          p{max-width:500px;
            strong{display:block;font-size:26px;line-height:100%;margin-bottom:20px;}
            span{display:block;font-size:16px;line-height:1.5;margin-bottom:30px;}
          }
        }
        img{flex-shrink: 0}
        .parther{
          img{width:214px;height:73px;}
        }
      }
    }
    div{background:none;
    }
  }
  p.ps{width:1180px;margin:10px auto 60px;padding:30px 0;border-radius: 4px;box-sizing:border-box;font-size:14px;color:#fff;
    span{display: block;margin-top: 10px;font-size:14px;}
  } 
  div.push{height:840px;background:#fff;
    input{width: 550px;border-radius:2px;height:50px;line-height:50px;background:#fcfdfd;border:1px solid #e4e4e4;box-sizing: border-box;text-indent: 1em;}
    span{margin-bottom:10px;font-size:14px;}
    section{width:1200px;margin:0 auto;display:flex;flex-flow:wrap;
      h5{height:1em;margin:80px 0 40px;color:#5a626d;font-size: 30px;text-align:center;width: 100%;flex-shrink: 0;}
      p{color:#5a626d;font-size: 14px;margin-bottom:70px;display: block;width:100%;flex-shrink: 0;text-align:center;}
      label{width:100%;margin-bottom:20px;}
      textarea{width:550px;height:242px;background:#fcfdfd;border:1px solid #e4e4e4;box-sizing: border-box;resize:none;padding:1em;border-radius: 2px;}
      article{background:none;width:50%;}
    }
    .btn{flex-shrink: 0;width: 100%;}
    & /deep/ div{height:auto;width:550px;height:50px;overflow:visible;margin:0;
      li,span{text-transform: initial;}
      
    }
    button{width:460px;height:50px;line-height:50px;color:#fff;font-size: 15px;display: block;margin:30px auto 0;background:#357ce1;border-radius: 2px;}
  }
  #pop{width:530px;background:#fff;position: fixed;top:50%;left:50%;transform:translateX(-50%) translateY(-50%);z-index: 999999;padding-bottom:20px;
    box-shadow: -6.364px 6.364px 36px 0px rgba(31, 30, 77, 0.2);
    p{color:#222c38;font-size:26px;line-height:100%;margin:50px auto 30px;text-align: center;display: block;}
    span{display: block;font-size:18px;width:90%;margin:10px auto 20px;line-height:1.75;}
    button{width:120px;height:35px;border:1px solid #357ce1;color:#357ce1;box-sizing: border-box;font-size: 16px;background:#fff;border-radius:2px;display:block;margin:30px auto;
      &:hover{background:#357ce1;color:#fff;}
    }
  }
}
</style>


