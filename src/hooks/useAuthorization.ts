import { useCallback } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import { UserRoles, Views } from 'src/constants/authorization'

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

  /*

  const canAdd = useCallback((viewName: Views) : boolean => {
    if (!user) {
      return false
    }
    return user?.role?.permissions.includes(`${viewName}.write`)
  }, [user])

  const canEdit = useCallback((viewName: Views) : boolean => {
    if (!user) {
      return false
    }
    return user?.role?.permissions.includes(`${viewName}.write`)
  }, [user])

  const canDelete = useCallback((viewName: Views) : boolean => {
    if (!user) {
      return false
    }
    return user?.role?.permissions.includes(`${viewName}.write`)
  }, [user])

  const canView = useCallback((viewName: Views) : boolean => {
    if (!user) {
      return false
    }
    return user?.role?.permissions.includes(`${viewName}.read`)
  }, [user])

  */

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
