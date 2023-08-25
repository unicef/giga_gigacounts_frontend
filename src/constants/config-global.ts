import { ROUTES } from 'src/routes/paths'

// API
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || ''
export const DEFAULT_COUNTRY_CODE = process.env.REACT_APP_DEFAULT_COUNTRY_CODE || 'US' // US Country

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = ROUTES.dashboard.app.route

// Wallet y Blk
export const WALLET_CONNECT_PROJECT_ID = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID || ''
export const GIGACOUNTS_TOKEN_ADR = process.env.REACT_APP_GIGACOUNTS_TOKEN_ADR || ''
export const GIGACOUNTS_CONTRACT_HANDLER_ADR =
  process.env.REACT_APP_GIGACOUNTS_CONTRACTS_HANDLER_ADR || ''
export const NODE_PROVIDER_URL = process.env.REACT_APP_NODE_PROVIDER_URL || ''
export const NODE_PROVIDER_KEY = process.env.REACT_APP_NODE_PROVIDER_KEY || ''
export const NETWORK_ID = process.env.REACT_APP_NETWORK_ID || '80001'

// temp-testing
console.info(
  WALLET_CONNECT_PROJECT_ID,
  GIGACOUNTS_TOKEN_ADR,
  GIGACOUNTS_CONTRACT_HANDLER_ADR,
  NODE_PROVIDER_URL,
  NODE_PROVIDER_KEY,
  NETWORK_ID
)

// KB base address
export const KNOWLEDGE_BASE_URL = process.env.REACT_APP_KNOWLEDGE_BASE_URL
export const DRAFT_ID_OFFSET = Number(process.env.REACT_APP_DRAFT_ID_OFFSET) || 9000

export const B2C = {
  signUpSignInName: process.env.REACT_APP_B2C_SIGNUP_SIGNIN_NAME || '',
  forgotPasswordName: process.env.REACT_APP_B2C_FORGOT_PASSWORD_NAME || '',
  editProfileName: process.env.REACT_APP_B2C_EDIT_PROFILE_NAME || '',
  url: process.env.REACT_APP_B2C_URL || '',
  domain: process.env.REACT_APP_B2C_DOMAIN || '',
  clientId: process.env.REACT_APP_B2C_CLIENT_ID || ''
}
