import type { IUser } from '@/interfaces/userInterface'
import { defineStore } from 'pinia'
import UsersService from '@/services/users.service'

// Подгружаем пользователя из локального хранилища
const localStorageUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user') as string)
  : null
const usersService = new UsersService()

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as IUser[],
    user: localStorageUser
      ? { status: { loggedIn: true }, data: localStorageUser }
      : { status: { loggedIn: false }, data: null }
  }),
  actions: {
    async getUsers() {
      this.users = await usersService.getUsers()
    },

    // Метод входа в аккаунт
    loginUser(user: IUser) {
      localStorage.setItem('user', JSON.stringify(user)) // Обновляем пользователя в локальном хранилище
      this.user.status.loggedIn = true
      this.user.data = user
    },

    // Метод регистрации пользоватлея
    async registerUser(email: string, password: string) {
      const response = await usersService.addUser(email, password) // Добавляем пользователя
      const user = await usersService.getUserById(response.id) // Получаем только что созданного пользователя
      this.loginUser(user) // Входим в аккаунт
    },

    logoutUser() {
      localStorage.removeItem('user')
      this.user.status.loggedIn = false
      this.user.data = null
    }
  }
})
