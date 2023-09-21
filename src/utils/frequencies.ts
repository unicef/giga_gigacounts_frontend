import moment from 'moment'
import { IFrequency } from 'src/@types'
import { FREQUENCIES_MINIMUM_LENGTH } from 'src/constants'

export const isValidFrequency = (
  name: IFrequency['name'],
  startDate: Date | null,
  endDate: Date | null
) => {
  if (!startDate || !endDate) return true
  return FREQUENCIES_MINIMUM_LENGTH[name] + 1 <= moment(endDate).diff(moment(startDate), 'day')
}
