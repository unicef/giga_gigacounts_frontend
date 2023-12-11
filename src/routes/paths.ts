function path(root: string, sublink: string) {
  return `${root}${sublink}`
}

const ROOTS_AUTH = '/auth'
const ROOTS_DASHBOARD = '/dashboard'

type Options = { root?: string; name?: string; lastChild?: string }

const createRoute = (pathname: string, options?: Options) => {
  const defaultOptions = { root: '', name: '', lastChild: '' }
  return {
    route: path(options?.root ?? defaultOptions.root, pathname),
    name: options?.name ?? defaultOptions.name,
    lastChild: options?.lastChild ?? defaultOptions.lastChild
  }
}

export const ROUTES = {
  dashboard: {
    root: createRoute(ROOTS_DASHBOARD, { name: 'dashboard' }),
    connection: createRoute('/connectivity', { root: ROOTS_DASHBOARD }),
    contract: {
      root: createRoute('/contract', {
        name: 'contracts_list',
        root: ROOTS_DASHBOARD,
        lastChild: 'contracts'
      }),
      view: createRoute('/contract/view', {
        name: 'view_contract',
        root: ROOTS_DASHBOARD,
        lastChild: 'contract'
      })
    },
    automatic_contract: {
      root: createRoute('/automatic-contract', {
        name: 'automatic_contracts_list',
        root: ROOTS_DASHBOARD,
        lastChild: 'automatic_contracts'
      }),
      view: createRoute('/automatic-contract/view', {
        name: 'view_automatic_contract',
        root: ROOTS_DASHBOARD,
        lastChild: 'contract'
      })
    },
    payment: {
      root: createRoute('/payment', { root: ROOTS_DASHBOARD, name: 'payments' }),
      list: createRoute('/payment/list', {
        root: ROOTS_DASHBOARD,
        name: 'payments_list'
      })
    },
    app: createRoute('/app', { root: ROOTS_DASHBOARD }),
    userApproval: {
      root: createRoute('/user-approval', { root: ROOTS_DASHBOARD, name: 'user-approval' })
    },
    user: {
      root: createRoute('/user', { root: ROOTS_DASHBOARD, name: 'user' }),
      new: createRoute('/user/new', { root: ROOTS_DASHBOARD }),
      list: createRoute('/user/list', {
        root: ROOTS_DASHBOARD,
        name: 'users_list',
        lastChild: 'users'
      }),
      cards: createRoute('/user/card', { root: ROOTS_DASHBOARD }),
      account: createRoute('/user/account', {
        root: ROOTS_DASHBOARD,
        name: 'account',
        lastChild: 'account_settings'
      }),
      notifications: createRoute('/user/notifications', {
        root: ROOTS_DASHBOARD,
        name: 'notifications',
        lastChild: 'notifications'
      }),
      edit: (name: string) => createRoute(`/user/${name}/edit`, { root: ROOTS_DASHBOARD }),
      demoEdit: createRoute('/user/reece-chung/edit', { root: ROOTS_DASHBOARD })
    },
    schoolReliability: {
      root: createRoute('/school-reliability', { root: ROOTS_DASHBOARD, name: 'schoolReliability' })
    },
    users: {
      root: createRoute('/users', {
        name: 'users',
        root: ROOTS_DASHBOARD,
        lastChild: 'users'
      })
    },
    contact: {
      root: createRoute('/contact', { root: ROOTS_DASHBOARD, name: 'contact' }),
      feedback: createRoute('/contact/feedback', {
        root: ROOTS_DASHBOARD,
        name: 'functionalities.feedback'
      }),
      helpRequest: createRoute('/contact/help-request', {
        root: ROOTS_DASHBOARD,
        name: 'functionalities.help_request'
      }),
      chat: createRoute('/contact/chat', { root: ROOTS_DASHBOARD })
    },
    partners: createRoute('/partners', { root: ROOTS_DASHBOARD })
  },
  auth: {
    root: createRoute(ROOTS_AUTH),
    // loginUnprotected: createRoute('/login-unprotected', { root: ROOTS_AUTH }),
    // registerUnprotected: createRoute('/register-unprotected', { root: ROOTS_AUTH }),
    verify: createRoute('/verify', { root: ROOTS_AUTH }),
    resetPassword: createRoute('/reset-password', { root: ROOTS_AUTH }),
    newPassword: createRoute('/new-password', { root: ROOTS_AUTH })
  },
  comingSoon: createRoute('/coming-soon'),
  maintenance: createRoute('/maintenance'),
  about: createRoute('/about-us'),
  contact: createRoute('/contact-us'),
  faqs: createRoute('/faqs'),
  page403: createRoute('/403'),
  page404: createRoute('/404'),
  page500: createRoute('/500'),
  notVerified: createRoute('/error/not-verified')
}
