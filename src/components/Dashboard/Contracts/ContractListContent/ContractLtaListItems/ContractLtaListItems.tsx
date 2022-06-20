import { Dispatch, useState } from 'react';
import { Action, State } from '../../store/redux';
import ContractSchoolStatus from '../ContactSchoolStatus/ContractSchoolStatus';
import {
  ContractLtaFooter,
  ContractLtaSubHeader,
  ContractLtaListItemsContainer,
  Header,
  LtaNumber,
  ShowMore,
  Hand
} from './styles';

interface IContractListProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const ContractLtaListItems: React.FC<IContractListProps> = ({ state, dispatch }): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleLtaContainer = () => setIsExpanded((prevState) => !prevState);

  const ltaData = state.contracts?.slice(0, 2);

  return (
    <ContractLtaListItemsContainer isExpanded={isExpanded} onClick={toggleLtaContainer}>
      <Header isExpanded={isExpanded}>
        <Hand className="icon icon-20 icon-agreement icon-white" />
        <LtaNumber isExpanded={isExpanded}>LTA Number</LtaNumber>
        <ShowMore
          className={`icon icon-24 ${isExpanded ? 'icon-arrow-up icon-white' : 'icon-arrow-down icon-darkest-grey'}`}
          isExpanded={isExpanded}
        />
      </Header>
      {isExpanded ? (
        <>
          {ltaData !== undefined &&
            ltaData.map((school, i) => (
              <ContractSchoolStatus key={i} school={school} state={state} dispatch={dispatch} />
            ))}
          <ContractLtaFooter>Create Contract Here</ContractLtaFooter>
        </>
      ) : (
        <ContractLtaSubHeader />
      )}
    </ContractLtaListItemsContainer>
  );
};

export default ContractLtaListItems;
