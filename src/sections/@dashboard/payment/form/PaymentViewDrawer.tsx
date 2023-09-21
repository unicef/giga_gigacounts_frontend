import { Button, TextInput } from '@carbon/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  ContractDetails,
  ContractStatus,
  IContractPayment,
  IFrequency,
  IPaymentConnection,
  MetricSnake,
  PaymentStatus,
  Translation
} from 'src/@types'
import { getContractDetails } from 'src/api/contracts'
import { getDraft } from 'src/api/drafts'
import { getPaymentConnection } from 'src/api/payments'
import { AttachmentsList } from 'src/components/attachment-list'
import Drawer from 'src/components/drawer/Drawer'
import { InfoToggletip } from 'src/components/info-toggletip'
import { ComparingCard } from 'src/components/qos-card'
import { Stack } from 'src/components/stack'
import {
  SectionHeading,
  SectionSubtitle,
  SectionTitle,
  Typography
} from 'src/components/typography'
import { ICONS, STRING_DEFAULT, Views } from 'src/constants'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useLocales } from 'src/locales'
import { redirectOnError } from 'src/pages/errors/handlers'
import { useTheme } from 'src/theme'
import { formatDate } from 'src/utils/date'
import { transformMetric } from 'src/utils/metrics'
import { getPeriodLabel } from 'src/utils/payments'
import { parsePaymentStatus } from 'src/utils/status'
import { capitalizeFirstLetter, uncapitalizeFirstLetter } from 'src/utils/strings'
import { PaymentConnectivityBar } from '../graph'

interface Props {
  contract: ContractDetails | { id: string; status: ContractStatus; automatic: boolean }
  payment?: IContractPayment
  onClose: VoidFunction
  open: boolean
  handleEdit: () => void
  paymentFrequency: IFrequency['name']
}

