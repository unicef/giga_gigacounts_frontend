import { ContractDetails, PaymentStatus } from 'src/@types'
import { RHFSelect } from 'src/components/hook-form'
import { PercentageBar } from 'src/components/percentage-bar'
import { ComparingCard } from 'src/components/qos-card'
import Stack from 'src/components/stack/Stack'
import { Typography } from 'src/components/typography'
import SectionTitle from 'src/components/typography/SectionTitle'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { getContractSchoolDistribution } from 'src/utils/contracts'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Step2Props = {
  contract: ContractDetails | null
  viewOnly: boolean
}

export default function Step2({ contract, viewOnly }: Step2Props) {
  const { translate } = useLocales()
  const { spacing } = useTheme()

  const expectedMetrics = ['Uptime', 'Upload speed', 'Latency', 'Download speed'].map((name) =>
    contract && contract.isContract
      ? contract.expectedMetrics.find((m) => m.metricName === name)
      : null
  )

  const realMetrics = ['Uptime', 'Upload speed', 'Latency', 'Download speed'].map((name) =>
    contract && contract.isContract
      ? contract.connectionsMedian.find((m) => m.metric_name === name)
      : null
  )

  return (
    <Stack gap={spacing.xl}>
      <SectionTitle label={translate('connectivity_quality_check')} />
      {contract && contract.isContract && (
        <>
          <Typography as="h5">
            {capitalizeFirstLetter(translate('connectivity_status_distribution'))}
          </Typography>
          <PercentageBar
            width={600}
            data={getContractSchoolDistribution(contract.schoolsConnection)}
          />
        </>
      )}
      <Typography as="h5">{capitalizeFirstLetter(translate('quality_of_service'))}</Typography>
      <Stack orientation="horizontal" gap={spacing.xl} justifyContent="center" alignItems="center">
        <Stack orientation="vertical" gap={spacing.xl}>
          <ComparingCard
            name="uptime"
            value={Number(realMetrics[0]?.median_value ?? null)}
            expectedValue={Number(expectedMetrics[0]?.value ?? null)}
          />
          <ComparingCard
            value={Number(realMetrics[1]?.median_value ?? null)}
            name="upload_speed"
            expectedValue={Number(expectedMetrics[1]?.value ?? null)}
          />
        </Stack>
        <Stack orientation="vertical" gap={spacing.xl}>
          <ComparingCard
            value={Number(realMetrics[2]?.median_value ?? null)}
            name="latency"
            expectedValue={Number(expectedMetrics[2]?.value ?? null)}
          />
          <ComparingCard
            value={Number(realMetrics[3]?.median_value ?? null)}
            name="download_speed"
            expectedValue={Number(expectedMetrics[3]?.value ?? null)}
          />
        </Stack>
      </Stack>
      <Typography as="h5">{capitalizeFirstLetter(translate('set_payment_status'))}</Typography>
      <RHFSelect
        disabled={viewOnly}
        id="payment status select"
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
