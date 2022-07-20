import { Dispatch, useCallback, useEffect } from 'react'
import { Action, ActionType, State } from '../store/redux'

import ContractLtaListItems from './ContractLtaListItems/ContractLtaListItems'
import ContractLoader from './ContractLoader/ContractLoader'

import { ContractListContainer } from './styles'
import ContractItem from './ContractLtaListItems/ContractItem/ContractItem'

interface ContractListProps {
  state: State
  dispatch: Dispatch<Action>
}

const ContractListContent: React.FC<ContractListProps> = ({ state, dispatch }: ContractListProps): JSX.Element => {
  const { contracts, ltaNumbers, ltas, loading } = state

  const loadLtaNumber = useCallback(() => {
    const arr: string[] = []
    if (ltas !== undefined) {
      for (const lta in ltas) {
        arr.push(lta)
      }
    }
    dispatch({ type: ActionType.SET_LTA_NUMBERS, payload: arr })
  }, [ltas, dispatch])

  useEffect(() => {
    loadLtaNumber()
  }, [ltas, loadLtaNumber])

  return (
    <ContractListContainer>
      {loading ? (
        <ContractLoader />
      ) : (
        <>
          {ltaNumbers?.map((item, i) => (
            <ContractLtaListItems key={i} state={state} dispatch={dispatch} ltaNumber={item} />
          ))}
          <>
            {contracts !== undefined &&
              contracts.map((contract, i) => (
                <ContractItem key={i} contract={contract} state={state} dispatch={dispatch} />
              ))}
          </>
        </>
      )}
    </ContractListContainer>
  )
}

export default ContractListContent
