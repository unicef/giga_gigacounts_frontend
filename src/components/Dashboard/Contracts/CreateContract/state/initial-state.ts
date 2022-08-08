import { ContractForm, CreateContractActiveTab, CreateContractState, CreateContractTabState } from './types'

export const CONTRACT_FORM_INITIAL_STATE: ContractForm = {
  id: null,
  name: '',
  countryId: undefined,
  currencyId: undefined,
  ltaId: undefined,
  ispId: undefined,
  expectedMetrics: { metrics: [] },
  governmentBehalf: false,
  budget: '',
  startDate: '',
  endDate: '',
  schools: {
    schools: [],
  },
}

export const CREATE_CONTRACT_INITIAL_STATE: CreateContractState = {
  draft: {
    data: undefined,
    loading: false,
    error: undefined,
  },
  activeTab: CreateContractActiveTab.GeneralTab,
  error: '',
  loading: true,
  missingData: false,
  invalidData: false,
  tabGeneralStatus: CreateContractTabState.Selected,
  tabConnectionStatus: CreateContractTabState.Default,
  tabSchoolStatus: CreateContractTabState.Default,
  expectedMetrics: { metrics: [] },
  metrics: [],
  isps: [],
  countries: [],
  currencies: [],
  ltas: [],
  contractForm: CONTRACT_FORM_INITIAL_STATE,
  schools: [],
}
