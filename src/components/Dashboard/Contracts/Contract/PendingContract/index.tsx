import { useMemo } from 'react'
import School from 'src/components/common/School/School'
import File from 'src/components/common/File/File'
import { ContractStatus, IContract } from 'src/types/general'
import FormattedDate from 'src/components/common/Date'
import { ContractPendingContainer } from './styles'
import PendingContractMessage from './PendingContractMessage'
import PendingContractCountryBanner from './PendingContractCountryBanner'

interface PendingContractProps {
  contract: IContract<ContractStatus.Sent | ContractStatus.Confirmed>
}

const PendingContract: React.FC<PendingContractProps> = ({ contract }: PendingContractProps): JSX.Element => {
  const uptime = useMemo(
    () => contract.details.data?.expectedMetrics.find(({ metricId }) => metricId.toString() === '1'),
    [contract.details.data?.expectedMetrics],
  )

  const latency = useMemo(
    () => contract.details.data?.expectedMetrics.find(({ metricId }) => metricId.toString() === '2'),
    [contract.details.data?.expectedMetrics],
  )

  const downloadSpeed = useMemo(
    () => contract.details.data?.expectedMetrics.find(({ metricId }) => metricId.toString() === '3'),
    [contract.details.data?.expectedMetrics],
  )

  const uploadSpeed = useMemo(
    () => contract.details.data?.expectedMetrics.find(({ metricId }) => metricId.toString() === '4'),
    [contract.details.data?.expectedMetrics],
  )

  return (
    <ContractPendingContainer>
      <div className="title">
        <div className="title-item contract-number">
          <h5>{contract.name}</h5>
          {contract.ltaId !== null && (
            <div className="lta-number">
              <span className="icon icon-24 icon-contract icon-mid-grey"></span>
              <p>
                <b>{contract.ltaId}</b>
              </p>
            </div>
          )}
        </div>
        <PendingContractMessage status={contract.status} />
      </div>

      <div className="content">
        <div className="info">
          {!!contract.country && (
            <PendingContractCountryBanner country={contract.country} governmentBehalf={contract.governmentBehalf} />
          )}

          <div className="info-line">
            <span className="icon icon-24 icon-coins icon-mid-grey"></span>
            <p>Budget:</p>
            <p>
              <b>
                {contract.details.data?.currency?.code} {contract.details.data?.budget}
              </b>
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
                  <b>{uptime?.value ?? 0}</b>
                </p>
                <p>%</p>
              </div>

              <div className="info-line">
                <span className="icon icon-24 icon-meter icon-mid-grey"></span>
                <p>Latency:</p>
                <p>
                  <b>{latency?.value ?? 0}</b>
                </p>
                <p>ms</p>
              </div>

              <div className="info-line">
                <span className="icon icon-24 icon-down-speed icon-mid-grey"></span>
                <p>Download Speed:</p>
                <p>
                  <b>{downloadSpeed?.value ?? 0}</b>
                </p>
                <p>ms</p>
              </div>

              <div className="info-line">
                <span className="icon icon-24 icon-up-speed icon-mid-grey"></span>
                <p>Upload Speed:</p>
                <p>
                  <b>{uploadSpeed?.value ?? 0}</b>
                </p>
                <p>ms</p>
              </div>
            </div>
          </div>

          <div className="info-attachments">
            <h5>Attachments</h5>
            <hr />
            <div className="info-attachments-files">
              {contract.details.data?.attachments === undefined ||
                (contract.details.data?.attachments.length === 0 && <p>No attachments.</p>)}
              {contract.details.data?.attachments?.map(({ url, name, id }) => (
                <File url={url} name={name} key={id} id={id} />
              ))}
            </div>
          </div>
        </div>

        <div className="schools">
          {contract.details.data?.schools.map((school) => (
            <School key={school.id} name={school.name} id={school.id} location={school.locations} />
          ))}
        </div>
      </div>
    </ContractPendingContainer>
  )
}

export default PendingContract
