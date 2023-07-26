import { ROUTES } from './routes/paths'

// API
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || ''
export const DEFAULT_COUNTRY_CODE = process.env.REACT_APP_DEFAULT_COUNTRY_CODE || 'US' // US Country

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = ROUTES.dashboard.app.route

// Wallet y Blk
export const WALLET_CONNECT_PROJECT_ID = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID || ''
export const GIGACOUNTS_TOKEN_ADR = process.env.REACT_APP_GIGACOUNTS_TOKEN_ADR || ''
export const INFURA_ID = process.env.REACT_APP_INFURA_ID || ''
export const ALCHEMY_ID = process.env.REACT_APP_ALCHEMY_ID || ''

// KB base address
export const KNOWLEDGE_BASE_URL = process.env.REACT_APP_KNOWLEDGE_BASE_URL

// LAYOUT
export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 88,
  H_DASHBOARD_DESKTOP: 92,
  H_DASHBOARD_DESKTOP_OFFSET: 92 - 32
}

export const NAV = {
  W_BASE: 260,
  W_DASHBOARD: 280,
  W_DASHBOARD_MINI: 88,
  //
  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,
  //
  H_DASHBOARD_ITEM_HORIZONTAL: 32
}

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
  NAV_SUB_ITEM: 20,
  NAV_SUB_ITEM_HORIZONTAL: 20,
  NAV_SUB_ITEM_MINI: 20
}
