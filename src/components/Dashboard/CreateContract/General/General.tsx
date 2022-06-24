import { ChangeEvent, Dispatch } from 'react';
import { Action, ActionType, State } from '../store/redux';
import { GeneralContainer } from './styles';

interface IGeneralProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const General: React.FC<IGeneralProps> = ({ state, dispatch }): JSX.Element => {
  console.log('general state', state);

  const handleContractName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length === 0) {
      dispatch({ type: ActionType.SET_CONTRACT_NAME, payload: '' });
      return;
    }
    dispatch({ type: ActionType.SET_CONTRACT_NAME, payload: ` - ${e.currentTarget.value}` });
  };

  return (
    <GeneralContainer>
      Test{' '}
      <input
        type="text"
        name="contactName"
        placeholder="Contract Name"
        onChange={handleContractName}
        onBlur={handleContractName}
      />
    </GeneralContainer>
  );
};

export default General;
