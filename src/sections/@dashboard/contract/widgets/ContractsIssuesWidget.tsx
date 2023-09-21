import { DefinitionTooltip } from '@carbon/react'
import { IDashboardContract } from 'src/@types'
import { MiniList } from 'src/components/mini-list'
import { WidgetWrapper } from 'src/components/widgets'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'

export default function ContractsIssuesWidget({
  contracts
}: {
  contracts: IDashboardContract[] | null
}) {
  const { translate } = useLocales()

  const headers = [
    { header: `${translate('contract_name')}`, key: 'name' },
    { header: translate('isp'), key: 'isp' },
    { header: translate('number_of_schools'), key: 'numberOfSchools' },
    { header: translate('budget'), key: 'budget' }
  ] as const
  return (
    <WidgetWrapper
      title={
        <>
          {translate('widgets.contract_issues.title1')}{' '}
          <DefinitionTooltip
            openOnHover
            definition={
              <>
                {capitalizeFirstLetter(translate('tooltips.SLA.line1'))}
                <br />
                {translate('tooltips.SLA.line2')}
                <br />
                {translate('tooltips.SLA.line3')}
              </>
            }
          >
            SLA
          </DefinitionTooltip>{' '}
          {translate('widgets.contract_issues.title2')}
        </>
      }
      width="100%"
      height="50dvh"
    >
      <MiniList
        noDataText={translate('widgets.contract_issues.no_data')}
        data={contracts?.sort((a, b) => Number(b.numberOfSchools) - Number(a.numberOfSchools))}
        headers={headers}
      />
    </WidgetWrapper>
  )
}
