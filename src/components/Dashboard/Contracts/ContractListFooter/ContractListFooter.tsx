import { ContractListFooterContainer } from './styles';

interface ContractListFooterProps {
  label?: string;
}

const ContractListFooter: React.FC<ContractListFooterProps> = (): JSX.Element => {
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
