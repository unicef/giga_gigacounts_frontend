import { useMemo } from 'react'
import School from 'src/components/common/School/School'
import File from 'src/components/common/File/File'
import { IContract } from 'src/components/Dashboard/Contracts//@types/ContractType'
import FormattedDate from 'src/components/common/Date'
import { ContractPendingContainer } from './styles'

interface PendingContractProps {
  contract: IContract
}

const PendingContract: React.FC<PendingContractProps> = ({ contract }: PendingContractProps): JSX.Element => {
  const uptime = useMemo(
    () => contract.details.data?.connectionsMedian.find(({ metric_id }) => metric_id === 1),
    [contract.details.data?.connectionsMedian],
  )

  const latency = useMemo(
    () => contract.details.data?.connectionsMedian.find(({ metric_id }) => metric_id === 2),
    [contract.details.data?.connectionsMedian],
  )

  const downloadSpeed = useMemo(
    () => contract.details.data?.connectionsMedian.find(({ metric_id }) => metric_id === 3),
    [contract.details.data?.connectionsMedian],
  )

  const uploadSpeed = useMemo(
    () => contract.details.data?.connectionsMedian.find(({ metric_id }) => metric_id === 3),
    [contract.details.data?.connectionsMedian],
  )

  return (
    <ContractPendingContainer>
      <div className="title">
        <div className="title-item contract-number">
          <h5>{contract.name}</h5>
          <div className="lta-number">
            <span className="icon icon-24 icon-contract icon-mid-grey"></span>
            <p>
              <b>{contract.ltaId}</b>
            </p>
          </div>
        </div>

        <div className="title-item notice">
          <span className="icon icon-24 icon-expired icon-light-blue"></span>
          <small>
            <b>Message</b>
          </small>
        </div>
      </div>

      <div className="content">
        <div className="info">
          <div className="info-header">
            <h5>{contract.country?.name}</h5>
            {contract.governmentBehalf && <p>The contract is conducted by the government of Botswana</p>}
          </div>

          <div className="info-line">
            <span className="icon icon-24 icon-coins icon-mid-grey"></span>
            <p>Budget:</p>
            <p>
              <b>{contract.budget?.budget}</b>
            </p>
          </div>

          <div className="info-dates">
            <div className="info-line">
              <span className="icon icon-24 icon-date icon-mid-grey"></span>
              <p>Start Date:</p>
              <p>
                {contract.details.data?.startDate ? (
                  <FormattedDate date={contract.details.data?.startDate} bold color="var(--color-dark-blue)" />
                ) : (
                  '--'
                )}
              </p>
            </div>

            <div className="info-line">
              <span className="icon icon-24 icon-date icon-mid-grey"></span>
              <p>Valid Through:</p>
              <p>
                {contract.details.data?.endDate ? (
                  <FormattedDate date={contract.details.data?.endDate} bold color="var(--color-dark-blue)" />
                ) : (
                  '--'
                )}
              </p>
            </div>
          </div>

          <div className="info-qos">
            <h5>Expected Quality of Service</h5>
            <hr />

            <div className="info-line">
              <span className="icon icon-24 icon-network icon-mid-grey"></span>
              <p>Service Provider:</p>
              <p>
                <b>{contract.details.data?.isp}</b>
              </p>
            </div>

            <div className="info-qos-metrics">
              <div className="info-line">
                <span className="icon icon-24 icon-plug icon-mid-grey"></span>
                <p>Uptime:</p>
                <p>
                  <b>{uptime?.median_value ?? 0}</b>
                </p>
                <p>%</p>
              </div>

              <div className="info-line">
                <span className="icon icon-24 icon-meter icon-mid-grey"></span>
                <p>Latency:</p>
                <p>
                  <b>{latency?.median_value ?? 0}</b>
                </p>
                <p>ms</p>
              </div>

              <div className="info-line">
                <span className="icon icon-24 icon-down-speed icon-mid-grey"></span>
                <p>Download Speed:</p>
                <p>
                  <b>{downloadSpeed?.median_value ?? 0}</b>
                </p>
                <p>ms</p>
              </div>

              <div className="info-line">
                <span className="icon icon-24 icon-up-speed icon-mid-grey"></span>
                <p>Upload Speed:</p>
                <p>
                  <b>{uploadSpeed?.median_value ?? 0}</b>
                </p>
                <p>ms</p>
              </div>
            </div>
          </div>

          <div className="info-attachments">
            <h5>Attachments</h5>
            <hr />
            <div className="info-attachments-files">
              {contract.details.data?.attachments?.map((attachment) => (
                <File
                  type={attachment.name.split('.').at(-1)}
                  url={attachment.url}
                  name={attachment.name}
                  key={attachment.id}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="schools">
          {contract.details.data?.schools.map((school) => (
            <School
              key={school.id}
              name={school.name}
              id={school.id}
              location={school.locations}
              status={school.connection.value}
            />
          ))}
        </div>
      </div>
    </ContractPendingContainer>
  )
}

export default PendingContract
