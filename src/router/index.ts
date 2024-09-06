import { createRouter, createWebHistory } from 'vue-router'
import TodoPage from '../pages/todo/TodoPage.vue'
import LandingPage from '@/pages/responsive-landing-page/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodoPage
    },
    {
      path: '/todo-app',
      name: 'todo-app',
      component: TodoPage
    },
    {
      path: '/responsive-landing-page',
      name: 'responsive-landing-page',
      component: LandingPage
    },
    {
      path: '/notification-page',
      name: 'notification-page',
      component: LandingPage
    },
  ]
})

export default router
