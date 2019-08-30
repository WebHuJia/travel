<template>
  <div :class="{'loading': loading}">
    <div id="collect" v-if="!loading" :class="{'flexflowcolumn': !lists, 'flex': !lists, 'flexCenter': !lists}">
      <ul v-if="lists">
        <li v-for="(l, index) in lists" :key="index">
          <router-link :to="{name: 'Project', query: {id: l.id}}">
            <img :src="l.thumbnail" :alt="l.post_title">
            <span>
              <strong>
                <b>{{l.post_title}}</b>
                <i>{{l.post_subtitle}}</i>
              </strong>
              <!-- <em v-html="$t('investment.'+l.financing_stage)"></em> -->
            </span>
          </router-link>
          <!--<em @click.stop="showDel({id: l.id})" :title="$t('collect.closecollect')"><i class="fa fa-heart"></i></em>-->
          <em @click.stop="showDel({id: l.id})" :title="$t('collect.closecollect')">{{$t('collect.closecollect')}}</em>
        </li>
      </ul>
      <pager :pageSize="pagelist.last_page" v-model.trim="pageNo" @on-jump="jump"></pager>
      <p class='notcollect' v-if="notlosts">
        <span v-html="$t('collect.notcollect')"></span>
        <router-link class="btnhover" :to="{name: 'Candy'}" v-html="$t('collect.gocollect')"></router-link>
      </p>
    </div>
    <loadingcenter v-else />
    <div id="pop" v-if="del.showonoff">
      <p>{{$t('common.notification')}}</p>
      <span>{{$t('collect.cc')}}</span>
        <i class='fa fa-times' @click.stop="del.showonoff = false"></i>
        <button @click.stop="del.showonoff = false" class="hover">{{$t('common.cancel')}}</button>
        <button class="btnhover" @click.stop="Del">{{$t('common.ok')}}</button>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('menu.collect.title') + this.$t('seo.title'),
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
      title: '',
      lists: false,
      notlosts: false,
      pagelist: {},
      pageNo: 1,
      loading: true,
      del: {
        showonoff: false,
        id: ''
      }
    }
  },
  created () {
    this.query()
  },
  methods: {
    jump (d) {
      this.pageNo = d
      this.query()
    },
    query () {
      this.axios.axiosget({
        url: '/portal/optional',
        params:{page: this.pageNo,limit: 10}
      }).then((ret) => {
        this.lists = ret.data.data
        this.pagelist = ret.data.page
        if (ret.data.data.length <= 0) {
          this.lists = false
          this.notlosts = true
        }
        this.loading = false
      }).catch((error) => {
          console.log(error)
        })
    },
    showDel (opt) {
      this.del = {
        showonoff: true,
        id: opt.id
      }
    },
    Del () {
      this.del.showonoff= false
      this.axios.axiospost({
        url: '/portal/articles/cancelFavorite',
        data: {id: this.del.id}
      }).then((ret) => {
        this.$message({
          content: this.$t('collect.closecollectpop'),
          type: 'check'
        })
        this.query()
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
        this.query()
    }
  }
}
</script>
<style lang="less" scoped>
  .loading{background:#fff;height:400px;position:relative;}
  #pop{width:530px;background:#fff;position: fixed;top:50%;left:50%;transform:translateX(-50%) translateY(-50%);z-index: 999999;padding-bottom:20px;box-shadow: -6.364px 6.364px 36px 0px rgba(31, 30, 77, 0.2);flex-flow:wrap;text-align:center;
    p{width:100%;flex-shrink: 0;height:76px;line-height:76px;color:#5c6383;font-size:20px;border-bottom:1px solid #edeef0;}
    span{color:#5c6383;font-size:24px;line-height:100%;margin:40px auto 30px;text-align: center;display: block;}
    button{width:140px;height:40px;border:1px solid #357ce1;color:#fff;box-sizing: border-box;font-size: 16px;background:#357ce1;border-radius:2px;display:inline-block;margin:30px 20px;
      &.hover{background:#dfe0e3;color:#9194a4;border-color:#dfe0e3;
        &:hover{background:#caccd1;color:#9194a4;border-color:#caccd1;}
      }
      /*&:hover{background:#dfe0e3;color:#9194a4;border-color:#dfe0e3;}*/
    }
    i.fa.fa-times{font-weight: 200;font-size: 28px;position: absolute;top:24px;right:24px;cursor: pointer;color:#bbbcbc;}
  }
  #collect{background:#fff;min-height:400px;
    & /deep/ .pageNor-wrapper{padding:30px 0;}
    .notcollect{width:100%;text-align:center;height:100%;display:flex;flex-flow:column;color:#969fa9;margin-top:20%;transform: translateY(-100%);
      span{display: block;font-size:14px;}
      a{border-radius: 2px;background-color: rgb(53, 124, 225);width: 210px;height: 50px;display: block;margin:48px auto 0;color:#fff;font-size:18px;line-height:50px;}
    }
    ul{padding:2px 26px;
      li{height:90px;display: flex;justify-content:space-between;align-items:center;position: relative;
        &:after{display: block;width:200px;height:1px;background:#f2f3f8;position:absolute;bottom:0;right:0;content:'';}
        a{display: flex;height:90px;align-items:center;flex-grow:2;
          img{flex-shrink: 0;width:55px;height:55px;}
          span{display: flex;flex-grow: 2;border-bottom:1px solid #f2f3f8;box-sizing:border-box;height:100%;align-items:center;margin-left:14px;
            em{font-size:14px;}
            strong{display: flex;flex-flow: column;flex-grow: 2;
              b{color:#5a626d;font-size:16px;line-height: 100%;font-weight: normal;}
              i{color:#969fa9;font-size:12px;line-height: 100%;margin-top:10px;font-weight: normal;}
            }
          }
        }
        em{padding:6px 12px;border-bottom:1px solid #f2f3f8;cursor: pointer;box-sizing: border-box;color:#969fa9;border-radius: 2px;
        color: #a5aab0;
        font-size: 14px;
        background: #f3f3f3;
        border-radius: 1px;
        }
      }
    }
  }
</style>
