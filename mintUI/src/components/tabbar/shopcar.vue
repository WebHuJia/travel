<template>
  <div>
    <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
      <li class="mui-table-view-cell" v-for="item in list" :key="item.id">
        <div class="mui-table">
          <div class="mui-table-cell mui-col-xs-10">
            <h4 class="mui-ellipsis">信息化推进办公室{{ item.count }}</h4>
            <h5>申请人：李四{{ $store.getters.getCount }}</h5>
            <p class="flex">
              <mt-switch v-model="$store.getters.getSelected[item.id]" @change="seclectedChange(item.id,$store.getters.getSelected[item.id])"></mt-switch>
              <numberlist :n="$store.getters.getCount[item.id]" :num="item.id"></numberlist>
            </p>
            <p class="mui-h6 mui-ellipsis">Hi，李明明，申请交行信息卡，100元等你拿，李明明，申请交行信息卡，100元等你拿，</p>
          </div>
        </div>
      </li>
    </ul>
    {{$store.getters.getSelected}}
  </div>
</template>

<script>
import numberlist from '../nunber/numberlist.vue'
export default {
  data () {
    return {
      list: [],
      num: ''
    }
  },
  components: {
    numberlist
  },
  created () {
    this.getItem()
  },
  methods: {
    getItem () {
      this.list = JSON.parse(localStorage.getItem('car') || '[]')
    },
    seclectedChange (id, val) {
      this.$store.commit('getSelectedChange', {
        id,
        seclected: val
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flex{
    display: flex;
    justify-content: space-around;
}
</style>
