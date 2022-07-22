export interface ICountryUser {
  name: string
  code: string
  flagUrl: string
}

export interface IUser {
  name: string
  lastName: string
  email: string
  role: string
  country?: ICountryUser
}

export interface IContractCounts {
  counts: ICounts[]
  totalCount: number
}

export interface ICounts {
  status: string
  count: string
}
