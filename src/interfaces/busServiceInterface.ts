export interface IBusService {
  _id: string
  departure_point: IDeparturePoint[]
  arrival_point: IArrivalPoint[]
  departure_date: string
  departure_time: string
  arrival_time: string
}

export interface IDeparturePoint {
  _id: string
  title: string
  region: string
  country: string
  _created: string
  _changed: string
}

export interface IArrivalPoint {
  _id: string
  title: string
  region: string
  country: string
  _created: string
  _changed: string
}
