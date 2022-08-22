import { useParams } from 'react-router-dom'
import Contract from 'src/components/Dashboard/Contracts/Contract'

const ContractView: React.FC = (): JSX.Element => {
  const { contractId } = useParams<{ contractId: string }>()
  return <Contract id={contractId} />
}

export default ContractView
