import { useNavigate } from 'react-router-dom'
import { ContractListFooterContainer } from './styles'
import { useRoleCheck } from 'src/state/hooks'
import { ISP_ROLE } from 'src/consts/roles'

const ContractListFooter: React.FC = (): JSX.Element => {
  const navigate = useNavigate()

  const handleAddContract = () =>
    navigate('contract', {
      state: {
        reset: true,
      },
    })

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
