import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export interface RouteMeta {
  name: string;
}

export enum RouteName {
  HOME = 'home',

  BTN_NAUGHTY = 'btn-naughty',

  CURSOR_SANDEVISTAN = 'cursor-sandevistan',
  CURSOR_THUNDER_BREATHING = 'cursor-thunder-breathing',

  WRAPPER_STEREOSCOPIC = 'wrapper-stereoscopic',
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {
      name: RouteName.HOME,
    }
  },

  {
    path: `/home`,
    name: RouteName.HOME,
    component: () => import('../views/the-home.vue')
  },

  {
    path: `/btn-naughty`,
    name: RouteName.BTN_NAUGHTY,
    component: () => import('../views/the-btn-naughty.vue')
  },

  {
    path: `/cursor-sandevistan`,
    name: RouteName.CURSOR_SANDEVISTAN,
    component: () => import('../views/the-cursor-sandevistan.vue')
  },

  {
    path: `/wrapper-stereoscopic`,
    name: RouteName.WRAPPER_STEREOSCOPIC,
    component: () => import('../views/the-wrapper-stereoscopic.vue')
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
