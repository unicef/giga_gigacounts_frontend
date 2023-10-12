import { Navigate, useRoutes } from 'react-router-dom'
import PermissionBasedGuard from 'src/auth/PermissionBasedGuard'
import RoleBasedGuard from 'src/auth/RoleBasedGuard'
import SettingBasedGuard from 'src/auth/SettingBasedGuard'
import { PATH_AFTER_LOGIN } from 'src/constants'
import { NavBarProvider } from 'src/context/layout/NavbarContext'
import { Web3ContextProvider } from 'src/context/web3/Web3Context'
import DashboardLayout from 'src/layouts/dashboard'
import {
  VIEW_PERMISSIONS,
  VIEW_ROLES,
  VIEW_SETTINGS
} from 'src/layouts/dashboard/nav/config-navigation'
import { ErrorLayout } from 'src/layouts/error'
import {
  ContractDetailsPage,
  ContractsListPage,
  FeedbackPage,
  GeneralAppPage,
  GenericServerError,
  HelpRequestPage,
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
      path: 'dashboard',
      element: (
        <NavBarProvider>
          <DashboardLayout />
        </NavBarProvider>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'app',
          element: <GeneralAppPage />
        },
        {
          path: 'school-reliability',
          element: (
            <RoleBasedGuard roles={VIEW_ROLES.schools}>
              <PermissionBasedGuard permissions={VIEW_PERMISSIONS.schools}>
                <SchoolReliabilityPage />
              </PermissionBasedGuard>
            </RoleBasedGuard>
          )
        },
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
                <PermissionBasedGuard permissions={VIEW_PERMISSIONS.contracts}>
                  <Web3ContextProvider>
                    <ContractsListPage automatic={false} />
                  </Web3ContextProvider>
                </PermissionBasedGuard>
              )
            },
            {
              path: 'view/:contractStatus/:contractId',
              element: (
                <PermissionBasedGuard permissions={VIEW_PERMISSIONS.contracts}>
                  <Web3ContextProvider>
                    <ContractDetailsPage />
                  </Web3ContextProvider>
                </PermissionBasedGuard>
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
                <PermissionBasedGuard permissions={VIEW_PERMISSIONS.automatic_contracts}>
                  <SettingBasedGuard settings={VIEW_SETTINGS.automatic_contracts}>
                    <Web3ContextProvider>
                      <ContractsListPage automatic />
                    </Web3ContextProvider>
                  </SettingBasedGuard>
                </PermissionBasedGuard>
              )
            },
            {
              path: 'view/:contractStatus/:contractId',
              element: (
                <PermissionBasedGuard permissions={VIEW_PERMISSIONS.automatic_contracts}>
                  <Web3ContextProvider>
                    <ContractDetailsPage />
                  </Web3ContextProvider>
                </PermissionBasedGuard>
              )
            }
          ]
        },
        {
          path: 'payment',
          children: [
            { element: <Navigate to="/dashboard/payment/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard permissions={VIEW_PERMISSIONS.payments}>
                  <PaymentListPage />
                </PermissionBasedGuard>
              )
            }
          ]
        },
        {
          path: 'connectivity',
          children: [
            { element: <Navigate to="/dashboard/connectivity/list" replace />, index: true },
            {
              path: 'list',
              element: <MeasuresListPage />
            }
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
