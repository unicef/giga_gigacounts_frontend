import { useCallback } from 'react'
import { UserRoles } from 'src/@types'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Views } from 'src/constants'

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
  const canApprove = (viewName: Views): boolean =>
    user?.role?.permissions.includes(`${viewName}.approve`) || false

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

  const hasAllPermissions = useCallback(
    (permissionsToHave: readonly string[]) => {
      if (!user || !user.role) {
        return false
      }
      const userPermissions = user.role.permissions
      return (
        userPermissions.length > 0 && permissionsToHave.every((p) => userPermissions.includes(p))
      )
    },
    [user]
  )

  return { canAdd, canEdit, canDelete, canView, hasSomeRole, canApprove, hasAllPermissions }
}
