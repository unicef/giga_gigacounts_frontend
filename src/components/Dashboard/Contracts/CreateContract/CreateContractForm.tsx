import { MouseEvent } from 'react'
import { updateContractDraft } from 'src/api/contracts'
import ConnectionTab from './ConnectionTab/ConnectionTab'
import GeneralTab from './GeneralTab/GeneralTab'
import SchoolsTab from './SchoolsTab/SchoolsTab'
import { useCreateContractContext } from './state/useCreateContractContext'
import { CreateContractContainer, Header, FormHeaderActions, FormHeaderTabs, FormHeaderMessage } from './styles'
import {
  CreateContractActionType,
  CreateContractActiveTab,
  CreateContractTabState,
  CreateContractTab,
} from './state/types'

interface ICreateContractFormProps {
  label?: string
}

const tabs = {
  [CreateContractActiveTab.GeneralTab]: GeneralTab,
  [CreateContractActiveTab.ConnectionTab]: ConnectionTab,
  [CreateContractActiveTab.SchoolsTab]: SchoolsTab,
}

const CreateContractForm: React.FC<ICreateContractFormProps> = (): JSX.Element => {
  const { state, dispatch } = useCreateContractContext()

  const { contractForm, activeTab, error } = state

  const tabsItems: CreateContractTab[] = [
    {
      id: 'generalTab',
      name: 'General',
    },
    {
      id: 'connectionTab',
      name: 'Connection and Qos',
    },
    {
      id: 'schoolsTab',
      name: 'Schools',
    },
  ]

  const onSwitchTab = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: CreateContractActionType.SET_ACTIVE_TAB,
      payload: {
        activeTab: e.currentTarget.id,
        tabGeneralStatus: CreateContractTabState.DefaultError,
        tabConnectionStatus: CreateContractTabState.Selected,
        tabSchoolStatus: CreateContractTabState.Default,
      },
    })
    onSaveDraft()
  }

  const onSaveDraft = async () => {
    try {
      if (contractForm.name && contractForm.name.length > 0 && contractForm.id) {
        const response = await updateContractDraft(contractForm)

        let formatStartDate = ''
        let formatEndDate = ''

        if (response?.start_date?.length > 0) {
          formatStartDate = response.start_date.slice(0, 10)
        }

        if (response?.end_date?.length > 0) {
          formatEndDate = response.end_date.slice(0, 10)
        }

        const formattedResponse = {
          id: +response.id,
          name: response.name,
          countryId: response.country_id,
          currencyId: response.currency_id,
          ltaId: response.lta_id,
          governmentBehalf: response.government_behalf,
          startDate: formatStartDate,
          endDate: formatEndDate,
        }

        dispatch({ type: CreateContractActionType.UPDATE_CONTRACT_DRAFT, payload: formattedResponse })
      }
    } catch (error) {
      dispatch({ type: CreateContractActionType.SET_ERROR, payload: { error } })
    }
  }

  const TabContent = tabs[activeTab]

  return (
    <CreateContractContainer>
      <Header>
        <FormHeaderActions>
          <div>
            <h5>New Contract {contractForm.name}</h5>
          </div>
          <div>
            <button className="btn-transparent-grey active">Discard</button>
            {contractForm.id && (
              <button className="btn-blue" onClick={onSaveDraft} disabled={state.loading || state.draft.loading}>
                Save Draft
              </button>
            )}
          </div>
          {/* <button className="btn-green">Publish</button> */}
        </FormHeaderActions>
        <FormHeaderTabs>
          {tabsItems.map((tab, i) => {
            return (
              <button
                key={i}
                id={tab.id}
                name={tab.name}
                onClick={onSwitchTab}
                className={`${activeTab === tab.id ? 'active' : ''}`}
              >
                <span className={`icon icon-16 circle ${activeTab === tab.id ? 'selected' : ''}`} />
                <p>{tab.name}</p>
              </button>
            )
          })}
          <FormHeaderMessage>
            {error && (
              <>
                <span className="icon icon-24 icon-error icon-red" />
                <p className="error">{error}</p>
              </>
            )}
          </FormHeaderMessage>
        </FormHeaderTabs>
      </Header>
      <TabContent />
    </CreateContractContainer>
  )
}
export default CreateContractForm
