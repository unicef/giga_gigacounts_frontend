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

      <div className='input-container dropdown'>
      <img src="flags/BR.svg" alt="Brazil" />
        <select>
          <option value="0">Brazil</option>
          <option value="1">Botswana</option>
          <option value="2">Kenya</option>
        </select>
      </div>

      <label>
        <input type="checkbox" />On behalf of the government
      </label>

      <div className='input-container dropdown'>
        <select>
          <option value="" selected hidden>Long Term Agreement</option>
          <option value="0">LLTS-12340684</option>
          <option value="1">LLTS-56215668</option>
          <option value="2">LLTS-15648823</option>
        </select>
      </div>

      <div className='input-container'>
        <div className='dropdown'>
          <select>
            <option value="0">BLW</option>
            <option value="1">USD</option>
            <option value="2">EUR</option>
          </select>
        </div>

        <input
          type="text"
          name="budget"
          placeholder="Budget"
        />
      </div>     

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
