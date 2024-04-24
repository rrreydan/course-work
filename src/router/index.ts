import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import PersonalCabinetPage from '@/views/PersonalCabinetPage.vue'
import { useUsersStore } from '@/store/users'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/personal-cabinet/:userId',
      name: 'personal-cabinet',
      component: PersonalCabinetPage,
      beforeEnter: (to, _, next) => {
        const usersStore = useUsersStore()
        if (
          usersStore.user.status.loggedIn
          && usersStore.user.data._id === to.params.userId) {
          next()
        } else {
          next('/')
        }
      }
    }
  ]
})

export default router
