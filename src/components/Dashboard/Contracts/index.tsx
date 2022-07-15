import { useCallback, useEffect, useReducer } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { getContracts } from 'src/api/contracts'
import { useContractsContext } from '../context/useContractsContext'

import ContractListContent from './ContractListContent/ContractListContent'
import ContractListHeader from './ContractListHeader/ContractListHeader'
import ContractListFooter from './ContractListFooter/ContractListFooter'

import ContractGuide from './ContractGuide/ContractGuide'
import CreateContract from './CreateContract'

import { ContractsMenu } from './styles'
import { ActionType, reducer, state } from './store/redux'
import ContractStaged from './ContractStaged/ContractStaged'

interface ContractsProps {}

const Contracts: React.FC<ContractsProps> = (): JSX.Element => {
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
        <ContractListHeader />
        <ContractListContent state={localState} dispatch={dispatch} />
        <ContractListFooter dispatch={dispatch} />
      </ContractsMenu>
      <Switch>
        <Route path={`${path}`} exact>
          <ContractGuide />
        </Route>
        <Route path={`${path}/create`} exact>
          <CreateContract />
        </Route>
        <Route path={`${path}/contract/:id`} exact>
          <ContractStaged state={localState} dispatch={dispatch} />
        </Route>
      </Switch>
    </>
  )
}

export default Contracts
