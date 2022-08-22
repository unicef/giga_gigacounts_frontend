import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ContractGuide from 'src/components/Dashboard/Contracts/ContractGuide/ContractGuide'
import ContractsLayout from 'src/components/Layouts/ContractsLayout'
import Login from 'src/components/Login'
import Loader from 'src/components/common/Loader'
import NotFound from 'src/pages/NotFound'
import { useUser } from 'src/state/hooks'

const Contract = lazy(() => import('src/pages/Contract'))
const CreateContractPage = lazy(() => import('src/pages/CreateContract'))

export const Router: React.FC = (): JSX.Element => {
  const user = useUser()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route index element={<Login />} />
        <Route path="dashboard" element={<ContractsLayout />}>
          <Route index element={!user.loading && user.data.name ? <ContractGuide /> : <Navigate to="/" replace />} />
          <Route path="contract">
            <Route
              index
              element={
                <Suspense fallback={<Loader />}>
                  <CreateContractPage />
                </Suspense>
              }
            />

            <Route
              path=":contractId"
              element={
                <Suspense fallback={<Loader />}>
                  <Contract />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
