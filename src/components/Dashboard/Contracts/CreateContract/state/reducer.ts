import { CreateContractAction, CreateContractActionType, CreateContractState } from './types'

export const reducer = (state: CreateContractState, action: CreateContractAction): CreateContractState => {
  const { type, payload } = action

  switch (type) {
    case CreateContractActionType.SET_ACTIVE_TAB: {
      return {
        ...state,
        activeTab: payload.activeTab,
        tabGeneralStatus: payload.tabGeneralStatus,
        tabConnectionStatus: payload.tabConnectionStatus,
        tabSchoolStatus: payload.tabSchoolStatus,
      }
    }

    case CreateContractActionType.LOAD_DRAFT: {
      const { draft } = payload
      return {
        ...state,
        draft: {
          data: draft,
          loading: false,
          error: undefined,
        },
        contractForm: {
          ...state.contractForm,
          id: draft.id,
          name: draft.name,
          countryId: draft.countryId,
          currencyId: draft.currencyId,
          ltaId: draft.ltaId,
          ispId: draft.ispId,
          expectedMetrics: { metrics: draft.expectedMetrics },
          governmentBehalf: draft.governmentBehalf,
          budget: draft.budget,
          startDate: draft.startDate,
          endDate: draft.endDate,
          schools: { schools: draft.schools },
        },
      }
    }

    case CreateContractActionType.SET_LOADING_DRAFT_ERROR: {
      const { error } = payload
      return {
        ...state,
        draft: {
          data: undefined,
          loading: false,
          error: error.message,
        },
      }
    }

    case CreateContractActionType.GET_FORM_DATA: {
      const { countries, currencies, ltas } = payload
      return {
        ...state,
        countries,
        currencies,
        ltas,
        loading: false,
      }
    }

    case CreateContractActionType.SET_COUNTRY_CODE: {
      const flag = state.countries.find((country) => country.id === payload)?.code ?? 'BW'

      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          countryId: payload,
        },
        flag,
      }
    }

    case CreateContractActionType.SET_CONTRACT_NAME:
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          name: payload,
        },
        error: '',
      }

    case CreateContractActionType.SET_BUDGET:
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          budget: payload,
        },
      }

    case CreateContractActionType.SET_BEHALF_GOVERNMENT: {
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          governmentBehalf: !state.contractForm.governmentBehalf,
        },
      }
    }

    case CreateContractActionType.CREATE_CONTRACT_DRAFT: {
      return {
        ...state,
        loading: false,
        contractForm: {
          ...state.contractForm,
          id: payload.id,
          name: payload.name,
        },
      }
    }

    case CreateContractActionType.UPDATE_CONTRACT_DRAFT: {
      return {
        ...state,
        loading: false,
        contractForm: {
          ...state.contractForm,
          ...payload,
        },
      }
    }

    case CreateContractActionType.SET_CURRENCY_CODE: {
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          currencyId: payload,
        },
      }
    }

    case CreateContractActionType.SET_LTA: {
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          ltaId: payload,
        },
      }
    }

    case CreateContractActionType.SET_START_DATE: {
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          startDate: payload,
        },
      }
    }

    case CreateContractActionType.SET_END_DATE: {
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          endDate: payload,
        },
      }
    }

    case CreateContractActionType.SET_ERROR: {
      return {
        ...state,
        error: payload?.error.message,
      }
    }

    case CreateContractActionType.SET_LOADING:
      return {
        ...state,
        loading: !state.loading,
      }

    case CreateContractActionType.SET_EXPECTED_METRIC: {
      const metricIndex = state.expectedMetrics.metrics.findIndex((m) => m.metricId === payload.metricId)

      const newExpectedMetrics =
        metricIndex >= 0
          ? [
              ...state.contractForm.expectedMetrics.metrics.slice(0, metricIndex),
              {
                ...state.contractForm.expectedMetrics.metrics[metricIndex],
                value: payload.value,
                metricId: payload.metricId,
              },
              ...state.contractForm.expectedMetrics.metrics.slice(metricIndex + 1),
            ]
          : [{ value: payload.value, metricId: payload.metricId }, ...state.contractForm.expectedMetrics.metrics]

      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          expectedMetrics: {
            ...state.contractForm.expectedMetrics,
            metrics: newExpectedMetrics,
          },
        },
      }
    }

    case CreateContractActionType.SET_METRICS_ISPS: {
      const { metrics, isps } = payload

      return {
        ...state,
        metrics,
        isps,
      }
    }

    case CreateContractActionType.SET_SERVICE_PROVIDER: {
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          ispId: +payload,
        },
      }
    }

    case CreateContractActionType.RESPONSE_SCHOOLS: {
      return {
        ...state,
        schools: payload,
      }
    }

    case CreateContractActionType.SELECT_SCHOOL: {
      const index = state.contractForm.schools.schools.findIndex((s) => s.id === payload.id)

      const newSchools =
        index >= 0
          ? [
              ...state.contractForm.schools.schools.slice(0, index),
              ...state.contractForm.schools.schools.slice(index + 1),
            ]
          : [{ id: payload.id }, ...state.contractForm.schools.schools]

      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          schools: {
            ...state.contractForm.schools,
            schools: newSchools,
          },
        },
      }
    }

    case CreateContractActionType.SELECT_SCHOOL_BULK: {
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          schools: {
            ...state.contractForm.schools,
            schools: [...payload, ...state.contractForm.schools.schools],
          },
        },
      }
    }

    default:
      return {
        ...state,
      }
  }
}