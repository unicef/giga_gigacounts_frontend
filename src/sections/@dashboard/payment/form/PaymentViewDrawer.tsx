import { Button, TextInput } from '@carbon/react'
import { months } from 'moment'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  ContractDetails,
  ContractStatus,
  IContractPayment,
  IFrequency,
  PaymentStatus,
  Translation
} from 'src/@types'
import { getContractDetails } from 'src/api/contracts'
import { getDraft } from 'src/api/drafts'
import { AttachmentsList } from 'src/components/attachment-list'
import Drawer from 'src/components/drawer/Drawer'
import { InfoToggletip } from 'src/components/info-toggletip'
import { PercentageBar } from 'src/components/percentage-bar'
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
import { getContractSchoolDistribution } from 'src/utils/contracts'
import { parsePaymentStatus } from 'src/utils/status'
import { capitalizeFirstLetter, uncapitalizeFirstLetter } from 'src/utils/strings'

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
  const { translate } = useLocales()
  const parsedStatus = parsePaymentStatus(payment?.status)

  const { canAdd } = useAuthorization()
  const canChangeStatus =
    canAdd(Views.payment) && parsedStatus === PaymentStatus.OnHold && !contract.automatic

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

  const getPaymentLabel = (p: { month: number; year: number; day?: number }) =>
    p.day ? `${p.day}-${months(p.month)}-${p.year}` : `${p.year}-${months(p.month)}`

  const expectedMetrics = ['Uptime', 'Upload speed', 'Latency', 'Download speed'].map((name) =>
    item && item?.isContract ? item.expectedMetrics.find((m) => m.metricName === name) : null
  )

  const realMetrics = ['Uptime', 'Upload speed', 'Latency', 'Download speed'].map((name) =>
    item && item?.isContract ? item.connectionsMedian.find((m) => m.metric_name === name) : null
  )

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
          <SectionHeading heading="payment_status" />
          <TextInput
            value={capitalizeFirstLetter(
              translate(`constant_status.payment.${payment?.status as PaymentStatus}`)
            )}
            readOnly
            id="payment status select"
            name="status"
            labelText={capitalizeFirstLetter(`${translate('payment_status')}`)}
          />
          <SectionTitle label={translate('payment_period')} />
          <Stack orientation="horizontal" gap={spacing.xs}>
            <TextInput
              id="payment-period-select"
              value={capitalizeFirstLetter(
                translate(
                  uncapitalizeFirstLetter(paymentFrequency ?? STRING_DEFAULT) as Translation
                )
              )}
              readOnly
              labelText={capitalizeFirstLetter(`${translate('payment_frequency')}`)}
            />
            <TextInput
              value={payment?.paidDate ? getPaymentLabel(payment?.paidDate) : ''}
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

          <SectionTitle label={translate('connectivity_quality_check')} />
          {contract && (
            <>
              <Stack orientation="horizontal" gap={spacing.md} alignItems="center">
                <SectionHeading heading="connectivity_status_distribution" />
                <InfoToggletip title="" />
              </Stack>
              <SectionSubtitle subtitle="connectivity_status_distribution" />

              {item?.isContract && (
                <Stack orientation="horizontal" gap={spacing.md} alignItems="center">
                  <InfoToggletip title="" />
                  <PercentageBar
                    width={600}
                    data={getContractSchoolDistribution(item?.schoolsConnection)}
                  />
                </Stack>
              )}
            </>
          )}
          <Stack orientation="horizontal" gap={spacing.md} alignItems="center">
            <SectionHeading heading="quality_of_service_terms" />
            <InfoToggletip title="" />
          </Stack>
          <SectionSubtitle subtitle="quality_of_service" />

          <Stack
            orientation="horizontal"
            gap={spacing.xl}
            justifyContent="center"
            alignItems="center"
          >
            <Stack orientation="vertical" gap={spacing.xl}>
              <ComparingCard
                width={320}
                name="uptime"
                value={Number(realMetrics[0]?.median_value ?? null)}
                expectedValue={Number(expectedMetrics[0]?.value ?? null)}
              />
              <ComparingCard
                width={320}
                value={Number(realMetrics[1]?.median_value ?? null)}
                name="upload_speed"
                expectedValue={Number(expectedMetrics[1]?.value ?? null)}
              />
            </Stack>
            <Stack orientation="vertical" gap={spacing.xl}>
              <ComparingCard
                width={320}
                value={Number(realMetrics[2]?.median_value ?? null)}
                name="latency"
                expectedValue={Number(expectedMetrics[2]?.value ?? null)}
              />
              <ComparingCard
                width={320}
                value={Number(realMetrics[3]?.median_value ?? null)}
                name="download_speed"
                expectedValue={Number(expectedMetrics[3]?.value ?? null)}
              />
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
