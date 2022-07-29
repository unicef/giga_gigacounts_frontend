export interface ICountry {
  name: string
  code: string
  flagUrl: string
}

export interface IUser {
  name: string
  lastName: string
  email: string
  role: string
  country?: ICountry
}

export interface IContractCounts {
  counts: ICounts[]
  totalCount: number
}

export interface ICounts {
  status: string
  count: string
}

export interface IFileUpload {
  name: string
  typeId: string | null
  type: string
  file: string | ArrayBuffer | null
}

export interface IAttachment {
  id: string
  ipfs_url: string | null
  name: string
  url: string
}

export interface IDraft {
  id: string
  name: string
  country: ICountry | null
  currency: string | null
  budget: string | null
  attachments: IAttachment[]
  createdBy: IUser | null
  startDate: string | null
  endDate: string | null
  expectedMetrics: []
  frequency: string | null
  governmentBehalf: false
  isp: string | null
  lta: string | null
  schools: []
}
