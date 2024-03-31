import { createRouter, createWebHistory } from 'vue-router'
import TodoPage from '../pages/TodoPage.vue'
import AboutView from '../views/AboutView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodoPage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router
