import { useCallback, useEffect, useReducer } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

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
  const { path } = useRouteMatch()

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
      <Switch>
        <Route path={`${path}`} exact>
          <ContractGuide />
        </Route>
        <Route path={`${path}/contract`} exact>
          <CreateContract />
        </Route>
        <Route path={`${path}/contract/:id`} exact>
          {localState.selectedContract &&
          (localState.selectedContract.status === ContractStatus.Sent ||
            localState.selectedContract.status === ContractStatus.Confirmed) ? (
            <ContractPending />
          ) : (
            <ContractStaged state={localState} dispatch={dispatch} />
          )}
        </Route>
      </Switch>
    </>
  )
}

export default Contracts
