import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/tabbar/home'
import member from '@/components/tabbar/member'
import shopcar from '@/components/tabbar/shopcar'
import search from '@/components/tabbar/search'
import newslist from '@/components/new/newslist'
import newsinfor from '@/components/new/newsinfor'
import photolist from '@/components/photo/photolist'
import photoinfor from '@/components/photo/photoinfor'
import textimg from '@/components/textimg/textimg'
import textlist from '@/components/textimg/textlist'
import goDEsc from '@/components/nunber/goDEsc'
import goComent from '@/components/nunber/goComent'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'mui-active',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/member',
      name: 'member',
      component: member,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/shopcar',
      name: 'shopcar',
      component: shopcar,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/home/newlist',
      name: 'newlist',
      component: newslist,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录
        keepAlive: true // 添加该字段，表示进入这个路由状态是缓存的
      }
    },
    {
      path: '/home/newlist/newsinfor',
      name: 'newsinfor',
      component: newsinfor,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/home/photolist',
      name: 'photolist',
      component: photolist,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/home/photolist/photoinfor',
      name: 'photoinfor',
      component: photoinfor,
      meta: {
        requireAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/home/textlist',
      name: 'textlist',
      component: textlist,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/home/textlist/textimg/:id',
      name: 'textimg',
      component: textimg
    },
    {
      path: '/home/textimg/goDEsc',
      name: 'goDEsc',
      component: goDEsc
    },
    {
      path: '/home/textimg/goComent/:id',
      name: 'goComent',
      component: goComent
    }
  ]
})
