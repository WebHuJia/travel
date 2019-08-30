<template>
  <div class='h5announcement'>
    <article>
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
      source: '',
      time: '',
      loadingonoff: true
    }
  },

  beforeCreate () {
    this.axios.axiosget({
      url:`/news/details/${this.$route.query.id}`,
    }).then((ret) => {
      if (ret.data.code == 0) {
        this.$router.push({name: 'Sto'})
        return
      }
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
        if (ret.data.code == 0) {
          this.$router.push({name: 'Sto'})
          return
        }
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
.h5announcement{background: #f2f3f8;overflow:hidden;
  article{width:1200px;margin:130px auto;position:relative;
    a.back{color:#caccd1;font-size:18px;
      i.fa{margin-right:10px;margin-bottom:14px;}
      &:hover{color:#357ce1;
        i.fa{color:#357ce1;}
      }
    }
  }
  div.box{width:1200px;margin:0 auto;overflow: hidden;padding:0 100px;box-sizing:border-box;background:#fff;min-height:400px;
    h2#title{font-size:32px;color:#5a626d;margin:80px auto 30px;text-align: center;line-height:1.5;}
    p.times{margin-bottom:30px;display: block;color:#caccd1;font-size:16px;display: block;overflow:hidden;
      span{color:#999999;}
    }
    time#times{color:#999999;font-size:16px;}
    & /deep/ img{display: block;max-width: 100%;margin:10px auto;}
    & /deep/ #contents{font-size:18px;color:#666666;line-height:1.75;padding-top:50px;border-top:1px solid #eee;word-break: break-all;min-height:400px;padding-bottom:40px;
      p,span{color:#666666;line-height:1.75;word-break: break-all;font-size:14px;}
      a{line-height:1.75;word-break: break-all;font-size:14px;}
    }
  }
}
</style>


