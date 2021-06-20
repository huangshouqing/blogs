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
        name: 'blog_list',
        component: () => import('../views/blog/list.vue')
      },
      {
        path: '/blog/detail',
        name: 'blog_detail',
        component: () => import('../views/blog/detail.vue')
      },
    ]
  },
  // {
  //   path: '/top',
  //   name: 'top',
  //   redirect: '/top/list',
  //   component: () => import('../views/top/main.vue'),
  //   children: [
  //     {
  //       path: '/top/list',
  //       name: 'top_list',
  //       component: () => import('../views/top/top.vue')
  //     },
  //     {
  //       path: '/top/menu',
  //       name: 'top_menu',
  //       component: () => import('../views/book/menu.vue')
  //     },
  //   ]
  // },
  // {
  //   path: '/book',
  //   name: 'book',
  //   redirect: '/book/book_search',
  //   component: () => import('../views/book/main.vue'),
  //   children: [
  //     {
  //       path: '/book/book_search',
  //       name: 'book_search',
  //       component: () => import('../views/book/book_search.vue')
  //     },
  //     {
  //       path: '/book/menu',
  //       name: 'book_menu',
  //       component: () => import('../views/book/menu.vue')
  //     },
  //   ]
  // },
  // {
  //   path: '/movie',
  //   name: 'movie',
  //   redirect: '/movie/movie_search',
  //   component: () => import('../views/movie/main.vue'),
  //   children: [
  //     {
  //       path: '/movie/movie_search',
  //       name: 'movie_search',
  //       component: () => import('../views/movie/search.vue')
  //     },
  //     {
  //       path: '/movie/movie_detail',
  //       name: 'movie_detail',
  //       component: () => import('../views/movie/detail.vue')
  //     },
  //   ]
  // },
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
      // 音乐
      {
        path: '/laboratory/cloudMusic',
        name: 'laboratory',
        component: () => import('../views/laboratory/cloudMusic.vue')
      },
      // 影视
      {
        path: '/laboratory/movie',
        name: 'laboratory',
        component: () => import('../views/laboratory/movie.vue')
      },
      // 小说
      {
        path: '/laboratory/book',
        name: 'laboratory',
        component: () => import('../views/laboratory/book.vue')
      },
      {
        path: '/laboratory/top',
        name: 'laboratory',
        component: () => import('../views/laboratory/top.vue')
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
