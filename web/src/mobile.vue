<template>
  <div id="appMobile">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'appMobile',
  metaInfo () {
    return {
      meta: [{
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
      }]
    }
  },
  beforeCreate () {
    if (this.$route.query.lang) {
      localStorage.setItem('lang', this.$route.query.lang)
      this.$store.state.LANG = this.$route.query.lang
    }
  },
}
</script>
<style lang='less'>
h1,h2,h3,h4,h5,h6,a,li,dd,dt,dl,ul,ol,b,strong,u,s,i,em,p,div,section,img,article{-webkit-tap-highlight-color: transparent; -webkit-appearance:none;appearance:none;outline: none;border: none;text-decoration: none;list-style: none;font-style: normal;font-size:100%;outline:none;border:0;font-size:16px;line-height:100%;margin:0;padding:0;}
#appMobile{height:100%;
    ::-webkit-scrollbar {display: none;width:1px;;}
    ::-webkit-scrollbar-thumb{background-color:#dfe1e9;;display: none;width:1px;}
    ::-webkit-scrollbar-button{display: none;}
    ::-webkit-scrollbar-corne{display: none;}
    ::-webkit-resize{display: none;}
    input::-webkit-input-placeholder{font-size: .6rem;}
  .block{display: block;}
  .pohide{position: absolute;top:0;left:0;}
  a{text-decoration: none;}
  input,button{-webkit-tap-highlight-color: rgba(255, 255, 255, 0);-webkit-appearance:none;outline: none;}
  .texthide{text-indent: -999999px;}
  p{line-height: 1.7}
  li{list-style: none;}
  .fa.fa-remove,.fa.fa-close,.fa.fa-times{-webkit-text-stroke:3px #fff;color:#9194a4;}
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
  .flexCenter{justify-content:center;align-items: center;}
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
}
</style>
