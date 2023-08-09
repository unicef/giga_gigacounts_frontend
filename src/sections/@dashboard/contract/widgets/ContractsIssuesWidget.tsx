import { ContractStatus } from 'src/@types'
import { MiniList } from 'src/components/mini-list'
import { WidgetWrapper } from 'src/components/widgets'
import { ICONS } from 'src/constants'
import { useBusinessContext } from 'src/context/BusinessContext'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'

export default function ContractsIssuesWidget() {
  const { translate } = useLocales()
  const { contracts } = useBusinessContext()
  const { palette } = useTheme()

  const headers = [
    { label: `${translate('contract_name')}`, key: 'name' },
    { label: translate('isp'), key: 'isp' },
    { label: translate('number_of_schools'), key: 'numberOfSchools' },
    { label: translate('budget'), key: 'budget' }
  ] as const

  const filteredContracts = contracts?.filter((c) => c.status !== ContractStatus.Draft)

  return (
    <WidgetWrapper
      Icon={ICONS.Contract}
      iconColor={palette.error.main}
      title="Contracts with SLA issues"
      width="33%"
      height="50%"
    >
      <MiniList
        noDataText="No contracts have SLA issues"
        data={filteredContracts?.sort(
          (a, b) => Number(b.numberOfSchools) - Number(a.numberOfSchools)
        )}
        headers={headers}
      />
    </WidgetWrapper>
  )
}
