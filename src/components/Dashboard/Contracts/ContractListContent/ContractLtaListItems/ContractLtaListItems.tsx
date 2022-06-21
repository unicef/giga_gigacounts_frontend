import { Dispatch, useEffect, useState } from 'react';
import { IContracts } from '../../@types/ContractType';
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
  ltaNumber: string;
  state: State;
  dispatch: Dispatch<Action>;
}

const ContractLtaListItems: React.FC<IContractListProps> = ({ ltaNumber, state, dispatch }): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [ltaData, setLtaData] = useState<IContracts[]>([]);
  const [selected, setSelected] = useState<string>('');

  const handleSelected = (id: string) => {
    setSelected(id);
  };

  const getLtaData = () => {
    if (ltaNumber !== undefined && state.ltas !== undefined) {
      setLtaData(Object.values(state.ltas[ltaNumber]));
    }
  };

  const toggleLtaContainer = () => setIsExpanded((prevState) => !prevState);

  useEffect(() => {
    getLtaData();
  }, [state]);

  return (
    <ContractLtaListItemsContainer isExpanded={isExpanded}>
      <Header isExpanded={isExpanded} onClick={toggleLtaContainer}>
        <Hand className="icon icon-20 icon-agreement icon-white" />
        <LtaNumber isExpanded={isExpanded}>{ltaNumber}</LtaNumber>
        <ShowMore
          className={`icon icon-24 ${isExpanded ? 'icon-arrow-up icon-white' : 'icon-arrow-down icon-darkest-grey'}`}
          isExpanded={isExpanded}
        />
      </Header>
      {isExpanded ? (
        <>
          {ltaData.map((school, i) => (
            <ContractSchoolStatus
              key={i}
              school={school}
              state={state}
              dispatch={dispatch}
              onToggle={handleSelected}
              selected={selected === school.id}
            />
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
