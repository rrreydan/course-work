import type { IUser } from '@/interfaces/userInterface'
import getInstance from './apiInstance'
import type { IBusService } from '@/interfaces/busServiceInterface'
import type { IResponse } from '@/interfaces/responseInterface'
import { useUsersStore } from '@/store/users'

const instance = getInstance()

class UsersService {
  async getUsers(): Promise<IUser[]> {
    return await instance
      .get('_design/websiteusers/_view/all-websiteusers')
      .then((res) => res.data.rows)
      .catch((err) => console.log(err))
  }

  async getUserById(id: string): Promise<IUser> {
    return await instance
      .get('/' + id)
      .then((res) => res.data)
      .catch((err) => console.log(err))
  }

  async addUser(email: string, password: string): Promise<IResponse> {
    return await instance
      .put(`/${email}`, {
        type: 'websiteuser',
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
        (service: IBusService) => service.id !== busService.id
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
