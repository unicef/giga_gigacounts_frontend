import {
  AddAlt,
  Automatic,
  ConnectionSignal,
  Document,
  Education,
  Home,
  Receipt,
  UserMultiple
} from '@carbon/icons-react'
import { UserRoles } from 'src/constants/authorization'
import { UserSettings } from 'src/constants/settings'
import { NavListProps } from 'src/layouts/dashboard/nav/types'
import { ROUTES } from 'src/routes/paths'

const ICONS = {
  contracts: Document,
  dashboard: Home,
  ecommerce: Receipt,
  partners: UserMultiple,
  automatic: Automatic,
  connection: ConnectionSignal,
  education: Education
}

const navConfig = [
  // GENERAL
  {
    subheader: 'principal',
    items: [
      {
        title: 'home',
        path: ROUTES.dashboard.app.route,
        icon: ICONS.dashboard,
        roles: [],
        settings: []
      },
      {
        title: 'contracts',
        path: ROUTES.dashboard.contract.root.route,
        icon: ICONS.contracts,
        roles: [
          UserRoles.GIGA_ADMIN,
          UserRoles.GIGA_VIEW_ONLY,
          UserRoles.ISP_CONTRACT_MANAGER,
          UserRoles.ISP_CUSTOMER_SERVICE,
          UserRoles.COUNTRY_CONTRACT_CREATOR,
          UserRoles.COUNTRY_SUPER_ADMIN
        ],
        settings: []
      },
      {
        title: 'payments',
        path: ROUTES.dashboard.payment.root.route,
        icon: ICONS.ecommerce,
        roles: [
          UserRoles.GIGA_ADMIN,
          UserRoles.COUNTRY_ACCOUNTANT,
          UserRoles.COUNTRY_SUPER_ADMIN,
          UserRoles.GIGA_VIEW_ONLY
        ],
        settings: []
      },
      {
        title: 'connectivity',
        path: ROUTES.dashboard.connection.route,
        icon: ICONS.connection,
        roles: [
          UserRoles.GIGA_ADMIN,
          UserRoles.COUNTRY_MONITOR,
          UserRoles.COUNTRY_SUPER_ADMIN,
          UserRoles.GIGA_VIEW_ONLY
        ],
        settings: []
      },
      {
        title: 'partners',
        path: ROUTES.dashboard.partners.route,
        icon: ICONS.partners,
        roles: [UserRoles.GIGA_ADMIN],
        settings: []
      },
      {
        title: 'schools',
        path: ROUTES.dashboard.schoolReliability.root.route,
        icon: ICONS.education,
        roles: [UserRoles.GIGA_ADMIN],
        settings: []
      },
      {
        title: 'automatic_contracts',
        path: ROUTES.dashboard.automatic_contract.root.route,
        icon: ICONS.automatic,
        roles: [
          UserRoles.GIGA_ADMIN,
          UserRoles.ISP_CONTRACT_MANAGER,
          UserRoles.ISP_CUSTOMER_SERVICE,
          UserRoles.COUNTRY_CONTRACT_CREATOR,
          UserRoles.COUNTRY_SUPER_ADMIN
        ],
        settings: [{ name: UserSettings.SETTING_AUTOMATIC_CONTRACTS, value: true }]
      }
    ]
  }
] as const

export const shortcuts: NavListProps[] = [
  {
    icon: AddAlt,
    title: 'contract_creation',
    path: ROUTES.dashboard.contract.root.route,
    state: { new: true },
    roles: [
      UserRoles.GIGA_ADMIN,
      UserRoles.ISP_CONTRACT_MANAGER,
      UserRoles.COUNTRY_CONTRACT_CREATOR,
      UserRoles.COUNTRY_SUPER_ADMIN
    ]
  }
]

export default navConfig
