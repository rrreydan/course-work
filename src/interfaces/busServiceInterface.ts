export interface IBusService {
  id: string
  key: string
  value: IBusServiceValue
}

export interface IBusServiceValue {
  departure_point: IDeparturePoint
  arrival_point: IArrivalPoint
  departure_date: string
  arrival_date: string
}

export interface IDeparturePoint {
  _id: string
  title: string
  region: string
  country: string
}

export interface IArrivalPoint {
  _id: string
  title: string
  region: string
  country: string
}
