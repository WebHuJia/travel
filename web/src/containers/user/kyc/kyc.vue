<template>
  <div>
    <div id="KYC" v-if="individual">
        <h2>{{$t('kyc.personal')}}</h2>
        <p class="ID-info">{{$t('kyc.platform')}} UID：<span>{{('00000000' + $store.state.users.uid).slice(-8)}}</span></p>
        <label>
            <span>{{$t('kyc.nationality')}}</span>
            <section class='intersmsiso'  @mouseleave="show = false" @click.stop="showfun">
              <span v-html="showcountry"></span>
              <i class="fa fa-caret-down fr" @click.stop="showfun" ></i>
            </section>
            <ul class='intersmsiso' v-if="show" @mouseenter="show = true" @mouseleave="show = false">
                <li @click.stop="intersmsisoselect($event)" v-for="(int, index) in intersmsisoarr" :data-country_name="int.country_name" :data-country_name_en="int.country_name_en" :key="index">{{$store.state.LANG === 'zh-cn'?int.country_name : int.country_name_en}}<span>{{int.country_code}}</span></li>
            </ul>
        </label>
        <div>
            <label>
                <span>{{$t('kyc.lastname')}}</span>
                <input name="first_name" type="text" v-model.trim="first_name">
            </label>
            <label>
                <span>{{$t('kyc.firstname')}}</span>
                <input name="last_name" type="text" v-model.trim="last_name">
            </label>
        </div>
        <label>
            <span>{{$t('kyc.licenseTtype')}}</span>
            <section class='credential_type' @mouseleave="showselect = false" @click.stop="showselectfun">
              <span v-html="credential_type_value"></span>
              <i class="fa fa-caret-down fr" @click.stop="showselectfun" ></i>
            </section>
            <ul class='credential_type' v-if="showselect" @mouseenter="showselect = true" @mouseleave="showselect = false">
                <li @click.stop="credential_type($event)" v-for="(int, index) in credential_lists" :key="index">{{int}}</li>
            </ul>
        </label>
        <label>
            <span>{{$t('kyc.idNumber')}}</span>
            <input name="credential_number" type="text" v-model.trim="credential_number">
        </label>
        <dl>
            <dt>
                <span>{{$t('kyc.uploadPhoto')}}</span>
                <p class="credential-image-tips">{{$t('kyc.txt')}}</p>
            </dt>
            <dd>
                <div><img ref="front" src="/static/staticfile/images/kyc/credential-front.png"  accept="image/*" /></div>
                <button  @click.stop="showupload">{{$t('kyc.front')}}</button>
            </dd>
            <dd>
                <div><img ref="reverse" src="/static/staticfile/images/kyc/credential-back.png"  accept="image/*" /></div>
                <button  @click.stop="showupload">{{$t('kyc.back')}}</button>
            </dd>
            <dd>
                <div><img ref="hand" src="/static/staticfile/images/kyc/credential-id.png"  accept="image/*" /></div>
                <button @click.stop="showupload">{{$t('kyc.holding')}}</button>
            </dd>
        </dl>
        <p style="margin:20px auto 40px;font-size:14px;" v-html="$t('kyc.hint')"></p>
        <a href="javascript:;" @click.stop="btn">{{$t('kyc.submit')}}</a>
        <upload :title="poptitle" :showpop="showpop" @uploadImg="uploadImg" @hidepop="closeupload"></upload>
    </div>
    <div id="wait" v-if="wait" :class="{'loading': loading}">
      <dl v-if="!loading">
        <dt>{{$t('userCenter.kyc')}} <em>{{$t('kyc.leve1')}}</em> <i :class="{'fail':fail, 'wait': process,'succ':success}">{{$t(state)}}</i></dt>
        <dd style="padding-bottom:20px;">
          <p v-if="!success && certified && !fail" class="ps" >{{$t('kyc.leve1ps')}}</p>
          <p v-if="!success && !certified && !fail" class="certified"><u class="under"></u>{{$t('kyc.dtaita13wd')}}</p>
          <p v-if="fail" class="fail"><i class="fa fa-exclamation-circle"></i>{{waitdata.remark || $t('kyc.fail2')}}</p>
          <p v-if="success" class="success"><i class="fa fa-check-circle"></i>{{$t('kyc.completed')}}</p>
          <p v-if="!certified"><span>{{$t('kyc.nationality')}}: </span><strong>{{waitdata.country}}</strong></p>
          <p v-if="!certified"><span>{{$t('kyc.Name')}}: </span><strong>{{waitdata.first_name}} {{waitdata.last_name}}</strong></p>
          <p v-if="!certified"><span>{{$t('kyc.idNumber')}}: </span><strong>{{waitdata.credential_number}}</strong></p>
          <p v-if="fail" class="fail">
            <button  class="btnhover" @click.stop='push'>{{$t('kyc.re')}}</button>
          </p>
          <p v-if="certified" class="fail" style="margin:40px 0 20px;">
            <button  class="btnhover" @click.stop='push'>{{$t('kyc.go')}}</button>
          </p>
        </dd>
        <dt>{{$t('kyc.qualified')}} <em>{{$t('kyc.leve2')}}</em> <i :class="{'investfail':investores.status === 'kyc.fail','investsucc':investores.status === 'kyc.completed','investwait': investores.status === 'kyc.audit'}">{{$t(investores.status)}}</i></dt>
        <dd>
          <p class="ps" v-if="investores.status !== 'kyc.completed' && investores.status !== 'kyc.audit' && investores.status !== 'kyc.fail'">{{$t('kyc.leve2ps')}}</p>
          <p v-if="investores.status == 'kyc.audit'" class="certified"><u class="under"></u>{{$t('kyc.dtaita13wd')}}</p>
          <p v-if="investores.status === 'kyc.fail'" class="certified"><i class="fa fa-exclamation-circle"></i>{{investores.remark}}</p>
          <p v-if="investores.status == 'certified'" class="certified"><u class="editor"></u>{{$t('kyc.fillnot')}}</p>
          <p v-if="investores.status === 'kyc.completed'" class="success"><i class="fa fa-check-circle"></i>{{$t('kyc.completed')}}</p>
          <div v-if="investores || investores.status === 'kyc.completed'" class="investoresstatus">
            <div class="name">
              <p>
                <em>{{$t(investores.investor_type == 'company' ? 'investor.company' : investores.investor_type == 'personal' ? 'investor.personal' : investores.investor_type == 'mechanism' ? 'investor.mechanism' : '' )}}</em>
                <span>{{investores.name}}</span>
              </p>
              <a v-if="investores.status !== 'kyc.completed' && investores.status !== 'kyc.audit'" @click.stop="delonoff = true" href="javascript:;" class="fr" >{{$t('investor.delete')}}</a>
            </div>
          </div>
          <div v-if="investores.status === 'kyc.fail'" class="fail">
            <button @click.stop='investpush'  class="btnhover">{{$t('kyc.re')}}</button>
          </div>
          <div v-if="investores == false" class="fail">
            <button @click.stop='investpush'  class="btnhover">{{$t('kyc.go')}}</button>
          </div>
          <div v-if="investores.status === 'certified'" class="fail">
            <button @click.stop='investpush'  class="btnhover">{{$t('kyc.goauth')}}</button>
          </div>
        </dd>
      </dl>
      <loadingcenter v-else />
    </div>
    <div v-if="delonoff" class='delbox pop' >
      <i @click.stop="delonoff = false" class="fa fa-times" aria-hidden="true"></i>
      <p >{{$t('mentiontoken.dele')}}</p>
      <button @click.stop="del"  class="btnhover">{{$t('mentiontoken.ok')}}</button>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo () {
    return {
    title: this.$t('userCenter.kyc') + this.$t('seo.title'),
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
      country_value: null,
      credential_type_value: null,
      credential_lists: '',
      credentialFront: '',
      credential_back: '',
      credential_id: '',
      showcountry: '',
      intersmsisoarr: [],
      show: false,
      showselect: false,
      first_name: '',
      last_name: '',
      credential_number: '',
      country: 'China - CN',
      uploader: '',
      showpop: false,
      poptitle: '',
      uploadfilelist: false,
      previmg: '',
      uploadimgelm: '',
      us: false,
      id: '',
      individual: false,
      wait: true,
      loading: true,
      fail: false,
      success: false,
      process: false,
      certified: false,
      state: false,
      investoresstate: false,
      waitdata: '',
      investfail: '0',
      notinvest: false,
      delonoff: false,
      networdimgurl: '',
      investores: {
        name: "",
        country: "",
        investor_type: "",
        protocol: '',
        create_time: '',
        process_time: '',
        status: "",
        remark: "",
      }
    }
  },
  created () {
    this.id = this.$route.params.id
    this.kycState()
    this.axios.axiosget({
      url: '/user/original/intersmsiso'
    }).then((ret) => {
      this.intersmsisoarr = ret.data.data
      var pushdata = {
        country_code: "CN",
        country_name: "中国",
        country_name_en: "China"
      }
      if (localStorage.getItem('lang') === 'zh-cn') {
        this.intersmsisoarr.unshift(pushdata)
      }
    }).catch((error) => {
      console.log(error)
    })
    if (localStorage.getItem('lang') === 'zh-cn') {
      this.credential_type_value = '身份证'
      this.credential_lists = ['身份证', '护照']
    } else if (localStorage.getItem('lang') === 'en-us') {
      this.credential_type_value = 'National ID'
      this.credential_lists = ['National ID', 'Passport']
    }
    this.investState()
  },
  methods: {
    credential_type (event) {
      this.credential_type_value = event.currentTarget.innerHTML
      this.showselect = false
    },
    intersmsisoselect (event) {
      this.country = event.currentTarget.dataset.country_name_en + ' - ' + event.currentTarget.children[0].innerHTML
      if (localStorage.getItem('lang') === 'zh-cn') {
        this.showcountry = event.currentTarget.dataset.country_name + '<span>' + event.currentTarget.children[0].innerHTML +'</span>'
      } else if (localStorage.getItem('lang') === 'en-us') {
        this.showcountry = event.currentTarget.dataset.country_name_en + '<span>' + event.currentTarget.children[0].innerHTML +'</span>'
      }
      this.show = false
    },
    showfun () {
      this.show = !this.show
    },
    showselectfun () {
      this.showselect = !this.showselect
    },
    showupload (event) {
      this.showpop = true
      this.poptitle = event.currentTarget.innerHTML
      this.uploadimgelm = event.currentTarget.parentNode.querySelector('img')
    },
    investState () {
      this.axios.axiosget({
        url: '/user/investors/myInvestorsDetails'
      }).then((ret) => {
        this.loading = false
        this.investores = false
        var obj = Object.prototype.toString.call(ret.data.data)
        if (obj == '[object Array]' && ret.data.data.length == 0) {
          return
        }
        if (ret.data.data.status) {
          this.investores = ret.data.data
          switch (this.investores.status) {
            case 'accept-and-success':
            this.investores.status = 'kyc.completed'
            break
            case 'refuse-and-fail':
            this.investores.status = 'kyc.fail'
            break
            case 'waiting-for-process':
            this.investores.status = 'kyc.audit'
            break
          }
          this.investores.remark = ret.data.data.remark
        }
        if (ret.data.data.data && !ret.data.data.status) {
            this.investores = ret.data.data
            this.investores.status = 'certified'
        }
        if (!ret.data.data.data && !ret.data.data.status) {
          this.investores = ret.data.data
          this.investores.status = 'certified'
        }
      }).catch((error) => {
          console.log(error)
        })
    },
    kycState () {
      this.certified = false
      this.process = false
      this.success = false
      this.fail = false
      this.axios.axiosget({
        url: '/user/kyc'
      }).then((ret) => {
        this.id = ret.data.data.id
        this.waitdata = ret.data.data
        if (ret.data.data == '' && (ret.data.msg === '未认证' || ret.data.msg === 'Not certified')) {
          this.certified = true
        }
        if (ret.data.data.status == 'waiting-for-process') {
          this.process = true
          this.state = 'kyc.audit'
        } else if (ret.data.data.status == 'accept-and-success') {
          this.success = true
          this.state = 'kyc.completed'
        } else if (ret.data.data.status == 'refuse-and-fail') {
          this.fail = true
          this.state = 'kyc.fail'
        }
      }).catch((error) => {
          console.log(error)
        })
    },
    btn () {
      var imgbase = {'credential-front':this.$refs.front.src, 'credential-back':this.$refs.reverse.src, 'credential-id':this.$refs.hand.src}
      var type = 'id-card'
      switch (this.credential_type_value) {
        case '身份证': case 'National ID':
          type = 'id-card'
        break
        case '护照': case 'Passport':
          type = 'passport'
        break
        case '驾驶证': case "Driver's license":
          type = 'driving-license'
        break
      }
      var data = {
        id: this.id || '',
        country: this.country,
        first_name: this.first_name,
        last_name: this.last_name,
        credential_type: type,
        credential_number: this.credential_number,
        credential_imgs: imgbase
      }
      this.axios.axiospost({
        url: '/user/kyc/applyPost',
        data: data
      }).then((ret) => {
        if (ret.data.code == 1) {
          this.$message({
            content: ret.data.msg,
            type: 'check'
          })
          this.kycState()
          this.wait = true
          this.individual = false
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    push () {
      this.individual = true
      this.wait = false
    },
    investpush () {

      if (!this.success) {
        this.$message({
          content: '请先完成实名认证（一级认证）',
        })
        return
      }
      this.$router.push({name: 'KycInvestor'})
    },
    uploadImg (d) {
      this.showpop = d.onoff
      this.uploadimgelm.src = d.imgurl
    },
    closeupload (d) {
      this.showpop = d.showpop
    },
    closeHide () {
      this.individual = false
      this.wait = true
      this.us = false
    },
    del () {//删除投资者认证信息
      this.axios.axiospost({
        url: '/user/investors/deleteInvestors'
      }).then((ret) => {
        this.delonoff = false
        this.investState()
        if (ret.data.code == 1) {
          this.$message({
            content: ret.data.msg,
            type: 'check'
          })
        } else {
          this.$message({
            content: ret.data.msg,
          })
        }
      }).catch((error) => {
          console.log(error)
        })
    },
  },
  computed: {
    lang () {
      return this.$store.state.LANG
    }
  },
  watch: {
    lang (n, o) {
      this.axios.axiosget({
        url: '/user/original/intersmsiso'
      }).then((ret) => {
        this.intersmsisoarr = ret.data.data
        var pushdata = {
          country_code: "CN",
          country_name: "中国",
          country_name_en: "China"
        }
        if (n === 'zh-cn') {
          this.intersmsisoarr.unshift(pushdata)
        }
      }).catch((error) => {
          console.log(error)
        })
      if (n === 'zh-cn') {
        this.credential_lists =  ['身份证', '护照', '驾驶证']
        if (n == 'China - CN') {
          this.credential_lists =  ['身份证', '护照']
        }
        this.credential_type_value = '身份证'
      } else if (n === 'en-us') {
        if (n == 'China - CN') {
          this.credential_lists =  ['National ID', 'Passport']
        }
        this.credential_lists = ['National ID', 'Passport',"Driver's license"]
        this.credential_type_value = 'National ID'
      }
    },
    intersmsisoarr (n, o) {
      if (localStorage.getItem('lang') === 'zh-cn') {
        this.showcountry = this.intersmsisoarr[0].country_name + '<span>'+this.intersmsisoarr[0].country_code+'</span>'
        this.country = this.intersmsisoarr[0].country_name_en + ' - ' + this.intersmsisoarr[0].country_code
        this.credential_lists = ['身份证', '护照']
        this.credential_type_value = '身份证'
      } else if (localStorage.getItem('lang') === 'en-us') {
        this.showcountry = this.intersmsisoarr[0].country_name_en + '<span>'+this.intersmsisoarr[0].country_code+'</span>'
        this.credential_lists = ['National ID', 'Passport',"Driver's license"]
        this.country = this.intersmsisoarr[0].country_name_en + ' - ' + this.intersmsisoarr[0].country_code
        this.credential_type_value = 'National ID'
      }
    },
    intersmsiso (n, o) {
      this.$emit('intercode', {showcountry: this.showcountry})
    },
    country (n, o) {
      if (localStorage.getItem('lang') === 'zh-cn') {
        this.credential_lists =  ['身份证', '护照', '驾驶证']
        if (n == 'China - CN') {
          this.credential_lists =  ['身份证', '护照']
        }
      } else if (localStorage.getItem('lang') === 'en-us') {
        this.credential_lists = ['National ID', 'Passport',"Driver's license"]
        if (n == 'China - CN') {
          this.credential_lists =  ['National ID', 'Passport']
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
#KYC{background:#fff;border-radius: 5px;padding: 20px;
  h2{    text-align: left;font-size: 18px;margin: 0 0 30px 0;padding: 0;font-weight: normal;}
  .ID-info{    margin: 0 0 30px;text-align: center;font-size: 16px;font-weight: bold;}
  label{display: block;width:100%;margin-bottom:20px;font-size: 14px;color: #979797;position:relative;
      span{margin-bottom:10px;display: block;}
      & /deep/ #select{width:100%;text-align: left;
          span{text-align: left;text-indent: 1em;text-transform: none;}
      }
      & /deep/ ul{
          li{text-transform: none;}
      }
      section{width:100%;height:50px;line-height:50px;border:1px solid #ddd;border-radius: 2px;box-sizing:border-box;text-indent: 1em;display: flex;align-items: center;justify-content:space-between;color:#222c38;font-size:14px;
        i{margin-right: 10px;}
        & /deep/ span{margin:0 1em 0 0;}
      }
  }
  div{display: flex;
      label{margin-right:20px;
          &:last-child{margin:0;}
      }
      input:last-child{}
  }
  dl{display: flex;flex-wrap:wrap;
      dt{width:100%;flex-shrink:0;margin-bottom:20px;
          span{margin-bottom:20px;display: block;}
          p{font-size: 14px;color: #d9534f;line-height: 1.3;font-weight: bold;}
      }
      dd{width:33.33333333333%;text-align:center;position: relative;
          div{width:270px;height:186px;margin:0 auto;
            img{display: block;height:100%;margin: 0 auto;object-fit:scale-down;width:100%;}

          }
          input{position: absolute;left:0;top:0;;width:100%;height: 100%;opacity: 0;z-index: 123;cursor: pointer;;}
      }
  }
  input{border:1px solid #ddd;font-family: 'Open Sans',Microsoft YaHei,sans-serif;font-size: 14px;width: 100%;line-height: 1;height: 40px;line-height:40px;text-indent:1em;border-radius: 2px;}
  select{border: 0;font-family: 'Open Sans',Microsoft YaHei,sans-serif;font-size: 14px;width: 100%;height: 40px;padding: 5px;}
  button{color:#fff;background:#5bc0de;display: block;height:40px;border-radius: 2px;padding:0 10px;margin:20px auto;}
  a{width: 140px;height:40px;color:#fff;display: block;margin:20px auto 40px;background:#20b555;text-align: center;line-height: 40px;border-radius: 2px;}
  ul.credential_type,ul.intersmsiso{z-index: 123;text-align: center;border-width: 1px;border-color: rgb(215, 215, 215);border-style: solid;background-color: rgb(252, 253, 253);box-shadow: 0px 8px 16px 0px rgba(31, 30, 77, 0.09);box-sizing: border-box;
      position:absolute;top:75px;left:0;background:#fff;color:#caccd1;font-size: 18px;
      width:100%;height:400px;overflow: auto;border:1px solid #ddd;
      &::-webkit-scrollbar{width: 9px;}
      &::-webkit-scrollbar-thumb{background-color: rgb(223, 225, 233);border-radius: 9px;width:9px;}
      li{font-size:14px;line-height:1.5;width:100%;background:#fff;border-bottom:1px solid #ddd;height:50px;line-height:49px;box-sizing:border-box;margin-bottom:0;padding:0 22px;display:flex;justify-content:space-between;cursor: pointer;
          &:hover{background:#f4f5f6;color:#5a626d;}
          span{line-height:49px;}
      }
  }
  ul.credential_type{height:auto;}
}
#us{background:#fff;border-radius: 5px;padding: 20px;
  h5{color:#a5aab0;font-size: 14px;height:60px;line-height:50px;}
  dl{border-bottom:1px solid #f2f3f8;padding-bottom:10px;
      dt{color:#222c38;font-size:16px;margin-bottom:20px;}
      dd{color:#a5aab0;font-size:14px;margin-bottom:10px;display:flex;align-items:center;
          span{width:10px;height:10px;display: block;position:relative;margin-right:20px;
              input{width:10px;height:10px;position:absolute;top:0;left:0;opacity: 0;z-index: 123;
                  &:checked + i{
                      border-color:#357ce1;
                      &:after{background:#357ce1;display: block;}
                  };}
              i{display: block;position: absolute;top:0;left:0;border:1px solid #b7babf;width:10px;height:10px;border-radius:50%;
                  &:after{content: '';width:6px;height:6px;position:absolute;top:0;right:0;bottom:0;left:0;margin:auto;display: none;border-radius: 50%;}
              }
          }
      }
  }
  div{margin-top:20px;border-bottom:1px solid #f2f3f8;
      p{color:#222c38;font-size:16px;margin-bottom:10px;}
      label{color:#5a626d;font-size:14px;display: block;margin-bottom:10px;}
      input{width:550px;height:50px;text-indent: 1em;border-radius: 2px;line-height:50px;border:1px solid #d7d7d7;margin-bottom:20px;}
      span{color:#a5aab0;font-size:14px;display: block;margin-bottom:20px;}
      button{width: 209px;height:50px;line-height:50px;text-align: center;border:1px solid #d7d7d7;border-radius: 2px;color:#a5aab0;font-size:18px;background:transparent;margin-bottom:30px;
          &.continue{background:#357ce1;color:#fff;margin-right:30px;}
          &.ignore{background:#a5aab0;color:#fff;}
      }
      &.btn{border:none;margin-top:20px;}
  }
}
#wait{min-height:500px;position:relative;
  &.loading{background:#fff;height:500px;}
  dl{margin-bottom:40px;
    p{display: flex;margin-bottom:18px;
      &.success,&.certified{margin:20px 0 40px;color:#222c38;align-items: center;}
      &.fail{margin:40px 0 40px;}
      i.fa-check-circle{color:#3ed786;margin-right:14px;}
      i.fa-exclamation-circle{color:#ff424f;margin-right:14px;}
      strong{color:#222c38;font-weight: normal;}
    }
    .under{background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAUCAMAAABcfiZ7AAAAZlBMVEUAAAAbivq84Pu84Pu84Pt0uvsqk/pYq/q84PtCn/pisPq84Pu84Pu84Pu84Pu84Pu84Pu84Pu84Pu84Pu84Pv///+y2vyj0/xxt/wxlvvk8f6Mxv3U6f6Bv/wnkfqazvs8nPpjsPpD8ZQYAAAAFHRSTlMA+utJEPPv65Lp6cq/tqiDbFgtHKtFLY0AAACcSURBVBjTbZBZDsMgDERZspBmT2wDIVvvf8mKQqGq+v7mSQZ7WGAZYFhYopg78HRz4aMce8j0o2TwSzS6fJT6y1BjjTO2oY+h6kDPUVE0tcGAqaPhm48b4caD0RZx33frEK1Ohs7ToTd5irQf5P9fFvl3wy8AwVTesOLnBYqtIl1BN7/FypiEzNPJdx8iGSFjYyoKVeQWpxbaKeQXvY4Vyz3T65oAAAAASUVORK5CYII=) no-repeat 50% 0;width:20px;height:20px;display: block;margin-right:10px;}
    .editor{background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEU1fOE1fOE1fOE1fOE1fOE1fOHB1/f9/v/N3/jy9/240vWUufBVkebo8PyGse15qOtJieTX5fljmujQW8W5AAAABXRSTlMBktcrvNQjJ1UAAABsSURBVBjTZY9ZDoAgDEQptQuC6/0Pq5MSNOF9NF2mWwJMWSQTpw5JhyJeZLD86m5HaFjAqbs5HA5B26zsLcbk197FbGsCcnrNUc2uUwIkrNR1LEKLahV1d0ULhq4aQEax9oPjsAFNp8/PTe8/hhsEn/V0z1gAAAAASUVORK5CYII=) no-repeat 50% 0;width:16px;height:16px;display: block;margin-right:14px;}
    dt{color:#222c38;font-size:16px;line-height:60px;margin-bottom:20px;height:60px;display:flex;margin-bottom:1px;color:#222c38;padding: 0 30px;background:#fff;align-items:center;
      i{display: inline-block;padding:0 10px;height:21px;border-radius: 2px;position:relative;color:#ffffff;text-align:center;line-height:20px;margin-left:10px;font-size:14px;
        &:after{width:0;height:0;border-width:4px 4px 4px 0;border-style:solid;margin:0 auto;position:absolute;top:7px;left:-4px;content: '';}
        &.investfail:after,&.fail:after{border-color:transparent #ff5e5e transparent transparent;}
        &.investfail,&.fail{background:#ff5e5e;}
        &.investsucc:after,&.succ:after{border-color:transparent #357ce1 transparent transparent;}
        &.investsucc,&.succ{background:#357ce1;}
        &.investwait,&.wait{background:#ffb362;}
        &.investwait:after,&.wait:after{border-color:transparent #ffb362 transparent transparent;}
      }
      em{line-height:60px;color:#a5aab0;}
    }
    .investoresstatus{
      .name{margin:10px 0 50px;display:flex;justify-content: space-between;
        p{flex-grow: 2;}
        em{color:#a5aab0;font-size:14px;margin-right:40px;}
        span{color:#222c38;}
        a{font-size:14px;}
      }
    }
    dd{font-size: 14px;color:#a5aab0;margin-bottom:16px;line-height:100%;padding: 0 30px 40px;background:#fff;overflow:hidden;
    p.ps{margin:20px 0 40px;}
    span{color:#a5aab0;font-size:14px;width:90px;display: inline-block;vertical-align: top;}
    &.fail{color:#a5aab0;
        i{margin-right:10px;}
    }
    }
  }
  .fail{
      button{width:209px;height:50px;line-height:50px;color:#fff;font-size:18px;background:#357ce1;border-radius: 2px;}
  }
}
.delbox{width:466px;height:160px;text-align:center;padding:50px;background-color: rgb(255, 255, 255);box-shadow: -6.364px 6.364px 36px 0px rgba(31, 30, 77, 0.2);
  p{margin:30px 0 50px;}
  i.fa.fa-times{font-weight: 200;font-size: 20px;position: absolute;top:24px;right:24px;cursor: pointer;color:#bbbcbc;}
  button{width:460px;height:50px;line-height:50px;text-align: center;color:#fff;font-size:18px;background:#357ce1;border-radius: 2px;}
}
</style>
