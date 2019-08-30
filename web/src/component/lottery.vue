<template>
    <article id="Lottery">
      <div v-if="config.roundness_total" class="Lottery_container">
        <img id="Lottery_rund_hover" ref="Lottery_rund_hover" :src="config.roundness_bg_img" class="Lottery_rund_hover" />
        <img id="Lottery_rund_start" @click="stopRoll(1)" :src="config.roundness_start_img"  ref="Lottery_rund_start" :class="[{'Lottery_start': onoff.start}, {'Lottery_disable': !onoff.start}]">
      </div>
      <div v-else class="Lottery_container">
        <a hidefocus="true" id="Lottery_square_start" ref="Lottery_square_start" href="javascript:;" :class="[{'Lottery_start': onoff.start}, {'Lottery_disable': !onoff.start}]">
          <img class="Lottery_slight" />
        </a>
        <div ref="Lottery_square_hover" id="Lottery_square_hover" class="Lottery_square_hover"></div>
      </div>
    </article>
</template>
<script>
  export default {
    name: "lottery",
    props: {
      config: {
        light_img_url: {
          type: String,
          default: ''
        },
        start_img_url:{
          type: String,
          default: ''
        },
        width:{
          type: Number,
          default: 800
        },
        height:{
          type: Number,
          default: 660
        },
        square_total:{
          type: Number,
          default: 18
        },
        start_btn_x:{
          type: Number,
          default: 239
        },
        start_btn_y:{
          type: Number,
          default: 130
        },
        start_btn_w:{
          type: Number,
          default: 320
        },
        start_btn_h:{
          type: Number,
          default: 100
        },
        box_w:{
          type: Number,
          default: 100
        },
        box_h:{
          type: Number,
          default: 100
        },
        position: {
          type: Array,
          default : []
        },
        //================以下的参数配置为转盘类的==============================
        roundness_total: {
          type: Number,
          default: null
        },
        roundness_bg_img: {
          type: String,
          default: ''
        },
        roundness_start_img:{
          type: String,
          default: ''
        },
        roundness_start_x:{
          type: Number,
          default: 0
        },
        roundness_start_y:{
          type: Number,
          default: 0
        },
        roundness_bg_x:{
          type: Number,
          default: 0
        },
        roundness_bg_y:{
          type: Number,
          default: 0
        },
        //================以下的参数配置为通用设置==============================
        containerId: {
          type: String,
          default: 'Lottery'
        },
        startRollEvent: {
          type: Function,
          default: function () {alert(123)}
        },
        completeRollEvent: {
          type: Function,
          default: function () {alert(2345)}
        },
        turn: {//指定指针或者转盘转动，二选一。默认转盘转动
          type: String,
          default: 'dish'
        }
      }
    },
    data () {
      return {
        startBtn: '',
        classList: {},
        onoff: {
          start: true,
          enable: false,
          disable: false
        },
        step: [],
        curIndex: '',
        animateEndBool: false
      }
    },
    beforeCreate(){

    },
    created(){
      if(this.config.roundness_total){//初始化奖品队列
        var each = 360/this.config.roundness_total;
        for(var i = 0; i < this.config.roundness_total; i++){
          this.step.push(i * each);
        }
      }else{
        var arr = this.config.position.split(',');
        for(var i=0; i<arr.length; i++){
          var pos = arr[i].split('_');
          this.step.push({
            left : pos[0],
            top : pos[1]
          })
        }
      }
    },
    methods: {
      lotteryZoom (obj,zoom) {
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
       * 在指定范围中获取一个随机数
       * @param  {number} min 最小值
       * @param  {number} max 最大值
       * @return {number}     获取到的随机值
       */
      random (min,max) {
        return Math.floor(min+Math.random()*(max-min));
      },
      change (anim,style,from, to) {
        var keyframes = this.findKeyframesRule(anim);
        if(keyframes){
          keyframes.deleteRule("from");
          keyframes.deleteRule("to");
          var insert = function(rule){
            return (keyframes.appendRule && keyframes.appendRule(rule)) || (keyframes.insertRule && keyframes.insertRule(rule));
          }
          insert("from { "+style+": rotateZ("+from+"deg); }");
          insert("to { "+style+": rotateZ("+to+"deg); }");
        }else{
          this.addRule('@' + this.detectCSSPrefix().css + 'keyframes '+anim, 'from { ' + style + ': rotateZ(' + from + 'deg); } to { ' + style + ': rotateZ(' + to + 'deg); }');
        }
      },
      reset () {//重置
        this.onoff.enable = false;
        this.$refs.Lottery_rund_hover.style.cssText = '';
      },
      enable () {//结束
        this.onoff.enable = false;
      },
      disable () {//禁用
        this.onoff.disable = false;
      },
      changeLottery () {//暴露外部调用抽奖
        this.onoff.disable = false
        this.config.clickRollEvent();
      },
      stopRoll (id) {
        var i = 0;
        console.log(this.$refs.Lottery_rund_start)
        this.$refs.Lottery_rund_start.className = 'Lottery_disable'
        if(this.config.roundness_total){
          this.$refs.Lottery_rund_hover.style.cssText="-ms-transform: rotate("+ ((360-this.step[id]) + 360 * 6)+"deg); transform: rotateZ("+ ((360-this.step[id]) + 360 * 6)+"deg); transition:transform 3.5s cubic-bezier(0.35, -0.005, 0.565, 1.005) 0s;-ms-transition:transform 3.5s cubic-bezier(0.35, -0.005, 0.565, 1.005) 0s;";
          // 动画结束时事件
          this.$refs.Lottery_rund_hover.addEventListener("transitionend", () => {
            console.log(i++)
            this.$refs.Lottery_rund_start.className = 'Lottery_start'
            if(!this.animateEndBool) {
              this.config.completeRollEvent();
              this.$refs.Lottery_rund_hover.style.cssText="-ms-transform: rotateZ("+ ((360-this.step[id]))+"deg); transform: rotateZ("+ ((360-this.step[id]))+"deg);";
              this.enable();
              // this.animateEndBool = true;
            }
          });
          this.curIndex = id;
        }else{
          var ani = function(t, b, c, d){return c * t / d + b;}
          var dis = id - this.curIndex;
          var stepCounts = dis + this.config.total * _private.random(3,7) -1;   //3到6圈之间随机转
          var speedUp, uniform , slowDown;
          uniform = this.config.total * 2;
          speedUp = Math.floor((stepCounts - uniform)/3);
          uniform += speedUp;
          slowDown = stepCounts;
          var index = 0, slowT = 0;
          var moveFunc = function(){
            moveNext();
            if( ++index > stepCounts){
              this.enable();
              setTimeout(() => {
                this.config.completeRollEvent();
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
    }
  }
</script>

<style scoped lang="less">
  #Lottery{position:relative;display: inline-block;overflow:hidden;
    .Lottery_container {position:relative;display:inline-block;
      #Lottery_rund_start{
        &.Lottery_start {position:absolute;left : 0;top : 0;right: 0;button: 0;margin: auto;bottom: 0;cursor: pointer;
          outline : none;
          transition: transform .2s ease-in;
        }
        &.Lottery_disable {
          position:absolute;left : 0;top : 0;right: 0;button: 0;margin: auto;bottom: 0;cursor: pointer;
          cursor: auto;
          &.Lottery_slight {
            display : none
          }
        }
      }
      #Lottery_square_start{
        &.Lottery_start {position:absolute;left : 0;top : 0;right: 0;button: 0;margin: auto;bottom: 0;cursor: pointer;
          outline : none;
          transition: transform .2s ease-in;
        }
        &.Lottery_disable {
          position:absolute;left : 0;top : 0;right: 0;button: 0;margin: auto;bottom: 0;cursor: pointer;
          cursor: auto;
          &.Lottery_slight {
            display : none
          }
        }
      }
      .Lottery_hover {
        /*transform : scale(1.2)*/
      }
      .Lottery_speed_up {
        animation: Lottery_speed_up 1s ease-in forwards;
      }
      .Lottery_uniform {
        animation: Lottery_uniform 1s linear forwards;
      }
      .Lottery_slow_down {
        animation: Lottery_slow_down 1s ease-out forwards;
      }
      .Lottery_bgLight {
        animation: Lottery_bgLight 3s infinite
      }
      .Lottery_borderLight {
        animation: Lottery_borderLight 3s infinite
      }
    }
  }
  @keyframes Lottery_bgLight {
    0% {
      background-position: -500px 0;
    }
    100% {
      background-position: 500px 0;
    }
  }
  @keyframes Lottery_borderLight {
    0% {
      box-shadow: 0px 0px 10px 10px rgba(255, 255, 255, .3) inset;
    }
    100% {
      box-shadow: 0px 0px 20px 20px rgba(255, 255, 255, .6) inset;
    }
  }
</style>
