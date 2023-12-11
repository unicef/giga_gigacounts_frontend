import { UserRoles } from 'src/@types'
import { UserSettings, Views } from 'src/constants'
import { NavListProps } from 'src/layouts/dashboard/nav/types'
import { ROUTES } from 'src/routes/paths'

export const VIEW_ROLES = {
  schools: [UserRoles.GIGA_ADMIN],
  userApproval: [UserRoles.GIGA_ADMIN]
} as const
export const VIEW_SETTINGS = {
  automatic_contracts: [{ name: UserSettings.SETTING_AUTOMATIC_CONTRACTS, value: true }]
} as const

export const VIEW_PERMISSIONS = {
  contracts: [`${Views.contract}.read`],
  automatic_contracts: [`${Views.contract}.read`],
  payments: [`${Views.payment}.read`],
  payments_logs: [`${Views.paymentLog}.read`],
  schools: [`${Views.school}.read`]
} as const

const navConfig = [
  {
    subheader: 'principal',
    items: [
      {
        title: 'home',
        path: ROUTES.dashboard.app.route,
        icon: 'Home'
      },
      {
        title: 'contracts',
        path: ROUTES.dashboard.contract.root.route,
        icon: 'Contract',
        permissions: VIEW_PERMISSIONS.contracts
      },
      {
        title: 'payments_log',
        path: ROUTES.dashboard.payment.root.route,
        icon: 'Payment',
        permissions: VIEW_PERMISSIONS.payments_logs
      },
      {
        title: 'schools_connectivity',
        path: ROUTES.dashboard.connection.route,
        icon: 'Connection'
      },
      {
        title: 'schools',
        path: ROUTES.dashboard.schoolReliability.root.route,
        icon: 'Education',
        roles: VIEW_ROLES.schools,
        permissions: VIEW_PERMISSIONS.schools
      },
      {
        title: 'stakeholders',
        path: ROUTES.dashboard.users.root.route,
        icon: 'Users'
      },
      {
        title: 'user_approval',
        path: ROUTES.dashboard.userApproval.root.route,
        icon: 'UserApproval',
        roles: VIEW_ROLES.userApproval
      },
      {
        title: 'automatic_contracts',
        path: ROUTES.dashboard.automatic_contract.root.route,
        icon: 'Automatic',
        permissions: VIEW_PERMISSIONS.automatic_contracts,
        settings: VIEW_SETTINGS.automatic_contracts
      }
    ]
  }
] as const

export const shortcuts: NavListProps[] = [
  {
    icon: 'AddCircular',
    title: 'contract_creation',
    path: ROUTES.dashboard.contract.root.route,
    state: { new: true },
    permissions: [`${Views.contract}.write`]
  }
]

export default navConfig
