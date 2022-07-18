import { IContractDetails, IContracts, IContractSchools, ILtas } from '../@types/ContractType'

export enum ActionType {
  RESPONSE = 'RESPONSE',
  CREATE_CONTRACT = 'CREATE_CONTRACT',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_LTA_NUMBERS = 'SET_LTA_NUMBER',
  SET_SELECTED_CONTRACT = 'SET_SELECTED_CONTRACT',
  SET_CONTRACT_DETAILS_SCHOOLS = 'SET_CONTRACT_DETAILS_SCHOOLS',
  SET_CONTRACT_DETAILS = 'SET_CONTRACT_DETAILS',
  SET_ATTACHMENT_SELECTED = 'SET_ATTACHMENT_SELECTED',
}

export interface Action {
  type: ActionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

export interface State {
  selectedContract?: IContracts
  contracts?: IContracts[]
  ltas?: ILtas
  error?: Error
  loading?: boolean
  ltaNumbers: string[]
  isSelected?: boolean
  contractDetails: IContractDetails
  contractSchools: IContractSchools[]
  isAttachmentSelected: boolean
}

export const reducer = (state: State, action: Action): State => {
  const { type, payload } = action
  // console.log(type, payload)

  switch (type) {
    case ActionType.RESPONSE:
      return {
        ...state,
        contracts: payload.contracts,
        ltas: payload.ltas,
        loading: false,
      }

    case ActionType.CREATE_CONTRACT: {
      return {
        ...state,
        contracts: [payload, ...(state.contracts || [])],
      }
    }

    case ActionType.SET_SELECTED_CONTRACT: {
      return {
        ...state,
        selectedContract: payload,
        isSelected: true,
      }
    }

    case ActionType.SET_LTA_NUMBERS: {
      return {
        ...state,
        ltaNumbers: payload,
      }
    }

    case ActionType.SET_CONTRACT_DETAILS_SCHOOLS: {
      const { contractDetails, contractSchools } = payload
      return {
        ...state,
        contractDetails,
        contractSchools,
      }
    }

    case ActionType.SET_CONTRACT_DETAILS: {
      return {
        ...state,
        contractDetails: { ...payload },
      }
    }

    case ActionType.SET_ATTACHMENT_SELECTED: {
      return {
        ...state,
        isAttachmentSelected: !state.isAttachmentSelected,
      }
    }

    case ActionType.SET_ERROR:
      return {
        ...state,
        error: payload,
      }

    case ActionType.SET_LOADING:
      return {
        ...state,
        loading: !state.loading,
      }

    default:
      return {
        ...state,
      }
  }
}

export const state: State = {
  contracts: [],
  ltas: {},
  error: undefined,
  loading: true,
  ltaNumbers: [],
  isSelected: false,

  selectedContract: {
    added: false,
    budget: {
      budget: '',
      totalSpend: null,
    },
    country: {
      code: '',
      flagUrl: '',
      name: '',
    },
    id: '',
    isp: '',
    ltaId: null,
    name: '',
    numberOfSchools: '',
    schoolsConnection: {
      allEqualOrAboveAvg: 0,
      atLeastOneBellowAvg: 0,
      withoutConnection: 0,
    },
    status: '',
    totalSpent: 0,
  },

  contractDetails: {
    id: '',
    name: '',
    isp: '',
    lta: '',
    attachments: [],
    startDate: '',
    endDate: '',
    numberOfSchools: '',
    schoolsConnection: {
      withoutConnection: 0,
      atLeastOneBellowAvg: 0,
      allEqualOrAboveAvg: 0,
    },
    connectionsMedian: [
      {
        contract_id: '',
        metric_id: 0,
        metric_name: '',
        unit: '',
        median_value: 0,
      },
    ],
  },

  contractSchools: [
    {
      id: '0',
      name: '',
      locations: '',
      connection: {
        value: 0,
        downloadSpeed: 0,
        uploadSpeed: 0,
        uptime: 0,
        latency: 0,
      },
    },
  ],
  isAttachmentSelected: false,
}
