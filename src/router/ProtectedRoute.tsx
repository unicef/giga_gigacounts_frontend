import { Navigate, Outlet } from 'react-router-dom'
import Loader from 'src/components/common/Loader'
import DefaultLayout from 'src/components/Layouts/DefaultLayout'
import { useUser } from 'src/state/hooks'

const ProtectedRoute = () => {
  const user = useUser()

  if (user.loading) {
    return (
      <DefaultLayout>
        <Loader />
      </DefaultLayout>
    )
  }

  if (user.data.email) {
    return <Outlet />
  }

  return <Navigate to="/" replace />
}

export default ProtectedRoute
