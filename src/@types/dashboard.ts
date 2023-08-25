export interface IDashboardSchools {
  id: string
  external_id: string
  name: string
  address: string
  education_level: string
  country_id: number
  lat: string
  lng: string
  avg_uptime: number
  avg_latency: number
  avg_dspeed: number
  avg_uspeed: number
  connectivity_issues: boolean
}

export interface IDashboardContract {
  id: string
  name: string
  isp: string
  budget: string
  numberOfSchools: number
}
