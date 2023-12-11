import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import LoadingScreen from 'src/components/loading-screen/LoadingScreen'
import { ROUTES } from 'src/routes/paths'
import { AuthUserType } from './types'

type ApprovalBasedGuardProps = {
  children: React.ReactNode
  user: AuthUserType | null
}

export default function ApprovalBasedGuard({ children, user }: ApprovalBasedGuardProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return
    if (!user.approved) navigate(ROUTES.notVerified.route)
  }, [navigate, user])

  if (!user) return <LoadingScreen />

  return <> {children} </>
}
