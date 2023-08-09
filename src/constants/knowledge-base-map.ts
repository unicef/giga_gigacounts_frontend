import { KNOWLEDGE_BASE_URL } from './config-global'

const BASE_URL = KNOWLEDGE_BASE_URL

export const KNOWLEDGE_BASE_MAP: Record<string, string> = {
  '/dashboard/app': `${BASE_URL}/`,
  '/dashboard/contract': `${BASE_URL}/categories/contracts`,
  '/dashboard/payment/list': `${BASE_URL}/categories/payments`,
  '/dashboard/connectivity/list': `${BASE_URL}/posts/view-connectivity`,
  '/dashboard/school-reliability': `${BASE_URL}/posts/view-schools-reliability-data`,
  '/dashboard/users': `${BASE_URL}/tags/users`,
  '/dashboard/automatic-contract': `${BASE_URL}/tags/automatic`,
  '/dashboard/user/account': `${BASE_URL}/posts/connect-wallet`,
  '/dashboard/contact/feedback': `${BASE_URL}/posts/send-feedback`,
  '/dashboard/contact/help-request': `${BASE_URL}/posts/send-help-request`,
  'user/notifications': `${BASE_URL}/tags/users`
}
