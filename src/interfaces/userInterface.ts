import type { IBusService } from './busServiceInterface'

export interface IUser {
  id: string
  key: string
  value: IUserValue
}

export interface IUserValue {
  email: string
  password: string
  favorite_bus_services: IBusService[],
  is_admin: boolean
}
