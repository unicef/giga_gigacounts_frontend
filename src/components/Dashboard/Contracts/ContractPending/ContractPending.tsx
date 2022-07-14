import {
  ContractPendingContainer,
  ContractPendingHeader,
  ContractPendingInfo,
  ContractPendingSchools,
  ContractPendingLine,
  ContractPendingBlock,
} from './styles'

interface IContractsProps {}

const ContractPending: React.FC<IContractsProps> = (): JSX.Element => {
  return (
    <ContractPendingContainer>
      <ContractPendingHeader>
        <div>
          <h5>Contact Number</h5>
          <span className="icon icon-24 icon-contract icon-mid-grey"></span>
          <p>
            <b>LTA Number</b>
          </p>
        </div>
        <div>
          <span className="icon icon-24 icon-expired icon-light-blue"></span>
          <small>
            <b>Message</b>
          </small>
        </div>
      </ContractPendingHeader>

      <ContractPendingInfo>
        <ContractPendingBlock>
          <h5>Botswana</h5>
          <p>The contract is conducted by the government of Botswana</p>
        </ContractPendingBlock>

        <ContractPendingBlock>
          <ContractPendingLine>
            <span className="icon icon-24 icon-coins icon-mid-grey"></span>
            <p>Budget:</p>
            <p>
              <b>BWP 90000</b>
            </p>
          </ContractPendingLine>

          <ContractPendingLine>
            <span className="icon icon-24 icon-date icon-mid-grey"></span>
            <p>Start Date:</p>
            <p>
              <b>May 24, 2022</b>
            </p>
          </ContractPendingLine>

          <ContractPendingLine>
            <span className="icon icon-24 icon-date icon-mid-grey"></span>
            <p>Valid Through:</p>
            <p>
              <b>May 24, 2024</b>
            </p>
          </ContractPendingLine>
        </ContractPendingBlock>

        <ContractPendingBlock>
          <h5>Expected Quality of Service</h5>
          <hr />

          <ContractPendingLine>
            <span className="icon icon-24 icon-network icon-mid-grey"></span>
            <p>Service Provider:</p>
            <p>
              <b>Vivo</b>
            </p>
          </ContractPendingLine>

          <ContractPendingLine>
            <span className="icon icon-24 icon-plug icon-mid-grey"></span>
            <p>Uptime:</p>
            <p>
              <b>100</b>
            </p>
            <p>%</p>
          </ContractPendingLine>

          <ContractPendingLine>
            <span className="icon icon-24 icon-meter icon-mid-grey"></span>
            <p>Latency:</p>
            <p>
              <b>50</b>
            </p>
            <p>ms</p>
          </ContractPendingLine>

          <ContractPendingLine>
            <span className="icon icon-24 icon-down-speed icon-mid-grey"></span>
            <p>Download Speed:</p>
            <p>
              <b>20</b>
            </p>
            <p>ms</p>
          </ContractPendingLine>

          <ContractPendingLine>
            <span className="icon icon-24 icon-up-speed icon-mid-grey"></span>
            <p>Upload Speed:</p>
            <p>
              <b>10</b>
            </p>
            <p>ms</p>
          </ContractPendingLine>
        </ContractPendingBlock>

        <h5>Attachments</h5>
      </ContractPendingInfo>

      <ContractPendingSchools></ContractPendingSchools>
    </ContractPendingContainer>
  )
}

export default ContractPending
