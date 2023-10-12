import moment from 'moment'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  IContractDetails,
  IFrequency,
  IPaymentConnection,
  IPeriod,
  MetricSnake,
  PaymentForm,
  PaymentStatus,
  Translation
} from 'src/@types'
import { getPaymentConnection } from 'src/api/payments'
import { RHFSelect } from 'src/components/hook-form'
import { InfoToggletip } from 'src/components/info-toggletip'
import { ComparingCard } from 'src/components/qos-card'
import Stack from 'src/components/stack/Stack'
import { SectionHeading, SectionTitle } from 'src/components/typography'
import { FREQUENCIES_MINIMUM_LENGTH } from 'src/constants'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { formatDate } from 'src/utils/date'
import { transformMetric } from 'src/utils/metrics'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { PaymentConnectivityBar } from '../graph'

type Step2Props = {
  contract: IContractDetails | null
  paymentFrequency: IFrequency['name']
  paidDate: IPeriod | null
}

export default function Step2({ contract, paymentFrequency, paidDate }: Step2Props) {
  const { translate, replaceTwoTranslated, replaceTranslated } = useLocales()
  const { spacing } = useTheme()
  const { getValues } = useFormContext<PaymentForm>()

  const [paymentConnection, setPaymentConnection] = useState<IPaymentConnection>()

  useEffect(() => {
    if (paidDate && contract?.id)
      getPaymentConnection(Number(contract.id), paidDate).then(setPaymentConnection)
  }, [paidDate, contract?.id])

  const metricsFirstColumn = [MetricSnake.Uptime, MetricSnake.UploadSpeed] as const
  const metricsSecondColumn = [MetricSnake.Latency, MetricSnake.DownloadSpeed] as const
  const sentenceMetrics = [
    ...metricsFirstColumn.map((m) => transformMetric(m, 'sentence')),
    ...metricsSecondColumn.map((m) => transformMetric(m, 'sentence'))
  ]
  const realMetrics = Object.fromEntries(
    sentenceMetrics.map((name) => [
      name,
      paymentConnection
        ? paymentConnection.connectionsMedian.find((m) => m.metric_name === name)
        : null
    ])
  )
  const expectedMetrics = Object.fromEntries(
    sentenceMetrics.map((name) => [
      name,
      contract ? contract.expectedMetrics.find((m) => m.metricName === name) : null
    ])
  )
  const payment = getValues('payment')
  const paymentForDate = payment
    ? {
        ...payment,
        month: payment.month - 1,
        day: payment.day ?? 1
      }
    : null

  const dateTo = moment(paymentForDate)
  const dateFrom = moment(paymentForDate)
  dateFrom.subtract(FREQUENCIES_MINIMUM_LENGTH[paymentFrequency], 'days')

  const absolutePerecentages = paymentConnection
    ? ([
        { color: 'success', percentage: paymentConnection.schoolsConnected.goodConnection },
        { color: 'warning', percentage: paymentConnection.schoolsConnected.badConnection },
        { color: 'error', percentage: paymentConnection.schoolsConnected.noConnection },
        { color: 'unknown', percentage: paymentConnection.schoolsConnected.unknownConnection }
      ] as const)
    : null

  const daysPercentages = paymentConnection
    ? ([
        { color: 'success', percentage: paymentConnection.daysConnected.goodConnection },
        { color: 'warning', percentage: paymentConnection.daysConnected.badConnection },
        { color: 'error', percentage: paymentConnection.daysConnected.noConnection },
        { color: 'unknown', percentage: paymentConnection.daysConnected.unknownConnection }
      ] as const)
    : null

  return (
    <Stack>
      {contract && (
        <>
          <SectionTitle
            label={translate('connectivity_quality_check')}
            subtitle={
              `${replaceTwoTranslated(
                'from_date_to_date',
                '{{dateFrom}}',
                '{{dateTo}}',
                formatDate(dateFrom.toISOString(), '/') as Translation,
                formatDate(dateTo.toISOString(), '/')
              )} ${translate('for')} ${replaceTranslated(
                'number_schools',
                '{{number}}',
                contract.numberOfSchools as Translation
              )}` as Translation
            }
          />
          <Stack orientation="horizontal" alignItems="center" gap={spacing.md}>
            <SectionHeading weight={400} heading="connectivity_distribution_by_status" />
            <InfoToggletip
              align="top"
              title={translate('tooltips.connectivity_distribution_status.line1')}
            />
          </Stack>
          <PaymentConnectivityBar
            data={absolutePerecentages}
            variant="status"
            tooltipAlign={(a, i) => {
              if (a.percentage >= 50) return 'top'
              return i === 0 ? 'top-left' : 'top-right'
            }}
          />
          <Stack orientation="horizontal" alignItems="center" gap={spacing.md}>
            <SectionHeading weight={400} heading="connectivity_distribution_by_days" />
            <InfoToggletip
              align="top"
              title={translate('tooltips.connectivity_distribution_days.line1')}
            />
          </Stack>
          <PaymentConnectivityBar
            data={daysPercentages}
            variant="days"
            tooltipAlign={(a, i) => {
              if (a.percentage >= 50) return 'top'
              return i === 0 ? 'top-left' : 'top-right'
            }}
          />
        </>
      )}
      <Stack orientation="horizontal" gap={spacing.md} alignItems="center">
        <SectionHeading weight={400} heading="quality_of_service_comparison" />
        <InfoToggletip
          align="top"
          title={translate('tooltips.quality_of_service_comparison.line1')}
        />
      </Stack>
      <Stack orientation="horizontal" gap={spacing.xl} justifyContent="center" alignItems="center">
        <Stack orientation="vertical" gap={spacing.xl}>
          {metricsFirstColumn.map((i) => (
            <ComparingCard
              key={i}
              average
              width={320}
              name={i}
              value={Number(realMetrics[transformMetric(i, 'sentence')]?.median_value ?? null)}
              expectedValue={Number(expectedMetrics[transformMetric(i, 'sentence')]?.value ?? null)}
              period={{ dateFrom: dateFrom.toISOString(), dateTo: dateTo.toISOString() }}
            />
          ))}
        </Stack>
        <Stack orientation="vertical" gap={spacing.xl}>
          {metricsSecondColumn.map((i) => (
            <ComparingCard
              key={i}
              average
              width={320}
              name={i}
              value={Number(realMetrics[transformMetric(i, 'sentence')]?.median_value ?? null)}
              expectedValue={Number(expectedMetrics[transformMetric(i, 'sentence')]?.value ?? null)}
              period={{ dateFrom: dateFrom.toISOString(), dateTo: dateTo.toISOString() }}
            />
          ))}
        </Stack>
      </Stack>
      <Stack alignItems="center" orientation="horizontal" gap={spacing.md}>
        <SectionTitle label="payment_status" />
        <InfoToggletip title="tooltips.payment_status" />
      </Stack>
      <RHFSelect
        direction="top"
        id="payment-status-select"
        name="status"
        label={capitalizeFirstLetter(`${translate('payment_status')}`)}
        options={Object.values(PaymentStatus).map((p) => ({
          value: p,
          label: capitalizeFirstLetter(translate(`constant_status.payment.${p}`))
        }))}
      />
    </Stack>
  )
}
