import { useContractsContext } from '../state/useContractsContext'
import { ContractsActionType } from '../state/types'
import { ContractListFooterContainer } from './styles'
import { useRoleCheck } from 'src/state/hooks'
import { ISP_ROLE } from 'src/consts/roles'
import { useNavigate } from 'react-router-dom'

const ContractListFooter: React.FC = (): JSX.Element => {
  const { dispatch } = useContractsContext()
  const navigate = useNavigate()

  const newContract = {
    name: 'New Contract',
    status: 'Draft',
    added: true,
  }

  const handleAddContract = () => {
    navigate('/dashboard/contract')
    dispatch({ type: ContractsActionType.CREATE_CONTRACT, payload: newContract })
  }

  return (
    <ContractListFooterContainer>
      {!useRoleCheck(ISP_ROLE) && (
        <button className="btn-frameless" onClick={handleAddContract} style={{ cursor: 'pointer' }}>
          <div className="icon icon-24 icon-plus" />
          New Contract
        </button>
      )}
    </ContractListFooterContainer>
  )
}

export default ContractListFooter
