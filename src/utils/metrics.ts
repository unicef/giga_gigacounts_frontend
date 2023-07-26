import { MetricName } from 'src/@types'
import { METRICS_LABELS } from 'src/constants/metrics'

export const getMetricLabel = (name: MetricName) => METRICS_LABELS[name]
