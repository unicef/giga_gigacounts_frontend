import { FlexGrid, TextArea, InlineNotification, Theme } from '@carbon/react'
import { ContractDetails } from 'src/@types'
import { ContractInfo } from 'src/components/contract-info'
import { QosCard } from 'src/components/qos-card'
import { Stack } from 'src/components/stack'
import { SectionTitle, Typography } from 'src/components/typography'
import { STRING_DEFAULT } from 'src/constants/display-defaults'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { formatDate } from 'src/utils/date'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  contract: ContractDetails
  changeTab: (tab: number) => void
}
export default function OverviewTab({ contract, changeTab }: Props) {
  const { translate } = useLocales()
  const { spacing } = useTheme()
  const {
    name,
    startDate,
    endDate,
    country,
    lta,
    id,
    budget,
    launchDate,
    schools,
    currency,
    notes
  } = contract

  const uptime = contract.isContract
    ? contract.expectedMetrics.find((f) => f.metricName === 'Uptime')
    : contract.expectedMetrics.find((f) => f.name === 'Uptime')
  const latency = contract.isContract
    ? contract.expectedMetrics.find((f) => f.metricName === 'Latency')
    : contract.expectedMetrics.find((f) => f.name === 'Latency')
  const downloadSpeed = contract.isContract
    ? contract.expectedMetrics.find((f) => f.metricName === 'Download speed')
    : contract.expectedMetrics.find((f) => f.name === 'Download speed')
  const uploadSpeed = contract.isContract
    ? contract.expectedMetrics.find((f) => f.metricName === 'Upload speed')
    : contract.expectedMetrics.find((f) => f.name === 'Upload speed')

  return (
    <>
      <SectionTitle label={capitalizeFirstLetter(translate('contract_details'))} />
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
            title={translate('internet_provider')}
            value={contract.isContract ? contract.isp : contract.isp?.name ?? STRING_DEFAULT}
          />
          <ContractInfo
            style={{ padding: spacing.xs }}
            title={translate('start_date')}
            value={startDate ? formatDate(startDate) : STRING_DEFAULT}
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
            title="ISP contact person"
            value="Joe johnsons"
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
            title={translate('lta')}
            value={lta?.name ?? STRING_DEFAULT}
          />
          <ContractInfo
            style={{ padding: spacing.xs }}
            title={translate('launch_date')}
            value={launchDate ? formatDate(launchDate) : STRING_DEFAULT}
          />
        </Stack>
      </Stack>
      <SectionTitle label={capitalizeFirstLetter(translate('quality_of_service'))} />
      <Stack style={{ width: '100%' }} orientation="horizontal" gap={spacing.xl}>
        <Theme theme="g90">
          <QosCard
            subtitle={`${translate('contract')} ${translate('uptime')}`}
            width={300}
            name="uptime"
            value={uptime?.value ? Number(uptime.value) : null}
          />
        </Theme>
        <Theme theme="g90">
          <QosCard
            subtitle={`${translate('contract')} ${translate('latency')}`}
            width={300}
            name="latency"
            value={latency?.value ? Number(latency.value) : null}
          />
        </Theme>
        <Theme theme="g90">
          <QosCard
            subtitle={`${translate('contract')} ${translate('download_speed')}`}
            width={300}
            name="download_speed"
            value={downloadSpeed?.value ? Number(downloadSpeed.value) : null}
          />
        </Theme>
        <Theme theme="g90">
          <QosCard
            subtitle={`${translate('contract')} ${translate('upload_speed')}`}
            width={300}
            name="upload_speed"
            value={uploadSpeed?.value ? Number(uploadSpeed.value) : null}
          />
        </Theme>
      </Stack>
      <SectionTitle label={capitalizeFirstLetter(translate('collaborators'))} />
      <Typography as="h5">{translate('no_collaborators_added')}</Typography>
      <SectionTitle label={capitalizeFirstLetter(translate('schools_and_budget'))} />
      <FlexGrid narrow className="remove-gutters-2-columns" orientation="horizontal">
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

          {/* <Link onClick={() => changeTab(1)}>
            {translate('see_all_schools')} <ArrowRight />
          </Link> */}
        </Stack>
      </FlexGrid>
      <SectionTitle label={capitalizeFirstLetter(translate('comment_section.title'))} />
      {notes ? (
        <TextArea value={notes} disabled labelText="" rows={4} maxCount={5000} enableCounter />
      ) : (
        <Typography as="h4">{translate('no_comments_added')}</Typography>
      )}
    </>
  )
}
