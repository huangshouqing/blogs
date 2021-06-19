import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/manage',
    name: 'manage',
    redirect: '/manage/admin',
    component: () => import('../views/manage/main.vue'),
    children: [
      {
        path: '/manage/admin',
        component: () => import('../views/manage/admin.vue')
      },
      {
        path: '/manage/edit',
        component: () => import('../views/manage/edit.vue')
      },
      {
        path: '/manage/new',
        component: () => import('../views/manage/new.vue')
      },
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue')
  },
  {
    path: '/',
    redirect: '/blog'
  },
  {
    path: '/blog',
    name: 'blog',
    redirect: '/blog/list',
    component: () => import('../views/blog/main.vue'),
    children: [
      {
        path: '/blog/list',
        component: () => import('../views/blog/list.vue')
      },
      {
        path: '/blog/detail',
        component: () => import('../views/blog/detail.vue')
      },
    ]
  },
  {
    path: '/top',
    name: 'top',
    redirect: '/top/top',
    component: () => import('../views/book/main.vue'),
    children: [
      {
        path: '/top/top',
        component: () => import('../views/book/top.vue')
      },
      {
        path: '/top/menu',
        component: () => import('../views/book/menu.vue')
      },
    ]
  },
  {
    path: '/book',
    name: 'book',
    redirect: '/book/bookSearch',
    component: () => import('../views/book/main.vue'),
    children: [
      {
        path: '/book/bookSearch',
        name: 'book',
        component: () => import('../views/book/bookSearch.vue')
      },
      {
        path: '/book/menu',
        name: 'book',
        component: () => import('../views/book/menu.vue')
      },
    ]
  },
  {
    path: '/movie',
    name: 'movie',
    redirect: '/movie/movieSearch',
    component: () => import('../views/movie/main.vue'),
    children: [
      {
        path: '/movie/movieSearch',
        name: 'movie',
        component: () => import('../views/movie/search.vue')
      },
      {
        path: '/movie/movieDetail',
        name: 'movie',
        component: () => import('../views/movie/detail.vue')
      },
    ]
  },
  {
    path: '/laboratory',
    name: 'laboratory',
    redirect: '/laboratory/chose',
    component: () => import('../views/laboratory/main.vue'),
    children: [
      // 
      {
        path: '/laboratory/chose',
        name: 'laboratory',
        component: () => import('../views/laboratory/chose.vue')
      },
      // tv
      {
        path: '/laboratory/tv',
        name: 'laboratory',
        component: () => import('../views/laboratory/tv.vue')
      },
      {
        path: '/laboratory/cloudMusic',
        name: 'laboratory',
        component: () => import('../views/laboratory/cloudMusic.vue')
      },
    ]
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
