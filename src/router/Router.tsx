import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Loading from 'src/pages/Loading'
import { useUser } from 'src/state/hooks'

const NotFound = lazy(() => import('src/pages/NotFound'))
const Login = lazy(() => import('src/components/Login'))
const Dashboard = lazy(() => import('src/pages/Dashboard'))
const Contract = lazy(() => import('src/pages/Contract'))
const CreateContractPage = lazy(() => import('src/pages/CreateContract'))

export const Router: React.FC = (): JSX.Element => {
  const user = useUser()

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="" element={<Login />} />
          <Route path="dashboard">
            <Route path="" element={!user.loading && user.data.name ? <Dashboard /> : <Navigate to="/" replace />} />
            <Route path="contract">
              <Route path="" element={<CreateContractPage />} />
              <Route path=":id" element={<Contract />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
