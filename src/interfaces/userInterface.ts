import type { IBusService } from './busServiceInterface'

export interface IUser {
  _id: string
  email: string
  password: string
  favorite_bus_services: IBusService[]
}
