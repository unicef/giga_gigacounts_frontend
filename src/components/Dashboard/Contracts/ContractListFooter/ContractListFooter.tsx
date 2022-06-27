import { Dispatch } from 'react'
import { Action, ActionType } from '../store/redux'
import { ContractListFooterContainer } from './styles'

interface IFooterProps {
  dispatch: Dispatch<Action>;
}

const ContractListFooter: React.FC<IFooterProps> = ({ dispatch }): JSX.Element => {
  const newContract = {
    name: 'New Contract',
    status: 'Draft',
    added: true
  }

  const handleAddContract = () => dispatch({ type: ActionType.CREATE_CONTRACT, payload: newContract })

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
