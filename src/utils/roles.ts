import { UserRoles } from 'src/@types'

export const isIspRole = (role: UserRoles | '') =>
  role === UserRoles.ISP_CONTRACT_MANAGER || role === UserRoles.ISP_CUSTOMER_SERVICE
