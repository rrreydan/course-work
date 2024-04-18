import type { IUser } from '@/interfaces/userInterface'
import axios from 'axios'
import { defineStore } from 'pinia'

const API_URL = import.meta.env.VITE_RESTDATABASE_URL
const API_KEY = import.meta.env.VITE_RESTDATABASE_API_KEY

const localStorageUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user') as string)
  : null

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    user: localStorageUser
      ? { status: { loggedIn: true }, data: localStorageUser }
      : { status: { loggedIn: false }, data: null }
  }),
  actions: {
    async getUsers() {
      const response = await axios
        .get(API_URL + 'websiteusers', {
          headers: {
            'x-apikey': API_KEY
          }
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))

      this.users = response
    },

    async getUserById(id: string) {
      const response = await axios
        .get(API_URL + 'websiteusers/' + id, {
          headers: {
            'x-apikey': API_KEY
          }
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))

      return response
    },

    async registerUser(email: string, password: string) {
      const response = await axios
        .post(
          API_URL + 'websiteusers',
          {
            email,
            password
          },
          {
            headers: {
              'x-apikey': API_KEY
            }
          }
        )
        .then((res) => res.data)
        .catch((err) => console.log(err))

      const user = await this.getUserById(response._id)
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
