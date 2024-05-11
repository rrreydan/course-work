import type { IArrivalPoint, IBusService, IDeparturePoint } from '@/interfaces/busServiceInterface'
import getInstance from './apiInstance'

interface IQuery {
  departure_point: IDeparturePoint | null
  arrival_point: IArrivalPoint | null
  departure_date: string | null
}

const instance = getInstance()

class BusServicesService {
  async getBusServices(q: IQuery): Promise<IBusService[]> {
    let departureDate = new Date()

    if (
      q.departure_point === null &&
      q.arrival_point === null &&
      q.departure_date === null
    )
      return await instance
        .get('_design/busservices/_view/all-busservices', {})
        .then((res) => res.data.rows)
        .catch((err) => console.log(err))
    else {
      if (q.departure_date) departureDate = new Date(q.departure_date)
    }

    const response = await instance
      .get('_design/busservices/_view/all-busservices', {})
      .then((res) => res.data.rows)
      .catch((err) => console.log(err))

    return response.filter((busService: IBusService) => {
      if (
        q.departure_point?.title === busService.value.departure_point.title &&
        q.arrival_point?.title === busService.value.arrival_point.title &&
        departureDate.toISOString() === new Date(busService.value.departure_date).toISOString()
      ) {
        return true
      }
    })
  }

  async deleteBusService(busServiceId: string): Promise<void> {
    const response = await instance
      .head('/' + busServiceId)
      .then((res) => res.headers.etag)
      .catch((err) => console.log(err))

    await instance
      .delete('/' + busServiceId, {
        params: {
          rev: response.toString().replace(/"/g, '')
        }
      })
      .catch((err) => console.log(err))
  }
}

export default new BusServicesService()
