import { IConnectionMedian } from 'src/types/general'
import { CONNECTIONS_MEDIAN_DEFAULT } from './consts'

export const fillMissingConnectionsMedian = (existingMeasurements?: IConnectionMedian[]) =>
  new Array(4).fill(null).map((_, index) => {
    const existing = existingMeasurements?.find(
      (measurement) => measurement.metric_id === CONNECTIONS_MEDIAN_DEFAULT[index].metric_id,
    )
    return { ...CONNECTIONS_MEDIAN_DEFAULT[index], ...existing }
  })
