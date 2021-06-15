import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/bookSearch',
    name: 'bookSearch',
    component: () => import('../views/bookSearch.vue')
  },
  {
    path: '/book',
    name: 'book',
    component: () => import('../views/book.vue')
  },
  {
    path: '/bookMenu',
    name: 'bookMenu',
    component: () => import('../views/bookMenu.vue')
  },
  {
    path: '/bookContent',
    name: 'bookContent',
    component: () => import('../views/bookContent.vue')
  },
  {
    path: '/movieSearch',
    name: 'movieSearch',
    component: () => import('../views/movie/search.vue')
  },
  {
    path: '/movieDetail',
    name: 'movieDetail',
    component: () => import('../views/movie/detail.vue')
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/detail.vue')
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../views/edit.vue')
  },
  {
    path: '/new',
    name: 'new',
    component: () => import('../views/new.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
