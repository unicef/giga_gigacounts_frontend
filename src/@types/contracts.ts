import { IContractDetails, IDraft } from './general'

export type ContractDetails =
  | (IContractDetails & { isContract: true })
  | (IDraft & { isContract: false })
