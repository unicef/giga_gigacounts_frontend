import { Dispatch, useCallback, useEffect, useState } from 'react'
import { IContracts } from 'src/components/Dashboard/Contracts/@types/ContractType'
import { Action, State } from 'src/components/Dashboard/Contracts/store/redux'
import ContractItem from './ContractItem/ContractItem'
import {
  ContractLtaFooter,
  ContractLtaSubHeader,
  ContractLtaListItemsContainer,
  Header,
  LtaNumber,
  ShowMore,
  Hand,
} from './styles'

interface IContractListProps {
  ltaNumber: string
  state: State
  dispatch: Dispatch<Action>
}

const ContractLtaListItems: React.FC<IContractListProps> = ({ ltaNumber, state, dispatch }): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [ltaData, setLtaData] = useState<IContracts[]>([])

  const { ltas } = state

  const toggleLtaContainer = () => setIsExpanded((prevState) => !prevState)

  const newContract = {
    name: 'New Contract',
    status: 'Draft',
    added: true,
  }

  const handleAddLtaContract = () => {
    setLtaData((prevState) => [newContract, ...prevState])
  }
  const getLtaData = useCallback(() => {
    if (ltaNumber !== undefined && ltas !== undefined) {
      setLtaData(Object.values(ltas[ltaNumber]))
    }
  }, [ltaNumber, ltas])

  useEffect(() => {
    getLtaData()
  }, [getLtaData])

  return (
    <ContractLtaListItemsContainer isExpanded={isExpanded}>
      <Header isExpanded={isExpanded} onClick={toggleLtaContainer}>
        <Hand className="icon icon-20 icon-agreement icon-white" />
        <LtaNumber isExpanded={isExpanded}>{ltaNumber}</LtaNumber>
        <ShowMore
          className={`icon icon-24 ${isExpanded ? 'icon-arrow-up icon-white' : 'icon-arrow-down icon-darkest-grey'}`}
          isExpanded={isExpanded}
        />
      </Header>
      {isExpanded ? (
        <>
          {ltaData.map((contract, i) => (
            <ContractItem key={i} contract={contract} state={state} dispatch={dispatch} />
          ))}
          <ContractLtaFooter onClick={handleAddLtaContract}>Create Contract Here</ContractLtaFooter>
        </>
      ) : (
        <ContractLtaSubHeader />
      )}
    </ContractLtaListItemsContainer>
  )
}

export default ContractLtaListItems
