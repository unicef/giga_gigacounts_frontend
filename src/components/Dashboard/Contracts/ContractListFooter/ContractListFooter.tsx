import { useNavigate } from 'react-router-dom'
import { useRoleCheck } from 'src/state/hooks'
import { UserRole } from 'src/types/general'
import { ContractListFooterContainer } from './styles'

const ContractListFooter: React.FC = (): JSX.Element => {
  const navigate = useNavigate()

  const handleAddContract = () =>
    navigate('contract?', {
      state: {
        reset: true,
      },
    })

  return (
    <ContractListFooterContainer>
      {!useRoleCheck(UserRole.ISP) && (
        <button className="btn-frameless" onClick={handleAddContract} style={{ cursor: 'pointer' }}>
          <div className="icon icon-24 icon-plus" />
          New Contract
        </button>
      )}
    </ContractListFooterContainer>
  )
}

export default ContractListFooter
