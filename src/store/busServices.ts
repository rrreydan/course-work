import axios from 'axios'
import { defineStore } from 'pinia'

const API_URL = import.meta.env.VITE_RESTDATABASE_URL
const API_KEY = import.meta.env.VITE_RESTDATABASE_API_KEY

export const useBusServicesStore = defineStore('busServices', {
  state: () => ({ busServices: [] }),
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
      const response = await axios
        .get(API_URL + 'busservices', {
          params: {
            q: JSON.stringify(q)
          },
          headers: {
            'x-apikey': API_KEY
          }
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))

      this.busServices = response
    }
  }
})
