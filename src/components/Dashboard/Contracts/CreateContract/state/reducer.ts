import { CONTRACT_FORM_INITIAL_STATE } from './initial-state'
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

    case CreateContractActionType.DRAFT_LOADING: {
      return {
        ...state,
        draft: {
          ...state.draft,
          loading: true,
        },
      }
    }

    case CreateContractActionType.DRAFT_LOADED: {
      const { draft } = payload
      const countryId = draft.country?.id ?? state.contractForm.countryId
      const currencyId = draft.currency?.id ?? state.contractForm.currencyId
      const ltaId = draft.lta?.id ?? state.contractForm.ltaId
      const governmentBehalf = draft.governmentBehalf ?? state.contractForm.governmentBehalf
      const budget = draft.budget ?? state.contractForm.budget
      const startDate = draft.start_date?.length > 0 ? draft.start_date.split('T')[0] : ''
      const endDate = draft.end_date?.length > 0 ? draft.end_date.split('T')[0] : ''
      const expectedMetrics = draft.expectedMetrics
        ? { metrics: draft.expectedMetrics }
        : state.contractForm.expectedMetrics

      const schools = draft.schools ? { schools: draft.schools } : state.contractForm.schools

      return {
        ...state,
        loading: false,
        draft: {
          data: draft,
          loading: false,
          error: undefined,
        },
        contractForm: {
          ...state.contractForm,
          id: draft.id,
          name: draft.name,
          countryId,
          currencyId,
          ltaId,
          governmentBehalf,
          startDate,
          endDate,
          expectedMetrics,
          budget,
          schools,
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
        contractForm: {
          ...state.contractForm,
          countryId: state.contractForm.countryId ?? countries[0].id,
          currencyId: state.contractForm.currencyId ?? currencies[0].id,
        },
      }
    }

    case CreateContractActionType.SET_COUNTRY_CODE: {
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          countryId: payload,
        },
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
      const metricIndex = state.contractForm.expectedMetrics.metrics.findIndex((m) => m.metricId === payload.metricId)

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

    case CreateContractActionType.RESET: {
      const { preset } = payload
      return {
        ...state,
        contractForm: {
          ...CONTRACT_FORM_INITIAL_STATE,
          ...preset,
        },
      }
    }

    default:
      return {
        ...state,
      }
  }
}
