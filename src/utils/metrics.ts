import { Metric, MetricCamel, MetricSnake } from 'src/@types'
import { METRICS_LABELS } from 'src/constants'

export const getMetricLabel = (name: Metric | MetricSnake) => METRICS_LABELS[name]

export const transformMetric = <T extends 'sentence' | 'camel' | 'snake'>(
  name: Metric | MetricSnake | MetricCamel,
  to: T
) => {
  const cases = ['camel', 'sentence', 'snake'] as const

  const getCase = (variant: (typeof cases)[number]) =>
    ({
      sentence: Metric,
      camel: MetricCamel,
      snake: MetricSnake
    }[variant])

  const grouping = {
    uptime: Object.fromEntries(cases.map((c) => [c, getCase(c).Uptime])),
    latency: Object.fromEntries(cases.map((c) => [c, getCase(c).Latency])),
    dwnspeed: Object.fromEntries(cases.map((c) => [c, getCase(c).DownloadSpeed])),
    upldSpeed: Object.fromEntries(cases.map((c) => [c, getCase(c).UploadSpeed]))
  } as const

  return Object.values(grouping).find((value) =>
    Object.values(value).some((enumValue) => enumValue === name)
  )?.[to] as T extends 'sentence' ? Metric : T extends 'camel' ? MetricCamel : MetricSnake
}
