import { ElementType, Suspense, lazy } from 'react'
import LoadingScreen from 'src/components/loading-screen'

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )

export const LoginPage = Loadable(lazy(() => import('src/pages/auth/LoginPage')))

export const GeneralAppPage = Loadable(lazy(() => import('src/pages/dashboard/GeneralAppPage')))

export const UserAccountPage = Loadable(lazy(() => import('src/pages/dashboard/UserAccountPage')))
export const NotificationsListPage = Loadable(
  lazy(() => import('src/pages/dashboard/NotificationsListPage'))
)

export const PaymentListPage = Loadable(lazy(() => import('src/pages/dashboard/PaymentListPage')))
export const ConnectivityListPage = Loadable(
  lazy(() => import('src/pages/dashboard/ConnectivityListPage'))
)
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
