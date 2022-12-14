import { useState } from 'react'
import {
  ContractLtaEmptyText,
  ContractLtaFooter,
  ContractLtaHeader,
  ContractLtaIcon,
  ContractLtaListItemContainer,
  ContractLtaNumber,
  IconShowMore
} from './styles'

interface ContractListProps {
  label?: string;
}

const ContractLtaListItem: React.FC<ContractListProps> = (): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleLtaContainer = () => setIsExpanded((prevState) => !prevState)

  return (
    <ContractLtaListItemContainer isExpanded={isExpanded} onClick={toggleLtaContainer}>
      <ContractLtaHeader isExpanded={isExpanded}>
        <ContractLtaIcon>
          <span className="icon icon-20 icon-agreement icon-white" />
        </ContractLtaIcon>
        <ContractLtaNumber isExpanded={isExpanded}>LTA Number</ContractLtaNumber>
        <IconShowMore
          className={`icon icon-24 ${isExpanded ? 'icon-arrow-up icon-white' : 'icon-arrow-down icon-darkest-grey'}`}
          isExpanded={isExpanded}
        />
      </ContractLtaHeader>

      {isExpanded && (
        <>
          <ContractLtaEmptyText>There are no contracts followed by this LTA</ContractLtaEmptyText>
          <ContractLtaFooter>Create One</ContractLtaFooter>
        </>
      )}
    </ContractLtaListItemContainer>
  )
}

export default ContractLtaListItem
