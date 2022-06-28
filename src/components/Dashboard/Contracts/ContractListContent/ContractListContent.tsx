import { Dispatch, useEffect, useState } from 'react'
import { Action, State } from '../store/redux'

import ContractDefaultListItem from '../ContractListContent/ContractDefaultListItem/ContractDefaultListItem'
import ContractLtaListItems from './ContractLtaListItems/ContractLtaListItems'
import ContractSchoolStatus from './ContactSchoolStatus/ContractSchoolStatus'
import ContractLoader from './ContractLoader/ContractLoader'

import { ContractListContainer } from './styles'
import { IContracts } from '../@types/ContractType'

interface ContractListProps {
  state: State
  dispatch: Dispatch<Action>
}

const ContractListContent: React.FC<ContractListProps> = ({ state, dispatch }: ContractListProps): JSX.Element => {
  const [ltaNumber, setLtaNumber] = useState<string[]>()
  const [selected, setSelected] = useState<string>('')

  const { contracts, loading } = state

  const handleSelected = (id: string) => {
    setSelected(id)
  }

  const getLtaNumber = () => {
    const arr: string[] = []
    if (state.ltas !== undefined) {
      for (const lta in state.ltas) {
        arr.push(lta)
      }
      setLtaNumber(arr)
    }
  }

  useEffect(() => {
    getLtaNumber()
  }, [state])

  const contractItem = (school: IContracts, i: number) => {
    if (school?.added) {
      return <ContractDefaultListItem key={i} />
    } else {
      return (
        <ContractSchoolStatus
          key={i}
          school={school}
          state={state}
          dispatch={dispatch}
          onToggle={handleSelected}
          selected={selected === school.id}
        />
      )
    }
  }

  return (
    <ContractListContainer>
      {loading ? (
        <ContractLoader />
      ) : (
        <>
          {ltaNumber?.map((item, i) => {
            return <ContractLtaListItems key={i} state={state} dispatch={dispatch} ltaNumber={item} />
          })}
          <>{contracts !== undefined && contracts.map((school, i) => contractItem(school, i))}</>
        </>
      )}
    </ContractListContainer>
  )
}

export default ContractListContent
