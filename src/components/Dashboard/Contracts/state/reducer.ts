import { ContractsAction, ContractsActionType, ContractsState } from './types'
import { IContract } from '../@types/ContractType'
import { uniqBy } from 'src/utils/uniqBy'

export const reducer = (state: ContractsState, action: ContractsAction): ContractsState => {
  const { type, payload } = action

  switch (type) {
    case ContractsActionType.SET_LOADING: {
      return {
        ...state,
        loading: true,
      }
    }

    case ContractsActionType.RESPONSE: {
      const { contracts, ltas } = payload
      const ltaContracts = Object.entries(ltas)
        .map(([ltaId, _contracts]) =>
          (_contracts as IContract[]).map((contract) => ({
            ...contract,
            ltaId,
          })),
        )
        .flat(1)

      const allContracts = uniqBy(ltaContracts.concat(contracts) as IContract[], 'id')

      return {
        ...state,
        contracts: allContracts.map((contract: IContract) => ({
          ...contract,
          details: {
            data: undefined,
            loading: false,
            error: undefined,
          },
        })),
        ltasIds: Object.keys(payload.ltas),
        loading: false,
      }
    }

    case ContractsActionType.CREATE_CONTRACT: {
      return {
        ...state,
        contracts: [payload, ...(state.contracts || [])],
      }
    }

    case ContractsActionType.SET_CONTRACT_DETAILS_LOADING: {
      const { id } = payload
      return {
        ...state,
        contracts: state.contracts?.map((contract) => {
          if (contract.id === id) {
            return {
              ...contract,
              details: {
                ...contract.details,
                loading: true,
              },
            }
          }
          return contract
        }),
      }
    }

    case ContractsActionType.SET_CONTRACT_DETAILS_ERROR: {
      const { id, error } = payload
      return {
        ...state,
        contracts: state.contracts?.map((contract) => {
          if (contract.id === id) {
            return {
              ...contract,
              details: {
                ...contract.details,
                loading: false,
                error,
              },
            }
          }
          return contract
        }),
      }
    }

    case ContractsActionType.SET_CONTRACT_DETAILS_SCHOOLS: {
      const { details, schools } = payload
      return {
        ...state,
        contracts: state.contracts?.map((contract) => {
          if (contract.id === details.id) {
            return {
              ...contract,
              details: {
                data: {
                  ...details,
                  schools,
                },
                loading: false,
                error: undefined,
              },
            }
          }

          return contract
        }),
      }
    }

    case ContractsActionType.SET_ERROR:
      return {
        ...state,
        error: payload,
      }

    default:
      return {
        ...state,
      }
  }
}
