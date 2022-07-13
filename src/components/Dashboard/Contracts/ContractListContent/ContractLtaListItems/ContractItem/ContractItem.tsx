import { Dispatch } from 'react'
import { ContractStatus, IContracts } from '../../../@types/ContractType'
import { Action, ActionType, State } from '../../../store/redux'
import ContractSchoolStatus from '../../ContactSchoolStatus/ContractSchoolStatus'
import ContractDefaultListItem from '../../ContractDefaultListItem/ContractDefaultListItem'

import { useHistory, useRouteMatch } from 'react-router-dom'

interface ContractItemProps {
  state: State
  contract: IContracts

  dispatch: Dispatch<Action>
}

const ContractItem: React.FC<ContractItemProps> = ({ contract, state, dispatch }: ContractItemProps): JSX.Element => {
  const { path } = useRouteMatch()
  const history = useHistory()

  const { selectedContract } = state

  const handleSelected = (ctr: IContracts) => {
    dispatch({ type: ActionType.SET_SELECTED_CONTRACT, payload: ctr })

    if (ctr && ctr.status !== ContractStatus.Draft) {
      history.push(`${path}/contract/${ctr?.id}`)
    } else {
      history.push(`${path}/create`)
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
