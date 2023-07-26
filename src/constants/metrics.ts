import { MetricName } from 'src/@types'

export const METRICS_LABELS: {
  [K in MetricName]: string
} = {
  'download_speed': 'Mb/s',
  'Download speed': 'Mb/s',
  'Latency': 'ms',
  'latency': 'ms',
  'Upload speed': 'Mb/s',
  'upload_speed': 'Mb/s',
  'Uptime': '%',
  'uptime': '%'
}
