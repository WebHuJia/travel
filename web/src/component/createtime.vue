<template>
  <article id="createTime">
    <section>
      <span @click.stop="showSelect('year')"  @mouseleave="hide">{{nowTime}}<i class="fa fa-sort-desc"></i></span>
      <ul v-if="show.year" @mouseleave="hide" @mouseenter="showSelect('year')">
        <li v-for="i in YearArr" :key="i" @click.stop="change({year: i,month: itMonth,day: itDay})">{{i}}</li>
      </ul>
    </section>
    <p><slot name="year">{{$store.state.LANG == 'zh-cn' ? $t('invitation.title1') : '-'}}</slot></p>
    <section>
      <span @click.stop="showSelect('month')"  @mouseleave="hide">{{itMonth}}<i class="fa fa-sort-desc"></i></span>
      <ul v-if="show.month" @mouseleave="hide" @mouseenter="showSelect('month')">
        <li v-for="i in MonthArr" :key="i" @click.stop="change({year: nowTime,month: i,day: itDay})">{{i}}</li>
      </ul>
    </section>
    <p><slot name="month">{{$store.state.LANG == 'zh-cn' ? $t('common.month') : '-'}}</slot></p>
    <section>
      <span @click.stop="showSelect('day')"   @mouseleave="hide">{{itDay}}<i class="fa fa-sort-desc"></i></span>
      <ul v-if="show.day" @mouseleave="hide" @mouseenter="showSelect('day')">
        <li v-for="i in DayArr" :key="i" @click.stop="change({year: nowTime,month: itMonth,day: i})">{{i}}</li>
      </ul>
    </section>
    <p><slot name="day">{{$store.state.LANG == 'zh-cn' ? $t('common.day') : ''}}</slot></p>
  </article>
</template>
<script>
export default {
  props: {
    endTime: {
      type: Number,
      default: new Date().getFullYear()
    },
    stateTime: {
      type: Number,
      default: new Date().getFullYear()
    },
    sort: {
      type: Number,
      default: 'asc'
    },
    defaultTime: {
      type: Number,
      default: new Date().getTime()
    }
  },
  data () {
    return {
      craetYear: 1918,
      itTime: new Date().getFullYear(),
      nowTime: new Date().getFullYear(),
      itMonth: new Date().getMonth() +1,
      itDay: new Date().getDate(),
      YearArr: [],
      MonthArr: [],
      DayArr: [],
      show: {
        year: false,
        month: false,
        day: false
      }
    }
  },
  created () {
    let ist = this.defaultTime || Date.now()
    let dd = new Date(ist)
    this.nowTime = dd.getFullYear()
    this.itMonth = (dd.getMonth() + 1) <= 9 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1)
    this.itDay = dd.getDate() <= 9 ? '0' + dd.getDate() : dd.getDate()
    if (this.endTime >= this.itTime) {
      this.itTime = this.endTime
    }
    if (this.stateTime >= this.craetYear) {
      this.craetYear = this.stateTime
    }
    if (this.sort == 'asc') {
      for (var i = this.itTime; i>= this.craetYear; i--) {
        this.YearArr.push(i)
      }
    } else if (this.sort == 'desc') {
      for (var i = this.craetYear; i <= this.itTime; i++) {
        this.YearArr.push(i)
      }
    }
    for (var i = 1; i <= 12; i++) {
      var ii = i
      if (i <= 9) {
        ii = '0' + ii
      }
      this.MonthArr.push(ii)
    }
    for (var i = 1; i <= 31; i++) {
      var ii = i
      if (i <= 9) {
        ii = '0' + ii
      }
      this.DayArr.push(ii)
    }
    this.$emit('time',{year: this.nowTime,month: this.itMonth,day: this.itDay})
  },
  methods: {
    change (opt) {
      this.nowTime = opt.year
      this.itMonth = opt.month
      this.itDay = opt.day
      this.$emit('time',{year: this.nowTime,month: this.itMonth,day: this.itDay})
      this.show.year = false
      this.show.month = false
      this.show.day = false
    },
    showSelect (d) {
      this.show[d] = !this.show[d]
    },
    hide () {
      this.show.year = false
      this.show.month = false
      this.show.day = false
    }
  }
}
</script>
<style lang="less" scoped>
  #createTime{display: flex;
    p{line-height:40px;margin:0 10px;}
    section{width:100px;height:40px;line-height:40px;position:relative;
      span{width:100%;height:40px;line-height:40px;display: block;border:1px solid #f5f5f5;border-radius: 2px;text-align: center;display: flex;justify-content: space-between;padding:0 20px;box-sizing: border-box;font-size:14px;
        i.fa{height:100%;line-height: 250%;}
      }
      ul{z-index: 123;text-align: center;border-width: 1px;border-color: rgb(215, 215, 215);border-style: solid;background-color: rgb(252, 253, 253);box-shadow: 0px 8px 16px 0px rgba(31, 30, 77, 0.09);box-sizing: border-box;
        position:absolute;top:50px;left:0;background:#fff;color:#caccd1;font-size: 18px;height:400px;overflow:auto;
        width:100%;border:1px solid #ddd;
        &::-webkit-scrollbar{width: 9px;}
        &::-webkit-scrollbar-thumb{background-color: rgb(223, 225, 233);border-radius: 9px;width:9px;}
        li{font-size:14px;line-height:1.5;width:100%;background:#fff;border-bottom:1px solid #ddd;height:50px;line-height:49px;box-sizing:border-box;margin-bottom:0;padding:0 22px;display:flex;justify-content:space-between;cursor: pointer;text-transform:capitalize;
        &:hover{background:#f4f5f6;color:#5a626d;}
      }
    }
    }
  }
</style>

