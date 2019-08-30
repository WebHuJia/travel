<template>
    <div id="announcement">
      <ul class='flexCenter'>
        <li v-for="(d, index) in announcementlists" :key="index" v-if="index <= 2" @click="$router.push({name: 'Details', query:{id: d.id}})">
          <router-link :to="{name: 'Details', query:{id: d.id}}">{{d.title}}</router-link>
        </li>
      </ul>
    </div>
</template>
<script>
export default {
  data () {
    return {
      announcementlists: null
    }
  },
  mounted () {
    this.annoget()
  },
  computed: {
    lang () {
      return this.$store.state.LANG
    }
  },
  watch: {
    lang () {
      this.annoget()
    }
  },
  methods: {
    annoget () {
      this.axios.axiosget({
        url: '/portal/announcement/home'
      }).then((ret) => {
        this.announcementlists = ret.data.data
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="less" scoped>
  #announcement{height:40px;line-height:40px;
    ul{display: flex;height:100%;width:1200px;margin:0 auto;text-align:center;height:40px;line-height:40px;justify-content: center;
        li{max-width:400px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align:center;display:inline-block;cursor: pointer;height:100%;display:flex;justify-content: center;align-items:center;margin:0 10px;
          &:hover{
            a{color:#357ce1;}
          }
          a{color:#9eb5ca;font-size: 12px;display:block;border-right:1px solid rgba(158,181,202,.3);height:12px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align:center;padding-right:20px;
          }
          &:last-child{
            a{border:none;}
          }
        }
      }
    }
</style>
