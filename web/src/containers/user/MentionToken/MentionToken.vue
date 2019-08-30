<template>
  <div id="mentionToken">
    <div class='add'>
      <div>
        <label class='type'>
          <span>{{$t('mentiontoken.tokenName')}}</span>
          <div class="select">
            <span @click="showtypeonoff = !showtypeonoff">{{$store.state.LANG == 'zh-cn' ? type.zh : type.en}}<i class="fa fa-caret-down fr" @click.stop="showtypeonoff = !showtypeonoff" ></i></span>
            <ul @mouseleave="showtypeonoff = false" v-if="showtypeonoff">
              <li v-for="(s, i) in selectLists" @click="showtypeonoff = false,type = s">{{$store.state.LANG == 'zh-cn' ? s.zh : s.en}}</li>
            </ul>
          </div>
        </label>
         <label>
          <span>{{$t('mentiontoken.name')}}</span>
          <input type="text" v-model.trim="title">
        </label>
        <label class='address'>
          <span>{{$t('mentiontoken.site')}}</span>
          <input type="text" v-model.trim="address">
        </label>
      </div>
      <button class="btnhover" @click.stop="verify ({type: 'add'})">{{$t('mentiontoken.add')}}</button>
    </div>
    <div class='lists' :class="{'loading':loading}">
      <h4>{{$t('mentiontoken.sitelist')}}</h4>
      <dl v-if="!loading">
        <dt>
          <span class='type'>
            <div class="select" @mouseleave="showtype2onoff = false">
              <span @click="showtype2onoff = !showtype2onoff">{{$store.state.LANG == 'zh-cn' ? type2.zh : type2.en}}<i class="fa fa-caret-down fr" @click.stop="showtype2onoff = !showtype2onoff" ></i></span>
              <ul @mouseleave="showtype2onoff = false" v-if="showtype2onoff">
                <li v-for="(s, i) in queryselectlists" @click="showtype2onoff = false,type2 = s">{{$store.state.LANG == 'zh-cn' ? s.zh : s.en}}</li>
              </ul>
            </div>
          </span>
          <span v-for="(s, i) in tablelists.title" :key="i">{{$t(s)}}</span>
        </dt>
        <dd v-for="(s, i) in tablelists.value" :key="i">
          <span>{{s.address_type}}</span>
          <span>{{s.address_title}}</span>
          <span>{{s.withdraw_address}}</span>
          <span><a href="javascript:;" @click.stop="editoronoff($event)" :data-id="s.id" :data-address="s.withdraw_address" :data-title="s.address_title" :data-type="s.address_type">{{$t('mentiontoken.editor')}}</a> <a href="javascript:;" @click.stop="delpopshwo (s.id)">{{$t('mentiontoken.delete')}}</a></span>
        </dd>
      </dl>
      <loadingcenter v-else />
      <pager v-if="pagelist" :pageSize="pagelist.last_page" v-model.trim="pageNo" @on-jump="jump"></pager>
    </div>
    <popcode class="pop" v-if="popshow" @popshowonoff = 'popshowonoff' @success='success'
    ></popcode>
    <div v-if="editonoff" class='editorbox pop' >
      <p>{{$t('mentiontoken.editor')}}</p>
      <i @click.stop="close('editonoff')" class="fa fa-times" aria-hidden="true"></i>
       <label>
        <span>{{$t('mentiontoken.name')}}</span>
        <input type="text" v-model.trim="editor_title">
      </label>
       <label>
        <span>{{$t('mentiontoken.site')}}</span>
        <input type="text" disabled :value="operation_address">
      </label>
      <button @click.stop='editor' class="btnhover">{{$t('mentiontoken.save')}}</button>
    </div>
    <div v-if="delonoff" class='delbox pop' >
      <p>{{$t('common.notification')}}</p>
      <i @click.stop="close('delonoff')" class="fa fa-times" aria-hidden="true"></i>
      <span>{{$t('mentiontoken.dele')}}</span>
      <button @click.stop="del"  class="btnhover">{{$t('mentiontoken.ok')}}</button>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: this.$t('userCenter.withdrawAddress') + this.$t('seo.title'),
      meta: [{
        name: 'keywords',
        content: this.$t('seo.keywords'),
      }, {
        name: 'description',
        content: this.$t('seo.description'),
      }],
    }
  },
  data () {
    return {
      loading: true,
      selectLists: [{zh: 'Ethereum/ETH', en: 'Ethereum/ETH', type: 'ETH'}, {zh: '其他', en: 'Other', type: 'other'}],
      queryselectlists: [{zh: '全部', en: 'All', type: ''}, {zh: 'Ethereum/ETH', en: 'Ethereum/ETH', type: 'ETH'}, {zh: '其他', en: 'Other', type: 'other'}],
      lists: '',
      tablelists: {
        title: ['common.title', 'mentiontoken.mention', 'mentiontoken.operation'],
        value: null
      },
      address: '',
      showtypeonoff: false,
      showtype2onoff: false,
      type: {zh: 'Ethereum/ETH', en: 'Ethereum/ETH', type: 'ETH'},
      type2: {zh: '全部', en: 'All', type: ''},
      title: '',
      popshow: false,
      editonoff: false,
      delonoff: false,
      verification_code: '',
      ga: '',
      mobile: '',
      operation_type: '',
      operation_address: '',
      operation_id: '',
      editor_title: '',
      pageNo: 1,
      pagelist: ''
    }
  },
  created () {
    this.listsget()
    // this.axios.accountInfo()
    this.ga = this.$store.state.users.ga
    this.mobile = this.$store.state.users.mobile
  },
  methods: {
    verify (t) {
      this.operation_type = t.type
      this.operation_id = t.id
      if (!this.title || !this.address) {
        this.$message({
          content: this.$t('common.fullmessage')
        })
        return
      }
      this.popshow = true
    },
    delpopshwo (d) {
      this.delonoff = true
      this.editonoff = false
      this.operation_id = d
    },
    del() {
      this.delonoff = false
      this.axios.axiospost({
        url: '/user/withdrawAddressDelete',
        data: {
          id: this.operation_id
        }
      }).then((ret) => {
        this.$message({
          content: ret.data.msg,
          type: 'check'
        })
          this.listsget()
      }).catch((error) => {
          console.log(error)
        })
    },
    editor () {
      this.axios.axiospost({
        url: '/user/withdrawAddressEdit',
        data: {
          address_title: this.editor_title,
          id: this.operation_id
        }
      }).then((ret) => {
        this.$message({
          content: ret.data.msg,
          type: 'check'
        })
        this.listsget()
        this.editonoff = false
        this.editor_title = ''
        this.operation_id = ''
        this.operation_type = ''
        this.operation_address = ''
      }).catch((error) => {
          console.log(error)
        })
    },
    editoronoff (event) {
      this.editonoff=true
      this.delonoff = false
      var data = event.currentTarget
      this.operation_type = data.dataset.type
      this.operation_id = data.dataset.id
      this.editor_title = data.dataset.title
      this.operation_address = data.dataset.address
    },
    close (d) {
      this[d] = !this[d]
    },
    popshowonoff (d) {
      this.popshow = d.popshow
    },
    verificationCode (d) {
      this.verification_code = d.code
    },
    success (d) {

      // if (this.verification_code || )
      if (d.success) {
        this.popshow = false
        var url = null
        var data = null
        var type = this.type.type
        this.axios.axiospost({
          url: '/user/withdrawAddressCreate',
          data: {
            address_type: type,
            address_title: this.title,
            withdraw_address: this.address
          }
        }).then((ret) => {
          this.$message({
            content: ret.data.msg,
            type: 'check',
          })
          this.address = ''
          this.title = ''
          this.listsget()  
        }).catch((error) => {
          console.log(error)
        })
      } else {
        this.$message({
          content: this.$t('common.notver')
        })
      }
    },
    listsget () {
      this.axios.axiosget({
        url: '/user/withdrawAddressList',
        params: {
          page: this.pageNo,
          address_type: this.type2.type,
          limit: 10
        }
      }).then((ret) => {
        ret.data.data.forEach((obj, index) => {
          if(obj.address_type == 'other') {
            if (this.$store.state.LANG == 'zh-cn') {
              obj.address_type = '其他'
            } else {
              obj.address_type = 'Other'
            }
          }
          if (obj.address_type == 'ETH') {
            obj.address_type = 'Ethereum/ETH'
          }
        })
        this.tablelists.value = ret.data.data
        this.lists = ret.data.data
        this.pagelist = ret.data.page
        this.loading = false
      }).catch((error) => {
          console.log(error)
        })
    },
    jump (d) {
      this.pageMp = d
      this.listsget()
    },
  },
  computed: {
    lang () {
      return this.$store.state.LANG
    }
  },
  watch: {
    type2 () {
      this.listsget ()
    },
    lang () {
      this.listsget ()
    }
  }
}
</script>
<style lang="less" scoped>
  #mentionToken{
    & /deep/ .select{font-size:14px;
      span{font-size:14px;}
      ul{
        li{font-size:14px;}
      }
    }
    i.fa.fa-times{font-weight: 200;font-size: 20px;position: absolute;top:24px;right:24px;cursor: pointer;color:#bbbcbc;}
    input{text-indent: 1em;font-size:14px;}
    .editorbox{width:566px;height:430px;text-align:center;background-color: rgb(255, 255, 255);box-shadow: -6.364px 6.364px 36px 0px rgba(31, 30, 77, 0.2);
      p{width:100%;flex-shrink: 0;height:76px;line-height:76px;color:#5c6383;font-size:20px;border-bottom:1px solid #edeef0;}
      label{display: block;margin:20px 0 40px;padding:0 50px;
        span{display: block;text-align: left;font-size:16px;color:#caccd1;margin-bottom: 10px;font-size:14px;}
        input{border-width: 1px;border-color: rgb(215, 215, 215);border-style: solid;border-radius: 2px;background-color: rgb(252, 253, 253);width: 459px;height: 48px;color:#222c38;font-size:14px;text-align: 1em;}
      }
      button{border-radius: 2px;background-color: rgb(53, 124, 225);width: 460px;height: 50px;color:#fff;font-size:18px;}
    }
    .delbox{width:566px;height:260px;text-align:center;background-color: rgb(255, 255, 255);box-shadow: -6.364px 6.364px 36px 0px rgba(31, 30, 77, 0.2);
      p{width:100%;flex-shrink: 0;height:76px;line-height:76px;color:#5c6383;font-size:20px;border-bottom:1px solid #edeef0;}
      span{margin:30px 0 50px;display:block;color:#5c6383;font-size:16px;}
      button{width:460px;height:50px;line-height:50px;text-align: center;color:#fff;font-size:18px;background:#357ce1;border-radius: 2px;}
    }
    div.lists{background:#fff;padding:0 30px 50px;
      .select {position:relative;width:100%;
        span{display: block;height:50px;line-height: 50px;width:100%;text-align: left!important;border:1px solid #ddd;box-sizing: border-box;border-radius: 2px;position:relative;font-size:14px;text-indent:1em;
          i{position: absolute;top:0;right:10px;bottom:0;line-height:50px;}
        }
        ul{z-index: 123;text-align: center;border-width: 1px;border-color: rgb(215, 215, 215);border-style: solid;background-color: rgb(252, 253, 253);box-shadow: 0px 8px 16px 0px rgba(31, 30, 77, 0.09);box-sizing: border-box;
          position:absolute;top:49px;left:0;background:#fff;color:#caccd1;font-size: 18px;
          width:100%;height:auto;overflow: auto;border:1px solid #ddd;
          &::-webkit-scrollbar{width: 9px;}
          &::-webkit-scrollbar-thumb{background-color: rgb(223, 225, 233);border-radius: 9px;width:9px;}
          li{font-size:18px;line-height:1.5;width:100%;background:#fff;border-bottom:1px solid #ddd;height:50px;line-height:49px;box-sizing:border-box;margin-bottom:0;padding:0 22px;display:flex;justify-content:space-between;cursor: pointer;font-size:14px;
            &:hover{background:#f4f5f6;color:#5a626d;}
          }
        }
      }
      &.loading{height:300px;position:relative;}
      h4{color:#a5aab0;font-size:14px;height:70px;line-height:70px;}
      dl{padding-bottom:30px;
        dt{display: flex;border-bottom:1px solid #f2f3f8;padding-bottom:20px;
          & /deep/ #select{width:116px;font-size:14px;
            span{font-size:14px;}
            ul{
              li{font-size:14px;}
            }
          }
          span{margin-right:70px;width:140px;height:42px;line-height:42px;position:relative;font-size:14px;
            &:nth-child(1) {width:140px;}
            &:nth-child(3) {flex-shrink: 0;flex-grow:2;width:auto;margin-right:20px;}
            &:last-child{text-align: right;margin:0;}
          }
        }
        dd{display: flex;border-bottom:1px solid #f2f3f8;padding-left:12px;
          span{margin-right:70px;width:140px;height:60px;line-height:60px;position:relative;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;flex-shrink:0;font-size:14px;
            &:nth-child(1) {width:130px;}
            &:nth-child(3) {flex-shrink: 0;flex-grow:2;width:300px;margin-right:20px;}
            &:last-child{text-align: right;margin:0;}
          }
          a{color:#222c38;font-size:14px;margin-right: 20px;
            &:hover{
              color:#357ce1;
            }
            &:last-child{margin:0;}
          }
        }
      }
    }
    div.add{height:150px;background:#fff;border-bottom:1px solid #f2f3f8;padding:30px;
      .select {position:relative;width:200px;
        span{display: block;height:50px;line-height: 50px;width:100%;text-align: center;border:1px solid #ddd;box-sizing: border-box;border-radius: 2px;text-align: left;text-indent:1em;position:relative;font-size:14px;
          i{position: absolute;top:0;right:10px;bottom:0;line-height:50px;}
        }
        ul{z-index: 123;text-align: center;border-width: 1px;border-color: rgb(215, 215, 215);border-style: solid;background-color: rgb(252, 253, 253);box-shadow: 0px 8px 16px 0px rgba(31, 30, 77, 0.09);box-sizing: border-box;
          position:absolute;top:49px;left:0;background:#fff;color:#caccd1;font-size: 18px;
          width:100%;height:auto;overflow: auto;border:1px solid #ddd;
          &::-webkit-scrollbar{width: 9px;}
          &::-webkit-scrollbar-thumb{background-color: rgb(223, 225, 233);border-radius: 9px;width:9px;}
          li{font-size:18px;line-height:1.5;width:100%;background:#fff;border-bottom:1px solid #ddd;height:50px;line-height:49px;box-sizing:border-box;margin-bottom:0;padding:0 22px;display:flex;justify-content:space-between;cursor: pointer;font-size:14px;
            &:hover{background:#f4f5f6;color:#5a626d;}
          }
        }
      }
      div{display: flex;
        select{border-width: 1px;border-color: rgb(215, 215, 215);border-style: solid;border-radius: 2px;background-color: rgb(255, 255, 255);width: 207px;height: 48px;}
        label{margin-right:30px;
          span{display: block;color:#a5aab0;font-size:14px;margin-bottom:10px;}
          input{border-width: 1px;border-color: rgb(215, 215, 215);border-style: solid;border-radius: 2px;background-color: rgb(255, 255, 255);width: 207px;height: 48px;text-indent:1em;}
          &.address{
            input{border-width: 1px;border-color: rgb(215, 215, 215);border-style: solid;border-radius: 2px;background-color: rgb(255, 255, 255);width: 421px;height: 48px;}
          }
          &.type{position: relative;
          }
        }
      }
      button{border-radius: 2px;background-color: rgb(53, 124, 225);width: 209px;height: 50px;color:#fff;font-size:18px;margin-top:24px;
      }
    }
    div{
      button{
        &.selectbtn{border-width: 1px;border-color: #d7d7d7;border-style: solid;border-radius: 2px;background-color: #ffffff;margin:0;color:#222c38;font-size:14px;text-align: left;text-indent: 1em;}
      }
    }
  }
</style>
