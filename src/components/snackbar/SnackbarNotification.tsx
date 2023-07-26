import { InlineNotification } from '@carbon/react'
import { CustomContentProps, SnackbarContent, useSnackbar } from 'notistack'
import { forwardRef, useCallback } from 'react'

const SnackbarNotification = forwardRef<
  HTMLDivElement,
  CustomContentProps & { link?: React.ReactNode }
>(({ id, variant, message, link }, ref) => {
  const { closeSnackbar } = useSnackbar()

  const handleDismiss = useCallback(() => {
    closeSnackbar(id)
  }, [id, closeSnackbar])
  return (
    <SnackbarContent ref={ref}>
      <InlineNotification
        kind={variant === 'default' ? 'success' : variant}
        lowContrast
        subtitle={message?.toString() ?? ''}
        onCloseButtonClick={handleDismiss}
      >
        {' '}
        {link}
      </InlineNotification>
    </SnackbarContent>
  )
})

export default SnackbarNotification
