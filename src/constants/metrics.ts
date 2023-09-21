import { Metric, MetricSnake } from 'src/@types'

export const METRICS_LABELS: {
  [K in Metric | MetricSnake]: string
} = {
  [MetricSnake.DownloadSpeed]: 'Mb/s',
  [Metric.DownloadSpeed]: 'Mb/s',
  [Metric.Latency]: 'ms',
  [MetricSnake.Latency]: 'ms',
  [Metric.UploadSpeed]: 'Mb/s',
  [MetricSnake.UploadSpeed]: 'Mb/s',
  [Metric.Uptime]: '%',
  [MetricSnake.Uptime]: '%'
}
