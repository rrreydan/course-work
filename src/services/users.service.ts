import type { IUser } from '@/interfaces/userInterface'
import getInstance from './apiInstance'
import type { IBusService } from '@/interfaces/busServiceInterface'
import { useUsersStore } from '@/store/users'

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
        password,
        favorite_bus_services: []
      })
      .then((res) => res.data)
      .catch((err) => console.log(err))
  }

  async addFavoriteBusService(busService: IBusService): Promise<IUser> {
    const usersStore = useUsersStore()
    const userId = usersStore.user.data._id

    return instance
      .patch('websiteusers/' + userId, {
        favorite_bus_services: [
          ...usersStore.user.data.favorite_bus_services,
          busService
        ]
      })
      .then((res) => res.data)
      .catch((err) => console.log(err))
  }

  async removeFavoriteBusService(busService: IBusService): Promise<IUser> {
    const usersStore = useUsersStore()
    const userId = usersStore.user.data._id
    const newFavoriteBusServices =
      usersStore.user.data.favorite_bus_services.filter(
        (service: IBusService) => service._id !== busService._id
      )

    return instance
      .patch('websiteusers/' + userId, {
        favorite_bus_services: [...newFavoriteBusServices]
      })
      .then((res) => res.data)
      .catch((err) => console.log(err))
  }
}

export default new UsersService()
