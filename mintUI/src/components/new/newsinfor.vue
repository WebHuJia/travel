<template>
  <div>
    <div class="mui-card">
      <div class="mui-card-header mui-card-media" style="height:40vw;">
        <!-- <img src="../../assets/images/yuantiao.jpg" alt /> -->
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>Posted on January 18, 2016 --{{$route.query.id}}</p>
          <p style="color: #333;">这里显示文章摘要，让读者对文章内容有个粗略的概念...</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <a class="mui-card-link">Like</a>
        <a class="mui-card-link">Read more</a>
      </div>
    </div>
    <comment :id="id"></comment>
  </div>
</template>

<script>
// import comment from '@/components/comments/comment'
// 引入评论组件
import comment from '../comments/comment'
export default {
  data () {
    return {
      id: 1
    }
  },
  components: {
    comment
  },
  created () {
    console.log(this.$route.query.id)
  }
}
</script>

<style lang="scss" scoped>
.mui-card-media {
  background: url('../../assets/images/yuantiao.jpg') no-repeat center/cover;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
