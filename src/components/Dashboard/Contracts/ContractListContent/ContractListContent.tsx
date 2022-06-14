import { ContractListContainer, ContractListItem } from './ContractListContent.css';

interface ContractListProps {
  label?: string;
}

const ContractListContent: React.FC<ContractListProps> = ({ ...props }: ContractListProps): JSX.Element => {
  return (
    <ContractListContainer>
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
      <ContractListItem></ContractListItem>
    </ContractListContainer>
  );
};

export default ContractListContent;
