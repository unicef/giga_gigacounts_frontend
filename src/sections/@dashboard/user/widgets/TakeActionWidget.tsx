import { MiniList } from 'src/components/mini-list'
import { WidgetWrapper } from 'src/components/widgets'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useLocales } from 'src/locales'
import { formatDate } from 'src/utils/date'

export default function TakeActionWidget() {
  const { translate } = useLocales()
  const { notifications } = useBusinessContext()

  const headers = [
    { label: `${translate('title')}`, key: 'title' },
    { label: translate('date'), key: 'sent_at' }
  ] as const

  const filteredNotifications = notifications?.filter((n) => n.priority === 1)

  return (
    <WidgetWrapper title={translate('widgets.take_action.title')} width="100%" height="50dvh">
      <MiniList
        transformData={{
          sent_at: (sent_at) => formatDate(sent_at)
        }}
        noDataText={translate('widgets.take_action.no_data')}
        data={filteredNotifications?.sort((a, b) => a.sent_at.localeCompare(b.sent_at))}
        headers={headers}
      />
    </WidgetWrapper>
  )
}
