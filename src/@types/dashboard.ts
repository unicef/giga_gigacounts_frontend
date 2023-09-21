export interface IDashboardSchools {
  id: string
  external_id: string
  name: string
  address: string
  education_level: string
  country_id: number
  lat: string
  lng: string
  avg_uptime: number | null
  avg_latency: number | null
  avg_dspeed: number | null
  avg_uspeed: number | null
  connectivity_issues: boolean
}

export interface IDashboardContract {
  id: string
  name: string
  isp: string
  budget: string
  numberOfSchools: number
}
