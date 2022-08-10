export const formatMetricValue = (value: number, metricId: number) => {
  switch (metricId) {
    case 0:
      return `${value}%`
    case 1:
      return `${value}ms`
    case 2:
      return `${value}Mb/s`
    case 3:
      return `${value}Mb/s`
    default:
      return value
  }
}
