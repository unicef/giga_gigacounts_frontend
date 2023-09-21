import { Metric } from 'src/@types'
import instance from './init'

export interface ISuggestedMetrics {
  uptimeOptions: readonly number[]
  latencyOptions: readonly number[]
  downloadOptions: readonly number[]
  uploadOptions: readonly number[]
}

const ENDPOINT_URL = `/metric`

const DEFAULT_UPLOAD = [30, 20, 10] as const
const DEFAULT_LATENCY = [50, 100, 200] as const
const DEFAULT_UPTIME = [100, 98, 96] as const
const DEFAULT_DOWNLOAD = [50, 30, 20] as const

export const getSuggestedMetrics = async (): Promise<ISuggestedMetrics> => {
  try {
    const response = await instance.get(`${ENDPOINT_URL}/suggested-values`)
    return {
      uptimeOptions: response.data
        .find((r: { name: Metric }) => r.name === Metric.Uptime)
        .suggestedMetrics.map((s: { value: string }) => Number(s.value)),
      latencyOptions: response.data
        .find((r: { name: Metric }) => r.name === Metric.Latency)
        .suggestedMetrics.map((s: { value: string }) => Number(s.value)),
      downloadOptions: response.data
        .find((r: { name: Metric }) => r.name === Metric.DownloadSpeed)
        .suggestedMetrics.map((s: { value: string }) => Number(s.value)),
      uploadOptions: response.data
        .find((r: { name: Metric }) => r.name === Metric.UploadSpeed)
        .suggestedMetrics.map((s: { value: string }) => Number(s.value))
    }
  } catch {
    return {
      uptimeOptions: DEFAULT_UPTIME,
      latencyOptions: DEFAULT_LATENCY,
      downloadOptions: DEFAULT_DOWNLOAD,
      uploadOptions: DEFAULT_UPLOAD
    }
  }
}
