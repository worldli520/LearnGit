import { RouteRecordRaw } from 'vue-router'
import Home from "../views/Home.vue"

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/2048',
    name: '2048',
    component: () => import('../views/2048/index.vue'),
  },
  {
    path: '/2048_bak',
    name: '2048_bak',
    component: () => import('../views/2048/bak.vue'),
  }
]

export default routes