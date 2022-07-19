import React, { useCallback, useEffect, useReducer } from 'react'
import { ContractsProvider } from './context/ContractsContext'
import { ActionType, reducer, state } from './store/redux'
import { getContractsCounts, getUserProfile } from 'src/api/dashboard'

import Navigation from './Navigation/Navigation'
import Contracts from './Contracts'

import { DashboardContainer } from './styles'

const ADMIN_ROLE = 'Giga Admin'

const Dashboard: React.FC = (): JSX.Element => {
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
      </ContractsProvider>
    </DashboardContainer>
  )
}

export default Dashboard
