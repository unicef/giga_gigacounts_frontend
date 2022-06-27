import { ContractGuideContainer, ContractGuideItem } from './styles'
import ContractStatusWidget from 'src/components/common/ContractStatusWidget/index'

interface ContractsProps {
  label?: string
}

const ContractGuide: React.FC<ContractsProps> = (): JSX.Element => {
  return (
    <ContractGuideContainer>
      <h5>COntract Status guide</h5>

      <ContractGuideItem>
        <span className="icon icon-32 icon-draft icon-light-blue"></span>
        <p>
          <b>Draft</b>
        </p>
        <div className="super-small">
          The initial state of the contract where all the required information is completed.
        </div>
        <button className="btn-blue">Create Draft</button>
      </ContractGuideItem>

      <ContractGuideItem>
        <span className="icon icon-32 icon-sent icon-light-blue"></span>
        <p>
          <b>Sent for ISP Confirmation</b>
        </p>
        <div className="super-small">For Internet Service Provider to confirm the contract terms</div>
      </ContractGuideItem>

      <ContractGuideItem>
        <span className="icon icon-32 icon-confirmed icon-green"></span>
        <p>
          <b>Confirmed</b>
        </p>
        <div className="super-small">
          Every party has agreed on the contract terms and the starting date of the contract has not arrived.
        </div>
      </ContractGuideItem>

      <ContractGuideItem>
        <span>
          <ContractStatusWidget selected={false} average={18} good={25} expired={false} payments={67} />
        </span>
        <p>
          <b>Ongoing</b>
        </p>
        <div className="super-small">
          The contract is in progress so schools start getting connected, metrics reported, and payments performed.
        </div>
      </ContractGuideItem>

      <ContractGuideItem>
        <span>
          <ContractStatusWidget selected={false} average={10} good={80} expired={true} payments={60} />
        </span>
        <p>
          <b>Expired</b>
        </p>
        <div className="super-small">When the end date passed the contract obtains expired status</div>
      </ContractGuideItem>

      <ContractGuideItem>
        <span className="icon icon-18 icon-checkmark icon-blue completed"></span>
        <p>
          <b>Completed</b>
        </p>
        <div className="super-small">There are no pending actions for a contract</div>
      </ContractGuideItem>
    </ContractGuideContainer>
  )
}

export default ContractGuide
