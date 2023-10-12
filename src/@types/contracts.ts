import { IContractDetails, IDraft } from './general'

export type ContractDetails =
  | (IContractDetails & { isDetails: true })
  | (IDraft & { isDetails: false })
