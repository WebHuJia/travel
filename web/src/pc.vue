<template>
  <div id="appPc">
    <mynav class='pobz' ref="navs"></mynav>
    <loadingview></loadingview>
    <router-view/>
    <myfooter></myfooter>
  </div>
</template>

<script>
import mynav from './component/nav'
import myfooter from './component/footer'
import loadingview from './component/loading'
export default {
  metaInfo () {
    return {
      title: this.$t('seo.hometitle'),
      meta: [{
        name: 'keywords',
        content: this.$t('seo.keywords'),
      }, {
        name: 'description',
        content: this.$t('seo.description'),
      }]
    }
  },
  name: 'appPc',
  components: {
    mynav,myfooter,loadingview
  }
}
</script>
<style lang='less'>
*{margin:0;padding:0;-webkit-tap-highlight-color: transparent; -webkit-appearance:none;appearance:none;outline: none;border: none;text-decoration: none;list-style: none;font-style: normal;outline:none;border:0;line-height:100%;font-weight: normal;}
body{font-size:16px;font-size:100%;}
#appPc{min-width:1400px;font-family: 'Microsoft YaHei', '\5FAE\8F6F\96C5\9ED1', 'PingFangSC-Regular', 'PingFang SC', 'PingFang', sans-serif;background: #fff;overflow: hidden;position:relative;padding-bottom:320px;color:#222c38;
  input:-webkit-autofill{ -webkit-box-shadow:0 0 0px 1000px #fff inset;}
}
i.fa-times,i.fa-remove,i.fa-close{font-size:28px!important;}
.errorborder{border:1px solid red!important;box-sizing:border-box;border-radius: 2px;}
.wrap{width:1240px;margin:0 auto;}
[v-clock]{display: none; }
#judgedown{width:100%;height:100%;position: fixed;background:#fff;z-index: 1234567;;}
.pop{position: fixed;top:0;right:0;bottom:0;left:0;margin:auto;z-index: 1235;}
::-webkit-scrollbar {width: 14px;}
::-webkit-scrollbar-thumb{background-color:#dfe1e9;border-radius: 14px;width:14px;}
::-webkit-scrollbar-button{display: none;}
::-webkit-scrollbar-corne{display: none;}
::-webkit-resize{display: none;}
input{
  &:disabled{background:#f4f5f5;}
}
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button {-webkit-appearance: none;}
table{border-collapse:collapse;border-spacing:0;}
input[type=button],input[type=submit],button{cursor:pointer;}
a{color:#357ce1;font-size:18px;}
.fa.fa-remove,.fa.fa-close,.fa.fa-times{-webkit-text-stroke:3px #fff;color:#9194a4;}
.fa.fa-dot-circle-o{-webkit-text-stroke:.5px #fff;}
input[type="number"]{appearance: textfield;-webkit-appearance: textfield;-moz-appearance: textfield;}
.clear{clear:both;zoom: 1;}
.clear:after{content:"";display:block;height:0;clear:both;visibility:hidden;}
.fr{float:right;}
.fl{float:left;}
.show{display: block;}
.hide{display: none;}
.texthide{text-indent: -99999px;}
.textleft{text-align: left}
.textright{text-align: right;}
.textcenter{text-align: center;}
.vermiddle{vertical-align: middle}
.flex{display: flex;}
.flexgrow2{flex-grow: 2;}
.flexflowcolumn{flex-flow:column;}
.flexCenter{justify-content:center!important;align-items: center!important;}
.flexAround{justify-content: space-around;align-items: center;}
.flexShrink{flex-shrink: 0;}
.featuredcolor{color:#9eb5ca;font-size:16px;}
.pobz{position: absolute;top: 0;left: 0;z-index: 123;min-width:1240px;}
.spr{background-image:url('/static/staticfile/images/spr.png');background-repeat: no-repeat;}
.teamworkbox{background-image:url('/static/staticfile/images/teamworkbg.jpg');background-repeat:no-repeat;background-position:50%;background-size:1920px 546px;}
.btnhover{
  &:hover{background:#1762cd!important;
    a{background:#1762cd!important;}
  }

}
</style>
