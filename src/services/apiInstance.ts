import axios from 'axios'

const API_URL = import.meta.env.VITE_RESTDATABASE_URL
const API_KEY = import.meta.env.VITE_RESTDATABASE_API_KEY

export default function getInstance() {
  return axios.create({
    baseURL: API_URL,
    headers: {
      'x-apikey': API_KEY
    }
  })
}
