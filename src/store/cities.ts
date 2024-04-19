import { defineStore } from 'pinia'
import CitiesService from '@/services/cities.service'
import type { ICity } from '@/interfaces/cityInterface'

export const useCitiesStore = defineStore('cities', {
  state: () => ({ cities: [] as ICity[] }),
  actions: {
    async getCities() {
      const response = await CitiesService.getCities()
      this.cities = response
    }
  }
})
