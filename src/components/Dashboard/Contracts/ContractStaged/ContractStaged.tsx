import { useEffect, useCallback, Dispatch } from 'react'
import { useParams } from 'react-router-dom'
import { getContractDetails } from 'src/api/contracts'
import { ActionType, State, Action } from '../store/redux'
import ContractStatusWidget from '../../../common/ContractStatusWidget/index'
import { ContractStagedContainer, ContractStagedHeader } from './styles'

interface IContractDetailsProps {
  state: State
  dispatch: Dispatch<Action>
}

const ContractStaged: React.FC<IContractDetailsProps> = ({ state, dispatch }: IContractDetailsProps): JSX.Element => {
  let { id } = useParams<{ id: string }>()
  const { contractDetails } = state

  const fetchData = useCallback(async () => {
    try {
      const response = await getContractDetails(id)

      dispatch({ type: ActionType.SET_CONTRACT_DETAILS, payload: response })
    } catch (error) {
      dispatch({ type: ActionType.SET_ERROR, payload: error })
    }
  }, [id, dispatch])

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

              {contractDetails.lta ? (
                <div className="lta-number">
                  <span className="icon icon-24 icon-contract icon-light-grey"></span>
                  <h5>{contractDetails.lta}</h5>
                </div>
              ) : (
                ''
              )}
            </div>

            <span className="title-item">
              <span className="icon icon-24 icon-files icon-mid-grey"></span>
              <p>Attachments</p>
            </span>

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
                  contractDetails.connectionsMedian.map((item, i) => {
                    let icon
                    switch (item.metric_id) {
                      case 1:
                        icon = <span className={`icon icon-20 icon-plug icon-mid-grey`}></span>
                        break
                      case 2:
                        icon = <span className={`icon icon-20 icon-meter icon-mid-grey`}></span>
                        break
                      case 3:
                        icon = <span className={`icon icon-20 icon-down-speed icon-mid-grey`}></span>
                        break
                      case 4:
                        icon = <span className={`icon icon-20 icon-up-speed icon-mid-grey`}></span>
                        break

                      default:
                        break
                    }

                    return (
                      <div key={i} className="button-metric">
                        {icon}
                        <small>
                          <b style={{ textTransform: 'none' }}>{item.median_value + item.unit}</b>
                        </small>
                      </div>
                    )
                  })}
              </div>

              <div className="button-chart">
                <ContractStatusWidget
                  average={contractDetails.schoolsConnection.atLeastOneBellowAvg}
                  good={contractDetails.schoolsConnection.allEqualOrAboveAvg}
                  payments={60}
                />
              </div>
            </button>

            <button>
              <div className="button-title">
                <h5>Payments</h5>
                <small>
                  <b>6</b>
                </small>
              </div>

              <div className="button-info">
                <div className="button-metric">
                  <span className="icon icon-20 icon-coins icon-mid-grey"></span>
                  <small>
                    <b>9000000</b>
                  </small>
                  <small>
                    <b>/</b>
                  </small>
                  <small>
                    <b>6000000</b>
                  </small>
                </div>
              </div>

              <div className="button-chart">
                <ContractStatusWidget average={10} good={80} payments={60} />
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
    </ContractStagedContainer>
  )
}

export default ContractStaged
