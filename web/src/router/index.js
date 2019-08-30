import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '',
      name: '',
      component: resolve => require(['@/pc.vue'], resolve),
      children: [
        {
          path: '',
          name: 'Portal',
          component: resolve => require(['@/containers/portal/home'], resolve)
        }, {
          path: '/user',
          name: 'User',
          meta: {
            'requireAuth': true
          },
          redirect: { name: 'Investment' },
          component: resolve => require(['@/containers/user/index.vue'], resolve),
          children: [
            {
              path: 'investment',
              name: 'Investment',
              meta: {
                'requireAuth': true
              },
              component: resolve => require(['@/containers/user/investment'], resolve)
            },
            {
              path: 'collect',
              name: 'Collect',
              meta: {
                'requireAuth': true
              },
              component: resolve => require(['@/containers/user/collect'], resolve)
            },
            {
              path: 'accountsecurity',
              name: 'AccountSecurity',
              meta: {
                'requireAuth': true
              },
              component: resolve => require(['@/containers/user/AccountSecurity/index'], resolve),
              children: [
                {
                  path: '',
                  name: 'AccountSecurity',
                  meta: {
                    'requireAuth': true
                  },
                  component: resolve => require(['@/containers/user/AccountSecurity/AccountSecurity'], resolve)
                },
                {
                  path: 'bind',
                  name: 'Bind',
                  meta: {
                    'requireAuth': true
                  },
                  beforeEnter: (to, from, next) => {
                    if (from.name !== 'AccountSecurity') {
                      next({ name: 'AccountSecurity' })
                    } else {
                      next()
                    }
                  },
                  component: resolve => require(['@/containers/user/AccountSecurity/bind'], resolve)
                },
                {
                  path: 'changepassword',
                  name: 'ChangePassword',
                  meta: {
                    'requireAuth': true
                  },
                  beforeEnter: (to, from, next) => {
                    if (from.name !== 'SecurityVer') {
                      next({ name: 'AccountSecurity' })
                    } else {
                      next()
                    }
                  },
                  component: resolve => require(['@/containers/user/AccountSecurity/changepassword'], resolve)
                },
                {
                  path: 'unbind',
                  name: 'Unbind',
                  meta: {
                    'requireAuth': true
                  },
                  beforeEnter: (to, from, next) => {
                    if (from.name !== 'AccountSecurity') {
                      next({ name: 'AccountSecurity' })
                    } else {
                      next()
                    }
                  },
                  component: resolve => require(['@/containers/user/AccountSecurity/unbind'], resolve)
                },
                {
                  path: 'bindgoogle',
                  name: 'BindGoogle',
                  meta: {
                    'requireAuth': true
                  },
                  beforeEnter: (to, from, next) => {
                    if (from.name !== 'AccountSecurity') {
                      next({ name: 'AccountSecurity' })
                    } else {
                      next()
                    }
                  },
                  component: resolve => require(['@/containers/user/AccountSecurity/bindGoogle'], resolve)
                },
                {
                  path: 'unbindgoogle',
                  name: 'UnbindGoogle',
                  meta: {
                    'requireAuth': true
                  },
                  beforeEnter: (to, from, next) => {
                    if (from.name !== 'AccountSecurity') {
                      next({ name: 'AccountSecurity' })
                    } else {
                      next()
                    }
                  },
                  component: resolve => require(['@/containers/user/AccountSecurity/unbindGoogle'], resolve)
                },
                {
                  path: 'securityver',
                  name: 'SecurityVer',
                  meta: {
                    'requireAuth': true
                  },
                  beforeEnter: (to, from, next) => {
                    if (from.name !== 'AccountSecurity') {
                      next({name: 'AccountSecurity'})
                    } else {
                      next()
                    }
                  },
                  component: resolve => require(['@/containers/user/AccountSecurity/SecurityVer'], resolve)
                }
              ]
            },
            {
              path: 'kyc',
              name: 'Kyc',
              meta: {
                'requireAuth': true
              },
              component: resolve => require(['@/containers/user/kyc'], resolve)
            },
            {
              path: 'kyc/investor',
              name: 'KycInvestor',
              meta: {
                'requireAuth': true
              },
              beforeEnter: (to, from, next) => {
                if (from.name !== 'Kyc') {
                  next({ name: 'Kyc' })
                } else {
                  next()
                }
              },
              component: resolve => require(['@/containers/user/kyc/investor'], resolve)
            },
            {
              path: 'mentiontoken',
              name: 'MentionToken',
              meta: {
                'requireAuth': true
              },
              component: resolve => require(['@/containers/user/MentionToken'], resolve)
            },
            {
              path: 'invitation',
              name: 'Invitation',
              meta: {
                'requireAuth': true
              },
              component: resolve => require(['@/containers/user/invitation/index'], resolve),
              children: [
                {
                  path: '',
                  name: 'Invitation',
                  meta: {
                    'requireAuth': true
                  },
                  component: resolve => require(['@/containers/user/invitation/invitation.vue'], resolve)
                },
                {
                  path: 'more',
                  name: 'InvitationMore',
                  meta: {
                    'requireAuth': true
                  },
                  beforeEnter: (to, from, next) => {
                    if (from.name !== 'Invitation') {
                      next({ name: 'Invitation' })
                    } else {
                      next()
                    }
                  },
                  component: resolve => require(['@/containers/user/invitation/more'], resolve)
                }
              ]
            }
          ]
        }, {
          path: '/login',
          name: 'Login',
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem('token')) {
              next({name: 'Portal'})
            } else {
              next()
            }
          },
          component: resolve => require(['@/containers/login'], resolve)
        }, {
          path: '/register',
          name: 'Register',
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem('token')) {
              next({name: 'Portal'})
            } else {
              next()
            }
          },
          component: resolve => require(['@/containers/register'], resolve)
        }, {
          path: '/find',
          name: 'Find',
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem('token')) {
              next({name: 'Portal'})
            } else {
              next()
            }
          },
          component: resolve => require(['@/containers/find'], resolve)
        }, {
          path: '/sto',
          name: 'Sto',
          component: resolve => require(['@/containers/portal/sto'], resolve)
        }, {
          path: '/sto/apply',
          name: 'StoApply',
          component: resolve => require(['@/containers/portal/sto/stoapply'], resolve)
        }, {
          path: '/sto/introduce',
          name: 'StoIntroduce',
          component: resolve => require(['@/containers/portal/sto/stointroduce'], resolve)
        }, {
          path: '/candy',
          name: 'Candy',
          component: resolve => require(['@/containers/portal/candy'], resolve)
        }, {
          path: '/about',
          name: 'About',
          component: resolve => require(['@/containers/portal/about'], resolve)
        }, {
          path: '/candy/apply',
          name: 'CandyApply',
          component: resolve => require(['@/containers/portal/candy/candyapply'], resolve)
        }, {
          path: '/project',
          name: 'Project',
          component: resolve => require(['@/containers/portal/project'], resolve)
        }, {
          path: '/project/news/details',
          name: 'ProjectDetails',
          component: resolve => require(['@/containers/portal/announcement/newdetails'], resolve)
        }, {
          path: '/download',
          name: 'Download',
          component: resolve => require(['@/containers/portal/download'], resolve)
        }, {
          path: '/announcement/details',
          name: 'Details',
          component: resolve => require(['@/containers/portal/announcement/details'], resolve)
        }, {
          path: '/announcement',
          name: 'Announcement',
          component: resolve => require(['@/containers/portal/announcement'], resolve)
        }, {
          path: '/iosdownload',
          name: 'IosDownload',
          component: resolve => require(['@/containers/portal/download/ios'], resolve)
        }, {
          path: '/privacy',
          name: 'Privacy',
          component: resolve => require(['@/containers/portal/privacy'], resolve)
        }, {
          path: '/assets',
          name: 'Assets',
          meta: {
            'requireAuth': true
          },
          component: resolve => require(['@/containers/user/assets/index.vue'], resolve),
          children: [
            {
              path: '',
              name: 'Assets',
              component: resolve => require(['@/containers/user/assets/assets'], resolve)
            },
            {
              path: 'assetslog',
              name: 'AssetsLog',
              component: resolve => require(['@/containers/user/assets/assetslog'], resolve)
            }
          ]
        }
      ]
    },
    {
      path: '/mobile',
      name: 'Mobile',
      component: resolve => require(['@/mobile.vue'], resolve),
      children: [
        {
          path: 'download',
          name: 'MobileDown',
          component: resolve => require(['@/mobile/down.vue'], resolve)
        }, {
          path: 'iosdown',
          name: 'MobileIosDown',
          component: resolve => require(['@/mobile/iosdown.vue'], resolve)
        }, {
          path: 'register',
          name: 'MobileRegister',
          component: resolve => require(['@/mobile/register.vue'], resolve)
        }, {
          path: 'fulldown',
          name: 'FullDown',
          component: resolve => require(['@/mobile/downpage'], resolve)
        }, {
          path: 'lottery',
          name: 'Lottery',
          component: resolve => require(['@/mobile/lottery.vue'], resolve)
        },
        {
          path: 'google',
          name: 'Google',
          component: resolve => require(['@/mobile/downpage/google.vue'], resolve)
        }, {
          path: 'announcement/details',
          name: 'Details',
          component: resolve => require(['@/mobile/h5details.vue'], resolve)
        }, {
          path: 'project/news/details',
          name: 'NewsDetails',
          component: resolve => require(['@/mobile/h5news.vue'], resolve)
        }
      ]
    }
  ]
})
