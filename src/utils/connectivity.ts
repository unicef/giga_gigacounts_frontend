import { ConnectivityStatus } from 'src/@types'

export const getConnectivityStatus = (connectivity?: number | null): ConnectivityStatus => {
  if (connectivity === 0) return ConnectivityStatus.Disconnected
  if (!connectivity || connectivity < 0) return ConnectivityStatus.Unknown
  if (connectivity >= 100) return ConnectivityStatus.Connected
  return ConnectivityStatus.PoorlyConnected
}
