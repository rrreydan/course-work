import { defineStore } from 'pinia'
import CitiesService from '@/services/cities.service'
import type { ICity } from '@/interfaces/cityInterface'

const citiesService = new CitiesService()

export const useCitiesStore = defineStore('cities', {
  // Состояния хранилища
  state: () => ({ cities: [] as ICity[] }),
  // Методы для изменения состояний
  actions: {
    async getCities() {
      const response = await citiesService.getCities()
      this.cities = response
    }
  }
})
