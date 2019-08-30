<template>
  <div id="intr" class="wrap">
    <h2 v-html="$t('intr.name')"></h2>
    <ul>
      <li v-for="(exp, index) in exponentList" :key="index">
        <i class="spr" :class="exp.className">
          <strong v-if="!exp.start" v-html="$t('intr.st')"></strong>
        </i>
        <p v-html="$t(exp.title)"></p>
        <span v-html="$t(exp.content)"></span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      exponentList: [
        {
          title: "intr.title.earnings",
          className: "earnings",
          content: "intr.content.earnings",
          start: true
        },
        {
          title: "intr.title.get",
          className: "get",
          content: "intr.content.get",
          start: true
        },
        {
          title: "intr.title.examine",
          className: "examine",
          content: "intr.content.examine",
          start: false
        },
        {
          title: "intr.title.deal",
          className: "deal",
          content: "intr.content.deal",
          start: false
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
#intr {
  height: 680px;
  text-align: center;
  margin: 0 auto;
  overflow: hidden;
  h2 {
    color: #222c38;
    font-size: 32px;
    flex-shrink: 0;
    margin: 110px auto 0;
    line-height: 1.2;
  }
  ul {
    margin-top: 130px;
    display: flex;
    text-align: center;
    li {
      display: inline-block;
      width: 260px;
      margin: 0 24px;
      position: relative;
      i {
        width: 127px;
        height: 151px;
        display: block;
        margin: 0 auto;
        position: relative;
        &.examine {
          background-position: 0 0;
        }
        &.deal {
          background-position: -141px -159px;
        }
        &.earnings {
          background-position: 0 -148px;
        }
        &.get {
          background-position: -141px -7px;
        }
        strong {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 30px;
          margin: auto;
          right: 0;
          width: 60px;
          height: 28px;
          padding: 19px 3px;
          color: #fff;
          background: rgba(34, 44, 56, 0.5);
          border-radius: 50%;
          font-size: 14px;
        }
      }
      p {
        color: #222c38;
        font-size: 20px;
        line-height: 100%;
        margin: 6px 0 20px 0;
      }
      span {
        color: #5a626d;
        font-size: 14px;
        line-height: 1.7;
      }
    }
  }
}
</style>
