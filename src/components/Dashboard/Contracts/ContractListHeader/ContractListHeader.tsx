import { ContractListHeaderContainer } from './styles'

interface ContractListHeaderProps {
  label?: string
}

const ContractListHeader: React.FC<ContractListHeaderProps> = (): JSX.Element => {
  return <ContractListHeaderContainer>Headers Filters / Sort</ContractListHeaderContainer>
}

export default ContractListHeader
