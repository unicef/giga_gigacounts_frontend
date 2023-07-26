import { ConnectivityStatus } from 'src/@types'

export const getConnectivityStatus = (connectivity: number): ConnectivityStatus => {
  if (connectivity >= 90) return ConnectivityStatus.Strong
  if (connectivity >= 80) return ConnectivityStatus.Weak
  return ConnectivityStatus.Very_weak
}
