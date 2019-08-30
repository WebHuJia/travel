<template>
  <div id="apply">
    <article>
      <h4>{{$t('sto.apply.title')}}</h4>
      <dl>
        <dt>BLOCK1</dt>
        <dd>
          <p>{{$t('sto.apply.block1.name')}} <em>*</em></p>
           <label><input type="text" v-model.trim="postData.name" /></label>
        </dd>
        <dd>
          <p>{{$t('sto.apply.block1.email')}} <em>*</em></p>
           <label><input type="text" v-model.trim="postData.email"  /></label>
        </dd>
        <dd>
          <p>{{$t('sto.apply.block1.description')}} <em>*</em></p>
           <label><input type="text" v-model.trim="postData.brief" /></label>
        </dd>
        <dd>
          <p>{{$t('sto.apply.block1.url')}} <em>*</em></p>
           <label><input type="text" v-model.trim="postData.website" /></label>
        </dd>
      </dl>
      <dl>
        <dt>BLOCK2</dt>
        <dd style="position:relative;z-index:1223">
          <p>{{$t('sto.apply.block2.start_time')}}</p>
          <createtime @time="stateTime" :endTime='"2100"' :sort="'desc'">
          </createtime>
        </dd>
        <dd style="position:relative;z-index:1222">
          <p>{{$t('sto.apply.block2.end_time')}}</p>
          <createtime @time="endTime" :endTime='"2100"' :sort="'desc'">
          </createtime>
        </dd>
        <dd>
          <p>{{$t('sto.apply.block2.token_name')}} <em>*</em></p>
           <label><input type="text" name="coin_name" v-model.trim="postData.coin_name" /></label>
        </dd>
        <dd>
          <div>
            <p>{{$t('sto.apply.block2.token_type')}} <em>*</em></p>
            <label v-for="(s, i) in radioList" :key="i"><input type="radio" v-model.trim="postData.coin_type" name="coin_type" :value="s" /><span><i class="fa fa-circle-thin"></i><i class="fa fa-dot-circle-o"></i></span>{{$t(s)}}</label>
          </div>
          <div>
            <p>{{$t('sto.apply.block2.news')}}</p>
            <a href="https://medium.com/@CoindyOfficial/sto-tokenstandards-57071e6726bd" target="_blank">https://medium.com/@CoindyOfficial/sto-tokenstandards-57071e6726bd</a>
          </div>
          <div>
            <p>{{$t('sto.apply.block2.us')}} <em>*</em></p>
            <label v-for="(s, i) in isus.type" :key="i"><input type="radio" :name="isus.name" v-model.trim="postData.is_sell_us" :value="s.type" /><span><i class="fa fa-circle-thin"></i><i class="fa fa-dot-circle-o"></i></span>{{$t(s.name)}}</label>

          </div>
          <div>
            <p>{{$t('sto.apply.block2.notus')}} <em>*</em></p>
            <label v-for="(s, i) in notus.type" :key="i" ><input type="radio" :name="notus.name"  v-model.trim="postData.is_sell_non_us" :value="s.type" /><span><i class="fa fa-circle-thin"></i><i class="fa fa-dot-circle-o"></i></span>{{$t(s.name)}}</label>
          </div>
          <div>
            <p>{{$t('sto.apply.block2.inve')}} <em>*</em></p>
            <label v-for="(s, i) in Investors.type" :key="i"><input type="radio" :name="Investors.name"  v-model.trim="postData.only_accredited_investors" :value="s.type" /><span><i class="fa fa-circle-thin"></i><i class="fa fa-dot-circle-o"></i></span>{{$t(s.name)}}</label>
          </div>
        </dd>
      </dl>
      <dl>
        <dt>BLOCK3</dt>
        <dd>
          <p>{{$t('sto.apply.block3.one')}} <em>*</em></p>
            <label   v-for="(s, i) in declared.type" :key="i" ><input type="radio" :name="declared.name" v-model.trim="postData.is_principal" :value="s.type" /><span><i class="fa fa-circle-thin"></i><i class="fa fa-dot-circle-o"></i></span>{{$t(s.name)}}</label>
        </dd>
        <dd>
          <p>{{$t('sto.apply.block3.two')}} <em>*</em></p>
            <label   v-for="(s, i) in securities.type" :key="i" ><input type="radio" :name="securities.name" v-model.trim="postData.is_trust" :value="s.type" /><span><i class="fa fa-circle-thin"></i><i class="fa fa-dot-circle-o"></i></span>{{$t(s.name)}}</label>
        </dd>
        <dd>
          <p>{{$t('sto.apply.block3.three')}} <em>*</em></p>
            <label   v-for="(s, i) in criminal.type" :key="i"><input type="radio" :name="criminal.name" v-model.trim="postData.is_criminal_object" :value="s.type" /><span><i class="fa fa-circle-thin"></i><i class="fa fa-dot-circle-o"></i></span>{{$t(s.name)}}</label>
        </dd>
      </dl>
      <div>
        <p>
           <label><input type="checkbox" name="agree" class="agree" v-model.trim="postData.permission"  /><span><i class="fa fa-square-o"></i><i class="fa fa-check-square-o"></i></span></label>
          <label style="font-size:14px;">{{$t('sto.apply.block3.rule')}}</label>
        </p>
        <button @click.stop="postHttp" class="btnhover">{{$t('common.submit')}}</button>
      </div>
    </article>
    <div id="pop" v-if="submitOnoff">
        <p>{{$t('common.submitsucc')}}</p>
        <span>{{$t('sto.apply.relation24')}}E-mail: support@coindy.com</span>
        <button @click="submitOnoff = false,$router.push({name: 'StoIntroduce'})">{{$t('common.ok')}}</button>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('nav.publishProject') + this.$t('seo.title'),
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
      itTime: new Date().getFullYear(),
      radioList: ['ERC-20', 'ST-20', 'ERC-1404', 'ERC-1400', 'ERC-1410', 'R-Token', 'Other'],
      isus: {
        name: 'isus',
        type: [{name: 'common.yes', type: 'Yes'}, {name: 'common.no', type: 'No'}, {name: 'common.maybe', type:'Maybe'}]
      },
      Investors: {
        name: 'Investors',
        type: [{name: 'common.yes', type: 'Yes'}, {name: 'common.no', type: 'No'}, {name: 'common.maybe', type:'Maybe'}]
      },
      notus: {
        name: 'notus',
        type: [{name: 'common.yes', type: 'Yes'}, {name: 'common.no', type: 'No'}]
      },
      declared: {
        name: 'declared',
        type: [{name: 'common.yes', type: 'Yes'}, {name: 'common.no', type: 'No'}]
      },
      securities: {
        name: 'securities',
        type: [{name: 'common.yes', type: 'Yes'}, {name: 'common.no', type: 'No'}]
      },
      criminal: {
        name: 'criminal',
        type: [{name: 'common.yes', type: 'Yes'}, {name: 'common.no', type: 'No'}]
      },
      postData: {
        name: '',
        email: '',
        brief: '',
        website: '',
        statr_time: '',
        coin_type: '',
        end_time: '',
        coin_name: '',
        is_sell_us: '',
        is_sell_non_us: '',
        only_accredited_investors: '',
        is_principal: '',
        is_trust: '',
        is_criminal_object: '',
        permission: ''
      },
      submitOnoff: false
    }
  },
  methods: {
    stateTime (d) {
      this.postData.statr_time = d.year + '-' + d.month + '-' + d.day
    },
    endTime (d) {
      this.postData.end_time = d.year + '-' + d.month + '-' + d.day
    },
    postHttp () {
      if (!this.postData.name || !this.postData.email || !this.postData.brief || !this.postData.website || !this.postData.coin_name || !this.postData.is_sell_us || !this.postData.is_sell_non_us || !this.postData.only_accredited_investors || !this.postData.is_principal || !this.postData.is_trust || !this.postData.is_criminal_object) {
        this.$message({
          content: this.$t('sto.apply.all')
        })
        return
      }
      if (!this.postData.permission) {
        this.$message({
          content: this.$t('sto.apply.agree')
        })
        return
      }
      var emailReg = this.DefaultJs.REG.emailreg
      if (!emailReg.test(this.postData.email)) {
        this.$message({
          content:this.$t('find.emailerror')
        })
        return;
      }
      if ((this.postData.website).indexOf('//') == -1) {
        this.postData.website = `http://${this.postData.website}`
      }
      this.axios.axiospost({
        url: '/portal/apply',
        data: this.postData
      }).then((ret) => {
        this.submitOnoff = true
      }).catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="less" scoped>
  #apply{background: #f5f5f5;overflow: hidden;font-size:14px;
    p{
      em{color:red;font-size:14px;margin-left:4px;}
    }
    article{width:1200px;margin:108px auto 100px;}
    h4{height:96px;width:100%;line-height: 96px;color:#222c38;font-size:24px;text-align: center;background:#fff;}
    button{width:210px;height:50px;border-radius:2px;display: block;background:#357ce1;color:#fff;margin-top:70px;font-size:16px;}
    dl{
      dt{height:56px;line-height:56px;width:100%;background:#f5f5f5;padding:0 40px;color:#222c38;font-size:16px;}
      dd{display: flex;flex-flow:wrap;padding:0 40px;background:#fff;position:relative;
        &:last-child{padding-bottom:50px;}
        p{display: block;width:100%;flex-shrink: 0;line-height:1.75;margin:20px 0 10px;color:#5a626d;font-size:14px;}
        div{display: flex;flex-flow:wrap;width:100%;flex-shrink:0;position:relative;padding:0;
        }
        & /deep/ #createTime{margin:0;line-height:50px;position:relative;
          span{line-height:50px;margin:0 10px;
            i{line-height:45px;}
          }
          section {width:208px;height:50px;line-height:50px;
            span{width:208px;height:50px;line-height:50px;margin:0;background:#fcfdfd;border-color:#d7d7d7;}
            ul{top:50px;}
          }
          p{line-height: 50px;}
        }

        label{display: flex;align-items:center;position:relative;color:#5a626d;font-size:14px;margin-right:74px;cursor: pointer;margin-bottom:10px;
          span{margin-right:10px;
            i.fa{display: none;font-size:18px;}
            i.fa-square-o{display: block;}
            i.fa-circle-thin{display: block;}
          }
        }
      }
    }
    div{padding:0 40px 70px;background:#fff;display: flex;flex-flow: wrap;
      p{width:100%;flex-shrink: 0;display: flex;
        label{position:relative;line-height:1.3;color:#5a626d;
          &:first-child{margin-right:10px;width:22px;flex-shrink:0;}
          span{position:absolute;top:0;left:0;
            i.fa{font-size:22px;}
          }
          input{position:absolute;top:0;left:0;z-index: 12345;}
        }
      }
    }
    input{width:730px;border:1px solid #d7d7d7;border-radius: 2px;height:40px;line-height: 40px;text-indent: 1em;display: block;background:#fcfdfd;}
    input[type=radio]{width:100%;height:100%;position:absolute;top:0;left:0;opacity:0;z-index:123;}
    input[type=radio]:checked + span{
      i.fa-circle-thin{display: none;}
      i.fa-dot-circle-o{display: block;color:#357ce1;}
    }
    input[type=checkbox].agree{opacity: 0;width:20px;height:20px;
      & + span{width:20px;height:20px;
        i.fa{display: none;}
        i.fa-square-o{display: block;}
      }
      &:checked + span{
        i.fa-square-o{display: none;}
        i.fa-check-square-o{display: block;color:#357ce1;}
      }
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


