import type { IBusService } from '@/interfaces/busServiceInterface'
import getInstance from './apiInstance'

interface IQuery {
  departure_point: { title: string | null }
  arrival_point: { title: string | null }
  departure_date: { $date: string | null }
}

const instance = getInstance()

class BusServicesService {
  async getBusServices(q: IQuery): Promise<IBusService[]> {
    return await instance
      .get('busservices', {
        params: {
          q: JSON.stringify(q)
        }
      })
      .then((res) => res.data)
      .catch((err) => console.log(err))
  }
}

export default new BusServicesService()
