import { ElementType, Suspense, lazy } from 'react'
import LoadingScreen from 'src/components/loading-screen'
import { SHOW_DASHBOARD } from 'src/constants'

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )

export const LoginPage = Loadable(lazy(() => import('src/pages/auth/LoginPage')))

export const GeneralAppPage =
SHOW_DASHBOARD ? 
Loadable(lazy(() => import('src/pages/dashboard/GeneralAppPage'))) : Loadable(lazy(() => import('src/pages/dashboard/OldDashboard'))) 

export const UserAccountPage = Loadable(lazy(() => import('src/pages/dashboard/UserAccountPage')))
export const NotificationsListPage = Loadable(
  lazy(() => import('src/pages/dashboard/NotificationsListPage'))
)

export const PaymentListPage = Loadable(lazy(() => import('src/pages/dashboard/PaymentListPage')))
export const MeasuresListPage = Loadable(lazy(() => import('src/pages/dashboard/MeasuresListPage')))

export const Page500 = Loadable(lazy(() => import('src/pages/Page500')))
export const Page403 = Loadable(lazy(() => import('src/pages/Page403')))
export const Page404 = Loadable(lazy(() => import('src/pages/Page404')))

export const ContractsListPage = Loadable(
  lazy(() => import('src/pages/dashboard/ContractsListPage'))
)

export const ContractDetailsPage = Loadable(
  lazy(() => import('src/pages/dashboard/ContractDetailsPage'))
)

export const FeedbackPage = Loadable(lazy(() => import('src/pages/dashboard/FeedbackPage')))
export const HelpRequestPage = Loadable(lazy(() => import('src/pages/dashboard/HelpRequestPage')))

export const SchoolReliabilityPage = Loadable(
  lazy(() => import('src/pages/dashboard/SchoolReliabilityPage'))
)

export const UsersPage = Loadable(lazy(() => import('src/pages/dashboard/UsersPage')))
