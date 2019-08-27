<template>
    <div class="cm-contain">
        <h3>评论子组件</h3>
        <hr>
        <textarea maxlength="120" placeholder="请输入要吐槽的内容(最多吐槽120个字)" v-model="content"></textarea>
        <mt-button type="primary" size="large" @click="postComments">发表评论</mt-button>
        <div class="cm-list">
          <div class="cm-item" v-for="(item,index) of comlist" :key="item.id">
            <div class="cm-title">
              第{{ index+1 }}楼&nbsp;&nbsp;用户:{{ item.ueser_name }}&nbsp;&nbsp;发表时间:{{ item.user_data | dataFilter }}
            </div>
            <div class="cm-body">
              {{item.user_comm }}
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      comlist: [
        // {
        //   ueser_name: '匿名用户',
        //   user_data: Date(),
        //   user_comm: '锄禾日当午'
        // }
      ],
      content: ''
    }
  },
  props: ['id'],
  created () {
    this.loadComments()
  },
  methods: {
    postComments () {
      // 校验评论是否为空
      if (this.content.trim().length === 0) {
        this.content = ''
        return Toast('评论不能为空 !!!')
      }

      var comment = {ueser_name: '匿名用户', user_data: Date(), user_comm: this.content.trim()}
      this.comlist = JSON.parse(localStorage.getItem('cmts') || '[]')
      this.comlist.unshift(comment)
      localStorage.setItem('cmts', JSON.stringify(this.comlist))// 数组对象和字符串相互转换的过程
      this.content = ''
    },
    loadComments () {
      this.comlist = JSON.parse(localStorage.getItem('cmts') || '[]')
    }
  }

}
</script>

<style lang="scss" scoped>
.cm-contain{
  .cm-title{
    font-size: 14px;
    background: #ccc;
    line-height: 35px;
    margin-top: 15px;
  }
  .cm-body{
    text-indent: 2em;
    line-height: 35px;
  }
}
</style>
