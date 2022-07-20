import { useEffect, useCallback, Dispatch } from 'react'
import { useParams } from 'react-router-dom'
import { getContractDetails, getContractSchools } from 'src/api/contracts'
import ContractStatusWidget from 'src/components/common/ContractStatusWidget'
import File from 'src/components/common/File/File'
import { ActionType, State, Action } from '../store/redux'
import { ContractStagedContainer, ContractStagedHeader } from './styles'
import SchoolsTab from './SchoolsTab/SchoolsTab'

interface IContractDetailsProps {
  state: State
  dispatch: Dispatch<Action>
}

const ContractStaged: React.FC<IContractDetailsProps> = ({ state, dispatch }: IContractDetailsProps): JSX.Element => {
  let { id } = useParams<{ id: string }>()

  const { contractDetails, contractSchools, isAttachmentSelected } = state

  const fetchData = useCallback(async () => {
    try {
      const contractDetails = await getContractDetails(id)
      const contractSchools = await getContractSchools(id)

      dispatch({
        type: ActionType.SET_CONTRACT_DETAILS_SCHOOLS,
        payload: {
          contractDetails,
          contractSchools,
        },
      })
    } catch (error) {
      dispatch({ type: ActionType.SET_ERROR, payload: error })
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

  const onAttachmentSelect = () => dispatch({ type: ActionType.SET_ATTACHMENT_SELECTED })

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
          </div>

          <div className="info">
            <button>
              <div className="button-title">
                <h5>Schools</h5>
                <small>
                  <b>{contractDetails.numberOfSchools}</b>
                </small>
              </div>

              <div className="button-info">
                {contractDetails.connectionsMedian &&
                  contractDetails.connectionsMedian.map((item, i) => (
                    <div key={i} className="button-metric">
                      <span className={`icon icon-20 ${renderIcons(item.metric_id)} icon-mid-grey`}></span>
                      <small>
                        <b style={{ textTransform: 'none' }}>{item.median_value + item.unit}</b>
                      </small>
                    </div>
                  ))}
              </div>

              <div className="button-chart">
                <ContractStatusWidget
                  showOnly="schools"
                  average={contractDetails.schoolsConnection.atLeastOneBellowAvg}
                  good={contractDetails.schoolsConnection.allEqualOrAboveAvg}
                />
              </div>
            </button>

            <button>
              <div className="button-title">
                <h5>Payments</h5>
                {/* <small><b>0</b></small> */}
              </div>

              <div className="button-info">
                <div className="button-metric">
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

              <div className="button-chart">
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
    </ContractStagedContainer>
  )
}

export default ContractStaged
