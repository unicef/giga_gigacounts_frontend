import { ContractDetails, PaymentStatus } from 'src/@types'
import { RHFSelect } from 'src/components/hook-form'
import { InfoToggletip } from 'src/components/info-toggletip'
import { PercentageBar } from 'src/components/percentage-bar'
import { ComparingCard } from 'src/components/qos-card'
import Stack from 'src/components/stack/Stack'
import { SectionHeading, SectionTitle, Typography } from 'src/components/typography'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { getContractSchoolDistribution } from 'src/utils/contracts'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Step2Props = {
  contract: ContractDetails | null
}

export default function Step2({ contract }: Step2Props) {
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
      <SectionTitle label="connectivity_quality_check" />
      {contract && contract.isContract && (
        <>
          <Stack orientation="horizontal" gap={spacing.md} alignItems="center">
            <InfoToggletip title="" />
            <Typography as="h5">
              {capitalizeFirstLetter(translate('connectivity_status_distribution'))}
            </Typography>
          </Stack>
          <Stack orientation="horizontal" gap={spacing.md} alignItems="center">
            <InfoToggletip title="" />
            <PercentageBar
              width={600}
              data={getContractSchoolDistribution(contract.schoolsConnection)}
            />
          </Stack>
        </>
      )}
      <Stack orientation="horizontal" gap={spacing.md} alignItems="center">
        <InfoToggletip title="" />
        <Typography as="h5">{capitalizeFirstLetter(translate('quality_of_service'))}</Typography>
      </Stack>
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
      <SectionHeading heading="set_payment_status" />
      <RHFSelect
        direction="top"
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
