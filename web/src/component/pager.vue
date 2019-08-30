<template>
    <div class="pageNor-wrapper" ref="pageNor" v-if="pageSize >= 2">
        <div class="pageNor-box">
            <a class="pageNor-prev" :class="{'pager-disabled':prevDisable}" href="javascript:;" @click.stop="jumpPrev()">{{$t('common.prev')}}</a>
            <template v-for="i in pageSize">
                <a :key="i" v-if="i == pageNo" class="pageNor-curr">{{i}}</a>
                <a :key="i" v-else-if="pageNo<5&&(i)<6" href="javascript:;" @click.stop="jump(i)">{{i}}</a>
                <a :key="i" v-else-if="pageSize<7||i==1||i==pageSize||(pageNo-2<=i&&i <=pageNo+2)" href="javascript:;" @click.stop="jump(i)">{{i}}</a>
                <template v-else>
                    <span :key="i" v-if="pageNo<5&&i==6" class="pageNor-spr">…</span>
                    <span :key="i" v-if="pageNo==4&&i==7" class="pageNor-spr">…</span>
                    <span :key="i" v-if="pageNo>4&&i==pageNo-3" class="pageNor-spr">…</span>
                    <span :key="i" v-if="pageNo>4&&i==pageNo+3" class="pageNor-spr">…</span>
                </template>
            </template>
            <a class="pageNor-next" :class="{'pager-disabled':nextDisable}" href="javascript:;" @click.stop="jumpNext()">{{$t('common.next')}}</a>
        </div>
        <div class="pageNor-input">
            <input type="number" v-model.trim="jumpPage">
            <a class="pageNor-btn-go" href="javascript:;" @click.stop="Go()">GO</a>
        </div>
    </div>
</template>
<script>
//  /**
//   * 参数：
//   *      pageSize: Number
//   *      pageNo: Number
//   * 事件:
//   *      on-jump
//   * 调用例子: <pager :pageSize="30" v-model.trim="pageNo" @on-jump="jump"></pager>
//  */
export default {
  model: {
    prop: 'pageNo',
    event: 'jumpPage'
  },
  props: {
    pageSize: {
      type: Number,
      default: 1
    },
    pageNo: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      jumpPage: ''
    }
  },
  computed: {
    prevDisable () {
      if (this.pageNo > 1) {
        return false
      } else {
        return true
      }
    },
    nextDisable () {
      if (this.pageNo < this.pageSize && this.pageSize > 1) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    jumpPrev () {
      if (this.pageNo == 1) {
      } else {
        this.$emit('jumpPage', this.pageNo - 1)
        this.$emit('on-jump', this.pageNo - 1)
      }
    },
    jumpNext () {
      if (this.pageNo === this.pageSize) {
      } else {
        this.$emit('jumpPage', this.pageNo + 1)
        this.$emit('on-jump', this.pageNo + 1)
      }
    },
    jump (id) {
      if (id > this.pageSize) {
        id = this.pageSize
      }
      this.$emit('jumpPage', id)
      this.$emit('on-jump', id)
    },
    Go () {
      if (this.jumpPage === '') {
      } else if (/^\d*$/.test(Number.parseInt(this.jumpPage))) {
        this.jump(Number.parseInt(this.jumpPage))
        this.jumpPage = ''
      } else {
        this.jumpPage = ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
.pageNor-wrapper{position: relative;display: flex;align-items:center;justify-content: center;
    .pageNor-box{display: flex;align-items: center;
        text-align: center;
        .pageNor-curr{position: relative;background-color: #357ce1;color: #fff;border-color:#357ce1;}
        a,span{display: inline-block;vertical-align: middle;height: 28px;line-height: 28px;margin: 7px;background-color: #fff;padding: 0 10px;font-size: 12px;color: #333;text-decoration: none;border: 1px solid #ececec;border-radius: 2px;box-sizing: content-box;}
        .pagerNor-disabled{background-color:#ececec}
    }
    .pageNor-input{display: flex;align-items: center;
        margin-left:20px;
        input{width: 40px;height: 30px;line-height: 28px;border: 1px solid #ececec;box-sizing: border-box;padding: 0 5px;border-radius: 2px;text-align: center;}
        a{display: inline-block;vertical-align: middle;height: 28px;line-height: 28px;margin: 7px;background-color: #fff;padding: 0 10px;font-size: 12px;color: #333;text-decoration: none;border: 1px solid #ececec;border-radius: 2px;box-sizing: content-box;}
    }
}
</style>
