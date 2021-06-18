import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/blog/home.vue'

Vue.use(VueRouter)

const routes = [
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
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue')
  },
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
    path: '/detail',
    name: 'detail',
    component: () => import('../views/blog/detail.vue')
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../views/blog/edit.vue')
  },
  {
    path: '/new',
    name: 'new',
    component: () => import('../views/blog/new.vue')
  },
  {
    path: '/bookSearch',
    name: 'bookSearch',
    component: () => import('../views/book/bookSearch.vue')
  },
  {
    path: '/book',
    name: 'book',
    component: () => import('../views/book/book.vue')
  },
  {
    path: '/bookMenu',
    name: 'bookMenu',
    component: () => import('../views/book/bookMenu.vue')
  },
  {
    path: '/bookContent',
    name: 'bookContent',
    component: () => import('../views/book/bookContent.vue')
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
    path: '/tv',
    name: 'tv',
    component: () => import('../views/tv/tv.vue')
  },
  // {
  //   path: '/music',
  //   name: 'music',
  //   component: () => import('../views/music.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
