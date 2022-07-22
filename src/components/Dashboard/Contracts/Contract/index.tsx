import { useContractsContext } from 'src/components/Dashboard/context/useContractsContext'
import { ContractStatus } from 'src/components/Dashboard/Contracts/@types/ContractType'
import ContractPending from 'src/components/Dashboard/Contracts/ContractPending/ContractPending'
import ContractStaged from 'src/components/Dashboard/Contracts/ContractStaged'
import { ChildrenProps } from 'src/types/utils'

const Contract: React.FC<ChildrenProps> = (): JSX.Element => {
  const { state, dispatch } = useContractsContext()

  return state.selectedContract &&
    (state.selectedContract.status === ContractStatus.Sent ||
      state.selectedContract.status === ContractStatus.Confirmed) ? (
    <ContractPending />
  ) : (
    <ContractStaged state={state} dispatch={dispatch} />
  )
}

export default Contract
