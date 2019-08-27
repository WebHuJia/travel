<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item of newlist" :key="item.id">
        <router-link :to="'/home/textlist/textimg/:' + item.id">
          <img class="mui-media-object mui-pull-left" src="../../assets/images/shuijiao.jpg" />
          <div class="mui-media-body">
            {{item.title}}---{{item.data | dataFilter}}
            <p class="mui-ellipsis">{{item.desc}}}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newlist: [
        {
          id: 1,
          title: '幸福',
          desc: '能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？',
          data: Date() + 1
        },
        {
          id: 2,
          title: '木屋',
          desc: '想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.',
          data: Date() + 2
        },
        {
          id: 3,
          title: 'CBD',
          desc: '烤炉模式的城，到黄昏，如同打翻的调色盘一般.',
          data: Date() + 3
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
