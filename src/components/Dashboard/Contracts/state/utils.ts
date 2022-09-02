import { MetricPropertyType } from './types'

export const getMetricProperty = (metric_name: string) => {
  const metricPropertyMapping = {
    latency: MetricPropertyType.latency,
    uptime: MetricPropertyType.uptime,
    'download speed': MetricPropertyType['download speed'],
    'upload speed': MetricPropertyType['upload speed'],
  }
  return metricPropertyMapping[metric_name.toLowerCase() as keyof typeof metricPropertyMapping]
}
