import ContractDefaultListItem from '../ContractListContent/ContractDefaultListItem/ContractDefaultListItem';
import ContractLtaListItem from './ContractLtaListItem/ContractLtaListItem';
import { ContractListContainer, ContractListItem } from './ContractListContent.css';

interface ContractListProps {
  label?: string;
}

const ContractListContent: React.FC<ContractListProps> = ({ ...props }: ContractListProps): JSX.Element => {
  return (
    <ContractListContainer>
      <ContractDefaultListItem></ContractDefaultListItem>
      <ContractLtaListItem></ContractLtaListItem>
      <ContractListItem></ContractListItem>
      <ContractListItem></ContractListItem>
      <ContractListItem></ContractListItem>
      <ContractListItem></ContractListItem>
      <ContractListItem></ContractListItem>
      <ContractListItem></ContractListItem>
      <ContractListItem></ContractListItem>
      <ContractListItem></ContractListItem>
      <ContractListItem></ContractListItem>
      <ContractListItem></ContractListItem>
      <ContractListItem></ContractListItem>
      <ContractListItem></ContractListItem>
      <ContractListItem></ContractListItem>
      <ContractListItem></ContractListItem>
      <ContractListItem></ContractListItem>
      <ContractListItem></ContractListItem>
      <ContractListItem></ContractListItem>
      <ContractListItem></ContractListItem>
      <ContractListItem></ContractListItem>
      <ContractListItem></ContractListItem>
    </ContractListContainer>
  );
};

export default ContractListContent;
