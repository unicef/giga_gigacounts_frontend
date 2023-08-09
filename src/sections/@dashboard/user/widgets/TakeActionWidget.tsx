import { MiniList } from 'src/components/mini-list'
import { WidgetWrapper } from 'src/components/widgets'
import { ICONS } from 'src/constants'
import { useBusinessContext } from 'src/context/BusinessContext'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'

export default function TakeActionWidget() {
  const { translate } = useLocales()
  const { notifications } = useBusinessContext()
  const { palette } = useTheme()

  const headers = [
    { label: `${translate('title')}`, key: 'title' },
    { label: translate('date'), key: 'sent_at' }
  ] as const

  const filteredNotifications = notifications

  return (
    <WidgetWrapper
      Icon={ICONS.Users}
      iconColor={palette.error.main}
      title="Actions requiring attention"
      width="33%"
      height="50%"
    >
      <MiniList
        noDataText="No actions to be taken"
        data={filteredNotifications?.sort((a, b) => a.sent_at.localeCompare(b.sent_at))}
        headers={headers}
      />
    </WidgetWrapper>
  )
}
