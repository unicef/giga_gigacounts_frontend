import { ContractsAction, ContractsActionType, ContractsState } from './types'
import { IContract } from 'src/types/general'
import { uniqBy } from 'src/utils/uniqBy'
import { months } from 'src/consts/months'
import { formatMetricValue } from 'src/utils/formatMetricValue'
import { map } from 'src/utils/map'
import { clean } from 'src/utils/clean'

export const reducer = (state: ContractsState, action: ContractsAction): ContractsState => {
  const { type, payload } = action

  switch (type) {
    case ContractsActionType.SET_NEW_CONTRACT: {
      const { newContract } = payload
      return {
        ...state,
        newContract,
      }
    }
    case ContractsActionType.SET_LOADING: {
      return {
        ...state,
        loading: true,
      }
    }

    case ContractsActionType.RESPONSE: {
      const { contracts, ltas: ltaGroups } = payload

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
      const ltas = uniqBy(clean(map(allContracts, 'lta')), 'id')

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

    case ContractsActionType.SET_SCHOOL_MEASURES: {
      let date, medianValue, metricName

      if (payload.length > 0) {
        const result = Object.keys(payload[0]).map((key: string) => ({
          [key]: payload.map((obj: { [x: string]: any }) => obj[key]),
        }))

        const chunkArray = (arr: number[], chunk_size: number) => {
          let resultArr = []
          while (arr.length) {
            resultArr.push(arr.splice(0, chunk_size))
          }
          return resultArr
        }

        result?.forEach((item) => {
          if (item.date) {
            const uniqueDate: Set<number> = new Set(item.date.map((date: string) => new Date(date).getMonth()))
            date = Array.from(uniqueDate).map((monthNumber) => {
              return months[monthNumber]
            })
          }
          if (item.metric_name) {
            const unique: Set<string> = new Set(item.metric_name)
            metricName = Array.from(unique)
          }
          if (item.median_value) {
            const arrayOfSizeFour = chunkArray(item.median_value, 4)
            medianValue = arrayOfSizeFour.map((chunkValue: number[]) =>
              chunkValue.map((value, i) => formatMetricValue(value, i)),
            )
          }
        })

        return {
          ...state,
          schoolQosDate: date,
          schoolQosMetricName: metricName,
          schoolQosMedianValue: medianValue,
          noSchoolMetricData: false,
          loading: false,
        }
      }
      return {
        ...state,
        noSchoolMetricData: true,
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

    case ContractsActionType.SET_SELECTED_CONTRACT_LIST_ID: {
      return {
        ...state,
        selectedContractListId: payload,
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
