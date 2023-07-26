import { ArrowRight, Notification, NotificationNew } from '@carbon/icons-react'
import {
  Button,
  ClickableTile,
  // @ts-ignore
  HeaderGlobalAction,
  Popover,
  PopoverContent,
  // @ts-ignore
  Tag
} from '@carbon/react'
import moment from 'moment'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { INotification, NotificationStatus } from 'src/@types'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { NOTIFICATION_STATUS_COLORS } from 'src/constants/status'
import { useBusinessContext } from 'src/context/BusinessContext'
import { useModal } from 'src/hooks/useModal'
import { Translation, useLocales } from 'src/locales'
import { ROUTES } from 'src/routes/paths'
import { useTheme } from 'src/theme'
import { parseNotificationStatus } from 'src/utils/status'
import { capitalizeFirstLetter, threeDots } from 'src/utils/strings'

export default function NotificationsPanel() {
  const { translate } = useLocales()
  const navigate = useNavigate()
  const { spacing } = useTheme()
  const popover = useModal()

  const { notifications, refetchNotifications, readManyNotifications } = useBusinessContext()

  const handleMarkAllAsRead = () => {
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
    return () => {
      window.clearInterval(interval)
    }
  }, [notifications, refetchNotifications])

  const now = moment()
  const yesterdaysMidNight = moment().startOf('day')
  const previousMidNight = moment().startOf('day').subtract(1, 'day')

  const todayNotifications = notifications.filter(
    (n) => moment(n.sent_at).diff(now) < 0 && moment(n.sent_at).diff(yesterdaysMidNight) > 0
  )
  const yesterdayNotifications = notifications.filter(
    (n) =>
      moment(n.sent_at).diff(yesterdaysMidNight) < 0 && moment(n.sent_at).diff(previousMidNight) > 0
  )
  const olderNotifications = notifications.filter(
    (n) =>
      todayNotifications.every((tn) => tn.id !== n.id) &&
      yesterdayNotifications.every((yn) => yn.id !== n.id)
  )

  const hasNotifications = notifications.length > 0
  const hasUnreadNotifications =
    notifications.filter((n) => n.status === NotificationStatus.SENT).length > 0

  return (
    <>
      <Typography style={{ alignSelf: 'center', padding: spacing.xs }}>
        {translate('notifications')}
      </Typography>
      <Popover isTabTip onRequestClose={popover.close} open={popover.value} align="bottom-right">
        <Stack orientation="horizontal">
          <HeaderGlobalAction
            tooltipAlignment="end"
            aria-label={translate('notifications')}
            isActive={popover.value}
            onClick={popover.toggle}
          >
            {hasUnreadNotifications ? <NotificationNew /> : <Notification />}
          </HeaderGlobalAction>
        </Stack>
        <PopoverContent>
          <div style={{ padding: spacing.md, height: '500px', width: '500px', overflow: 'scroll' }}>
            <Stack alignItems="center" justifyContent="space-between" orientation="horizontal">
              <Typography as="span">{translate('notifications')}</Typography>
              {hasNotifications && (
                <Button size="sm" kind="ghost" onClick={handleMarkAllAsRead}>
                  {capitalizeFirstLetter(translate('notifications_popover.dismiss_all'))}
                </Button>
              )}
            </Stack>

            <NotificationList
              list={todayNotifications}
              title="today"
              handleClosePopover={popover.close}
            />
            <NotificationList
              list={yesterdayNotifications}
              title="yesterday"
              handleClosePopover={popover.close}
            />
            <NotificationList
              list={olderNotifications}
              title="older"
              handleClosePopover={popover.close}
            />
            <Button
              style={{ position: 'absolute', right: spacing.md, bottom: spacing.md }}
              renderIcon={ArrowRight}
              kind="ghost"
              onClick={handleViewAll}
            >
              {capitalizeFirstLetter(translate('notifications_popover.view_all'))}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
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

      <Typography>{notification.message}</Typography>
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
  title: Translation
}) => {
  const { spacing, palette } = useTheme()
  const { translate } = useLocales()
  return (
    <Stack gap={spacing.xs}>
      <Typography
        style={{
          backgroundColor: palette.common.black,
          padding: spacing.xxs,
          marginTop: spacing.md
        }}
        as="h6"
        variant="textSecondary"
      >
        {capitalizeFirstLetter(translate(title))}
      </Typography>

      {list.length > 0 ? (
        <Stack gap={spacing.xs}>
          {list.map((n) => (
            <NotificationItem handleClosePopover={handleClosePopover} key={n.id} notification={n} />
          ))}
        </Stack>
      ) : (
        <Typography as="span">{translate('notifications_popover.empty')}</Typography>
      )}
    </Stack>
  )
}
