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

    // Если поисковые данные пустые, то возвращаем все автобусные рейсы
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

    // Получаем все автобусные рейсы
    const response = await instance
      .get('_design/busservices/_view/all-busservices', {})
      .then((res) => res.data.rows)
      .catch((err) => console.log(err))

    // Возвращаем только необходимые
    return response.filter((busService: IBusService) => {
      const comparedDate = new Date(busService.value.departure_date)
      const timezoneOffset = comparedDate.getTimezoneOffset() * 60000
      if (
        q.departure_point?.title === busService.value.departure_point.title &&
        q.arrival_point?.title === busService.value.arrival_point.title &&
        departureDate.toDateString() === new Date(comparedDate.getTime() + timezoneOffset).toDateString()
      ) {
        return true
      }
    })
  }

  async addBusService(busService: IBusService): Promise<void> {
    await instance
      .put('/' + busService.id, {
        type: 'busservice',
        departure_point: busService.value.departure_point,
        arrival_point: busService.value.arrival_point,
        departure_date: busService.value.departure_date,
        arrival_date: busService.value.arrival_date
      })
      .then((res) => res.data)
      .then((err) => console.log(err))
  }

  async updateBusService(busService: IBusService): Promise<void> {
    const response = await instance
      .head('/' + busService.id)
      .then((res) => res.headers.etag)
      .catch((err) => console.log(err))

    await instance
      .put('/' + busService.id, {
        _rev: response.toString().replace(/"/g, ''),
        type: 'busservice',
        departure_point: busService.value.departure_point,
        arrival_point: busService.value.arrival_point,
        departure_date: busService.value.departure_date,
        arrival_date: busService.value.arrival_date
      })
      .then((res) => res.data)
      .then((err) => console.log(err))
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

export default BusServicesService
