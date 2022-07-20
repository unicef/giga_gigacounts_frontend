import { useCallback, useEffect, useReducer } from 'react'
import { Route, Routes } from 'react-router-dom'

import { getContracts } from 'src/api/contracts'
import { useContractsContext } from '../context/useContractsContext'

import ContractListContent from './ContractListContent/ContractListContent'
import ContractListFooter from './ContractListFooter/ContractListFooter'

import ContractGuide from './ContractGuide/ContractGuide'
import CreateContract from './CreateContract'

import { ContractsMenu } from './styles'
import { ActionType, reducer, state } from './store/redux'
import ContractStaged from './ContractStaged'
import { ContractStatus } from './@types/ContractType'
import ContractPending from './ContractPending/ContractPending'

const Contracts: React.FC<{}> = (): JSX.Element => {
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
        <ContractListContent state={localState} dispatch={dispatch} />
        <ContractListFooter dispatch={dispatch} />
      </ContractsMenu>
      <Routes>
        <Route path="/dashboard">
          <ContractGuide />
        </Route>
        <Route path="/dashboard/contract">
          <CreateContract />
        </Route>
        <Route path="dashboard/contract/:id">
          {localState.selectedContract &&
          (localState.selectedContract.status === ContractStatus.Sent ||
            localState.selectedContract.status === ContractStatus.Confirmed) ? (
            <ContractPending />
          ) : (
            <ContractStaged state={localState} dispatch={dispatch} />
          )}
        </Route>
      </Routes>
    </>
  )
}

export default Contracts
