import { useState } from 'react';
import { State } from '../../store/redux';
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

interface ContractListProps {
  state: State;
}

const ContractLtaListItems: React.FC<ContractListProps> = ({ state }): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleLtaContainer = () => setIsExpanded((prevState) => !prevState);

  const ltaData = state.contracts?.slice(0, 2);

  return (
    <ContractLtaListItemsContainer isExpanded={isExpanded}>
      <Header isExpanded={isExpanded}>
        <Hand className="icon icon-20 icon-contract icon-white" />
        <LtaNumber isExpanded={isExpanded}>LTA Number</LtaNumber>
        <ShowMore
          className={`icon icon-24 ${isExpanded ? 'icon-arrow-up icon-white' : 'icon-arrow-down icon-darkest-grey'}`}
          isExpanded={isExpanded}
          onClick={toggleLtaContainer}
        />
      </Header>
      {isExpanded ? (
        <>
          {ltaData !== undefined && ltaData.map((school, i) => <ContractSchoolStatus key={i} school={school} />)}
          <ContractLtaFooter>Create Contract Here</ContractLtaFooter>
        </>
      ) : (
        <ContractLtaSubHeader />
      )}
    </ContractLtaListItemsContainer>
  );
};

export default ContractLtaListItems;
