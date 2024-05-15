import { defineStore } from 'pinia'
import BusServicesService from '@/services/busServices.service'
import type { IArrivalPoint, IBusService, IDeparturePoint } from '@/interfaces/busServiceInterface'

const busServicesService = new BusServicesService()

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
      this.busServices = await busServicesService.getBusServices(q)
    }
  }
})
