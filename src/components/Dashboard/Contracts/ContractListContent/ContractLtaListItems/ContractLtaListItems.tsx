import { Dispatch, useEffect, useState } from 'react';
import { IContracts } from '../../@types/ContractType';
import { Action, ActionType, State } from '../../store/redux';
import ContractSchoolStatus from '../ContactSchoolStatus/ContractSchoolStatus';
import ContractDefaultListItem from '../ContractDefaultListItem/ContractDefaultListItem';
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

  const newContract = {
    name: 'New Contract',
    status: 'Draft',
    added: true
  };

  const handleAddLtaContract = () => {
    setLtaData((prevState) => [newContract, ...prevState]);
  };

  const contractItem = (school: IContracts, i: number) => {
    if (school?.added) {
      return <ContractDefaultListItem key={i} />;
    } else {
      return (
        <ContractSchoolStatus
          key={i}
          school={school}
          state={state}
          dispatch={dispatch}
          onToggle={handleSelected}
          selected={selected === school.id}
        />
      );
    }
  };

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
          {ltaData.map((school, i) => contractItem(school, i))}
          <ContractLtaFooter onClick={handleAddLtaContract}>Create Contract Here</ContractLtaFooter>
        </>
      ) : (
        <ContractLtaSubHeader />
      )}
    </ContractLtaListItemsContainer>
  );
};

export default ContractLtaListItems;
