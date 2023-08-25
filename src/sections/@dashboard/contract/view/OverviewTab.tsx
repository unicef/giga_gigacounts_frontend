import { Button, InlineNotification, TextArea } from '@carbon/react'
import { ContractDetails } from 'src/@types'
import { ContractInfo } from 'src/components/contract-info'
import { ComparingCard } from 'src/components/qos-card'
import { Stack } from 'src/components/stack'
import { SectionTitle, Typography } from 'src/components/typography'
import { UserList } from 'src/components/user'
import { ICONS, STRING_DEFAULT } from 'src/constants'
import useCopyToClipboard from 'src/hooks/useCopyToClipboard'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { formatDate } from 'src/utils/date'
import { capitalizeFirstLetter } from '../../../../utils/strings'

type Props = {
  contract: ContractDetails
  expectedValues: { uptime: number; latency: number; downloadSpeed: number; uploadSpeed: number }
}
export default function OverviewTab({ contract, expectedValues }: Props) {
  const { translate } = useLocales()
  const { spacing } = useTheme()
  const { copy } = useCopyToClipboard()
  const { pushInfo } = useSnackbar()

  const {
    name,
    startDate,
    endDate,
    country,
    id,
    budget,
    launchDate,
    schools,
    currency,
    notes,
    breakingRules
  } = contract

  const actual = contract.isContract
    ? {
        uptime:
          contract.connectionsMedian.find((f) => f.metric_name === 'Uptime')?.median_value ?? 0,
        latency:
          contract.connectionsMedian.find((f) => f.metric_name === 'Latency')?.median_value ?? 0,
        downloadSpeed:
          contract.connectionsMedian.find((f) => f.metric_name === 'Download speed')
            ?.median_value ?? 0,
        uploadSpeed:
          contract.connectionsMedian.find((f) => f.metric_name === 'Upload speed')?.median_value ??
          0
      }
    : {
        uptime: 0,
        latency: 0,
        downloadSpeed: 0,
        uploadSpeed: 0
      }

  return (
    <>
      <Stack
        orientation="horizontal"
        style={{ width: '100%' }}
        alignItems="center"
        justifyContent="flex-end"
      >
        <Button
          renderIcon={ICONS.Copy}
          size="sm"
          kind="tertiary"
          onClick={() => {
            copy(window.location.toString())
            pushInfo('copied_link')
          }}
        >
          {capitalizeFirstLetter(translate('share_contract_details'))}
        </Button>
      </Stack>
      <SectionTitle label="contract_details" />
      {contract.automatic && (
        <InlineNotification
          kind="info"
          subtitle={translate('automatic_contracts_check_info')}
          lowContrast
        />
      )}

      <Stack orientation="horizontal" style={{ width: '100%' }} gap={spacing.xl}>
        <Stack
          style={{ width: '330px' }}
          justifyItems="space-between"
          alignContent="center"
          orientation="vertical"
        >
          <ContractInfo
            style={{ padding: spacing.xs }}
            title={translate('contract_name')}
            value={name}
          />
          <ContractInfo
            style={{ padding: spacing.xs }}
            title={translate('start_date')}
            value={startDate ? formatDate(startDate) : STRING_DEFAULT}
          />
          <ContractInfo
            style={{ padding: spacing.xs }}
            title={translate('internet_provider')}
            value={contract.isContract ? contract.isp : contract.isp?.name ?? STRING_DEFAULT}
          />
        </Stack>
        <Stack
          style={{ width: '330px' }}
          justifyItems="space-between"
          alignContent="center"
          orientation="vertical"
        >
          <ContractInfo
            style={{ padding: spacing.xs }}
            title={translate('contract_id')}
            value={id}
          />

          <ContractInfo
            style={{ padding: spacing.xs }}
            title={translate('end_date')}
            value={endDate ? formatDate(endDate) : STRING_DEFAULT}
          />
        </Stack>
        <Stack
          style={{ width: '330px' }}
          justifyItems="space-between"
          alignContent="center"
          orientation="vertical"
        >
          <ContractInfo
            style={{ padding: spacing.xs }}
            title={translate('country')}
            value={country?.name ?? STRING_DEFAULT}
          />

          <ContractInfo
            style={{ padding: spacing.xs }}
            title={translate('launch_date')}
            value={launchDate ? formatDate(launchDate) : STRING_DEFAULT}
          />
        </Stack>
      </Stack>
      <SectionTitle label="quality_of_service" />
      <Stack style={{ width: '100%' }} orientation="horizontal" gap={spacing.xl}>
        <Stack orientation="vertical" gap={spacing.xl}>
          <ComparingCard
            width={300}
            name="uptime"
            expectedValue={expectedValues.uptime}
            value={actual.uptime}
          />
          <ComparingCard
            width={300}
            name="latency"
            expectedValue={expectedValues.latency}
            value={actual.latency}
          />
        </Stack>
        <Stack orientation="vertical" gap={spacing.xl}>
          <ComparingCard
            width={300}
            name="download_speed"
            expectedValue={expectedValues.downloadSpeed}
            value={actual.downloadSpeed}
          />
          <ComparingCard
            width={300}
            name="upload_speed"
            expectedValue={expectedValues.uploadSpeed}
            value={actual.uploadSpeed}
          />
        </Stack>
      </Stack>
      <SectionTitle label="isp_contacts" />
      <UserList users={contract.ispContacts} />
      <SectionTitle label="contract_team" />
      <UserList users={contract.stakeholders} />

      <SectionTitle label="schools_and_budget" />
      <Stack gap={spacing.md}>
        <Stack
          orientation="horizontal"
          gap={spacing.md}
          justifyContent="flex-start"
          alignItems="center"
        >
          <ContractInfo
            style={{ width: '330px' }}
            title={translate('budget')}
            value={Number(budget) ? `${currency?.code ?? ''} ${budget}` : STRING_DEFAULT}
          />
          <ContractInfo
            style={{ width: '330px' }}
            title={translate('schools')}
            value={
              schools.length > 0
                ? `${String(schools.length)} ${translate('schools')}`
                : STRING_DEFAULT
            }
          />
        </Stack>
      </Stack>
      <SectionTitle label="comment_section.title" />
      {notes ? (
        <TextArea value={notes} readOnly labelText="" rows={4} maxCount={1000} enableCounter />
      ) : (
        <Typography as="span" variant="disabled">
          {translate('no_comments_added')}
        </Typography>
      )}

      <SectionTitle label="breaking_rules" />
      {breakingRules ? (
        <TextArea
          value={breakingRules}
          readOnly
          labelText=""
          rows={4}
          maxCount={1000}
          enableCounter
        />
      ) : (
        <Typography as="span" variant="disabled">
          {translate('no_breaking_rules')}
        </Typography>
      )}
    </>
  )
}
