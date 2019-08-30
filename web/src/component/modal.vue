<template>
    <div id="modal" v-if="showonoff">
      <h4>{{title}}</h4>
      <i class="fa fa-remove" @click="showonoff = false, showList = []"></i>
      <div v-for="(s, i) in showList" :key='i'>
      <span v-if="s.type== 'textImg' || s.type == 'text'">
        <i v-for='(ss, ii) in s.info' :key="ii">{{ss}}</i>
      </span>
        <span v-if="s.type=='textImg' || s.type == 'img'">
        <img @error='imgerr($event)' :src="ss" v-for="(ss, ii) in s.steps" :key="ii"/>
      </span>
      </div>
      <button @click="goOutLink" v-if="popButtonOnoff">{{$t('common.btn.z')}}</button>
    </div>
</template>

<script>
  export default {
    name: "modal",
    props: {
      Title: {
        type: String,
        default: '提示',
      },
      Text: {
        type: String,
        default: ''
      },
      ContentArr: {
        type: Array,
        default: ''
      }
    },
    data () {
      return {

      }
    },
  }
</script>

<style scoped lang="less">

</style>
