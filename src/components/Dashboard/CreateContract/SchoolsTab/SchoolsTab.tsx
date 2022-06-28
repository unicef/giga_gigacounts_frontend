import { Dispatch } from 'react';
import { Action, State } from '../store/redux';
import { SchoolsContainer } from './styles';

interface ISchoolsProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const SchoolsTab: React.FC<ISchoolsProps> = ({ state, dispatch }): JSX.Element => {
  return <SchoolsContainer>Schools</SchoolsContainer>;
};

export default SchoolsTab;
