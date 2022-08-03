import { ContractsState } from './types'
import { IContract, ContractStatus } from '../@types/ContractType'

export const INITIAL_CONTRACTS_STATE: ContractsState = {
  contracts: undefined,
  ltasIds: undefined,
  activeNavItem: 'all contracts',
  selectedSchool: undefined,
  schoolQosDate: undefined,
  schoolQosMetricName: undefined,
  schoolQosMedianValue: undefined,
  error: undefined,
  loading: true,
}

export const NEW_CONTRACT: IContract = {
  ltaId: null,
  name: 'New Contract',
  status: ContractStatus.Draft,
  added: true,
  details: {
    data: undefined,
    loading: true,
    error: undefined,
  },
}
