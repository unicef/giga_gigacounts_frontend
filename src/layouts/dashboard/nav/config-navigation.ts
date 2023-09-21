import { UserRoles } from 'src/@types'
import { UserSettings } from 'src/constants'
import { NavListProps } from 'src/layouts/dashboard/nav/types'
import { ROUTES } from 'src/routes/paths'

export const VIEW_ROLES = {
  home: [],
  contracts: [
    UserRoles.GIGA_ADMIN,
    UserRoles.GIGA_VIEW_ONLY,
    UserRoles.ISP_CONTRACT_MANAGER,
    UserRoles.ISP_CUSTOMER_SERVICE,
    UserRoles.COUNTRY_CONTRACT_CREATOR,
    UserRoles.COUNTRY_ACCOUNTANT,
    UserRoles.COUNTRY_SUPER_ADMIN
  ],
  automatic_contracts: [
    UserRoles.GIGA_ADMIN,
    UserRoles.GIGA_VIEW_ONLY,
    UserRoles.ISP_CONTRACT_MANAGER,
    UserRoles.ISP_CUSTOMER_SERVICE,
    UserRoles.COUNTRY_CONTRACT_CREATOR,
    UserRoles.COUNTRY_ACCOUNTANT,
    UserRoles.COUNTRY_SUPER_ADMIN
  ],
  connectivity: [],
  payments: [
    UserRoles.GIGA_ADMIN,
    UserRoles.COUNTRY_ACCOUNTANT,
    UserRoles.COUNTRY_SUPER_ADMIN,
    UserRoles.GIGA_VIEW_ONLY,
    UserRoles.ISP_CONTRACT_MANAGER,
    UserRoles.ISP_CUSTOMER_SERVICE
  ],
  schools: [UserRoles.GIGA_ADMIN],
  users: []
} as const

const navConfig = [
  {
    subheader: 'principal',
    items: [
      {
        title: 'home',
        path: ROUTES.dashboard.app.route,
        icon: 'Home',
        roles: VIEW_ROLES.home,
        settings: []
      },
      {
        title: 'contracts',
        path: ROUTES.dashboard.contract.root.route,
        icon: 'Contract',
        roles: VIEW_ROLES.contracts,
        settings: []
      },
      {
        title: 'payments_log',
        path: ROUTES.dashboard.payment.root.route,
        icon: 'Payment',
        roles: VIEW_ROLES.payments,
        settings: []
      },
      {
        title: 'schools_connectivity',
        path: ROUTES.dashboard.connection.route,
        icon: 'Connection',
        roles: VIEW_ROLES.connectivity,
        settings: []
      },
      {
        title: 'schools',
        path: ROUTES.dashboard.schoolReliability.root.route,
        icon: 'Education',
        roles: VIEW_ROLES.schools,
        settings: []
      },
      {
        title: 'stakeholders',
        path: ROUTES.dashboard.users.root.route,
        icon: 'Users',
        roles: VIEW_ROLES.users,
        settings: []
      },
      {
        title: 'automatic_contracts',
        path: ROUTES.dashboard.automatic_contract.root.route,
        icon: 'Automatic',
        roles: VIEW_ROLES.automatic_contracts,
        settings: [{ name: UserSettings.SETTING_AUTOMATIC_CONTRACTS, value: true }]
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
    roles: [UserRoles.GIGA_ADMIN, UserRoles.COUNTRY_CONTRACT_CREATOR, UserRoles.COUNTRY_SUPER_ADMIN]
  }
]

export default navConfig
