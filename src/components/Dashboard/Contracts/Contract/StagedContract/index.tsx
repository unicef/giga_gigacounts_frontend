import { useState } from 'react'
import { useContractsContext } from 'src/components/Dashboard/Contracts/state/useContractsContext'
import { ContractsActionType } from 'src/components/Dashboard/Contracts/state/types'
import { ContractStatus, IContract } from 'src/types/general'
import File from 'src/components/common/File/File'
import Dialog, { DialogType } from 'src/components/common/Dialog/Dialog'
import SchoolsTab from './SchoolsTab/SchoolsTab'
import ContractStatusWidget from 'src/components/common/ContractStatusWidget'
import { ContractStagedContainer, ContractStagedHeader } from './styles'
import { publishContractToCompleted } from 'src/api/contracts'
interface IContractDetailsProps {
  contract: IContract<ContractStatus.Ongoing | ContractStatus.Expired>
}

const getMetricIconClassName = (metricId: number) => {
  switch (metricId) {
    case 1:
      return `icon-plug`
    case 2:
      return `icon-meter`
    case 3:
      return `icon-down-speed`
    case 4:
      return `icon-up-speed`
    default:
      return ``
  }
}

const ContractStaged: React.FC<IContractDetailsProps> = ({ contract }: IContractDetailsProps): JSX.Element => {
  const [attachmentsSelected, setAttachmentsSelected] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const onAttachmentSelect = () => setAttachmentsSelected(true)
  const {
    dispatch,
    actions: { reloadContracts },
  } = useContractsContext()

  const toggleShowDialog = () => setShowDialog((prevState) => !prevState)

  const onContractStatusChange = async () => {
    try {
      if (contract && contract.id) await publishContractToCompleted(contract.id)
      toggleShowDialog()
      reloadContracts()
    } catch (error) {
      dispatch({ type: ContractsActionType.SET_ERROR, payload: error })
    }
  }

  return (
    <ContractStagedContainer>
      {contract?.details.loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ContractStagedHeader>
            <div className="title">
              <div className="contract-number">
                <span className="icon icon-32 icon-ongoing icon-lighter-blue"></span>
                <h5>{contract?.details.data?.name}</h5>
                {contract?.details.data?.lta && (
                  <div className="lta-number">
                    <span className="icon icon-24 icon-contract icon-light-grey"></span>
                    <h5>{contract?.details.data?.lta}</h5>
                  </div>
                )}
              </div>

              <button className="title-item attachments-button" onClick={onAttachmentSelect}>
                <span className="icon icon-24 icon-files icon-mid-grey"></span>
                <p className="attachments">Attachments</p>
              </button>

              {attachmentsSelected && (
                <div className="attachments-dropdown">
                  {contract.details.data?.attachments.map(({ id, name }) => (
                    <File key={id} name={name} id={id} allowDelete={false} />
                  ))}
                </div>
              )}

              <span className="title-item">
                <span className="icon icon-24 icon-network icon-mid-grey"></span>
                <p>{contract?.details.data?.isp}</p>
              </span>
              {contract && contract.status === ContractStatus.Expired && (
                <button className="title-item btn-blue" onClick={toggleShowDialog}>
                  Finish
                </button>
              )}
            </div>

            <div className="info">
              <button className="widget">
                <div className="widget-title">
                  <h5>Schools</h5>
                  <small>
                    <b>{contract?.details.data?.numberOfSchools}</b>
                  </small>
                </div>

                <div className="widget-info">
                  {contract?.details.data?.connectionsMedian &&
                    contract?.details.data?.connectionsMedian.map((item, i) => (
                      <div key={i} className="widget-metric">
                        <span className={`icon icon-20 ${getMetricIconClassName(item.metric_id)} icon-mid-grey`}></span>
                        <small>
                          <b style={{ textTransform: 'none' }}>{item.median_value + item.unit}</b>
                        </small>
                      </div>
                    ))}
                </div>

                <div className="widget-chart">
                  <ContractStatusWidget
                    showOnly="schools"
                    average={contract?.details.data?.schoolsConnection.atLeastOneBellowAvg}
                    good={contract?.details.data?.schoolsConnection.allEqualOrAboveAvg}
                  />
                </div>
              </button>

              <button className="widget">
                <div className="widget-title">
                  <h5>Payments</h5>
                </div>

                <div className="widget-info">
                  <div className="widget-metric">
                    <span className="icon icon-20 icon-coins icon-mid-grey"></span>
                    <small>
                      <b>0</b>
                    </small>
                    <small>
                      <b>/</b>
                    </small>
                    <small className="icon-light-blue">
                      <b>0</b>
                    </small>
                  </div>
                </div>

                <div className="widget-chart">
                  <ContractStatusWidget showOnly="payments" payments={0} />
                  <small>
                    <b>0%</b>
                  </small>
                </div>
              </button>

              <div className="dates">
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
              </div>
            </div>
          </ContractStagedHeader>
          <SchoolsTab contractSchools={contract?.details.data?.schools ?? []} />
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
        </>
      )}
    </ContractStagedContainer>
  )
}

export default ContractStaged
