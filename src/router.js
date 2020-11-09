import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/',
          redirect: '/home'
      },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('./views/Login.vue'),
    //     meta:{
    //         title: '登录'
    //     }
    //
    // },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue'),
        meta:{
            title: '人力专区'
        }
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('./views/edit.vue'),
        meta:{
            title: '人力专区'
        }
    },
    // {
    //   path: '/CheckList',
    //   name: 'CheckList',
    //   component: () => import('./views/CheckList.vue'),
    //     meta:{
    //         title: 'HiPass'
    //     }
    // },
    // {
    //   path: '/ApplyList',
    //   name: 'ApplyList',
    //   component: () => import('./views/ApplyList.vue'),
    //     meta:{
    //         title: 'HiPass'
    //     }
    // },
    // {
    //   path: '/GoDetails',
    //   name: 'GoDetails',
    //   component: () => import('./views/GoDetails.vue'),
    //   meta:{
    //     title: 'HiPass'
    //   }
    // },
    // {
    //   path: '/iHaierDetails',
    //   name: 'iHaierDetails',
    //   component: () => import('./views/iHaierDetails.vue'),
    //   meta:{
    //     title: 'HiPass'
    //   }
    // },
    // {
    //   path: '/applyPassport',
    //   name: 'applyPassport',
    //   component: () => import('./views/applyPassport.vue'),
    //   meta:{
    //     title: 'HiPass'
    //   }
    // },
    // {
    //   path: '/examine',
    //   name: 'examine',
    //   component: () => import('./views/examine.vue'),
    //   meta:{
    //     title: 'HiPass'
    //   }
    // },
    // {
    //   path: '/passCode',
    //   name: 'passCode',
    //   component: () => import('./views/passCode.vue'),
    //   meta:{
    //     title: 'HiPass'
    //   }
    // },
    // {
    //   path: '/followingDetails',
    //   name: 'followingDetails',
    //   component: () => import('./views/followingDetails.vue'),
    //   meta:{
    //     title: 'HiPass',
    //     keepAlive: true,
    //   }
    // },
    // {
    //   path: '/iHaierDetails',
    //   name: 'iHaierDetails',
    //   component: () => import('./views/iHaierDetails.vue'),
    //   meta:{
    //     title: 'HiPass'
    //   }
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
