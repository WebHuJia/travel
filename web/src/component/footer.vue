<template>
  <div id="footer">
    <ul class="footerbox wrap">
      <li class="service">
        <dl>
          <dt>
            <img src="/static/staticfile/images/footerlogo.png" alt="coindy" />
          </dt>
          <dd>
            <span v-html="$t('footer.media.title')"></span>
          </dd>
          <dd>
            <ul>
              <li class="fb">
                <a target="_blank" href="https://www.facebook.com/CoindyOfficial">
                  <i class="fa fa-facebook" aria-hidden="true"></i>
                </a>
              </li>
              <li class="tw">
                <a target="_blank" href="https://twitter.com/CoindyOfficial">
                  <i class="fa fa-twitter" aria-hidden="true"></i>
                </a>
              </li>
              <li class="te">
                <a
                  target="_blank"
                  href="https://t.me/coindycn"
                  v-if="this.$store.state.LANG == 'zh-cn'"
                >
                  <i class="fa tele fa-telegram" aria-hidden="true"></i>
                </a>
                <a target="_blank" href="https://t.me/coindyofficial" v-else>
                  <i class="fa tele fa-telegram" aria-hidden="true"></i>
                </a>
              </li>
              <li class="plus" v-if="this.$store.state.LANG == 'zh-cn'">
                <a target="_blank" href="https://0.plus/sp/coindycn">
                  <i class="fa fa-btc" aria-hidden="true"></i>
                </a>
              </li>
              <li class="in">
                <a target="_blank" href="https://www.instagram.com/coindyofficial/">
                  <i class="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
              <li class="bt">
                <a target="_blank" href="https://medium.com/@CoindyOfficial">
                  <i class="fa fa-medium" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </dd>
        </dl>
      </li>
      <li v-for="(foot, index) in footerlist" :key="index">
        <dl>
          <dt v-html="$t(foot.title)"></dt>
          <dd v-for="(footdd, footddindexs) in foot.url" :key="footddindexs">
            <router-link
              v-if="footdd.url !== 'javascript:void(0)'"
              @mouseleave="hideImg($event)"
              :to="{name: footdd.url}"
              v-html="$t(footdd.name)"
            ></router-link>
            <a
              v-else
              @mouseenter="showImg($event)"
              @mouseleave="hideImg($event)"
              :href="footdd.url"
              v-html="$t(footdd.name)"
            ></a>
          </dd>
        </dl>
      </li>
    </ul>
    <p class="rights">© 2017 - {{time}} All rights reserved</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: new Date().getFullYear(),
      footerlist: [
        {
          title: "footer.support.title",
          url: [
            {
              name: "footer.support.list.announcement.name",
              url: "Announcement"
            },
            {
              name: "footer.support.list.policy.name",
              url: "Privacy"
            },
            {
              name: "footer.support.list.about.name",
              url: "About"
            }
          ]
        },
        {
          title: "footer.product.title",
          url: [
            {
              name: "footer.product.list.submit.name",
              url: "StoApply"
            },
            {
              name: "footer.product.list.drop.name",
              url: "CandyApply"
            },
            {
              name: "footer.product.list.down.name",
              url: "Download"
            }
          ]
        },
        {
          title: "footer.service.title",
          url: [
            {
              name: "footer.service.list.wechat.name",
              url: "javascript:void(0)"
            },
            {
              name: "footer.service.list.email.name",
              url: "javascript:void(0)"
            }
          ]
        }
      ]
    };
  },
  methods: {
    showImg(even) {
      if (even.currentTarget.firstChild.name == "img") {
        even.currentTarget.firstChild.style.opacity = "1";
      } else {
        return false;
      }
    },
    hideImg(even) {
      if (even.currentTarget.firstChild.name == "img") {
        even.currentTarget.firstChild.style.opacity = "0";
      } else {
        return false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
#footer {
  height: 320px;
  width: 100%;
  background: #0a151e;
  position: absolute;
  bottom: 0;
  left: 0;
  .footerbox {
    display: flex;
    height: 172px;
    padding-top: 78px;
    justify-content: space-around;
    li {
      dl {
        dt {
          margin-bottom: 14px;
          color: #fff;
          font-size: 15px;
        }
        dd {
          margin-bottom: 10px;
          a {
            color: #9ca9b5;
            font-size: 14px;
            position: relative;
            &:hover /deep/ img {
              display: block !important;
            }
            &:hover /deep/ i.fa {
              background: #357ce1 !important;
              &.fa-telegram {
                background: inherit !important;
                color: #357ce1 !important;
              }
            }
            &:hover {
              color: #357ce1;
            }
          }
        }
      }
      i.fa {
        color: #0a151e;
        border-radius: 50%;
        font-size: 12px;
        width: 18px;
        height: 18px;
        text-align: center;
        line-height: 18px;
        background: #243445;
        &:hover {
          background: #357ce1;
        }
      }
      i.fa.tele {
        color: #243445;
        border-radius: 50%;
        font-size: 12px;
        width: 18px;
        height: 18px;
        text-align: center;
        line-height: 18px;
        background: transparent;
        font-size: 18px;
        &:hover {
          color: #357ce1;
        }
      }
    }
    li.service {
      dl {
        dd {
          span {
            color: #9ca9b5;
            font-size: 14px;
          }
          ul {
            display: flex;
            margin-top: 18px;
            li {
              display: inline-block;
              margin: 0 18px 0 0;
            }
          }
        }
      }
    }
  }
  .rights {
    color: #9ca9b5;
    font-size: 12px;
    text-align: center;
    height: 70px;
    line-height: 70px;
    border-top: 1px solid #192530;
    box-sizing: border-box;
  }
}
</style>
