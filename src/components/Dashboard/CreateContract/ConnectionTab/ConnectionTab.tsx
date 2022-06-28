import { Dispatch } from 'react'
import { Action, State } from '../store/redux'
import { ConnectionContainer } from './styles'

interface IConnectionProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const ConnectionTab: React.FC<IConnectionProps> = ({ state, dispatch }): JSX.Element => {
  return <ConnectionContainer>Connection</ConnectionContainer>
}

export default ConnectionTab
