import { ContractsState } from './types'
import { IContract } from '../@types/ContractType'

export const INITIAL_CONTRACTS_STATE: ContractsState = {
  contracts: undefined,
  ltasIds: undefined,
  activeNavItem: 'all contracts',
  selectedSchool: undefined,
  schoolQosDate: undefined,
  schoolQosMetricName: undefined,
  schoolQosMedianValue: undefined,
  error: undefined,
  loading: false,
}

export const NEW_CONTRACT: IContract = {
  name: 'New Contract',
  status: 'Draft',
  added: true,
  details: {
    data: undefined,
    loading: false,
    error: undefined,
  },
}
