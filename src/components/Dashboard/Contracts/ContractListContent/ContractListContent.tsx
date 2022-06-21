import { Dispatch, useEffect, useState } from 'react';
import { Action, State } from '../store/redux';

import ContractDefaultListItem from '../ContractListContent/ContractDefaultListItem/ContractDefaultListItem';
import ContractLtaListItem from './ContractLtaListItem/ContractLtaListItem';
import ContractLtaListItems from './ContractLtaListItems/ContractLtaListItems';
import ContractSchoolStatus from './ContactSchoolStatus/ContractSchoolStatus';
import ContractLoader from './ContractLoader/ContractLoader';

import { ContractListContainer } from './styles';

interface ContractListProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const ContractListContent: React.FC<ContractListProps> = ({ state, dispatch }: ContractListProps): JSX.Element => {
  const [ltaNumber, setLtaNumber] = useState<string[]>();
  const [selected, setSelected] = useState<string>('');

  const handleSelected = (id: string) => {
    setSelected(id);
  };

  const getLtaNumber = () => {
    const arr: string[] = [];
    if (state.ltas !== undefined) {
      for (const lta in state.ltas) {
        arr.push(lta);
      }
      setLtaNumber(arr);
    }
  };

  useEffect(() => {
    getLtaNumber();
  }, [state]);

  return (
    <ContractListContainer>
      {state.loading ? (
        <ContractLoader />
      ) : (
        <>
          <ContractLtaListItem />
          {ltaNumber?.map((item, i) => {
            return <ContractLtaListItems key={i} state={state} dispatch={dispatch} ltaNumber={item} />;
          })}
          <ContractDefaultListItem></ContractDefaultListItem>
          <>
            {state.contracts !== undefined &&
              state.contracts.map((school, i) => {
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
              })}
          </>
        </>
      )}
    </ContractListContainer>
  );
};

export default ContractListContent;
