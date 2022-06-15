import {
  ContractDefaultListItemContainer,
  ContractDefaultListItemDetails,
  ContractDefaultListItemStatus,
  ContractDefaultListItemTitle,
  ContractDefaultListItemSchoolStatus,
  StyledIcon,
  Status
} from './ContractDefaultListItem.css';

interface ContractListProps {
  label?: string;
}

const ContractDefaultListItem: React.FC<ContractListProps> = ({ ...props }: ContractListProps): JSX.Element => {
  return (
    <ContractDefaultListItemContainer>
      <ContractDefaultListItemDetails>
        <ContractDefaultListItemTitle>
          <p>New Contract</p>
        </ContractDefaultListItemTitle>
        <ContractDefaultListItemSchoolStatus />
      </ContractDefaultListItemDetails>
      <ContractDefaultListItemStatus>
        <StyledIcon />
        <Status>Draft</Status>
      </ContractDefaultListItemStatus>
    </ContractDefaultListItemContainer>
  );
};

export default ContractDefaultListItem;
