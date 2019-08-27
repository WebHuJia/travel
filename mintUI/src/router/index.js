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
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/member',
      name: 'member',
      component: member
    },
    {
      path: '/shopcar',
      name: 'shopcar',
      component: shopcar
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/home/newlist',
      name: 'newlist',
      component: newslist
    },
    {
      path: '/home/newlist/newsinfor',
      name: 'newsinfor',
      component: newsinfor
    },
    {
      path: '/home/photolist',
      name: 'photolist',
      component: photolist
    },
    {
      path: '/home/photolist/photoinfor',
      name: 'photoinfor',
      component: photoinfor
    },
    {
      path: '/home/textlist',
      name: 'textlist',
      component: textlist
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
