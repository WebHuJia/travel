<template>
  <div id="list">
    <article class="content">
      <div v-if="!loadingonoff">
        <h3>{{$t('nav.announcement')}}</h3>
        <ul>
          <li v-for="(s, i) in list" :key="i">
            <router-link :class="s.is_top == 1? 'top' : ''" :to="{name: 'Details', query: {id: s.id}}"><span>{{s.title}}</span><u v-if="s.is_top == 1"></u><i>{{DefaultJs.getTime(s.release_time).formatting}}</i></router-link>
          </li>
        </ul>
        <section>
          <pager style="padding-bottom:30px;" v-if="assetsPage.last_page >= 2" :pageSize="assetsPage.last_page" v-model.trim="pageNo" @on-jump="jump"></pager>
        </section>
      </div>
      <loadingcenter v-else />
    </article>
  </div>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('nav.announcement') + this.$t('seo.title'),
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
      list: [],
      pageNo: 1,
      assetsPage: {},
      loadingonoff: true
    }
  },
  created() {
    this.http()
  },
  methods: {
    http () {
      this.axios.axiosget({
        url: '/portal/announcement/list',
        params: {page: this.pageNo,limit: 10}
      }).then((ret) => {
        this.list = ret.data.data
        this.assetsPage = ret.data.page
        this.loadingonoff = false
      }).catch((err) => {
        console.log(err)
      })
    },
    jump (d) {
      this.pageNo = d
      this.http()
    },
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
  #list{background: #f2f3f8;overflow: hidden;font-size:16px;
    article.content{width:1200px;margin:90px auto;
      div{min-height:610px;width:100%;
        background:#fff;
      }
      & /deep/ div.pageNor-wrapper{min-height:auto;}
    }
    & /deep/ #loading-center-absolute{margin-top:-200px;}
    h3{height:140px;width:100%;text-align: center;color:#5a626d;font-size:32px;background: #fff;line-height: 140px;border-bottom:1px solid #f2f3f8;}
    ul{font-size:16px;
      li{height:60px;line-height:60px;color:#5a626d;font-size:16px;overflow: hidden;background:#fff;padding:0 50px;border-bottom:1px solid #f2f3f8;
        a{color:#5a626d;display: block;vertical-align: top;height:60px;line-height:60px;
          &.top{
            span{
            }
            u{width:8px;height:8px;background: #ff5e5e;border-radius:50%;display: inline-block;margin-left:14px;vertical-align: middle;margin-bottom:2px;}
          }
          span{font-size:16px;}
        }
        &:hover{
          background: #fcfcfc;
          a{
            span{color:#357ce1;}
            i{color:#357ce1;}
          }
        }
        i{float:right;height:60px;line-height:60px;font-size:16px;}
        span{display: inline-block;vertical-align: top;height:60px;line-height: 60px;max-width: 80%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-size:16px;}
      }
    }
    section{
      background: #fff;padding:20px 0;
    }

  }
</style>
