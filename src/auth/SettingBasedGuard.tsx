import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Error403 } from 'src/@types'
import LoadingScreen from 'src/components/loading-screen/LoadingScreen'
import { UserSettings } from 'src/constants'
import { useSettings } from 'src/hooks/useSettings'
import { useAuthContext } from './useAuthContext'

type SettingBasedGuardProps = {
  settings?: readonly { name: UserSettings; value: any }[]
  children: React.ReactNode
}

export default function SettingBasedGuard({ settings, children }: SettingBasedGuardProps) {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { hasAllSettings } = useSettings()

  useEffect(() => {
    if (!user) return
    if (settings && settings.length > 0 && !hasAllSettings([...settings]))
      Error403.redirect(navigate)
  }, [settings, navigate, hasAllSettings, user])
  if (!user) return <LoadingScreen />

  return <> {children} </>
}
