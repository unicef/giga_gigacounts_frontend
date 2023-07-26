import { Navigate, useRoutes } from 'react-router-dom'
import { Web3ContextProvider } from 'src/context/web3/Web3Context'
import AuthGuard from 'src/auth/AuthGuard'
import GuestGuard from 'src/auth/GuestGuard'
import { PATH_AFTER_LOGIN } from 'src/config-global'
import DashboardLayout from 'src/layouts/dashboard'
import {
  ConnectivityListPage,
  ContractDetailsPage,
  ContractsListPage,
  FeedbackPage,
  GeneralAppPage,
  HelpRequestPage,
  LoginPage,
  NotificationsListPage,
  Page403,
  Page404,
  Page500,
  PaymentListPage,
  SchoolReliabilityPage,
  UserAccountPage
} from './elements'

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          )
        },

        { path: 'login-unprotected', element: <LoginPage /> }
      ]
    },

    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralAppPage /> },
        { path: 'school-reliability', element: <SchoolReliabilityPage /> },
        {
          path: 'contract',
          children: [
            { path: '', element: <ContractsListPage automatic={false} /> },
            { path: 'view', element: <ContractDetailsPage /> }
          ]
        },
        {
          path: 'automatic-contract',
          children: [
            {
              path: '',
              element: (
                <Web3ContextProvider>
                  <ContractsListPage automatic />
                </Web3ContextProvider>
              )
            },
            { path: 'view', element: <ContractDetailsPage /> }
          ]
        },
        {
          path: 'payment',
          children: [
            { element: <Navigate to="/dashboard/payment/list" replace />, index: true },
            { path: 'list', element: <PaymentListPage /> }
          ]
        },
        {
          path: 'connectivity',
          children: [
            { element: <Navigate to="/dashboard/connectivity/list" replace />, index: true },
            { path: 'list', element: <ConnectivityListPage /> }
          ]
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/app" replace />, index: true },
            {
              path: 'account',
              element: <UserAccountPage />
            },
            { path: 'notifications', element: <NotificationsListPage /> }
          ]
        },
        {
          path: 'contact',
          children: [
            { element: <Navigate to="/dashboard/contact/feedback" replace />, index: true },
            { path: 'feedback', element: <FeedbackPage /> },
            { path: 'help-request', element: <HelpRequestPage /> }
          ]
        }
      ]
    },
    {
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> }
      ]
    },
    { path: '/', element: <Navigate to="/dashboard/app" replace /> },
    { path: '*', element: <Navigate to="/404" replace /> }
  ])
}
