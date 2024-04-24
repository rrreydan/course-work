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
    let isEmptyQuery = false

    if (
      q.departure_point.title === null &&
      q.arrival_point.title === null &&
      q.departure_date.$date === null
    )
      isEmptyQuery = true

    return await instance
      .get('busservices', {
        params: {
          q: isEmptyQuery ? {} : JSON.stringify(q)
        }
      })
      .then((res) => res.data)
      .catch((err) => console.log(err))
  }
}

export default new BusServicesService()
