import { useMemo, useRef, useState } from 'react'
import { useContractsContext } from 'src/components/Dashboard/Contracts/state/useContractsContext'
import {
  ContractsActionType,
  ContractStagedActiveTab as StagedContractTab,
  ContractStagedTabItems,
} from 'src/components/Dashboard/Contracts/state/types'
import { ContractStatus, IContract } from 'src/types/general'
import File from 'src/components/common/File/File'
import Dialog, { DialogType } from 'src/components/common/Dialog/Dialog'
import SchoolsTab from './SchoolsTab/SchoolsTab'
import {
  Attachments,
  AttachmentsDropdown,
  ContractNumber,
  ContractStagedContainer,
  ContractStagedHeader,
  Dates,
  Header,
  Info,
  LtaNumber,
  TitleItem,
} from './styles'
import { publishContractToCompleted } from 'src/api/contracts'

import PaymentsTab from './PaymentsTab/PaymentsTab'
import TabButtons from './TabButtons/TabButtons'
import { createAction } from 'src/utils/createAction'
import Text from 'src/components/common/Text'
import { useOnClickOutside } from 'src/hooks/useOnClickOutside'
import Loader from 'src/components/common/Loader'
interface IContractDetailsProps {
  contract: IContract<ContractStatus.Ongoing | ContractStatus.Expired>
}

const tabs = {
  [StagedContractTab.SchoolsTab]: SchoolsTab,
  [StagedContractTab.PaymentsTab]: PaymentsTab,
}

const StagedContract: React.FC<IContractDetailsProps> = ({ contract }: IContractDetailsProps): JSX.Element => {
  const [attachmentsExpanded, setAttachmentsExpanded] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  const attachmentsRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(attachmentsRef, () => setAttachmentsExpanded(false))
  const onAttachmentClick = () => setAttachmentsExpanded((prev) => !prev)

  const {
    state: { activeTab },
    dispatch,
    actions: { reloadContracts, setSelectedTab },
  } = useContractsContext()

  const toggleShowDialog = () => setShowDialog((prevState) => !prevState)

  const onContractStatusChange = async () => {
    try {
      if (contract && contract.id) await publishContractToCompleted(contract.id)
      toggleShowDialog()
      reloadContracts()
    } catch (error) {
      dispatch(createAction(ContractsActionType.SET_ERROR, error))
    }
  }

  const onSwitchTab = (tab: ContractStagedTabItems) => setSelectedTab(tab.id)

  const contractStagedTabItems: ContractStagedTabItems[] = useMemo(
    () => [
      {
        id: 'schoolTab',
        name: 'Schools',
      },
      {
        id: 'paymentsTab',
        name: 'Payments',
      },
    ],
    [],
  )

  const TabContent = tabs[activeTab]

  return (
    <>
      {contract?.details.loading ? (
        <Loader />
      ) : (
        <ContractStagedContainer>
          <ContractStagedHeader>
            <Header>
              <ContractNumber>
                <span className="icon icon-32 icon-ongoing icon-lighter-blue"></span>
                <h5>{contract?.details.data?.name}</h5>
                {contract?.details.data?.lta && (
                  <LtaNumber>
                    <span className="icon icon-24 icon-contract icon-light-grey"></span>
                    <h5>{contract?.details.data?.lta}</h5>
                  </LtaNumber>
                )}
              </ContractNumber>
              <div ref={attachmentsRef}>
                <button className="title-item attachments-button" onClick={onAttachmentClick}>
                  <span className="icon icon-24 icon-files icon-mid-grey"></span>
                  <Attachments>Attachments</Attachments>
                </button>
                {attachmentsExpanded && (
                  <AttachmentsDropdown>
                    {contract.details.data?.attachments.length === 0 && <Text fontSize="14px">No attachments</Text>}
                    {contract.details.data?.attachments.map(({ id, name }) => (
                      <File key={id} name={name} id={id} allowDelete={false} />
                    ))}
                  </AttachmentsDropdown>
                )}
              </div>
              <TitleItem>
                <span className="icon icon-24 icon-network icon-mid-grey"></span>
                <p>{contract?.details.data?.isp}</p>
              </TitleItem>
              {contract && contract.status === ContractStatus.Expired && (
                <button className="title-item btn-blue" onClick={toggleShowDialog}>
                  Finish
                </button>
              )}
            </Header>
            <Info>
              {contractStagedTabItems.map((tab) => (
                <TabButtons
                  key={tab.id}
                  tab={tab}
                  contract={contract}
                  onSwitchTab={onSwitchTab}
                  selected={activeTab === tab.id}
                />
              ))}
              <Dates>
                <span className="icon icon-24 icon-date icon-light-blue"></span>
                <p>Start Date:</p>
                <p>
                  <b>{new Date(contract?.details.data?.startDate!).toDateString()}</b>
                </p>
                <span className="icon icon-24 icon-date icon-light-blue"></span>
                <p>End Date:</p>
                <p>
                  <b>{new Date(contract?.details.data?.endDate!).toDateString()}</b>
                </p>
              </Dates>
            </Info>
          </ContractStagedHeader>
          <TabContent contractSchools={contract?.details.data?.schools ?? []} />
          {showDialog && (
            <Dialog
              type={DialogType.MESSAGE}
              message={`Before finishing the contract, it is recommended reviewing the current 
        contract situation regarding payments and quality of service provided         
        since this action is not reversible.`}
              acceptLabel="Proceed"
              onAccepted={onContractStatusChange}
              onRejected={toggleShowDialog}
            />
          )}
        </ContractStagedContainer>
      )}
    </>
  )
}

export default StagedContract
