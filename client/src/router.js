import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        layout: 'Visitor'
      }
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import(/* webpackChunkName: "tasks" */ './views/Tasks.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
      meta: {
        layout: 'Visitor'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
      meta: {
        layout: 'Visitor'
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  // Check if user is auth
  if (!store.state.userChecked) {
    await store.dispatch('auth/getCurrentUser')
  }

  // If the page is visitor only and the user is logged: redirect
  if (to.meta.layout === 'Visitor' && store.getters['auth/logged']) {
    return next({ name: 'tasks' })
  }

  // If the page is logged only and the user is not logged: redirect
  if (to.meta.requiresAuth && !store.getters['auth/logged']) {
    return next({ name: 'login' })
  }

  next()
})

export default router
