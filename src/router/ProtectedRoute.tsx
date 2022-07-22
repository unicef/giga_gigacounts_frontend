import { LayoutRouteProps, Navigate, PathRouteProps, Route } from 'react-router-dom'
import { useUser } from 'src/state/hooks'

const ProtectedRoute = ({ children, element, ...props }: PathRouteProps | LayoutRouteProps) => {
  const user = useUser()

  return (
    <Route element={!user.loading && user.data.email ? element : <Navigate to="/" replace />} {...props}>
      {children}
    </Route>
  )
}

export default ProtectedRoute
