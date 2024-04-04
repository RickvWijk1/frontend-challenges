import { createRouter, createWebHistory } from 'vue-router'
import TodoPage from '../pages/todo/TodoPage.vue'

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
    }
  ]
})

export default router
