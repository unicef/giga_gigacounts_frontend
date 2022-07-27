import { useNavigate } from 'react-router-dom'
import { ContractDetailsContainer } from './styles'
import { useContract } from '../state/hooks'

interface IContractDetailsProps {
  id?: string
}

const ContractDetails: React.FC<IContractDetailsProps> = ({ id }: IContractDetailsProps): JSX.Element => {
  const navigate = useNavigate()
  const contract = useContract(id)

  return (
    <ContractDetailsContainer>
      {contract?.details.loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h5>Contract Number: {contract?.details.data?.name}</h5>
          <h5>Contract IPS {contract?.details.data?.isp}</h5>
          <h5>Contract Start Date {contract?.details.data?.startDate}</h5>
          <button type="button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      )}
    </ContractDetailsContainer>
  )
}

export default ContractDetails
