function Lottery(option){
  var _public = this;
  var _static = {};
  var _private = {
    /**
     * 添加样式规则
     * @param {string} selector 选择器
     * @param {string} styleObj 样式
     * @param {number} pos      插入的位置
     */
    addRule : function(selector, styleObj, pos){


      var text = '';
      var style = document.getElementsByTagName('style')[0];
      if(!style){
        style = document.createElement('style');
        style.type = "text/css";
        document.getElementsByTagName('head')[0].appendChild(style);
      }
      var sheet = style.sheet || style.styleSheet;
      if(typeof styleObj == 'string'){
        text = styleObj;
      }else{
        for(var k in styleObj){
          text += (k + ':' + styleObj[k] + ';');
        }
      }
      pos = pos || 0;

      function getTag(tagName, oParent) {
        return (oParent || document).getElementsByTagName(tagName);
      }
      function getClass(className, element, tagName) {
        var i = 0, aClass = [], reClass = new RegExp("(^|\\s)" + className + "(\\s|$)"), aElement = getTag(tagName || "*", element || document);
        for (i = 0; i < aElement.length; i++) reClass.test(aElement[i].className) && aClass.push(aElement[i]);
        return aClass;
      }



      if('insertRule' in sheet){
        //alert("现代浏览器");
        //////console.log(pos)
        sheet.insertRule(selector + '{' + text + '}', pos)
      }else{
        //////console.log(selector);

        if(!/\@keyframes/.test(selector)){
          sheet.addRule(selector,text, pos);
        }
      }
    },
    myBrowser:function(){
      var userAgent = window.navigator.userAgent; //取得浏览器的userAgent字符串
      var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
      var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
      var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
      var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
      if(userAgent.indexOf("Edge") > -1){
        return "edge";
      }
      if (isIE) {
        var IE5 = IE55 = IE6 = IE7 = IE8 = false;
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        // alert(fIEVersion);
        IE55 = fIEVersion == 5.5;
        IE6 = fIEVersion == 6.0;
        IE7 = fIEVersion == 7.0;
        IE8 = fIEVersion == 8.0;
        IE9 = fIEVersion == 9.0;
        if (IE55) {
          return "IE55";
        }
        if (IE6) {
          return "IE6";
        }
        if (IE7) {
          return "IE7";
        }
        if (IE8) {
          return "IE8";
        }
        if (IE9) {
          return "IE9";
        }
      }//isIE end
      if (isFF) {
        return "FF";
      }
      if (isOpera) {
        return "Opera";
      }
    },
    isMobile: function(){
      return /iphone|ios|android|mini|mobile|mobi|Nokia|Symbian|iPod|iPad|Windows\s+Phone|MQQBrowser|wp7|wp8|UCBrowser7|UCWEB|360\s+Aphone\s+Browser|blackberry/i.test(navigator.userAgent);
    },
    lotteryZoom: function(obj,zoom){
      for (items in obj){
        if(typeof obj[items] == "number"&&items != "total"){
          obj[items] = obj[items]*zoom;
        }
        else if(items =="position"){
          var position = obj[items];
          var step = [];
          var arr = position.split(',');
          for(var i=0; i<arr.length; i++){
            var pos = arr[i].split('_');
            step.push(pos[0]*zoom+"_"+pos[1]*zoom)
          }

          obj[items] = step.join(",");
        }
      }
    },
    /**
     * 检测样式前缀
     * @return {Object} css和js的前缀
     */
    detectCSSPrefix : function(){
      var getStyle = window.getComputedStyle;
      var theCSSPrefix
      var rxPrefixes = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
      var obj = {'js' : '','css' : ''}
      if(!getStyle) {
        return obj;
      }
      var style = getStyle(document.createElement('div'), null);
      var map = {
        '-webkit-': 'webkit',
        '-moz-': 'Moz',
        '-ms-': 'ms',
        '-o-': 'O'
      }
      for(var k in style) {
        theCSSPrefix = (k.match(rxPrefixes) || (+k == k && style[k].match(rxPrefixes)));
        if(theCSSPrefix) {
          break;
        }
      }
      if(!theCSSPrefix) {
        return obj;
      }

      theCSSPrefix = theCSSPrefix[0];

      if(theCSSPrefix.slice(0,1) === '-') {
        obj['css'] = theCSSPrefix
        obj['js'] = ({
          '-webkit-': 'webkit',
          '-moz-': 'Moz',
          '-ms-': 'ms',
          '-o-': 'O'
        })[theCSSPrefix];
      } else {
        obj['css'] = '-' + theCSSPrefix.toLowerCase() + '-';
        obj['js'] = theCSSPrefix;
      }
      return obj;
    },
    /**
     * 在指定范围中获取一个随机数
     * @param  {number} min 最小值
     * @param  {number} max 最大值
     * @return {number}     获取到的随机值
     */
    random : function(min,max){
      return Math.floor(min+Math.random()*(max-min));
    },
    /**
     * 提取keyframe规则
     * @param  {string} rule [description]
     * @return {string}      [description]
     */
    findKeyframesRule : function (rule){
      var ss = document.styleSheets;
      for (var i = 0; i < ss.length; ++i) {
        if(!ss[i].cssRules) continue;
        for (var j = 0; j < ss[i].cssRules.length; ++j) {
          if (ss[i].cssRules[j].type == (window.CSSRule.WEBKIT_KEYFRAMES_RULE
            || window.CSSRule.MOZ_KEYFRAMES_RULE
            || window.CSSRule.O_KEYFRAMES_RULE
            || window.CSSRule.KEYFRAMES_RULE)
            && ss[i].cssRules[j].name == rule)
            return ss[i].cssRules[j];
        }
      }

      // rule not found
      return null;
    },
    change : function(anim,style,from, to) {
      var keyframes = _private.findKeyframesRule(anim);
      if(keyframes){
        keyframes.deleteRule("from");
        keyframes.deleteRule("to");
        var insert = function(rule){
          return (keyframes.appendRule && keyframes.appendRule(rule)) || (keyframes.insertRule && keyframes.insertRule(rule));
        }
        insert("from { "+style+": rotateZ("+from+"deg); }");
        insert("to { "+style+": rotateZ("+to+"deg); }");
      }else{
        _private.addRule('@' + _private.prefix + 'keyframes '+anim, 'from { ' + style + ': rotateZ(' + from + 'deg); } to { ' + style + ': rotateZ(' + to + 'deg); }');
      }
    }
  }


  var _static = this.constructor;

  /**
   * css前缀
   * @type {[type]}
   */
  _private.prefix = _private.detectCSSPrefix().css;
  var myBrowser = _private.myBrowser();


  var _self = this;


  function cloneObj(oldObj) { //复制对象方法
    if (typeof(oldObj) != 'object') return oldObj;
    if (oldObj == null) return oldObj;
    var newObj = new Object();
    for (var i in oldObj)
      newObj[i] = cloneObj(oldObj[i]);
    return newObj;
  };
  function extendObj() { //扩展对象
    var args = arguments;
    // ////////console.log(args);
    if (args.length < 2) return;
    var temp = cloneObj(args[0]); //调用复制对象方法
    for (var n = 1; n < args.length; n++) {
      for (var i in args[n]) {
        temp[i] = args[n][i];
      }
    }
    return temp;
  }


  //console.log(option);
  _self.config =extendObj({},_static.config,option);

  var config = _self.config;
  var clsPre = config.contentId;

  var classes = {
    'container' : clsPre + '_container',
    'start' : clsPre + '_start',
    'disable' : clsPre + '_disable',
    'slight' : clsPre + '_slight',
    'hover' : clsPre + '_hover',
    'speed_up' : clsPre + '_speed_up',
    'uniform' : clsPre + '_uniform',
    'slow_down' : clsPre + '_slow_down',
    'bgLight' : clsPre + '_bgLight',
    'borderLight' : clsPre + '_borderLight'
  }

  var startBtn = null, moveBox = null, container = config['container'];
  //初始化class*/
  var classInit = (function(){

    //抽奖容器的class初始化
    _private.addRule('.' + classes['container'],{
      position : 'absolute',
      left:0,
      top:0,
      width : config.width/100 + 'rem',
      height : config.height/100 + 'rem'
    })
    if(config.r){ //大转盘类
      var startBtn = {
        display : 'block',
        position:'absolute',
        left : '0',
        top : '0',
        right: '0',
        button: '0',
        margin: 'auto',
        bottom: '0',
        cursor : 'pointer'
      }
      startBtn[_private.prefix + 'transition'] = 'transform .2s ease-in';
      _private.addRule('.' + classes['start'], startBtn);
      //不可点击状态的抽奖按钮class初始化
      var disableBtn = extendObj(startBtn,{cursor:'normal'});


      //Zepto.extend(startBtn,{cursor:'normal'})
      _private.addRule('.' + classes['disable'], disableBtn)

      // _private.addRule('.' + classes['start'] + ':hover', {
      //   transform : 'scale(1.2)'
      // })
      // config.b = config['lotteryImg'];
      // _private.addRule('.' + classes['hover'], {
      //   position:'absolute',
      //   left : '0',
      //   top : '0',
      //   width : config.width/100 + 'rem',
      //   height : config.height/100 + 'rem',
      //   background:"url("+config.b+") no-repeat"
      // })

      var speed_up = {}
      speed_up[_private.prefix + 'animation'] = classes['speed_up'] + ' 1s ease-in forwards';
      var uniform = {}
      uniform[_private.prefix + 'animation'] = classes['uniform'] + ' 1s linear forwards';
      var slow_down = {}
      slow_down[_private.prefix + 'animation'] = classes['slow_down'] + ' 1s ease-out forwards';
      _private.addRule('.' + classes['speed_up'], speed_up);
      _private.addRule('.' + classes['uniform'], uniform);
      _private.addRule('.' + classes['slow_down'], slow_down);

    }else{
      if(myBrowser!="IE6"&&myBrowser!="IE7"&&myBrowser!="IE8"&&myBrowser!="IE9" && myBrowser !="edge"){
        _private.addRule('@' + _private.prefix + 'keyframes '+ classes['bgLight'], '0% {background-position: -500px 0}100% {background-position: 500px 0}');
        _private.addRule('@' + _private.prefix + 'keyframes '+ classes['borderLight'] , '0% {box-shadow:0px 0px 10px 10px rgba(255,255,255,.3) inset}100% {box-shadow:0px 0px 20px 20px rgba(255,255,255,.6) inset}');
      }

      //抽奖按钮的class初始化
      var startBtn = {
        position : 'absolute',
        width : config.sbtnw/100 + 'rem',
        height : config.sbtnh/100 + 'rem',
        left : config.sbtnx/100 + 'rem',
        top : config.sbtny/100 + 'rem',
        display : 'block',
        outline : 'none'
      }
      //正常状态下的抽奖按钮
      var start = extendObj(startBtn,{cursor : 'pointer',background : 'url('+ config.starturl +') no-repeat'});



      start[_private.prefix + 'backface-visibility'] = 'hidden';
      start[_private.prefix + 'animation'] = classes['borderLight'] + ' 1s infinite alternate';
      _private.addRule('.' + classes['start'], start)

      //不可点击状态的抽奖按钮class初始化
      var disableBtn = extendObj(startBtn,{cursor:'normal',background:'rgba(0,0,0,.5)'});

      _private.addRule('.' + classes['disable'], disableBtn)
      _private.addRule('.' + classes['disable'] + ' .' + classes['slight'], {
        display : 'none'
      })

      //光影效果添加的class初始化
      var slight = {
        width : '100%',
        height : '100%'
      }
      slight[_private.prefix + 'backface-visibility'] = 'hidden';
      slight[_private.prefix + 'animation'] = classes['bgLight'] + ' 3s infinite';
      _private.addRule('.' + classes['slight'],slight)

      var moveLight = {
        position:'absolute',
        left : '0',
        top : '0',
        width : config.boxw/100 + 'rem',
        height : config.boxh/100 + 'rem',
        display : 'none'
      }
      config.lighturl ? (moveLight['background'] = "url("+config.lighturl+") no-repeat"):(moveLight['box-shadow'] = '0px 0px 10px 10px rgba(255,255,255,.8) inset');
      //移动的光影效果
      _private.addRule('.' + classes['hover'], moveLight);
    }
  })();
  //界面初始化
  var faceInit = (function(){
    var str
    if(config.r){
      str = '<div  class="' + classes['container'] + '"><img id="' + classes['hover'] + '" src="'+config['lotteryImg']+'" class="' + classes['hover'] + '" /><img src="'+config.s+'"  id="' + classes['start'] + '" class="' + classes['start'] + '"></div>';
    }else{
      str = '<div class="' + classes['container'] +
        '"><a hidefocus="true" id="' + classes['start'] + '" href="javascript:;" class="' + classes['start'] +
        '"><div class="' + classes['slight'] +
        '"></div></a><div  id="' + classes['hover'] + '" class="' + classes['hover'] + '"></div></div>';
    }
    container.innerHTML = str;
    startBtn = document.getElementById(classes['start']);
    moveBox = document.getElementById(classes['hover']);
    // if(config.r){//调整坐标位置
    //   startBtn.onload = function(){
    //     startBtn.style.cssText = 'margin-left:' + -(startBtn.width / 2 + config.sx) + 'px; margin-top:' + -(startBtn.height / 2 + config.sy) + 'px';
    //     startBtn.onload = null;
    //   }
    // }
  })();

  var btn = {
    disable : function(){
      if(startBtn.className ==  classes['disable']){
        return false;
      }
      startBtn.className = classes['disable'];
      return true;
    },
    enable : function(){
      startBtn.className = classes['start'];
    }
  }

  var bind = (function(){

    startBtn.onclick = function(e){
      btn.disable() && config.onClickRollEvent();
    }

  })();
  //处理步骤
  var step = [];
  var parseStep = (function(){
    if(config.r){
      var each = 360/config.r;
      for(var i = 0; i < config.r; i++){
        step.push(i * each);
      }
    }else{
      var arr = config.position.split(',');

      for(var i=0; i<arr.length; i++){
        var pos = arr[i].split('_');
        step.push({
          left : pos[0],
          top : pos[1]
        })
      }
    }
  })();
  var curIndex = 0;
  //运动到下一个奖品
  var moveNext = function(){
    if(++curIndex >= config.total){
      curIndex = 0;
    }
    var curInfo = step[curIndex];
    moveBox.style.cssText = "display:block;left:"+curInfo.left/100+'rem;top:'+curInfo.top/100+'rem;';
  }

  var fastTime = 30, slowTime = 300, rdis = 8;
  this.reset = function(){//重置
    btn.enable();
    moveBox.style.cssText = '';
  };
  this.enable= function(){//结束
    btn.enable();
  };
  this.disable= function(){//禁用
    btn.disable();
  };
  this.changeLottery = function (){//暴露外部调用抽奖
    btn.disable() && config.onClickRollEvent();
  };
  this.stopRoll = function(id){
    if(config.r){
      if(myBrowser!="IE6"&&myBrowser!="IE7"&&myBrowser!="IE8"&&myBrowser!="IE8"&&myBrowser!="edge"){
        var animateEndBool = false;
        moveBox.style.cssText="-ms-transform: rotate("+ ((360-step[id]) + 360 * 6)+"deg); transform: rotateZ("+ ((360-step[id]) + 360 * 6)+"deg); transition:transform 3.5s cubic-bezier(0.35, -0.005, 0.565, 1.005) 0s;-ms-transition:transform 3.5s cubic-bezier(0.35, -0.005, 0.565, 1.005) 0s;";
        // 动画结束时事件
        moveBox.addEventListener("transitionend", function() {
          if(!animateEndBool) {
            config.onCompleteRollEvent();
            moveBox.style.cssText="-ms-transform: rotateZ("+ ((360-step[id]))+"deg); transform: rotateZ("+ ((360-step[id]))+"deg);";
            btn.enable();
            animateEndBool=true;
          }
        });
        if(myBrowser=="IE9"){
          btn.enable();
          config.onCompleteRollEvent();
        }

      }else{
        btn.enable();
        config.onCompleteRollEvent();
      }
      curIndex = id;
    }else{
      var ani = function(t, b, c, d){return c * t / d + b;}
      var dis = id - curIndex;
      var stepCounts = dis + config.total * _private.random(3,7) -1;   //3到6圈之间随机转
      var speedUp, uniform , slowDown;
      uniform = config.total * 2;
      speedUp = Math.floor((stepCounts - uniform)/3);
      uniform += speedUp;
      slowDown = stepCounts;
      var index = 0, slowT = 0;
      var moveFunc = function(){
        moveNext();
        if( ++index > stepCounts){
          btn.enable();
          setTimeout(function () {
            config.onCompleteRollEvent();
          }, 100)

          return;
        }
        var moveTime, t = index, b = slowTime, c = fastTime - slowTime , d = speedUp;

        if(index <= speedUp){//加速
          moveTime = ani(t,b,c,d);
        }
        if(index > speedUp){ //匀速
          moveTime = fastTime;
        }
        if(index > uniform){//减速
          t = slowT++
          b = fastTime;
          c = slowTime - fastTime;
          d = slowDown - uniform;
          moveTime = ani(t,b,c,d);
        }
        setTimeout(moveFunc, moveTime)
      }
      setTimeout(moveFunc, slowTime);
    }
  }

  _static.config = {
    'lighturl':'',
    'starturl':'',
    'width':800,
    'height':660,
    'total':18,
    'sbtnx':239,
    'sbtny':130 ,
    'sbtnw':320,
    'sbtnh':100,
    'boxw':100,
    'boxh':100,
    'position':"",
    'contentId' : 'swfcontent',
    'onClickRollEvent' : function(){},
    'onCompleteRollEvent':function(){},
    //================以下的参数配置为转盘类的==============================
    'r' : null,
    'b':'',
    's':'',
    'bx':0,
    'by':0,
    'sx':0,
    'sy':0
  };
}
export default Lottery


