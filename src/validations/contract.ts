import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ContractForm, ContractStep, IDraft, Metric, MetricCamel, MetricSnake } from 'src/@types'
import { useAuthContext } from 'src/auth/useAuthContext'
import { useLocales } from 'src/locales'
import * as Yup from 'yup'

const MAX_BUDGET = 1000000000000000000

export const useContractSchema = (activeStep: ContractStep, contract?: IDraft | null) => {
  const { user } = useAuthContext()
  const { translate, replaceTranslated, replaceTwoTranslated } = useLocales()

  const getDefaultValues = useCallback(
    (draft?: IDraft | null) => ({
      id: draft?.id ?? '',
      name: draft?.name ?? '',
      country: draft?.country?.id ?? user?.country.id ?? '',
      isp: draft?.isp?.id ?? '',
      startDate: draft?.startDate ? new Date(draft?.startDate) : null,
      endDate: draft?.endDate ? new Date(draft?.endDate) : null,
      launchDate: draft?.launchDate ? new Date(draft?.launchDate) : null,
      [MetricCamel.Uptime]: Number(
        draft?.expectedMetrics?.find((metric) => metric.name === Metric.Uptime)?.value ?? ''
      ),
      [MetricCamel.DownloadSpeed]: Number(
        draft?.expectedMetrics?.find((metric) => metric.name === Metric.DownloadSpeed)?.value ?? ''
      ),
      [MetricCamel.Latency]: Number(
        draft?.expectedMetrics?.find((metric) => metric.name === Metric.Latency)?.value ?? ''
      ),
      [MetricCamel.UploadSpeed]: Number(
        draft?.expectedMetrics?.find((metric) => metric.name === Metric.UploadSpeed)?.value ?? ''
      ),
      currency: draft?.currency?.id ?? '',
      budget: Number(draft?.budget ?? 0),
      notes: draft?.notes ?? '',
      automatic: draft?.automatic ?? false,
      breakingRules: draft?.breakingRules ?? '',
      bypass: false,
      frequencyId: draft?.frequency?.id ?? '3',
      paymentReceiverId: String(draft?.paymentReceiver?.id ?? '')
    }),
    [user]
  )

  const [defaultValues, setDefaultValues] = useState<ContractForm>(getDefaultValues(contract))

  useEffect(() => {
    setDefaultValues(getDefaultValues(contract))
  }, [contract, getDefaultValues])

  const resolver = yupResolver(
    Yup.object().shape({
      id: Yup.string(),
      name: Yup.string().required(
        replaceTranslated('field_errors.required', '{{field}}', 'contract_name')
      ),
      country: Yup.string().required(
        replaceTranslated('field_errors.required', '{{field}}', 'country')
      ),
      isp: Yup.string(),
      startDate: Yup.date().nullable().min(new Date(), translate('field_errors.start_date')),
      endDate: Yup.date()
        .nullable()
        .when('startDate', (startDate, schema) => {
          if (startDate[0]) {
            const dayAfter = new Date(startDate[0].getTime() + 86400000)
            return schema.min(dayAfter, translate('field_errors.end_date'))
          }
          return schema
        }),
      launchDate: Yup.date()
        .nullable()
        .when(['startDate', 'endDate'], (dates, schema) => {
          const dayBeforeEnd = dates[1] ? new Date(dates[1].getTime() - 86400000) : null
          if (dates[0] && dates[1]) {
            return schema
              .min(dates[0], translate('field_errors.launch_date_min'))
              .max(dayBeforeEnd, translate('field_errors.launch_date_max'))
          }
          if (dates[0]) {
            return schema.min(dates[0], translate('field_errors.launch_date_min'))
          }
          if (dates[1]) {
            return schema.max(dayBeforeEnd, translate('field_errors.launch_date_max'))
          }
          return schema
        }),

      [MetricCamel.Uptime]: Yup.number()
        .min(0, replaceTranslated('field_errors.positive', '{{field}}', MetricSnake.Uptime))
        .max(
          100,
          replaceTwoTranslated(
            'field_errors.less_than',
            '{{field}}',
            '{{number}}',
            MetricSnake.Uptime,
            100
          )
        )
        .nullable()
        .transform((_, val) => (!Number.isNaN(Number(val)) ? Number(val) : null)),
      [MetricCamel.DownloadSpeed]: Yup.number()
        .min(0, replaceTranslated('field_errors.positive', '{{field}}', MetricSnake.DownloadSpeed))
        .max(
          10000,
          replaceTwoTranslated(
            'field_errors.less_than',
            '{{field}}',
            '{{number}}',
            MetricSnake.DownloadSpeed,
            10000
          )
        )
        .nullable()
        .transform((_, val) => (!Number.isNaN(Number(val)) ? Number(val) : null)),
      [MetricCamel.Latency]: Yup.number()
        .min(0, replaceTranslated('field_errors.positive', '{{field}}', MetricSnake.Latency))
        .max(
          10000,
          replaceTwoTranslated(
            'field_errors.less_than',
            '{{field}}',
            '{{number}}',
            MetricSnake.Latency,
            10000
          )
        )
        .nullable()
        .transform((_, val) => (!Number.isNaN(Number(val)) ? Number(val) : null)),
      [MetricCamel.UploadSpeed]: Yup.number()
        .min(0, replaceTranslated('field_errors.positive', '{{field}}', MetricSnake.UploadSpeed))
        .max(
          10000,
          replaceTwoTranslated(
            'field_errors.less_than',
            '{{field}}',
            '{{number}}',
            MetricSnake.UploadSpeed,
            10000
          )
        )
        .nullable()
        .transform((_, val) => (!Number.isNaN(Number(val)) ? Number(val) : null)),
      users: Yup.array(),
      currency:
        activeStep === 1
          ? Yup.string().required(
              replaceTranslated('field_errors.required', '{{field}}', 'currency')
            )
          : Yup.string(),
      budget:
        activeStep === 1
          ? Yup.number()
              .min(0, replaceTranslated('field_errors.positive', '{{field}}', 'budget'))
              .max(
                MAX_BUDGET,
                replaceTwoTranslated(
                  'field_errors.less_than',
                  '{{field}}',
                  '{{number}}',
                  'budget',
                  MAX_BUDGET
                )
              )
              .nonNullable()
              .transform((_, val) => (!Number.isNaN(Number(val)) ? Number(val) : null))
              .required(replaceTranslated('field_errors.required', '{{field}}', 'budget'))
          : Yup.number()
              .nonNullable()
              .min(0, replaceTranslated('field_errors.positive', '{{field}}', 'budget'))
              .max(
                MAX_BUDGET,
                replaceTwoTranslated(
                  'field_errors.less_than',
                  '{{field}}',
                  '{{number}}',
                  'budget',
                  MAX_BUDGET
                )
              )
              .transform((_, val) => (!Number.isNaN(Number(val)) ? Number(val) : null)),
      notes: Yup.string(),
      automatic: Yup.boolean(),
      bypass: Yup.boolean(),
      frequencyId: Yup.string(),
      paymentReceiverId: Yup.string()
    })
  )

  return useForm({ resolver, values: defaultValues, mode: 'all', reValidateMode: 'onChange' })
}
