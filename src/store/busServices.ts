import { defineStore } from 'pinia'
import BusServicesService from '@/services/busServices.service'
import type { IBusService } from '@/interfaces/busServiceInterface'

export const useBusServicesStore = defineStore('busServices', {
  state: () => ({ busServices: [] as IBusService[] }),
  actions: {
    async getBusServices(
      departurePoint: string | null,
      arrivalPoint: string | null,
      date: string | null
    ) {
      const q = {
        departure_point: {
          title: departurePoint
        },
        arrival_point: {
          title: arrivalPoint
        },
        departure_date: {
          $date: date
        }
      }
      const response = await BusServicesService.getBusServices(q)
      this.busServices = response
    }
  }
})
