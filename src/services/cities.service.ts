import type { ICity } from '@/interfaces/cityInterface'
import getInstance from './apiInstance'

const instance = getInstance()

class CitiesService {
  // Метод получения массива городов из базы данных
  async getCities(): Promise<ICity[]> {
    return await instance
      .get('_design/cities/_view/all-cities', {})
      .then((res) => res.data.rows)
      .catch((err) => console.log(err))
  }
}

export default CitiesService
