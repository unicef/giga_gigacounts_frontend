import { Dispatch } from 'react';
import { Action, State } from '../store/redux';
import { SchoolsContainer } from './styles';

interface ISchoolsProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const Schools: React.FC<ISchoolsProps> = ({ state, dispatch }): JSX.Element => {
  console.log('schools state', state);

  return <SchoolsContainer>Schools</SchoolsContainer>;
};

export default Schools;
