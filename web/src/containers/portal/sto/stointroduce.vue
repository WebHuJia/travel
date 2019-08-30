<template>
  <div id="introduce">
    <banner style="margin-bottom:78px;" type="stoapply-pc" ></banner>
    <article>
      <ul>
        <li v-for="(s, i) in $t('sto.introduce.list')" :key="i">
          <img :src="s.url || ('/static/staticfile/images/sto/stoapply'+ (i+1) +'.png')" alt="">
          <p v-html="$t(s.name)"></p>
        </li>
      </ul>
      <section>
        <h3>{{$t('sto.introduce.title')}}</h3>
        <dl v-for="(s, i) in $t('sto.introduce.info')" :key="i">
          <dt>{{s.title}}</dt>
          <dd v-for="(ss, ii) in s.list" :key="ii"><i class="fa fa-check-circle"></i><span v-html="$t(ss)"></span></dd>
        </dl>
      </section>
    </article>
  </div>  
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('nav.stointroduce') + this.$t('seo.title'),
      meta: [{
        name: 'keywords',
        content: this.$t('seo.keywords'),
      }, {
        name: 'description',
        content: this.$t('seo.description'),
      }]
    }
  },
}
</script>

<style lang="less" scoped>
#introduce{margin:74px 0 0 0;
  & /deep/ #banner{
    p{font-size:26px!important;}
  }
  article{width:1200px;margin: 0 auto 140px;
    ul{display: flex;justify-content: space-around;margin-bottom:100px;align-items:baseline;
      li{display: flex;flex-flow: column;align-items: center;justify-content: center;
        img{flex-shrink: 0;margin-bottom:30px;}
        p{line-height:1.75;text-align:center;}
      }
    }
  }
  p{color:#5a626d;font-size: 14px;}
  section{display:flex;flex-flow:wrap;
    h3{width:100%;flex-shrink: 0;text-align: center;font-size:38px;color:#5a626d;margin-bottom:110px;}
    dl{width:50%;margin-bottom:100px;
      dt{color:#5a626d;font-size:24px;margin-bottom:40px;}
      dd{color:#5a626d;font-size:14px;margin-bottom:28px;display:flex;
        span{line-height:1.75;}
        i{margin:7px 14px 0 0;display: inline-block;color:#357ce1;}
      }
    }
  }
}
</style>


