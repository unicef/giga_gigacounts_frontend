import { useNavigate } from 'react-router-dom'
import ContractStatusWidget from 'src/components/common/ContractStatusWidget/index'
import images from 'src/assets/images'
import { ContractGuideContainer, ContractGuideItem, ContractGuideChartItem } from './styles'
import { UserState } from 'src/state/types'
import { ISP_ROLE } from 'src/consts/roles'

interface Props {
  user: UserState
}

const ContractGuide: React.FC<Props> = ({ user }: Props): JSX.Element => {
  const navigate = useNavigate()

  const createDraft = () => navigate('/dashboard/contract')

  return (
    <ContractGuideContainer>
      <div>
        <h5>Contract Status guide</h5>

        <ContractGuideItem>
          <span className="icon icon-32 icon-draft icon-light-blue"></span>
          <p>
            <b>Draft</b>
          </p>
          <div className="super-small">
            The initial state of the contract where all the required information is completed.
          </div>
          {user.data.role !== ISP_ROLE ? (
            <button onClick={createDraft} className="btn-blue">
              Create Draft
            </button>
          ) : (
            <></>
          )}
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
            <ContractStatusWidget average={18} good={25} payments={67} />
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
            <ContractStatusWidget average={10} good={80} expired payments={60} />
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
      </div>

      <div>
        <img src={images.chartExample} style={{ height: '125px' }} alt="Chart" />

        <h5 style={{ marginTop: '21px' }}>Schools connectivity dial</h5>

        <ContractGuideChartItem>
          <img src={images.schoolsGreen} alt="Connected" />
          <div className="super-small">Schools that have been connected and meet the expected quality of service.</div>
        </ContractGuideChartItem>

        <ContractGuideChartItem>
          <img src={images.schoolsOrange} alt="Average" />
          <div className="super-small">
            Schools that have been connected but do not meet the minimum connectivity standards agreed with the
            providers.
          </div>
        </ContractGuideChartItem>

        <ContractGuideChartItem>
          <img src={images.schoolsRed} alt="Poor" />
          <div className="super-small">Schools that haven&apos;t been connected by service provider&apos;s yet.</div>
        </ContractGuideChartItem>

        <h5 style={{ marginTop: '21px' }}>Payments Dial</h5>

        <ContractGuideChartItem>
          <img src={images.payments} alt="Payments" />
          <div className="super-small">
            Represents the part of the budget that has already been consumed by the payments done to the provider.
          </div>
        </ContractGuideChartItem>
      </div>
    </ContractGuideContainer>
  )
}

export default ContractGuide
