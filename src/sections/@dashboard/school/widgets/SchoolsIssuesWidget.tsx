import { DefinitionTooltip } from '@carbon/react'
import { IDashboardSchools } from 'src/@types'
import { MiniList } from 'src/components/mini-list'
import { WidgetWrapper } from 'src/components/widgets'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'

export function SchoolsIssuesWidget({ schools }: { schools?: IDashboardSchools[] }) {
  const { translate } = useLocales()

  const headers = [
    { header: `${translate('name')}`, key: 'name' },
    { header: 'ID', key: 'external_id' },
    { header: translate('education_level'), key: 'education_level' }
  ] as const

  return (
    <WidgetWrapper
      title={
        <>
          {translate('widgets.school_issues.title1')}{' '}
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
          {translate('widgets.school_issues.title2')}
        </>
      }
      width="100%"
      height="50dvh"
    >
      <MiniList
        noDataText={translate('widgets.school_issues.no_data')}
        data={schools?.sort((a, b) => a.name.localeCompare(b.name))}
        headers={headers}
      />
    </WidgetWrapper>
  )
}
