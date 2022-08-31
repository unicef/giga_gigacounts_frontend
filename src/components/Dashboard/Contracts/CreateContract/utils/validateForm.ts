import { ContractForm } from 'src/components/Dashboard/Contracts/CreateContract/state/types'

export const validateForm = (contractForm: ContractForm) => {
  const errors: string[] = []

  if (!contractForm.id) errors.push(`Id can't be empty`)
  if (!contractForm.name) errors.push(`Name can't be empty`)
  if (!contractForm.countryId) errors.push(`Country id can't be empty`)
  if (!contractForm.currencyId) errors.push(`Currency id can't be empty`)
  if (!contractForm.ispId) errors.push(`ISP id can't be empty`)
  if (!contractForm.expectedMetrics.metrics.length) errors.push(`Expected metrics can't be empty`)
  if (!contractForm.budget) errors.push(`Budget can't be empty`)
  if (!contractForm.startDate) errors.push(`Start date can't be empty`)
  if (!contractForm.endDate) errors.push(`End date can't be empty`)
  if (!contractForm.schools.schools.length) errors.push(`Schools date can't be empty`)

  return errors
}
