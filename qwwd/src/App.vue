<template>
  <div>
    <div v-for="(s, i) in q1" :key="i" v-if="i == showPage">
      <h3>{{s.bt}}</h3>
        <label v-for="(z, zz) in s.res" :key="zz">
          <input type="radio" name="s.bt" :value="resArr[(zz+1)]" @change="handRadio($event, s)" />
          {{z.name}}
        </label>
      <button @click="UserTouchBtn(s)">按钮</button>
    </div>
    <div v-if="showPage == (q1.length)">
      <div v-if="num < 10">谢谢参与</div>
      <!-- num最大等于你题目长度 -->
      <div v-if="num > 10 && num < 50">恭喜你获得三等奖</div>
      <div v-if="num > 50 && num < 80">恭喜你获得二等奖</div>
      <div v-if="num > 80 && num < 100">恭喜你获得一等奖</div>
      <div v-if="num == 100">恭喜你获得特等奖</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      resArr: {
        "1": "A",
        "2": "B",
        "3": "C",
        "4": "D"
      },
      showPage: 0,
      q1: [
        {
          bt: "血战麻将起源于哪个地区？",
          sure: "C",
          res: [
            {
              name: "A、东京"
            },
            {
              name: "B、巴黎"
            },
            {
              name: "C、四川"
            },
            {
              name: "D、土耳其"
            }
          ]
        },
        {
          bt: "一个玩家最多可能抓到几个杠？",
          sure: "D",
          res: [
            {
              name: "A、1个"
            },
            {
              name: "B、2个"
            },
            {
              name: "C、3个"
            },
            {
              name: "D、4个"
            }
          ]
        },
        {
          bt: "在血战麻将中，以下哪个牌型无法实现?",
          sure: "B",
          res: [
            {
              name: "A、清一色"
            },
            {
              name: "B、十三幺"
            },
            {
              name: "C、碰碰胡"
            },
            {
              name: "D、清钩钓"
            }
          ]
        },
        {
          bt: "在麻将牌中，同一张牌有几张？",
          sure: "D",
          res: [
            {
              name: "A、1"
            },
            {
              name: "B、2"
            },
            {
              name: "C、3"
            },
            {
              name: "D、4"
            }
          ]
        },
        {
          bt: "八筒是什么颜色的？",
          sure: "C",
          res: [
            {
              name: "A、红色"
            },
            {
              name: "B、绿色"
            },
            {
              name: "C、紫黑色"
            },
            {
              name: "D、黄色"
            }
          ]
        },
        {
          bt: "在四川话中，一筒的别称是？",
          sure: "B",
          res: [
            {
              name: "A、圆圈"
            },
            {
              name: "B、馍馍"
            },
            {
              name: "C、太阳"
            },
            {
              name: "D、煎饼"
            }
          ]
        },
        {
          bt: "听牌后启动托管，会发生什么？",
          sure: "D",
          res: [
            {
              name: "A、必然自摸"
            },
            {
              name: "B、打掉自摸"
            },
            {
              name: "C、立刻点炮"
            },
            {
              name: "D、遇胡则胡"
            }
          ]
        }
      ],
      userSelect: {},
      arr: {},
      num: 0
    };
  },
  created() {
    this.q1.map((key, index) => {
      this.userSelect[key.bt] = "";
      this.arr[key.bt] = key.sure;
    });
  },
  methods: {
    handRadio(e, data) {
      this.userSelect[data.bt] = e.target.value;
    },

    UserTouchBtn(data) {
      if (!this.userSelect[data.bt]) {
        alert("请选择答案");
        return;
      }
      this.showPage++;
      if (this.showPage >= this.q1.length) {
        this.showPage = this.q1.length;
        for (let z in this.userSelect) {
          if (this.arr[z] == this.userSelect[z]) {
            this.num++;
          }
        }
      }
      console.log(this.userSelect[data.bt]);
      console.log(this.arr);
      console.log(this.userSelect);
    }
  }
};
</script>
<style>
</style>
<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100vh;
  background: url(./images/bg.jpg) no-repeat center/cover;
  overflow: hidden;
  .content {
    overflow: hidden;
  }
  .content .link {
    width: 12.3rem;
    margin: 0.3rem auto 0;
    position: relative;
    z-index: 2;
  }
  .content .link a {
    display: block;
    text-indent: -9999rem;
  }
  .content .link a.back {
    width: 1.11rem;
    height: 0.7rem;
    background: url(//game.gtimg.cn/images/majiang/ingame/cp/a20181012qwwdig/back.png)
      no-repeat center/cover;
  }
  .content .link a.rule {
    width: 1.21rem;
    height: 0.73rem;
    background: url(//game.gtimg.cn/images/majiang/ingame/cp/a20181012qwwdig/gz.png)
      no-repeat center/cover;
  }
  /* fixation */
  .fixation {
    width: 11.95rem;
    height: 6.76rem;
    background: url(//game.gtimg.cn/images/majiang/ingame/cp/a20181012qwwdig/content.png)
      no-repeat center/cover;
    margin: -0.7rem auto 0;
    box-sizing: border-box;
    padding: 1.8rem 1.9rem 0.4rem 2.4rem;
    font-size: 0.26rem;
    color: #2d240d;
    position: relative;
    z-index: 1;
  }
  .fixation strong,
  .fixation em.num {
    font-size: 0.32rem;
    font-weight: bold;
  }
  .fixation .topic {
    margin-top: 0.3rem;
  }
  .option {
    width: 100%;
    margin-top: 0.4rem;
  }
  .option li {
    width: 3.22rem;
    height: 0.61rem;
    border: 0.02rem solid #ffb400;
    border-radius: 0.1rem;
    line-height: 0.61rem;
    box-sizing: border-box;
    padding: 0 0 0 0.1rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.24rem;
  }
  .option li label:nth-child(3) {
    flex: 1 1 auto;
  }
  .option li:nth-child(1),
  .option li:nth-child(3) {
    float: left;
  }
  .option li:nth-child(2),
  .option li:nth-child(4) {
    float: right;
  }
  .option li input[type="radio"] {
    display: none;
  }
  .option li .ui-radio {
    display: inline-block;
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    border: 0.02rem solid #ffb400;
    margin-right: 0.1rem;
  }
  .ui-radio::before {
    display: block;
    content: "";
    width: 0.15rem;
    height: 0.15rem;
    border-radius: 50%;
    background: #ff8400;
    margin: 0.05rem;
    visibility: hidden;
  }
  .option li :checked + .ui-radio::before {
    visibility: visible;
  }
  .fixation .qr {
    display: block;
    width: 3.73rem;
    height: 1.26rem;
    background: url(//game.gtimg.cn/images/majiang/ingame/cp/a20181012qwwdig/qr.png)
      no-repeat center/cover;
    margin: 0.2rem auto;
    text-indent: -9999rem;
    position: relative;
    z-index: 2;
  }
  .fixation-2 {
    display: none;
    padding-top: 1.4rem;
  }
  .fixation-2 h4 {
    text-align: center;
    font-size: 0.32rem;
    color: #2d240d;
    font-weight: bold;
  }
  .fixation-2 h4 span {
    color: #ff0505;
  }
  .fixation-2 h4 span em {
    font-weight: bold;
  }
  .fixation-2 p {
    font-size: 0.26rem;
    color: #2d240d;
    text-align: center;
  }
  .fixation-2 .umbrella {
    width: 4.69rem;
    height: 4.04rem;
    background: url(//game.gtimg.cn/images/majiang/ingame/cp/a20181012qwwdig/umbrella.png)
      no-repeat center/cover;
    margin: 0 auto;
    position: absolute;
    top: 1.8rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }
  .fixation-2 img {
    display: block;
    width: 2.68rem;
    height: 2.49rem;
    margin: 0 auto;
  }
  /* 弹窗 */
  .fix-dimg,
  .fix-dimg1 {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
  }
  .fix-dimg .pop {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 100;
  }
  .fix-dimg .pop .close {
    position: absolute;
    width: 0.8rem;
    height: 0.8rem;
    top: -0.4rem;
    right: -0.4rem;
    text-indent: -9999rem;
    background: url(//game.gtimg.cn/images/majiang/ingame/cp/a20181012qwwdig/close.png)
      no-repeat center/cover;
  }
  .fix-dimg .pop-1 {
    width: 5.07rem;
    height: 2.08rem;
    background: url(//game.gtimg.cn/images/majiang/ingame/cp/a20181012qwwdig/pop.png)
      no-repeat center/cover;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 0.63rem 0.8rem;
  }
  .fix-dimg .pop-1::after {
    position: absolute;
    content: "";
    width: 1.63rem;
    height: 1.73rem;
    right: -0.8rem;
    bottom: -0.3rem;
    background: url("//game.gtimg.cn/images/majiang/ingame/cp/a20181012qwwdig/prs-1.png")
      no-repeat center/cover;
  }
  .fix-dimg .pop-1 p {
    font-size: 0.34rem;
    color: #ff6c00;
    font-weight: bold;
  }
  .fix-dimg .pop-2 {
    width: 5.88rem;
    height: 3.29rem;
    background: url(//game.gtimg.cn/images/majiang/ingame/cp/a20181012qwwdig/pop.png)
      no-repeat center/cover;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 0.54rem 0.83rem;
  }
  .fix-dimg .pop-2::after {
    position: absolute;
    content: "";
    width: 2.43rem;
    height: 2.4rem;
    right: -1rem;
    bottom: -0.3rem;
    background: url(//game.gtimg.cn/images/majiang/ingame/cp/a20181012qwwdig/prs-2.png)
      no-repeat center/cover;
  }
  .fix-dimg .pop-2 p {
    font-size: 0.34rem;
    color: #ff6c00;
    font-weight: bold;
    text-align: center;
  }
  .fix-dimg .pop-2 .hao {
    display: block;
    width: 2.18rem;
    height: 0.76rem;
    text-indent: -9999rem;
    margin: 0.55rem auto 0;
    background: url(//game.gtimg.cn/images/majiang/ingame/cp/a20181012qwwdig/bt_1.png)
      no-repeat center/cover;
  }
  .fix-dimg .pop-3 {
    width: 6.69rem;
    height: 3.7rem;
    background: url(//game.gtimg.cn/images/majiang/ingame/cp/a20181012qwwdig/pop.png)
      no-repeat center/cover;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 0.54rem 0.7rem;
  }
  .fix-dimg .pop-3 p {
    font-size: 0.34rem;
    color: #ff6c00;
    font-weight: bold;
    text-align: center;
  }
  .fix-dimg .pop-3 span {
    display: block;
    widows: 100%;
    font-size: 0.24rem;
    color: #4c4334;
    margin-top: 0.35rem;
  }
  .fix-dimg .pop-3::after {
    position: absolute;
    content: "";
    width: 1.43rem;
    height: 1.89rem;
    right: -0.7rem;
    bottom: -0.3rem;
    background: url(//game.gtimg.cn/images/majiang/ingame/cp/a20181012qwwdig/prs-3.png)
      no-repeat center/cover;
  }
  .fix-dimg .pop-3 .center {
    text-align: center;
    margin-top: 0.3rem;
  }
  .fix-dimg .pop-3 .center .fhdt {
    display: inline-block;
    width: 2.18rem;
    height: 0.76rem;
    text-indent: -9999rem;
    background: url("//game.gtimg.cn/images/majiang/ingame/cp/a20181012qwwdig/bt_2.png")
      no-repeat center/cover;
  }
  .fix-dimg .pop-3 .center .tcdt {
    display: inline-block;
    width: 2.18rem;
    height: 0.76rem;
    text-indent: -9999rem;
    background: url("//game.gtimg.cn/images/majiang/ingame/cp/a20181012qwwdig/bt_3.png")
      no-repeat center/cover;
  }
  .fix-dimg1 .pop-4 {
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    height: 0;
    box-sizing: border-box;
    padding: 0 2.04rem;
    transition: height 0.3s;
  }
  .fix-dimg1 .pop-4 .close {
    position: absolute;
    width: 0.8rem;
    height: 0.8rem;
    top: -0.4rem;
    right: 1.6rem;
    text-indent: -9999rem;
    background: url(//game.gtimg.cn/images/majiang/ingame/cp/a20181012qwwdig/close.png)
      no-repeat center/cover;
  }
  .fix-dimg1 .pop-4 strong {
    font-size: 0.34rem;
    color: #fff;
    font-weight: bold;
  }
  .pop-4 .rule {
    font-size: 0.24rem;
    color: #fff;
    line-height: 1.5;
  }
  .pop-4 .rule em {
    color: #fff000;
  }
}
</style>