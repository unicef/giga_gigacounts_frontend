import { useMemo } from 'react'
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
  expanded?: boolean
  onClick?: (item: string) => void
}

const ContractLtaListItems: React.FC<IContractListProps> = ({
  lta,
  expanded = false,
  onClick,
}: IContractListProps): JSX.Element => {
  const navigate = useNavigate()
  const { state } = useContractsContext()
  const selectedContract = useSelectedContract()

  const newContract = useMemo(
    () => state.newContract && state.newContract.ltaId === lta.id,
    [lta.id, state.newContract],
  )

  const contracts = useLtaContracts(lta.id)

  const isISP = useRoleCheck(ISP_ROLE)

  const toggleLtaContainer = () => onClick?.(lta.id)

  const handleAddLtaContract = () => {
    navigate('contract', {
      state: {
        preset: {
          ltaId: lta.id,
          countryId: lta.country_id,
        },
        reset: true,
      },
    })
  }

  return (
    <ContractLtaListItemsContainer isExpanded={expanded}>
      <Header isExpanded={expanded} onClick={toggleLtaContainer}>
        <Hand className="icon icon-20 icon-agreement icon-white" />
        <LtaNumber isExpanded={expanded}>{lta.name}</LtaNumber>
        <ShowMore
          className={`icon icon-24 ${expanded ? 'icon-arrow-up icon-white' : 'icon-arrow-down icon-darkest-grey'}`}
          isExpanded={expanded}
        />
      </Header>
      {expanded ? (
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
