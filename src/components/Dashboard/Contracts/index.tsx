import ContractListContent from './ContractListContent/ContractListContent';
import ContractListHeader from './ContractListHeader/ContractListHeader';
import ContractListFooter from './ContractListFooter/ContractListFooter';

import { ContractsContainer } from './index.css';

interface ContractsProps {
  label?: string;
}

const Contracts: React.FC<ContractsProps> = ({ ...props }: ContractsProps): JSX.Element => {
  return (
    <ContractsContainer>
      <ContractListHeader />
      <ContractListContent />
      <ContractListFooter />
    </ContractsContainer>
  );
};

export default Contracts;
