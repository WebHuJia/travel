<template>
  <div :class="{'loading': loading}">
    <div v-if="!loading" id="investment" :class="{'flexflowcolumn': !lists, 'flex': !lists, 'flexCenter': !lists}">
      <ul v-if="lists">
        <li v-for="(l, index) in lists" :key="index">
          <router-link :to="{name: 'Project', query: {id: l.id}}">
            <img :src="l.thumbnail" :alt="l.post_title">
            <span>
              <strong>
                <b>{{l.post_title}}</b>
                <i>{{l.post_subtitle}}</i>
              </strong>
              <em v-html="$t('investment.'+l.financing_stage)"></em>
            </span>
          </router-link>
        </li>
      </ul>
      <p class='notinvestment' v-if="notlosts">
        <span v-html="$t('investment.notinvestment')"></span>
        <router-link class="btnhover" :to="{name: 'Sto'}" v-html="$t('investment.goinvestment')"></router-link>
      </p>
    </div>
    <loadingcenter v-else />
  </div>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('menu.investment.title') + this.$t('seo.title'),
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
      loading: true
    }
  },
  created () {
    this.axios.axiosget({
      url: '/user/MyInvestment'
    }).then((ret) => {
      this.lists = ret.data.data
      if (ret.data.data.length <= 0) {
        this.lists = false
        this.notlosts = true
      }
      this.loading = false
    }).catch((error) => {
        console.log(error)
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
        url: '/user/MyInvestment'
      }).then((ret) => {
        this.lists = ret.data.data
        if (ret.data.data.length <= 0) {
          this.lists = false
          this.notlosts = true
        }
      }).catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="less" scoped>
  .loading{background:#fff;height:400px;position:relative;}
  #investment{background:#fff;min-height:400px;
    .notinvestment{width:100%;text-align:center;height:100%;display:flex;flex-flow:column;color:#969fa9;margin-top:20%;transform: translateY(-100%);
      span{display: block;font-size:14px;}
      a{border-radius: 2px;background-color: rgb(53, 124, 225);width: 210px;height: 50px;display: block;margin:48px auto 0;color:#fff;font-size:18px;line-height:50px;}
    }
    ul{padding:2px 26px;
      li{height:90px;
        a{display: flex;height:90px;align-items:center;
          img{flex-shrink: 0;width:55px;height:55px;}
          span{display: flex;flex-grow: 2;border-bottom:1px solid #f2f3f8;box-sizing:border-box;height:100%;align-items:center;margin-left:14px;
            strong{display: flex;flex-flow: column;flex-grow: 2;
              b{color:#5a626d;font-size:16px;line-height: 100%;font-weight: normal;}
              i{color:#969fa9;font-size:12px;line-height: 100%;margin-top:10px;}
            }
            em{color:#969fa9;font-size:14px;}
          }
        }
      }
    }
  }
</style>
