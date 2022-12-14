import { ICountries } from 'src/api/createContract'
import { ICurrency } from 'src/types/general'
import { CONTRACT_FORM_INITIAL_STATE } from './initial-state'
import { CreateContractAction, CreateContractActionType, CreateContractState, MetricId } from './types'

const parseDate = (obj: Record<string, string>, props: string[]) => {
  const prop = props.find((prop) => typeof obj[prop] === 'string' && obj[prop].length > 0)

  if (prop) {
    return obj[prop]?.split('T')[0] ?? ''
  }

  return ''
}
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
      const currencyType = draft.currency?.type ?? state.contractForm.currencyType
      const ltaId = draft.lta?.id ?? state.contractForm.ltaId
      const governmentBehalf = draft.governmentBehalf ?? state.contractForm.governmentBehalf
      const budget = draft.budget ?? state.contractForm.budget
      const ispId = draft.isp?.id ?? state.contractForm.ispId

      const startDate = parseDate(draft, ['startDate', 'start_date'])
      const endDate = parseDate(draft, ['endDate', 'end_date'])

      const expectedMetrics = draft.expectedMetrics
        ? { metrics: draft.expectedMetrics }
        : state.contractForm.expectedMetrics

      const schools = draft.schools?.schools ?? draft.schools ?? state.contractForm.schools?.schools

      return {
        ...state,
        loading: false,
        draft: {
          data: { ...draft, attachments: draft.attachments ?? state.draft.data?.attachments },
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
          schools: { schools },
          ispId,
          currencyType,
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
      const { countries, currencies } = payload

      const countryId =
        countries.find((country: ICountries) => country.id === state.contractForm.countryId)?.id ?? countries[0].id
      const currency =
        currencies.find((currency: ICurrency) => currency.id === state.contractForm.currencyId) ?? currencies[0]

      return {
        ...state,
        countries,
        currencies,
        loading: false,
        contractForm: {
          ...state.contractForm,
          countryId,
          currencyId: currency.id,
          currencyType: currency.type,
        },
      }
    }

    case CreateContractActionType.SET_COUNTRY_CODE: {
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          countryId: payload,
          ltaId: undefined,
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
        error: undefined,
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
      const validationErrors = payload?.error?.response?.data?.errors

      if (validationErrors?.length > 0) {
        return {
          ...state,
          error: new Error(validationErrors[0].message),
        }
      }

      if (payload?.error?.response) {
        return {
          ...state,
          error: new Error(payload?.error?.response?.data || 'Something went wrong!'),
        }
      }

      return {
        ...state,
        error: new Error(payload?.error?.message),
      }
    }

    case CreateContractActionType.SET_LOADING:
      return {
        ...state,
        loading: !state.loading,
      }

    case CreateContractActionType.SET_EXPECTED_METRIC: {
      const metricIndex = state.contractForm.expectedMetrics.metrics.findIndex((m) => m.metricId === payload.metricId)

      const value = +payload.metricId === MetricId.uptime ? Math.min(payload.value, 100) : payload.value

      const newExpectedMetrics =
        metricIndex >= 0
          ? [
              ...state.contractForm.expectedMetrics.metrics.slice(0, metricIndex),
              {
                ...state.contractForm.expectedMetrics.metrics[metricIndex],
                value: value,
                metricId: payload.metricId,
              },
              ...state.contractForm.expectedMetrics.metrics.slice(metricIndex + 1),
            ]
          : [{ value: value, metricId: payload.metricId }, ...state.contractForm.expectedMetrics.metrics]

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
          ispId: payload,
        },
      }
    }

    case CreateContractActionType.SET_SCHOOLS_LOADING: {
      return {
        ...state,
        schools: {
          ...state.schools,
          loading: true,
        },
      }
    }

    case CreateContractActionType.SET_SCHOOLS_ERROR: {
      return {
        ...state,
        schools: {
          ...state.schools,
          error: payload,
          loading: false,
        },
      }
    }

    case CreateContractActionType.RESPONSE_SCHOOLS: {
      return {
        ...state,
        schools: {
          data: payload.schools,
          error: undefined,
          loading: false,
          meta: {
            country_id: payload.country_id,
          },
        },
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
      const { preset } = payload ?? {}

      const countryId = state.countries[0].id

      return {
        ...state,
        contractForm: {
          ...CONTRACT_FORM_INITIAL_STATE,
          countryId,
          ...preset,
        },
      }
    }

    case CreateContractActionType.SET_SHOW_DIALOG: {
      return {
        ...state,
        showDialog: !state.showDialog,
      }
    }

    case CreateContractActionType.GET_LTS_BY_COUNTRY_ID: {
      const { countryId, ltas } = payload
      return {
        ...state,
        ltas: {
          ...state.ltas,
          [countryId]: ltas,
        },
        contractForm: {
          ...state.contractForm,
          countryId: countryId,
        },
      }
    }

    case CreateContractActionType.SET_CURRENCY_TYPE: {
      return {
        ...state,
        contractForm: {
          ...state.contractForm,
          currencyType: payload,
        },
      }
    }

    default:
      return {
        ...state,
      }
  }
}
