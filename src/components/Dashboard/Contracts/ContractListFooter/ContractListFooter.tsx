import {
  ContractListFooterContainer,
  ContractListButtonContainer,
  ContractButton,
  StyledIcon
} from './ContractListFooter.css';

interface ContractListFooterProps {
  label?: string;
}

const ContractListFooter: React.FC<ContractListFooterProps> = ({ ...props }: ContractListFooterProps): JSX.Element => {
  return (
    <ContractListFooterContainer>
      <ContractListButtonContainer>
        <ContractButton label="New Contract" onClick={() => console.log('click')}>
          <StyledIcon />
        </ContractButton>
      </ContractListButtonContainer>
    </ContractListFooterContainer>
  );
};

export default ContractListFooter;
