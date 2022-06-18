import { ContractListFooterContainer } from './ContractListFooter.css';

interface ContractListFooterProps {
  label?: string;
}

const ContractListFooter: React.FC<ContractListFooterProps> = ({ ...props }: ContractListFooterProps): JSX.Element => {
  return (
    <ContractListFooterContainer>
      <button className="btn-frameless" onClick={() => console.log('click')}>
        <div className="icon icon-24 icon-plus" />
        New Contract
      </button>
    </ContractListFooterContainer>
  );
};

export default ContractListFooter;
