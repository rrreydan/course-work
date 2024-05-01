import type { IUser } from '@/interfaces/userInterface'
import { defineStore } from 'pinia'
import UsersService from '@/services/users.service'

const localStorageUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user') as string)
  : null

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as IUser[],
    user: localStorageUser
      ? { status: { loggedIn: true }, data: localStorageUser }
      : { status: { loggedIn: false }, data: null }
  }),
  actions: {
    async getUsers() {
      const response = await UsersService.getUsers()
      this.users = response
    },

    async getUserById(id: string) {
      const response = await UsersService.getUserById(id)
      return response
    },

    async registerUser(email: string, password: string) {
      const response = await UsersService.addUser(email, password)
      const user = await this.getUserById(response.id)
      this.loginUser(user)
    },

    loginUser(user: IUser) {
      localStorage.setItem('user', JSON.stringify(user))
      this.user.status.loggedIn = true
      this.user.data = user
    },

    logoutUser() {
      localStorage.removeItem('user')
      this.user.status.loggedIn = false
      this.user.data = null
    }
  }
})
