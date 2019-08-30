<template>
  <div id="verificationmobild">
    <div id="google">
      <div class="val-box" ref="valBox" @click.stop="focusfun">
        <input ref="valCodeInput" v-model.trim="vercode" class='numbers' type="number" maxlength="6"  />
        <div :class="{'active': vercode.length>=1}" class="valItem" name="valItem">{{vercode[0]}}</div>
        <div :class="{'active': vercode.length>=2}" class="valItem" name="valItem">{{vercode[1]}}</div>
        <div :class="{'active': vercode.length>=3}" class="valItem" name="valItem">{{vercode[2]}}</div>
        <div :class="{'active': vercode.length>=4}" class="valItem" name="valItem">{{vercode[3]}}</div>
        <div :class="{'active': vercode.length>=5}" class="valItem" name="valItem">{{vercode[4]}}</div>
        <div :class="{'active': vercode.length>=6}" class="valItem" name="valItem">{{vercode[5]}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'verificationmobild',
  data () {
    return {
      valBox: this.$refs.valBox,
      valCodeLength: 0,
      regex: /^[\d]+$/,
      numreg: /[\D]/g,
      vercode: ''
    }
  },
  mounted () {

  },
  methods: {
    focusfun() {
      this.$refs.valCodeInput.focus ()
    }
  },
  watch: {
    vercode (newName, oldName) {
      this.vercode = newName.substr(0, 6).replace(this.numreg, '')
      this.$emit('vercode', {vercode: this.vercode})
    },
  }
}
</script>
<style lang="less" scoped>
  #verificationmobild{margin-bottom:20px;}
  .container {position: absolute;top: 50%;left: 50%;margin: -80px 0 0 -135px;padding: 10px;text-align: center;}
  .container p{font-family: "微软雅黑";color: #888;}
  .val-box {display: flex;justify-content: space-around;height: 50px;text-align: center;position: relative;background: #FFFFFF;}
  .val-box input.numbers {position: absolute;left: 0;top: 0;height: 50px;width: 400px;opacity: 0.9;z-index: -999;outline: none;}
  .val-box div {height: 50px;width: 50px;border: 1px solid #DDD;border-radius: 5px;float: left;margin: 0 20px 0 0;z-index: 5;font-size: 1.5em;font-family: arial;font-weight: 530;text-align: center;line-height: 50px;cursor: text;box-sizing: border-box;
    &:last-child{margin:0;}
  }
  .val-box .active {border-color: #0081db;}
</style>
