import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IContract } from 'src/components/Dashboard/Contracts/@types/ContractType'
import { useLtaContracts } from 'src/components/Dashboard/Contracts/state/hooks'
import { NEW_CONTRACT } from 'src/components/Dashboard/Contracts/state/initial-state'
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
import { UserState } from 'src/state/types'
import { ISP_ROLE } from 'src/consts/roles'

interface IContractListProps {
  ltaNumber: string
  user: UserState
}

const ContractLtaListItems: React.FC<IContractListProps> = ({ ltaNumber, user }: IContractListProps): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const contracts = useLtaContracts(ltaNumber)

  const selectedContract = useMemo(() => contracts?.find((contract: IContract) => contract.id === id), [contracts, id])

  const [isExpanded, setIsExpanded] = useState<boolean>(selectedContract !== undefined)

  const [newContracts, setNewContracts] = useState<IContract[]>([])

  const allContracts = useMemo(() => [...newContracts, ...(contracts ?? [])], [contracts, newContracts])

  const toggleLtaContainer = () => setIsExpanded((prevState) => !prevState)

  const handleAddLtaContract = () => {
    setNewContracts((prevState) => [NEW_CONTRACT, ...prevState])
  }

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
          {allContracts.map((contract, i) => (
            <ContractItem key={i} contract={contract} selected={selectedContract?.id === contract.id} />
          ))}
          {user.data.role !== ISP_ROLE ? (
            <ContractLtaFooter onClick={handleAddLtaContract}>Create Contract Here</ContractLtaFooter>
          ) : (
            <></>
          )}
        </>
      ) : (
        <ContractLtaSubHeader />
      )}
    </ContractLtaListItemsContainer>
  )
}

export default ContractLtaListItems
