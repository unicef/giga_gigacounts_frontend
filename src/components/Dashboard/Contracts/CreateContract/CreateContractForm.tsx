import { MouseEvent, useMemo } from 'react'
import { deleteContractDraft, publishContractDraft } from 'src/api/contracts'
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
import { validateForm } from 'src/utils/validateForm'
import { useNavigate } from 'react-router-dom'
import Dialog, { DialogType } from 'src/components/common/Dialog/Dialog'
import { useContractsContext } from '../state/useContractsContext'

interface ICreateContractFormProps {
  label?: string
}

const tabs = {
  [CreateContractActiveTab.GeneralTab]: GeneralTab,
  [CreateContractActiveTab.ConnectionTab]: ConnectionTab,
  [CreateContractActiveTab.SchoolsTab]: SchoolsTab,
}

const CreateContractForm: React.FC<ICreateContractFormProps> = (): JSX.Element => {
  const {
    actions: { reloadContracts },
  } = useContractsContext()
  const {
    state,
    dispatch,
    actions: { saveDraft },
  } = useCreateContractContext()

  const navigate = useNavigate()

  const { draft, contractForm, activeTab, error, showDialog } = state

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
    saveDraft()
  }

  const onPublishDraft = async () => {
    try {
      const response = await publishContractDraft(contractForm, draft.data?.id)
      reloadContracts()
      navigate(`/dashboard/contract/${response?.id}`)
    } catch (error) {
      dispatch({ type: CreateContractActionType.SET_ERROR, payload: { error } })
    }
  }

  const onDeleteDraft = async () => {
    try {
      draft && draft.data && (await deleteContractDraft(draft.data?.id))
      reloadContracts()
      toggleShowDialog()
      navigate('/dashboard')
    } catch (error) {
      dispatch({ type: CreateContractActionType.SET_ERROR, payload: error })
    }
  }

  const toggleShowDialog = () => dispatch({ type: CreateContractActionType.SET_SHOW_DIALOG })

  const TabContent = tabs[activeTab]
  const isFormValid = useMemo(() => validateForm(contractForm), [contractForm])

  return (
    <CreateContractContainer>
      <Header>
        <FormHeaderActions>
          <div>
            <h5>New Contract {contractForm.name}</h5>
          </div>
          <div>
            <button className="btn-transparent-grey active" onClick={toggleShowDialog}>
              Delete
            </button>
            {contractForm.id && (
              <button className="btn-blue" onClick={saveDraft} disabled={state.loading || state.draft.loading}>
                Save Draft
              </button>
            )}
          </div>
          {!isFormValid.length && (
            <button className="btn-green" onClick={onPublishDraft}>
              Publish
            </button>
          )}
        </FormHeaderActions>
        <FormHeaderTabs>
          {tabsItems.map((tab) => {
            return (
              <button
                key={tab.id}
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
      {showDialog && (
        <Dialog
          type={DialogType.WARNING}
          message="By deleting a draft you will lose the progress you have done on the creation of the contract."
          acceptLabel="Delete"
          onAccepted={onDeleteDraft}
          onRejected={toggleShowDialog}
        />
      )}
    </CreateContractContainer>
  )
}
export default CreateContractForm
