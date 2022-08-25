import {
  ContractsAction,
  ContractsActionType,
  ContractsState,
  MetricPropertyType,
  SchoolQosResponse,
  SchoolsQos,
} from './types'
import { IContract, IContractDetails } from 'src/types/general'

export const reducer = (state: ContractsState, action: ContractsAction): ContractsState => {
  const { type, payload } = action

  switch (type) {
    case ContractsActionType.SET_NEW_CONTRACT: {
      const { newContract } = payload
      return {
        ...state,
        newContract,
        activeNavItem: undefined,
      }
    }

    case ContractsActionType.SET_LOADING: {
      return {
        ...state,
        loading: true,
      }
    }

    case ContractsActionType.RESPONSE: {
      const {
        contracts: { contracts, ltas: ltaGroups },
        ltas,
      } = payload

      const ltaContracts = Object.entries(ltaGroups)
        .map(([ltaName, _contracts]) =>
          (_contracts as IContract[]).map((contract) => ({
            ...contract,
            lta: {
              id: contract.ltaId,
              name: ltaName,
            },
          })),
        )
        .flat(1)

      const allContracts = ltaContracts.concat(contracts) as IContract[]

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
        ltas,
        loading: false,
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

    case ContractsActionType.SET_CONTRACT_DETAILS_SCHOOLS_PAYMENTS: {
      const { details, schools, payments } = payload
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
                  payments: {
                    data: payments,
                    loading: false,
                    error: undefined,
                  },
                },
                loading: false,
                error: undefined,
              },
              newContract: undefined,
            }
          }

          return contract
        }),
      }
    }

    case ContractsActionType.SET_CONTRACT_PAYMENTS_LOADING: {
      return {
        ...state,
        contracts: state.contracts?.map((contract) => {
          const { contractId } = payload

          if (contract.id === contractId) {
            const { details } = contract

            return {
              ...contract,
              details: {
                ...details,
                data: {
                  ...(details.data as IContractDetails),
                  payments: {
                    data: (details.data as IContractDetails).payments.data,
                    loading: true,
                    error: undefined,
                  },
                },
              },
              newContract: undefined,
            }
          }

          return contract
        }),
      }
    }

    case ContractsActionType.SET_CONTRACT_PAYMENTS_ERROR: {
      return {
        ...state,
        contracts: state.contracts?.map((contract) => {
          const { contractId, error } = payload

          if (contract.id === contractId) {
            const { details } = contract

            return {
              ...contract,
              details: {
                ...details,
                data: {
                  ...(details.data as IContractDetails),
                  payments: {
                    ...(details.data as IContractDetails).payments,
                    error,
                  },
                },
              },
              newContract: undefined,
            }
          }

          return contract
        }),
      }
    }

    case ContractsActionType.SET_CONTRACT_PAYMENTS: {
      const { contractId, payments } = payload

      return {
        ...state,
        contracts: state.contracts?.map((contract) => {
          if (contract.id === contractId) {
            const { details } = contract

            return {
              ...contract,
              details: {
                ...details,
                data: {
                  ...(details.data as IContractDetails),
                  payments: {
                    data: payments,
                    loading: false,
                    error: undefined,
                  },
                },
              },
              newContract: undefined,
            }
          }

          return contract
        }),
      }
    }

    case ContractsActionType.SET_SCHOOL_MEASURES: {
      const getMetricProperty = (metric_name: string) => {
        const metricPropertyMapping = {
          latency: MetricPropertyType.latency,
          uptime: MetricPropertyType.uptime,
          'download speed': MetricPropertyType['download speed'],
          'upload speed': MetricPropertyType['upload speed'],
        }
        return metricPropertyMapping[metric_name.toLowerCase() as keyof typeof metricPropertyMapping]
      }

      const noSchoolMetricData = !payload.length

      const schoolsQos: SchoolsQos[] = payload.reduce((acc: SchoolsQos[], item: SchoolQosResponse) => {
        const date = new Date(item.date)
        const year = date.getUTCFullYear()
        const month = date.getUTCMonth() + 1
        const existingIndex = acc.findIndex((prev) => prev.year === year && prev.month === month)
        const metricName = getMetricProperty(item.metric_name)

        if (existingIndex === -1) {
          return [
            ...acc,
            {
              year,
              month,
              metrics: {
                [metricName]: {
                  value: item.median_value,
                  unit: item.unit,
                },
              },
            },
          ]
        }

        return [
          ...acc.slice(0, existingIndex),
          {
            year,
            month,
            metrics: {
              ...acc[existingIndex].metrics,
              [metricName]: {
                value: item.median_value,
                unit: item.unit,
              },
            },
          },
          ...acc.slice(existingIndex + 1),
        ]
      }, [])

      return {
        ...state,
        schoolsQos: schoolsQos,
        noSchoolMetricData,
        loading: false,
      }
    }

    case ContractsActionType.SET_ACTIVE_NAV_ITEM:
      return {
        ...state,
        activeNavItem: payload,
      }

    case ContractsActionType.SET_SELECTED_SCHOOL: {
      return {
        ...state,
        selectedSchool: {
          ...state.selectedSchool,
          schoolId: payload.schoolId,
          contractId: payload.contractId,
        },
      }
    }

    case ContractsActionType.SET_ERROR:
      return {
        ...state,
        error: payload,
      }

    case ContractsActionType.SET_ACTIVE_TAB: {
      return {
        ...state,
        activeTab: payload,
      }
    }

    default:
      return {
        ...state,
      }
  }
}
