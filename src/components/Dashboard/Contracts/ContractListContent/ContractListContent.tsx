import { Dispatch } from 'react';
import { Action, State } from '../store/redux';

import ContractDefaultListItem from '../ContractListContent/ContractDefaultListItem/ContractDefaultListItem';
import ContractLtaListItem from './ContractLtaListItem/ContractLtaListItem';
import ContractLtaListItems from './ContractLtaListItems/ContractLtaListItems';
import ContractSchoolStatus from './ContactSchoolStatus/ContractSchoolStatus';

import { ContractListContainer } from './styles';

interface ContractListProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const ContractListContent: React.FC<ContractListProps> = ({ state, dispatch }: ContractListProps): JSX.Element => {
  return (
    <ContractListContainer>
      {state.loading ? (
        <p>loading...</p>
      ) : (
        <>
          <ContractLtaListItem />
          <ContractLtaListItems state={state} dispatch={dispatch} />
          <ContractDefaultListItem></ContractDefaultListItem>
          <>
            {state.contracts !== undefined &&
              state.contracts.map((school, i) => {
                return <ContractSchoolStatus key={i} school={school} state={state} dispatch={dispatch} />;
              })}
          </>
        </>
      )}
    </ContractListContainer>
  );
};

export default ContractListContent;
