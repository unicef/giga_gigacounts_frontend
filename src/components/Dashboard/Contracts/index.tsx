import { useEffect, useReducer } from 'react'
import { getContracts } from 'src/api/contracts'
import ContractListContent from './ContractListContent/ContractListContent'
import ContractListHeader from './ContractListHeader/ContractListHeader'
import ContractListFooter from './ContractListFooter/ContractListFooter'

import { ContractsMenu } from './styles'
import { ActionType, reducer, state } from './store/redux'

interface ContractsProps {
  label?: string
}

const Contracts: React.FC<ContractsProps> = (): JSX.Element => {
  const [localState, dispatch] = useReducer(reducer, state)

  const fetchContracts = async () => {
    try {
      const response = await getContracts()

      dispatch({ type: ActionType.RESPONSE, payload: response })
    } catch (error) {
      dispatch({ type: ActionType.SET_ERROR, payload: error })
    }
  }

  useEffect(() => {
    fetchContracts()
  }, [])

  return (
    <>
      <ContractsMenu>
        <ContractListHeader />
        <ContractListContent state={localState} dispatch={dispatch} />
        <ContractListFooter dispatch={dispatch} />
      </ContractsMenu>
    </>
  )
}

export default Contracts
