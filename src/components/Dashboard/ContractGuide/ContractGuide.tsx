import { ContractGuideContainer } from './styles';

interface ContractsProps {
  label?: string;
}

const ContractGuide: React.FC<ContractsProps> = (): JSX.Element => {
  return <ContractGuideContainer />;
};

export default ContractGuide;
