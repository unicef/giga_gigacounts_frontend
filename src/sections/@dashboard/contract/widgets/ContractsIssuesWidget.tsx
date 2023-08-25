import { IDashboardContract } from 'src/@types'
import { MiniList } from 'src/components/mini-list'
import { WidgetWrapper } from 'src/components/widgets'
import { useLocales } from 'src/locales'

export default function ContractsIssuesWidget({
  contracts
}: {
  contracts: IDashboardContract[] | null
}) {
  const { translate } = useLocales()

  const headers = [
    { label: `${translate('contract_name')}`, key: 'name' },
    { label: translate('isp'), key: 'isp' },
    { label: translate('number_of_schools'), key: 'numberOfSchools' },
    { label: translate('budget'), key: 'budget' }
  ] as const

  return (
    <WidgetWrapper title={translate('widgets.contract_issues.title')} width="100%" height="50dvh">
      <MiniList
        noDataText={translate('widgets.contract_issues.no_data')}
        data={contracts?.sort((a, b) => Number(b.numberOfSchools) - Number(a.numberOfSchools))}
        headers={headers}
      />
    </WidgetWrapper>
  )
}
