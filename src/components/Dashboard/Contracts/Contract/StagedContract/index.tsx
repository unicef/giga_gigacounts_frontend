import ContractStatusWidget from 'src/components/common/ContractStatusWidget'
import File from 'src/components/common/File/File'
import { ContractStagedContainer, ContractStagedHeader } from './styles'
import SchoolsTab from './SchoolsTab/SchoolsTab'
import { useState } from 'react'
import { IContract } from 'src/components/Dashboard/Contracts/@types/ContractType'

interface IContractDetailsProps {
  contract: IContract
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

  const onAttachmentSelect = () => setAttachmentsSelected(true)

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
                  <File type="Doc" name="Document 1" allowDelete={false} />
                  <File type="Pdf" name="Document 2" allowDelete={false} />
                  <File type="xls" name="Long Long Long Long Title Document" allowDelete={false} />
                </div>
              )}

              <span className="title-item">
                <span className="icon icon-24 icon-network icon-mid-grey"></span>
                <p>{contract?.details.data?.isp}</p>
              </span>
            </div>

            <div className="info">
              <button>
                <div className="button-title">
                  <h5>Schools</h5>
                  <small>
                    <b>{contract?.details.data?.numberOfSchools}</b>
                  </small>
                </div>

                <div className="button-info">
                  {contract?.details.data?.connectionsMedian &&
                    contract?.details.data?.connectionsMedian.map((item, i) => (
                      <div key={i} className="button-metric">
                        <span className={`icon icon-20 ${getMetricIconClassName(item.metric_id)} icon-mid-grey`}></span>
                        <small>
                          <b style={{ textTransform: 'none' }}>{item.median_value + item.unit}</b>
                        </small>
                      </div>
                    ))}
                </div>

                <div className="button-chart">
                  <ContractStatusWidget
                    showOnly="schools"
                    average={contract?.details.data?.schoolsConnection.atLeastOneBellowAvg}
                    good={contract?.details.data?.schoolsConnection.allEqualOrAboveAvg}
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
        </>
      )}
    </ContractStagedContainer>
  )
}

export default ContractStaged
