import type { ICity } from '@/interfaces/cityInterface'
import getInstance from './apiInstance'

const instance = getInstance()

class CitiesService {
  async getCities(): Promise<ICity[]> {
    return await instance
      .get('_design/cities/_view/all-cities', {})
      .then((res) => res.data.rows)
      .catch((err) => console.log(err))
  }
}

export default new CitiesService()
