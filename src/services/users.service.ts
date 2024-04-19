import type { IUser } from '@/interfaces/userInterface'
import getInstance from './apiInstance'

const instance = getInstance()

class UsersService {
  async getUsers(): Promise<IUser[]> {
    return await instance
      .get('websiteusers')
      .then((res) => res.data)
      .catch((err) => console.log(err))
  }

  async getUserById(id: string): Promise<IUser> {
    return await instance
      .get('websiteusers/' + id)
      .then((res) => res.data)
      .catch((err) => console.log(err))
  }

  async addUser(email: string, password: string): Promise<IUser> {
    return await instance
      .post('websiteusers', {
        email,
        password
      })
      .then((res) => res.data)
      .catch((err) => console.log(err))
  }
}

export default new UsersService()
