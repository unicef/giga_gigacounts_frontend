import ContractDefaultListItem from '../ContractListContent/ContractDefaultListItem/ContractDefaultListItem';
import ContractLtaListItem from './ContractLtaListItem/ContractLtaListItem';
import ContractLtaListItems from './ContractLtaListItems/ContractLtaListItems';
import { ContractListContainer } from './styles';
import ContractSchoolStatus from './ContactSchoolStatus/ContractSchoolStatus';
import { State } from '../store/redux';

interface ContractListProps {
  state: State;
}

const ContractListContent: React.FC<ContractListProps> = ({ state }: ContractListProps): JSX.Element => {
  return (
    <ContractListContainer>
      <ContractLtaListItem></ContractLtaListItem>
      <ContractLtaListItems state={state}></ContractLtaListItems>
      <ContractDefaultListItem></ContractDefaultListItem>
      <>
        {state.contracts !== undefined &&
          state.contracts.map((school, i) => {
            return <ContractSchoolStatus key={i} school={school} />;
          })}
      </>
    </ContractListContainer>
  );
};

export default ContractListContent;
