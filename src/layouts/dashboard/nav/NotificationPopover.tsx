import {
  Button,
  ClickableTile,
  HeaderGlobalAction,
  Popover,
  PopoverContent,
  Tag,
  Theme
} from '@carbon/react'
import { groupBy } from 'lodash'
import moment from 'moment'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { INotification, NotificationStatus, Translation } from 'src/@types'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { ICONS, NOTIFICATION_STATUS_COLORS } from 'src/constants'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { ROUTES } from 'src/routes/paths'
import { useTheme } from 'src/theme'
import { formatDate } from 'src/utils/date'
import { parseNotificationStatus } from 'src/utils/status'
import { capitalizeFirstLetter, threeDots } from 'src/utils/strings'

export default function NotificationsPanel() {
  const { translate } = useLocales()
  const navigate = useNavigate()
  const { spacing, palette } = useTheme('white')
  const popover = useModal()

  const { notifications, refetchNotifications, readManyNotifications } = useBusinessContext()

  const handleMarkAllAsRead = () => {
    if (!notifications) return
    const ids: string[] = notifications.map((notification: INotification) => notification.id)
    readManyNotifications(ids).finally(refetchNotifications)
  }

  const handleViewAll = () => {
    navigate(ROUTES.dashboard.user.notifications.route)
    popover.close()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      refetchNotifications()
    }, parseInt(process.env.REACT_APP_NOTIFICATIONS_REFRESH_INTERVAL_MS || '10000', 10))
    return () => window.clearInterval(interval)
  }, [notifications, refetchNotifications])

  const yesterdaysMidNight = moment().startOf('day')
  const previousMidNight = moment().startOf('day').subtract(1, 'day')

  const getListTitle = (date: string) => {
    if (moment(date).diff(yesterdaysMidNight) === 0) return 'today'
    if (moment(date).diff(previousMidNight) === 0) return 'yesterday'
    return formatDate(date, '/')
  }

  const hasNotifications = notifications && notifications.length > 0
  const hasUnreadNotifications =
    notifications && notifications.filter((n) => n.status === NotificationStatus.SENT).length > 0

  const notificationsByDay = groupBy(notifications, (n) => moment(n.sent_at).startOf('day'))

  return (
    <Popover isTabTip onRequestClose={popover.close} open={popover.value} align="bottom-right">
      <Stack orientation="horizontal">
        <HeaderGlobalAction
          id="notifications-popover"
          tooltipAlignment="end"
          aria-label={translate('notifications')}
          isActive={popover.value}
          onClick={popover.toggle}
        >
          {hasUnreadNotifications ? <ICONS.NotificationNew /> : <ICONS.Notification />}
        </HeaderGlobalAction>
      </Stack>

      <PopoverContent>
        <Theme theme="white">
          <div
            style={{
              paddingTop: spacing.md,
              paddingInline: spacing.md,
              height: '500px',
              width: '500px',
              overflow: 'scroll'
            }}
          >
            <Stack alignItems="center" justifyContent="space-between" orientation="horizontal">
              <Typography as="span">{translate('notifications')}</Typography>
              {hasNotifications && (
                <Button size="sm" kind="ghost" onClick={handleMarkAllAsRead}>
                  {capitalizeFirstLetter(translate('notifications_popover.dismiss_all'))}
                </Button>
              )}
            </Stack>
            {Object.entries(notificationsByDay).map(([key, value]) => (
              <NotificationList
                key={key}
                list={value}
                title={getListTitle(key)}
                handleClosePopover={popover.close}
              />
            ))}
            {hasNotifications ? (
              <Stack
                style={{
                  width: '100%',
                  minHeight: '10%',
                  bottom: 0,
                  backgroundColor: palette.background.default,
                  paddingBlock: spacing.sm,
                  position: 'sticky'
                }}
                alignItems="flex-end"
                justifyContent="flex-end"
                orientation="horizontal"
              >
                <Button renderIcon={ICONS.Continue} kind="ghost" onClick={handleViewAll}>
                  {capitalizeFirstLetter(translate('notifications_popover.view_all'))}
                </Button>
              </Stack>
            ) : (
              <Typography style={{ marginBlock: spacing.lg }}>
                {translate('notifications_popover.empty')}
              </Typography>
            )}
          </div>
        </Theme>
      </PopoverContent>
    </Popover>
  )
}

function NotificationItem({
  notification,
  handleClosePopover
}: {
  notification: INotification
  handleClosePopover: () => void
}) {
  const { spacing } = useTheme()
  const parsedStatus = parseNotificationStatus(notification.status)
  const { translate } = useLocales()
  const navigate = useNavigate()
  return (
    <ClickableTile
      style={{ padding: spacing.xs }}
      onClick={() => {
        handleClosePopover()
        navigate(ROUTES.dashboard.user.notifications.route)
      }}
    >
      <Stack orientation="horizontal" justifyContent="space-between" alignItems="center">
        <Typography variant="disabled">
          {new Date(notification.sent_at ?? '').toISOString().slice(11, 16)}
        </Typography>
        <Tag type={NOTIFICATION_STATUS_COLORS[parsedStatus]}>
          {capitalizeFirstLetter(translate(`constant_status.notification.${parsedStatus}`))}
        </Tag>
      </Stack>

      <Typography variant="textSecondary" style={{ marginBottom: spacing.xxs }}>
        {threeDots(notification.title, 30)}
      </Typography>
      <Typography>{(() => notification.message)()}</Typography>
    </ClickableTile>
  )
}

const NotificationList = ({
  list,
  title,
  handleClosePopover
}: {
  handleClosePopover: () => void
  list: INotification[]
  title: string
}) => {
  const { spacing, palette } = useTheme()
  const { translate } = useLocales()
  return (
    <Stack gap={spacing.xs}>
      <Typography
        style={{
          backgroundColor: palette.background.paper,
          padding: spacing.xxs,
          marginTop: spacing.md
        }}
        as="h6"
        variant="textSecondary"
      >
        {capitalizeFirstLetter(translate(title as Translation))}
      </Typography>

      {list.length > 0 && (
        <Stack gap={spacing.xs}>
          {list.map((n) => (
            <NotificationItem handleClosePopover={handleClosePopover} key={n.id} notification={n} />
          ))}
        </Stack>
      )}
    </Stack>
  )
}
