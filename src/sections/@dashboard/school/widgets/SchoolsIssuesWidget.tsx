import { IDashboardSchools } from 'src/@types'
import { MiniList } from 'src/components/mini-list'
import { WidgetWrapper } from 'src/components/widgets'
import { useLocales } from 'src/locales'

export function SchoolsIssuesWidget({ schools }: { schools?: IDashboardSchools[] }) {
  const { translate } = useLocales()

  const headers = [
    { label: `${translate('name')}`, key: 'name' },
    { label: translate('education_level'), key: 'education_level' }
  ] as const

  return (
    <WidgetWrapper title={translate('widgets.school_issues.title')} width="100%" height="50dvh">
      <MiniList
        noDataText={translate('widgets.school_issues.no_data')}
        data={schools?.sort((a, b) => a.name.localeCompare(b.name))}
        headers={headers}
      />
    </WidgetWrapper>
  )
}
