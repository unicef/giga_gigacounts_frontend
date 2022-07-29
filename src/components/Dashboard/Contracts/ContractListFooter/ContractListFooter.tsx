import { useContractsContext } from '../state/useContractsContext'
import { ContractsActionType } from '../state/types'
import { ContractListFooterContainer } from './styles'
import { UserState } from 'src/state/types'
import { ISP_ROLE } from 'src/consts/roles'

interface Props {
  user: UserState
}

const ContractListFooter: React.FC<Props> = ({ user }: Props): JSX.Element => {
  const { dispatch } = useContractsContext()

  const newContract = {
    name: 'New Contract',
    status: 'Draft',
    added: true,
  }

  const handleAddContract = () => dispatch({ type: ContractsActionType.CREATE_CONTRACT, payload: newContract })

  return (
    <ContractListFooterContainer>
      {user.data.role !== ISP_ROLE ? (
        <button className="btn-frameless" onClick={handleAddContract} style={{ cursor: 'pointer' }}>
          <div className="icon icon-24 icon-plus" />
          New Contract
        </button>
      ) : (
        <></>
      )}
    </ContractListFooterContainer>
  )
}

export default ContractListFooter
