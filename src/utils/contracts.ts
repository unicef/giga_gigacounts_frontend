import { isBoolean } from 'lodash'
import {
  Contract,
  ContractForm,
  ICurrency,
  IDraft,
  ISchool,
  ISchoolsConnections,
  Translation
} from 'src/@types'
import { ContractSchoolsAndAttachments } from 'src/sections/@dashboard/contract/edit/types'
import { formatDate } from './date'

const getPublishErrors = (draft: Contract | null | undefined) => {
  const errors: { check: boolean; message: Translation; field?: Translation }[] = [
    { check: Boolean(draft), message: 'field_errors.required' },
    { check: Boolean(draft?.launchDate), message: 'field_errors.required', field: 'launch_date' },
    { check: Boolean(draft?.startDate), message: 'field_errors.required', field: 'start_date' },
    { check: Boolean(draft?.endDate), message: 'field_errors.required', field: 'end_date' },
    { check: Boolean(draft?.countryId), message: 'field_errors.required', field: 'country' },
    { check: Boolean(draft?.currencyId), message: 'field_errors.required', field: 'currency' },
    { check: Boolean(draft?.ispId), message: 'field_errors.required', field: 'isp' },
    {
      check: isBoolean(draft?.automatic),
      message: 'field_errors.required',
      field: 'automatic'
    },
    {
      check: draft?.expectedMetrics.metrics.length === 4,
      message: 'field_errors.required_plural',
      field: 'metrics'
    },
    { check: Boolean(draft?.budget), message: 'field_errors.required', field: 'budget' },
    {
      check: Number(draft?.schools?.schools?.length) > 0,
      message: 'field_errors.required_plural',
      field: 'schools'
    },
    {
      check: draft?.automatic ? Boolean(draft?.paymentReceiverId) : true,
      message: 'field_errors.required',
      field: 'payment_receiver'
    }
  ]

  return errors.filter((e) => !e.check).map(({ message, field }) => ({ message, field }))
}

const getContractFromDraft = (draftForm: IDraft): Contract => ({
  name: draftForm.name,
  budget: draftForm.budget as string,
  currencyType: draftForm.currency?.type,
  currencyId: draftForm.currency?.id,
  launchDate: draftForm.launchDate ? formatDate(draftForm.launchDate) : '',
  endDate: draftForm.endDate ? formatDate(draftForm.endDate) : '',
  startDate: draftForm.startDate ? formatDate(draftForm.startDate) : '',
  schools: { schools: draftForm.schools },
  countryId: draftForm.country?.id,
  ispId: draftForm.isp?.id,
  expectedMetrics: { metrics: draftForm.expectedMetrics },
  notes: draftForm.notes,
  automatic: draftForm.automatic,
  frequencyId: draftForm.frequency?.id,
  breakingRules: draftForm.breakingRules
})

const getDraftFromForm = (
  currencies: ICurrency[],
  countrySchools: ISchool[],
  {
    id,
    name,
    startDate,
    endDate,
    launchDate,
    budget,
    isp,
    country,
    currency,
    schools,
    uptime,
    latency,
    downloadSpeed,
    uploadSpeed,
    notes,
    automatic,
    frequencyId,
    addLaunchDate,
    breakingRules,
    paymentReceiverId
  }: ContractForm & ContractSchoolsAndAttachments
) => {
  const getLaunchDate = () => {
    if (addLaunchDate && launchDate) return formatDate(launchDate)
    if (startDate) return formatDate(startDate)
    return ''
  }
  const newDraft: Contract = {
    id,
    name,
    notes,
    startDate: formatDate(startDate ?? ''),
    endDate: formatDate(endDate ?? ''),
    launchDate: getLaunchDate(),
    budget: budget ? String(budget) : '0',
    schools: {
      schools: schools.map((s: { id: string; budget: string }) => {
        const countrySchool = countrySchools.find((cs) => s.id === cs.external_id) as ISchool
        return { ...countrySchool, budget: s.budget }
      })
    },
    expectedMetrics: { metrics: [] },
    automatic,
    breakingRules
  }

  if (automatic) newDraft.paymentReceiverId = paymentReceiverId
  if (isp) newDraft.ispId = isp
  if (country) newDraft.countryId = country
  if (currency) {
    newDraft.currencyId = currency
    newDraft.currencyType = currencies.find((c) => c.id === currency)?.type
  }
  if (frequencyId) newDraft.frequencyId = frequencyId
  ;[uptime, latency, downloadSpeed, uploadSpeed].forEach((metric, index) =>
    metric
      ? newDraft.expectedMetrics?.metrics.push({
          metricId: String(index + 1),
          value: String(metric)
        })
      : null
  )
  return newDraft
}

const getContractSchoolDistribution = (schoolsConnection: ISchoolsConnections) =>
  [
    { color: 'success', percentage: schoolsConnection.allEqualOrAboveAvg },
    { color: 'warning', percentage: schoolsConnection.atLeastOneBellowAvg },
    { color: 'error', percentage: schoolsConnection.withoutConnection }
  ] as const

export { getContractFromDraft, getContractSchoolDistribution, getDraftFromForm, getPublishErrors }
