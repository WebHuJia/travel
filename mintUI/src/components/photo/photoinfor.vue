<template>
  <div>
    <div class="preview">
      <img
        class="preview-img"
        v-for="(item, index) in list"
        :src="item.src"
        height="100"
        @click="$preview.open(index, list)"
        :key="item.src"
      />
    </div>
    <comment></comment>
  </div>
</template>
<script>
// 引入评论组件
import comment from '../comments/comment'

export default {
  data () {
    return {
      list: [
        {
          src: 'https://placekitten.com/600/400'
        },
        {
          src: 'https://placekitten.com/600/500'
        }
      ]
    }
  },
  components: {
    comment
  },
  created () {
    // this.getlist()
  },
  methods: {
    getlist () {
      this.list.forEach(item => {
        item.w = 600
        item.h = 400
      })
      console.log(this.list)
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  margin: 15px;
}
</style>
