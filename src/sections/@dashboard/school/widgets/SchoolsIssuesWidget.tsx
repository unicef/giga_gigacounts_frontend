import { MiniList } from 'src/components/mini-list'
import { WidgetWrapper } from 'src/components/widgets'
import { ICONS } from 'src/constants'
import { useBusinessContext } from 'src/context/BusinessContext'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'

export function SchoolsIssuesWidget() {
  const { translate } = useLocales()
  const { schools } = useBusinessContext() 
  const { palette } = useTheme()

  const headers = [
    { label: `${translate('name')}`, key: 'name' },
    { label: translate('education_level'), key: 'education_level' }
  ] as const

  const filteredSchools = schools

  return (
    <WidgetWrapper
      Icon={ICONS.Education}
      iconColor={palette.error.main}
      title="Schools with SLA issues"
      width="33%"
      height="50%"
    >
      <MiniList
        noDataText="No schools have SLA issues"
        data={filteredSchools?.sort((a, b) => a.name.localeCompare(b.name))}
        headers={headers}
      />
    </WidgetWrapper>
  )
}
