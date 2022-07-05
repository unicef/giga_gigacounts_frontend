import { useCallback, useEffect, useReducer } from 'react'
import { getContracts } from 'src/api/contracts'
import ContractListContent from './ContractListContent/ContractListContent'
import ContractListHeader from './ContractListHeader/ContractListHeader'
import ContractListFooter from './ContractListFooter/ContractListFooter'

import { ContractsMenu } from './styles'
import { ActionType, reducer, state } from './store/redux'
import { useContractsContext } from '../context/useContractsContext'

interface ContractsProps {
  label?: string
}

const Contracts: React.FC<ContractsProps> = (): JSX.Element => {
  const [localState, dispatch] = useReducer(reducer, state)
  const { loadContracts, setLoadContracts } = useContractsContext()

  const fetchContracts = useCallback(async () => {
    try {
      const response = await getContracts()
      dispatch({ type: ActionType.RESPONSE, payload: response })
      setLoadContracts?.(false)
    } catch (error) {
      dispatch({ type: ActionType.SET_ERROR, payload: error })
    }
  }, [setLoadContracts])

  useEffect(() => {
    if (loadContracts) {
      loadContracts && fetchContracts()
    }
  }, [loadContracts, fetchContracts])

  useEffect(() => {
    fetchContracts()
  }, [fetchContracts])

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
