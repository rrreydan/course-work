import type { IUser } from '@/interfaces/userInterface'
import getInstance from './apiInstance'
import type { IBusService } from '@/interfaces/busServiceInterface'
import type { IResponse } from '@/interfaces/responseInterface'
import { useUsersStore } from '@/store/users'

const instance = getInstance()

class UsersService {
  // Метод получения всех пользователей
  async getUsers(): Promise<IUser[]> {
    return await instance
      .get('_design/websiteusers/_view/all-websiteusers')
      .then((res) => res.data.rows)
      .catch((err) => console.log(err))
  }

  // Метод получения отдельного пользователя по его id
  async getUserById(id: string): Promise<IUser> {
    // Получаем всех пользователей из БД
    const response = await instance
      .get('_design/websiteusers/_view/all-websiteusers')
      .then((res) => res.data.rows)
      .catch((err) => console.log(err))

    // Находим нужного пользователя с помощью метода find
    return response.find((user: IUser) => user.id === id)
  }

  // Метод добавления пользователя в БД
  async addUser(email: string, password: string): Promise<IResponse> {
    return await instance
      .put('/' + email, {
        type: 'websiteuser',
        email,
        password,
        favorite_bus_services: [],
        is_admin: false
      })
      .then((res) => res.data)
      .catch((err) => console.log(err))
  }

  // Метод добавления автобусного рейса в избранное определенного пользователя
  async addFavoriteBusService(busService: IBusService): Promise<IUser> {
    const usersStore = useUsersStore()
    const userId = usersStore.user.data.id

    // Получаем rev пользователя, которого нужно изменить
    const response = await instance
      .head('/' + userId)
      .then((res) => res.headers.etag)
      .catch((err) => console.log(err))

    // Изменяем пользователя и добавляем ему новый избранный автобусный рейс
    return await instance
      .put('/' + userId, {
        _rev: response.toString().replace(/"/g, ''),
        type: 'websiteuser',
        email: usersStore.user.data.value.email,
        password: usersStore.user.data.value.password,
        favorite_bus_services: [
          ...usersStore.user.data.value.favorite_bus_services,
          busService
        ],
        is_admin: usersStore.user.data.value.is_admin
      })
      .then((res) => res.data)
      .catch((err) => console.log(err))
  }

  // Метод удаления автобусного рейса в избранное определенного пользователя
  async removeFavoriteBusService(busService: IBusService): Promise<IUser> {
    const usersStore = useUsersStore()
    const userId = usersStore.user.data.id
    const newFavoriteBusServices =
      usersStore.user.data.value.favorite_bus_services.filter(
        (service: IBusService) => service.id !== busService.id
      ) // Формируем новый массив избранных рейсов без удаляемого

    // Получаем rev пользователя, которого нужно изменить
    const response = await instance
      .head('/' + userId)
      .then((res) => res.headers.etag)
      .catch((err) => console.log(err))

    // Изменяем пользователя
    return await instance
      .put('/' + userId, {
        _rev: response.toString().replace(/"/g, ''),
        type: 'websiteuser',
        email: usersStore.user.data.value.email,
        password: usersStore.user.data.value.password,
        favorite_bus_services: [...newFavoriteBusServices],
        is_admin: usersStore.user.data.value.is_admin
      })
      .then((res) => res.data)
      .catch((err) => console.log(err))
  }
}

export default UsersService
