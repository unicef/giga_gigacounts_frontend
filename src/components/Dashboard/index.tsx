import React, { useCallback, useEffect, useReducer } from 'react'
import Navigation from './Navigation/Navigation'
import Contracts from './Contracts'

import { DashboardContainer } from './styles'
import ContractGuide from './ContractGuide/ContractGuide'
import CreateContract from '../Dashboard/CreateContract/index'
import { ContractsProvider } from './context/ContractsContext'
import { getContractsCounts, getUserProfile } from 'src/api/dashboard'
import { ActionType, reducer, state } from './store/redux'
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom'

const ADMIN_ROLE = 'Giga Admin'

const ContractDetails = () => {
  let { id } = useParams<{ id: string }>()
  const history = useHistory()
  // console.log(history)

  return (
    <div>
      <p> URL ID {id}</p>
      <button type="button" onClick={history.goBack}>
        Go Back
      </button>
    </div>
  )
}

const Dashboard: React.FC = () => {
  let { path } = useRouteMatch()
  const [localState, dispatch] = useReducer(reducer, state)

  const {
    user: { name, role, country },
    contractCounts,
  } = localState

  const fetchData = useCallback(async () => {
    try {
      const getUser = await getUserProfile()
      const getCounts = await getContractsCounts()

      if (getUser.role === ADMIN_ROLE)
        dispatch({ type: ActionType.GET_ADMIN_PROFILE, payload: { user: getUser, contractCounts: getCounts } })
      else dispatch({ type: ActionType.GET_USER_PROFILE, payload: { user: getUser, contractCounts: getCounts } })
    } catch (error) {
      dispatch({ type: ActionType.SET_ERROR, payload: error })
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <DashboardContainer>
      <Navigation
        admin={role === ADMIN_ROLE}
        countryName={country?.name}
        role={role}
        countryPath={`./flags/${country?.code || ''}.svg`}
        name={name}
        contractCounts={contractCounts.counts}
      />
      <ContractsProvider>
        <Contracts />
        <Switch>
          <Route path={`${path}`} exact>
            <ContractGuide />
          </Route>
          <Route path={`${path}/create`} exact>
            <CreateContract />
          </Route>
          <Route path={`${path}/contract/:id`} exact>
            <ContractDetails />
          </Route>
        </Switch>
      </ContractsProvider>
    </DashboardContainer>
  )
}

export default Dashboard
