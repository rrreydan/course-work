import { defineStore } from 'pinia'
import BusServicesService from '@/services/busServices.service'
import type { IBusService, IDeparturePoint, IArrivalPoint } from '@/interfaces/busServiceInterface'

export const useBusServicesStore = defineStore('busServices', {
  state: () => ({ busServices: [] as IBusService[] }),
  actions: {
    async getBusServices(
      departurePoint: IDeparturePoint | null,
      arrivalPoint: IArrivalPoint | null,
      date: string | null
    ) {
      const q = {
        departure_point: departurePoint,
        arrival_point: arrivalPoint,
        departure_date: date
      }
      const response = await BusServicesService.getBusServices(q)
      this.busServices = response
    }
  }
})