export default function PaymentViewDrawer({
  contract,
  open,
  payment,
  onClose,
  paymentFrequency,
  handleEdit
}: Props) {
  const navigate = useNavigate()
  const { spacing } = useTheme()
  const { translate, translateCapitalized, replaceTranslated, replaceTwoTranslated } = useLocales()
  const parsedStatus = payment ? parsePaymentStatus(payment.status) : null

  const [paymentConnection, setPaymentConnection] = useState<IPaymentConnection>()

  useEffect(() => {
    if (payment?.paidDate && contract.id)
      getPaymentConnection(Number(contract.id), payment.paidDate).then(setPaymentConnection)
  }, [payment?.paidDate, contract.id])

  const { canAdd } = useAuthorization()
  const canChangeStatus =
    canAdd(Views.payment) && parsedStatus === PaymentStatus.Draft && !contract.automatic

  const [item, setItem] = useState<ContractDetails | null>(null)

  useEffect(() => {
    if (!contract) return
    if (Object.keys(contract).includes('isContract')) setItem(contract as ContractDetails)
    else if ((contract as { id: string; status: ContractStatus }).status === ContractStatus.Draft)
      getDraft(contract.id)
        .then((res) => setItem({ ...res, isContract: false }))
        .catch((err) => redirectOnError(navigate, err))
    else
      getContractDetails(contract.id)
        .then((res) => setItem({ ...res, isContract: true }))
        .catch((err) => redirectOnError(navigate, err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract])

  const metricsFirstColumn = [MetricSnake.Uptime, MetricSnake.UploadSpeed] as const
  const metricsSecondColumn = [MetricSnake.Latency, MetricSnake.DownloadSpeed] as const
  const sentenceMetrics = [
    ...metricsFirstColumn.map((m) => transformMetric(m, 'sentence')),
    ...metricsSecondColumn.map((m) => transformMetric(m, 'sentence'))
  ]

  const expectedMetrics = Object.fromEntries(
    sentenceMetrics.map((name) => [
      name,
      item && item?.isContract ? item.expectedMetrics.find((m) => m.metricName === name) : null
    ])
  )

  const realMetrics = Object.fromEntries(
    sentenceMetrics.map((name) => [
      name,
      item && item?.isContract ? item.connectionsMedian.find((m) => m.metric_name === name) : null
    ])
  )

  const periodLabel = payment?.paidDate ? getPeriodLabel(payment?.paidDate) : ''
  const hasDay = payment?.paidDate.day
  const translatedLabel =
    periodLabel && hasDay
      ? `${periodLabel.split('-')[0]}-${translateCapitalized(
          periodLabel.split('-')[1] as Translation
        )}-${periodLabel.split('-')[2]}`
      : `${translateCapitalized(periodLabel.split('-')[0] as Translation)}-${
          periodLabel.split('-')[1]
        }`

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
    <Drawer
      open={open}
      header={
        <Stack orientation="vertical" justifyContent="center" alignItems="center">
          <SectionTitle label={`${payment ? payment.description : translate('payment_detail')}`} />
        </Stack>
      }
      handleClose={onClose}
      content={
        <>
          <SectionTitle label={translate('payment_detail')} />
          <Stack orientation="horizontal" gap={spacing.xs}>
            <TextInput
              id="payment-description"
              readOnly
              labelText={capitalizeFirstLetter(translate('description'))}
              value={payment?.description}
            />
            <TextInput
              id="payment-contract-id"
              readOnly
              labelText={capitalizeFirstLetter(translate('contract_id'))}
              value={item?.id}
            />
          </Stack>
          <Stack orientation="horizontal" gap={spacing.xs} style={{ marginTop: spacing.lg }}>
            <TextInput
              id="payment-currency"
              readOnly
              type="text"
              labelText={capitalizeFirstLetter(translate('currency'))}
              value={payment?.currency?.code}
            />
            <TextInput
              id="payment-amount"
              readOnly
              type="number"
              labelText={capitalizeFirstLetter(translate('amount'))}
              value={payment?.amount}
            />
            <TextInput
              id="payment-discount"
              readOnly
              type="number"
              labelText={capitalizeFirstLetter(translate('discount'))}
              value={payment?.discount}
            />
          </Stack>
          <Stack orientation="horizontal" gap={spacing.xs} style={{ marginTop: spacing.lg }}>
            <TextInput
              value={capitalizeFirstLetter(
                translate(`constant_status.payment.${payment?.status as PaymentStatus}`)
              )}
              readOnly
              id="payment status select"
              name="status"
              labelText={capitalizeFirstLetter(`${translate('payment_status')}`)}
            />
          </Stack>
          <SectionTitle label={translate('payment_period')} />
          <Stack orientation="horizontal" gap={spacing.xs}>
            <TextInput
              id="payment-frequency-select"
              value={capitalizeFirstLetter(
                translate(
                  uncapitalizeFirstLetter(paymentFrequency ?? STRING_DEFAULT) as Translation
                )
              )}
              readOnly
              labelText={capitalizeFirstLetter(`${translate('payment_frequency')}`)}
            />
            <TextInput
              value={periodLabel ? translatedLabel : ''}
              id="payment period select"
              readOnly
              labelText={capitalizeFirstLetter(`${translate('period')}`)}
            />
          </Stack>
          <SectionHeading heading="invoice" />
          <SectionSubtitle subtitle="find_the_invoice" />
          {payment?.invoice ? (
            <AttachmentsList attachments={[{ ...payment.invoice, status: 'complete' }]} />
          ) : (
            <Typography variant="disabled">{translate('no_attachments_added')}</Typography>
          )}
          <SectionHeading heading="receipt" />
          <SectionSubtitle subtitle="find_the_receipt" />
          {payment?.receipt ? (
            <AttachmentsList attachments={[{ ...payment.receipt, status: 'complete' }]} />
          ) : (
            <Typography variant="disabled">{translate('no_attachments_added')}</Typography>
          )}

          {contract && item?.isContract && (
            <>
              <SectionTitle
                label={translate('connectivity_quality_check')}
                subtitle={
                  `${replaceTwoTranslated(
                    'from_date_to_date',
                    '{{dateFrom}}',
                    '{{dateTo}}',
                    formatDate(payment?.dateFrom, '/') as Translation,
                    formatDate(payment?.dateTo, '/')
                  )} ${translate('for')} ${replaceTranslated(
                    'number_schools',
                    '{{number}}',
                    item.numberOfSchools as Translation
                  )}` as Translation
                }
              />
              <Stack orientation="horizontal" alignItems="center" gap={spacing.md}>
                <SectionHeading weight={400} heading="connectivity_distribution_by_status" />
                <InfoToggletip
                  title={
                    <>
                      <Typography>
                        {translate('tooltips.connectivity_distribution_status.line1')}
                      </Typography>
                      <Typography>
                        {replaceTranslated(
                          'tooltips.connectivity_distribution_status.line2',
                          '{{number}}',
                          item.numberOfSchools as Translation
                        )}
                      </Typography>
                      <Typography>
                        {replaceTwoTranslated(
                          'tooltips.connectivity_distribution_status.line3',
                          '{{dateFrom}}',
                          '{{dateTo}}',
                          formatDate(payment?.dateFrom, '/') as Translation,
                          formatDate(payment?.dateTo, '/')
                        )}
                      </Typography>
                    </>
                  }
                />
              </Stack>
              <PaymentConnectivityBar
                data={absolutePerecentages}
                dateFrom={payment?.dateFrom}
                dateTo={payment?.dateTo}
                numberOfSchools={item.numberOfSchools}
                variant="status"
              />
              <Stack orientation="horizontal" alignItems="center" gap={spacing.md}>
                <SectionHeading weight={400} heading="connectivity_distribution_by_days" />
                <InfoToggletip
                  title={
                    <>
                      <Typography>
                        {translate('tooltips.connectivity_distribution_days.line1')}
                      </Typography>
                      <Typography>
                        {replaceTranslated(
                          'tooltips.connectivity_distribution_days.line2',
                          '{{number}}',
                          item.numberOfSchools as Translation
                        )}
                      </Typography>
                      <Typography>
                        {replaceTwoTranslated(
                          'tooltips.connectivity_distribution_days.line3',
                          '{{dateFrom}}',
                          '{{dateTo}}',
                          formatDate(payment?.dateFrom, '/') as Translation,
                          formatDate(payment?.dateTo, '/')
                        )}
                      </Typography>
                    </>
                  }
                />
              </Stack>
              <PaymentConnectivityBar
                data={daysPercentages}
                dateFrom={payment?.dateFrom}
                dateTo={payment?.dateTo}
                numberOfSchools={item.numberOfSchools}
                variant="days"
              />
            </>
          )}
          <Stack
            orientation="horizontal"
            gap={spacing.md}
            style={{ marginTop: spacing.lg }}
            alignItems="center"
          >
            <SectionHeading weight={400} heading="quality_of_service_comparison" />
            <InfoToggletip
              title={
                <>
                  <Typography>
                    {translate('tooltips.quality_of_service_comparison.line1')}
                  </Typography>
                  <Typography>
                    {replaceTwoTranslated(
                      'tooltips.quality_of_service_comparison.line2',
                      '{{dateFrom}}',
                      '{{dateTo}}',
                      formatDate(payment?.dateFrom, '/') as Translation,
                      formatDate(payment?.dateTo, '/')
                    )}
                  </Typography>
                </>
              }
            />
          </Stack>

          <Stack
            orientation="horizontal"
            gap={spacing.xl}
            justifyContent="center"
            alignItems="center"
          >
            <Stack orientation="vertical" gap={spacing.xl}>
              {metricsFirstColumn.map((i) => (
                <ComparingCard
                  key={i}
                  average
                  width={320}
                  name={i}
                  value={Number(realMetrics[transformMetric(i, 'sentence')]?.median_value ?? null)}
                  expectedValue={Number(
                    expectedMetrics[transformMetric(i, 'sentence')]?.value ?? null
                  )}
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
                  expectedValue={Number(
                    expectedMetrics[transformMetric(i, 'sentence')]?.value ?? null
                  )}
                />
              ))}
            </Stack>
          </Stack>
        </>
      }
      footer={
        <Stack orientation="horizontal">
          <Button
            style={{ width: canChangeStatus ? '50%' : '100%' }}
            className="btn-max-width-limit"
            kind="secondary"
            onClick={onClose}
            renderIcon={ICONS.Close}
          >
            {capitalizeFirstLetter(translate('close'))}
          </Button>
          {canChangeStatus && (
            <Button
              style={{ width: '50%' }}
              className="btn-max-width-limit"
              kind="primary"
              onClick={handleEdit}
              renderIcon={ICONS.Edit}
            >
              {capitalizeFirstLetter(translate('edit'))}
            </Button>
          )}
        </Stack>
      }
    />
  )
}
