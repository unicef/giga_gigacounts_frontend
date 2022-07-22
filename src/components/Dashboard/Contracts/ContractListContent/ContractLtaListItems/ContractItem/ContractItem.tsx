import { Dispatch } from 'react'
import { useNavigate } from 'react-router-dom'

import { ContractStatus, IContracts } from '../../../@types/ContractType'
import { ContractsAction, ContractsActionType, ContractsState } from '../../../store/redux'
import ContractSchoolStatus from '../../ContactSchoolStatus/ContractSchoolStatus'
import ContractDefaultListItem from '../../ContractDefaultListItem/ContractDefaultListItem'

interface ContractItemProps {
  state: ContractsState
  contract: IContracts

  dispatch: Dispatch<ContractsAction>
}

const ContractItem: React.FC<ContractItemProps> = ({ contract, state, dispatch }: ContractItemProps): JSX.Element => {
  const navigate = useNavigate()

  const { selectedContract } = state

  const handleSelected = (ctr: IContracts) => {
    dispatch({ type: ContractsActionType.SET_SELECTED_CONTRACT, payload: ctr })

    if (ctr && ctr.status !== ContractStatus.Draft) {
      navigate(`/dashboard/contract/${ctr?.id}`)
    } else {
      navigate(`/dashboard/contract`)
    }
  }

  return (
    <>
      {contract?.added ? (
        <ContractDefaultListItem />
      ) : (
        <ContractSchoolStatus
          contract={contract}
          state={state}
          dispatch={dispatch}
          onToggle={handleSelected}
          selected={selectedContract?.id === contract.id}
        />
      )}
    </>
  )
}

export default ContractItem
