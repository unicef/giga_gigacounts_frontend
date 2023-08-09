import { SnackbarProvider as NotistackProvider, SnackbarKey } from 'notistack'
import { useRef } from 'react'
import { ICONS } from 'src/constants'
import SnackbarNotification from './SnackbarNotification'

declare module 'notistack' {
  interface VariantOverrides {
    success: {
      link?: React.ReactNode
    }
    info: {
      link?: React.ReactNode
    }
    warning: {
      link?: React.ReactNode
    }
    error: {
      link?: React.ReactNode
    }
  }
}

type Props = {
  children: React.ReactNode
}

export default function SnackbarProvider({ children }: Props) {
  const notistackRef = useRef<any>(null)
  const onClose = (key: SnackbarKey) => () => notistackRef.current.closeSnackbar(key)

  return (
    <NotistackProvider
      Components={{
        success: SnackbarNotification,
        error: SnackbarNotification,
        info: SnackbarNotification,
        warning: SnackbarNotification
      }}
      ref={notistackRef}
      maxSnack={5}
      preventDuplicate
      autoHideDuration={3000}
      variant="success"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      iconVariant={{
        success: <ICONS.SuccessFilled />,
        error: <ICONS.ErrorFilled />,
        info: <ICONS.InformationFilled />,
        warning: <ICONS.WarningFilled />
      }}
      action={(key) => <ICONS.Close style={{ cursor: 'pointer' }} onClick={onClose(key)} />}
    >
      {children}
    </NotistackProvider>
  )
}
