import { Navigate, useRoutes } from 'react-router-dom'
import AuthGuard from 'src/auth/AuthGuard'
import GuestGuard from 'src/auth/GuestGuard'
import { PATH_AFTER_LOGIN } from 'src/constants'
import { Web3ContextProvider } from 'src/context/web3/Web3Context'
import DashboardLayout from 'src/layouts/dashboard'
import ErrorLayout from 'src/layouts/error/ErrorLayout'
import { NavBarProvider } from 'src/context/layout/NavbarContext'
import {
  ContractDetailsPage,
  ContractsListPage,
  FeedbackPage,
  GeneralAppPage,
  GenericServerError,
  HelpRequestPage,
  LoginPage,
  MeasuresListPage,
  NotificationsListPage,
  Page403,
  Page404,
  Page500,
  PaymentListPage,
  SchoolReliabilityPage,
  UserAccountPage,
  UsersPage
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
        <NavBarProvider>
          <DashboardLayout />
        </NavBarProvider>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralAppPage /> },
        { path: 'school-reliability', element: <SchoolReliabilityPage /> },
        {
          path: 'users',
          element: (
            <Web3ContextProvider>
              <UsersPage />
            </Web3ContextProvider>
          )
        },
        {
          path: 'contract',
          children: [
            {
              path: '',
              element: (
                <Web3ContextProvider>
                  <ContractsListPage automatic={false} />
                </Web3ContextProvider>
              )
            },
            {
              path: 'view/:contractStatus/:contractId',
              element: (
                <Web3ContextProvider>
                  <ContractDetailsPage />
                </Web3ContextProvider>
              )
            }
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
            {
              path: 'view/:contractStatus/:contractId',
              element: (
                <Web3ContextProvider>
                  <ContractDetailsPage />
                </Web3ContextProvider>
              )
            }
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
            { path: 'list', element: <MeasuresListPage /> }
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
      path: 'error',
      element: <ErrorLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: '500', element: <Page500 /> },
        { path: 'generic', element: <GenericServerError /> }
      ]
    },
    {
      children: [
        { path: '404', element: <Navigate to="/error/404" replace /> },
        { path: '403', element: <Navigate to="/error/403" replace /> },
        { path: '500', element: <Navigate to="/error/500" replace /> }
      ]
    },
    { path: '/', element: <Navigate to="/dashboard/app" replace /> },
    { path: '*', element: <Navigate to="/error/404" replace /> }
  ])
}
