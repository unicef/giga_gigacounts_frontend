import { ICONS, UserSettings } from 'src/constants'
import { UserRoles } from 'src/@types'
import { NavListProps } from 'src/layouts/dashboard/nav/types'
import { ROUTES } from 'src/routes/paths'

const navConfig = [
  {
    subheader: 'principal',
    items: [
      {
        title: 'home',
        path: ROUTES.dashboard.app.route,
        icon: ICONS.Home,
        roles: [],
        settings: []
      },
      {
        title: 'contracts',
        path: ROUTES.dashboard.contract.root.route,
        icon: ICONS.Contract,
        roles: [
          UserRoles.GIGA_ADMIN,
          UserRoles.GIGA_VIEW_ONLY,
          UserRoles.ISP_CONTRACT_MANAGER,
          UserRoles.ISP_CUSTOMER_SERVICE,
          UserRoles.COUNTRY_CONTRACT_CREATOR,
          UserRoles.COUNTRY_ACCOUNTANT,
          UserRoles.COUNTRY_SUPER_ADMIN
        ],
        settings: []
      },
      {
        title: 'payments',
        path: ROUTES.dashboard.payment.root.route,
        icon: ICONS.Payment,
        roles: [
          UserRoles.GIGA_ADMIN,
          UserRoles.COUNTRY_ACCOUNTANT,
          UserRoles.COUNTRY_SUPER_ADMIN,
          UserRoles.GIGA_VIEW_ONLY,
          UserRoles.ISP_CONTRACT_MANAGER
        ],
        settings: []
      },
      {
        title: 'connectivity',
        path: ROUTES.dashboard.connection.route,
        icon: ICONS.Connection,
        roles: [],
        settings: []
      },
      {
        title: 'schools',
        path: ROUTES.dashboard.schoolReliability.root.route,
        icon: ICONS.Education,
        roles: [UserRoles.GIGA_ADMIN],
        settings: []
      },
      {
        title: 'users',
        path: ROUTES.dashboard.users.root.route,
        icon: ICONS.Users,
        roles: [UserRoles.GIGA_ADMIN],
        settings: []
      },
      {
        title: 'automatic_contracts',
        path: ROUTES.dashboard.automatic_contract.root.route,
        icon: ICONS.Automatic,
        roles: [
          UserRoles.GIGA_ADMIN,
          UserRoles.GIGA_VIEW_ONLY,
          UserRoles.ISP_CONTRACT_MANAGER,
          UserRoles.ISP_CUSTOMER_SERVICE,
          UserRoles.COUNTRY_CONTRACT_CREATOR,
          UserRoles.COUNTRY_ACCOUNTANT,
          UserRoles.COUNTRY_SUPER_ADMIN
        ],
        settings: [{ name: UserSettings.SETTING_AUTOMATIC_CONTRACTS, value: true }]
      }
    ]
  }
] as const

export const shortcuts: NavListProps[] = [
  {
    icon: ICONS.AddCircular,
    title: 'contract_creation',
    path: ROUTES.dashboard.contract.root.route,
    state: { new: true },
    roles: [UserRoles.GIGA_ADMIN, UserRoles.COUNTRY_CONTRACT_CREATOR, UserRoles.COUNTRY_SUPER_ADMIN]
  }
]

export default navConfig
