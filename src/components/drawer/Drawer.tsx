import { Button } from '@carbon/react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { ICONS } from 'src/constants'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'

export default function DrawerContainer({
  header,
  content,
  footer,
  open,
  handleClose,
  closeDisabled
}: {
  header?: React.ReactNode
  content: React.ReactNode
  footer: React.ReactNode
  open: boolean
  handleClose: () => void
  closeDisabled?: boolean | false
}) {
  const { palette, spacing } = useTheme()
  const { translate } = useLocales()

  return (
    <Drawer
      style={{ width: '736px', height: '100dvh', overflowY: 'scroll' }}
      open={open}
      onClose={handleClose}
      direction="right"
    >
      {header && (
        <div
          style={{
            top: 0,
            position: 'sticky',
            minHeight: '17dvh',
            padding: spacing.xl,
            backgroundColor: palette.background.neutral,
            zIndex: 9101
          }}
        >
          <span
            style={{
              display: 'inline-block',
              position: 'absolute',
              right: spacing.md,
              top: spacing.xxs,
              width: 'auto',
              height: 'auto'
            }}
          >
            <Button
              kind="ghost"
              hasIconOnly
              tooltipPosition="bottom"
              renderIcon={ICONS.Close}
              iconDescription={translate('cancel')}
              onClick={handleClose}
              disabled={closeDisabled}
            />
          </span>
          {header}
        </div>
      )}
      <div>
        <div style={{ padding: spacing.xl, minHeight: header ? '83dvh' : '100dvh' }}>{content}</div>
        <div
          style={{
            zIndex: 9101,
            bottom: 0,
            backgroundColor: palette.background.default,
            padding: 0,
            position: 'sticky'
          }}
        >
          {footer}
        </div>
      </div>
    </Drawer>
  )
}
