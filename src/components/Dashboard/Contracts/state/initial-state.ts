import { IContract, ContractStatus } from 'src/types/general'
import { ContractsState, ContractStagedActiveTab } from './types'

export const INITIAL_CONTRACTS_STATE: ContractsState = {
  contracts: undefined,
  ltas: undefined,
  activeNavItem: 'all contracts',
  selectedSchool: undefined,
  noSchoolMetricData: false,
  schoolsQos: [],
  error: undefined,
  loading: true,
  newContract: undefined,
  selectedContractListId: undefined,
  activeTab: ContractStagedActiveTab.SchoolsTab,
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
