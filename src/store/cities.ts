import axios from 'axios'
import { defineStore } from 'pinia'

export const useCitiesStore = defineStore('cities', {
  state: () => ({ cities: [] }),
  actions: {
    async getCities() {
      const response = await axios
        .get('https://coursework-fbc1.restdb.io/rest/cities', {
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
