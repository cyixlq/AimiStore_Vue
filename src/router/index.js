import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Index from '@/page/Index'
import Home from '@/page/Home'
import Menu from '@/page/Menu'
import Cart from '@/page/Cart'
import Me from '@/page/Me'
import Address from '@/page/Address'
import EditAddress from '@/page/EditAddress'
import GoodsDetail from '@/page/GoodsDetail'

import Login from '@/page/Login'
import Signup from '@/page/Signup'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/address/:title',
      name: 'Address',
      component: Address,
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/editaddress',
      name: 'EditAddress',
      component: EditAddress,
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/gooodsdetail/:goodsId',
      name: 'GoodsDetail',
      component: GoodsDetail,
      props: true
    },
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home
        },
        {
          path: '/menu',
          name: 'Menu',
          component: Menu
        },
        {
          path: '/cart',
          name: 'Cart',
          component: Cart,
          meta: { requiresAuth: true }
        },
        {
          path: '/me',
          name: 'Me',
          component: Me
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    let aaa = store.getters['user/userToken']
    if (!aaa) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
