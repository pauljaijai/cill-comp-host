
import HomeVue from '@/views/Home.vue';
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

export interface RouteMeta {
  name: string;
}


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeVue,
  },

  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/',
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
