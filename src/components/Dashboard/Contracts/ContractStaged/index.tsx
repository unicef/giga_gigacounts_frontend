import { useEffect, useCallback, Dispatch, useState } from 'react'
import { useParams } from 'react-router-dom'
import { changeContractStatus, getContractDetails, getContractSchools } from 'src/api/contracts'
import ContractStatusWidget from 'src/components/common/ContractStatusWidget'
import File from 'src/components/common/File/File'
import Dialog from 'src/components/common/Dialog/Dialog'
import { ContractsActionType, ContractsState, ContractsAction } from '../store/redux'
import { ContractStagedContainer, ContractStagedHeader } from './styles'
import SchoolsTab from './SchoolsTab/SchoolsTab'
import { ContractStatus } from '../@types/ContractType'

interface IContractDetailsProps {
  state: ContractsState
  dispatch: Dispatch<ContractsAction>
}

const ContractStaged: React.FC<IContractDetailsProps> = ({ state, dispatch }: IContractDetailsProps): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const [showDialog, setShowDialog] = useState(false)
  const { contractDetails, contractSchools, isAttachmentSelected, selectedContract } = state

  const fetchData = useCallback(async () => {
    if (id === undefined) {
      return
    }

    try {
      const contractDetails = await getContractDetails(id)
      const contractSchools = await getContractSchools(id)

      dispatch({
        type: ContractsActionType.SET_CONTRACT_DETAILS_SCHOOLS,
        payload: {
          contractDetails,
          contractSchools,
        },
      })
    } catch (error) {
      dispatch({ type: ContractsActionType.SET_ERROR, payload: error })
    }
  }, [id, dispatch])

  const renderIcons = (i: number) => {
    let icon: string
    switch (i) {
      case 1:
        icon = `icon-plug`
        break
      case 2:
        icon = `icon-meter`
        break
      case 3:
        icon = `icon-down-speed`
        break
      case 4:
        icon = `icon-up-speed`
        break
      default:
        icon = ``
        break
    }
    return icon
  }

  const toggleShowDialog = () => setShowDialog((prevState) => !prevState)
  const onContractStatusChange = async () => {
    try {
      if (selectedContract?.id) await changeContractStatus(selectedContract.id)
      toggleShowDialog()
    } catch (error) {
      dispatch({ type: ContractsActionType.SET_ERROR, payload: error })
    }
  }

  const onAttachmentSelect = () => dispatch({ type: ContractsActionType.SET_ATTACHMENT_SELECTED })

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <ContractStagedContainer>
      {!contractDetails ? (
        <div>Loading...</div>
      ) : (
        <ContractStagedHeader>
          <div className="title">
            <div className="contract-number">
              <span className="icon icon-32 icon-ongoing icon-lighter-blue"></span>
              <h5>{contractDetails.name}</h5>
              {contractDetails.lta && (
                <div className="lta-number">
                  <span className="icon icon-24 icon-contract icon-light-grey"></span>
                  <h5>{contractDetails.lta}</h5>
                </div>
              )}
            </div>

            <button className="title-item attachments-button" onClick={onAttachmentSelect}>
              <span className="icon icon-24 icon-files icon-mid-grey"></span>
              <p className="attachments">Attachments</p>
            </button>

            {isAttachmentSelected && (
              <div className="attachments-dropdown">
                <File fileType="Doc" fileName="Document 1" allowDelete={false} />
                <File fileType="Pdf" fileName="Document 2" allowDelete={false} />
                <File fileType="xls" fileName="Long Long Long Long Title Document" allowDelete={false} />
              </div>
            )}

            <span className="title-item">
              <span className="icon icon-24 icon-network icon-mid-grey"></span>
              <p>{contractDetails.isp}</p>
            </span>
            {selectedContract && selectedContract.status === ContractStatus.Expired && (
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
                  <b>{contractDetails.numberOfSchools}</b>
                </small>
              </div>

              <div className="widget-info">
                {contractDetails.connectionsMedian &&
                  contractDetails.connectionsMedian.map((item, i) => (
                    <div key={i} className="widget-metric">
                      <span className={`icon icon-20 ${renderIcons(item.metric_id)} icon-mid-grey`}></span>
                      <small>
                        <b style={{ textTransform: 'none' }}>{item.median_value + item.unit}</b>
                      </small>
                    </div>
                  ))}
              </div>

              <div className="widget-chart">
                <ContractStatusWidget
                  showOnly="schools"
                  average={contractDetails.schoolsConnection.atLeastOneBellowAvg}
                  good={contractDetails.schoolsConnection.allEqualOrAboveAvg}
                />
              </div>
            </button>

            <button className="widget">
              <div className="widget-title">
                <h5>Payments</h5>
                {/* <small><b>0</b></small> */}
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
                <b>{new Date(contractDetails.startDate).toDateString()}</b>
              </p>
              <span className="icon icon-24 icon-date icon-light-blue"></span>
              <p>End Date:</p>
              <p>
                <b>{new Date(contractDetails.endDate).toDateString()}</b>
              </p>
            </div>
          </div>
        </ContractStagedHeader>
      )}
      <SchoolsTab contractSchools={contractSchools} />
      {showDialog && (
        <Dialog
          type="message"
          message="Before finishing the contract, it is recommended reviewing the current 
        contract situation regarding payments and quality of service provided         
        since this action is not reversible."
          acceptLabel="Proceed"
          onAccepted={onContractStatusChange}
          onRejected={toggleShowDialog}
        />
      )}
    </ContractStagedContainer>
  )
}

export default ContractStaged
