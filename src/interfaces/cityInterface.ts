export interface ICity {
  id: string
  key: string
  value: ICityValue
}

export interface ICityValue {
  title: string
  region: string
  country: string
}
