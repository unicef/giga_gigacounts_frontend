import { MouseEvent, useReducer } from 'react'
import { updateContractDraft } from 'src/api/contracts'
import { useContractsContext } from 'src/components/Dashboard/context/useContractsContext'
import ConnectionTab from './ConnectionTab/ConnectionTab'
import GeneralTab from './GeneralTab/GeneralTab'
import SchoolsTab from './SchoolsTab/SchoolsTab'
import { ActionType, ActiveTab, ITabItems, reducer, state, TabState } from './store/redux'
import { CreateContractContainer, Header, FormHeaderActions, FormHeaderTabs, FormHeaderMessage } from './styles'

interface ICreateContractsProps {
  label?: string
}

const tabs = {
  [ActiveTab.GeneralTab]: GeneralTab,
  [ActiveTab.ConnectionTab]: ConnectionTab,
  [ActiveTab.SchoolsTab]: SchoolsTab,
}

const CreateContract: React.FC<ICreateContractsProps> = (): JSX.Element => {
  const [localState, dispatch] = useReducer(reducer, state)
  const { setLoadContracts } = useContractsContext()

  const { contractForm, activeTab, error } = localState

  const tabsItems: ITabItems[] = [
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

  const handleActiveTab = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: ActionType.SET_ACTIVE_TAB,
      payload: {
        activeTab: e.currentTarget.id,
        tabGeneralStatus: TabState.DefaultError,
        tabConnectionStatus: TabState.Selected,
        tabSchoolStatus: TabState.Default,
      },
    })
    onSaveDraft()
  }

  const onSaveDraft = async () => {
    try {
      if (contractForm.name && contractForm.name.length > 0 && contractForm.id) {
        const { name, ...rest } = contractForm
        const response = await updateContractDraft(rest)

        let formatStartDate: string = ''
        let formatEndDate: string = ''

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

        dispatch({ type: ActionType.UPDATE_CONTRACT_DRAFT, payload: formattedResponse })
        setLoadContracts?.(true)
      }
    } catch (error) {
      dispatch({ type: ActionType.SET_ERROR, payload: error })
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
              <button className="btn-blue" onClick={onSaveDraft}>
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
                onClick={handleActiveTab}
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
      <TabContent state={localState} dispatch={dispatch} />
    </CreateContractContainer>
  )
}
export default CreateContract
