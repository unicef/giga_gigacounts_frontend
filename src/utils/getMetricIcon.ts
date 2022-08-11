export const getMetricIconClassName = (metricId: number): string => {
  switch (metricId) {
    case 1:
      return `icon-plug`
    case 2:
      return `icon-meter`
    case 3:
      return `icon-down-speed`
    case 4:
      return `icon-up-speed`
    default:
      return ``
  }
}
