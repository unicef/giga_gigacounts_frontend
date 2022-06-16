import { ContractListHeaderContainer } from './ContractListHeader.css';

interface ContractListHeaderProps {
  label?: string;
}

const ContractListHeader: React.FC<ContractListHeaderProps> = ({ ...props }: ContractListHeaderProps): JSX.Element => {
  return <ContractListHeaderContainer>Headers Filters / Sort</ContractListHeaderContainer>;
};

export default ContractListHeader;
