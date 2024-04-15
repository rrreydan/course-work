import axios from 'axios'
import { defineStore } from 'pinia'

const API_URL = import.meta.env.VITE_RESTDATABASE_URL

export const useCitiesStore = defineStore('cities', {
  state: () => ({ cities: [] }),
  actions: {
    async getCities() {
      const response = await axios
        .get(API_URL + 'cities', {
          headers: {
            'x-apikey': import.meta.env.VITE_RESTDATABASE_API_KEY
          }
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))

      this.cities = response
    }
  }
})
