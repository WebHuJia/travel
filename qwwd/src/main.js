import Vue from 'vue'
import App from './App'
import animated from 'animate.css';
Vue.use(animated);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  beforeMount() {
    (function(win, doc) {
      if (!win.addEventListener) return;
      var html = document.documentElement;
      function setFont(cb) {
        var w = html.clientWidth,
          h = html.clientHeight;
        // html.style.fontSize= w > h ? w/1462*100+"px" : w/750*100+"px";
        html.style.fontSize =
          w / h > 1200 / 760 ? (h / 750) * 100 + "px" : (h / 950) * 100 + "px";
        if (cb && typeof cb == "function") {
          cb();
        }
      }
      setFont();
      doc.addEventListener("DOMContentLoaded", setFont, false);
      win.addEventListener("resize", setFont, false);
      win.addEventListener("load", setFont, false);
    })(window, document);
  },
})
