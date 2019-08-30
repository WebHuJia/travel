<template>
  <div class='h5announcement'>
    <article >
      <!-- <router-link :to="{name: 'Announcement'}" class="back"><i class="fa fa-angle-left" aria-hidden="true"></i>公告</router-link> -->
      <div class="box" v-if="!loadingonoff">
        <h2 id="title">{{title}}</h2>
        <p class='times'>
          <span class="fl">{{$t('projects.source')}} {{source}}</span>
          <time id="times" class="fr">{{time}}</time>
        </p>
        <div class='content' id="contents" v-html="content">

        </div>
      </div>
      <loadingcenter v-else class="box" />
    </article>
  </div>
</template>
<script>
  export default {
    metaInfo () {
      return {
        title: this.title + this.$t('seo.title'),
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
      return{
        title: '',
        content: '',
        time: '',
        source: '',
        loadingonoff: true
      }
    },

    beforeCreate () {
      this.axios.axiosget({
        url:`/news/details/${this.$route.query.id}`,
      }).then((ret) => {
        this.content = ret.data.data.content
        this.title = ret.data.data.title
        this.time = this.DefaultJs.getTime(ret.data.data.create_time).formatting
        this.loadingonoff = false
        this.source = ret.data.data.source
      })
    },
    computed: {
      lang () {
        return this.$store.state.LANG
      }
    },
    watch: {
      lang () {
        this.axios.axiosget({
          url:`/news/details/${this.$route.query.id}`,
        }).then((ret) => {
          this.content = ret.data.data.content
          this.title = ret.data.data.title
          this.time = this.DefaultJs.getTime(ret.data.data.create_time).formatting
          this.loadingonoff = false
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .h5announcement{background: #fff;overflow:hidden;
    min-height: 100%;
    article{width:100%;position:relative;min-height:100%;
      a.back{color:#caccd1;font-size:.24rem;
        i.fa{margin-right:.1rem;margin-bottom:.14rem;}
        &:hover{color:#357ce1;
          i.fa{color:#357ce1;}
        }
      }
    }
    & /deep/ #loading-center-absolute{transform: scale(.5);position: fixed;top:0;left:0;right:0;bottom:0;margin:auto;width:200px;height:200px;}
    div.box{width:100%;margin:0 auto;overflow: hidden;padding:0 .6rem;box-sizing:border-box;background:#fff;;
      h2#title{font-size:.36rem;color:#5a626d;margin:.8rem auto .3rem;text-align: center;line-height:1.5;}
      p.times{margin-bottom:.3rem;display: block;color:#caccd1;font-size:.24rem;overflow: hidden;display: block;;
        span{color:#999999;}
      }
      time#times{color:#999999;font-size:.18rem;}
      & /deep/ img{display: block;max-width: 100%;margin:.1rem auto;}
      & /deep/ #contents{font-size:.28rem;color:#666666;line-height:1.75;padding-top:.5rem;border-top:1px solid #eee;word-break: break-all;padding-bottom:.4rem;
        p,span{color:#666666;line-height:1.75;word-break: break-all;font-size:.28rem;}
        a{line-height:1.75;word-break: break-all;font-size:14px;}
      }
    }
  }
</style>


