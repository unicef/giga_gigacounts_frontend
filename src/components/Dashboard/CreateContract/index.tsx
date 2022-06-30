import { MouseEvent, useReducer } from 'react'
import ConnectionTab from './ConnectionTab/ConnectionTab'
import GeneralTab from './GeneralTab/GeneralTab'
import SchoolsTab from './SchoolsTab/SchoolsTab'
import { ActionType, ActiveTab, ITabItems, reducer, state, TabState } from './store/redux'
import {
  CreateContractContainer,
  Header,
  FormHeaderActions,
  FormHeaderTabs,
  GeneralContainer,
  FormHeaderMessage,
} from './styles'

interface ICreateContractsProps {
  label?: string
}

const tabs = {
  [ActiveTab.GeneralTab]: GeneralTab,
  [ActiveTab.ConnectionTab]: ConnectionTab,
  [ActiveTab.SchoolsTab]: SchoolsTab,
}

const CreateContract: React.FC<ICreateContractsProps> = ({ ...props }): JSX.Element => {
  const [localState, dispatch] = useReducer(reducer, state)

  const {
    generalTabForm,
    activeTab,
    invalidData,
    missingData,
    tabGeneralStatus,
    tabConnectionStatus,
    tabSchoolStatus,
  } = localState

  const tabsItems: ITabItems[] = [
    {
      id: 'generalTab',
      name: 'General',
    },
    {
      id: 'connectionTab',
      name: 'Connection',
    },
    {
      id: 'schoolsTab',
      name: 'Schools',
    },
  ]

  const handleActiveTab = (e: MouseEvent<HTMLButtonElement>) =>
    dispatch({
      type: ActionType.SET_ACTIVE_TAB,
      payload: {
        activeTab: e.currentTarget.id,
        tabGeneralStatus: TabState.DefaultError,
        tabConnectionStatus: TabState.Selected,
        tabSchoolStatus: TabState.Default,
      },
    })

  const TabContent = tabs[activeTab]

  const tabIconState = (status: string) => {
    switch (status) {
      case TabState.Default:
        return <span className={`icon icon-16 circle`} />
      case TabState.DefaultCompleted:
        return <span className={`icon icon-16 icon-checkmark icon-light-blue circle`} />
      case TabState.DefaultError:
        return <span className={`icon icon-16 icon-pointer circle`} />
      case TabState.Selected:
        return <span className={`icon icon-16 circle selected`} />
      case TabState.SelectedCompleted:
        return <span className={`icon icon-16 circle selected`} />
      case TabState.SelectedError:
        return <span className={`icon icon-16 circle selected`} />
      default:
        break
    }
  }

  return (
    <CreateContractContainer>
      <Header>
        <FormHeaderActions>
          <div>
            <h5>New Contract {generalTabForm.contractNumber}</h5>
          </div>
          <div>
            <button className="btn-transparent-grey active">Discard</button>
            {generalTabForm.contractNumber && <button className="btn-blue">Save Draft</button>}
          </div>
          {true && <button className="btn-green">Publish</button>}
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
                {/* {tab.name === ActiveTab.GeneralTab && tabIconState(tabGeneralStatus)}
                {tab.name === ActiveTab.ConnectionTab && tabIconState(tabConnectionStatus)}
                {tab.name === ActiveTab.SchoolsTab && tabIconState(tabSchoolStatus)} */}
                <p>{tab.name}</p>
              </button>
            )
          })}
          <FormHeaderMessage>
            {activeTab === ActiveTab.GeneralTab && (
              <>
                <span className="icon icon-24 icon-expired icon-blue" />
                <p>Please enter the contract name to be able to save the draft</p>
              </>
            )}
            {(missingData || invalidData) && (
              <>
                <span className="icon icon-24 icon-error icon-red" />
                <p className="error">
                  {missingData
                    ? `Some of the tabs are missing information`
                    : `There's invalid data in the indicated tabs. Please correct it before publishing`}
                </p>
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
