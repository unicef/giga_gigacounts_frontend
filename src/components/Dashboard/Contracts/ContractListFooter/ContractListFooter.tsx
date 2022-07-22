import { useContractsContext } from '../../context/useContractsContext'
import { ContractsActionType } from '../store/redux'
import { ContractListFooterContainer } from './styles'

const ContractListFooter: React.FC = (): JSX.Element => {
  const { dispatch } = useContractsContext()

  const newContract = {
    name: 'New Contract',
    status: 'Draft',
    added: true,
  }

  const handleAddContract = () => dispatch({ type: ContractsActionType.CREATE_CONTRACT, payload: newContract })

  return (
    <ContractListFooterContainer>
      <button className="btn-frameless" onClick={handleAddContract} style={{ cursor: 'pointer' }}>
        <div className="icon icon-24 icon-plus" />
        New Contract
      </button>
    </ContractListFooterContainer>
  )
}

export default ContractListFooter
