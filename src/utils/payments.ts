import { months } from 'moment'
import { IPeriod } from 'src/@types'

export const getPeriodLabel = (p: IPeriod) =>
  p.day ? `${p.day}-${months(p.month - 1)}-${p.year}` : `${p.year}-${months(p.month - 1)}`
