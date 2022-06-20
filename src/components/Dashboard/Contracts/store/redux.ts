import { IContracts, ILtas } from '../@types/ContractType';

export enum ActionType {
  RESPONSE = 'RESPONSE',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR'
}

export interface Action {
  type: ActionType;
  payload?: any;
}

export interface State {
  contracts?: IContracts[];
  ltas?: ILtas;
  error?: Error;
  loading?: boolean;
  controller?: AbortController;
  isSelected?: boolean;
}

export const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;

  console.log(type, payload);

  switch (type) {
    case ActionType.RESPONSE:
      return {
        ...state,
        contracts: payload.contracts,
        ltas: payload.ltas,
        loading: false
      };

    case ActionType.SET_ERROR:
      return {
        ...state,
        error: payload
      };

    case ActionType.SET_LOADING: {
      return {
        ...state,
        loading: !state.loading
      };
    }

    default:
      return {
        ...state
      };
  }
};

export const state: State = {
  contracts: [],
  ltas: {},
  error: undefined,
  loading: true,
  controller: undefined
};
