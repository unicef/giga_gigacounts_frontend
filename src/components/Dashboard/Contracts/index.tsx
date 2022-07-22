import { useContractsContext } from '../context/useContractsContext'

import ContractListContent from './ContractListContent/ContractListContent'
import ContractListFooter from './ContractListFooter/ContractListFooter'

import ContractGuide from './ContractGuide/ContractGuide'

import { ContractsMenu } from './styles'
import ContractStaged from './ContractStaged'
import { ContractStatus } from './@types/ContractType'
import ContractPending from './ContractPending/ContractPending'
import { ChildrenProps } from 'src/types/utils'

const Contracts: React.FC<ChildrenProps> = (): JSX.Element => {
  const { state, dispatch } = useContractsContext()

  return (
    <>
      <ContractsMenu>
        <ContractListContent />
        <ContractListFooter />
      </ContractsMenu>
      <ContractGuide />
      {state.selectedContract &&
      (state.selectedContract.status === ContractStatus.Sent ||
        state.selectedContract.status === ContractStatus.Confirmed) ? (
        <ContractPending />
      ) : (
        <ContractStaged state={state} dispatch={dispatch} />
      )}
    </>
  )
}

export default Contracts
