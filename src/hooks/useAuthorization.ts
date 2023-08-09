import { useCallback } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Views } from 'src/constants'
import { UserRoles } from 'src/@types'

export function useAuthorization() {
  const { user } = useAuthContext()
  const canAdd = (viewName: Views): boolean =>
    user?.role?.permissions.includes(`${viewName}.write`) || false
  const canEdit = (viewName: Views): boolean =>
    user?.role?.permissions.includes(`${viewName}.write`) || false
  const canDelete = (viewName: Views): boolean =>
    user?.role?.permissions.includes(`${viewName}.write`) || false
  const canView = (viewName: Views): boolean =>
    user?.role?.permissions.includes(`${viewName}.read`) || false

  const hasSomeRole = useCallback(
    (rolesToHave: UserRoles[]): boolean => {
      if (!user) {
        return false
      }
      const userRole = user?.role
      return userRole && rolesToHave.some((role) => userRole.code === role)
    },
    [user]
  )

  return { canAdd, canEdit, canDelete, canView, hasSomeRole }
}
