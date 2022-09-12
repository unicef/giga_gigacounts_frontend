import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ContractGuide from 'src/components/Dashboard/Contracts/ContractGuide/ContractGuide'
import ContractsLayout from 'src/components/Layouts/ContractsLayout'
import Login from 'src/components/Login'
import Loader from 'src/components/common/Loader'
import NotFound from 'src/pages/NotFound'
import ProtectedRoute from './ProtectedRoute'
import UserProfileLayout from 'src/components/Layouts/UserProfileLayout'

const Contract = lazy(() => import('src/pages/Contract'))
const CreateContractPage = lazy(() => import('src/pages/CreateContract'))

export const Router: React.FC = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route index element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<ContractsLayout />}>
          <Route index element={<ContractGuide />} />
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
        <Route path="profile" element={<UserProfileLayout />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
