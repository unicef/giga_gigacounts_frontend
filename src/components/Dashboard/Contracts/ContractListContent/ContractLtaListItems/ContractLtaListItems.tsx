import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ILta } from 'src/types/general'
import { ISP_ROLE } from 'src/consts/roles'
import { useRoleCheck } from 'src/state/hooks'
import { useLtaContracts, useSelectedContract } from 'src/components/Dashboard/Contracts/state/hooks'
import { useContractsContext } from 'src/components/Dashboard/Contracts/state/useContractsContext'
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

interface IContractListProps {
  lta: ILta
}

const ContractLtaListItems: React.FC<IContractListProps> = ({ lta }: IContractListProps): JSX.Element => {
  const navigate = useNavigate()
  const { state } = useContractsContext()

  const newContract = useMemo(
    () => state.newContract && state.newContract.ltaId === lta.id,
    [lta.id, state.newContract],
  )

  const contracts = useLtaContracts(lta.id)

  const isISP = useRoleCheck(ISP_ROLE)

  const selectedContract = useSelectedContract()

  const [isExpanded, setIsExpanded] = useState<boolean>(selectedContract !== undefined)

  const toggleLtaContainer = () => setIsExpanded((prevState) => !prevState)

  const handleAddLtaContract = () => {
    navigate('contract', {
      state: {
        preset: {
          ltaId: contracts?.[0].lta?.id,
          countryCode: contracts?.[0].country?.code,
        },
        reset: true,
      },
    })
  }

  useEffect(() => {
    if (newContract !== undefined || selectedContract !== undefined) {
      setIsExpanded(true)
    }
  }, [newContract, selectedContract])

  return (
    <ContractLtaListItemsContainer isExpanded={isExpanded}>
      <Header isExpanded={isExpanded} onClick={toggleLtaContainer}>
        <Hand className="icon icon-20 icon-agreement icon-white" />
        <LtaNumber isExpanded={isExpanded}>{lta.name}</LtaNumber>
        <ShowMore
          className={`icon icon-24 ${isExpanded ? 'icon-arrow-up icon-white' : 'icon-arrow-down icon-darkest-grey'}`}
          isExpanded={isExpanded}
        />
      </Header>
      {isExpanded ? (
        <>
          {contracts?.map((contract, i) => (
            <ContractItem key={i} contract={contract} selected={selectedContract?.listId === contract.listId} />
          ))}
          {newContract && <ContractItem contract={NEW_CONTRACT} selected />}
          {!isISP ? <ContractLtaFooter onClick={handleAddLtaContract}>Create Contract Here</ContractLtaFooter> : <></>}
        </>
      ) : (
        <ContractLtaSubHeader />
      )}
    </ContractLtaListItemsContainer>
  )
}

export default ContractLtaListItems
