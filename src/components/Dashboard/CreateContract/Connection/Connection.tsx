import { Dispatch } from 'react';
import { Action, State } from '../store/redux';
import { ConnectionContainer } from './styles';

interface IConnectionProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const Connection: React.FC<IConnectionProps> = ({ state, dispatch }): JSX.Element => {
  console.log('connection state', state);

  return <ConnectionContainer>Connection</ConnectionContainer>;
};

export default Connection;
